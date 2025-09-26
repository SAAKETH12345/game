import React from 'react';
import GameBoard from './components/GameBoard';
import WinScreen from './components/WinScreen';
import { useGameLogic } from './hooks/useGameLogic';
import { WINNING_SCORE } from './constants';

const App: React.FC = () => {
  const { snake, food, isGameWon, score, startGame, isGameStarted } = useGameLogic();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center font-mono p-4">
      <div className="w-full max-w-lg mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-2">
          Snake Game
        </h1>
        
        {isGameWon ? (
          <WinScreen onRestart={startGame} />
        ) : (
          <>
            {!isGameStarted ? (
               <div className="flex flex-col items-center justify-center h-full">
                 <p className="text-lg mb-6 text-gray-300">Eat {WINNING_SCORE} apples to win!</p>
                 <button 
                    onClick={startGame}
                    className="px-8 py-4 bg-green-500 text-gray-900 font-bold rounded-lg shadow-lg hover:bg-green-400 transition-all duration-300 transform hover:scale-105"
                 >
                    Start Game
                 </button>
               </div>
            ) : (
              <div className="w-full relative">
                <div className="absolute -top-12 right-0 bg-gray-800 px-4 py-2 rounded-lg shadow-lg">
                  <p className="text-xl font-bold text-green-400">Score: {score}</p>
                </div>
                <GameBoard snake={snake} food={food} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default App;