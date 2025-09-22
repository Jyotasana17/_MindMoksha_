
import React, { useState } from "react";
import { Assessment as AssessmentEntity } from "@/entities/Assessment";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Brain, 
  Heart, 
  CheckCircle, 
  AlertTriangle, 
  ArrowRight,
  ArrowLeft,
  Sparkles
} from "lucide-react";

const assessmentQuestions = [
  {
    id: "1",
    question: "I have been feeling down, depressed, or hopeless",
    category: "mood"
  },
  {
    id: "2", 
    question: "I have little interest or pleasure in doing things",
    category: "motivation"
  },
  {
    id: "3",
    question: "I have trouble falling or staying asleep, or sleeping too much",
    category: "sleep"
  },
  {
    id: "4",
    question: "I feel tired or have little energy most days",
    category: "energy"
  },
  {
    id: "5",
    question: "I have poor appetite or overeating issues",
    category: "appetite"
  },
  {
    id: "6",
    question: "I feel bad about myself, like a failure, or that I've let others down",
    category: "self_worth"
  },
  {
    id: "7",
    question: "I have trouble concentrating on things like reading or watching TV",
    category: "concentration"
  },
  {
    id: "8",
    question: "I feel nervous, anxious, or on edge",
    category: "anxiety"
  },
  {
    id: "9",
    question: "I worry too much about different things",
    category: "worry"
  },
  {
    id: "10",
    question: "I have trouble relaxing",
    category: "stress"
  },
  {
    id: "11",
    question: "I feel restless or unable to sit still",
    category: "restlessness"
  },
  {
    id: "12",
    question: "I get easily annoyed or irritated",
    category: "irritability"
  },
  {
    id: "13",
    question: "I feel afraid that something awful might happen",
    category: "fear"
  },
  {
    id: "14",
    question: "I have physical symptoms like headaches or muscle tension without clear cause",
    category: "physical"
  },
  {
    id: "15",
    question: "I avoid social situations or activities I used to enjoy",
    category: "social"
  }
];

const responseOptions = [
  { value: 0, label: "Not at all", severity: 0 },
  { value: 1, label: "Several days", severity: 1 },
  { value: 2, label: "More than half the days", severity: 3 },
  { value: 3, label: "Nearly every day", severity: 5 }
];

export default function Assessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [result, setResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleResponse = (questionId, response) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: response
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateResult = () => {
    const totalQuestions = assessmentQuestions.length;
    const totalSeverity = Object.values(responses).reduce((sum, response) => sum + response.severity, 0);
    const maxPossibleSeverity = totalQuestions * 5;
    
    // Calculate percentage of concerning symptoms
    const severityPercentage = (totalSeverity / maxPossibleSeverity) * 100;
    
    return {
      total_score: 100 - severityPercentage, // Higher score = better mental health
      severity_percentage: severityPercentage,
      recommendation: severityPercentage > 25 ? "professional_help" : "self_care" // 25% threshold instead of 75%
    };
  };

  const submitAssessment = async () => {
    setIsSubmitting(true);
    
    const assessmentResult = calculateResult();
    
    const assessmentData = {
      responses: assessmentQuestions.map(q => ({
        question_id: q.id,
        question: q.question,
        response: responses[q.id]?.value === 0 ? false : true,
        severity: responses[q.id]?.severity || 0
      })),
      total_score: assessmentResult.total_score,
      recommendation: assessmentResult.recommendation,
      completed_at: new Date().toISOString()
    };

    try {
      await AssessmentEntity.create(assessmentData);
      setResult(assessmentResult);
      setIsCompleted(true);
    } catch (error) {
      console.error("Error saving assessment:", error);
    }
    
    setIsSubmitting(false);
  };

  const progress = ((Object.keys(responses).length) / assessmentQuestions.length) * 100;
  const currentQuestionData = assessmentQuestions[currentQuestion];
  const currentResponse = responses[currentQuestionData?.id];

  if (isCompleted) {
    return (
      <div className="min-h-screen therapy-gradient p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-8"
          >
            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-sage-800 mb-4">
              Assessment Complete
            </h1>
          </motion.div>

          <Card className="glass-effect border-sage-200/50 shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-2xl text-sage-800">
                <Brain className="w-6 h-6 text-purple-500" />
                Your Mental Wellness Score
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div>
                <div className="text-6xl font-bold text-sage-800 mb-2">
                  {result.total_score.toFixed(0)}%
                </div>
                <p className="text-sage-600">
                  Overall Wellness Score
                </p>
              </div>

              <div className="w-full bg-sage-100 rounded-full h-4">
                <div 
                  className={`h-4 rounded-full transition-all duration-1000 ${
                    result.total_score >= 75 ? 'bg-emerald-500' : 
                    result.total_score >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${result.total_score}%` }}
                />
              </div>

              <div className="p-6 rounded-xl bg-white/60">
                {result.recommendation === "professional_help" ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-2 text-orange-600 mb-3">
                      <AlertTriangle className="w-6 h-6" />
                      <span className="font-semibold text-lg">Consider Professional Support</span>
                    </div>
                    <p className="text-sage-700 leading-relaxed">
                      Based on your responses, we recommend speaking with a mental health professional. 
                      They can provide personalized guidance and support tailored to your specific needs.
                      Remember, seeking help is a sign of strength, not weakness.
                    </p>
                    <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                      Professional consultation recommended
                    </Badge>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-2 text-emerald-600 mb-3">
                      <Heart className="w-6 h-6" />
                      <span className="font-semibold text-lg">Self-Care Focused</span>
                    </div>
                    <p className="text-sage-700 leading-relaxed">
                      Great news! Your wellness score suggests that self-care activities and mindfulness 
                      practices can be very beneficial. Continue with regular wellness routines and 
                      monitoring your mental health.
                    </p>
                    <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                      Self-care activities recommended
                    </Badge>
                  </div>
                )}
              </div>

              <div className="flex gap-4 justify-center pt-4">
                <Button 
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="border-sage-300"
                >
                  Take Again
                </Button>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Explore Activities
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen therapy-gradient p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-sage-800 mb-4">
            Mental Health Check-in
          </h1>
          <p className="text-sage-600 text-lg">
            Take a moment to reflect on how you've been feeling lately. 
            This assessment helps us understand your current mental wellness.
          </p>
        </div>

        {/* Progress */}
        <Card className="glass-effect border-sage-200/50 shadow-xl mb-6">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-sage-700">
                Question {currentQuestion + 1} of {assessmentQuestions.length}
              </span>
              <span className="text-sm text-sage-600">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="glass-effect border-sage-200/50 shadow-xl">
              <CardHeader>
                <CardTitle className="text-sage-800 text-lg leading-relaxed">
                  {currentQuestionData?.question}
                </CardTitle>
                <p className="text-sage-600 text-sm">
                  Over the last 2 weeks, how often have you been bothered by this?
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {responseOptions.map((option) => (
                  <motion.button
                    key={option.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleResponse(currentQuestionData.id, option)}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      currentResponse?.value === option.value
                        ? 'border-purple-500 bg-purple-50 shadow-md'
                        : 'border-sage-200 bg-white/60 hover:border-sage-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sage-800">
                        {option.label}
                      </span>
                      {currentResponse?.value === option.value && (
                        <CheckCircle className="w-5 h-5 text-purple-500" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="border-sage-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="flex gap-3">
            {currentQuestion < assessmentQuestions.length - 1 ? (
              <Button
                onClick={nextQuestion}
                disabled={!currentResponse}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={submitAssessment}
                disabled={!currentResponse || isSubmitting}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                {isSubmitting ? "Analyzing..." : "Complete Assessment"}
                <CheckCircle className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
