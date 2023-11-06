import { component$, Slot } from "@builder.io/qwik";
import { Sidebar } from "~/components/shared/Sidebar/Sidebar";
import { NoteProvider } from "~/context";

export default component$(() => {
  return (
    <>
      <div class="bg-[#202124] font-lexend ">
        <NoteProvider>
          <Sidebar />
          <>
            <Slot />
          </>
        </NoteProvider>
      </div>
    </>
  );
});
