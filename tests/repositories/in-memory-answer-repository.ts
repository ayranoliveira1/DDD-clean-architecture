import { AnswerRepository } from '@/domains/forum/application/repositories/answer-repository'
import { Answer } from '@/domains/forum/enterprise/entities/answer'

export class InMemoryAnswerRepository implements AnswerRepository {
  public items: Answer[] = []

  async create(answer: Answer) {
    this.items.push(answer)
  }
}
