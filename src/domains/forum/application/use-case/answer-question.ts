import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Answer } from '../../enterprise/entities/answer'
import { AnswerRepository } from '../repositories/answer-repository'

interface AnsWerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  content: string
}

export class AnsWerQuestionUseCase {
  constructor(private answerReposoty: AnswerRepository) {}

  async excute({
    instructorId,
    questionId,
    content,
  }: AnsWerQuestionUseCaseRequest) {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
    })

    await this.answerReposoty.create(answer)

    return answer
  }
}
