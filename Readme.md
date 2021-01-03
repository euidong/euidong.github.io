# Gatsby Blog

Euidong's Gatsby Blog

### Github Action

It is working.

![github pages](https://github.com/euidong/euidong.github.io/workflows/github%20pages/badge.svg?branch=dev&event=push)

```
name: github pages

on:
  push:
    branches:
      - dev

jobs:
  deploy:
    runs-on: ubuntu-18.04
    steps:
      - uses: actions/checkout@v2

      - name: Setup Node
        uses: actions/setup-node@v2.1.2
        with:
          node-version: "12.x"

      - name: Cache dependencies
        uses: actions/cache@v2
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('**/yarn.lock') }}
          restore-keys: |
            ${{ runner.os }}-node-

      - name: Install yarn
        run: npm install -g yarn

      - name: Install node_modules
        run: yarn install

      - name: Build
        run: yarn build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```
