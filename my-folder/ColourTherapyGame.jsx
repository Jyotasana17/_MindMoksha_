
import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Palette, 
  Star, 
  Trophy, 
  RotateCcw, 
  CheckCircle,
  Sparkles
} from "lucide-react";

const colorTherapyPairs = [
  { name: "Calming Blue", primary: "#4A90E2", secondary: "#A8D0FF", emotion: "Peace & Tranquility" },
  { name: "Nurturing Green", primary: "#7ED321", secondary: "#C7F0A8", emotion: "Growth & Balance" },
  { name: "Energizing Orange", primary: "#F5A623", secondary: "#FFD698", emotion: "Joy & Creativity" },
  { name: "Loving Pink", primary: "#E91E63", secondary: "#F8BBD9", emotion: "Compassion & Love" },
  { name: "Wise Purple", primary: "#9013FE", secondary: "#D1C4E9", emotion: "Wisdom & Spirituality" },
  { name: "Warm Yellow", primary: "#FFEB3B", secondary: "#FFF9C4", emotion: "Optimism & Clarity" }
];

export default function ColorTherapyGame({ game }) {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [shuffledColors, setShuffledColors] = useState([]);

  const initializeLevel = useCallback(() => {
    if (currentLevel >= colorTherapyPairs.length) {
      setGameCompleted(true);
      return;
    }

    const targetColor = colorTherapyPairs[currentLevel];
    const otherColors = colorTherapyPairs
      .filter((_, index) => index !== currentLevel)
      .slice(0, 2);
    
    const allColors = [targetColor, ...otherColors].sort(() => Math.random() - 0.5);
    setShuffledColors(allColors);
    setSelectedColor(null);
    setShowFeedback(false);
  }, [currentLevel]); // currentLevel is a dependency here

  useEffect(() => {
    initializeLevel();
  }, [initializeLevel]); // initializeLevel is a dependency here

  const handleColorSelect = (selectedColorObj) => {
    setSelectedColor(selectedColorObj);
    const correct = selectedColorObj.name === colorTherapyPairs[currentLevel].name;
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (correct) {
      setScore(prev => prev + 10);
      setTimeout(() => {
        setCurrentLevel(prev => prev + 1);
      }, 2000);
    } else {
      setTimeout(() => {
        setShowFeedback(false);
        setSelectedColor(null);
      }, 1500);
    }
  };

  const resetGame = () => {
    setCurrentLevel(0);
    setScore(0);
    setGameCompleted(false);
    setSelectedColor(null);
    setShowFeedback(false);
  };

  const getScoreRating = () => {
    if (score >= 50) return { rating: "Color Therapy Master!", stars: 3, color: "text-yellow-500" };
    if (score >= 30) return { rating: "Great Color Sense!", stars: 2, color: "text-blue-500" };
    return { rating: "Good Start!", stars: 1, color: "text-green-500" };
  };

  return (
    <Card className="glass-effect border-sage-200/50 shadow-xl">
      <CardHeader className="text-center border-b border-sage-200/50">
        <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Palette className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl text-sage-800 mb-2">
          {game.title}
        </CardTitle>
        <p className="text-sage-600 mb-4">{game.description}</p>
        
        {!gameCompleted && (
          <div className="flex justify-center gap-4">
            <Badge className="bg-pink-100 text-pink-800 border-pink-200">
              Level: {currentLevel + 1} / {colorTherapyPairs.length}
            </Badge>
            <Badge className="bg-purple-100 text-purple-800 border-purple-200">
              Score: {score}
            </Badge>
          </div>
        )}
      </CardHeader>

      <CardContent className="p-8">
        {!gameCompleted ? (
          <div className="space-y-8">
            {/* Target Color Display */}
            <div className="text-center space-y-4">
              <motion.div
                key={currentLevel}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="w-32 h-32 mx-auto rounded-full shadow-2xl flex items-center justify-center"
                style={{ 
                  background: `linear-gradient(135deg, ${colorTherapyPairs[currentLevel].primary}, ${colorTherapyPairs[currentLevel].secondary})`
                }}
              >
                <Sparkles className="w-12 h-12 text-white/80" />
              </motion.div>
              
              <div>
                <h3 className="text-xl font-semibold text-sage-800 mb-2">
                  Find the matching color for:
                </h3>
                <Badge className="bg-gradient-to-r from-pink-100 to-purple-100 text-purple-800 border-purple-200 text-lg px-4 py-2">
                  {colorTherapyPairs[currentLevel].emotion}
                </Badge>
              </div>
            </div>

            {/* Color Options */}
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              {shuffledColors.map((color, index) => (
                <motion.button
                  key={`${currentLevel}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleColorSelect(color)}
                  disabled={showFeedback}
                  className={`
                    relative w-20 h-20 rounded-full shadow-lg transition-all duration-300
                    ${selectedColor?.name === color.name ? 'ring-4 ring-white ring-opacity-80' : ''}
                    ${showFeedback ? 'cursor-not-allowed' : 'hover:shadow-xl cursor-pointer'}
                  `}
                  style={{
                    background: `linear-gradient(135deg, ${color.primary}, ${color.secondary})`
                  }}
                >
                  {showFeedback && selectedColor?.name === color.name && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <CheckCircle className={`w-8 h-8 ${isCorrect ? 'text-green-500' : 'text-red-500'}`} />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Feedback */}
            <AnimatePresence>
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center"
                >
                  <div className={`p-4 rounded-xl ${
                    isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                  }`}>
                    <p className={`text-lg font-semibold ${
                      isCorrect ? 'text-green-800' : 'text-red-800'
                    }`}>
                      {isCorrect ? '🎉 Perfect Match!' : '💭 Try Again!'}
                    </p>
                    <p className={`text-sm mt-1 ${
                      isCorrect ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {isCorrect 
                        ? `${selectedColor.name} perfectly represents ${colorTherapyPairs[currentLevel].emotion}!`
                        : 'Take a moment to feel the energy of the target color...'
                      }
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Instructions */}
            {!showFeedback && (
              <div className="text-center">
                <p className="text-sage-600 text-sm">
                  Focus on the feeling and choose the color that best represents that emotion
                </p>
              </div>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-sage-800 mb-2">
                🎨 Color Harmony Achieved!
              </h3>
              <p className="text-sage-600 text-lg">
                {getScoreRating().rating} You've completed all color therapy levels.
              </p>
            </div>

            <div className="flex justify-center gap-1 mb-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-8 h-8 ${
                    i < getScoreRating().stars 
                      ? getScoreRating().color + ' fill-current' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>

            <div className="p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-pink-200 max-w-sm mx-auto">
              <p className="text-xs text-purple-600 uppercase font-medium">Final Score</p>
              <p className="text-2xl font-bold text-purple-800">{score} points</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-emerald-600">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Color therapy benefits:</span>
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
              className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-8"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              New Color Journey
            </Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
