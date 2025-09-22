{
  "name": "Activity",
  "type": "object",
  "properties": {
    "title": {
      "type": "string",
      "description": "Activity title"
    },
    "description": {
      "type": "string",
      "description": "Detailed description of the activity"
    },
    "category": {
      "type": "string",
      "enum": [
        "breathing",
        "mindfulness",
        "exercise",
        "journaling",
        "relaxation",
        "cognitive"
      ],
      "description": "Type of mental health activity"
    },
    "duration_minutes": {
      "type": "integer",
      "description": "Estimated time to complete activity"
    },
    "difficulty": {
      "type": "string",
      "enum": [
        "beginner",
        "intermediate",
        "advanced"
      ]
    },
    "instructions": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Step by step instructions"
    },
    "benefits": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Mental health benefits"
    }
  },
  "required": [
    "title",
    "description",
    "category",
    "duration_minutes"
  ]
}