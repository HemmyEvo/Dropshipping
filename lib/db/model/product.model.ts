import { IIMage, IProductInput, IRatingDistribution, IReview, PackageDimensions, ShippingInfo, VariantGroup, VariantOption } from '@/types';
import { Schema, model,  models } from 'mongoose';




// Mongoose Schemas
const imageSchema = new Schema<IIMage>({
  id: { type: String, required: true },
  url: { type: String, required: true },
  alt: { type: String }
});

const variantOptionSchema = new Schema<VariantOption>({
  label: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  listPrice: { type: Number, min: 0 },
  stock: { type: Number, required: true, min: 0 },
  image: { type: String },
  sku: { type: String }
});

const variantGroupSchema = new Schema<VariantGroup>({
  title: { type: String, required: true },
  options: [variantOptionSchema]
});

const packageDimensionsSchema = new Schema<PackageDimensions>({
  length: { type: Number, required: true, min: 0 },
  width: { type: Number, required: true, min: 0 },
  height: { type: Number, required: true, min: 0 },
  weight: { type: Number, required: true, min: 0 }
});

const shippingInfoSchema = new Schema<ShippingInfo>({
  deliveryTime: { type: String, required: true },
  shippingFrom: { type: String, required: true },
  cost: { type: Number, required: true, min: 0 },
  packageDimensions: packageDimensionsSchema
});

const ratingDistributionSchema = new Schema<IRatingDistribution>({
  rating: { type: Number, required: true, min: 1, max: 5 },
  count: { type: Number, required: true, min: 0 }
});

const reviewSchema = new Schema<IReview>({
  id:{ type:String},
  user: { type: String, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  date: { type: Date, default: Date.now }
});

// Main Product Schema
const productSchema = new Schema<IProductInput>({
  name: {
    type: String,
    required: true,
    trim: true,
   
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  sku: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true
  },
  categoryUrl: {
    type: String
  },
  images: {
    type: [imageSchema],
    required: true
  },
  brand: {
    type: String,
    ref: 'Brand',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  listPrice: {
    type: Number,
    min: 0
  },
  countInStock: {
    type: Number,
    required: true,
    min: 0
  },
  numReviews: {
    type: Number,
    default: 0,
    min: 0
  },
  avgRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  numSales: {
    type: Number,
    default: 0,
    min: 0
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  variant: [variantGroupSchema],
  tags: [{
    type: String
  }],
  ratingDistribution: [ratingDistributionSchema],
  reviews: [reviewSchema],
  shippingInfo: {
    type: shippingInfoSchema,
    required: true
  },
  material: {
    type: String
  },
  sourceUrl: {
    type: String,
    required: true
  },
}, {
  timestamps: true
});

// Indexes for better query performance - REMOVED DUPLICATES
// The unique: true on slug and sku already creates indexes
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ brand: 1 });
productSchema.index({ price: 1 });
productSchema.index({ avgRating: -1 });
productSchema.index({ isPublished: 1 });

// Virtual for checking if product is in stock
productSchema.virtual('inStock').get(function(this: IProductInput) {
  return this.countInStock > 0;
});

// Method to update rating when new review is added
productSchema.methods.updateRating = function(this: IProductInput, newRating: number) {
  this.numReviews += 1;
  this.avgRating = ((this.avgRating * (this.numReviews - 1)) + newRating) / this.numReviews;
  
  // Update rating distribution
  const ratingDist = this.ratingDistribution?.find(rd => rd.rating === newRating);
  if (ratingDist) {
    ratingDist.count += 1;
  } else {
    this.ratingDistribution?.push({ rating: newRating, count: 1 });
  }
};

// Pre-save middleware to ensure listPrice is not less than price
productSchema.pre<IProductInput>('save', function(next) {
  if (this.listPrice && this.listPrice < this.price) {
    return next(new Error('List price cannot be less than the actual price.'));
  }
  next();
});

// FIX: Check if model already exists to prevent OverwriteModelError
export const Product = models.Product || model<IProductInput>('Product', productSchema);