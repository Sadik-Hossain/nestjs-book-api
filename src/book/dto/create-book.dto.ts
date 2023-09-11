import { Category } from './../schema/book.schema';
export class CreateBookDto {
  title: string;
  detail: string;
  price: number;
  category: Category;
  author: string;
}
