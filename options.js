const getInputElement = () => document.getElementById('api-key');

const saveOptions = () => {
  const omdbApiKey = getInputElement().value;
  chrome.storage.sync.set({
    omdbApiKey
  }, () => {
    const status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(() => {
      status.textContent = '';
    }, 750);
  });
}

const restoreOptions = () => {
  chrome.storage.sync.get({
    omdbApiKey: ''
  }, (items) => {
    getInputElement().value = items.omdbApiKey;
  });
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
