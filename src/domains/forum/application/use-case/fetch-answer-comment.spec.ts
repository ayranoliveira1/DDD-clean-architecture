import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { FetchAnswerCommentUseCasse } from './fetch-answer-comment'
import { InMemoryAnswerCommentRepository } from 'tests/repositories/in-memory-answer-comments-repository'
import { makeAnswerComment } from 'tests/factories/make-answer-comment'

let inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository()
let sut = new FetchAnswerCommentUseCasse(inMemoryAnswerCommentRepository)

describe('Fetch Answer Comments', () => {
  beforeEach(() => {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository()
    sut = new FetchAnswerCommentUseCasse(inMemoryAnswerCommentRepository)
  })

  it('should be able to fetch answer comments', async () => {
    await inMemoryAnswerCommentRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId('answer-1') }),
    )
    await inMemoryAnswerCommentRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId('answer-1') }),
    )
    await inMemoryAnswerCommentRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId('answer-1') }),
    )

    const { answerComment } = await sut.execute({
      answerId: 'answer-1',
      page: 1,
    })

    expect(answerComment).toHaveLength(3)
  })

  it('should be able to fetch answer comments with pagination', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentRepository.create(
        makeAnswerComment({ answerId: new UniqueEntityId('answer-1') }),
      )
    }

    const { answerComment } = await sut.execute({
      answerId: 'answer-1',
      page: 2,
    })

    expect(answerComment).toHaveLength(2)
  })
})
