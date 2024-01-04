const express = require("express");
const auth = require("../middleware/auth");
const notesRouter = express.Router();
const {
  createNote,
  deleteNote,
  getNotes,
  updateNote,
  getNoteById,
  shareNote,
  searchNotes,
} = require("../controllers/notesControllers");



notesRouter.get("/", auth, getNotes);

notesRouter.get("/search", auth, searchNotes);

notesRouter.post("/", auth, createNote);

notesRouter.delete("/:id", auth, deleteNote);

notesRouter.put("/:id", auth, updateNote);

notesRouter.get("/:id", auth, getNoteById);

notesRouter.post("/:id/share", auth, shareNote);

module.exports = notesRouter;
