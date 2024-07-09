import { PiecePosition } from '../components/types';

// Helper function to check if a square is occupied
const isSquareOccupied = (targetPosition: string, pieces: PiecePosition[]): PiecePosition | null => {
  return pieces.find(piece => piece.position === targetPosition) || null;
};

// Helper function to check if the path is clear for linear moves (rooks and queens)
const isPathClear = (start: string, end: string, pieces: PiecePosition[]): boolean => {
  const startRow = parseInt(start[1]);
  const startCol = start.charCodeAt(0);
  const endRow = parseInt(end[1]);
  const endCol = end.charCodeAt(0);

  const rowStep = Math.sign(endRow - startRow);
  const colStep = Math.sign(endCol - startCol);

  let currentRow = startRow + rowStep;
  let currentCol = startCol + colStep;

  while (currentRow !== endRow || currentCol !== endCol) {
    const position = `${String.fromCharCode(currentCol)}${currentRow}`;
    if (isSquareOccupied(position, pieces)) {
      return false;
    }
    currentRow += rowStep;
    currentCol += colStep;
  }

  return true;
};

// Helper function to check if the path is clear for diagonal moves (bishops and queens)
const isDiagonalPathClear = (start: string, end: string, pieces: PiecePosition[]): boolean => {
  const startRow = parseInt(start[1]);
  const startCol = start.charCodeAt(0);
  const endRow = parseInt(end[1]);
  const endCol = end.charCodeAt(0);

  const rowStep = Math.sign(endRow - startRow);
  const colStep = Math.sign(endCol - startCol);

  let currentRow = startRow + rowStep;
  let currentCol = startCol + colStep;

  while (currentRow !== endRow || currentCol !== endCol) {
    const position = `${String.fromCharCode(currentCol)}${currentRow}`;
    if (isSquareOccupied(position, pieces)) {
      return false;
    }
    currentRow += rowStep;
    currentCol += colStep;
  }

  return true;
};

// Validation function for pawn moves
export const isValidPawnMove = (piece: PiecePosition, targetPosition: string, pieces: PiecePosition[]): boolean => {
  const direction = piece.color === 'white' ? 1 : -1;
  const currentRow = parseInt(piece.position[1]);
  const targetRow = parseInt(targetPosition[1]);
  const colDiff = piece.position.charCodeAt(0) - targetPosition.charCodeAt(0);

  const targetPiece = isSquareOccupied(targetPosition, pieces);

  if (colDiff === 0) { // Forward move
    if (targetPiece) return false; // Cannot move forward to an occupied square
    if (!piece.hasMoved && (targetRow === currentRow + 2 * direction || targetRow === currentRow + direction)) {
      return true;
    } else if (targetRow === currentRow + direction) {
      return true;
    }
  } else if (Math.abs(colDiff) === 1 && targetRow === currentRow + direction) { // Diagonal capture
    if (targetPiece && targetPiece.color !== piece.color) return true; // Capture move
  }

  return false;
};

// Validation function for rook moves
export const isValidRookMove = (piece: PiecePosition, targetPosition: string, pieces: PiecePosition[]): boolean => {
  const currentRow = parseInt(piece.position[1]);
  const targetRow = parseInt(targetPosition[1]);
  const currentCol = piece.position.charCodeAt(0);
  const targetCol = targetPosition.charCodeAt(0);

  if (currentRow !== targetRow && currentCol !== targetCol) return false; // Must move in a straight line

  const targetPiece = isSquareOccupied(targetPosition, pieces);
  if (targetPiece && targetPiece.color === piece.color) return false; // Cannot move to a square occupied by same color

  // Check if path is clear
  if (!isPathClear(piece.position, targetPosition, pieces)) return false;

  return true;
};

// Validation function for knight moves
export const isValidKnightMove = (piece: PiecePosition, targetPosition: string, pieces: PiecePosition[]): boolean => {
  const currentRow = parseInt(piece.position[1]);
  const targetRow = parseInt(targetPosition[1]);
  const currentCol = piece.position.charCodeAt(0);
  const targetCol = targetPosition.charCodeAt(0);

  const rowDiff = Math.abs(currentRow - targetRow);
  const colDiff = Math.abs(currentCol - targetCol);

  if (!((rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2))) return false;

  const targetPiece = isSquareOccupied(targetPosition, pieces);
  if (targetPiece && targetPiece.color === piece.color) return false; // Cannot move to a square occupied by same color

  return true;
};

// Validation function for bishop moves
export const isValidBishopMove = (piece: PiecePosition, targetPosition: string, pieces: PiecePosition[]): boolean => {
  const currentRow = parseInt(piece.position[1]);
  const targetRow = parseInt(targetPosition[1]);
  const currentCol = piece.position.charCodeAt(0);
  const targetCol = targetPosition.charCodeAt(0);

  if (Math.abs(currentRow - targetRow) !== Math.abs(currentCol - targetCol)) return false;

  const targetPiece = isSquareOccupied(targetPosition, pieces);
  if (targetPiece && targetPiece.color === piece.color) return false; // Cannot move to a square occupied by same color

  // Check if path is clear
  if (!isDiagonalPathClear(piece.position, targetPosition, pieces)) return false;

  return true;
};

// Validation function for queen moves
export const isValidQueenMove = (piece: PiecePosition, targetPosition: string, pieces: PiecePosition[]): boolean => {
  return isValidRookMove(piece, targetPosition, pieces) || isValidBishopMove(piece, targetPosition, pieces);
};

// Validation function for king moves
export const isValidKingMove = (piece: PiecePosition, targetPosition: string, pieces: PiecePosition[]): boolean => {
  const currentRow = parseInt(piece.position[1]);
  const targetRow = parseInt(targetPosition[1]);
  const currentCol = piece.position.charCodeAt(0);
  const targetCol = targetPosition.charCodeAt(0);

  const rowDiff = Math.abs(currentRow - targetRow);
  const colDiff = Math.abs(currentCol - targetCol);

  if (rowDiff > 1 || colDiff > 1) return false;

  const targetPiece = isSquareOccupied(targetPosition, pieces);
  if (targetPiece && targetPiece.color === piece.color) return false; // Cannot move to a square occupied by same color

  return true;
};
