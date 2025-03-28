import { InMemoryAnswerRepository } from 'tests/repositories/in-memory-answer-repository'
import { makeAnswer } from 'tests/factories/make-answer'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'
import { InMemoryQuestionsRepository } from 'tests/repositories/in-memory-questions-repository'
import { makeQuestions } from 'tests/factories/make-questions'
import { NotAllowedError } from '@/core/@types/errors/errors/not-allowed-error'
import { InMemoryQuestionAttchmentsRepository } from 'tests/repositories/in-memory-question-attachment-repository'
import { InMemoryAnswerAttchmentsRepository } from 'tests/repositories/in-memory-anser-attachment-repostory'

let inMemoryQuestionAttachmentRepository =
  new InMemoryQuestionAttchmentsRepository()

let inMemoryAnswerAttchmentsRepository =
  new InMemoryAnswerAttchmentsRepository()

let inMemoryQuestionRepository = new InMemoryQuestionsRepository(
  inMemoryQuestionAttachmentRepository,
)
let inMemoryAnswerRepository = new InMemoryAnswerRepository(
  inMemoryAnswerAttchmentsRepository,
)
let sut = new ChooseQuestionBestAnswerUseCase(
  inMemoryQuestionRepository,
  inMemoryAnswerRepository,
)

describe('Choose best Answer', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentRepository =
      new InMemoryQuestionAttchmentsRepository()

    inMemoryAnswerAttchmentsRepository =
      new InMemoryAnswerAttchmentsRepository()

    inMemoryAnswerRepository = new InMemoryAnswerRepository(
      inMemoryAnswerAttchmentsRepository,
    )
    inMemoryQuestionRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentRepository,
    )
    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryQuestionRepository,
      inMemoryAnswerRepository,
    )
  })

  it('should be able to choose the question best answer ', async () => {
    const question = makeQuestions()
    const answer = makeAnswer({ questionId: question.id })

    await inMemoryQuestionRepository.create(question)
    await inMemoryAnswerRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString(),
    })

    expect(inMemoryQuestionRepository.items[0].bestAnswerId).toEqual(answer.id)
  })

  it('should not be able to choose anther user question best answer ', async () => {
    const question = makeQuestions()
    const answer = makeAnswer({ questionId: question.id })

    await inMemoryQuestionRepository.create(question)
    await inMemoryAnswerRepository.create(answer)

    const result = await sut.execute({
      answerId: answer.id.toString(),
      authorId: 'another-user-id',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
