import { execSync } from 'child_process';

const command = `pnpm -r --filter="./packages/*" run pack`;

try {
  console.log('Running pack command...');
  execSync(command, { stdio: 'inherit', cwd: process.cwd() });
} catch (error) {
  console.error('Error running pack command:', error);
  process.exit(1);
}
