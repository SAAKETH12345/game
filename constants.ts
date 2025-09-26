
import { Position } from './types';

export const BOARD_SIZE = 20;
export const INITIAL_SPEED_MS = 150;
export const WINNING_SCORE = 5;
export const INITIAL_SNAKE_POSITION: Position[] = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
];
export const INITIAL_FOOD_POSITION: Position = { x: 15, y: 10 };
