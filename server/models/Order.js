import mongoose from 'mongoose';

const shippingAddressSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  company: String,
  street1: { type: String, required: true },
  street2: String,
  city: { type: String, required: true },
  state: { type: String, required: true, length: 2 },
  zipCode: { type: String, required: true },
  country: { type: String, default: 'US' },
  phone: String,
  instructions: String,
});

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  variant: { type: mongoose.Schema.Types.ObjectId, required: true },
  sku: { type: String, required: true },
  name: { type: String, required: true },
  concentration: {
    value: Number,
    unit: String,
  },
  quantity: { type: Number, required: true, min: 1 },
  unitPrice: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  discountApplied: {
    type: String,
    amount: Number,
    percent: Number,
  },
});

const paymentSchema = new mongoose.Schema({
  method: {
    type: String,
    enum: ['stripe', 'wire_transfer', 'ach', 'check'],
    default: 'stripe'
  },
  stripePaymentIntentId: String,
  stripeChargeId: String,
  amount: { type: Number, required: true },
  currency: { type: String, default: 'usd' },
  status: {
    type: String,
    enum: ['pending', 'processing', 'succeeded', 'failed', 'cancelled', 'refunded'],
    default: 'pending'
  },
  paidAt: Date,
  failureReason: String,
  refunds: [{
    amount: Number,
    reason: String,
    refundedAt: { type: Date, default: Date.now },
    stripeRefundId: String,
  }],
});

const shippingSchema = new mongoose.Schema({
  method: {
    type: String,
    enum: ['standard', 'expedited', 'overnight', 'same_day'],
    default: 'standard'
  },
  cost: { type: Number, required: true },
  estimatedDays: Number,
  carrier: String,
  service: String,
  trackingNumber: String,
  trackingUrl: String,
  shippedAt: Date,
  deliveredAt: Date,
  requiresSignature: { type: Boolean, default: true },
  coldChain: { type: Boolean, default: true },
  insurance: {
    required: { type: Boolean, default: true },
    value: Number,
  },
});

const complianceCheckSchema = new mongoose.Schema({
  npiVerified: { type: Boolean, default: false },
  deaVerified: { type: Boolean, default: false },
  stateCompliant: { type: Boolean, default: false },
  prescriptionRequired: { type: Boolean, default: true },
  prescriptionProvided: { type: Boolean, default: false },
  checkedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  checkedAt: Date,
  notes: String,
  flags: [String],
});

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: true,
  },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  subtotal: { type: Number, required: true },
  tax: {
    amount: { type: Number, default: 0 },
    rate: { type: Number, default: 0 },
    taxableAmount: { type: Number, default: 0 },
  },
  shipping: shippingSchema,
  discount: {
    code: String,
    description: String,
    amount: { type: Number, default: 0 },
    type: {
      type: String,
      enum: ['fixed', 'percentage'],
      default: 'fixed'
    },
  },
  total: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  status: {
    type: String,
    enum: [
      'pending',
      'payment_pending',
      'payment_failed',
      'confirmed',
      'processing',
      'compliance_review',
      'preparing',
      'shipped',
      'delivered',
      'cancelled',
      'refunded'
    ],
    default: 'pending'
  },
  shippingAddress: { type: shippingAddressSchema, required: true },
  billingAddress: shippingAddressSchema,
  payment: paymentSchema,
  compliance: complianceCheckSchema,
  prescription: {
    required: { type: Boolean, default: true },
    provided: { type: Boolean, default: false },
    filename: String,
    uploadedAt: Date,
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    verifiedAt: Date,
    notes: String,
  },
  timeline: [{
    status: String,
    message: String,
    timestamp: { type: Date, default: Date.now },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    internal: { type: Boolean, default: false },
  }],
  notes: {
    customer: String,
    internal: String,
    pharmacy: String,
  },
  specialInstructions: String,
  rushOrder: { type: Boolean, default: false },
  subscription: {
    isSubscription: { type: Boolean, default: false },
    subscriptionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' },
    frequency: Number,
    nextOrderDate: Date,
  },
  source: {
    type: String,
    enum: ['web', 'phone', 'email', 'admin'],
    default: 'web'
  },
  ipAddress: String,
  userAgent: String,
  referrer: String,
  processedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  completedAt: Date,
  cancelledAt: Date,
  cancelReason: String,
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

orderSchema.virtual('itemCount').get(function() {
  return this.items.reduce((count, item) => count + item.quantity, 0);
});

orderSchema.virtual('isCompleted').get(function() {
  return ['delivered', 'cancelled', 'refunded'].includes(this.status);
});

orderSchema.virtual('canCancel').get(function() {
  return ['pending', 'payment_pending', 'confirmed', 'compliance_review'].includes(this.status);
});

orderSchema.virtual('requiresReview').get(function() {
  return this.status === 'compliance_review' || 
         this.prescription.required && !this.prescription.provided;
});

orderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const today = new Date();
    const year = today.getFullYear().toString().slice(-2);
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    
    const count = await mongoose.model('Order').countDocuments({
      createdAt: {
        $gte: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
        $lt: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
      }
    });
    
    this.orderNumber = `VRX${year}${month}${day}${(count + 1).toString().padStart(4, '0')}`;
  }
  next();
});

orderSchema.methods.addTimelineEntry = function(status, message, updatedBy, internal = false) {
  this.timeline.push({
    status,
    message,
    updatedBy,
    internal,
    timestamp: new Date()
  });
  return this.save();
};

orderSchema.methods.updateStatus = async function(newStatus, message, updatedBy) {
  const oldStatus = this.status;
  this.status = newStatus;
  
  if (newStatus === 'completed') {
    this.completedAt = new Date();
  } else if (newStatus === 'cancelled') {
    this.cancelledAt = new Date();
  }
  
  await this.addTimelineEntry(
    newStatus, 
    message || `Order status changed from ${oldStatus} to ${newStatus}`,
    updatedBy
  );
  
  return this.save();
};

orderSchema.methods.calculateTotals = function() {
  this.subtotal = this.items.reduce((sum, item) => sum + item.totalPrice, 0);
  
  let total = this.subtotal;
  
  if (this.discount.amount > 0) {
    if (this.discount.type === 'percentage') {
      total -= (total * this.discount.amount / 100);
    } else {
      total -= this.discount.amount;
    }
  }
  
  if (this.tax.amount > 0) {
    total += this.tax.amount;
  }
  
  if (this.shipping.cost > 0) {
    total += this.shipping.cost;
  }
  
  this.total = Math.round(total * 100) / 100;
  return this.total;
};

orderSchema.methods.canRefund = function() {
  return this.payment.status === 'succeeded' && 
         ['delivered', 'shipped', 'processing'].includes(this.status);
};

orderSchema.index({ orderNumber: 1 });
orderSchema.index({ customer: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });
orderSchema.index({ 'payment.status': 1 });
orderSchema.index({ 'shipping.trackingNumber': 1 });
orderSchema.index({ 'compliance.stateCompliant': 1 });

export default mongoose.model('Order', orderSchema);