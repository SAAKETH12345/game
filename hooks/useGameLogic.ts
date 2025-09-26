
import { useState, useEffect, useCallback } from 'react';
import { Position, Direction } from '../types';
import {
  BOARD_SIZE,
  INITIAL_SNAKE_POSITION,
  INITIAL_FOOD_POSITION,
  INITIAL_SPEED_MS,
  WINNING_SCORE,
} from '../constants';

const generateFood = (snakeBody: Position[]): Position => {
  while (true) {
    const newFood = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
    };
    if (!snakeBody.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
      return newFood;
    }
  }
};

export const useGameLogic = () => {
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE_POSITION);
  const [food, setFood] = useState<Position>(INITIAL_FOOD_POSITION);
  const [direction, setDirection] = useState<Direction>(Direction.RIGHT);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isGameWon, setIsGameWon] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);

  const startGame = useCallback(() => {
    setSnake(INITIAL_SNAKE_POSITION);
    setFood(generateFood(INITIAL_SNAKE_POSITION));
    setDirection(Direction.RIGHT);
    setIsGameOver(false);
    setIsGameWon(false);
    setScore(0);
    setIsGameStarted(true);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    e.preventDefault();
    switch (e.key) {
      case 'ArrowUp':
        if (direction !== Direction.DOWN) setDirection(Direction.UP);
        break;
      case 'ArrowDown':
        if (direction !== Direction.UP) setDirection(Direction.DOWN);
        break;
      case 'ArrowLeft':
        if (direction !== Direction.RIGHT) setDirection(Direction.LEFT);
        break;
      case 'ArrowRight':
        if (direction !== Direction.LEFT) setDirection(Direction.RIGHT);
        break;
    }
  }, [direction]);

  useEffect(() => {
    if (!isGameStarted) return;
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, isGameStarted]);

  const moveSnake = useCallback(() => {
    if (isGameOver || isGameWon || !isGameStarted) return;

    setSnake(prevSnake => {
      const newSnake = [...prevSnake];
      const head = { ...newSnake[0] };

      switch (direction) {
        case Direction.UP:
          head.y -= 1;
          break;
        case Direction.DOWN:
          head.y += 1;
          break;
        case Direction.LEFT:
          head.x -= 1;
          break;
        case Direction.RIGHT:
          head.x += 1;
          break;
      }

      // Wall collision
      if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
        setIsGameOver(true);
        setIsGameStarted(false);
        return prevSnake;
      }

      // Self collision
      for (const segment of newSnake.slice(1)) {
        if (segment.x === head.x && segment.y === head.y) {
          setIsGameOver(true);
          setIsGameStarted(false);
          return prevSnake;
        }
      }

      newSnake.unshift(head);

      // Food eaten
      if (head.x === food.x && head.y === food.y) {
        const newScore = score + 1;
        setScore(newScore);
        if (newScore >= WINNING_SCORE) {
          setIsGameWon(true);
          setIsGameStarted(false);
        } else {
          setFood(generateFood(newSnake));
        }
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, isGameOver, isGameWon, score, isGameStarted]);

  useEffect(() => {
    if (!isGameStarted || isGameOver || isGameWon) return;

    const gameInterval = setInterval(moveSnake, INITIAL_SPEED_MS);
    return () => clearInterval(gameInterval);
  }, [moveSnake, isGameStarted, isGameOver, isGameWon]);

  return { snake, food, isGameWon, isGameOver, score, startGame, isGameStarted };
};
