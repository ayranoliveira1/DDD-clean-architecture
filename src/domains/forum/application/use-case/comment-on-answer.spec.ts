import { makeAnswer } from 'tests/factories/make-answer'
import { CommentOnAnswerUseCase } from './comment-on-answer'
import { InMemoryAnswerRepository } from 'tests/repositories/in-memory-answer-repository'
import { InMemoryAnswerCommentRepository } from 'tests/repositories/in-memory-answer-comments-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository()
let inMemoryAnswerRepository = new InMemoryAnswerRepository()
let sut = new CommentOnAnswerUseCase(
  inMemoryAnswerRepository,
  inMemoryAnswerCommentRepository,
)

describe('Comment on answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository()
    sut = new CommentOnAnswerUseCase(
      inMemoryAnswerRepository,
      inMemoryAnswerCommentRepository,
    )
  })

  it('should be able to comment on answer ', async () => {
    const answer = makeAnswer()

    await inMemoryAnswerRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: 'Comentario teste',
    })

    expect(inMemoryAnswerCommentRepository.items[0].content).toEqual(
      'Comentario teste',
    )
  })

  it('should not be able to comment on teste ', async () => {
    const answer = makeAnswer()

    await inMemoryAnswerRepository.create(answer)

    const result = await sut.execute({
      answerId: 'invalid-id',
      authorId: answer.authorId.toString(),
      content: 'Comentario teste',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
