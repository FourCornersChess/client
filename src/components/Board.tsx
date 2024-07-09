import React, { useState } from 'react';
import boardSVG from '../assets/images/boards/board2.svg';
import Piece from './Piece';
import Square from './Square';
import './Board.css';
import { PiecePosition } from './types';
import { 
  isValidPawnMove, 
  isValidRookMove, 
  isValidKnightMove, 
  isValidBishopMove, 
  isValidQueenMove, 
  isValidKingMove 
} from '../utils/moveValidation';

const initialPositions: PiecePosition[] = [
  { id: 'w-rook1', type: 'rook', color: 'white', position: 'a1', hasMoved: false },
  { id: 'w-knight1', type: 'knight', color: 'white', position: 'b1', hasMoved: false },
  { id: 'w-bishop1', type: 'bishop', color: 'white', position: 'c1', hasMoved: false },
  { id: 'w-queen', type: 'queen', color: 'white', position: 'd1', hasMoved: false },
  { id: 'w-king', type: 'king', color: 'white', position: 'e1', hasMoved: false },
  { id: 'w-bishop2', type: 'bishop', color: 'white', position: 'f1', hasMoved: false },
  { id: 'w-knight2', type: 'knight', color: 'white', position: 'g1', hasMoved: false },
  { id: 'w-rook2', type: 'rook', color: 'white', position: 'h1', hasMoved: false },
  { id: 'w-pawn1', type: 'pawn', color: 'white', position: 'a2', hasMoved: false },
  { id: 'w-pawn2', type: 'pawn', color: 'white', position: 'b2', hasMoved: false },
  { id: 'w-pawn3', type: 'pawn', color: 'white', position: 'c2', hasMoved: false },
  { id: 'w-pawn4', type: 'pawn', color: 'white', position: 'd2', hasMoved: false },
  { id: 'w-pawn5', type: 'pawn', color: 'white', position: 'e2', hasMoved: false },
  { id: 'w-pawn6', type: 'pawn', color: 'white', position: 'f2', hasMoved: false },
  { id: 'w-pawn7', type: 'pawn', color: 'white', position: 'g2', hasMoved: false },
  { id: 'w-pawn8', type: 'pawn', color: 'white', position: 'h2', hasMoved: false },
  { id: 'b-rook1', type: 'rook', color: 'black', position: 'a8', hasMoved: false },
  { id: 'b-knight1', type: 'knight', color: 'black', position: 'b8', hasMoved: false },
  { id: 'b-bishop1', type: 'bishop', color: 'black', position: 'c8', hasMoved: false },
  { id: 'b-queen', type: 'queen', color: 'black', position: 'd8', hasMoved: false },
  { id: 'b-king', type: 'king', color: 'black', position: 'e8', hasMoved: false },
  { id: 'b-bishop2', type: 'bishop', color: 'black', position: 'f8', hasMoved: false },
  { id: 'b-knight2', type: 'knight', color: 'black', position: 'g8', hasMoved: false },
  { id: 'b-rook2', type: 'rook', color: 'black', position: 'h8', hasMoved: false },
  { id: 'b-pawn1', type: 'pawn', color: 'black', position: 'a7', hasMoved: false },
  { id: 'b-pawn2', type: 'pawn', color: 'black', position: 'b7', hasMoved: false },
  { id: 'b-pawn3', type: 'pawn', color: 'black', position: 'c7', hasMoved: false },
  { id: 'b-pawn4', type: 'pawn', color: 'black', position: 'd7', hasMoved: false },
  { id: 'b-pawn5', type: 'pawn', color: 'black', position: 'e7', hasMoved: false },
  { id: 'b-pawn6', type: 'pawn', color: 'black', position: 'f7', hasMoved: false },
  { id: 'b-pawn7', type: 'pawn', color: 'black', position: 'g7', hasMoved: false },
  { id: 'b-pawn8', type: 'pawn', color: 'black', position: 'h7', hasMoved: false },
];

const Board: React.FC = () => {
  const [pieces, setPieces] = useState<PiecePosition[]>(initialPositions);
  const [selectedPiece, setSelectedPiece] = useState<PiecePosition | null>(null);

  const handlePieceClick = (piece: PiecePosition) => {
    setSelectedPiece(piece);
  };

  const handleSquareClick = (position: string) => {
    if (selectedPiece) {
      if (isValidMove(selectedPiece, position, pieces)) {
        setPieces((prevPieces) => {
          // Filter out any piece that is being captured
          const newPieces = prevPieces.filter(p => p.position !== position || p.color === selectedPiece.color);

          // Move the selected piece to the new position
          return newPieces.map(p =>
            p.id === selectedPiece.id ? { ...p, position, hasMoved: true } : p
          );
        });
        setSelectedPiece(null);
      } else {
        console.log('Illegal move');
      }
    }
  };

  const isValidMove = (piece: PiecePosition, targetPosition: string, pieces: PiecePosition[]): boolean => {
    switch (piece.type) {
      case 'pawn':
        return isValidPawnMove(piece, targetPosition, pieces);
      case 'rook':
        return isValidRookMove(piece, targetPosition, pieces);
      case 'knight':
        return isValidKnightMove(piece, targetPosition, pieces);
      case 'bishop':
        return isValidBishopMove(piece, targetPosition, pieces);
      case 'queen':
        return isValidQueenMove(piece, targetPosition, pieces);
      case 'king':
        return isValidKingMove(piece, targetPosition, pieces);
      default:
        return false;
    }
  };

  const generateGridSquares = () => {
    const gridSquares = [];
    for (let row = 8; row >= 1; row--) {
      for (let col = 0; col < 8; col++) {
        const position = `${String.fromCharCode(97 + col)}${row}`;
        const isLight = (row + col) % 2 === 0;
        gridSquares.push(
          <Square
            key={position}
            position={position}
            isLight={isLight}
            isSelected={selectedPiece?.position === position}
            isHighlighted={false}
            onClick={handleSquareClick}
          >
            {pieces
              .filter((piece) => piece.position === position)
              .map((piece) => (
                <Piece
                  key={piece.id}
                  id={piece.id}
                  type={piece.type}
                  color={piece.color}
                  position={piece.position}
                  hasMoved={piece.hasMoved}
                  isSelected={selectedPiece?.id === piece.id}
                  onClick={handlePieceClick}
                />
              ))}
          </Square>
        );
      }
    }
    return gridSquares;
  };

  return (
    <div className="chess-board-container">
      <div className="board">
        <img src={boardSVG} alt="A chess board" className="chess-board" />
        <div className="grid">
          {generateGridSquares()}
        </div>
      </div>
    </div>
  );
};

export default Board;