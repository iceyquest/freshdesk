const seedConversations = [
  {
    id: "q-1048", name: "Priya Menon", initials: "PM", avatar: "av-pink", email: "priya.menon@email.com",
    subject: "Charged for my plan but account still looks free", category: "Billing · Subscription", channel: "Email",
    time: "2m", date: "Today, 10:42 AM", priority: "High", status: "open", unread: true,
    message: "Hi, I renewed my subscription this morning and the payment went through, but my account still looks like the free plan. Can you check what happened?",
    draft: "", reply: "", replies: [], confidence: "medium", intent: "Subscription access",
  },
  {
    id: "q-1047", name: "Arjun Kapoor", initials: "AK", avatar: "av-orange", email: "arjun.k@email.com",
    subject: "Missing coins after watching an ad", category: "Coins · Rewards", channel: "In-app", time: "18m", date: "Today, 10:26 AM",
    priority: "Normal", status: "open", unread: true,
    message: "My reward credits never showed up after I completed the offer. I refreshed the app but the balance hasn't changed. Can you check?",
    draft: "", reply: "", confidence: "high", intent: "Reward not credited",
  },
  {
    id: "q-1046", name: "Meera Iyer", initials: "MI", avatar: "av-green", email: "meera.iyer@email.com",
    subject: "The app closes when I open a recording", category: "Product · Technical issue", channel: "In-app", time: "34m", date: "Today, 10:10 AM",
    priority: "Normal", status: "open", unread: true,
    message: "The app closes every time I open a recording. I restarted my phone but it still happens. I can share my device details if that helps.",
    draft: "", reply: "", confidence: "high", intent: "Playback issue",
  },
  {
    id: "q-1045", name: "Rohan Das", initials: "RD", avatar: "av-blue", email: "rohan.das@email.com",
    subject: "How can I change my language preference?", category: "Product · How-to", channel: "Email", time: "1h", date: "Today, 9:44 AM",
    priority: "Normal", status: "open", unread: false,
    message: "I'd like to change the language used in the app. Where can I find that setting?",
    draft: "", reply: "", confidence: "high", intent: "Language preferences",
  },
  {
    id: "q-1044", name: "Ananya Rao", initials: "AR", avatar: "", email: "ananya.r@email.com",
    subject: "Requesting a refund for my plan", category: "Billing · Refunds", channel: "Email", time: "2h", date: "Today, 8:53 AM",
    priority: "High", status: "open", unread: true,
    message: "I was charged for the annual plan by mistake. I meant to select monthly. Could you review whether this charge is eligible for a refund?",
    draft: "", reply: "", confidence: "medium", intent: "Refund request",
  },
  {
    id: "q-1043", name: "Kabir Sethi", initials: "KS", avatar: "av-green", email: "kabir.s@email.com",
    subject: "Can't log in on my new phone", category: "Account · Login", channel: "In-app", time: "3h", date: "Today, 7:36 AM",
    priority: "Normal", status: "open", unread: false,
    message: "I can't access my account after changing phones. The sign-in flow keeps opening a different profile. Can you help me get back into the right one?",
    draft: "", reply: "", confidence: "medium", intent: "Account access",
  },
  {
    id: "q-1042", name: "Sana Khan", initials: "SK", avatar: "av-pink", email: "sana.k@email.com",
    subject: "Thanks for sorting out my downloads", category: "Playback · Downloads", channel: "In-app", time: "Yesterday", date: "Yesterday, 6:20 PM",
    priority: "Normal", status: "resolved", unread: false,
    message: "My saved files disappeared after I updated the app.",
    draft: "", reply: "Hi Sana, I’m sorry your saved files disappeared after the update. Please let us know which device and app version you’re using so we can check the right recovery steps.", replies: [], confidence: "medium", intent: "Downloads",
  },
  {
    id: "q-1041", name: "Dev Patel", initials: "DP", avatar: "av-blue", email: "dev.p@email.com",
    subject: "Where can I find my activity history?", category: "Product · How-to", channel: "Email", time: "Yesterday", date: "Yesterday, 4:18 PM",
    priority: "Normal", status: "resolved", unread: false,
    message: "I need to find an item I viewed earlier. Is there a way to see my recent activity?",
    draft: "", reply: "Hi Dev, you can usually find recent activity from your account or history area. If you tell us which item you’re looking for, we can point you to the right place.", replies: [], confidence: "high", intent: "Product how-to",
  },
];

const responseRules = [
  {
    intent: "Safety concern", category: "Safety · Escalate", queue: "Urgent human review", priority: "Urgent",
    confidence: "low", reviewReason: "Safety-related language requires immediate human assessment.",
    match: /\b(threat(?:ened)?|unsafe|safety concern|emergency|physical harm|hurt someone|someone hurt me)\b/i,
    response: (name) => `Hi ${name}, I’m sorry this is happening. Your safety matters. If anyone is in immediate danger, please contact your local emergency services now. I’m escalating your message to a person on our support team for a prompt review.`,
  },
  {
    intent: "Account security", category: "Security · Account", queue: "Account security", priority: "Urgent",
    confidence: "low", reviewReason: "Possible account compromise; do not request credentials or codes.",
    match: /\b(account.{0,20}(?:hack(?:ed)?|compromis(?:ed|e))|(?:someone (?:has )?)?(?:hack(?:ed)?|compromis(?:ed|e)) my account|unauthori[sz]ed access|stolen account|phishing|data breach|security issue|someone (?:got|has) into my account)\b/i,
    response: (name) => `Hi ${name}, I’m sorry you’re dealing with this. For your security, please don’t share your password or any one-time codes in this conversation. I’m referring this to our account-security team. If you can still access the account, use the official sign-in page to change your password and sign out of other sessions.`,
  },
  {
    intent: "Legal or formal complaint", category: "Escalation · Complaint", queue: "Support lead", priority: "Urgent",
    confidence: "low", reviewReason: "Legal, regulatory, or formal complaints need an authorized reviewer.",
    match: /\b(lawyer|attorney|lawsuit|legal action|regulator|ombudsman|formal complaint|chargeback|payment dispute)\b/i,
    response: (name) => `Hi ${name}, thank you for raising this. I’ve referred your message to a support lead for a careful review. We’ll review the details and follow up through this support channel. I can’t make a decision or promise an outcome before that review.`,
  },
  {
    intent: "Refund or cancellation", category: "Billing · Refund", queue: "Billing", priority: "High",
    confidence: "medium", reviewReason: "Check the purchase record and applicable refund policy before deciding.",
    match: /\b(refund|reimburse|cancel(?:lation)?|charged twice|double[- ]charged|duplicate charge|accidental charge|wrong plan|wrong amount)\b/i,
    response: (name) => `Hi ${name}, I understand you’re asking about a charge or cancellation. Refund eligibility and cancellation steps depend on the purchase channel and account details, so I can’t promise an outcome before checking. Please reply with the order or transaction reference, the purchase date, and where you made the purchase. Please don’t include full payment-card details. I’m routing this to our billing team for review.`,
  },
  {
    intent: "Payment or subscription access", category: "Billing · Subscription", queue: "Billing", priority: "High",
    confidence: "medium", reviewReason: "Verify the transaction and account entitlement before confirming access.",
    match: /\b(subscription|billing|payment|invoice|charged|purchase|paid plan|premium|renewal|receipt|access.{0,20}(?:paid|plan|purchase))\b/i,
    response: (name) => `Hi ${name}, I’m sorry the payment and account access don’t match. Please confirm the email on the account, the purchase date, and the order or transaction reference. You can also try the product’s official restore-purchase option if the purchase was made through an app store. Please don’t send full card details. Our billing team needs to verify the transaction before confirming a fix.`,
  },
  {
    intent: "Reward or credit missing", category: "Billing · Credits", queue: "Billing", priority: "Normal",
    confidence: "medium", reviewReason: "Check the transaction or reward ledger before adjusting a balance.",
    match: /\b(credits?|coins?|points?|reward|balance|wallet)\b/i,
    response: (name) => `Hi ${name}, I’m sorry the credit hasn’t appeared. Please share what action you completed, the approximate time, and any non-sensitive reference shown in the app. I’ll have the team check the account and reward record before making any balance changes. Please don’t send passwords or payment-card details.`,
  },
  {
    intent: "Account access", category: "Account · Access", queue: "Account support", priority: "Normal",
    confidence: "medium", reviewReason: "Verify account ownership through approved support procedures.",
    match: /\b(log ?in|sign ?in|locked out|can't access|cannot access|account access|change.{0,12}email|new phone|verification code|one[- ]time code|password)\b/i,
    response: (name) => `Hi ${name}, I’m sorry you’re having trouble accessing your account. Please tell us the sign-in method you normally use and the exact error you see. For your security, never share your password or one-time verification code here. Our account team can help verify ownership through the approved recovery process.`,
  },
  {
    intent: "Technical issue", category: "Product · Technical", queue: "Technical support", priority: "Normal",
    confidence: "medium", reviewReason: "Need product and reproduction details to diagnose accurately.",
    match: /\b(error|bug|crash|crashing|not working|doesn't work|does not work|won't open|will not open|loading|stuck|slow|freeze|freezes|playback|download|recording|upload|sync)\b/i,
    response: (name) => `Hi ${name}, I’m sorry you’ve run into this. Please try closing and reopening the app or page, then check whether an update is available. If it continues, reply with your device and operating-system version, the app or browser version, what you were doing just before it happened, and any error text. Please remove passwords, codes, and other sensitive information from screenshots.`,
  },
  {
    intent: "Product how-to", category: "Product · How-to", queue: "Customer support", priority: "Normal",
    confidence: "high", reviewReason: "",
    match: /\b(how (?:do|can|to)|where (?:do|can)|setting|settings|change.{0,20}(?:language|preference|notification)|find my|how to)\b/i,
    response: (name) => `Hi ${name}, thanks for reaching out. I’d be happy to point you in the right direction. Which product or feature are you using, and what are you trying to change or find? I want to make sure I share the correct steps for your setup.`,
  },
];

const state = {
  conversations: prepareConversations(loadConversations()),
  filter: "all",
  query: "",
  selectedId: null,
};

const itemContainer = document.querySelector("#conversation-items");
const detailContainer = document.querySelector("#conversation-detail");
const toast = document.querySelector("#toast");
const ticketDialog = document.querySelector("#ticket-dialog");
let toastTimer;

function classifyTicket(ticket) {
  const content = `${ticket.subject} ${ticket.message}`;
  const rule = responseRules.find((candidate) => candidate.match.test(content));
  const firstName = ticket.name.trim().split(/\s+/)[0] || "there";
  if (!rule) {
    return {
      intent: "Needs review",
      category: "Unclassified · Review",
      queue: "Customer support",
      priority: "Normal",
      confidence: "low",
      reviewReason: "No confident topic match; confirm the issue before advising.",
      draft: `Hi ${firstName}, thanks for contacting us. I want to make sure we give you the right help. Could you tell us which product or service this is about, what you expected to happen, and what happened instead? Please leave out passwords, one-time codes, and full payment details. A support agent will review your message.`,
      analysisVersion: 2,
    };
  }
  return {
    intent: rule.intent,
    category: rule.category,
    queue: rule.queue,
    priority: rule.priority,
    confidence: rule.confidence,
    reviewReason: rule.reviewReason,
    draft: rule.response(firstName),
    analysisVersion: 2,
  };
}

function prepareConversations(conversations) {
  return conversations.map((ticket) => {
    const replies = Array.isArray(ticket.replies)
      ? ticket.replies
      : ticket.reply
        ? [{ text: ticket.reply, date: ticket.date || "Previously" }]
        : [];
    if (ticket.analysisVersion === 2) return { ...ticket, replies };
    const analysis = classifyTicket(ticket);
    return {
      ...ticket,
      ...analysis,
      replies,
      draft: ticket.status === "resolved" ? (ticket.draft || "") : analysis.draft,
    };
  });
}

function loadConversations() {
  try {
    const stored = localStorage.getItem("freshdesk-demo-tickets");
    if (!stored) return structuredClone(seedConversations);
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed) || parsed.some((item) => typeof item.id !== "string" || typeof item.message !== "string")) {
      throw new Error("Saved conversation data is invalid.");
    }
    return parsed;
  } catch (error) {
    console.error("Could not load saved conversations:", error);
    return structuredClone(seedConversations);
  }
}

function saveConversations() {
  try {
    localStorage.setItem("freshdesk-demo-tickets", JSON.stringify(state.conversations));
  } catch (error) {
    console.error("Could not save conversations:", error);
    showToast("Changes are only saved for this session.");
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  })[character]);
}

function getCounts() {
  return {
    all: state.conversations.length,
    open: state.conversations.filter((item) => item.status === "open").length,
    resolved: state.conversations.filter((item) => item.status === "resolved").length,
    review: state.conversations.filter((item) => item.status === "open" && (item.confidence === "low" || item.reviewReason)).length,
    replies: state.conversations.reduce((total, item) => total + (item.replies?.length || (item.reply ? 1 : 0)), 0),
  };
}

function updateCounts() {
  const counts = getCounts();
  document.querySelector("#all-count").textContent = counts.all;
  document.querySelector("#open-count").textContent = counts.open;
  document.querySelector("#resolved-count").textContent = counts.resolved;
  document.querySelector("#tab-all-count").textContent = counts.all;
  document.querySelector("#tab-open-count").textContent = counts.open;
  document.querySelector("#inbox-nav-count").textContent = counts.open;
  document.querySelector("#open-metric").textContent = counts.open;
  document.querySelector("#review-metric").textContent = counts.review;
  document.querySelector("#reply-metric").textContent = counts.replies;
  document.querySelector("#resolved-metric").textContent = counts.resolved;
  document.querySelector("#visible-count").textContent = visibleConversations().length;
}

function visibleConversations() {
  const normalizedQuery = state.query.trim().toLowerCase();
  return state.conversations.filter((item) => {
    const inFilter = state.filter === "all" || item.status === state.filter;
    const searchable = `${item.name} ${item.subject} ${item.category} ${item.message}`.toLowerCase();
    return inFilter && (!normalizedQuery || searchable.includes(normalizedQuery));
  });
}

function renderList() {
  const conversations = visibleConversations();
  updateCounts();
  if (!conversations.length) {
    itemContainer.innerHTML = '<div class="empty-list">No conversations match this view.</div>';
    return;
  }
  itemContainer.innerHTML = conversations.map((item) => `
    <button class="conversation-item ${item.id === state.selectedId ? "selected" : ""}" type="button" data-id="${escapeHtml(item.id)}" aria-pressed="${item.id === state.selectedId}">
      <span class="customer-avatar ${escapeHtml(item.avatar)}">${escapeHtml(item.initials)}</span>
      <span class="item-main">
        <span class="item-title-row"><span class="item-name">${escapeHtml(item.name)}</span>${item.priority === "High" || item.priority === "Urgent" ? `<span class="priority-mark" title="${escapeHtml(item.priority)} priority">▲</span>` : ""}</span>
        <span class="item-category">${escapeHtml(item.subject)}</span>
        <span class="item-preview">${escapeHtml(item.reply || item.message)}</span>
      </span>
      <span class="item-meta"><span>${escapeHtml(item.time)}</span>${item.unread ? '<i class="unread-dot"></i>' : ""}</span>
    </button>
  `).join("");
  itemContainer.querySelectorAll(".conversation-item").forEach((button) => {
    button.addEventListener("click", () => selectConversation(button.dataset.id));
  });
}

function renderDetail() {
  const item = state.conversations.find((conversation) => conversation.id === state.selectedId);
  if (!item) {
    detailContainer.innerHTML = '<div class="detail-empty"><span>✳</span><strong>Select a conversation</strong><small>Choose a customer query to see its details.</small></div>';
    return;
  }
  const isResolved = item.status === "resolved";
  const replies = item.replies || (item.reply ? [{ text: item.reply, date: item.date }] : []);
  const hasReply = replies.length > 0;
  const composerText = item.draft || "";
  const confidenceClass = item.confidence === "low" ? "low" : item.confidence === "medium" ? "medium" : "";
  const confidenceLabel = item.confidence === "low" ? "Review suggested" : item.confidence === "medium" ? "Check details" : "High confidence";
  detailContainer.innerHTML = `
    <div class="detail-top">
      <div class="detail-customer">
        <span class="customer-avatar ${escapeHtml(item.avatar)}">${escapeHtml(item.initials)}</span>
        <span class="detail-customer-name"><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.email)} · ${escapeHtml(item.channel)}</span></span>
      </div>
      <div class="detail-actions">
        <button type="button" class="detail-icon-button" data-action="snooze" aria-label="Snooze conversation" title="Snooze">◷</button>
        <button type="button" class="detail-icon-button" data-action="more" aria-label="More actions" title="More actions">•••</button>
      </div>
    </div>
    <div class="detail-scroll">
      <div class="case-heading">
        <div><h2>${escapeHtml(item.subject)}</h2><div class="case-subtitle">#${escapeHtml(item.id.replace("q-", ""))} · ${escapeHtml(item.date)}</div></div>
        <span class="status-pill ${isResolved ? "resolved" : "open"}">${isResolved ? "Resolved" : "Open"}</span>
      </div>
      ${item.priority === "High" || item.priority === "Urgent" ? `<span class="priority-pill ${item.priority === "Urgent" ? "urgent" : "high"}">▲ &nbsp;${escapeHtml(item.priority)} priority</span>` : ""}
      <div class="case-tags"><span class="case-tag">${escapeHtml(item.category || "Unclassified")}</span><span class="case-tag">${escapeHtml(item.intent || "Unclassified")}</span><span class="case-tag queue-tag">→ ${escapeHtml(item.queue || "Customer support")}</span></div>
      <div class="message-divider">Today</div>
      <div class="message-author"><span class="customer-avatar ${escapeHtml(item.avatar)}">${escapeHtml(item.initials)}</span><span>${escapeHtml(item.name)}</span><span>· ${escapeHtml(item.time)} ago</span></div>
      <div class="message-bubble">${escapeHtml(item.message)}</div>
      <div class="customer-message-time">${escapeHtml(item.channel)} · ${escapeHtml(item.date)}</div>
      ${hasReply ? replies.map((reply) => `<div class="reply-message"><div class="message-author"><span>Gaurav Sharma</span><span>· Reply</span></div><div class="reply-bubble">${escapeHtml(reply.text)}</div><span class="reply-demo-label">Demo only · not sent to customer</span><span class="reply-time">${escapeHtml(reply.date || "Recorded locally")}</span></div>`).join("") : ""}
    </div>
    ${isResolved ? `
      <div class="reply-composer">
        <div class="automation-banner"><span class="automation-spark">✓</span><span class="automation-copy"><strong>Conversation resolved</strong><span>This conversation is closed. Reopen it to continue helping ${escapeHtml(item.name.split(" ")[0])}.</span></span></div>
        <div class="composer-actions"><span class="composer-hint">Status changes are saved in this browser.</span><button class="resolve-button" type="button" data-action="reopen">Reopen conversation</button></div>
      </div>
    ` : `
      <div class="reply-composer">
        <div class="automation-banner">
          <span class="automation-spark">✳</span>
          <span class="automation-copy"><strong>Suggested response <span class="draft-label">RULE-BASED</span></strong><span><b>${escapeHtml(item.intent || "customer query")}</b> · Route to ${escapeHtml(item.queue || "Customer support")}.${item.reviewReason ? ` ${escapeHtml(item.reviewReason)}` : " Check the details before replying."}</span></span>
          <span class="confidence ${confidenceClass}">${confidenceLabel}</span>
        </div>
        <div class="composer-label-row"><span class="composer-label"><span class="spark">✳</span> Reply draft</span><span class="draft-label">EDIT BEFORE RECORDING</span></div>
        <textarea class="reply-textarea" id="reply-textarea" placeholder="Write a reply or generate a suggested response..." aria-label="Reply to customer">${escapeHtml(composerText)}</textarea>
        <div class="composer-actions">
          <div class="composer-tools"><button type="button" data-action="regenerate" aria-label="Regenerate suggestion" title="Regenerate suggestion">✳</button><button type="button" data-action="insert-greeting" aria-label="Insert greeting" title="Insert greeting">Aa</button><span class="composer-hint">Local demo only — never sent to Freshdesk.</span></div>
          <div class="reply-buttons"><button class="resolve-button" type="button" data-action="resolve">Resolve</button><button class="send-button" type="button" data-action="send" ${composerText.trim() ? "" : "disabled"}>Record reply ↗</button></div>
        </div>
      </div>
    `}
  `;
  const textarea = detailContainer.querySelector("#reply-textarea");
  if (textarea) {
    textarea.addEventListener("input", () => {
      item.draft = textarea.value;
      const sendButton = detailContainer.querySelector('[data-action="send"]');
      sendButton.disabled = !textarea.value.trim();
      saveConversations();
    });
  }
  detailContainer.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => handleAction(button.dataset.action, item));
  });
}

function createDraft(item) {
  Object.assign(item, classifyTicket(item));
  item.unread = false;
  saveConversations();
  renderList();
  renderDetail();
  showToast(item.confidence === "low" ? "Draft created — review required." : "Suggested reply ready to review.");
}

function selectConversation(id) {
  state.selectedId = id;
  const selected = state.conversations.find((item) => item.id === id);
  if (selected) selected.unread = false;
  saveConversations();
  renderList();
  renderDetail();
}

function handleAction(action, item) {
  if (action === "regenerate") {
    createDraft(item);
    return;
  }
  if (action === "send") {
    const text = detailContainer.querySelector("#reply-textarea").value.trim();
    if (!text) {
      showToast("Write a reply before sending.");
      return;
    }
    item.replies = item.replies || [];
    item.replies.push({ text, date: "Recorded just now" });
    item.reply = text;
    item.draft = "";
    item.unread = false;
    saveConversations();
    renderList();
    renderDetail();
    showToast("Reply recorded locally — not sent to a customer.");
    return;
  }
  if (action === "resolve") {
    item.status = "resolved";
    item.draft = "";
    saveConversations();
    renderList();
    renderDetail();
    showToast("Conversation marked as resolved.");
    return;
  }
  if (action === "reopen") {
    item.status = "open";
    saveConversations();
    renderList();
    renderDetail();
    showToast("Conversation reopened.");
    return;
  }
  if (action === "snooze") {
    showToast("Snoozing is a visual demo action.");
    return;
  }
  if (action === "more") {
    showToast("More conversation actions are coming soon.");
    return;
  }
  if (action === "insert-greeting") {
    const textarea = detailContainer.querySelector("#reply-textarea");
    const greeting = `Hi ${item.name.split(" ")[0]}, `;
    if (textarea && !textarea.value.startsWith(greeting)) {
      textarea.value = `${greeting}${textarea.value}`;
      textarea.dispatchEvent(new Event("input"));
      textarea.focus();
    }
  }
}

function setFilter(filter) {
  state.filter = filter;
  document.querySelectorAll("[data-filter]").forEach((button) => {
    const selected = button.dataset.filter === filter;
    if (button.classList.contains("tab")) {
      button.classList.toggle("active", selected);
      button.setAttribute("aria-selected", String(selected));
    } else {
      button.classList.toggle("selected", selected);
    }
  });
  const filteredSelection = visibleConversations().some((item) => item.id === state.selectedId);
  if (!filteredSelection) state.selectedId = visibleConversations()[0]?.id || null;
  renderList();
  renderDetail();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => setFilter(button.dataset.filter));
});

document.querySelector("#search-input").addEventListener("input", (event) => {
  state.query = event.target.value;
  const items = visibleConversations();
  if (!items.some((item) => item.id === state.selectedId)) state.selectedId = items[0]?.id || null;
  renderList();
  renderDetail();
});

document.querySelector("#new-query-button").addEventListener("click", () => {
  ticketDialog.showModal();
  ticketDialog.querySelector('[name="name"]').focus();
});

function closeTicketDialog() {
  ticketDialog.close();
  document.querySelector("#ticket-form").reset();
}

document.querySelector("#close-ticket-dialog").addEventListener("click", closeTicketDialog);
document.querySelector("#cancel-ticket").addEventListener("click", closeTicketDialog);

document.querySelector("#ticket-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const name = String(formData.get("name")).trim();
  const email = String(formData.get("email")).trim();
  const subject = String(formData.get("subject")).trim();
  const message = String(formData.get("message")).trim();
  if (!name || !email || !subject || !message) return;

  const nextId = Math.max(1040, ...state.conversations.map((item) => Number(item.id.replace(/^q-/, "")) || 0)) + 1;
  const initials = name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
  const ticket = {
    id: `q-${nextId}`,
    name,
    initials,
    avatar: ["av-blue", "av-green", "av-orange", "av-pink"][nextId % 4],
    email,
    subject,
    category: "New ticket",
    channel: "Web form",
    time: "now",
    date: new Date().toLocaleString(),
    priority: "Normal",
    status: "open",
    unread: true,
    message,
    draft: "",
    reply: "",
    replies: [],
  };
  Object.assign(ticket, classifyTicket(ticket));
  state.conversations.unshift(ticket);
  state.query = "";
  document.querySelector("#search-input").value = "";
  closeTicketDialog();
  setFilter("all");
  selectConversation(ticket.id);
  showToast(`Ticket classified as ${ticket.intent}. Suggested reply is ready to review.`);
});

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    document.querySelector("#search-input").focus();
  }
  if (event.key === "Escape" && document.activeElement === document.querySelector("#search-input")) {
    document.querySelector("#search-input").value = "";
    state.query = "";
    renderList();
    renderDetail();
  }
});

state.selectedId = visibleConversations()[0]?.id || null;
document.querySelector("#today-label").textContent = new Intl.DateTimeFormat(undefined, {
  weekday: "long", month: "long", day: "numeric",
}).format(new Date());
renderList();
renderDetail();
