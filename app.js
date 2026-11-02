const seedConversations = [
  {
    id: "q-1048", name: "Priya Menon", initials: "PM", avatar: "av-pink", email: "priya.menon@email.com",
    subject: "Charged for subscription but still seeing ads", category: "Billing · Subscription", channel: "Email",
    time: "2m", date: "Today, 10:42 AM", priority: "High", status: "open", unread: true,
    message: "Hi, I renewed my Pocket FM subscription this morning and the payment went through, but I'm still getting ads and locked episodes. Could you please check? The transaction ID is PF-782391.",
    draft: "", reply: "", confidence: "high", intent: "Subscription access",
  },
  {
    id: "q-1047", name: "Arjun Kapoor", initials: "AK", avatar: "av-orange", email: "arjun.k@email.com",
    subject: "Missing coins after watching an ad", category: "Coins · Rewards", channel: "In-app", time: "18m", date: "Today, 10:26 AM",
    priority: "Normal", status: "open", unread: true,
    message: "I watched the full video ad to earn coins but they never showed up in my wallet. I tried restarting the app too. Can you help?",
    draft: "", reply: "", confidence: "high", intent: "Reward not credited",
  },
  {
    id: "q-1046", name: "Meera Iyer", initials: "MI", avatar: "av-green", email: "meera.iyer@email.com",
    subject: "Episode 42 won't play", category: "Playback · Listening", channel: "In-app", time: "34m", date: "Today, 10:10 AM",
    priority: "Normal", status: "open", unread: true,
    message: "Every time I tap episode 42 of The Royal Secret, it loads for a few seconds and then says something went wrong. Other episodes seem fine.",
    draft: "", reply: "", confidence: "high", intent: "Playback issue",
  },
  {
    id: "q-1045", name: "Rohan Das", initials: "RD", avatar: "av-blue", email: "rohan.das@email.com",
    subject: "How do I change my language?", category: "Account · Preferences", channel: "Email", time: "1h", date: "Today, 9:44 AM",
    priority: "Normal", status: "open", unread: false,
    message: "I'd like to see more Hindi audio stories in my recommendations. Where can I change my language preference?",
    draft: "", reply: "", confidence: "high", intent: "Language preferences",
  },
  {
    id: "q-1044", name: "Ananya Rao", initials: "AR", avatar: "", email: "ananya.r@email.com",
    subject: "Requesting a refund for my plan", category: "Billing · Refunds", channel: "Email", time: "2h", date: "Today, 8:53 AM",
    priority: "High", status: "open", unread: true,
    message: "I was charged for the annual plan by mistake. I meant to select monthly. Could you please refund this? I haven't used the subscription yet.",
    draft: "", reply: "", confidence: "medium", intent: "Refund request",
  },
  {
    id: "q-1043", name: "Kabir Sethi", initials: "KS", avatar: "av-green", email: "kabir.s@email.com",
    subject: "Can't log in on my new phone", category: "Account · Login", channel: "In-app", time: "3h", date: "Today, 7:36 AM",
    priority: "Normal", status: "open", unread: false,
    message: "I got a new phone and can't get into my account. I used Google sign-in before, but it keeps creating a new profile.",
    draft: "", reply: "", confidence: "medium", intent: "Account access",
  },
  {
    id: "q-1042", name: "Sana Khan", initials: "SK", avatar: "av-pink", email: "sana.k@email.com",
    subject: "Thanks for sorting out my downloads", category: "Playback · Downloads", channel: "In-app", time: "Yesterday", date: "Yesterday, 6:20 PM",
    priority: "Normal", status: "resolved", unread: false,
    message: "My downloaded episodes were missing after I updated the app.",
    draft: "", reply: "Hi Sana, thanks for reaching out. Re-downloading the episodes after an app update should make them available offline again. Glad we could help!", confidence: "high", intent: "Downloads",
  },
  {
    id: "q-1041", name: "Dev Patel", initials: "DP", avatar: "av-blue", email: "dev.p@email.com",
    subject: "Where can I find my listening history?", category: "App · Discovery", channel: "Email", time: "Yesterday", date: "Yesterday, 4:18 PM",
    priority: "Normal", status: "resolved", unread: false,
    message: "I started a story last week and forgot the title. Is there a way to see what I was listening to?",
    draft: "", reply: "Hi Dev, you can find your recently played stories in the Home tab under Continue Listening. Your progress is saved automatically.", confidence: "high", intent: "Listening history",
  },
];

const responseRules = [
  {
    match: /subscription|charged|payment|ads|locked episode|premium/i, intent: "Subscription access", confidence: "high",
    response: (name) => `Hi ${name}, thanks for letting us know — I’m sorry your subscription isn’t showing correctly. Please try tapping Restore Purchases in Profile → Settings → Subscription. If your access still hasn’t updated after a few minutes, reply with your app-store receipt and we’ll investigate the payment for you. We’ll get this sorted.`
  },
  {
    match: /coin|reward|watch.*ad/i, intent: "Reward not credited", confidence: "high",
    response: (name) => `Hi ${name}, sorry those coins didn’t appear after you watched the ad. Rewards can take a few minutes to sync. Please refresh your wallet once; if the coins are still missing, send us the approximate time you watched the ad and we’ll check the reward log.`
  },
  {
    match: /playback|play|episode|load|buffer|audio|listen/i, intent: "Playback issue", confidence: "high",
    response: (name) => `Hi ${name}, sorry you’re having trouble listening. Please check that you’re on the latest app version, then close and reopen the app and try that episode again. If it still doesn’t play, let us know your device model and app version so we can investigate.`
  },
  {
    match: /language|hindi|recommendation|preference/i, intent: "Language preferences", confidence: "high",
    response: (name) => `Hi ${name}, you can update your language preferences in Profile → Settings → Content Languages. Choose Hindi and save your changes; your recommendations will adjust as you listen to more stories in that language.`
  },
  {
    match: /refund|refunded|annual plan|monthly/i, intent: "Refund request", confidence: "medium",
    response: (name) => `Hi ${name}, I understand the plan selection wasn’t what you intended. Refund eligibility depends on where the subscription was purchased. Please share your order or transaction ID and confirm whether you subscribed through the App Store, Google Play, or our website. Our billing team will review it — I can’t promise a refund before checking the purchase details.`
  },
  {
    match: /log.?in|login|account|google sign/i, intent: "Account access", confidence: "medium",
    response: (name) => `Hi ${name}, sorry you’re having trouble accessing your account. On the sign-in screen, choose Continue with Google and use the same Google account you used on your old phone. Please don’t create a new account. If it still opens a different profile, reply with the email linked to your original account and we’ll help.`
  },
  {
    match: /download|offline/i, intent: "Downloads", confidence: "high",
    response: (name) => `Hi ${name}, sorry your downloads disappeared. App updates can sometimes remove locally stored episodes. Please open your Library and download the episodes again while connected to Wi-Fi. Your listening progress will remain saved.`
  },
];

const state = {
  conversations: loadConversations(),
  filter: "all",
  query: "",
  selectedId: null,
};

const itemContainer = document.querySelector("#conversation-items");
const detailContainer = document.querySelector("#conversation-detail");
const toast = document.querySelector("#toast");
let toastTimer;

function loadConversations() {
  try {
    const stored = localStorage.getItem("queryflow-conversations");
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
    localStorage.setItem("queryflow-conversations", JSON.stringify(state.conversations));
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
        <span class="item-title-row"><span class="item-name">${escapeHtml(item.name)}</span>${item.priority === "High" ? '<span class="priority-mark" title="High priority">▲</span>' : ""}</span>
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
  const hasReply = Boolean(item.reply);
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
      ${item.priority === "High" ? '<span class="priority-pill high">▲ &nbsp;High priority</span>' : ""}
      <div class="case-tags"><span class="case-tag">${escapeHtml(item.category)}</span><span class="case-tag">${escapeHtml(item.intent || "Unclassified")}</span></div>
      <div class="message-divider">Today</div>
      <div class="message-author"><span class="customer-avatar ${escapeHtml(item.avatar)}">${escapeHtml(item.initials)}</span><span>${escapeHtml(item.name)}</span><span>· ${escapeHtml(item.time)} ago</span></div>
      <div class="message-bubble">${escapeHtml(item.message)}</div>
      <div class="customer-message-time">${escapeHtml(item.channel)} · ${escapeHtml(item.date)}</div>
      ${hasReply ? `<div class="reply-message"><div class="message-author"><span>Gaurav Sharma</span><span>· ${escapeHtml(item.status === "resolved" ? "Replied" : "Draft sent")}</span></div><div class="reply-bubble">${escapeHtml(item.reply)}</div><span class="reply-time">${escapeHtml(item.status === "resolved" ? "Sent just now" : "Sent")}</span></div>` : ""}
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
          <span class="automation-copy"><strong>AI reply suggestion <span class="draft-label">DEMO</span></strong><span>Rule-based demo suggestion for <b>${escapeHtml(item.intent || "customer query")}</b>. Review before sending.</span></span>
          <span class="confidence ${confidenceClass}">${confidenceLabel}</span>
        </div>
        <div class="composer-label-row"><span class="composer-label"><span class="spark">✳</span> Reply</span><span class="draft-label">EDIT BEFORE SENDING</span></div>
        <textarea class="reply-textarea" id="reply-textarea" placeholder="Write a reply or generate a suggested response..." aria-label="Reply to customer">${escapeHtml(composerText)}</textarea>
        <div class="composer-actions">
          <div class="composer-tools"><button type="button" data-action="regenerate" aria-label="Generate reply" title="Generate reply">✳</button><button type="button" data-action="insert-greeting" aria-label="Insert greeting" title="Insert greeting">Aa</button><span class="composer-hint">Suggestions are demo-only; verify account details.</span></div>
          <div class="reply-buttons"><button class="resolve-button" type="button" data-action="resolve">Resolve</button><button class="send-button" type="button" data-action="send" ${composerText.trim() ? "" : "disabled"}>Send reply ↗</button></div>
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
  const rule = responseRules.find((candidate) => candidate.match.test(`${item.subject} ${item.message}`));
  if (!rule) {
    item.intent = "Needs review";
    item.confidence = "low";
    item.draft = `Hi ${item.name.split(" ")[0]}, thanks for reaching out. I want to make sure we give you the right help. Could you share a little more detail about what happened and any relevant order or account reference? Our support team will take a closer look.`;
  } else {
    item.intent = rule.intent;
    item.confidence = rule.confidence;
    item.draft = rule.response(item.name.split(" ")[0]);
  }
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
    item.reply = text;
    item.draft = "";
    item.status = "resolved";
    item.unread = false;
    saveConversations();
    renderList();
    renderDetail();
    showToast("Reply sent and conversation resolved.");
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
  const nextId = Math.max(1040, ...state.conversations.map((item) => Number(item.id.replace(/^q-/, "")) || 0)) + 1;
  const newItem = {
    id: `q-${nextId}`, name: "Alex Morgan", initials: "AM", avatar: "av-blue",
    email: "alex.morgan@example.com", subject: "Question about my account", category: "Account · General",
    channel: "In-app", time: "now", date: "Today, just now", priority: "Normal", status: "open", unread: true,
    message: "I have a question about my account and could use some help. Can someone get back to me?",
    draft: "", reply: "", confidence: "low", intent: "Needs review",
  };
  state.conversations.unshift(newItem);
  state.query = "";
  document.querySelector("#search-input").value = "";
  setFilter("all");
  selectConversation(newItem.id);
  showToast("Sample query added to your inbox.");
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
renderList();
renderDetail();
