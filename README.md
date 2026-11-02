# QueryFlow MVP

A standalone, no-API prototype of an automated customer-query response workspace, inspired by the automated query-response case study in the portfolio.

## Run locally

Open `index.html` in a browser, or serve this folder over HTTP:

```sh
python3 -m http.server 4173
```

Then visit `http://localhost:4173`.

## What works in this demo

- Browse, search, and filter sample customer conversations.
- Generate a contextual reply suggestion from local rules; suggestions are editable and show a confidence/review cue.
- Send a reply to resolve a conversation, resolve without replying, or reopen a resolved conversation.
- Add a sample query and keep changes in browser `localStorage`.
- Try the search shortcut `⌘ K` (or `Ctrl K`).

No customer data is sent anywhere and no AI provider or API key is used. Reply suggestions are deterministic demo templates, not an LLM; refund and account issues explicitly ask an agent to verify details.
