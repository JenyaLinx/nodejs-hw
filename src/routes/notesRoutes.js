import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNote,
} from '../controllers/notesController.js';

import {
  getAllNotesSchema,
  noteIdSchema,
  createNoteSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';

import { authenticate } from '../middleware/authenticate.js';

const router = Router();

const validate = (schema) => {
  return typeof schema === 'function' ? schema : celebrate(schema);
};

router.get(
  '/notes',
  authenticate,
  validate(getAllNotesSchema),
  getAllNotes,
);

router.get(
  '/notes/:noteId',
  authenticate,
  validate(noteIdSchema),
  getNoteById,
);

router.post(
  '/notes',
  authenticate,
  validate(createNoteSchema),
  createNote,
);

router.delete(
  '/notes/:noteId',
  authenticate,
  validate(noteIdSchema),
  deleteNote,
);

router.patch(
  '/notes/:noteId',
  authenticate,
  validate(updateNoteSchema),
  updateNote,
);

export default router;