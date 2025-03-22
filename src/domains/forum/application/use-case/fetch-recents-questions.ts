import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface FetchRecentsQuestionsUseCaseRequest {
  page: number
}

interface FetchRecentsQuestionsUseCaseResponse {
  questions: Question[]
}

export class FetchRecentsQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    page,
  }: FetchRecentsQuestionsUseCaseRequest): Promise<FetchRecentsQuestionsUseCaseResponse> {
    const questions = await this.questionsRepository.findManyRecents({ page })

    return { questions }
  }
}
