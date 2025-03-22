import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryAnswerRepository } from 'tests/repositories/in-memory-answer-repository'

let inMemoryAnswerRepository = new InMemoryAnswerRepository()
let sut = new AnswerQuestionUseCase(inMemoryAnswerRepository)

describe('Answer Question', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswerRepository)
  })

  it('create an answer to a question', async () => {
    const { answer } = await sut.excute({
      questionId: '1',
      instructorId: '2',
      content: 'new answer',
    })

    expect(answer.id).toBeTruthy()
    expect(inMemoryAnswerRepository.items[0].id).toEqual(answer.id)
    expect(answer.content).toEqual('new answer')
  })
})
