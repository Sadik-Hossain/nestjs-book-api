import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
export enum Category {
  FICTION = 'fiction',
  ADVENTURE = 'adventure',
  HISTORY = 'history',
  CRIME = 'crime',
}
@Schema({
  timestamps: true,
})
export class Book {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  detail: string;
  @Prop({ required: true })
  author: string;
  @Prop({ required: true })
  price: number;
  @Prop({ required: true })
  category: Category;
}

export const BookSchema = SchemaFactory.createForClass(Book);
