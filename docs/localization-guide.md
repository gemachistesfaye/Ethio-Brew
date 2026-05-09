# Ethio-Brew Localization Guide

Ethio-Brew supports a multilingual experience tailored for the Ethiopian market, including **English (en)**, **Amharic (am)**, and **Afaan Oromoo (om)**.

## 🛠️ Technology
- **Library**: `react-i18next`
- **Detection**: `i18next-browser-languagedetector`
- **Format**: JSON-based key-value pairs.

## 📁 File Structure
Translations are located in `frontend/src/locales/`:
- `en.json`: English (Default)
- `am.json`: Amharic
- `om.json`: Afaan Oromoo

## 🗝️ Translation Strategy

### 1. Static UI Text
Static labels (Buttons, Navbar, Tooltips) are managed in the JSON files.
**Example**:
```json
{
  "nav": {
    "home": "Home",
    "menu": "Shop"
  }
}
```
**Usage**: `const { t } = useTranslation(); <span>{t('nav.home')}</span>`

### 2. Dynamic Database Content
Product names and descriptions are stored in the database with language suffixes (`_en`, `_am`, `_om`).
The frontend selects the correct column based on the active language:
```javascript
const name = i18n.language === 'am' ? product.name_am : 
             i18n.language === 'om' ? product.name_om : 
             product.name_en;
```

## 🌍 Adding a New Language (e.g., Tigrinya)
1. Create `frontend/src/locales/ti.json`.
2. Update `frontend/src/i18n.js` to include the new resource.
3. Update the `Layout.jsx` language switcher to include the `ti` button.
4. Add `_ti` columns to the `products` table in the SQL schema.
