import { BaseQuestionDto } from "./base-question.dto";

export interface DislikeQuestionDto {
  question: BaseQuestionDto,
  uuid: string;
}