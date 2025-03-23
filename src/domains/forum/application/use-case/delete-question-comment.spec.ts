import { InMemoryQuestionCommentRepository } from 'tests/repositories/in-memory-question-comments'
import { DeleteQuestionCommentUseCase } from './delete-question-comment'
import { makeQuestionComment } from 'tests/factories/make-question-commet'

let inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository()
let sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentRepository)

describe('Delete question comment', () => {
  beforeEach(() => {
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository()
    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentRepository)
  })

  it('should be able to delete a question  comment ', async () => {
    const newQuestionComment = makeQuestionComment()

    await inMemoryQuestionCommentRepository.create(newQuestionComment)

    await sut.execute({
      questionCommentId: newQuestionComment.id.toString(),
      authorId: newQuestionComment.authorId.toString(),
    })

    expect(inMemoryQuestionCommentRepository.items.length).toBe(0)
  })

  it('should not be able to delete a question comment from another user ', async () => {
    const newQuestionComment = makeQuestionComment()

    await inMemoryQuestionCommentRepository.create(newQuestionComment)

    await expect(async () => {
      await sut.execute({
        questionCommentId: newQuestionComment.id.toString(),
        authorId: 'another-user-id',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
