import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { DislikeQuestionDto } from './dto/dislike-question.dto';
import { Question, QuestionDocument } from './schemas/question.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name) private readonly model: Model<QuestionDocument>,
  ) {}

  async findAll(): Promise<Question[]> {
    return await this.model.aggregate([
      {
          $addFields: { dislike_count: {$size: { "$ifNull": [ "$dislikes", [] ] } } }
      },
      {
          $sort: { 'dislike_count':1, 'createdAt': 1 }
      }
  ])
  }

  async findOne(id: string): Promise<Question> {
    return await this.model.findById(id).exec();
  }

  async dislike(id: string, hhid?: string): Promise<DislikeQuestionDto> {
    if (hhid) {
      const foundDoc = await this.model.findById(id, {dislikes: hhid});
      return {
        uuid: hhid,
        question: foundDoc,
      }
    }
    const userIdentifier = uuidv4();
    const question  = await this.model.findByIdAndUpdate(id, {
      $push: { 'dislikes': userIdentifier }
    }).exec();
    return {
      uuid: userIdentifier,
      question,
    }
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
