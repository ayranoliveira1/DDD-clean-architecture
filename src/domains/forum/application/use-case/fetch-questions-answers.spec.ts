import { InMemoryAnswerRepository } from 'tests/repositories/in-memory-answer-repository'
import { FetchQuestionsAnswersUseCase } from './fetch-questions-answers'
import { makeAnswer } from 'tests/factories/make-answer'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryAnswerRepository = new InMemoryAnswerRepository()
let sut = new FetchQuestionsAnswersUseCase(inMemoryAnswerRepository)

describe('Fetch Questions Answers', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new FetchQuestionsAnswersUseCase(inMemoryAnswerRepository)
  })

  it('should be able to fetch questions answers', async () => {
    await inMemoryAnswerRepository.create(
      makeAnswer({ questionId: new UniqueEntityId('question-1') }),
    )
    await inMemoryAnswerRepository.create(
      makeAnswer({ questionId: new UniqueEntityId('question-1') }),
    )
    await inMemoryAnswerRepository.create(
      makeAnswer({ questionId: new UniqueEntityId('question-1') }),
    )

    const result = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(result.value?.answers).toHaveLength(3)
  })

  it('should be able to fetch questions answers with pagination', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerRepository.create(
        makeAnswer({ questionId: new UniqueEntityId('question-1') }),
      )
    }

    const result = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(result.value?.answers).toHaveLength(2)
  })
})
