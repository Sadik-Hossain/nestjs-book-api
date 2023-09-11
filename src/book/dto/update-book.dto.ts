import { IsEnum, IsString, IsOptional, IsNumber } from 'class-validator';
import { Category } from '../schema/book.schema';

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly detail: string;

  @IsOptional()
  @IsNumber()
  readonly price: number;

  @IsOptional()
  @IsEnum(Category, {
    message: `category must be one of these: ${Object.values(Category)}`,
  })
  readonly category: Category;

  @IsOptional()
  @IsString()
  readonly author: string;
}
