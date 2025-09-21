import { Schema, model, models, Types } from 'mongoose';

const imageSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: '',
  },
}, { _id: false });

const variantOptionSchema = new Schema({
  label: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  listPrice: {
    type: Number,
  },
  stock: {
    type: Number,
    required: true,
  },
  image: imageSchema,
  sku: {
    type: String,
  },
}, { _id: false });

const variantGroupSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  options: [variantOptionSchema],
}, { _id: false });

const packageDimensionSchema = new Schema({
  length: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
}, { _id: false });

const shippingInfoSchema = new Schema({
  deliveryTime: {
    type: String,
    required: true,
  },
  shippingFrom: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  packageDimensions: packageDimensionSchema,
}, { _id: false });

const ratingDistributionSchema = new Schema({
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  count: {
    type: Number,
    required: true,
    min: 0,
  },
}, { _id: false });

const reviewSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  verifiedPurchase: {
    type: Boolean,
    default: false,
  },
  helpful: {
    type: Number,
    default: 0,
  },
}, { _id: true });

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  sku: {
    type: String,
    required: true,
    unique: true,
  },
category: {
  name: {
    type: String,
    required: true,
  },
  subcategories: [{
    type: String,
  }],
},
brand: {
  type: String, 
  required: true,
},

  categoryUrl: {
    type: String,
  },
  images: [imageSchema],

  description: {
    type: String,
    required: true,
  },
  shortDescription: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  listPrice: {
    type: Number,
    min: 0,
  },
  discountPercentage: {
    type: Number,
    min: 0,
    max: 100,
  },
  countInStock: {
    type: Number,
    required: true,
    min: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
    min: 0,
  },
  avgRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  numSales: {
    type: Number,
    default: 0,
    min: 0,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  variant: [variantGroupSchema],
  tags: [String],
  ratingDistribution: [ratingDistributionSchema],
  reviews: [reviewSchema],
  shippingInfo: shippingInfoSchema,
  material: {
    type: String,
  },
  weight: {
    type: String,
  },
  dimensions: {
    type: String,
  },
  careInstructions: {
    type: String,
  },
  sourceUrl: {
    type: String,
  },
  specifications: {
    type: Map,
    of: Schema.Types.Mixed,
  },
  metaTitle: {
    type: String,
  },
  metaDescription: {
    type: String,
  },
  relatedProducts: [{
    type: Types.ObjectId,
    ref: 'Product',
  }],
  seoKeywords: [String],
}, {
  timestamps: true,
});

// Index for better query performance
productSchema.index({ name: 'text', description: 'text', tags: 'text' });
productSchema.index({ category: 1, isPublished: 1 });
productSchema.index({ brand: 1, isPublished: 1 });
productSchema.index({ isPublished: 1, isFeatured: 1 });
productSchema.index({ price: 1 });
productSchema.index({ createdAt: -1 });

const Product = models.Product || model('Product', productSchema);

export { Product };