import { AnswerRepository } from '@/domains/forum/application/repositories/answer-repository'
import { Answer } from '@/domains/forum/enterprise/entities/answer'

export class InMemoryAnswerRepository implements AnswerRepository {
  public items: Answer[] = []

  async findById(id: string) {
    const answer = this.items.find((item) => item.id.toString() === id)

    if (!answer) {
      return null
    }

    return answer
  }

  async save(answer: Answer) {
    const index = this.items.findIndex((item) => item.id === answer.id)

    this.items[index] = answer
  }

  async create(answer: Answer) {
    this.items.push(answer)
  }

  async delete(answer: Answer) {
    const index = this.items.findIndex((item) => item.id === answer.id)

    this.items.splice(index, 1)
  }
}
