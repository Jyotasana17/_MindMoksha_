import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Brain, 
  Star, 
  Trophy, 
  RotateCcw, 
  Timer,
  CheckCircle
} from "lucide-react";

const cardEmojis = ["🌸", "🌺", "🌻", "🌷", "🌹", "🌼", "🦋", "🐝"];

export default function MemoryGame({ game }) {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    let interval = null;
    if (gameStarted && !gameWon) {
      interval = setInterval(() => {
        setTimeElapsed(time => time + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameWon]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (cards[first].emoji === cards[second].emoji) {
        setMatchedCards(prev => [...prev, first, second]);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
      setMoves(prev => prev + 1);
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setGameWon(true);
    }
  }, [matchedCards, cards]);

  const initializeGame = () => {
    const gameCards = [...cardEmojis, ...cardEmojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false
      }));
    setCards(gameCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setGameWon(false);
    setTimeElapsed(0);
    setGameStarted(false);
  };

  const handleCardClick = (cardId) => {
    if (!gameStarted) setGameStarted(true);
    
    if (
      flippedCards.length >= 2 ||
      flippedCards.includes(cardId) ||
      matchedCards.includes(cardId)
    ) {
      return;
    }
    
    setFlippedCards(prev => [...prev, cardId]);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPerformanceRating = () => {
    if (moves <= 12) return { rating: "Excellent!", stars: 3, color: "text-yellow-500" };
    if (moves <= 18) return { rating: "Great!", stars: 2, color: "text-blue-500" };
    return { rating: "Good job!", stars: 1, color: "text-green-500" };
  };

  return (
    <Card className="glass-effect border-sage-200/50 shadow-xl">
      <CardHeader className="text-center border-b border-sage-200/50">
        <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl text-sage-800 mb-2">
          {game.title}
        </CardTitle>
        <p className="text-sage-600 mb-4">{game.description}</p>
        
        <div className="flex justify-center gap-4">
          <Badge className="bg-purple-100 text-purple-800 border-purple-200">
            Moves: {moves}
          </Badge>
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            <Timer className="w-3 h-3 mr-1" />
            {formatTime(timeElapsed)}
          </Badge>
          <Badge className="bg-green-100 text-green-800 border-green-200">
            Matched: {matchedCards.length / 2}/{cardEmojis.length}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-8">
        {!gameWon ? (
          <div>
            <div className="grid grid-cols-4 gap-3 mb-6">
              {cards.map((card) => (
                <motion.div
                  key={card.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div
                    onClick={() => handleCardClick(card.id)}
                    className={`
                      aspect-square rounded-xl cursor-pointer transition-all duration-300
                      flex items-center justify-center text-3xl font-bold
                      ${
                        flippedCards.includes(card.id) || matchedCards.includes(card.id)
                          ? 'bg-white shadow-lg border-2 border-purple-200'
                          : 'bg-gradient-to-br from-purple-100 to-purple-200 hover:from-purple-200 hover:to-purple-300 shadow-md'
                      }
                      ${matchedCards.includes(card.id) ? 'ring-2 ring-emerald-300' : ''}
                    `}
                  >
                    {(flippedCards.includes(card.id) || matchedCards.includes(card.id)) ? (
                      <motion.div
                        initial={{ rotateY: 180 }}
                        animate={{ rotateY: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {card.emoji}
                      </motion.div>
                    ) : (
                      <div className="text-purple-400">?</div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center space-y-4">
              <p className="text-sage-600">
                Match all the pairs to complete the garden! Click cards to reveal them.
              </p>
              <Button
                onClick={initializeGame}
                variant="outline"
                className="border-sage-300"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                New Game
              </Button>
            </div>
          </div>
        ) : (
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
                🎉 Garden Complete!
              </h3>
              <p className="text-sage-600 text-lg">
                {getPerformanceRating().rating} You've successfully matched all the flowers.
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

            <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="text-xs text-purple-600 uppercase font-medium">Total Moves</p>
                <p className="text-lg font-bold text-purple-800">{moves}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-600 uppercase font-medium">Time</p>
                <p className="text-lg font-bold text-blue-800">{formatTime(timeElapsed)}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-emerald-600">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Mental benefits gained:</span>
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
              onClick={initializeGame}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Play Again
            </Button>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}