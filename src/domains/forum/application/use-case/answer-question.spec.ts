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
    const result = await sut.excute({
      questionId: '1',
      instructorId: '2',
      content: 'new answer',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswerRepository.items[0].id).toEqual(
      result.value?.answer.id,
    )
    expect(result.value?.answer.content).toEqual('new answer')
  })
})
