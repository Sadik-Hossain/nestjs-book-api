import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  Param,
  Query,
  Body,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { BookService } from './book.service';

import { Book2 } from './schema/boos.schema2';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}
  @Get()
  async getAllBooks(
    @Query()
    query: ExpressQuery,
    @Res()
    res: Response,
  ) {
    const { data, totalData, resultPerPage, currentPage, totalPages } =
      await this.bookService.findAll(query);
    res.status(HttpStatus.OK).json({
      meta: {
        totalData,
        resultPerPage,
        currentPage,
        totalPages,
      },
      data,
    });
  }
  @Post('new')
  async createBook(
    @Body()
    book: CreateBookDto,
  ): Promise<Book2> {
    return await this.bookService.create(book);
  }
  @Get(':id') // the param id must be a single string of 24 hex characters
  async getBookById(
    @Param('id')
    id: string,
  ): Promise<Book2> {
    return await this.bookService.findById(id);
  }

  @Put(':id')
  async updateBookById(
    @Param('id')
    id: string,
    @Body()
    book: UpdateBookDto,
    @Res() res: Response,
  ) {
    const data = await this.bookService.updateById(id, book);
    console.log('data', data);
    res.status(HttpStatus.CREATED).json({
      success: true,
      msg: 'update',
      data,
    });
  }
  @Delete(':id')
  async deleteBookById(
    @Param('id')
    id: string,
    @Res() res: Response,
  ) {
    const data = await this.bookService.deleteById(id);
    res.status(HttpStatus.OK).json({
      success: true,
      msg: 'delete',
      data,
    });
  }
}
