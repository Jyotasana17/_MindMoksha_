import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, 
  Star, 
  Trophy, 
  RotateCcw, 
  CheckCircle,
  Eye
} from "lucide-react";

const patternShapes = ['circle', 'square', 'triangle', 'diamond'];
const patternColors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500'];

export default function PatternGame({ game }) {
  const [gameState, setGameState] = useState('ready'); // ready, showing, input, completed
  const [currentLevel, setCurrentLevel] = useState(1);
  const [sequence, setSequence] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [score, setScore] = useState(0);
  const [showingIndex, setShowingIndex] = useState(-1);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (currentLevel > 8) {
      setIsCompleted(true);
      setGameState('completed');
    }
  }, [currentLevel]);

  const generateSequence = () => {
    const length = Math.min(currentLevel + 2, 8);
    const newSequence = Array.from({ length }, () => ({
      shape: patternShapes[Math.floor(Math.random() * patternShapes.length)],
      color: patternColors[Math.floor(Math.random() * patternColors.length)],
      id: Math.random()
    }));
    setSequence(newSequence);
  };

  const startLevel = () => {
    generateSequence();
    setUserInput([]);
    setGameState('showing');
    setShowingIndex(-1);
    
    // Show sequence
    setTimeout(() => {
      showSequence();
    }, 1000);
  };

  const showSequence = () => {
    setShowingIndex(0);
    
    const showNext = (index) => {
      if (index < sequence.length) {
        setShowingIndex(index);
        setTimeout(() => {
          setShowingIndex(-1);
          setTimeout(() => {
            if (index + 1 < sequence.length) {
              showNext(index + 1);
            } else {
              setGameState('input');
            }
          }, 300);
        }, 800);
      }
    };
    
    showNext(0);
  };

  const handlePatternClick = (shape, color) => {
    if (gameState !== 'input') return;
    
    const newInput = [...userInput, { shape, color }];
    setUserInput(newInput);
    
    // Check if current input matches sequence
    const currentIndex = newInput.length - 1;
    const isCorrect = 
      sequence[currentIndex].shape === shape && 
      sequence[currentIndex].color === color;
    
    if (!isCorrect) {
      // Wrong pattern - restart level
      setTimeout(() => {
        setUserInput([]);
        setGameState('ready');
      }, 500);
      return;
    }
    
    // Check if sequence is complete
    if (newInput.length === sequence.length) {
      setScore(prev => prev + currentLevel * 10);
      setCurrentLevel(prev => prev + 1);
      
      setTimeout(() => {
        setGameState('ready');
      }, 1000);
    }
  };

  const resetGame = () => {
    setGameState('ready');
    setCurrentLevel(1);
    setSequence([]);
    setUserInput([]);
    setScore(0);
    setIsCompleted(false);
  };

  const getShapeComponent = (shape, color, size = 'w-12 h-12') => {
    const baseClasses = `${size} ${color} shadow-lg transition-all duration-200`;
    
    switch (shape) {
      case 'circle':
        return <div className={`${baseClasses} rounded-full`} />;
      case 'square':
        return <div className={`${baseClasses} rounded-lg`} />;
      case 'triangle':
        return <div className={`${baseClasses} rounded-lg transform rotate-45`} />;
      case 'diamond':
        return <div className={`${baseClasses} rounded-lg transform rotate-45 scale-75`} />;
      default:
        return <div className={`${baseClasses} rounded-full`} />;
    }
  };

  const getPerformanceRating = () => {
    if (score >= 200) return { rating: "Pattern Master!", stars: 3, color: "text-yellow-500" };
    if (score >= 100) return { rating: "Great Memory!", stars: 2, color: "text-blue-500" };
    return { rating: "Good Progress!", stars: 1, color: "text-green-500" };
  };

  return (
    <Card className="glass-effect border-sage-200/50 shadow-xl">
      <CardHeader className="text-center border-b border-sage-200/50">
        <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Zap className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl text-sage-800 mb-2">
          {game.title}
        </CardTitle>
        <p className="text-sage-600 mb-4">{game.description}</p>
        
        {!isCompleted && (
          <div className="flex justify-center gap-4">
            <Badge className="bg-orange-100 text-orange-800 border-orange-200">
              Level: {currentLevel} / 8
            </Badge>
            <Badge className="bg-purple-100 text-purple-800 border-purple-200">
              Score: {score}
            </Badge>
          </div>
        )}
      </CardHeader>

      <CardContent className="p-8">
        {gameState === 'ready' && !isCompleted && (
          <div className="text-center space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-sage-800 mb-4">
                Level {currentLevel} - Pattern Recognition
              </h3>
              <p className="text-sage-600 max-w-md mx-auto">
                Watch the pattern sequence carefully, then repeat it exactly. 
                Each level adds more complexity!
              </p>
            </div>
            
            <div className="bg-orange-50 rounded-xl p-4 max-w-sm mx-auto">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Eye className="w-4 h-4 text-orange-600" />
                <span className="font-medium text-orange-800">Pattern Length</span>
              </div>
              <p className="text-2xl font-bold text-orange-800">
                {Math.min(currentLevel + 2, 8)} shapes
              </p>
            </div>

            <Button
              onClick={startLevel}
              className="bg-orange-600 hover:bg-orange-700 text-white px-8"
            >
              <Zap className="w-4 h-4 mr-2" />
              Start Level {currentLevel}
            </Button>
          </div>
        )}

        {gameState === 'showing' && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-sage-800 mb-2">
                Watch the Pattern
              </h3>
              <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                Memorize this sequence
              </Badge>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 min-h-20 items-center">
              {sequence.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: showingIndex === index ? 1.2 : (showingIndex > index ? 1 : 0),
                    opacity: showingIndex >= index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-center"
                >
                  {getShapeComponent(item.shape, item.color)}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {gameState === 'input' && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-sage-800 mb-2">
                Repeat the Pattern
              </h3>
              <Badge className="bg-green-100 text-green-800 border-green-200">
                Click shapes in the correct order
              </Badge>
            </div>
            
            {/* User's input so far */}
            <div className="flex flex-wrap justify-center gap-3 min-h-16 items-center bg-sage-50 rounded-lg p-4">
              {userInput.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center justify-center"
                >
                  {getShapeComponent(item.shape, item.color, 'w-8 h-8')}
                </motion.div>
              ))}
              {userInput.length === 0 && (
                <p className="text-sage-500 text-sm">Your pattern will appear here</p>
              )}
            </div>
            
            {/* Pattern options */}
            <div className="space-y-4">
              <h4 className="text-center font-medium text-sage-700">Choose Next Shape & Color:</h4>
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                {patternShapes.map(shape => 
                  patternColors.map(color => (
                    <motion.button
                      key={`${shape}-${color}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handlePatternClick(shape, color)}
                      className="flex items-center justify-center p-3 bg-white rounded-lg border-2 border-sage-200 hover:border-sage-400 transition-all duration-200"
                    >
                      {getShapeComponent(shape, color, 'w-8 h-8')}
                    </motion.button>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-sage-800 mb-2">
                🧩 Pattern Master Achieved!
              </h3>
              <p className="text-sage-600 text-lg">
                {getPerformanceRating().rating} You've mastered all pattern levels!
              </p>
            </div>

            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-8 h-8 ${
                    i < getPerformanceRating().stars 
                      ? getPerformanceRating().color + ' fill-current' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>

            <div className="p-4 bg-gradient-to-r from-orange-50 to-purple-50 rounded-xl border border-orange-200 max-w-sm mx-auto">
              <p className="text-xs text-orange-600 uppercase font-medium">Final Score</p>
              <p className="text-2xl font-bold text-orange-800">{score} points</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-emerald-600">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Cognitive benefits gained:</span>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {game.benefits.map((benefit, i) => (
                  <Badge key={i} className="bg-emerald-100 text-emerald-800 border-emerald-200 text-xs">
                    {benefit}
                  </Badge>
                ))}
              </div>
            </div>

            <Button
              onClick={resetGame}
              className="bg-gradient-to-r from-orange-600 to-purple-600 hover:from-orange-700 hover:to-purple-700 text-white px-8"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              New Pattern Challenge
            </Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}