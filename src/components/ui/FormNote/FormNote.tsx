//Components qwik
import { component$, $, useContext, useTask$ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
//Modular Forms
import { reset, useForm, valiForm$ } from "@modular-forms/qwik";
import type { SubmitHandler } from "@modular-forms/qwik";
//Components
import { TextInput } from "../TextInput/TextInput";
import { ActionButton } from "../ActionButton/ActionButton";
import { TextArea } from "../TextArea.tsx/TextArea";
//Services and types
import { FormShema } from "~/services/types";
import type { NoteForm, ResponseData } from "~/services/types";
import { loadNotes, useFormAction, useFormLoader } from "~/routes";
import { NoteContext } from "~/context";

export const FormNote = component$(() => {
  const notes = useContext(NoteContext);
  const [noteForm, { Form, Field }] = useForm<NoteForm, ResponseData>({
    loader: useFormLoader(),
    validate: valiForm$(FormShema),
    action: useFormAction(),
  });

  const handleSubmit: QRL<SubmitHandler<NoteForm>> = $(async (values) => {
    console.log(values);
    reset(noteForm);
  });

  useTask$(async ({ track }) => {
    track(() => noteForm.response.status);
    const data = await loadNotes();
    notes.notes = data;
  });

  return (
    <>
      <div
        class={
          "bg-[#1b1c20]  rounded-xl  shadow-md shadow-gray-950  p-2 border border-gray-500 group"
        }
      >
        <Form onSubmit$={handleSubmit}>
          <div class=" flex  flex-col gap-3">
            <Field name="title">
              {(field, props) => (
                <TextInput
                  {...props}
                  value={field.value}
                  type="text"
                  placeholder="Ingrese titulo "
                  required
                  error={field.error}
                 
                />
              )}
            </Field>

            <Field name="description">
              {(field, props) => (
                <>
                  <TextArea
                    {...props}
                    value={field.value}
                    error={field.error}
                    placeholder="Ingrese contenido de la nota "
                    required
                 
                  />
                </>
              )}
            </Field>
          </div>{" "}
          <div class="flex justify-end">
            <ActionButton
              loading={noteForm.submitting}
              label="Crear Nota"
              variant="primary"
              type="submit"
            />{" "}
          </div>
        </Form>
      </div>
    </>
  );
});
