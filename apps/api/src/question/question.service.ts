import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question, QuestionDocument } from './schemas/question.schema';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name) private readonly model: Model<QuestionDocument>,
  ) {}

  async findAll(): Promise<Question[]> {
    return await this.model.find().exec();
  }

  async findOne(id: string): Promise<Question> {
    return await this.model.findById(id).exec();
  }

  async getRandom(): Promise<Question> {
    const randomRecord = await this.model.aggregate([{ $sample: { size: 1 } }]);
    return randomRecord[0];
  }

  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    return await new this.model({
      ...createQuestionDto,
      createdAt: new Date(),
    }).save();
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto): Promise<Question> {
    return await this.model.findByIdAndUpdate(id, updateQuestionDto).exec();
  }

  async delete(id: string): Promise<Question> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
