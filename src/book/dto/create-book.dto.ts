import { IsEnum, IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Category } from './../schema/book.schema';
export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly detail: string;

  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @IsNotEmpty()
  @IsEnum(Category, {
    message: `category must be one of these: ${Object.values(Category)}`,
  })
  readonly category: Category;

  @IsNotEmpty()
  @IsString()
  readonly author: string;
}
