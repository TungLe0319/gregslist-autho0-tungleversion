import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

export const PlaceHolderSchema = new Schema(
  {
    
    year: {
      type: Number,

      default: 0,
      min: 0,
      max: new Date().getFullYear(),
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
      default: '//placehold.it/300x300',
    },
    description: {
      type: String,
      default: '',
      minLength: 3,
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

PlaceHolderSchema.virtual('seller', {
  localField: 'sellerId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account',
});


