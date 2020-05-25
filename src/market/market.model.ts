import * as mongoose from 'mongoose';

mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;

const Location = new Schema({
  type: {
    type: String,
    required: true,
    enum: ['Point', 'LineString', 'Polygon'],
    default: 'Point'
  },
  coordinates: [Number]
});

const Images = new Schema({
  img_1: String,
  img_2: String,
  img_3: String,
})

export const MarketSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  foodCategory: {type: String, required: true},
  address: {type: String},
  location: {type: Location, required: true ,createIndexes: "2dsphere"},
  img: {type: Images, default: null},
});

export interface Market extends mongoose.Document {
  id: string;
  name: string;
  description: string;
  foodCategory: string;
  address: string;
  img: Object;
  location: Object;
};
