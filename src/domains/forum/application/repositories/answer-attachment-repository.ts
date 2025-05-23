import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'

export interface AnswerAttchmentsRepository {
  findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]>
  deleteManyByAnswerId(answerId: string): Promise<void>
}
