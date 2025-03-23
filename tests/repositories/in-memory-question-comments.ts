import { QuestionCommentsRepositoty } from '@/domains/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domains/forum/enterprise/entities/question-comments'

export class InMemoryQuestionCommentRepository
  implements QuestionCommentsRepositoty
{
  public items: QuestionComment[] = []

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
  }
}
