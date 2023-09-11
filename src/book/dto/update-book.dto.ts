import { Category } from '../schema/book.schema';

export class UpdateBookDto {
  title: string;
  detail: string;
  price: number;
  category: Category;
  author: string;
}
