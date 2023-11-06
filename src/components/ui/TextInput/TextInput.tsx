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

type TextInputProps = {
  ref: PropFunction<(element: Element) => void>;
  type: "text" | "email" | "tel" | "password" | "url" | "number" | "date";
  name: string;
  value: string | number | undefined;
  onInput$: PropFunction<(event: Event, element: HTMLInputElement) => void>;
  onChange$: PropFunction<
    (
      event: QwikChangeEvent<HTMLInputElement>,
      element: HTMLInputElement
    ) => void
  >;
  onBlur$: PropFunction<
    (event: QwikFocusEvent<HTMLInputElement>, element: HTMLInputElement) => void
  >;
  placeholder?: string;
  required?: boolean;
  class?: string;
  label?: string;
  error?: string;
  form?: string;
  id? :string;

};

export const TextInput = component$(
  ({ label, value, error, ...props }: TextInputProps) => {
    const { name, required,id } = props;

    const input = useSignal<string | number>();
    useTask$(({ track }) => {
      if (!Number.isNaN(track(() => value))) {
        input.value = value;
      }
    });

    return (
      <>
        <div class={clsx("px-8 lg:px-10", props.class)}>
          <InputLabel name={name} label={label} required={required} />

          <input
            {...props}
            id={id}
            value={input.value}
            aria-invalid={!!error}
            aria-errormessage={`${name}-error`}
            class={clsx(
              "h-10 w-full bg-transparent font-semibold text-white  outline-none placeholder:text-slate-400  md:h-12 md:text-lg lg:h-[60px] lg:px-6 lg:text-lg",
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
