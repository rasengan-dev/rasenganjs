import micromatch from 'micromatch';

const matcher = micromatch.matcher("**/*.md?(x)");

console.log({
  test: matcher("/Users/dilanekoumbou/Documents/projects/Personal/Rasengan Framework/projects/mdx/src/app/blog.page.mdx")
})