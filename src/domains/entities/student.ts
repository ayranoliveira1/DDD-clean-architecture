import { Entity } from "../../core/entities/entity";

interface StudentProsp {
  name: string;
}
export class Student extends Entity<StudentProsp> {}
