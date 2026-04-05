# Gmail to Outlook AI Extension

[👉 Traditional Chinese Version Below / 中文版在下方](#-中文---traditional-chinese)

This browser extension seamlessly integrates Google's Gemini AI, allowing you to automatically extract meeting, event, or schedule details from an email with a single click in Gmail. It then outputs a perfectly formatted `.ics` calendar file tailored for **Microsoft Outlook**!

## ✨ Core Features
- **🤖 Smart Extraction (Gemini AI)**: Automatically parses dates, times, locations, meeting links, and summaries from your emails so you never have to copy and paste again.
- **🎨 Modern UI (Glassmorphism)**: Elevates your Gmail experience with a premium, sleek Glassmorphism-styled summary modal.
- **⚡ One-Click Export**: Generates an `.ics` file instantly that is fully compatible with Windows Outlook, Mac, and mobile email clients.
- **🔐 Secure Local Processing**: Your data is handled entirely utilizing the secure Extension Manifest V3 environment without needing third-party proxy servers.

---

## 🛠️ Installation

Since this is an "Unpacked Extension", please follow these manual steps to add it to your browser (Google Chrome or Microsoft Edge):

1. **Get the Code**: Clone the repository or download it as a ZIP file and extract it.
2. **Open Extensions Manager**:
   - If using Google Chrome: Type `chrome://extensions/` in your address bar and press Enter.
   - If using Microsoft Edge: Type `edge://extensions/` in your address bar and press Enter.
3. **Enable Developer Mode**: Toggle the "Developer mode" switch, typically found in the top-right or bottom-left corner of the page.
4. **Load the Extension**: Click the "Load unpacked" button in the top-left and select the extracted folder.
5. **Configure Gemini API Key**:
   - Once installed, locate the extension icon in your toolbar, right-click it, and select **"Options"**.
   - Follow the included link to [Google AI Studio](https://aistudio.google.com/app/apikey) to generate a free API key.
   - Paste the key in the settings page. It will automatically validate your key within seconds.
   - 🛡️ **Privacy Guarantee**: Your API key is stored locally in your browser and is never uploaded to any third-party server. It is only transmitted securely directly to Google's official API during extraction.

---

## 💡 Usage

1. Open Gmail and click into an email containing event or scheduling details.
2. You will see a premium blue **"Add to Outlook"** button securely placed right next to the email subject.
3. Click the button and wait briefly while the AI processes the email text.
4. A beautiful Glassmorphism Event Summary modal will slide in. Review the extracted Title, Time, and Location. 
5. Click **"Download .ics"** to save the file. Open it, and Outlook will automatically populate a calendar event for you!

---

## 📂 File Structure
- `manifest.json`: Configuration file utilizing the modern Chrome Extension Manifest V3 standard.
- `background.js`: The Service Worker script that communicates securely with the Gemini API and constructs the `.ics` framework.
- `content.js`: Handles injecting the UI buttons and modal windows into the Gmail interface.
- `content.css`: Premium Glassmorphism styling and animations for the UI.
- `options.html / options.js`: The options page to easily enter and natively validate your Gemini API Key.

<br>
<br>

<hr>

# 🇹🇼 中文 / Traditional Chinese

這個瀏覽器擴充功能完美結合了 Google 的 Gemini 人工智慧，讓您可以直接在 Gmail 中，按一下按鈕就將電子郵件內包含的會議、活動或行程，自動分析轉換為 **Microsoft Outlook** 支援的 `.ics` 行事曆檔案！

## ✨ 核心特色
- **🤖 智慧分析 (Gemini AI)**：自動判讀郵件中的日期、時間、地點、會議連結與簡介，不需要手動複製貼上。
- **🎨 現代化 UI (Glassmorphism)**：使用高級感滿滿的玻璃擬物風格 (Glassmorphism)，為您的 Gmail 增添質感。
- **⚡ 一鍵匯出**：生成完美相容於 Windows Outlook、Mac 甚至行動版作業系統的 `.ics` 格式。
- **🔐 本地安全處理**：所有處理過程都在 Chrome / Edge 的 Manifest V3 環境下安全進行，不用經過第三方私有伺服器。

---

## 🛠️ 安裝步驟

這是一個「未封裝的擴充功能 (Unpacked Extension)」，請按照以下步驟手動載入至您的瀏覽器中（支援 Google Chrome 或 Microsoft Edge）：

1. **取得程式碼**：將此專案 Clone 或是下載為 ZIP 檔案並解壓縮。
2. **開啟擴充功能管理頁面**：
   - 如果您使用 Google Chrome：網址列輸入 `chrome://extensions/` 並進入。
   - 如果您使用 Microsoft Edge：網址列輸入 `edge://extensions/` 並進入。
3. **開啟開發人員模式**：在擴充功能頁面的右上角 (或左下角)，啟用「開發人員模式 (Developer mode)」。
4. **載入未封裝項目**：點擊左上角的「載入未封裝項目 (Load unpacked)」，然後選擇您剛剛解壓縮出來的資料夾。
5. **設定 Gemini API 金鑰**：
   - 安裝完成後，請找到右上角的擴充功能圖示，右鍵點擊該圖示並選擇**「選項」**(Options)。
   - 在此畫面上點擊連結前往 [Google AI Studio](https://aistudio.google.com/app/apikey) 免費申請一組 API 金鑰。
   - 將金鑰貼上並點擊保存，系統會在幾秒內自動驗證金鑰是否有效。
   - 🛡️ **隱私安全保證**：您的 API 金鑰僅會儲存在本地端瀏覽器中，絕對不會上傳至任何第三方伺服器。只有在擷取內容時，才會透過安全連線直接且安全地傳送到 Google 的官方 API 進行處理。

---

## 💡 使用方式

1. 開啟您的 Gmail，並點入一封包含行程或會議資訊的電子郵件。
2. 在該郵件的「主旨」旁邊，會出現一顆藍色的 **「Add to Outlook」** 按鈕。
3. 點擊按鈕，等待 AI 幫您萃取郵件內容。
4. 畫面上會優雅地彈出一個總結視窗（Event Summary），確認標題、時間與地點無誤後，按下 **「Download .ics」** 即可。
5. 開啟下載好的 `.ics` 檔案，您的 Outlook 就會自動跳出會議邀請供您儲存！

---

## 📂 檔案結構說明
- `manifest.json`: 擴充功能的配置檔，採用官方最新的 Manifest V3 規格。
- `background.js`: Service Worker 腳本，負責與 Gemini API 溝通以及生成 `.ics` 下載資源。
- `content.js`: 負責在 Gmail 畫面注入按鈕與彈出式預覽視窗。
- `content.css`: 彈出視窗與按鈕的現代化 Glassmorphism UI 樣式。
- `options.html / options.js`: 提供輸入與驗證 API 金鑰的設定頁面。
