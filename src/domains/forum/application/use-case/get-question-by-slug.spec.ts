import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { makeQuestions } from 'tests/factories/make-questions'

let inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
let sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)

describe('Get Questions By slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to get a questio ', async () => {
    const newQuestion = makeQuestions()

    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({ slug: newQuestion.slug.value })

    expect(result.isRight()).toBe(true)
    if ('question' in result.value) {
      expect(result.value.question.title).toEqual(newQuestion.title)
    }
  })
})
