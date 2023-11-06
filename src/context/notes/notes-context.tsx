import { createContextId } from "@builder.io/qwik";
import { type Note_type } from "~/services/types";

export interface NoteState{
notes: Note_type[],


}

export const NoteContext= createContextId<NoteState>("notes-context")