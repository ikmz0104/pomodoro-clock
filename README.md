This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# みーたんタイマー
みーたん！

## Getting Started

First, run the development server:

```bash
npm i
#or
yarn

npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## 基本設計
[画面レイアウト-Figma](https://www.figma.com/file/SqXoA0G5U9z1cfoYVJBg1e/%E3%81%BF%E3%83%BC%E3%81%9F%E3%82%93%E3%82%BF%E3%82%A4%E3%83%9E%E3%83%BC?node-id=0%3A1 "Figma")

## DB構造
+ users/{userId}
  - name

+ categories/{categoryId}
  - category_name
  - time
  - userRef

+ users/{userId}/record/{id}
  - timestamp
  - time
  - categoryRef

+ images/{imageId}
  - image_number
  - image_extension

+ sounds/{soundId}
  - sound_number
  - sound_extension