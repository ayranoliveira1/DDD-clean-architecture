import { Slug } from "./value-objects/slug";
import { Entity } from "../../core/entities/entity";

interface QuestionsProps {
  title: string;
  slug: Slug;
  content: string;
  authorId: string;
}

export class Question extends Entity<QuestionsProps> {}
