import { checkOsPlateform } from "./check-os.js";
import path from "node:path";
/**
 * Generates an array of command-line arguments for the `execa` function to copy files from one location to another.
 *
 * @param {string} from - The source directory or file path.
 * @param {string} to - The destination directory or file path.
 * @return {Array<string>} - An array of command-line arguments for the `execa` function.
 */
export const generateCopyExecaArray = (from, to) => {
  const fromPath = path.normalize(from);
  const toPath = path.normalize(to);
  const copyCommand = ["-r", path.join(fromPath, "/*"), toPath];
  const copyCommandWindows = [`"${fromPath}"`, `"${toPath}"`, "/s /e /i"];
  return checkOsPlateform("win32") ? copyCommandWindows : copyCommand;
};
