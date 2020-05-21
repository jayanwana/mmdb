import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

//  validate: [isEmail, 'unique email required']
export const UsersSchema = new Schema({
  email: {type:String, required:true, createIndexes: {unique:true}},
  password: {type:String, required:true}
});

export interface Users extends mongoose.Document {
  email: String,
  password: String
};
