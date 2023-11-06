import { prisma } from "~/lib/prisma";


export const getNotes = async () => {
    try {
      const data = await  prisma.notas.findMany({})
      
      return  data;
    } catch (error) {
      // Manejar errores aquí (por ejemplo, registrarlos o lanzar una excepción personalizada).
      throw new Error('Error al obtener las notas: ' + error);
    } finally {
      await prisma.$disconnect(); // Cerrar la conexión de Prisma cuando termine.
    }
  };

export const createNote = async (  title: string, description: string) => {
  try {
    const createdNote = await prisma.notas.create({
      data: {
        title:title,
        description:description
      }
    });
    return createdNote;
  } catch (error) {
    throw new Error(`Error al crear la nota: ${error}`);
  } finally {
    await prisma.$disconnect(); // Cerrar la conexión de Prisma cuando termine.
  }
};
export const deleteNoteId = async (id: string | null | undefined) => {
  if (id === null || typeof id === 'undefined') {
    throw new Error('El ID no puede ser nulo ni indefinido');
  }

  try {
    await prisma.notas.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    throw new Error(`Error al eliminar la nota: ${error}`);
  }
};
export const updateNoteId = async (id: string | null | undefined,  title:string,description:string ) => {
  if (id === null || typeof id === 'undefined') {
    throw new Error('El ID no puede ser nulo ni indefinido');
  }

  try {
    await prisma.notas.update({
      where: {
        id: id,
      },
      data: {title:title,description:description},
    });
  } catch (error) {
    throw new Error(`Error al actualizar la nota: ${error}`);
  }
};