import { type Input, minLength, object, string } from "valibot";

export type Note_type = {

    id: string  ;
    title: string  ;
    description: string  ;


}

export const FormShema= object({
    title: string([minLength(1, "Ingrese titulo de la nota .")]),
    description: string([minLength(1, "Ingrese contenido de nota.")]),

  });


export  type NoteForm = Input<typeof FormShema>;

export const FormShemaEdit = object({
    id: string(),
    title: string([minLength(1, "Ingrese Titulo de nota.")]),
    description: string([minLength(1, "Ingrese contenido de nota.")]),
  });
  

  export type NoteEdit = Input<typeof FormShemaEdit>;


 export  type ResponseData = {
    note: Note_type;
  };


  export  type ResponseDataEdit = {
    success: boolean;
  };