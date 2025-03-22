import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'
import { makeQuestions } from 'tests/factories/make-questions'
import { FetchRecentsQuestionsUseCase } from './fetch-recents-questions'

let inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
let sut = new FetchRecentsQuestionsUseCase(inMemoryQuestionsRepository)

describe('Fetch Recents questions', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new FetchRecentsQuestionsUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to fetch recents questioms', async () => {
    await inMemoryQuestionsRepository.create(
      makeQuestions({ createdAt: new Date(2025, 0, 20) }),
    )
    await inMemoryQuestionsRepository.create(
      makeQuestions({ createdAt: new Date(2025, 0, 18) }),
    )
    await inMemoryQuestionsRepository.create(
      makeQuestions({ createdAt: new Date(2025, 0, 23) }),
    )

    const { questions } = await sut.execute({ page: 1 })

    expect(questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2025, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2025, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2025, 0, 18) }),
    ])
  })

  it('should be able to fetch paginated recents questioms', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepository.create(makeQuestions())
    }

    const { questions } = await sut.execute({ page: 2 })

    expect(questions).toHaveLength(2)
  })
})
