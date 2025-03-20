/* eslint-disable @typescript-eslint/no-unused-vars */
import { AnsWerQuestionUseCase } from './answer-question'
import { Answer } from '../entities/answer'

const fakerAnswerRepository = {
  create: async (answer: Answer) => {
    return
  },
}

test('create an answer to a question', async () => {
  const answerTest = new AnsWerQuestionUseCase(fakerAnswerRepository)

  const answer = await answerTest.excute({
    questionId: '1',
    instructorId: '1',
    content: 'new answer',
  })

  expect(answer.content).toEqual('new answer')
})
