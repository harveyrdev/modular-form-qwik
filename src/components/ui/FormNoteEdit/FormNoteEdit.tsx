//Components qwik
import {
  component$,
  $,
  useSignal,
  useContext,
  useTask$,
} from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
//Modular Forms
import {  useForm, valiForm$ } from "@modular-forms/qwik";
import type { SubmitHandler } from "@modular-forms/qwik";
//Components
import { TextInput } from "../TextInput/TextInput";
import { ActionButton } from "../ActionButton/ActionButton";
import { ColorButton } from "../ColorButton/ColorButton";
import { TextArea } from "../TextArea.tsx/TextArea";
//Services and types
import { FormShemaEdit } from "~/services/types";

import type { ResponseDataEdit, NoteEdit, Note_type } from "~/services/types";
import { deleteNote, loadNotes, useFormActionEdit } from "~/routes";
import { NoteContext } from "~/context";
//Styles
import clsx from "clsx";
type NoteProps = {
  note: Note_type;
};

export const FormNoteEdit = component$(({ note }: NoteProps) => {
  const open = useSignal(false);
  const notes = useContext(NoteContext);

  const [noteFormEdit, { Field, Form }] = useForm<NoteEdit, ResponseDataEdit>({
    loader: {
      value: {
        id: note.id,
        title: note.title,
        description: note.description,
      },
    },
    action: useFormActionEdit(),
    validate: valiForm$(FormShemaEdit),
  });

  const handleSubmit: QRL<SubmitHandler<NoteEdit>> = $(async (values) => {
    console.log(values);
  });
  useTask$(async ({ track }) => {
    track(() => noteFormEdit.response.status);
    const data = await loadNotes();
    notes.notes = data;
    open.value = false;
  });

  return (
    <div>
      <div
        onClick$={() => {
          open.value = true;
        }}
        class="h-auto  cursor-pointer  break-inside-avoid-column  w-full mb-4  p-6 rounded-lg border-[0.5px] border-gray-500 animate-fade-up "
      >
        <div class="mb-8 flex flex-col items-center  gap-3 text-slate-200">
          <h1 class="text-lg font-semibold " id="po">
            {note.title}
          </h1>
          <p class="tracking-wide" id="content">
            {" "}
            {note.description}
          </p>
        </div>
      </div>

      <div
        class={clsx(
          open.value
            ? "justify-center flex items-center  overflow-x-hidden overflow-y-auto fixed inset-0 z-50 focus:outline-none transition-colors duration-200 "
            : "hidden"
        )}
      >
        <div class="relative w-full max-w-2xl max-h-full rounded-lg ">
          {/*content*/}
          <div class=" bg-[#202124]  rounded-lg shadow ">
            {/*header*/}
            <div class="flex items-start justify-between  rounded-t">
              <button
                onClick$={() => {
                  open.value = false;
                }}
                type="button"
                class="text-gray-400 bg-transparent  rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white"
              >
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            {/*body*/}
            <div class="relative  flex-auto p-5">
              <Form onSubmit$={handleSubmit}>
                <div>
                  <Field name="title">
                    {(field, props) => (
                      <>
                        <TextInput
                          {...props}
                          value={field.value}
                          error={field.error}
                          placeholder="Ingrese titulo nota"
                          required
                          type="text"
                        />
                      </>
                    )}
                  </Field>
                </div>
                <div>
                  <Field name="description">
                    {(field, props) => (
                      <>
                        <TextArea
                          {...props}
                          value={field.value}
                          error={field.error}
                          placeholder="Ingrese contenido de la nota nota"
                          required
                        />
                      </>
                    )}
                  </Field>
                </div>{" "}
                <div class="hidden">
                  <Field name="id" type="string">
                    {(field, props) => (
                      <>
                        <TextInput
                          {...props}
                          value={field.value}
                          error={field.error}
                          required
                          type="text"
                        />
                      </>
                    )}
                  </Field>
                </div>{" "}
                <div class="flex justify-center  md:justify-end gap-4">
                  <ActionButton
                    loading={noteFormEdit.submitting}
                    label="Guardar"
                    variant="secondary"
                    type="submit"
                  />{" "}
                  <ColorButton
                    color="red"
                    label="Eliminar"
                    width="auto"
                    onClick$={async () => {
                      await deleteNote(note.id);
                      const data = await loadNotes();
                      notes.notes = data;
                      open.value = false;
                    }}
                  />
                </div>
              </Form>
            </div>
            {/*footer*/}
          </div>
        </div>
      </div>
      <div
        class={clsx(
          open.value
            ? " block opacity-50 fixed inset-0 z-40 bg-black"
            : "hidden"
        )}
      ></div>
    </div>
  );
});
