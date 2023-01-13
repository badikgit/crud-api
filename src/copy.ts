import { resolve } from 'path';
import { cp } from 'fs/promises';

export const copy = async () => {
  const srcPath = resolve('.', 'favicon.ico');
  const destPath = resolve('.', 'dist', 'favicon.ico');

  try {
    await cp(srcPath, destPath, { force: true, recursive: true });
  } catch (error) {
    console.log(error instanceof Error && error.message);
  }
};

(async () => copy())();
