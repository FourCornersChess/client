import React, { useEffect } from 'react';
import './Square.css';

interface SquareProps {
  position: string;
  isLight: boolean;
  isSelected: boolean;
  isHighlighted: boolean;
  onClick: (position: string) => void;
  children: React.ReactNode;
}

// Square component renders an individual square on the chessboard
const Square: React.FC<SquareProps> = ({ position, isLight, isSelected, isHighlighted, onClick, children }) => {
  // Log the state of the square when it renders
  useEffect(() => {
    console.log(`Square rendered: ${position}`);
    console.log(`  isLight: ${isLight}`);
    console.log(`  isSelected: ${isSelected}`);
    console.log(`  isHighlighted: ${isHighlighted}`);
  }, [position, isLight, isSelected, isHighlighted]);

  // Determine the CSS classes based on the square's properties
  const squareClass = isLight ? 'light-square' : 'dark-square';
  const selectedClass = isSelected ? 'selected-square' : '';
  const highlightedClass = isHighlighted ? 'highlighted-square' : '';

  return (
    <div
      className={`square ${squareClass} ${selectedClass} ${highlightedClass}`}
      onClick={() => {
        console.log(`Square clicked: ${position}`);
        onClick(position);
      }} // Handle click event
    >
      {children} {/* Render any children elements, such as pieces */}
    </div>
  );
};

export default Square;
