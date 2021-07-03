This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Application name

みーたんタイマー

## Project preparation

First, Clone from [`the development branch of this repository`](https://github.com/ikmz0104/pomodoro-clock/tree/development).

```
$ git clone -b development https://github.com/ikmz0104/pomodoro-clock
```

Second, Open the folder under the clone with an editor and create an `.env.local` file directly under the directory and copy and paste `the variables`.

### Additional preparation...(You can skip it)

Third, It's up to you, but to avoid work conflicts, derive from your development branch to your own branch.

#### Create a new branch

```
~/pomodoro-clock (development)
$ git branch branchname
```

#### Move to new branch

```
~/pomodoro-clock (development)
$ git checkout branchname
```

#### Preparing a pull request

```
~/pomodoro-clock (branchname)
git add.
git commit -m "[add] xxx"
git push --set-upstream origin branchname
```

At the end, To share work, make a pull request and merge.

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

## Screen Layout Design

[Screen Layout Design-Figma](https://www.figma.com/file/SqXoA0G5U9z1cfoYVJBg1e/%E3%81%BF%E3%83%BC%E3%81%9F%E3%82%93%E3%82%BF%E3%82%A4%E3%83%9E%E3%83%BC?node-id=0%3A1 'Figma')

## DB design

- users/{userId}

  - name

- categories/{categoryId}

  - category_name
  - time
  - userRef

- users/{userId}/record/{id}

  - timestamp
  - time
  - categoryRef

- images/{imageId}

  - image_number
  - image_extension

- sounds/{soundId}
  - sound_number
  - sound_extension
  - type
  - url
