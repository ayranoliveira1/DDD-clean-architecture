import { QuestionComment } from '../../enterprise/entities/question-comments'

export interface QuestionCommentsRepositoty {
  create(questionComment: QuestionComment): Promise<void>
}
