// content.js - Injected into mail.google.com

function injectButton() {
  // A robust place is right next to the email subject. 
  // Gmail's subject line is typically an h2 element with the class 'hP'.
  const subjectEl = document.querySelector('h2.hP');
  if (!subjectEl) return;
  
  const headerContainer = subjectEl.parentElement;
  
  if (headerContainer && !document.getElementById('add-to-outlook-btn')) {
    const btn = document.createElement('button');
    btn.id = 'add-to-outlook-btn';
    btn.className = 'gmail-to-outlook-btn';
    btn.innerText = 'Add to Outlook';
    
    // Some basic inline styling since we are moving it near the subject
    btn.style.marginLeft = '15px';
    btn.style.padding = '5px 10px';
    btn.style.cursor = 'pointer';
    btn.style.backgroundColor = '#0078d4';
    btn.style.color = '#fff';
    btn.style.border = 'none';
    btn.style.borderRadius = '4px';
    btn.style.fontSize = '13px';
    btn.style.verticalAlign = 'middle';
    
    btn.addEventListener('click', handleAddToOutlook);
    
    // Append it next to the subject
    headerContainer.appendChild(btn);
  }
}

function handleAddToOutlook(e) {
  e.preventDefault();
  const btn = e.target;
  btn.innerText = 'Extracting...';
  btn.disabled = true;

  // Extract Email Context
  let subject = "";
  let body = "";

  // Gmail subject is typically within h2 element with class hP
  const subjectEl = document.querySelector('h2.hP');
  if (subjectEl) {
    subject = subjectEl.innerText.trim();
  } else {
    // Fallback: get the <title> tag
    subject = document.title.replace(' - Gmail', '').trim();
  }

  // Gmail email body is usually within an element with class a3s
  const bodyEl = document.querySelector('.a3s.aiL');
  if (bodyEl) {
    // Truncate cleanly to first 3000 chars to avoid massive tokens triggering server timeouts
    body = bodyEl.innerText.trim().substring(0, 3000);
  }

  if (!body) {
    alert("Could not extract email body. Make sure an email is opened.");
    btn.innerText = 'Add to Outlook';
    btn.disabled = false;
    return;
  }

  // Send message to background script for AI processing
  chrome.runtime.sendMessage(
    { type: "PROCESS_EMAIL", payload: { subject, body } },
    (response) => {
      if (response && response.success) {
        btn.innerText = 'Add to Outlook';
        btn.disabled = false;
        showSummaryModal(response.eventData);
      } else {
        alert("Failed to process event: " + (response && response.error ? response.error : 'Unknown error'));
        btn.innerText = 'Add to Outlook';
        btn.disabled = false;
      }
    }
  );
}

// --- UI Modal ---
function showSummaryModal(eventData) {
  // Remove existing modal if any
  const existingModal = document.getElementById('g2o-modal-overlay');
  if (existingModal) existingModal.remove();

  const overlay = document.createElement('div');
  overlay.id = 'g2o-modal-overlay';
  overlay.className = 'g2o-modal-overlay';
  
  const modal = document.createElement('div');
  modal.className = 'g2o-modal-content';
  
  const title = document.createElement('h3');
  title.className = 'g2o-modal-title';
  title.innerText = 'Event Summary';

  const detailsContainer = document.createElement('div');
  detailsContainer.className = 'g2o-details-container';

  const rows = [
    { label: 'Title', value: eventData.title || 'No Title' },
    { label: 'Start', value: new Date(eventData.start).toLocaleString() || 'Unknown' },
    { label: 'End', value: new Date(eventData.end).toLocaleString() || 'Unknown' },
    { label: 'Location', value: eventData.location || 'N/A' },
    { label: 'Description', value: eventData.description || 'N/A' }
  ];

  rows.forEach(row => {
    const rowEl = document.createElement('div');
    rowEl.className = 'g2o-modal-row';
    const labelEl = document.createElement('div');
    labelEl.className = 'g2o-modal-label';
    labelEl.innerText = row.label;
    const valEl = document.createElement('div');
    valEl.className = 'g2o-modal-value';
    valEl.innerText = row.value;
    rowEl.appendChild(labelEl);
    rowEl.appendChild(valEl);
    detailsContainer.appendChild(rowEl);
  });

  const btnContainer = document.createElement('div');
  btnContainer.className = 'g2o-modal-actions';

  const cancelBtn = document.createElement('button');
  cancelBtn.className = 'g2o-btn g2o-btn-cancel';
  cancelBtn.innerText = 'Cancel';
  cancelBtn.onclick = () => overlay.remove();

  const downloadBtn = document.createElement('button');
  downloadBtn.className = 'g2o-btn g2o-btn-download';
  downloadBtn.innerText = 'Download .ics';
  downloadBtn.onclick = () => {
    downloadBtn.innerText = 'Downloading...';
    downloadBtn.disabled = true;
    chrome.runtime.sendMessage({ type: "DOWNLOAD_ICS", payload: eventData }, (response) => {
      if (response && response.success) {
        downloadBtn.innerText = 'Downloaded!';
        setTimeout(() => overlay.remove(), 1000);
      } else {
        alert("Failed to download event: " + (response && response.error ? response.error : 'Unknown error'));
        downloadBtn.innerText = 'Download .ics';
        downloadBtn.disabled = false;
      }
    });
  };

  btnContainer.appendChild(cancelBtn);
  btnContainer.appendChild(downloadBtn);

  modal.appendChild(title);
  modal.appendChild(detailsContainer);
  modal.appendChild(btnContainer);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
  
  // Trigger animation
  setTimeout(() => overlay.classList.add('g2o-visible'), 10);
}

// Observe DOM for changes (since Gmail is an SPA)
const observer = new MutationObserver(() => {
  injectButton();
});

observer.observe(document.body, { childList: true, subtree: true });

// Initial check
injectButton();
