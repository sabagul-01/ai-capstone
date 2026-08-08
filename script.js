const STORAGE_KEY = 'userSettings';

function validateEmail(value) {
  const email = String(value).trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function collectFormData() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const themeInput = document.querySelector('input[name="theme"]:checked');
  const theme = themeInput ? themeInput.value : '';
  return { name, email, theme };
}

function clearErrors() {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const themeLightLabel = document.getElementById('theme-light').closest('.radio-option');
  const themeDarkLabel = document.getElementById('theme-dark').closest('.radio-option');

  nameInput.classList.remove('error', 'error-highlight');
  emailInput.classList.remove('error', 'error-highlight');
  themeLightLabel.classList.remove('error', 'error-highlight');
  themeDarkLabel.classList.remove('error', 'error-highlight');

  document.getElementById('nameError').textContent = '';
  document.getElementById('emailError').textContent = '';
  document.getElementById('themeError').textContent = '';
}

function setStatusMessage(message, type = 'info') {
  const status = document.getElementById('status');
  status.textContent = message;
  status.className = 'status';
  if (type === 'error') {
    status.classList.add('error');
  } else if (type === 'success') {
    status.classList.add('success');
  }
}

function showFieldError(field, message) {
  const errorElement = document.getElementById(`${field}Error`);
  if (!errorElement) return;
  errorElement.textContent = message;

  if (field === 'theme') {
    const themeLightLabel = document.getElementById('theme-light').closest('.radio-option');
    const themeDarkLabel = document.getElementById('theme-dark').closest('.radio-option');
    themeLightLabel.classList.add('error', 'error-highlight');
    themeDarkLabel.classList.add('error', 'error-highlight');
  } else {
    const input = document.getElementById(field);
    input.classList.add('error', 'error-highlight');
  }
}

function validateForm(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = 'Name is required.';
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!validateEmail(values.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!values.theme) {
    errors.theme = 'Please choose a theme preference.';
  } else if (!['light', 'dark'].includes(values.theme)) {
    errors.theme = 'Selected theme is not valid.';
  }

  return errors;
}

function loadUserSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      typeof parsed.name !== 'string' ||
      typeof parsed.email !== 'string' ||
      typeof parsed.theme !== 'string'
    ) {
      return null;
    }
    return parsed;
  } catch (error) {
    return null;
  }
}

function saveUserSettings(values) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
}

function populateForm(values) {
  document.getElementById('name').value = values.name;
  document.getElementById('email').value = values.email;
  const radio = document.querySelector(`input[name="theme"][value="${values.theme}"]`);
  if (radio) {
    radio.checked = true;
  }
}

function validateField(input) {
  const fieldName = input.name;
  const values = collectFormData();
  const errors = validateForm(values);
  if (errors[fieldName]) {
    showFieldError(fieldName, errors[fieldName]);
    return false;
  }

  if (fieldName === 'theme') {
    const themeLightLabel = document.getElementById('theme-light').closest('.radio-option');
    const themeDarkLabel = document.getElementById('theme-dark').closest('.radio-option');
    themeLightLabel.classList.remove('error', 'error-highlight');
    themeDarkLabel.classList.remove('error', 'error-highlight');
    document.getElementById('themeError').textContent = '';
  } else {
    input.classList.remove('error', 'error-highlight');
    document.getElementById(`${fieldName}Error`).textContent = '';
  }

  return true;
}

function handleSubmit(event) {
  event.preventDefault();
  clearErrors();
  setStatusMessage('');

  const values = collectFormData();
  const errors = validateForm(values);

  if (Object.keys(errors).length > 0) {
    Object.entries(errors).forEach(([field, message]) => showFieldError(field, message));
    setStatusMessage('Please fix the errors and try again.', 'error');
    return;
  }

  saveUserSettings(values);
  setStatusMessage('Settings saved successfully.', 'success');
}

function attachInputListeners() {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const themeRadios = document.querySelectorAll('input[name="theme"]');

  if (nameInput) {
    nameInput.addEventListener('input', () => validateField(nameInput));
  }

  if (emailInput) {
    emailInput.addEventListener('input', () => validateField(emailInput));
  }

  themeRadios.forEach((radio) => {
    radio.addEventListener('change', () => validateField(radio));
  });
}

function initForm() {
  const form = document.getElementById('settingsForm');
  if (!form) {
    return;
  }

  const savedValues = loadUserSettings();
  if (savedValues) {
    populateForm(savedValues);
  }

  form.addEventListener('submit', handleSubmit);
  attachInputListeners();
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initForm);
  } else {
    initForm();
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    validateEmail,
    collectFormData,
    validateForm,
    loadUserSettings,
    saveUserSettings,
    populateForm,
    clearErrors,
    setStatusMessage,
    initForm,
  };
}
