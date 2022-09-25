import * as dotenv from 'dotenv';
dotenv.config();
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionModule } from './question/question.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true,}),
    MongooseModule.forRoot(process.env.DATABASE_CONNECTION_STRING, {useFindAndModify: false}),
    QuestionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
