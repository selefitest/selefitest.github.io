const botToken = '6151424590:AAFOTNVKfQHwCv-oijgH9yKwSUaE2M1PbOk';
let lastUpdateId = 0;

async function fetchUpdates() {
  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/getUpdates?offset=${lastUpdateId + 1}`);
    const data = await response.json();
    if (data && data.result && data.result.length > 0) {
      const updates = data.result;

      // Process new updates
      for (const update of updates) {
        const message = update.message;
        if (message && message.text) { // Check if message and text properties exist
          const messageText = message.text;
          const sender = message.from;
          const date = message.date;
          console.log(`New message: ${messageText}`);
          const smallBannerElement = document.querySelector('.small-banner');

          // Append new message to the existing content
          smallBannerElement.innerHTML += `<div class="message">${messageText}</div>`;

          // Scroll to the bottom of the div
          smallBannerElement.scrollTop = smallBannerElement.scrollHeight;
        }
      }

      // Update the last processed update ID
      lastUpdateId = updates[updates.length - 1].update_id;
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Continue fetching updates
    fetchUpdates();
  }
}

fetchUpdates();
