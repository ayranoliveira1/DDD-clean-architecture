import { QuestionAttachment } from '../../enterprise/entities/question-attachment'

export interface QuestionAttchmentsRepositoty {
  findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]>
}
