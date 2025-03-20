import { Answer } from "../entities/answer";
import { AnswerRepository } from "../repositories/answer-repository";

interface AnsWerQuestionUseCaseRequest {
  instructorId: string;
  questionId: string;
  content: string;
}

export class AnsWerQuestionUseCase {
  constructor(private answerReposoty: AnswerRepository) {}

  async excute({
    instructorId,
    questionId,
    content,
  }: AnsWerQuestionUseCaseRequest) {
    const answer = new Answer({
      content,
      authorId: instructorId,
      questionId,
    });

    await this.answerReposoty.create(answer);

    return answer;
  }
}
