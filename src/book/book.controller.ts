import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from '@prisma/client';
import { Request, Response } from 'express';

@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) { }

    @Get()
    async getAllBooks(@Req() request: Request, @Res() response: Response): Promise<any> {
        const book = await this.bookService.getAll()
        return response.status(200).json({
            status: 'success',
            data: book
        })
    }
    @Get(':id')
    async getOneBook(@Param('id') id: number): Promise<Book> {
        return await this.bookService.getBook(id);
    }
    @Post()
    async createBook(@Body() data: Book): Promise<Book> {
        return await this.bookService.createBook(data);
    }
    @Put(':id')
    async updateBook(@Param('id') id: number, @Body() data: Book): Promise<Book> {
        return await this.bookService.updateBook(id, data);
    }
    @Delete(':id')
    async deleteBook(@Param('id') id: number): Promise<Book> {
        return await this.bookService.deleteBook(id);
    }
}
