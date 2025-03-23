import { QuestionCommentsRepositoty } from '@/domains/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '@/domains/forum/enterprise/entities/question-comments'

export class InMemoryQuestionCommentRepository
  implements QuestionCommentsRepositoty
{
  async findById(id: string) {
    const questionComment = this.items.find((item) => item.id.toString() === id)

    if (!questionComment) {
      return null
    }

    return questionComment
  }

  public items: QuestionComment[] = []

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
  }

  async delete(questionComment: QuestionComment) {
    const index = this.items.findIndex((item) => item.id === questionComment.id)

    this.items.splice(index, 1)
  }
}
