import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export const GEMINI_MODEL = new ChatGoogleGenerativeAI({
  model: "gemini-flash-latest",
  temperature: 0.5,
});

import { ChatOllama } from "@langchain/ollama";

export const OLLAMA_MODEL = new ChatOllama({
  model: "llama3.1:8b",
  baseUrl: "http://localhost:11434",
  temperature: 1,
  numCtx: 8192,
});

import { ChatOpenAI } from "@langchain/openai";

export const OPEN_AI_MODEL = new ChatOpenAI({
  model: "gpt-5.4-mini",
  temperature: 0.5,
});
