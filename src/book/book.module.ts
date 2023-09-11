import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookSchema } from './schema/book.schema';
import { BookSchema2 } from './schema/boos.schema2';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Book', schema: BookSchema }]),
    MongooseModule.forFeature([{ name: 'Book2', schema: BookSchema2 }]),
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
