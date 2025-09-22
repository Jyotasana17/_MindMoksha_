import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { 
  Brain, 
  Music, 
  PersonStanding, 
  Gamepad2, 
  MessageCircle,
  Sparkles,
  ArrowRight
} from "lucide-react";

const quickActions = [
  {
    title: "5-Min Breathing",
    description: "Quick mindfulness exercise",
    icon: Brain,
    color: "bg-purple-500",
    link: createPageUrl("Activities"),
    duration: "5 min"
  },
  {
    title: "Calming Music",
    description: "AI-curated playlist",
    icon: Music,
    color: "bg-pink-500",
    link: createPageUrl("Music"),
    duration: "15 min"
  },
  {
    title: "Gentle Yoga",
    description: "Stress-relief poses",
    icon: PersonStanding,
    color: "bg-orange-500",
    link: createPageUrl("Yoga"),
    duration: "10 min"
  },
  {
    title: "Brain Game",
    description: "Cognitive wellness",
    icon: Gamepad2,
    color: "bg-indigo-500",
    link: createPageUrl("Games"),
    duration: "8 min"
  }
];

export default function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="glass-effect border-sage-200/50 shadow-xl h-full">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-sage-800">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            Quick Wellness Boost
          </CardTitle>
          <p className="text-sage-600 text-sm">
            Choose a quick activity to improve your mental state right now.
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Link to={action.link} className="block">
                  <div className="p-4 rounded-xl bg-white/60 border border-sage-200/50 hover:shadow-lg transition-all duration-200 hover:bg-white/80 group">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${action.color} text-white`}>
                        <action.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium text-sage-800 group-hover:text-sage-900">
                            {action.title}
                          </h3>
                          <span className="text-xs text-sage-500 bg-sage-100 px-2 py-1 rounded-full">
                            {action.duration}
                          </span>
                        </div>
                        <p className="text-xs text-sage-600">
                          {action.description}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-sage-400 group-hover:text-sage-600 transition-colors" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-sage-200/50">
            <Link to={createPageUrl("Chat")}>
              <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                <MessageCircle className="w-4 h-4 mr-2" />
                Talk to AI Companion
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
