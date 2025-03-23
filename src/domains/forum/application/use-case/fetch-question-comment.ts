import { QuestionComment } from '../../enterprise/entities/question-comments'
import { QuestionCommentsRepositoty } from '../repositories/question-comments-repository'

interface FetchQuestionCommentUseCaseRequest {
  questionId: string
  page: number
}

interface FetchQuestionCommentUseCaseResponse {
  questionComments: QuestionComment[]
}

export class FetchQuestionCommentUseCase {
  constructor(private questionCommentRepository: QuestionCommentsRepositoty) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionCommentUseCaseRequest): Promise<FetchQuestionCommentUseCaseResponse> {
    const questionComments =
      await this.questionCommentRepository.findManyByQuestionId(questionId, {
        page,
      })

    return { questionComments }
  }
}
