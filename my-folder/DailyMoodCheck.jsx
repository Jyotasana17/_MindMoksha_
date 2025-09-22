import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Smile, Meh, Frown, Heart } from "lucide-react";

const moodOptions = [
  { emoji: "😊", label: "Great", value: "great", color: "bg-emerald-500", icon: Smile },
  { emoji: "😌", label: "Good", value: "good", color: "bg-blue-500", icon: Smile },
  { emoji: "😐", label: "Okay", value: "okay", color: "bg-yellow-500", icon: Meh },
  { emoji: "😔", label: "Low", value: "low", color: "bg-orange-500", icon: Frown },
  { emoji: "😞", label: "Struggling", value: "struggling", color: "bg-red-500", icon: Frown }
];

export default function DailyMoodCheck() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    // Simulate saving mood
    setTimeout(() => {
      setSubmitted(true);
    }, 500);
  };

  return (
    <Card className="glass-effect border-sage-200/50 shadow-xl h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-sage-800">
          <Heart className="w-5 h-5 text-pink-500" />
          Daily Mood Check-in
        </CardTitle>
        <p className="text-sage-600 text-sm">
          How are you feeling right now? Your emotional awareness is the first step to wellness.
        </p>
      </CardHeader>
      <CardContent>
        {!submitted ? (
          <div className="space-y-4">
            <div className="grid grid-cols-5 gap-3">
              {moodOptions.map((mood) => (
                <motion.button
                  key={mood.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleMoodSelect(mood)}
                  className={`
                    p-4 rounded-2xl border-2 transition-all duration-200 text-center
                    ${selectedMood?.value === mood.value 
                      ? `${mood.color} text-white border-transparent shadow-lg` 
                      : 'bg-white/60 border-sage-200 hover:border-sage-300 hover:shadow-md'
                    }
                  `}
                >
                  <div className="text-2xl mb-2">{mood.emoji}</div>
                  <p className={`text-xs font-medium ${
                    selectedMood?.value === mood.value ? 'text-white' : 'text-sage-700'
                  }`}>
                    {mood.label}
                  </p>
                </motion.button>
              ))}
            </div>
            
            {selectedMood && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center p-4 bg-white/80 rounded-xl"
              >
                <p className="text-sage-700 text-sm">
                  You're feeling <span className="font-semibold">{selectedMood.label}</span> today
                </p>
              </motion.div>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-sage-800 mb-2">
              Thank you for checking in!
            </h3>
            <p className="text-sage-600 text-sm">
              Your mood has been recorded. Keep nurturing your mental wellness.
            </p>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}