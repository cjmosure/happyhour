import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionService } from './question.service';

@Controller('questions')
export class QuestionsController {
  constructor(
    private readonly service: QuestionService
  ) {}

  @Get()
  async index() {
    return await this.service.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    return await this.service.findOne(id);
  }

  @Post()
  async create(@Body() createQuestionDto: CreateQuestionDto) {
    return await this.service.create(createQuestionDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return await this.service.update(id, updateQuestionDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}

@Controller('question')
export class QuestionController {
  constructor(private readonly service: QuestionService) {}

  @Get()
  async index() {
    return await this.service.getRandom();
  }

}
