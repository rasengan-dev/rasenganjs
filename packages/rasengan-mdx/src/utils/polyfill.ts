export default function polyfill() {
  return {
    name: 'vite-plugin-rasengan-mdx-polyfill',

    config: () => {
      return {
        define: {
          process: process,
        },
      };
    },

    enforce: 'pre',
    apply: 'build',
  };
}
