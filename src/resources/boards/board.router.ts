import * as express from 'express';

import boardsService from './board.service';

import { Board } from './board.model';

const router = express.Router();

router.route('/').get(async (_, res) => {
  const boards = await boardsService.getAll();
  res.json(boards.map(Board.toResponse));
});

router.route('/:id').get(async (req, res) => {
  const board = await boardsService.getBoardById(req.params.id);
  if (board) {
    res.json(Board.toResponse(board));
  } else {
    res.status(404).json();
  }
});

router.route('/').post(async (req, res) => {
  const board = await boardsService.createBoard(req.body);
  res.status(201).json(Board.toResponse(board));
});

router.route('/:id').put(async (req, res) => {
  const board = await boardsService.updateBoard(req.params.id, req.body);
  if (board) {
    res.status(200).json(Board.toResponse(board));
  }
});

router.route('/:id').delete(async (req, res) => {
  if (await boardsService.deleteBoard(req.params.id)) {
    res.status(204).json();
  } else {
    res.status(404).json();
  }
});

export default router;
