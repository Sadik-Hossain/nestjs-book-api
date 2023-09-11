import mongoose from 'mongoose';

export enum Category1 {
  FICTION = 'fiction',
  ADVENTURE = 'adventure',
  HISTORY = 'history',
  CRIME = 'crime',
}
export const BookSchema2 = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  detail: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  author: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: Category1,
  },
});

export interface Book2 extends mongoose.Document {
  id: string;
  title: string;
  detail: string;
  price: number;
  author: string;
  category: Category1;
}

export const BookModel2 = mongoose.model<Book2>('Book', BookSchema2);
