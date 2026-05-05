import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

const STYLE_CONFIGURATION = {
  metadata: {
    brandName: 'tennis-australia',
    version: '1.0.0',
    language: 'en-US',
    namespace: 'brand-concierge',
  },
  behavior: {
    multimodalCarousel: { cardClickAction: 'openLink' },
    input: {
      enableVoiceInput: false,
      continuousVoiceMode: false,
      disableMultiline: true,
      showAiChatIcon: { icon: 'test' },
    },
    chat: { messageAlignment: 'normal', messageWidth: '100%' },
    productCard: { actionButtonSize: 'S' },
  },
  disclaimer: {
    text: 'AI responses may be inaccurate. Always verify details on ausopen.com. {Terms}',
    links: [{ text: 'Terms', url: 'https://ausopen.com/terms-conditions' }],
  },
  text: {
    'welcome.heading': 'Welcome to AO 2027',
    'welcome.subheading': 'Your personal guide to the Australian Open. Ask me about the Finals, tickets, premium experiences, and partner offers.',
    'input.placeholder': 'Ask about AO 2027...',
    'input.messageInput.aria': 'Message input',
    'input.send.aria': 'Send message',
    'input.aiChatIcon.tooltip': 'Ask AI',
    'input.mic.aria': 'Voice input',
    'card.aria.select': 'Select example message',
    'carousel.prev.aria': 'Previous cards',
    'carousel.next.aria': 'Next cards',
    'scroll.bottom.aria': 'Scroll to bottom',
    'error.network': "I'm having trouble connecting right now. Please try again or visit ausopen.com for the latest information.",
    'loading.message': 'Searching our AO knowledge base...',
    'feedback.dialog.title.positive': 'Your feedback is appreciated',
    'feedback.dialog.title.negative': 'Your feedback is appreciated',
    'feedback.dialog.question.positive': 'What went well? Select all that apply.',
    'feedback.dialog.question.negative': 'What went wrong? Select all that apply.',
    'feedback.dialog.notes': 'Notes',
    'feedback.dialog.submit': 'Submit',
    'feedback.dialog.cancel': 'Cancel',
    'feedback.dialog.notes.placeholder': 'Additional notes (optional)',
    'feedback.toast.success': 'Thank you for the feedback.',
    'feedback.thumbsUp.aria': 'Thumbs up',
    'feedback.thumbsDown.aria': 'Thumbs down',
  },
  arrays: {
    'welcome.examples': [
      {
        text: 'When is the Australian Open 2027?',
        image: 'https://ausopen.com/sites/default/files/202602/20/taa003-05-club-1905-050-michaelpham-webres.jpg',
        backgroundColor: '#EEF6FF',
      },
      {
        text: 'What premium in-venue experiences are available?',
        image: 'https://ausopen.com/sites/default/files/202602/25/taa004-03-terrace-011-michaelpham-webres.jpg',
        backgroundColor: '#EEF6FF',
      },
      {
        text: 'Tell me about Finals tickets and packages',
        image: 'https://ausopen.com/sites/default/files/202602/20/taa003-02-suites-029-michaelpham-webres.jpg',
        backgroundColor: '#EEF6FF',
      },
    ],
    'feedback.positive.options': [
      'Helpful tournament information',
      'Clear and easy to understand',
      'Great experience recommendations',
      'Useful ticket and pricing info',
      'Other',
    ],
    'feedback.negative.options': [
      'Not relevant to my question',
      'Confusing or unclear',
      'Missing information I needed',
      'Inaccurate details',
      'Other',
    ],
  },
  assets: { icons: { company: '' } },
  visualProfile: {
    sendIconIconColor: '#FFFFFF',
    sendIconBackgroundColor: '#0c1b33',
  },
  theme: {
    '--welcome-input-order': '3',
    '--welcome-cards-order': '2',
    '--chat-history-padding-top-expanded': '32px',
    '--message-concierge-border-width': '0px',
    '--welcome-heading-size-desktop': '28px',
    '--welcome-heading-size-mobile': '22px',
    '--welcome-heading-weight': '700',
    '--welcome-heading-text-align': 'center',
    '--welcome-subheading-size-desktop': '16px',
    '--welcome-subheading-size-mobile': '14px',
    '--welcome-subheading-text-align': 'center',
    '--welcome-padding': '24px',
    '--prompt-suggestion-background': '#FFFFFF',
    '--prompt-suggestion-background-hover': '#EEF6FF',
    '--prompt-suggestion-text-color': '#0c1b33',
    '--prompt-suggestion-border-color': '#99ccf0',
    '--prompt-suggestion-button-border-radius': '12px',
    '--prompt-suggestion-button-gap': '10px',
    '--prompt-suggestion-button-padding': '10px 16px',
    '--prompt-suggestions-container-gap': '10px',
    '--prompt-suggestions-flex-direction': 'row',
    '--prompt-suggestions-flex-wrap': 'wrap',
    '--prompt-suggestions-align-items': 'stretch',
    '--prompt-suggestions-button-width': 'auto',
    '--font-family': "'Poppins', arial, sans-serif",
    '--color-primary': '#006db6',
    '--color-text': '#0c1b33',
    '--line-height-body': '1.75',
    '--main-container-background': 'linear-gradient(135deg, #EEF6FF 0%, #CDEAFF 30%, #F0F6FF 60%, #EBF4FB 100%)',
    '--input-height': '52px',
    '--input-height-mobile': '52px',
    '--input-border-radius': '12px',
    '--input-border-radius-mobile': '12px',
    '--input-background': '#FFFFFF',
    '--input-outline-color': '#006db6',
    '--input-outline-width': '2px',
    '--input-box-shadow': '0 4px 16px 0 rgba(12, 27, 51, 0.08)',
    '--input-focus-outline-width': '2px',
    '--input-focus-outline-color': '#0c1b33',
    '--input-font-size': '16px',
    '--input-font-weight': '400',
    '--input-text-color': '#0c1b33',
    '--input-button-height': '32px',
    '--input-button-width': '32px',
    '--submit-button-fill-color': '#FFFFFF',
    '--submit-button-fill-color-disabled': '#C6C6C6',
    '--color-button-submit': '#0c1b33',
    '--color-button-submit-hover': '#0c1b33',
    '--input-button-border-radius': '8px',
    '--button-disabled-background': '#FFFFFF',
    '--disclaimer-color': '#5a6a7e',
    '--disclaimer-font-size': '12px',
    '--disclaimer-font-weight': '400',
    '--message-user-background': '#CDEAFF',
    '--message-user-text': '#0c1b33',
    '--message-border-radius': '10px',
    '--message-padding': '8px 16px',
    '--message-concierge-background': '#FFFFFF',
    '--message-concierge-text': '#0c1b33',
    '--message-max-width': '100%',
    '--chat-interface-max-width': '768px',
    '--message-blocker-height': '105px',
    '--citations-text-font-weight': '700',
    '--citations-desktop-button-font-size': '14px',
    '--feedback-icon-btn-background': '#FFFFFF',
    '--feedback-icon-btn-hover-background': '#EEF6FF',
    '--feedback-icon-btn-size-desktop': '32px',
    '--feedback-container-gap': '4px',
    '--multimodal-card-box-shadow': '0 4px 16px rgba(12, 27, 51, 0.12)',
    '--border-radius-card': '16px',
    '--card-background': '#FFFFFF',
    '--card-padding': '0px',
    '--card-text-padding': '14px 16px',
    '--card-image-height-desktop': '120px',
    '--button-height-s': '30px',
    '--button-primary-background': '#006db6',
    '--button-primary-text': '#FFFFFF',
    '--button-primary-hover': '#005091',
    '--button-secondary-border': '#0c1b33',
    '--button-secondary-text': '#0c1b33',
    '--button-secondary-hover': '#0c1b33',
    '--color-button-secondary-hover-text': '#FFFFFF',
    '--privacy-notice-background': '#FFFFFF',
    '--privacy-notice-padding': '10px 12px',
    '--privacy-notice-text-font-size': '12px',
    '--privacy-notice-title-font-size': '12px',
    '--message-concierge-link-decoration': 'underline',
  },
};

const CHAT_ICON_SVG = `<svg viewBox="0 0 24 24">
  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/>
  <path d="M7 9h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"/>
</svg>`;

function buildBrandConciergeUI() {
  const httpsWarning = document.createElement('div');
  httpsWarning.id = 'https-warning';
  httpsWarning.className = 'https-warning';
  httpsWarning.innerHTML = '<strong>HTTPS Required:</strong> This page must be served over HTTPS for Brand Concierge to work. See console for details.';

  const fabButton = document.createElement('button');
  fabButton.id = 'fab-button';
  fabButton.setAttribute('role', 'button');
  fabButton.setAttribute('aria-label', 'Open AO 2027 Concierge');
  fabButton.innerHTML = `
    <div class="fab-icon">${CHAT_ICON_SVG}</div>
    <div class="fab-text">
      <strong>AO Concierge</strong>
      <span>Your guide to AO 2027</span>
    </div>`;

  const modalBackdrop = document.createElement('div');
  modalBackdrop.id = 'modal-backdrop';

  const chatModal = document.createElement('div');
  chatModal.id = 'chat-modal';
  chatModal.innerHTML = `
    <div class="bc-modal-hdr">
      <div class="bc-modal-hdr__left">
        <div class="bc-modal-hdr__icon">${CHAT_ICON_SVG}</div>
        <span class="bc-modal-hdr__title">AO 2027 Concierge</span>
      </div>
      <div class="bc-modal-hdr__controls">
        <button id="btn-close" class="bc-ctrl-btn bc-ctrl-btn--close" title="Close" aria-label="Close chat">&times;</button>
      </div>
    </div>
    <div class="bc-modal-body">
      <div id="brand-concierge-mount"></div>
    </div>`;

  return {
    httpsWarning, fabButton, modalBackdrop, chatModal,
  };
}

function initBrandConcierge(elements) {
  const {
    fabButton, modalBackdrop, chatModal, httpsWarning,
  } = elements;
  const btnClose = chatModal.querySelector('#btn-close');
  let currentState = 'fab';
  let bcInitialized = false;

  function setState(newState) {
    currentState = newState;
    if (newState === 'fab') {
      fabButton.classList.remove('bc-hidden');
      chatModal.classList.remove('bc-visible');
      modalBackdrop.classList.remove('bc-visible');
    } else {
      fabButton.classList.add('bc-hidden');
      chatModal.classList.add('bc-visible', 'state-chat');
      modalBackdrop.classList.add('bc-visible');
    }
  }

  function bootstrapBC() {
    if (!window.adobe?.concierge?.bootstrap) {
      // eslint-disable-next-line no-console
      console.error('[BC] Brand Concierge Web Client not loaded.');
      return;
    }
    window.adobe.concierge.bootstrap({
      instanceName: 'alloy',
      stylingConfigurations: STYLE_CONFIGURATION,
      selector: '#brand-concierge-mount',
      stickySession: false,
    });
    bcInitialized = true;
    // eslint-disable-next-line no-console
    console.log('[BC] AO 2027 Concierge bootstrapped');
  }

  function handleClose() {
    setState('fab');
  }

  fabButton.addEventListener('click', () => {
    setState('chat');
    if (!bcInitialized) {
      bootstrapBC();
    } else {
      requestAnimationFrame(() => window.dispatchEvent(new Event('resize')));
    }
  });

  btnClose.addEventListener('click', handleClose);
  modalBackdrop.addEventListener('click', handleClose);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && currentState !== 'fab') handleClose();
  });

  if (window.location.protocol !== 'https:') {
    httpsWarning.style.display = 'block';
  }

  setState('fab');
  // eslint-disable-next-line no-console
  console.log('[BC] AO 2027 Concierge initialized');
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);
  block.append(footer);

  // inject Brand Concierge UI into the document root so it overlays everything
  const bcElements = buildBrandConciergeUI();
  const root = document.documentElement;
  root.append(
    bcElements.httpsWarning,
    bcElements.fabButton,
    bcElements.modalBackdrop,
    bcElements.chatModal,
  );

  initBrandConcierge(bcElements);
}
