import { BaseRepository } from "./base.repository";
import { Note } from "../database/entities/courses/note.entity";

export class NoteRepository extends BaseRepository<Note> {
  constructor() {
    super(Note);
  }
}
