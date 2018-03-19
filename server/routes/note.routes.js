const express = require('express')
const router = express.Router()
import * as NoteController from '../controllers/note.controller';

router.route('/notes').post(NoteController.addNote);

router.route('/notes/:noteId').delete(NoteController.deleteNote);

router.route('/notes/:noteId/task').post(NoteController.updateTask);

module.exports = router;