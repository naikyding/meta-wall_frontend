# meta-wall_frontend [🔗](http://meta-wall.vercel.app/)

## 說明
MetaWall 是一個社群平台，使用者可以在此建立自已的帳號，進而發文與喜歡其它用戶的文章。
## 技術
| 前端 | 後端 |
| --- | --- |
| Vue3 | NodeJS (Express) |
|vite| MongoDB (Mongoose) |
| Pinia | -- |
| Tailwind CSS | -- |

## 特點
- 可使用 google、facebook 第三方帳號登入 
- 上傳圖片發文 (串接 imgur 圖床) 
- 忘記密碼機制 (發信驗證)

## 開發操作
```bash
# 安裝套件
npm ci

# 開發
npm run dev

# 打包
npm run build

# 修正格式
npm run lint
```