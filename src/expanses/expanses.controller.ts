import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Prop } from '@nestjs/mongoose';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExpanseDto } from './dto/expanse.dto';
import { CreateExpanseDto } from './dto/create-expanse.dto';
import { CommentActionDto } from './dto/comment-action.dto';

@Controller('expanses')
@ApiTags('expanses')
export class ExpansesController {
    @Get('/getExpansesByGroupId:groupId')
    async getExpansesByGroupId(@Param('groupId') groupId: string): Promise<ExpanseDto[]> {
        return [];
    }
    @Post('/addExpanse')
    async addExpanse(@Body() createExpanseDto: CreateExpanseDto): Promise<ExpanseDto> {
        return new ExpanseDto();
    }
    @Post('deleteExpanse')
    async deleteExpanse(@Param('expanseId') expanseId: string): Promise<ExpanseDto>  {
        return new ExpanseDto();
    }
    @Post('updateExpanse')
    async updateExpanse(@Body() expenseDto: ExpanseDto): Promise<ExpanseDto> {
        return new ExpanseDto();
    }
    @Get('addComment/:groupId/:comment')
    async addComment(@Param('groupId') groupId: string, @Param('comment') comment: string) {

    }
    @Get('removeComment/:commentId')
    async removeComment(@Param('commentId') commentId: string ) {

    }
}
