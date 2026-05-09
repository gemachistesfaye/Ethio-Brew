# Ethio-Brew AI Recommendation System
Personalized Coffee Sommelier Architecture

## 1. Multi-Model Resilience
The system uses an **Auto-Rotation** strategy between:
1. Gemini 2.0 Flash (Primary)
2. Gemini 2.5 Flash (Performance)
3. Gemini Pro (Fallback)

## 2. Context Injection (RAG-lite)
Unlike generic chatbots, the AI is injected with:
- **Product Catalog:** Real-time access to bean types, regions, and notes.
- **Cultural Database:** Deep knowledge of the Ethiopian Coffee Ceremony steps.
- **User Palate:** Survey results for roast, flavor, and brewing preferences.

## 3. Multilingual Engine
The system detects the frontend language state and forces the LLM to respond in:
- English
- Amharic (አማርኛ)
- Afaan Oromo

## 4. Recommendation Logic
The AI analyzes user input against flavor profiles:
- *Fruity/Acidic* -> Suggests Yirgacheffe / Sidamo.
- *Nutty/Chocolatey* -> Suggests Jimma / Harar.
- *Traditional* -> Suggests Ceremony Blend.
