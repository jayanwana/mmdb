import * as mongoose from 'mongoose';

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

export const MarketSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  foodCategory: {type: String, required: true},
  img: [String],
  location: {type: Location}
});

export interface Market extends mongoose.Document {
  id: string;
  name: string;
  description: string;
  foodCategory: string;
  img: string[];
  location: string;
};
