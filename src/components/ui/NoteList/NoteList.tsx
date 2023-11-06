import { component$ } from "@builder.io/qwik";
import { type Note_type } from "~/services/types";
import { FormNoteEdit } from "../FormNoteEdit/FormNoteEdit";

type NoteListProps = {
    notes: Note_type[];
  };

export const NoteList = component$(({ notes }: NoteListProps) => {
    return (
      <>
        <div class=" px-12 w-full  mt-10">
          <div class="columns-1 md:columns-2 lg:columns-3 gap-4">
            {notes.length == 0 && (
              <h4 class="text-lg font-semibold text-slate-400">No Notes yet </h4>
            )}
  
            {notes.map((note, index) => (
              <FormNoteEdit key={index} note={note} />
            ))}
          </div>
        </div>
      </>
    );
  });