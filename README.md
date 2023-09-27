This is a sample repo, reproducing an odd behaviour I've run into with Next's hot reloading. The only change I've made from a stock `create-next-app` is adding `src/pages/[path]/[[...slug]].tsx`.

### Steps

1. `yarn`
2. `yarn dev`
3. Open a browser tab to `localhost:3000/some/path`
4. _Without closing the browser tab_, kill the dev server process
5. `yarn dev` again
6. Wait for the compilation and fast refresh.
7. Verify that the console log in `getServerSideProps` shows a `_next/static/webpack...` request being routed there:
  ```
  ✓ Ready in 4.9s
  ✓ Compiled /[path]/[[...slug]] in 2.6s (197 modules)
  ✓ Compiled in 143ms (197 modules)
  {
    url: '/_next/static/webpack/60d2455b680d4bbe.webpack.hot-update.json',
    query: {
      path: '_next',
      slug: [ 'static', 'webpack', '60d2455b680d4bbe.webpack.hot-update.json' ]
    }
  }
  ⚠ Fast Refresh had to perform a full reload. Read more: https://nextjs.org/docs/messages/fast-refresh-reload
  ```

### Notes

- This issue seems to have been added in Next `13.4.13-canary.0`; `13.4.12` and lower run without any of Next's internal requests making it to `getServerSideProps`.
- It _looks_ like this only happens with a wildcard route; I can't reproduce the issue with a `getServerSideProps` in `pages/index.tsx`.
