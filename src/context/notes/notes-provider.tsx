import {
  Slot,
  component$,
  useContextProvider,
  useStore,
  useTask$,
} from "@builder.io/qwik";
import { NoteContext, type NoteState } from "./notes-context";
import { getNotes } from "~/services/api";

export const NoteProvider = component$(() => {
  const notes = useStore<NoteState>({
    notes: [],

  });
  useTask$(async () => {
    const data = await getNotes();
    notes.notes = data;

  });

  useContextProvider(NoteContext, notes);

  return <Slot />;
});
