import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'

let inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
let sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)

describe('Get Questions By slug', () => {
  beforeAll(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to get a questio ', async () => {
    const newQuestion = Question.create({
      authorId: new UniqueEntityId(),
      title: 'new question',
      content: 'test new question',
    })

    await inMemoryQuestionsRepository.create(newQuestion)

    const { question } = await sut.execute({ slug: 'new-question' })

    expect(question.id).toBeTruthy()
    expect(question.slug.value).toBe(newQuestion.slug.value)
  })
})
