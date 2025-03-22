import { AnswerRepository } from '../repositories/answer-repository'

interface EditAnswerUseCaseRequest {
  answerId: string
  authorId: string
  content: string
}

export class EditAnswerUseCase {
  constructor(private answerRepository: AnswerRepository) {}

  async execute({ answerId, authorId, content }: EditAnswerUseCaseRequest) {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found')
    }

    if (answer.authorId.toString() !== authorId) {
      throw new Error('You are not the author of this answer')
    }

    answer.content = content

    await this.answerRepository.save(answer)
  }
}
