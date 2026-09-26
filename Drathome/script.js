const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const serviceSearch = document.querySelector('#service-search');
const serviceCards = [...document.querySelectorAll('.service-card')];

serviceSearch.addEventListener('input', (event) => {
  const query = event.target.value.trim().toLowerCase();
  serviceCards.forEach((card) => {
    card.hidden = query.length > 0 && !card.innerText.toLowerCase().includes(query);
  });
});

document.querySelectorAll('[data-service]').forEach((link) => {
  link.addEventListener('click', () => {
    const serviceSelect = document.querySelector('select[name="service"]');
    serviceSelect.value = link.dataset.service;
  });
});

const appointmentForm = document.querySelector('#appointment-form');
const successMessage = document.querySelector('.form-success');
appointmentForm.addEventListener('submit', (event) => {
  event.preventDefault();
  successMessage.classList.add('show');
  appointmentForm.reset();
  successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

const chatLauncher = document.querySelector('#chat-launcher');
const chatPanel = document.querySelector('#chat-panel');
const chatClose = document.querySelector('.chat-close');
const chatForm = document.querySelector('#chat-form');
const chatInput = document.querySelector('#chat-input');
const chatMessages = document.querySelector('#chat-messages');

const addChatMessage = (message, type) => {
  const messageElement = document.createElement('div');
  messageElement.className = `chat-message ${type}`;
  messageElement.textContent = message;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
};

const assistantReply = (message) => {
  const lowerMessage = message.toLowerCase();
  if (lowerMessage.includes('book') || lowerMessage.includes('appointment')) {
    return 'Absolutely. Please use our appointment form, or continue on WhatsApp and our coordinator will help you choose a time.';
  }
  if (lowerMessage.includes('service')) {
    return 'We provide physician visits, nursing, physiotherapy, wound care, child treatment, IV drips, blood testing, and more at home.';
  }
  if (lowerMessage.includes('area') || lowerMessage.includes('cover')) {
    return 'We serve DHA, Clifton, Tariq Road, PECHS, Gulshan, North Nazimabad, and nearby Karachi areas.';
  }
  return 'Thanks for reaching out. Our care coordinator can help with that. Please continue on WhatsApp for a quick human reply.';
};

const openChat = () => {
  chatPanel.classList.add('open');
  chatPanel.setAttribute('aria-hidden', 'false');
  chatLauncher.setAttribute('aria-expanded', 'true');
  chatInput.focus();
};

const closeChat = () => {
  chatPanel.classList.remove('open');
  chatPanel.setAttribute('aria-hidden', 'true');
  chatLauncher.setAttribute('aria-expanded', 'false');
};

chatLauncher.addEventListener('click', () => (chatPanel.classList.contains('open') ? closeChat() : openChat()));
chatClose.addEventListener('click', closeChat);

const submitChatMessage = (message) => {
  const cleanMessage = message.trim();
  if (!cleanMessage) return;
  addChatMessage(cleanMessage, 'user');
  chatInput.value = '';
  window.setTimeout(() => addChatMessage(assistantReply(cleanMessage), 'bot'), 350);
};

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  submitChatMessage(chatInput.value);
});

document.querySelectorAll('[data-chat]').forEach((button) => {
  button.addEventListener('click', () => submitChatMessage(button.dataset.chat));
});
