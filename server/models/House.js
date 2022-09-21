import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ObjectId = mongoose.Types.ObjectId;
export const HouseSchema = new Schema(
  {
    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    levels: {
      type: Number,
      required: true,
    },
    imgUrl: {
      type: String,
      default: '//placehold.it/300x300',
    },
    year: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    //USER INFO
    //RELATIONSHIPS-------------------------------------V magic string here
    sellerId: { type: ObjectId, required: true, ref: 'Account' },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

HouseSchema.virtual('seller', {
  localField: 'sellerId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account',
});
