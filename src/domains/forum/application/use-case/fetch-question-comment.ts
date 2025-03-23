import { QuestionComment } from '../../enterprise/entities/question-comments'
import { QuestionCommentsRepositoty } from '../repositories/question-comments-repository'

interface FetchQuestionCommentUseCaseRequest {
  questionId: string
  page: number
}

interface FetchQuestionCommentUseCaseResponse {
  questionComment: QuestionComment[]
}

export class FetchQuestionCommentUseCase {
  constructor(private questionCommentRepository: QuestionCommentsRepositoty) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionCommentUseCaseRequest): Promise<FetchQuestionCommentUseCaseResponse> {
    const questionComment =
      await this.questionCommentRepository.findManyByQuestionId(questionId, {
        page,
      })

    return { questionComment }
  }
}
