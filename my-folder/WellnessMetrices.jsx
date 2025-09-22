import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, TrendingUp, Calendar, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function WellnessMetrics({ score, trend, streak }) {
  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-500";
  };

  const getScoreDescription = (score) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Needs Attention";
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case "improving": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "stable": return "bg-blue-100 text-blue-800 border-blue-200";
      case "declining": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="glass-effect border-sage-200/50 shadow-xl h-full">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sage-800">
            <Heart className="w-5 h-5 text-rose-500" />
            Wellness Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Wellness Score */}
          <div className="text-center">
            <div className={`text-4xl font-bold ${getScoreColor(score)} mb-2`}>
              {score}%
            </div>
            <p className="text-sage-600 text-sm">{getScoreDescription(score)}</p>
            <div className="w-full bg-sage-100 rounded-full h-2 mt-3">
              <div 
                className={`h-2 rounded-full transition-all duration-1000 ${
                  score >= 80 ? 'bg-emerald-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${Math.min(score, 100)}%` }}
              />
            </div>
          </div>

          {/* Trend */}
          <div className="flex items-center justify-between">
            <span className="text-sage-600 text-sm">Mood Trend:</span>
            <Badge className={`${getTrendColor(trend)} border`}>
              <TrendingUp className="w-3 h-3 mr-1" />
              {trend.charAt(0).toUpperCase() + trend.slice(1)}
            </Badge>
          </div>

          {/* Streak */}
          <div className="flex items-center justify-between">
            <span className="text-sage-600 text-sm">Daily Streak:</span>
            <div className="flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span className="font-semibold text-sage-800">{streak} days</span>
            </div>
          </div>

          {/* Last Check */}
          <div className="flex items-center justify-between border-t border-sage-200/50 pt-4">
            <span className="text-sage-600 text-sm">Last Check-in:</span>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span className="text-sage-800 text-sm">Today</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}