# Freshdesk Workflow Demo

A standalone support-ticket workflow prototype. The interface uses sample tickets and local business rules; it is **not connected to a Freshdesk account**, is not affiliated with Freshworks, and does not send messages to customers.

## Run locally

Open `index.html` in a browser, or serve this folder over HTTP:

```sh
python3 -m http.server 4173
```

Then visit `http://localhost:4173`.

## Try the workflow

- Search tickets and filter by all, open, or resolved.
- Create a ticket with your own sample subject and message. The rule engine classifies it, selects a suggested support queue and priority, and writes an editable response draft.
- Review the rule's confidence and rationale. Safety, account-security, legal, billing/refund, and unclear tickets are explicitly flagged for a human; the drafts avoid promising a refund or requesting passwords, one-time codes, or full payment details.
- Edit and record a reply, resolve a ticket separately, or reopen a resolved ticket. Recorded replies and status changes persist in this browser only.
- Regenerate the suggested reply or use `⌘ K` / `Ctrl K` to focus search.

## Important limitation

This is a deterministic rules demo, not an AI model and not a production Freshdesk integration. Tickets, queue assignments, replies, and status changes are stored in the browser's `localStorage`. No ticket data or reply is sent to Freshdesk or to a customer. Connecting a real account requires Freshdesk access and a separately hosted, authenticated backend to protect credentials; no API key belongs in this static site or its repository.
