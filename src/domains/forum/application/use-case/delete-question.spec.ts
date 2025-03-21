import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'
import { makeQuestions } from 'tests/factories/make-questions'
import { DeleteQuestionUseCase } from './delete-question'

let inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
let sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)

describe('Delete Questions By Id', () => {
  beforeAll(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to delete a question ', async () => {
    const newQuestion = makeQuestions()

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: newQuestion.authorId.toString(),
    })

    expect(inMemoryQuestionsRepository.items.length).toBe(0)
  })

  it('should not be able to delete a question from another user ', async () => {
    const newQuestion = makeQuestions()

    await inMemoryQuestionsRepository.create(newQuestion)

    expect(async () => {
      await sut.execute({
        questionId: newQuestion.id.toString(),
        authorId: 'another-user-id',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
