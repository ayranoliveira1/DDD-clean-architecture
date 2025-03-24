import { QuestionAttchmentsRepositoty } from '@/domains/forum/application/repositories/question-attachment-repository'
import { QuestionAttachment } from '@/domains/forum/enterprise/entities/question-attachment'

export class InMemoryQuestionAttchmentsRepository
  implements QuestionAttchmentsRepositoty
{
  public items: QuestionAttachment[] = []

  async findManyByQuestionId(questionId: string) {
    const questionAttchments = this.items.filter(
      (item) => item.questionId.toString() === questionId,
    )

    return questionAttchments
  }
}
