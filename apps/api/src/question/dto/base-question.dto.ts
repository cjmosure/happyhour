import { Expose, Transform } from 'class-transformer';

export class BaseQuestionDto {

  @Expose()
  @Transform(({ value }) => value.toString())
  _id: string;

  @Expose()
  title: string

  @Expose()
  description?: string;

  dislikes: string[];
  __v?: number;
  createdAt: Date;

  constructor(partial: Partial<BaseQuestionDto>) {
    Object.assign(this, partial);
  }
}