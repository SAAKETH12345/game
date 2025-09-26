
import React, { useEffect, useState } from 'react';

interface WinScreenProps {
    onRestart: () => void;
}

const AnimatedWord: React.FC<{ text: string; delay: number }> = ({ text, delay }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    return (
        <span
            className={`transition-all duration-700 transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
        >
            {text}
        </span>
    );
};

const WinScreen: React.FC<WinScreenProps> = ({ onRestart }) => {
    const words = "nothing can break our bond lalitha, prathik, saaketh".split(' ');

    return (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-800/50 rounded-lg shadow-2xl animate-fade-in">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center space-x-2 md:space-x-4">
                {words.map((word, index) => (
                    <AnimatedWord key={index} text={word} delay={100 + index * 150} />
                ))}
            </h2>

            <button
                onClick={onRestart}
                className="mt-10 px-6 py-3 bg-blue-500 text-white font-bold rounded-lg shadow-lg hover:bg-blue-400 transition-all duration-300 transform hover:scale-105 animate-pulse"
                style={{ animationDuration: '2s' }}
            >
                Play Again
            </button>
        </div>
    );
};

// Add a simple fade-in animation for the container
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}
`;
document.head.appendChild(style);


export default WinScreen;
