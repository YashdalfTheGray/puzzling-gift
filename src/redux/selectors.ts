import { PuzzleStore } from './puzzleStore';

export const isUserLoggedIn = (state: PuzzleStore) =>
  state.currentUser !== null;
export const getCurrentUser = (state: PuzzleStore) => state.currentUser;
export const getPuzzleSetById = (state: PuzzleStore, id: string) =>
  state.puzzleSets[id];
export const getPuzzleById = (state: PuzzleStore, id: string) =>
  state.puzzles[id];
export const getPuzzleClueByIdAndIndex = (
  state: PuzzleStore,
  id: string,
  index: number
) => state.puzzleClues[id][index];
export const getPuzzleSolutionByIdAndIndex = (
  state: PuzzleStore,
  id: string,
  index: number
) => state.puzzleSolutions[id][index];
export const getActionErrorByAction = (state: PuzzleStore, api: string) =>
  state[`${api}ActionProcessing`].ActionError as Error;
export const getIsProcessingByAction = (state: PuzzleStore, api: string) =>
  state[`${api}ActionProcessing`].isProcessing as boolean;
