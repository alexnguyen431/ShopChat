# AI Search Setup Guide

The AI search feature is now configured to use **Google Gemini** by default! 

## Quick Setup (Gemini - Currently Active)

1. **Get a Gemini API Key:**
   - Go to https://aistudio.google.com/app/apikey
   - Sign in with your Google account
   - Click "Create API Key"
   - Copy your API key

2. **Add to Environment Variables:**
   Create a `.env.local` file in the root directory:
   ```
   GEMINI_API_KEY=your-gemini-api-key-here
   ```

3. **Restart the dev server:**
   ```bash
   npm run dev
   ```

That's it! The AI search will now use Gemini to provide intelligent responses.

## How It Works

- **With Gemini API Key:** Uses Google's Gemini Pro model for intelligent, context-aware responses
- **Without API Key:** Falls back to a simple keyword-based search (still functional)

## Testing

Once you've added your Gemini API key, test with questions like:
- "What hoodies do you have?"
- "Show me black sneakers"
- "What materials are used in your products?"
- "How much do your jackets cost?"
- "What's the difference between your sweatshirts and hoodies?"

## Alternative AI Providers

If you prefer a different AI provider, you can modify `app/api/ai-search/route.ts`:

### OpenAI
- Get key from https://platform.openai.com/
- Add `OPENAI_API_KEY` to `.env.local`
- Update the API route to use OpenAI's endpoint

### Anthropic Claude
- Get key from https://console.anthropic.com/
- Add `ANTHROPIC_API_KEY` to `.env.local`
- Update the API route to use Anthropic's endpoint

## Current Implementation

The current implementation:
- ✅ Uses Gemini Pro when API key is provided
- ✅ Falls back to keyword search if no key or API fails
- ✅ Provides natural language responses
- ✅ Returns matching products with links
- ✅ Handles errors gracefully

