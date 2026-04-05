// background.js

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "PROCESS_EMAIL") {
    // 1. Check Gemini API Key
    (async () => {
      try {
        const items = await chrome.storage.local.get(["geminiApiKey"]);
        if (!items.geminiApiKey) {
          sendResponse({ success: false, error: "Please enter your Gemini API Key in the extension options." });
          chrome.runtime.openOptionsPage();
          return;
        }

        const eventData = await extractEventData(request.payload, items.geminiApiKey);
        if (!eventData || !eventData.title) throw new Error("Could not parse event data");
        
        sendResponse({ success: true, eventData: eventData });
      } catch (err) {
        console.error(err);
        sendResponse({ success: false, error: err.message });
      }
    })();

    return true; // Keep message channel open for async response
  } else if (request.type === "DOWNLOAD_ICS") {
    downloadICS(request.payload)
      .then(() => sendResponse({ success: true }))
      .catch((err) => {
         console.error(err);
         sendResponse({ success: false, error: err.message });
      });
    return true;
  }
});

/**
 * Call Gemini API to extract JSON parameters.
 */
async function extractEventData(emailData, apiKey) {
  const prompt = `
You are an expert parsing assistant. Extract meeting details from the following email.
Respond strictly in JSON format with no markdown wrappers or backticks.
Schema requirements:
{
  "title": "String - The event title",
  "start": "String - Start time in YYYY-MM-DDTHH:mm:ssZ format (UTC) or YYYYMMDDTHHmmssZ",
  "end": "String - End time in YYYY-MM-DDTHH:mm:ssZ format (UTC) or YYYYMMDDTHHmmssZ",
  "location": "String - physical location or meeting link",
  "description": "String - a short 1-2 sentence description"
}
If start or end time is inexact, guess a reasonable length (e.g. 1 hour).
Assume the current year if unspecified.

Email Subject: ${emailData.subject}
Email Body: ${emailData.body}
  `.trim();

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    signal: controller.signal,
    body: JSON.stringify({
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        temperature: 0.2
      }
    })
  });

  clearTimeout(timeoutId);

  if (!response.ok) {
    throw new Error("HTTP error " + response.status);
  }

  const result = await response.json();
  let jsonString = result.candidates[0].content.parts[0].text;
  
  // Clean JSON string mostly in case Gemini wrapped it with ```json
  jsonString = jsonString.replace(/^```json/g, "").replace(/```$/g, "").trim();
  
  return JSON.parse(jsonString);
}


/**
 * Converts Javascript Date String to ICS Date String (YYYYMMDDTHHmmssZ)
 */
function toICSDate(dateStr) {
  // Try parsing the date with Date object to normalize
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  
  // Convert to YYYYMMDDTHHmmssZ
  return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

/**
 * Generate and download .ics file
 */
async function downloadICS(eventData) {
  // Ensure we have properly formatted dates
  const dtStart = toICSDate(eventData.start) || toICSDate(new Date().toISOString());
  const dtEnd = toICSDate(eventData.end) || toICSDate(new Date(Date.now() + 3600000).toISOString()); // Default 1 hour

  // Build ICS String
  const icsString = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Gmail to Outlook AI Extension//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'UID:' + Math.random().toString(36).substring(2) + '@gmailtooutlook.extension',
    'DTSTAMP:' + toICSDate(new Date().toISOString()),
    'DTSTART:' + dtStart,
    'DTEND:' + dtEnd,
    'SUMMARY:' + (eventData.title || "New Meeting"),
    'LOCATION:' + (eventData.location || ""),
    'DESCRIPTION:' + (eventData.description || "").replace(/\n/g, '\\n'),
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

    const base64String = btoa(unescape(encodeURIComponent(icsString)));
    const dataUrl = `data:text/calendar;charset=utf-8;base64,${base64String}`;
    
    return new Promise((resolve) => {
      chrome.downloads.download({
        url: dataUrl,
        filename: "event.ics",
        saveAs: false
      }, (downloadId) => {
        resolve(downloadId);
      });
    });
}
