import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'
import { makeQuestions } from 'tests/factories/make-questions'
import { EditQuestionUseCase } from './edit-question'

let inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
let sut = new EditQuestionUseCase(inMemoryQuestionsRepository)

describe('Edit Questions By Id', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to edit a question ', async () => {
    const newQuestion = makeQuestions()

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: newQuestion.authorId.toString(),
      title: 'new title',
      content: 'new content',
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'new title',
      content: 'new content',
    })
  })

  it('should not be able to edit a question from another user ', async () => {
    const newQuestion = makeQuestions()

    await inMemoryQuestionsRepository.create(newQuestion)

    await expect(async () => {
      await sut.execute({
        questionId: newQuestion.id.toString(),
        authorId: 'another-user-id',
        title: 'new title',
        content: 'new content',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
