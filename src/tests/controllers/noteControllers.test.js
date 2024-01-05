const noteModel = require("../../models/noteModel");
const userModel = require("../../models/userModel");
const { deleteNote } = require("../../controllers/notesControllers");
const { updateNote } = require("../../controllers/notesControllers");
const { getNotes } = require("../../controllers/notesControllers");
const { getNoteById } = require("../../controllers/notesControllers");
const { shareNote } = require("../../controllers/notesControllers");
const { searchNotes } = require("../../controllers/notesControllers");
const { createNote } = require("../../controllers/notesControllers");

const mongoose = require("mongoose");

jest.mock("../../models/noteModel");
jest.mock("../../models/userModel");

describe("deleteNote Controller", () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockReq = {
      params: {
        id: "mockNoteId",
      },
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should delete the note and return 202 if note exists", async () => {
    const mockNote = {
      _id: "mockNoteId",
      title: "Test Title",
      description: "Test Description",
      userId: "mockUserId",
    };

    // Mocking the findByIdAndDelete function to return a deleted note
    noteModel.findByIdAndDelete.mockResolvedValueOnce(mockNote);

    await deleteNote(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(202);
    expect(mockRes.json).toHaveBeenCalledWith(mockNote);
  });

  it("should return 500 if something goes wrong during deletion", async () => {
    const mockError = new Error("Mock Internal Server Error");

    // Mocking the findByIdAndDelete function to throw an error
    noteModel.findByIdAndDelete.mockRejectedValueOnce(mockError);

    await deleteNote(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Something went wrong",
    });
  });
});

describe("updateNote Controller", () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockReq = {
      params: { id: "mockNoteId" },
      body: { title: "Updated Title", description: "Updated Description" },
      userId: "mockUserId",
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should update a note and return the updated note", async () => {
    const mockNote = {
      _id: "mockNoteId",
      title: "Updated Title",
      description: "Updated Description",
      userId: "mockUserId",
    };

    // Mock the findByIdAndUpdate method of the noteModel
    noteModel.findByIdAndUpdate.mockResolvedValueOnce(mockNote);

    // Call the updateNote controller function
    await updateNote(mockReq, mockRes);

    // Assertions
    expect(noteModel.findByIdAndUpdate).toHaveBeenCalledWith(
      "mockNoteId",
      {
        title: "Updated Title",
        description: "Updated Description",
        userId: "mockUserId",
      },
      { new: true }
    );
    expect(mockRes.status).toHaveBeenCalledWith(200);
    console.log(mockRes.json);
    expect(mockRes.json).toHaveBeenCalledWith({
      _id: "mockNoteId",
      title: "Updated Title",
      description: "Updated Description",
      userId: "mockUserId",
    });
  });

  it("should handle an internal server error and return 500", async () => {
    // Mock the findByIdAndUpdate method to throw an error
    noteModel.findByIdAndUpdate.mockRejectedValueOnce(
      new Error("Mock Internal Server Error")
    );

    // Call the updateNote controller function
    await updateNote(mockReq, mockRes);

    // Assertions
    expect(noteModel.findByIdAndUpdate).toHaveBeenCalledWith(
      "mockNoteId",
      {
        title: "Updated Title",
        description: "Updated Description",
        userId: "mockUserId",
      },
      { new: true }
    );
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Something went wrong",
    });
  });
});

describe("getNotes Controller", () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockReq = {
      userId: new mongoose.Types.ObjectId().toHexString(),
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should get owned and shared notes and return 200", async () => {
    const mockOwnedNotes = [
      {
        _id: "ownedNoteId1",
        title: "Owned Note 1",
        description: "Description 1",
        userId: mockReq.userId,
      },
      {
        _id: "ownedNoteId2",
        title: "Owned Note 2",
        description: "Description 2",
        userId: mockReq.userId,
      },
    ];

    const mockSharedNotes = [
      {
        _id: "sharedNoteId1",
        title: "Shared Note 1",
        description: "Description 1",
        sharedWith: [mockReq.userId],
      },
      {
        _id: "sharedNoteId2",
        title: "Shared Note 2",
        description: "Description 2",
        sharedWith: [mockReq.userId],
      },
    ];

    noteModel.find.mockReturnValueOnce(mockOwnedNotes);
    noteModel.find.mockReturnValueOnce(mockSharedNotes);

    await getNotes(mockReq, mockRes);

    expect(noteModel.find).toHaveBeenCalledWith({ userId: mockReq.userId });
    expect(noteModel.find).toHaveBeenCalledWith({ sharedWith: mockReq.userId });

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      ownedNotes: mockOwnedNotes,
      NotesSharedWithYou: mockSharedNotes,
    });
  });

  it("should handle internal server error and return 500", async () => {
    const mockError = new Error("Mock Internal Server Error");

    noteModel.find.mockRejectedValueOnce(mockError);

    await getNotes(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Something went wrong",
    });
  });
});

describe("getNoteById Controller", () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockReq = {
      params: { id: "mockNoteId" },
      userId: new mongoose.Types.ObjectId().toHexString(),
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should get a note by id and return 200", async () => {
    const mockNote = {
      _id: "mockNoteId",
      title: "Mock Note",
      description: "Mock Description",
      userId: mockReq.userId,
    };

    noteModel.findOne.mockReturnValueOnce(mockNote);

    await getNoteById(mockReq, mockRes);

    expect(noteModel.findOne).toHaveBeenCalledWith({
      $and: [
        { $or: [{ userId: mockReq.userId }, { sharedWith: mockReq.userId }] },
        { _id: mockReq.params.id },
      ],
    });

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockNote);
  });

  it("should return 404 if note is not found", async () => {
    noteModel.findOne.mockReturnValueOnce(null);

    await getNoteById(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ error: "Note not found" });
  });

  it("should handle internal server error and return 500", async () => {
    const mockError = new Error("Mock Internal Server Error");

    noteModel.findOne.mockRejectedValueOnce(mockError);

    await getNoteById(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Something went wrong",
    });
  });
});

describe("searchNotes controller", () => {
  const mockReq = {
    query: { q: "test query" },
    userId: "123",
  };
  const mockRes = {
    json: jest.fn(),
    status: jest.fn(),
  };

  it("should return search results successfully", async () => {
    const mockSearchResult = [{ _id: "1" }, { _id: "2" }]; // Mock search results
    noteModel.find.mockResolvedValue(mockSearchResult);

    await searchNotes(mockReq, mockRes);

    expect(noteModel.find).toHaveBeenCalledWith({
      $and: [
        { $or: [{ userId: mockReq.userId }, { sharedWith: mockReq.userId }] },
        { $text: { $search: mockReq.query.q } },
      ],
    });
    expect(mockRes.json).toHaveBeenCalledWith({ notes: mockSearchResult });
    expect(mockRes.status).not.toHaveBeenCalled();
  });

  it("should handle errors", async () => {
    const mockError = new Error("Internal Server Error");
    noteModel.find.mockResolvedValue(mockError);

    try {
      await searchNotes(mockReq, mockRes); // Pass mockRes here
    } catch (error) {
      expect(mockRes.json).toHaveBeenCalledWith({
        error: "Internal Server Error",
      });
      expect(mockRes.status).toHaveBeenCalledWith(500);
    }
  });
});

describe("shareNote Controller", () => {
  let mockReq;
  let mockRes;

  beforeEach(() => {
    mockReq = {
      body: {
        sharedUserId: "mockSharedUserId",
      },
      params: {
        id: "mockNoteId",
      },
      userId: "mockUserId",
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should share the note with the user and return success message", async () => {
    const mockUser = { _id: "mockSharedUserId" };
    const mockNote = {
      _id: "mockNoteId",
      userId: "mockUserId",
      sharedWith: [],
    };

    // Mock user and note retrieval
    userModel.findOne.mockResolvedValueOnce(mockUser);
    noteModel.findOne.mockResolvedValueOnce(mockNote);

    // Call the shareNote controller function
    await shareNote(mockReq, mockRes);

    // Assertions
    expect(userModel.findOne).toHaveBeenCalledWith({ _id: "mockSharedUserId" });
    expect(noteModel.findOne).toHaveBeenCalledWith({
      _id: "mockNoteId",
      userId: "mockUserId",
    });
    expect(mockNote.sharedWith).toContain("mockSharedUserId");
    expect(mockNote.save).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      note: mockNote,
      message: "Note shared successfully",
    });
  });

  it("should handle invalid sharedUserId format and return 400", async () => {
    // Mock invalid sharedUserId format
    mockReq.body.sharedUserId = "invalidId";

    // Call the shareNote controller function
    await shareNote(mockReq, mockRes);

    // Assertions
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "Invalid sharedUserId format",
    });
  });

  it("should handle shared user not found and return 404", async () => {
    // Mock user not found
    userModel.findOne.mockResolvedValueOnce(null);

    // Call the shareNote controller function
    await shareNote(mockReq, mockRes);

    // Assertions
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "Shared user not found",
    });
  });

  it("should handle note not found or does not belong to the user and return 404", async () => {
    // Mock note not found
    noteModel.findOne.mockResolvedValueOnce(null);

    // Call the shareNote controller function
    await shareNote(mockReq, mockRes);

    // Assertions
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "Note not found or does not belong to the user",
    });
  });

  it("should handle note already shared with the user and return 400", async () => {
    // Mock note already shared with the user
    const mockNote = {
      _id: "mockNoteId",
      userId: "mockUserId",
      sharedWith: ["mockSharedUserId"],
    };
    noteModel.findOne.mockResolvedValueOnce(mockNote);

    // Call the shareNote controller function
    await shareNote(mockReq, mockRes);

    // Assertions
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "Note already shared with the user",
    });
  });

  it("should handle internal server error and return 500", async () => {
    // Mock internal server error
    userModel.findOne.mockRejectedValueOnce(
      new Error("Mock Internal Server Error")
    );

    // Call the shareNote controller function
    await shareNote(mockReq, mockRes);

    // Assertions
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: "Something went wrong",
    });
  });
});
