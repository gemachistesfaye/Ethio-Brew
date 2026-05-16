# 🌍 AI Intelligence & Universal Localization

Ethio-Brew is architected for the diverse Ethiopian market, combining cutting-edge AI with native language support.

## 🤖 AI Coffee Sommelier (Gemini 2.0)
The platform features an integrated AI expert trained on Abyssinian coffee heritage and regional profiles.

### 1. Multi-Model Resilience
To ensure 100% uptime, the system uses an **Auto-Rotation** strategy:
- **Primary**: Gemini 2.0 Flash (Fastest response).
- **Secondary**: Gemini 2.5 Flash (Complex reasoning).
- **Fallback**: Gemini Pro (Deep knowledge).

### 2. Context Injection
The AI is not a generic chatbot; it is specialized with:
- **Product Awareness**: Real-time access to the live coffee catalog.
- **Cultural Wisdom**: Knowledge of the *Jebena Buna* ceremony and Ethiopian history.
- **Sommelier Persona**: Instructed to use **bolding** for regions and *italics* for flavor notes.

---

## 🌍 Universal Localization
The platform supports zero-latency switching between English, Amharic, and Afaan Oromoo.

### 1. Language Architecture
- **Tech Stack**: Custom `LanguageContext` and `useTranslation` hook.
- **Dictionaries**: Structured JSON files located in `frontend/src/locales/`.
- **Dynamic Keys**: The UI uses translation keys (e.g., `t('nav.shop')`) to ensure 100% translatability.

### 2. Supported Locales
| Code | Language | Script | Coverage |
| :--- | :--- | :--- | :--- |
| `en` | English | Latin | 100% |
| `am` | Amharic | Ethiopic (ግዕዝ) | 100% |
| `om` | Afaan Oromoo | Latin (Qubee) | 100% |

### 3. AI Language Integration
The AI assistant detects the active UI language and automatically switches its response mode:
- **Amharic**: Responds in native Ge'ez script.
- **Oromifa**: Responds in native Qubee script.
- **English**: Standard professional tone.

---
*© 2026 Ethio-Brew — AI & Localization Blueprint.*
