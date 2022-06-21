import { UUID } from '~/src/datastoreTypes';
import { PuzzleStore, ActionSliceNames } from './puzzleStore';

export const isUserLoggedIn = (state: PuzzleStore) =>
  state.currentUser !== null;
export const getCurrentUser = (state: PuzzleStore) => state.currentUser;
export const getPuzzleSetById = (state: PuzzleStore, id: UUID) =>
  state.puzzleSetsById[id];
export const getPuzzleById = (state: PuzzleStore, id: UUID) =>
  state.puzzlesById[id];
export const getAllPuzzleCluesById = (state: PuzzleStore, id: UUID) =>
  state.puzzleCluesById[id];
export const getPuzzleCluesByIdAndIndex = (
  state: PuzzleStore,
  id: UUID,
  index: number
) => state.puzzleCluesById[id][index];
export const getAllPuzzleSolutionsById = (state: PuzzleStore, id: UUID) =>
  state.puzzleSolutionsById[id];
export const getPuzzleSolutionByIdAndIndex = (
  state: PuzzleStore,
  id: UUID,
  index: number
) => state.puzzleSolutionsById[id][index];
export const getActionErrorByAction = (
  state: PuzzleStore,
  action: ActionSliceNames
) => state[action].actionError as Error;
export const getIsProcessingByAction = (
  state: PuzzleStore,
  action: ActionSliceNames
) => state[action].isProcessing as boolean;
