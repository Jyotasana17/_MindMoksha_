{
  "name": "Assessment",
  "type": "object",
  "properties": {
    "responses": {
      "type": "array",
      "description": "Array of user responses to assessment questions",
      "items": {
        "type": "object",
        "properties": {
          "question_id": {
            "type": "string"
          },
          "question": {
            "type": "string"
          },
          "response": {
            "type": "boolean"
          },
          "severity": {
            "type": "integer",
            "minimum": 1,
            "maximum": 5
          }
        }
      }
    },
    "total_score": {
      "type": "number",
      "description": "Percentage score of positive responses"
    },
    "recommendation": {
      "type": "string",
      "enum": [
        "professional_help",
        "self_care"
      ],
      "description": "Recommendation based on score"
    },
    "completed_at": {
      "type": "string",
      "format": "date-time"
    }
  },
  "required": [
    "responses",
    "total_score",
    "recommendation"
  ]
}