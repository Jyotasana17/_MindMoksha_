import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Clock, Brain, Heart, PersonStanding, Music } from "lucide-react";

const getCategoryIcon = (category) => {
  switch (category) {
    case "breathing": return Brain;
    case "mindfulness": return Heart;
    case "exercise": return PersonStanding; // Changed from Yoga to PersonStanding
    case "relaxation": return Music;
    default: return Brain;
  }
};

const getCategoryColor = (category) => {
  switch (category) {
    case "breathing": return "bg-blue-100 text-blue-800 border-blue-200";
    case "mindfulness": return "bg-purple-100 text-purple-800 border-purple-200";
    case "exercise": return "bg-orange-100 text-orange-800 border-orange-200";
    case "relaxation": return "bg-pink-100 text-pink-800 border-pink-200";
    default: return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export default function RecentActivities({ activities = [] }) {
  // If no activities, show sample data
  const sampleActivities = [
    { title: "Morning Meditation", category: "mindfulness", duration_minutes: 10 },
    { title: "Deep Breathing Exercise", category: "breathing", duration_minutes: 5 },
    { title: "Gentle Stretching", category: "exercise", duration_minutes: 15 }
  ];

  const displayActivities = activities.length > 0 ? activities.slice(0, 3) : sampleActivities;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="glass-effect border-sage-200/50 shadow-xl h-full">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-sage-800">
            <Clock className="w-5 h-5 text-blue-500" />
            Recommended for You
          </CardTitle>
          <p className="text-sage-600 text-sm">
            Personalized wellness activities based on your mental health profile.
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {displayActivities.map((activity, index) => {
              const IconComponent = getCategoryIcon(activity.category);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="p-4 rounded-xl bg-white/60 border border-sage-200/50 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-sage-100">
                      <IconComponent className="w-4 h-4 text-sage-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sage-800 text-sm mb-1">
                        {activity.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <Badge className={`${getCategoryColor(activity.category)} border text-xs`}>
                          {activity.category}
                        </Badge>
                        <span className="text-xs text-sage-500">
                          {activity.duration_minutes} min
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-200">
            <p className="text-emerald-800 text-sm font-medium">
              🌟 Start with one activity today to begin your wellness journey!
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
