import { makeAnswer } from 'tests/factories/make-answer'
import { OnAnswerCreated } from './on-answer-created'
import { InMemoryAnswerRepository } from 'tests/repositories/in-memory-answer-repository'
import { InMemoryAnswerAttchmentsRepository } from 'tests/repositories/in-memory-anser-attachment-repostory'
import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'
import { SendNotificationUseCase } from '../use-case/send-notification'
import { InMemoryQuestionAttchmentsRepository } from 'tests/repositories/in-memory-question-attachment-repository'
import { InMemoryNotificationRepository } from 'tests/repositories/in-memory-notification-repository'
import { makeQuestions } from 'tests/factories/make-questions'

import { MockInstance } from 'vitest'
import { waitFor } from 'tests/utils/wait-for'

let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttchmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository

let inMemoryNotificationRepository: InMemoryNotificationRepository
let sendNotificationUseCase: SendNotificationUseCase

let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttchmentsRepository
let inMemoryAnswerRepository: InMemoryAnswerRepository

let sendNotificationExecuteSpy: MockInstance<
  (typeof sendNotificationUseCase)['execute']
>

describe('On answer created', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentRepository =
      new InMemoryQuestionAttchmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentRepository,
    )

    inMemoryNotificationRepository = new InMemoryNotificationRepository()
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationRepository,
    )

    inMemoryAnswerAttachmentRepository =
      new InMemoryAnswerAttchmentsRepository()
    inMemoryAnswerRepository = new InMemoryAnswerRepository(
      inMemoryAnswerAttachmentRepository,
    )

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    new OnAnswerCreated(inMemoryQuestionsRepository, sendNotificationUseCase)
  })

  it('should send a notification when a new answer is created', async () => {
    const question = makeQuestions()
    const answer = makeAnswer({
      questionId: question.id,
    })

    inMemoryQuestionsRepository.create(question)

    inMemoryAnswerRepository.create(answer)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})
