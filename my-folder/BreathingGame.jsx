
import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2,
  VolumeX,
  CheckCircle
} from "lucide-react";

const breathingPatterns = [
  { name: "4-7-8 Relaxing", inhale: 4, hold: 7, exhale: 8, cycles: 4 },
  { name: "Box Breathing", inhale: 4, hold: 4, exhale: 4, cycles: 6 },
  { name: "Quick Calm", inhale: 3, hold: 3, exhale: 6, cycles: 5 }
];

export default function BreathingGame({ game }) {
  const [selectedPattern, setSelectedPattern] = useState(breathingPatterns[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPhase, setCurrentPhase] = useState('ready'); // ready, inhale, hold, exhale
  const [currentCycle, setCurrentCycle] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  const handlePhaseTransition = useCallback(() => {
    if (currentPhase === 'inhale') {
      setCurrentPhase('hold');
      setTimeLeft(selectedPattern.hold);
    } else if (currentPhase === 'hold') {
      setCurrentPhase('exhale');
      setTimeLeft(selectedPattern.exhale);
    } else if (currentPhase === 'exhale') {
      if (currentCycle + 1 >= selectedPattern.cycles) {
        // Session complete
        setIsPlaying(false);
        setIsCompleted(true);
        setCurrentPhase('ready'); // Reset phase to ready for next session
      } else {
        // Next cycle
        setCurrentCycle(prev => prev + 1);
        setCurrentPhase('inhale');
        setTimeLeft(selectedPattern.inhale);
      }
    }
  }, [currentPhase, currentCycle, selectedPattern, setIsPlaying, setIsCompleted, setCurrentPhase, setCurrentCycle, setTimeLeft]);

  useEffect(() => {
    let interval = null;
    
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (isPlaying && timeLeft === 0) {
      handlePhaseTransition();
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, timeLeft, handlePhaseTransition]);

  const startBreathing = () => {
    setIsPlaying(true);
    setCurrentPhase('inhale');
    setTimeLeft(selectedPattern.inhale);
    setCurrentCycle(0);
    setIsCompleted(false);
    setShowInstructions(false);
  };

  const pauseBreathing = () => {
    setIsPlaying(false);
  };

  const resetBreathing = () => {
    setIsPlaying(false);
    setCurrentPhase('ready');
    setCurrentCycle(0);
    setTimeLeft(0);
    setIsCompleted(false);
    setShowInstructions(true);
  };

  const getPhaseInstructions = () => {
    switch (currentPhase) {
      case 'inhale': return 'Breathe In Slowly...';
      case 'hold': return 'Hold Your Breath...';
      case 'exhale': return 'Breathe Out Gently...';
      default: return 'Ready to Begin';
    }
  };

  const getPhaseColor = () => {
    switch (currentPhase) {
      case 'inhale': return 'from-blue-400 to-blue-600';
      case 'hold': return 'from-purple-400 to-purple-600';
      case 'exhale': return 'from-green-400 to-green-600';
      default: return 'from-sage-400 to-sage-600';
    }
  };

  const getCircleScale = () => {
    switch (currentPhase) {
      case 'inhale': return 1.2;
      case 'hold': return 1.2;
      case 'exhale': return 0.8;
      default: return 1;
    }
  };

  return (
    <Card className="glass-effect border-sage-200/50 shadow-xl">
      <CardHeader className="text-center border-b border-sage-200/50">
        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl text-sage-800 mb-2">
          {game.title}
        </CardTitle>
        <p className="text-sage-600 mb-4">{game.description}</p>
      </CardHeader>

      <CardContent className="p-8">
        {showInstructions && !isCompleted && (
          <div className="space-y-6 mb-8">
            <h3 className="text-lg font-semibold text-sage-800 text-center">
              Choose Your Breathing Pattern
            </h3>
            <div className="grid gap-3">
              {breathingPatterns.map((pattern, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedPattern(pattern)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    selectedPattern.name === pattern.name
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-sage-200 bg-white/60 hover:border-sage-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-sage-800">{pattern.name}</h4>
                      <p className="text-sm text-sage-600">
                        Inhale {pattern.inhale}s • Hold {pattern.hold}s • Exhale {pattern.exhale}s
                      </p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                      {pattern.cycles} cycles
                    </Badge>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="text-center space-y-8">
          {/* Breathing Circle */}
          <div className="relative flex items-center justify-center h-64">
            <motion.div
              animate={{
                scale: getCircleScale(),
              }}
              transition={{
                duration: timeLeft,
                ease: "easeInOut"
              }}
              className={`w-48 h-48 rounded-full bg-gradient-to-br ${getPhaseColor()} 
                         shadow-2xl flex items-center justify-center`}
            >
              <div className="text-center text-white">
                <div className="text-4xl font-bold mb-2">{timeLeft}</div>
                <div className="text-sm opacity-90">{getPhaseInstructions()}</div>
              </div>
            </motion.div>
          </div>

          {/* Progress */}
          {(isPlaying || isCompleted || currentCycle > 0 || currentPhase !== 'ready') && (
            <div className="space-y-2">
              <div className="flex justify-center gap-4">
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                  Cycle: {currentCycle + 1} / {selectedPattern.cycles}
                </Badge>
                <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                  {selectedPattern.name}
                </Badge>
              </div>
              
              <div className="w-full bg-sage-100 rounded-full h-2 max-w-xs mx-auto">
                <div 
                  className="h-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${((currentCycle + (currentPhase !== 'ready' ? 0.33 : 0)) / selectedPattern.cycles) * 100}%` 
                  }}
                />
              </div>
            </div>
          )}

          {/* Controls */}
          {!isCompleted ? (
            <div className="flex justify-center gap-4">
              {!isPlaying ? (
                <Button
                  onClick={startBreathing}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                >
                  <Play className="w-4 h-4 mr-2" />
                  {currentPhase === 'ready' && currentCycle === 0 ? 'Start Session' : 'Resume'}
                </Button>
              ) : (
                <Button
                  onClick={pauseBreathing}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8"
                >
                  <Pause className="w-4 h-4 mr-2" />
                  Pause
                </Button>
              )}
              
              <Button
                onClick={resetBreathing}
                variant="outline"
                className="border-sage-300"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-sage-800 mb-2">
                  🧘‍♀️ Session Complete!
                </h3>
                <p className="text-sage-600 text-lg">
                  Well done! You've completed your mindful breathing session.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2 text-emerald-600">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Benefits gained:</span>
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
                onClick={resetBreathing}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                New Session
              </Button>
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
