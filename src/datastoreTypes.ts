export type UUID = string;

export type Puzzle = {
  id: UUID;
  name: string;
  color: string;
  cluesSolved: number;
  allowlistedUsers: string;
};

export type PuzzleSet = {
  id: UUID;
  name: string;
  puzzleIds: UUID[];
  numberOfPuzzles: number;
  allowlistedUsers: string;
};

export type PuzzleClue = {
  text: string;
  answer: string;
};

export type PuzzleClues = {
  [key: UUID]: PuzzleClue[];
};

export type PuzzleSolutions = {
  [key: UUID]: string[];
};

export type PuzzleSets = {
  [key: UUID]: PuzzleSet;
};

export type Puzzles = {
  [key: UUID]: Puzzle;
};
