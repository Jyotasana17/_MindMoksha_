{
  "name": "Conversation",
  "type": "object",
  "properties": {
    "messages": {
      "type": "array",
      "description": "Chat messages between user and AI",
      "items": {
        "type": "object",
        "properties": {
          "role": {
            "type": "string",
            "enum": [
              "user",
              "assistant"
            ]
          },
          "content": {
            "type": "string"
          },
          "timestamp": {
            "type": "string",
            "format": "date-time"
          },
          "mood_detected": {
            "type": "string",
            "enum": [
              "positive",
              "neutral",
              "concerned",
              "distressed"
            ]
          }
        }
      }
    },
    "session_summary": {
      "type": "string",
      "description": "AI summary of conversation and mental state"
    },
    "emotional_indicators": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Emotional patterns detected"
    }
  },
  "required": [
    "messages"
  ]
}