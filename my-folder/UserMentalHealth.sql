{
  "name": "UserMentalHealth",
  "type": "object",
  "properties": {
    "current_wellness_score": {
      "type": "number",
      "description": "Current mental wellness score (0-100)"
    },
    "mood_trend": {
      "type": "string",
      "enum": [
        "improving",
        "stable",
        "declining"
      ]
    },
    "last_assessment_date": {
      "type": "string",
      "format": "date"
    },
    "daily_activities_completed": {
      "type": "integer",
      "default": 0
    },
    "streak_days": {
      "type": "integer",
      "default": 0,
      "description": "Consecutive days of app engagement"
    },
    "preferred_activity_categories": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "User's preferred self-care categories"
    },
    "privacy_settings": {
      "type": "object",
      "properties": {
        "data_sharing": {
          "type": "boolean",
          "default": false
        },
        "anonymous_analytics": {
          "type": "boolean",
          "default": true
        }
      }
    }
  },
  "required": []
}