
import React, { useState, useEffect } from "react";
import { User } from "@/entities/User";
import { Assessment } from "@/entities/Assessment";
import { UserMentalHealth } from "@/entities/UserMentalHealth";
import { Activity } from "@/entities/Activity";
import { Conversation } from "@/entities/Conversation";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Brain, 
  TrendingUp, 
  Calendar,
  Shield,
  Sparkles,
  ArrowRight,
  Sun,
  Moon,
  Activity as ActivityIcon
} from "lucide-react";
import { motion } from "framer-motion";

import DailyMoodCheck from "./components/dashboard/DailyMoodCheck";
import RecentActivities from "./components/dashboard/RecentActivities";
import QuickActions from "./components/dashboard/QuickActions";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [userHealth, setUserHealth] = useState(null);
  const [recentAssessments, setRecentAssessments] = useState([]);
  const [todayActivities, setTodayActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    loadDashboardData();
    setGreetingMessage();
  }, []);

  const loadDashboardData = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);

      // Load or create user health profile
      const healthProfiles = await UserMentalHealth.filter({ created_by: currentUser.email });
      let healthProfile;
      
      if (healthProfiles.length === 0) {
        healthProfile = await UserMentalHealth.create({
          current_wellness_score: 75,
          mood_trend: "stable",
          daily_activities_completed: 0,
          streak_days: 0,
          preferred_activity_categories: ["mindfulness", "breathing"],
          privacy_settings: {
            data_sharing: false,
            anonymous_analytics: true
          }
        });
      } else {
        healthProfile = healthProfiles[0];
      }
      setUserHealth(healthProfile);

      // Load recent assessments
      const assessments = await Assessment.filter(
        { created_by: currentUser.email }, 
        "-created_date", 
        3
      );
      setRecentAssessments(assessments);

      // Load sample activities (would normally be user's completed activities)
      const activities = await Activity.list("-created_date", 4);
      setTodayActivities(activities);

    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
    setIsLoading(false);
  };

  const setGreetingMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  };

  const getWellnessColor = (score) => {
    if (score >= 80) return "text-emerald-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-500";
  };

  const getMoodTrendIcon = (trend) => {
    switch (trend) {
      case "improving": return <TrendingUp className="w-4 h-4 text-emerald-500" />;
      case "stable": return <ActivityIcon className="w-4 h-4 text-blue-500" />;
      case "declining": return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      default: return <ActivityIcon className="w-4 h-4 text-gray-400" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen therapy-gradient p-6">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-6">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="h-32 bg-white/60 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen therapy-gradient p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-sage-800 mb-2">
                {greeting}, {user?.full_name?.split(' ')[0] || 'Friend'} 
                <span className="ml-2">{new Date().getHours() < 18 ? '☀️' : '🌙'}</span>
              </h1>
              <p className="text-sage-600 text-lg">
                How are you feeling today? Let's check in on your wellness journey.
              </p>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-sage-200">
                <Shield className="w-4 h-4 text-emerald-500" />
                <span className="text-sm font-medium text-sage-700">Secure & Private</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Daily Mood Check */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <DailyMoodCheck />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <QuickActions />
          <RecentActivities activities={todayActivities} />
        </div>

        {/* Assessment Summary */}
        {recentAssessments.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass-effect border-sage-200/50 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-sage-800">
                  <Brain className="w-5 h-5 text-purple-500" />
                  Recent Health Check
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-sage-800 mb-1">
                      {recentAssessments[0].total_score.toFixed(0)}% Wellness Score
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant={recentAssessments[0].recommendation === "professional_help" ? "destructive" : "default"}>
                        {recentAssessments[0].recommendation === "professional_help" ? "Consider Professional Help" : "Self-Care Recommended"}
                      </Badge>
                      {getMoodTrendIcon(userHealth?.mood_trend)}
                    </div>
                  </div>
                  <Link to={createPageUrl("Assessment")}>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      Take New Assessment
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
