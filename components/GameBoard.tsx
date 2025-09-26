
import React from 'react';
import { Position } from '../types';
import { BOARD_SIZE } from '../constants';

interface GameBoardProps {
  snake: Position[];
  food: Position;
}

const GameBoard: React.FC<GameBoardProps> = ({ snake, food }) => {
  const cells = Array.from({ length: BOARD_SIZE * BOARD_SIZE });

  return (
    <div 
      className="grid bg-gray-800 border-4 border-green-500 rounded-lg shadow-2xl"
      style={{
        gridTemplateColumns: `repeat(${BOARD_SIZE}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${BOARD_SIZE}, minmax(0, 1fr))`,
        aspectRatio: '1 / 1'
      }}
    >
      {cells.map((_, index) => {
        const x = index % BOARD_SIZE;
        const y = Math.floor(index / BOARD_SIZE);
        const isSnake = snake.some(seg => seg.x === x && seg.y === y);
        const isSnakeHead = snake[0].x === x && snake[0].y === y;
        const isFood = food.x === x && food.y === y;

        return (
          <div
            key={index}
            className={`w-full h-full ${(index + Math.floor(index/BOARD_SIZE)) % 2 === 0 ? 'bg-gray-800' : 'bg-gray-700/50'}`}
          >
            {isSnake && (
              <div
                className={`w-full h-full rounded-sm transition-all duration-100 ${isSnakeHead ? 'bg-green-300' : 'bg-green-500'}`}
              />
            )}
            {isFood && (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-3/4 h-3/4 bg-red-500 rounded-full animate-pulse" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default GameBoard;
