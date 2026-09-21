# 🍅 Tomato Chat API

A backend REST API for a **Tomato food-ordering customer support chatbot**, powered by **Google Gemini 2.5 Flash**.

The chatbot is designed to handle customer queries related to:

* 🍔 Food ordering
* 💰 Refunds
* 📦 Order tracking
* 📋 Company policies

It uses conversation history to provide context-aware responses and is built with **Node.js, Express.js, and Google Gemini API**.

## 🚀 Features

* Google Gemini 2.5 Flash integration
* AI-powered customer support
* Conversation history
* Food-ordering focused system prompt
* REST API endpoint for chat
* Endpoint to clear conversation history
* CORS enabled
* Environment variable support for API keys
* Error handling for failed requests

## 🛠️ Technologies Used

* Node.js
* Express.js
* Google Gemini API
* `@google/genai`
* JavaScript (ES Modules)
* dotenv
* CORS

## 📁 Project Structure

```text
tomato-chat-api/
│
├── app.js
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
```

### 2. Open the project

```bash
cd YOUR_REPOSITORY
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create a `.env` file

Create a file named:

```text
.env
```

Add your Gemini API key:

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
```

**Never upload your `.env` file or API key to GitHub.**

## ▶️ Run the Application

Start the server with:

```bash
node server.js
```

The API will run on:

```text
http://localhost:3000
```

You should see:

```text
Tomato Chat API listening on http://localhost:3000
```

## 🔌 API Endpoints

### POST `/api/chat`

Sends a customer message to the AI chatbot.

**Request:**

```http
POST http://localhost:3000/api/chat
Content-Type: text/plain
```

Example body:

```text
I want to track my food order.
```

The API returns the AI-generated response as plain text.

### DELETE `/api`

Clears the current conversation history.

```http
DELETE http://localhost:3000/api
```

## 🧠 AI Model

This project uses:

```text
Gemini 2.5 Flash
```

The model is configured in `app.js` and receives the customer-support system prompt along with the conversation history.

## 🔐 Environment Variables

| Variable         | Description                     |
| ---------------- | ------------------------------- |
| `GEMINI_API_KEY` | Google Gemini API key           |
| `PORT`           | Server port, defaults to `3000` |

Example:

```env
GEMINI_API_KEY=your_api_key
PORT=3000
```

## 🧪 Testing with Postman

### Chat Request

**Method:**

```text
POST
```

**URL:**

```text
http://localhost:3000/api/chat
```

**Body → raw → Text:**

```text
I want to know where my food order is.
```

The backend accepts the request body as plain text.

### Clear Chat History

**Method:**

```text
DELETE
```

**URL:**

```text
http://localhost:3000/api
```

## 🔒 GitHub Security

Do not upload:

```text
.env
node_modules/
```

Add them to `.gitignore`:

```gitignore
node_modules/
.env
.env.*
!.env.example
```

You can create an `.env.example` file:

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
```

## 📌 Example Customer Queries

```text
I want to order a pizza.

My order hasn't arrived yet.

I want a refund for my order.

What is your cancellation policy?

Where can I track my order?
```

The chatbot is instructed to respond only to food-ordering, refund, order-tracking, and company-policy related queries.

## 👨‍💻 Author

**Sahil Garg**

GitHub: https://github.com/sahilS7garg

LinkedIn: https://www.linkedin.com/in/sahil-garg-2a3a95287/
