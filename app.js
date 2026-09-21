import cors from "cors";
import express from "express";
import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const SYSTEM_PROMPT = `You are a customer-support executive for our
Food ordering app named Tomato.

Your job is to identify the customer's main
problem and urgency. Answer them related to their query.

Use professional language. If user has an issue,
use words like "I understand your frustration",
"I am really sorry for your trouble" etc.

Do not answer any other question which is not
related to Ordering Food query, refund query,
order tracking status query or company policy query.
`;

const app = express();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

const model = "gemini-2.5-flash";

const history = [];

// Serialize history operations so simultaneous
// requests cannot interleave turns.
let historyQueue = Promise.resolve();

function useHistory(operation) {
  const result = historyQueue.then(operation);
  historyQueue = result.catch(() => {});
  return result;
}

app.use(cors());
app.use(express.text({ type: "*/*" }));

app.post("/api/chat", async (req, res, next) => {
  if (typeof req.body !== "string") {
    res
      .status(400)
      .type("text/plain")
      .send("Request body must be text");

    return;
  }

  try {
    const answer = await useHistory(async () => {
      history.push({
        role: "user",
        content: req.body
      });

      const conversation = history
        .map((message) => {
          return `${message.role}: ${message.content}`;
        })
        .join("\n");

      const response = await ai.models.generateContent({
        model,
        contents: `${SYSTEM_PROMPT}

Conversation:
${conversation}

Respond only to the customer's latest message.`
      });

      const answerText = response.text;

      history.push({
        role: "assistant",
        content: answerText
      });

      return answerText;
    });

    res.type("text/plain").send(answer);
  } catch (error) {
    next(error);
  }
});

app.delete("/api", async (_req, res, next) => {
  try {
    await useHistory(async () => {
      history.length = 0;
    });

    res.status(200).send();
  } catch (error) {
    next(error);
  }
});

app.use((error, _req, res, _next) => {
  console.error(error);

  res
    .status(500)
    .type("text/plain")
    .send("Unable to process the chat request");
});

export default app;