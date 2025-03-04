import { execSync } from 'child_process';

const command = `pnpm -r --filter="./packages/*" run build`;

try {
  console.log('Running build command...');
  execSync(command, { stdio: 'inherit', cwd: process.cwd() });
} catch (error) {
  console.error('Error running build command:', error);
  process.exit(1);
}
