import { InMemoryAnswerRepository } from 'tests/repositories/in-memory-answer-repository'
import { makeAnswer } from 'tests/factories/make-answer'
import { EditAnswerUseCase } from './edit-answer'

let inMemoryAnswerRepository = new InMemoryAnswerRepository()
let sut = new EditAnswerUseCase(inMemoryAnswerRepository)

describe('Edit Answer By Id', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new EditAnswerUseCase(inMemoryAnswerRepository)
  })

  it('should be able to edit a answer ', async () => {
    const newAnswer = makeAnswer()

    await inMemoryAnswerRepository.create(newAnswer)

    await sut.execute({
      answerId: newAnswer.id.toString(),
      authorId: newAnswer.authorId.toString(),
      content: 'new content',
    })

    expect(inMemoryAnswerRepository.items[0]).toMatchObject({
      content: 'new content',
    })
  })

  it('should not be able to edit a answer from another user ', async () => {
    const newAnswer = makeAnswer()

    await inMemoryAnswerRepository.create(newAnswer)

    await expect(async () => {
      await sut.execute({
        answerId: newAnswer.id.toString(),
        authorId: 'another-user-id',
        content: 'new content',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
