import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './schema/book.schema';
import { Book2 } from './schema/boos.schema2';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
    @InjectModel('Book2') private readonly bookModel2: Model<Book2>,
  ) {}

  async create(book: CreateBookDto): Promise<Book2> {
    try {
      //   const createdBook = new this.bookModel(book);
      const createdBook = new this.bookModel2(book);
      return await createdBook.save();
    } catch (error) {
      // duplication key errror
      if (error.code === 11000) {
        throw new BadRequestException('Duplicated key');
      }

      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Book2[]> {
    try {
      //   const books = await this.bookModel.find({});
      const books = await this.bookModel2.find({});
      return books;
    } catch (error) {
      throw new NotFoundException('No books found');
    }
  }

  async findById(id: string): Promise<Book2> {
    try {
      const book = await this.bookModel2.findById(id);
      console.log(book);
      if (!book) throw new NotFoundException('No book found');
      return book;
    } catch (error) {
      if (error.name === 'CastError') {
        throw new BadRequestException('Invalid ID');
      }
      throw new NotFoundException(error.message);
    }
  }

  async updateById(id: string, book: UpdateBookDto) {
    try {
      const updatedBook = await this.bookModel2.findByIdAndUpdate(id, book, {
        new: true, // return the updated document
        runValidators: true, // validate the update operation against the model's schema
        // findAndModify: false, // disable findOneAndUpdate() and findOneAndRemove()
      });
      console.log(`updatedBook: ${updatedBook}`);
      return updatedBook;
    } catch (error) {
      console.log({
        name: error.name,
        msg: error.message,
        code: error.code,
        error: JSON.stringify(error),
      });
      if (error.name === 'CastError') {
        throw new BadRequestException('Invalid ID');
      }
      if (error.name === 'ValidationError') {
        throw new BadRequestException(error.message);
      }

      // duplication key errror
      if (error.code === 11000) {
        throw new BadRequestException('title already exists');
      }
    }
  }
  async deleteById(id: string) {
    try {
      const deletedBook = await this.bookModel2.findByIdAndDelete(id);
      if (!deletedBook) throw new NotFoundException('No book found');
      return deletedBook;
    } catch (error) {
      if (error.name === 'CastError') {
        throw new BadRequestException('Invalid ID');
      }
      throw new NotFoundException(error.message);
    }
  }
}
