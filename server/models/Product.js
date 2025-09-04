import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  concentration: {
    value: { type: Number, required: true },
    unit: { type: String, required: true },
  },
  packaging: {
    vialSize: { type: String, required: true },
    vialCount: { type: Number, required: true },
  },
  pricing: {
    basePrice: { type: Number, required: true },
    tiers: [{
      minQuantity: { type: Number, required: true },
      price: { type: Number, required: true },
      discountPercent: { type: Number, min: 0, max: 100 },
    }],
  },
  inventory: {
    stock: { type: Number, required: true, min: 0 },
    reserved: { type: Number, default: 0, min: 0 },
    lowStockThreshold: { type: Number, default: 10 },
    reorderPoint: { type: Number, default: 5 },
    maxOrderQuantity: { type: Number, default: 100 },
  },
  shipping: {
    weight: Number,
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
    },
    requiresColdStorage: { type: Boolean, default: true },
    hazmatClass: String,
  },
  isActive: { type: Boolean, default: true },
});

const complianceSchema = new mongoose.Schema({
  prescriptionRequired: { type: Boolean, default: true },
  controlledSubstance: {
    isControlled: { type: Boolean, default: false },
    schedule: {
      type: String,
      enum: ['I', 'II', 'III', 'IV', 'V'],
    },
  },
  stateRestrictions: [{
    state: String,
    restriction: String,
    notes: String,
  }],
  ageRestrictions: {
    minimumAge: { type: Number, default: 18 },
    maximumAge: Number,
  },
  specialRequirements: [String],
  fda: {
    approved: { type: Boolean, default: false },
    approvalNumber: String,
    indication: String,
  },
  warnings: [String],
  contraindications: [String],
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['peptide', 'glp1', 'hormone', 'vitamin', 'supplement', 'research'],
  },
  subcategory: String,
  brand: String,
  manufacturer: {
    name: { type: String, required: true },
    contactInfo: {
      email: String,
      phone: String,
      address: String,
    },
    certifications: [String],
  },
  description: {
    short: { type: String, required: true, maxlength: 200 },
    full: { type: String, required: true },
    benefits: [String],
    usage: String,
    dosage: String,
    storage: String,
  },
  images: [{
    url: { type: String, required: true },
    alt: String,
    isMainImage: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  }],
  documents: [{
    name: String,
    type: {
      type: String,
      enum: ['coa', 'sds', 'insert', 'study', 'other'],
    },
    url: String,
    uploadedAt: { type: Date, default: Date.now },
  }],
  variants: [variantSchema],
  compliance: { type: complianceSchema, required: true },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String],
  },
  featured: { type: Boolean, default: false },
  newProduct: { type: Boolean, default: false },
  onSale: { type: Boolean, default: false },
  tags: [String],
  relatedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  averageRating: { type: Number, min: 0, max: 5, default: 0 },
  reviewCount: { type: Number, default: 0 },
  totalSales: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  isDeleted: { type: Boolean, default: false },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

productSchema.virtual('mainImage').get(function() {
  const main = this.images.find(img => img.isMainImage);
  return main || this.images[0];
});

productSchema.virtual('inStock').get(function() {
  return this.variants.some(variant => 
    variant.isActive && (variant.inventory.stock - variant.inventory.reserved) > 0
  );
});

productSchema.virtual('lowestPrice').get(function() {
  if (!this.variants.length) return 0;
  return Math.min(...this.variants
    .filter(v => v.isActive)
    .map(v => v.pricing.basePrice)
  );
});

productSchema.virtual('highestPrice').get(function() {
  if (!this.variants.length) return 0;
  return Math.max(...this.variants
    .filter(v => v.isActive)
    .map(v => v.pricing.basePrice)
  );
});

productSchema.virtual('totalStock').get(function() {
  return this.variants.reduce((total, variant) => 
    total + (variant.inventory.stock - variant.inventory.reserved), 0
  );
});

productSchema.pre('save', function(next) {
  if (!this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  next();
});

productSchema.methods.updateInventory = async function(variantId, quantity, operation = 'subtract') {
  const variant = this.variants.id(variantId);
  if (!variant) throw new Error('Variant not found');
  
  if (operation === 'subtract') {
    if (variant.inventory.stock < quantity) {
      throw new Error('Insufficient stock');
    }
    variant.inventory.stock -= quantity;
  } else if (operation === 'add') {
    variant.inventory.stock += quantity;
  } else if (operation === 'reserve') {
    if ((variant.inventory.stock - variant.inventory.reserved) < quantity) {
      throw new Error('Insufficient available stock');
    }
    variant.inventory.reserved += quantity;
  } else if (operation === 'unreserve') {
    variant.inventory.reserved = Math.max(0, variant.inventory.reserved - quantity);
  }
  
  return this.save();
};

productSchema.methods.getPriceForQuantity = function(variantId, quantity) {
  const variant = this.variants.id(variantId);
  if (!variant) throw new Error('Variant not found');
  
  let price = variant.pricing.basePrice;
  
  for (const tier of variant.pricing.tiers.sort((a, b) => b.minQuantity - a.minQuantity)) {
    if (quantity >= tier.minQuantity) {
      price = tier.price;
      break;
    }
  }
  
  return price;
};

productSchema.methods.canOrderQuantity = function(variantId, quantity) {
  const variant = this.variants.id(variantId);
  if (!variant) return false;
  
  const availableStock = variant.inventory.stock - variant.inventory.reserved;
  return variant.isActive && 
         availableStock >= quantity && 
         quantity <= variant.inventory.maxOrderQuantity;
};

productSchema.index({ slug: 1 });
productSchema.index({ category: 1 });
productSchema.index({ isActive: 1 });
productSchema.index({ featured: 1 });
productSchema.index({ 'variants.sku': 1 });
productSchema.index({ tags: 1 });
productSchema.index({ averageRating: -1 });
productSchema.index({ totalSales: -1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ 
  name: 'text', 
  'description.short': 'text', 
  'description.full': 'text',
  tags: 'text'
});

export default mongoose.model('Product', productSchema);