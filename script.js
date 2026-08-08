const form = document.getElementById('settingsForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const themeInput = document.getElementById('theme');
const statusMessage = document.getElementById('statusMessage');
const fieldErrors = {
  name: document.getElementById('nameError'),
  email: document.getElementById('emailError'),
  theme: document.getElementById('themeError'),
};

const validationRules = {
  name: {
    required: true,
    message: 'Please enter your name.',
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Enter a valid email address.',
  },
  theme: {
    required: true,
    message: 'Please choose a theme preference.',
  },
};

function validateField(field) {
  const value = field.value.trim();
  const rules = validationRules[field.name];
  let error = '';

  if (rules.required && !value) {
    error = rules.message;
  } else if (rules.pattern && value && !rules.pattern.test(value)) {
    error = rules.message;
  }

  const errorElement = fieldErrors[field.name];
  errorElement.textContent = error;
  field.classList.toggle('error', Boolean(error));
  return !error;
}

[nameInput, emailInput, themeInput].forEach((input) => {
  input.addEventListener('input', () => validateField(input));
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  statusMessage.textContent = '';
  statusMessage.className = 'status-message';

  const isNameValid = validateField(nameInput);
  const isEmailValid = validateField(emailInput);
  const isThemeValid = validateField(themeInput);

  if (!isNameValid || !isEmailValid || !isThemeValid) {
    statusMessage.textContent = 'Please fix the highlighted fields and try again.';
    statusMessage.classList.add('error');
    return;
  }

  const settings = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    theme: themeInput.value,
    savedAt: new Date().toISOString(),
  };

  localStorage.setItem('aiCapstoneSettings', JSON.stringify(settings));
  statusMessage.textContent = 'Settings saved successfully.';
  statusMessage.classList.add('success');
  form.reset();
});
