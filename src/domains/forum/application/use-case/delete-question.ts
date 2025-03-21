import { QuestionsRepository } from '../repositories/questions-repository'

interface DeleteQuestionsUseCaseRequest {
  authorId: string
  questionId: string
}

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionsUseCaseRequest): Promise<void> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found')
    }

    if (question.authorId.toString() !== authorId) {
      throw new Error('You are not allowed to delete this question')
    }

    await this.questionsRepository.delete(question)
  }
}
