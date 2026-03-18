# 歡樂尾牙抽獎系統 (Company Party Lottery)

利用 React + Vite + Tailwind CSS 以及 UI/UX Pro Max 智庫所設計的一款歡樂、活潑的線上尾牙抽獎系統。具備完整的資料持久化機制、CSV 匯入/匯出功能，以及精美的抽獎互動特效。

## 🌟 核心功能

1. **手動與批次匯入：** 支援單獨新增姓名，或是透過 CSV 格式批次匯入名單。
2. **快速測試：** 一鍵新增 10 筆測試人員名單，方便測試系統穩定度。
3. **防止資料遺失：** 自動使用瀏覽器的 `localStorage` 保存參與者與中獎資料。遇到重新整理或當機，資料依舊安全保留。
4. **抽獎模式設定：** 可自由設定「是否允許重複中獎」。
5. **匯出報表：** 中獎名單可匯出為 CSV 檔，包含中獎人的精確時間紀錄。

---

## 🚀 本地端開發 (Local Development)

### 先決條件 (Prerequisites)
確保您已經安裝 [Node.js](https://nodejs.org/) (建議 v20 以上的版本)。

### 安裝步驟

1. 複製專案並進入資料夾：
```bash
git clone <your-repository-url>
cd RandomLottery
```

2. 安裝依賴套件：
```bash
npm install
```

3. 啟動本地開發伺服器：
```bash
npm run dev
```

4. 開啟瀏覽器訪問 `http://localhost:5173`。

---

## 🌐 部署至 GitHub Pages (CI/CD 自動發布)

本專案已設定好 GitHub Actions，當您推送程式碼到 GitHub 上的 `main` (或 `master`) 分支時，系統將自動進行編譯並發布。

### 開始設定 GitHub Repository (請務必跟隨以下步驟)：

1. **上傳程式碼到 GitHub**
   如果您尚未將此專案推送到 GitHub：
   ```bash
   git add .
   git commit -m "Init: 尾牙抽獎系統"
   git push origin main
   ```

2. **在 GitHub 上開啟 Pages 功能授權**
   - 進入您 Repository 的 **Settings** (設定) 頁面。
   - 在左側選單找到並點擊 **Pages**。
   - 在 `Build and deployment` (建置與部署) 區塊：
     - 將 `Source` (來源) 下拉選單改為 **GitHub Actions**。

3. **觸發第一次部署**
   - 設定完成後，只要您推送到 `main` 分支，GitHub Actions 就會自動開始執行部署。（您也可以點擊上方標籤頁的 `Actions` 來查看運行狀態）。
   - 部署完成後，GitHub 會提供一個類似 `https://<您的帳號>.github.io/<您的 Repo>/` 的網址，您就可以把這個網址分享給大家！

### 🛠️ 自訂 Base URL
**重要提示：** 若您的專案路徑不是架在 root `/` 底下，而是 `https://<帳號>.github.io/<專案名稱>/`，本專案的 `vite.config.ts` 已設定 `base: './'` 並且使用相對路徑來相容所有的 GitHub Pages 路由結構，因此您無需額外擔心路徑錯誤問題。 
