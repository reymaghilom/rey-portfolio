document.getElementById('year').textContent = new Date().getFullYear();
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const closeModal = () => { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); };
document.querySelectorAll('[data-project]').forEach(card => card.addEventListener('click', () => {
  modalTitle.textContent = card.dataset.project;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  modal.querySelector('.modal-close').focus();
}));
modal.querySelector('.modal-close').addEventListener('click', closeModal);
modal.querySelector('.modal-action').addEventListener('click', closeModal);
modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && modal.classList.contains('open')) closeModal(); });
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => backToTop.classList.toggle('show', window.scrollY > 500));
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
contactForm.addEventListener('submit', async event => {
  event.preventDefault();
  const submitButton = contactForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = 'SENDING...';
  formStatus.textContent = 'Sending your message...';
  try {
    const response = await fetch(contactForm.action, { method: 'POST', body: new FormData(contactForm), headers: { Accept: 'application/json' } });
    const result = await response.json();
    if (!response.ok || !result.success) throw new Error(result.message || 'Unable to send message.');
    contactForm.reset();
    formStatus.textContent = 'Thank you! Your message was sent successfully.';
  } catch (error) {
    formStatus.textContent = 'Sorry, the message could not be sent. Please try again later.';
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'SEND MESSAGE ↗';
  }
});
