import { DeleteAnswerUseCase } from './delete-answer'
import { InMemoryAnswerRepository } from 'tests/repositories/in-memory-answer-repository'
import { makeAnswer } from 'tests/factories/make-answer'

let inMemoryAnswerRepository = new InMemoryAnswerRepository()
let sut = new DeleteAnswerUseCase(inMemoryAnswerRepository)

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswerRepository)
  })

  it('should be able to delete a answer ', async () => {
    const newAnswer = makeAnswer()

    await inMemoryAnswerRepository.create(newAnswer)

    await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: newAnswer.authorId.toString(),
    })

    expect(inMemoryAnswerRepository.items.length).toBe(0)
  })

  it('should not be able to delete a answer from another user ', async () => {
    const newAnswer = makeAnswer()

    await inMemoryAnswerRepository.create(newAnswer)

    await expect(async () => {
      await sut.execute({
        answerId: newAnswer.id.toString(),
        authorId: 'another-user-id',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
