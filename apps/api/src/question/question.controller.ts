import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  Response,
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

  @Put(':id/dislike')
  async dislike(
    @Param('id') id: string,
    @Request() req,
    @Response() res,
  ) {
    const hhidValue = req.cookies.hhid ? req.cookies.hhid : undefined;
    const response = await this.service.dislike(id, hhidValue);
    res.cookie('hhid', response.uuid, {
      // expires: new Date(new Date().getTime() + 30 * 1000),
      // domain: '.happyhour.local',
      maxAge: 90000000,
      httpOnly: true,
      sameSite: 'Lax',
    });

    return res.send(response.question);
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
