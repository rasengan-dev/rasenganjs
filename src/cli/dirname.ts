import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

function getDirname() {
  if (typeof exports === 'object' && typeof module !== 'undefined') {
    return __dirname;
  } else {
    // @ts-ignore
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
  
    return __dirname;
  }
}

export default getDirname();