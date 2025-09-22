import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  Brain, 
  Heart, 
  Zap, 
  Target,
  Palette,
  Timer,
  Star,
  ArrowLeft,
  Play,
  Pause,
  RotateCcw
} from "lucide-react";

import MemoryGame from "../components/games/MemoryGame";
import BreathingGame from "./components/games/BreathingGame";
import ColorTherapyGame from "../components/games/ColorTherapyGame";
import FocusGame from "../components/games/FocusGame";
import PatternGame from "./components/games/PatternGame";

const games = [
  {
    id: "memory",
    title: "Memory Garden",
    description: "Improve cognitive function and concentration with this peaceful memory matching game",
    icon: Brain,
    color: "bg-purple-500",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
    duration: "5-10 min",
    benefits: ["Improves memory", "Enhances focus", "Reduces anxiety"],
    difficulty: "Easy",
    component: MemoryGame
  },
  {
    id: "breathing",
    title: "Zen Breathing",
    description: "Interactive breathing exercises with beautiful visual guidance for relaxation",
    icon: Heart,
    color: "bg-blue-500",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
    duration: "3-15 min",
    benefits: ["Reduces stress", "Calms mind", "Improves focus"],
    difficulty: "Beginner",
    component: BreathingGame
  },
  {
    id: "color",
    title: "Color Harmony",
    description: "Therapeutic color matching game that promotes emotional balance and mindfulness",
    icon: Palette,
    color: "bg-pink-500",
    badgeColor: "bg-pink-100 text-pink-800 border-pink-200",
    duration: "5-8 min",
    benefits: ["Color therapy", "Mood enhancement", "Relaxation"],
    difficulty: "Easy",
    component: ColorTherapyGame
  },
  {
    id: "focus",
    title: "Focus Flow",
    description: "Concentration training game that helps improve attention span and mental clarity",
    icon: Target,
    color: "bg-green-500",
    badgeColor: "bg-green-100 text-green-800 border-green-200",
    duration: "4-6 min",
    benefits: ["Improves concentration", "Mental clarity", "Stress relief"],
    difficulty: "Medium",
    component: FocusGame
  },
  {
    id: "pattern",
    title: "Pattern Peace",
    description: "Soothing pattern recognition game that enhances cognitive flexibility",
    icon: Zap,
    color: "bg-orange-500",
    badgeColor: "bg-orange-100 text-orange-800 border-orange-200",
    duration: "6-10 min",
    benefits: ["Cognitive flexibility", "Problem solving", "Mindfulness"],
    difficulty: "Medium",
    component: PatternGame
  }
];

export default function Games() {
  const [selectedGame, setSelectedGame] = useState(null);

  if (selectedGame) {
    const GameComponent = selectedGame.component;
    return (
      <div className="min-h-screen therapy-gradient p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="outline"
            onClick={() => setSelectedGame(null)}
            className="mb-6 border-sage-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Games
          </Button>
          <GameComponent game={selectedGame} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen therapy-gradient p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-sage-800 mb-4">
            Mental Wellness Games
          </h1>
          <p className="text-sage-600 text-lg max-w-3xl mx-auto">
            Engaging, scientifically-designed games that promote mental health, cognitive function, 
            and emotional well-being. Play daily for optimal brain health.
          </p>
        </motion.div>

        {/* Benefits Banner */}
        <Card className="glass-effect border-sage-200/50 shadow-lg mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <Brain className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-sage-800">Cognitive Health</h3>
                <p className="text-sm text-sage-600">Improve memory & focus</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-sage-800">Stress Relief</h3>
                <p className="text-sm text-sage-600">Reduce anxiety & tension</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-sage-800">Mindfulness</h3>
                <p className="text-sm text-sage-600">Present moment awareness</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                  <Zap className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-sage-800">Mental Energy</h3>
                <p className="text-sm text-sage-600">Boost cognitive vitality</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game, index) => {
            const IconComponent = game.icon;
            
            return (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="glass-effect border-sage-200/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`p-3 rounded-xl ${game.color} text-white`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="flex items-center gap-2">
                        <Timer className="w-4 h-4 text-sage-500" />
                        <span className="text-sm text-sage-600">{game.duration}</span>
                      </div>
                    </div>
                    <CardTitle className="text-sage-800 text-lg leading-tight">
                      {game.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sage-600 text-sm leading-relaxed">
                      {game.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      <Badge className={`${game.badgeColor} border text-xs`}>
                        {game.difficulty}
                      </Badge>
                      <Badge className="bg-sage-100 text-sage-800 border-sage-200 text-xs">
                        Wellness Game
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-medium text-sage-700">Benefits:</p>
                      <div className="space-y-1">
                        {game.benefits.map((benefit, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <Star className="w-3 h-3 text-yellow-500" />
                            <span className="text-xs text-sage-600">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button 
                      onClick={() => setSelectedGame(game)}
                      className={`w-full ${game.color} hover:opacity-90 text-white`}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Play Game
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Daily Challenge */}
        <Card className="glass-effect border-sage-200/50 shadow-lg mt-8">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-sage-800">Daily Wellness Challenge</h3>
            </div>
            <p className="text-sage-600 mb-4">
              Complete 3 different games today to boost your mental wellness score!
            </p>
            <div className="w-full bg-sage-100 rounded-full h-2 mb-4">
              <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: '0%' }} />
            </div>
            <p className="text-sm text-sage-600">0 / 3 games completed today</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}