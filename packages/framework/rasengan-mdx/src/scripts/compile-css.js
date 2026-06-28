export const compileCss = async () => {
  const fs = (await import('node:fs')).default;
  const path = (await import('node:path')).default;
  const CleanCSS = (await import('clean-css')).default;

  const folder = path.join(process.cwd(), 'src/styles');
  const destination = path.join(process.cwd(), 'lib/styles');
  const files = fs.readdirSync(folder);

  // Create the destination folder if it doesn't exist
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination);
  }

  for (const file of files) {
    if (!file.endsWith('.css')) {
      continue;
    }

    const filePath = path.join(folder, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // Remove all comments from the CSS
    const output = new CleanCSS({}).minify(fileContent);

    if (output.errors.length > 0) {
      console.error('Erreur(s) lors de la minification:', output.errors);
      return;
    }

    const cssPath = path.join(destination, file.replace('.css', '.min.css'));
    fs.writeFileSync(cssPath, output.styles);
  }
};

compileCss();
