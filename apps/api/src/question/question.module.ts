import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController, QuestionsController } from './question.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Question, QuestionSchema } from './schemas/question.schema';

@Module({
  providers: [QuestionService],
  controllers: [QuestionController, QuestionsController],
  imports: [
    MongooseModule.forFeature([{ name: Question.name, schema: QuestionSchema }]),
  ],
})
export class QuestionModule {}
