import { api } from "./api";

const createNote = async (note) => {
  try {
    const addedNote = await api.post("/guest/notes", { note });
    return addedNote.data;
  } catch (e) {
    throw new Error(e.message);
  }
};

const getAllGuestNotes = async () => {
  try {
    const guestNotes = await api.get("/guest/notes");
    return guestNotes.data;
  } catch (e) {
    throw new Error(e.message);
  }
};

const handleNoteShare = async (canShare, noteId) => {
  try {
    await api.put("/guest/notes/canShare", { canShare, noteId });
  } catch (e) {
    throw new Error(e.message);
  }
};
const handleNoteFav = async (isFav, noteId) => {
  try {
    await api.put("/guest/notes/isFav", { isFav, noteId });
  } catch (e) {
    throw new Error(e.message);
  }
};

const getNoteById = async (noteId) => {
  try {
    const guestNote = await api.get(`/guest/notes/${noteId}`);
    return guestNote.data;
  } catch (e) {
    throw new Error(e.message);
  }
};
const deleteNote = async (noteId) => {
  try {
    await api.delete("/guest/notes/", {
      data: {
        noteId,
      },
    });
  } catch (e) {
    throw new Error(e.message);
  }
};

const editNode = async (noteId, note) => {
  try {
    await api.put("/guest/notes/", {
      noteId,
      note,
    });
  } catch (e) {
    throw new Error(e.message);
  }
};

export {
  editNode , 
  createNote,
  getAllGuestNotes,
  handleNoteShare,
  handleNoteFav,
  getNoteById,
  deleteNote,
};
