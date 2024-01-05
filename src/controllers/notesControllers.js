const noteModel = require("../models/noteModel");
const userModel = require("../models/userModel");
const mongoose = require("mongoose");

const createNote = async (req, res) => {
  const { title, description } = req.body;

  try {
    // Check if the title and description are provided
    if (!title || !description) {
      return res.status(400).json({
        message: "Title and description are required",
      });
    }

    // Create a new note with the provided data and user ID
    const newNote = new noteModel({
      title: title,
      description: description,
      userId: req.userId,
    });

    // Save the new note to the database
    await newNote.save();

    res.status(201).json({
      newNote: {
        id: newNote._id,
        title: newNote.title,
        description: newNote.description,
        userId: newNote.userId,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
const deleteNote = async (req, res) => {
  const noteId = req.params.id;
  try {
    const note = await noteModel.findByIdAndDelete(noteId);
    res.status(202).json(note);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
const updateNote = async (req, res) => {
  const noteId = req.params.id;
  const { title, description } = req.body;
  const newNote = {
    title: title,
    description: description,
    userId: req.userId,
  };
  try {
    await noteModel.findByIdAndUpdate(noteId, newNote, { new: true });
    res.status(200).json(newNote);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
const getNotes = async (req, res) => {
  try {
    const ownedNotes = await noteModel.find({ userId: req.userId });
    const sharedNotes = await noteModel.find({ sharedWith: req.userId });

    res.status(200).json({
      ownedNotes: ownedNotes,
      NotesSharedWithYou: sharedNotes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
const getNoteById = async (req, res) => {
  const noteId = req.params.id;
  try {
    const note = await noteModel.findOne({
      $and: [
        { $or: [{ userId: req.userId }, { sharedWith: req.userId }] },
        { _id: noteId },
      ],
    });
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
const shareNote = async (req, res) => {
  const { sharedUserId } = req.body;
  const noteId = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(sharedUserId)) {
      return res.status(400).json({ error: "Invalid sharedUserId format" });
    }
    // Ensure the shared user exists
    const sharedUser = await userModel.findOne({ _id: sharedUserId });
    console.log(sharedUser);
    if (!sharedUser) {
      return res.status(404).json({ error: "Shared user not found" });
    }

    // Ensure the note exists and belongs to the authenticated user
    const note = await noteModel.findOne({ _id: noteId, userId: req.userId });
    if (!note) {
      return res
        .status(404)
        .json({ error: "Note not found or does not belong to the user" });
    }

    // Ensure the note is not already shared with the user
    if (note.sharedWith.includes(sharedUserId)) {
      return res
        .status(400)
        .json({ error: "Note already shared with the user" });
    }

    // Share the note with the user
    note.sharedWith.push(sharedUserId);
    await note.save();

    res.status(200).json({
      note,
      message: "Note shared successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
const searchNotes = async (req, res) => {
  const query = req.query.q;
  try {
    const searchResult = await noteModel.find({
      $and: [
        { $or: [{ userId: req.userId }, { sharedWith: req.userId }] }, // Notes owned or shared with the user
        { $text: { $search: query } }, // Text search on indexed fields
      ],
    });
    res.json({ notes: searchResult });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  createNote,
  deleteNote,
  updateNote,
  getNotes,
  getNoteById,
  shareNote,
  searchNotes,
};
