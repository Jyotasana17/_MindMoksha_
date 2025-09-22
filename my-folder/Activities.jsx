import React, { useState, useEffect } from "react";
import { Activity } from "@/entities/Activity";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Brain, 
  Heart, 
  BookOpen, 
  Waves, 
  Dumbbell,
  Clock,
  Star,
  Search,
  Filter,
  CheckCircle,
  Play
} from "lucide-react";

const categoryConfig = {
  breathing: { icon: Waves, color: "bg-blue-500", badgeColor: "bg-blue-100 text-blue-800 border-blue-200" },
  mindfulness: { icon: Brain, color: "bg-purple-500", badgeColor: "bg-purple-100 text-purple-800 border-purple-200" },
  journaling: { icon: BookOpen, color: "bg-green-500", badgeColor: "bg-green-100 text-green-800 border-green-200" },
  relaxation: { icon: Heart, color: "bg-pink-500", badgeColor: "bg-pink-100 text-pink-800 border-pink-200" },
  exercise: { icon: Dumbbell, color: "bg-orange-500", badgeColor: "bg-orange-100 text-orange-800 border-orange-200" },
  cognitive: { icon: Brain, color: "bg-indigo-500", badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200" }
};

const difficultyColors = {
  beginner: "bg-green-100 text-green-800 border-green-200",
  intermediate: "bg-yellow-100 text-yellow-800 border-yellow-200",
  advanced: "bg-red-100 text-red-800 border-red-200"
};

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const data = await Activity.list();
      setActivities(data);
    } catch (error) {
      console.error("Error loading activities:", error);
    }
    setIsLoading(false);
  };

  const filteredActivities = activities.filter(activity => {
    const matchesCategory = activeCategory === "all" || activity.category === activeCategory;
    const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const startActivity = (activity) => {
    setSelectedActivity(activity);
  };

  const completeActivity = () => {
    // Here you would normally save completion to user's progress
    setSelectedActivity(null);
  };

  if (selectedActivity) {
    return (
      <ActivityView 
        activity={selectedActivity} 
        onComplete={completeActivity}
        onBack={() => setSelectedActivity(null)}
      />
    );
  }

  return (
    <div className="min-h-screen therapy-gradient p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-sage-800 mb-4">
              Self-Care Activities
            </h1>
            <p className="text-sage-600 text-lg max-w-2xl mx-auto">
              Choose from a variety of evidence-based mental wellness activities designed to improve your mood, reduce stress, and enhance overall well-being.
            </p>
          </motion.div>
        </div>

        {/* Search and Filters */}
        <Card className="glass-effect border-sage-200/50 shadow-lg mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sage-400 w-4 h-4" />
                <Input
                  placeholder="Search activities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-sage-200"
                />
              </div>
              <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full md:w-auto">
                <TabsList className="bg-sage-100 w-full md:w-auto">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="breathing">Breathing</TabsTrigger>
                  <TabsTrigger value="mindfulness">Mindfulness</TabsTrigger>
                  <TabsTrigger value="relaxation">Relaxation</TabsTrigger>
                  <TabsTrigger value="exercise">Movement</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        {/* Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredActivities.map((activity, index) => {
              const categoryInfo = categoryConfig[activity.category] || categoryConfig.mindfulness;
              const IconComponent = categoryInfo.icon;
              
              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="glass-effect border-sage-200/50 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className={`p-3 rounded-xl ${categoryInfo.color} text-white`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-sage-500" />
                          <span className="text-sm text-sage-600">{activity.duration_minutes} min</span>
                        </div>
                      </div>
                      <CardTitle className="text-sage-800 text-lg leading-tight">
                        {activity.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sage-600 text-sm leading-relaxed">
                        {activity.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        <Badge className={`${categoryInfo.badgeColor} border text-xs`}>
                          {activity.category}
                        </Badge>
                        <Badge className={`${difficultyColors[activity.difficulty]} border text-xs`}>
                          {activity.difficulty}
                        </Badge>
                      </div>

                      {activity.benefits && (
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-sage-700">Benefits:</p>
                          <div className="flex flex-wrap gap-1">
                            {activity.benefits.slice(0, 2).map((benefit, i) => (
                              <span key={i} className="text-xs bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full">
                                {benefit}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <Button 
                        onClick={() => startActivity(activity)}
                        className="w-full bg-sage-600 hover:bg-sage-700 text-white"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Start Activity
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredActivities.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-sage-400" />
            </div>
            <h3 className="text-lg font-semibold text-sage-800 mb-2">No activities found</h3>
            <p className="text-sage-600">Try adjusting your search or category filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Activity Detail View Component
function ActivityView({ activity, onComplete, onBack }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timer, setTimer] = useState(activity.duration_minutes * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer => timer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsCompleted(true);
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const categoryInfo = categoryConfig[activity.category] || categoryConfig.mindfulness;
  const IconComponent = categoryInfo.icon;

  return (
    <div className="min-h-screen therapy-gradient p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button 
            variant="outline" 
            onClick={onBack}
            className="mb-6 border-sage-300"
          >
            ← Back to Activities
          </Button>

          <Card className="glass-effect border-sage-200/50 shadow-xl">
            <CardHeader className="text-center border-b border-sage-200/50">
              <div className={`w-16 h-16 ${categoryInfo.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-sage-800 mb-2">
                {activity.title}
              </CardTitle>
              <p className="text-sage-600">{activity.description}</p>
              
              <div className="flex justify-center gap-4 mt-4">
                <Badge className={`${categoryInfo.badgeColor} border`}>
                  {activity.category}
                </Badge>
                <Badge className="bg-sage-100 text-sage-800 border-sage-200">
                  {activity.duration_minutes} minutes
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-8">
              {!isCompleted ? (
                <div className="space-y-8">
                  {/* Timer */}
                  <div className="text-center">
                    <div className="text-4xl font-bold text-sage-800 mb-4">
                      {formatTime(timer)}
                    </div>
                    <Button
                      onClick={() => setIsTimerRunning(!isTimerRunning)}
                      className={`${isTimerRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-emerald-500 hover:bg-emerald-600'} text-white px-8`}
                    >
                      {isTimerRunning ? 'Pause' : 'Start'}
                    </Button>
                  </div>

                  {/* Instructions */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-sage-800 flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Instructions
                    </h3>
                    <div className="space-y-3">
                      {activity.instructions.map((instruction, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white/60">
                          <div className="w-6 h-6 bg-sage-200 rounded-full flex items-center justify-center text-sage-700 text-sm font-medium mt-0.5">
                            {index + 1}
                          </div>
                          <p className="text-sage-700 flex-1">{instruction}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  {activity.benefits && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-sage-800 flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500" />
                        Benefits
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {activity.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-emerald-50">
                            <CheckCircle className="w-4 h-4 text-emerald-600" />
                            <span className="text-emerald-800 text-sm">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-sage-800 mb-2">
                      Well Done! 🎉
                    </h3>
                    <p className="text-sage-600 text-lg">
                      You've completed your {activity.title} session. 
                      Take a moment to notice how you feel.
                    </p>
                  </div>
                  <Button 
                    onClick={onComplete}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-8"
                  >
                    Complete & Return
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}