import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true, length: 2 },
  zipCode: { type: String, required: true },
  country: { type: String, default: 'US' },
});

const verificationSchema = new mongoose.Schema({
  npiNumber: { 
    type: String, 
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /^\d{10}$/.test(v);
      },
      message: 'NPI number must be exactly 10 digits'
    }
  },
  deaNumber: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^[A-Z]{2}\d{7}$/.test(v);
      },
      message: 'DEA number must be 2 letters followed by 7 digits'
    }
  },
  medicalLicense: {
    number: { type: String, required: true },
    state: { type: String, required: true, length: 2 },
    expiryDate: { type: Date, required: true },
  },
  specialties: [{
    code: String,
    description: String,
  }],
  verified: { type: Boolean, default: false },
  verifiedAt: Date,
  verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  verificationDocuments: [{
    filename: String,
    originalName: String,
    mimetype: String,
    size: Number,
    uploadedAt: { type: Date, default: Date.now },
  }],
  notes: String,
});

const subscriptionSchema = new mongoose.Schema({
  isActive: { type: Boolean, default: false },
  plan: {
    type: String,
    enum: ['basic', 'premium', 'enterprise'],
    default: 'basic'
  },
  startDate: Date,
  endDate: Date,
  autoRenew: { type: Boolean, default: true },
  stripeSubscriptionId: String,
  discountPercent: { type: Number, min: 0, max: 100, default: 0 },
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: 'Please enter a valid email address'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  role: {
    type: String,
    enum: ['physician', 'admin', 'super_admin'],
    default: 'physician'
  },
  profile: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    title: {
      type: String,
      enum: ['Dr.', 'MD', 'DO', 'NP', 'PA', 'PharmD'],
      default: 'Dr.'
    },
    phone: {
      type: String,
      validate: {
        validator: function(v) {
          return !v || /^\+?1?[-.\s]?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/.test(v);
        },
        message: 'Please enter a valid phone number'
      }
    },
    avatar: String,
    timezone: { type: String, default: 'America/New_York' },
  },
  businessInfo: {
    practiceName: { type: String, required: true },
    taxId: String,
    address: { type: addressSchema, required: true },
    phone: String,
    website: String,
    practiceType: {
      type: String,
      enum: ['private_practice', 'hospital', 'clinic', 'telemedicine', 'other'],
      default: 'private_practice'
    },
  },
  verification: { type: verificationSchema, required: true },
  subscription: { type: subscriptionSchema, default: () => ({}) },
  preferences: {
    notifications: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
      orderUpdates: { type: Boolean, default: true },
      promotions: { type: Boolean, default: true },
    },
    defaultShipping: {
      expedited: { type: Boolean, default: false },
      signature: { type: Boolean, default: true },
    },
    autoReorder: {
      enabled: { type: Boolean, default: false },
      frequency: { type: Number, default: 30 },
      products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    },
  },
  compliance: {
    lastTrainingDate: Date,
    certifications: [{
      name: String,
      issuer: String,
      number: String,
      expiryDate: Date,
    }],
    stateRestrictions: [String],
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'suspended', 'inactive'],
    default: 'pending'
  },
  loginAttempts: { type: Number, default: 0 },
  lockUntil: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  emailVerificationToken: String,
  emailVerified: { type: Boolean, default: false },
  refreshTokens: [String],
  lastLogin: Date,
  lastActivity: Date,
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

userSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

userSchema.virtual('fullName').get(function() {
  return `${this.profile.title} ${this.profile.firstName} ${this.profile.lastName}`;
});

userSchema.virtual('isVerified').get(function() {
  return this.verification.verified && this.emailVerified;
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.incLoginAttempts = async function() {
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $unset: { lockUntil: 1, loginAttempts: 1 }
    });
  }
  
  const updates = { $inc: { loginAttempts: 1 } };
  if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
    updates.$set = {
      lockUntil: Date.now() + 2 * 60 * 60 * 1000
    };
  }
  
  return this.updateOne(updates);
};

userSchema.methods.addRefreshToken = async function(token) {
  this.refreshTokens.push(token);
  if (this.refreshTokens.length > 5) {
    this.refreshTokens.shift();
  }
  return this.save();
};

userSchema.methods.removeRefreshToken = async function(token) {
  this.refreshTokens = this.refreshTokens.filter(t => t !== token);
  return this.save();
};

userSchema.index({ email: 1 });
userSchema.index({ 'verification.npiNumber': 1 });
userSchema.index({ 'verification.deaNumber': 1 });
userSchema.index({ status: 1 });
userSchema.index({ 'verification.verified': 1 });
userSchema.index({ createdAt: 1 });

export default mongoose.model('User', userSchema);