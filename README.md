# Lin Mu — Portfolio

以「黑膠唱片收藏」為概念的個人設計作品集。單一 `index.html`，不需要建置工具，直接用瀏覽器打開即可。

- 作品像唱片收藏一樣翻閱：每個分類一次聚焦一件，封套斜疊、可左右翻頁，點開時唱片滑出
- 作品分三大類，各自有適合的展示方式：
  - **Web**：RWD（桌機＋手機外框）、只有手機版
  - **Visual**：社群廣告、電商 Banner（同比例尺排列）、eDM 長圖、KV
  - **Motion**：16:9、9:16、640×1386
- 支援桌機／平板／手機 RWD 與 `prefers-reduced-motion`

> 目前的作品、客戶與經歷皆為示意內容，作品畫面以標示尺寸的示意框代替。

## 檔案結構

```
index.html   網站本體（樣式、資料、程式都在這裡）
assets/      真實作品素材放這裡
```

## 本機預覽

直接雙擊 `index.html` 即可。若之後使用了 `assets/` 內的影片，建議用本機伺服器預覽：

```bash
python3 -m http.server 8000
# 開啟 http://localhost:8000
```

## 替換成真實作品

所有作品資料都在 `index.html` 的 `const P=[ ... ]` 陣列（搜尋 `const P=[`）。

### 專案欄位

| 欄位 | 說明 | 範例 |
|---|---|---|
| `id` | 網址用的代號，`#lm-031` 會直接開啟該作品 | `'lm-031'` |
| `cat` | 專案編號 | `'LM-031'` |
| `t` / `zh` | 英文標題／中文標題 | `'Tidewater Hotel'` / `'潮汐旅店官網'` |
| `g` | 分類：`'web'`、`'visual'`、`'motion'` | `'web'` |
| `y` `client` `role` | 年份、客戶、擔任角色 | |
| `ind` `pf` | 產業、投放平台 | `'電商'`、`'Meta · LINE'` |
| `c` `k` `b` | 封套顏色、封套上的文字色、示意框底色 | `'#b9c8e6'` |
| `url` | 網頁作品在瀏覽器外框顯示的網址 | `'tidewater.hotel'` |
| `d` | 專案說明 | |
| `w` | 作品（曲目）陣列，見下方 | |

### 作品類型（`w` 陣列）

加上 `src` 欄位就會改用真實檔案，不加則顯示標示尺寸的示意框。所有作品都以原始比例呈現，不裁切。

```js
// 網頁 RWD：整頁長截圖（桌機 1440 寬、手機 390 寬）
{k:'web', t:'首頁', dv:['desktop','mobile'],
 src:{desktop:'assets/lm-031/home-d.jpg', mobile:'assets/lm-031/home-m.jpg'}}

// 只有手機版：n 張畫面；app:true 表示單一螢幕（390×844），否則為可捲動的長頁
{k:'webm', t:'App 介面', n:3, app:true,
 src:['assets/lm-027/1.png','assets/lm-027/2.png','assets/lm-027/3.png']}

// 單張視覺／Banner：r 為原始寬高（比例或像素）
{k:'image', t:'主視覺 KV', r:[1920,1080], src:'assets/lm-030/kv.jpg'}
{k:'image', t:'社群 Banner', r:[1200,628], src:'assets/lm-030/banner.jpg'}

// 系列／社群廣告：等高並排
{k:'series', t:'社群廣告', items:[[1080,1080],[1080,1350],[1080,1920]],
 src:['assets/lm-030/1x1.jpg','assets/lm-030/4x5.jpg','assets/lm-030/9x16.jpg']}

// 電商 Banner 組：所有尺寸用同一個比例尺排列，看得出真實大小差異
{k:'set', t:'電商 Banner', items:[[1200,628],[970,250],[300,600],[300,250],[728,90]],
 src:['assets/lm-030/b1.jpg','assets/lm-030/b2.jpg','assets/lm-030/b3.jpg','assets/lm-030/b4.jpg','assets/lm-030/b5.jpg']}

// EDM 長圖：旁邊會自動出現跟隨捲動的縮圖導覽
{k:'long', t:'冬季 EDM', r:[600,2600], src:'assets/lm-029/edm.jpg'}

// 動態：16:9、9:16、640×1386 等，dur 為秒數；src 支援 .mp4 / .webm / .mov
{k:'motion', t:'主片', items:[{r:[16,9], dur:42, src:'assets/lm-028/main.mp4'}]}
{k:'motion', t:'App 開屏', items:[{r:[640,1386], dur:5, src:'assets/lm-021/splash.mp4'}]}
```

### 其他可調整的地方

- **分類名稱與格式說明**：`G`
- **工作流程**：`STEPS`；**服務項目**：`SVC`；**經歷**：`HIST`
- **個人介紹、Email、社群連結**：直接在 HTML 中搜尋 `hello@linmu.studio`、`Behance` 修改
- **示意內容說明**：換成真實作品後，記得刪除搜尋 `示意內容` 找到的兩處文字

## 素材建議

| 類型 | 建議 |
|---|---|
| 網頁截圖 | 桌機 1440px 寬、手機 390px 寬（@2x 可輸出 2880／780），JPG 或 WebP |
| 視覺作品 | 長邊 2000–2400px，WebP 或高品質 JPG |
| EDM 長圖 | 依原始寬度 @2x 輸出 |
| 動態 | MP4（H.264），1080p，靜音循環播放，單檔盡量 10MB 內 |

建議依專案分資料夾：`assets/lm-031/`、`assets/lm-030/`……
