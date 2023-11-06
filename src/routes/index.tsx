// Componentenst Qwik
import { component$, useContext } from "@builder.io/qwik";
import { routeLoader$, server$ } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";
//Modular Forms
import { valiForm$, formAction$ } from "@modular-forms/qwik";
import type { InitialValues } from "@modular-forms/qwik";
//Components
import { FormNote } from "~/components/ui/FormNote/FormNote";
import { NoteList } from "~/components/ui/NoteList/NoteList";
// Services and types
import { NoteContext } from "~/context";
import { prisma } from "~/lib/prisma";
import {
  createNote,
  deleteNoteId,
  getNotes,
  updateNoteId,
} from "~/services/api";
import { FormShema, FormShemaEdit } from "~/services/types";
import type {
  ResponseDataEdit,
  NoteEdit,
  NoteForm,
  ResponseData,
} from "~/services/types";

export const useFormLoader = routeLoader$<InitialValues<NoteForm>>(() => ({
  title: "",
  description: "",
}));

export const useFormAction = formAction$<NoteForm, ResponseData>(
  async (values) => {
    const { title, description } = values;
    const note = await createNote(title, description);

    return {
      data: { note },
    };
  },
  valiForm$(FormShema)
);

export const useFormActionEdit = formAction$<NoteEdit, ResponseDataEdit>(
  async (values) => {
    const { id, title, description } = values;
    try {
      await updateNoteId(id, title, description);
      console.log("Nota actualizada con éxito");
    } catch (error) {
      console.error(error);
    } finally {
      await prisma.$disconnect();
    }

    return {
      data: { success: true },
    };
  },
  valiForm$(FormShemaEdit)
);

export const deleteNote = server$(async (id: string)  => {
  try {
    const miId = id; // Reemplaza con el ID que desees eliminar
    await deleteNoteId(miId);


  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
});

export const loadNotes = server$(() => {
  const notes = getNotes();
  return notes;
});

export default component$(() => {
  const notes = useContext(NoteContext);

  return (
    <>
      <div class="min-h-screen text-lg p-4 sm:ml-64">
        <div class="mx-auto p-4 md:w-1/2 w-full    ">
          <FormNote />
        </div>

        <NoteList notes={notes.notes} />
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Modular Forms Example",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
