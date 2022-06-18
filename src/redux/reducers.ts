import { combineReducers } from 'redux';
import * as puzzleActions from './actions';
import { createProcessingSlice } from './utils';

const puzzleSetsById = (state = {}, action: puzzleActions.PuzzleActions) => {
  switch (action.type) {
    case puzzleActions.GET_PUZZLESET_SUCCESS:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    default:
      return state;
  }
};

const puzzlesById = (state = {}, action: puzzleActions.PuzzleActions) => {
  switch (action.type) {
    case puzzleActions.GET_PUZZLE_SUCCESS:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    default:
      return state;
  }
};

const puzzleCluesById = (state = {}, action: puzzleActions.PuzzleActions) => {
  switch (action.type) {
    case puzzleActions.GET_PUZZLE_CLUE_SUCCESS:
      const cluesToInsert = state[action.payload.id] || [];
      cluesToInsert.push(action.payload.clue);
      return {
        ...state,
        [action.payload.id]: cluesToInsert,
      };
    default:
      return state;
  }
};

const puzzleSolutionsById = (
  state = {},
  action: puzzleActions.PuzzleActions
) => {
  switch (action.type) {
    case puzzleActions.GET_PUZZLE_SOLUTION_SUCCESS:
      const solutionsToInsert = state[action.payload.id] || [];
      solutionsToInsert.push(action.payload.solution);
      return {
        ...state,
        [action.payload.id]: solutionsToInsert,
      };
    default:
      return state;
  }
};

const getPuzzleSetActionProcessing = createProcessingSlice(
  puzzleActions.GET_PUZZLESET,
  puzzleActions.GET_PUZZLESET_SUCCESS,
  puzzleActions.GET_PUZZLESET_ERROR
);

const getPuzzleActionProcessing = createProcessingSlice(
  puzzleActions.GET_PUZZLE,
  puzzleActions.GET_PUZZLE_SUCCESS,
  puzzleActions.GET_PUZZLE_ERROR
);

const getPuzzleClueActionProcessing = createProcessingSlice(
  puzzleActions.GET_PUZZLE_CLUE,
  puzzleActions.GET_PUZZLE_CLUE_SUCCESS,
  puzzleActions.GET_PUZZLE_CLUE_ERROR
);

const getPuzzleSolutionActionProcessing = createProcessingSlice(
  puzzleActions.GET_PUZZLE_SOLUTION,
  puzzleActions.GET_PUZZLE_SOLUTION_SUCCESS,
  puzzleActions.GET_PUZZLE_SOLUTION_ERROR
);

const putPuzzleClueSolvedActionProcessing = createProcessingSlice(
  puzzleActions.PUT_PUZZLE_CLUE_SOLVED,
  puzzleActions.PUT_PUZZLE_CLUE_SOLVED_SUCCESS,
  puzzleActions.PUT_PUZZLE_CLUE_SOLVED_ERROR
);

export default combineReducers({
  puzzleSetsById,
  puzzlesById,
  puzzleCluesById,
  puzzleSolutionsById,
  getPuzzleSetActionProcessing,
  getPuzzleActionProcessing,
  getPuzzleClueActionProcessing,
  putPuzzleClueSolvedActionProcessing,
  getPuzzleSolutionActionProcessing,
});
