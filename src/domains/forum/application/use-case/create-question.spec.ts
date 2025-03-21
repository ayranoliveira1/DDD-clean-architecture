import { CreateQuestionUseCase } from './create-question'
import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'

let inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
let sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)

describe('Create Questions', () => {
  beforeAll(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to create a question', async () => {
    const { question } = await sut.execute({
      authorId: '1',
      title: 'new question',
      content: 'create a new question',
    })

    expect(question.id).toBeTruthy()
    expect(inMemoryQuestionsRepository.items[0].id).toEqual(question.id)
    expect(question.content).toEqual('create a new question')
  })
})
