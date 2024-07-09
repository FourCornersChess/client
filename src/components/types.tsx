export type PieceType = 'rook' | 'knight' | 'bishop' | 'queen' | 'king' | 'pawn';

export interface PiecePosition {
  id: string;
  type: PieceType;
  color: 'white' | 'black';
  position: string;
  hasMoved: boolean; // Make hasMoved required
}