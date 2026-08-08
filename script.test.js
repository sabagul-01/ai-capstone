const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf8');

describe('Settings form behavior', () => {
  let script;

  beforeEach(() => {
    document.body.innerHTML = html;
    localStorage.clear();
    jest.resetModules();
    script = require('./script.js');
    script.initForm();
  });

  test('validateEmail returns false for invalid email and true for valid email', () => {
    expect(script.validateEmail('abc')).toBe(false);
    expect(script.validateEmail('saba@example.com')).toBe(true);
  });

  test('loadUserSettings returns null for missing or invalid localStorage data', () => {
    expect(script.loadUserSettings()).toBeNull();
    localStorage.setItem('userSettings', 'not-json');
    expect(script.loadUserSettings()).toBeNull();
    localStorage.setItem('userSettings', JSON.stringify({ name: 123 }));
    expect(script.loadUserSettings()).toBeNull();
  });

  test('saveUserSettings stores valid settings under userSettings', () => {
    const values = { name: 'Saba', email: 'saba@example.com', theme: 'light' };
    script.saveUserSettings(values);
    const stored = JSON.parse(localStorage.getItem('userSettings'));
    expect(stored).toEqual(values);
  });

  test('submitting invalid form shows errors and does not save', () => {
    document.getElementById('name').value = '';
    document.getElementById('email').value = 'abc';
    document.getElementById('theme-light').checked = false;
    document.getElementById('theme-dark').checked = false;

    document.getElementById('settingsForm').dispatchEvent(new window.Event('submit', { cancelable: true, bubbles: true }));

    expect(document.getElementById('nameError').textContent).toBe('Name is required.');
    expect(document.getElementById('emailError').textContent).toBe('Enter a valid email address.');
    expect(document.getElementById('themeError').textContent).toBe('Please choose a theme preference.');
    expect(localStorage.getItem('userSettings')).toBeNull();
    expect(document.getElementById('status').textContent).toContain('Please fix the errors');
  });

  test('submitting valid form saves settings and keeps values', () => {
    document.getElementById('name').value = 'Saba';
    document.getElementById('email').value = 'saba@example.com';
    document.getElementById('theme-light').checked = true;

    document.getElementById('settingsForm').dispatchEvent(new window.Event('submit', { cancelable: true, bubbles: true }));

    expect(localStorage.getItem('userSettings')).not.toBeNull();
    const stored = JSON.parse(localStorage.getItem('userSettings'));
    expect(stored).toEqual({ name: 'Saba', email: 'saba@example.com', theme: 'light' });
    expect(document.getElementById('name').value).toBe('Saba');
    expect(document.getElementById('email').value).toBe('saba@example.com');
    expect(document.getElementById('theme-light').checked).toBe(true);
    expect(document.getElementById('status').textContent).toBe('Settings saved successfully.');
  });

  test('initForm reloads saved settings from localStorage', () => {
    const values = { name: 'Saba', email: 'saba@example.com', theme: 'dark' };
    localStorage.setItem('userSettings', JSON.stringify(values));

    jest.resetModules();
    document.body.innerHTML = html;
    script = require('./script.js');
    script.initForm();

    expect(document.getElementById('name').value).toBe('Saba');
    expect(document.getElementById('email').value).toBe('saba@example.com');
    expect(document.getElementById('theme-dark').checked).toBe(true);
  });
});
