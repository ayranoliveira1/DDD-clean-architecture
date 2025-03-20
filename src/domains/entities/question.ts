import { Slug } from "./value-objects/slug";
import { Entity } from "../../core/entities/entity";
import { UniqueEntityId } from "../../core/entities/unique-entity-id";
import { Optional } from "../../core/@types/options";

interface QuestionsProps {
  authorId: UniqueEntityId;
  bestAnswerId?: UniqueEntityId;
  title: string;
  content: string;
  slug: Slug;
  createdAt: Date;
  updatedAt?: Date;
}

export class Question extends Entity<QuestionsProps> {
  static create(
    props: Optional<QuestionsProps, "createdAt">,
    id?: UniqueEntityId
  ) {
    const question = new Question({ ...props, createdAt: new Date() }, id);

    return question;
  }
}
