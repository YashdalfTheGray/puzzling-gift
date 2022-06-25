enum Events {
  LoginStart = 'event_auth_login_start',
  LoginResult = 'event_auth_login_result',
  LoginSuccess = 'event_auth_login_success',
  LoginError = 'event_auth_login_error',
  Logout = 'event_auth_logout',
  LogoutSuccess = 'event_auth_logout_success',
  LogoutError = 'event_auth_logout_error',
  GetPuzzleset = 'event_puzzleset_get',
  GetPuzzlesetSuccess = 'event_puzzleset_get_success',
  GetPuzzlesetError = 'event_puzzleset_get_error',
  GetPuzzle = 'event_puzzle_get',
  GetPuzzleSuccess = 'event_puzzle_get_success',
  GetPuzzleError = 'event_puzzle_get_error',
  GetPuzzleClue = 'event_puzzle_clue_get',
  GetPuzzleClueSuccess = 'event_puzzle_clue_get_success',
  GetPuzzleClueError = 'event_puzzle_clue_get_error',
  GetBatchPuzzleClue = 'event_puzzle_clue_get_batch',
  GetBatchPuzzleClueSuccess = 'event_puzzle_clue_get_batch_success',
  GetBatchPuzzleClueError = 'event_puzzle_clue_get_batch_error',
  PutPuzzleClueSolved = 'event_puzzle_put_solved',
  PutPuzzleClueSolvedSuccess = 'event_puzzle_put_solved_success',
  PutPuzzleClueSolvedError = 'event_puzzle_put_solved_error',
  GetPuzzleSolution = 'event_puzzle_solution_get',
  GetPuzzleSolutionSuccess = 'event_puzzle_solution_get_success',
  GetPuzzleSolutionError = 'event_puzzle_solution_get_error',
  GetBatchPuzzleSolution = 'event_puzzle_solution_get_batch',
  GetBatchPuzzleSolutionSuccess = 'event_puzzle_solution_get_batch_success',
  GetBatchPuzzleSolutionError = 'event_puzzle_solution_get_batch_error',
  PuzzleClueGuessMiss = 'event_puzzle_clue_guess_miss',
  PuzzleClueGuessHit = 'event_puzzle_clue_guess_hit',
}

export default Events;
