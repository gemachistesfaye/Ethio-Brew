# Ethio-Brew Multilingual Architecture
Enterprise Localization Guide

## 1. Supported Languages
- **English (en):** International Standard.
- **Amharic (am):** Ethiopic Script optimized.
- **Afaan Oromo (om):** Qubee Script optimized.

## 2. Technical Stack
- **Context API:** `LanguageContext.jsx` manages global state.
- **JSON Locales:** Structured `common.json` for every language.
- **Custom Hook:** `useTranslation` for efficient component integration.

## 3. Coverage
The system provides 100% coverage for:
- Admin Dashboard charts and tables.
- AI Chatbot responses.
- Legal documents (Privacy/Terms).
- Payment instructions.
- All dynamic product descriptions.

## 4. Typography
- **Noto Sans Ethiopic:** Automatically applied for Amharic/Oromo to ensure readability on older devices.
- **Inter:** Used for English layout precision.
