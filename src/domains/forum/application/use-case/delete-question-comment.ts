import { QuestionCommentsRepositoty } from '../repositories/question-comments-repository'

interface DeleteQuestionCommentUseCaseRequest {
  questionCommentId: string
  authorId: string
}

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentRepository: QuestionCommentsRepositoty) {}

  async execute({
    questionCommentId,
    authorId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<void> {
    const questionComment =
      await this.questionCommentRepository.findById(questionCommentId)

    if (!questionComment) {
      throw new Error('Question comment not found')
    }

    if (questionComment.authorId.toString() !== authorId) {
      throw new Error('Only the author can delete the question comment')
    }

    await this.questionCommentRepository.delete(questionComment)
  }
}
