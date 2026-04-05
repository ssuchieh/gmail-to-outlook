# Gmail to Outlook AI Extension

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
