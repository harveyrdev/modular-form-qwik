import {
  type PropFunction,
  component$,
  useSignal,
  useTask$,
  type QwikChangeEvent,
  type QwikFocusEvent,
} from "@builder.io/qwik";
import clsx from "clsx";

import { InputLabel } from "../InputLabel/InputLabel";
import { InputError } from "../InputError/InputError";

type TextAreaInputProps = {
  ref: PropFunction<(element: Element) => void>;
  name: string;
  value: string |undefined;
  onInput$: PropFunction<(event: Event, element: HTMLTextAreaElement) => void>;
  onChange$: PropFunction<
    (
      event: QwikChangeEvent<HTMLTextAreaElement>,
      element: HTMLTextAreaElement
    ) => void
  >;
  onBlur$: PropFunction<
    (
      event: QwikFocusEvent<HTMLTextAreaElement>,
      element: HTMLTextAreaElement
    ) => void
  >;
  placeholder?: string;
  required?: boolean;
  class?: string;
  label?: string;
  error?: string;
  form?: string;
  id?: string;
};

export const TextArea = component$(
  ({ label, value, error, ...props }: TextAreaInputProps) => {
    const { name, required, id } = props;

    const element = useSignal<HTMLTextAreaElement>();
    useTask$(({ track }) => {
      track(() => value);
      if (element.value) {
        element.value.style.height = "auto";  
        element.value.style.height = element.value.scrollHeight + "px";
      } 

    });

 

    return (
      <>
        <div class={clsx("px-8 lg:px-10", props.class)}>
          <InputLabel name={name} label={label} required={required} />

          <textarea
            {...props}
            id={id}
            value={value}
            aria-invalid={!!error}
            ref={element}
            rows={1}
            aria-errormessage={`${name}-error`}
            class={clsx(
              " resize-none    overflow-hidden  w-full bg-transparent  font-semibold text-white  outline-none placeholder:text-slate-400 bg-gray-900  md:text-lg   lg:px-6 lg:text-lg",
              error
                ? "border-red-400/50"
                : " border-slate-800 hover:border-slate-700 focus:border-sky-400/50"
            )}
          />
          <InputError name={name} error={error} />
        </div>
      </>
    );
  }
);
