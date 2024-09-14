import { execa } from "execa";
import chalk from "chalk";
import { checkOsPlateform } from "./utils/check-os.js";
import { generateCopyExecaArray } from "./utils/copy.js";

const hostingStrategy = process.env.HOSTING_STRATEGY || "custom";

(function () {
  const copyCommand = checkOsPlateform("win32") ? "xcopy" : "cp";
  if (hostingStrategy === "vercel") {
    // Displaying the message
    console.log(
      `Your project is configured to be hosted on ${chalk.bold.blue(
        hostingStrategy
      )}\n`
    );

    // Copying the vercel folder content to the root directory
    execa(
      copyCommand,
      generateCopyExecaArray(
        "node_modules/rasengan/lib/esm/server/functions/vercel",
        "."
      ),
      {
        stdio: "inherit",
        shell: true,
      }
    );
  } else if (hostingStrategy === "netlify") {
    // Displaying the message
    console.log(
      `Your project is configured to be hosted on ${chalk.bold.blue(
        hostingStrategy
      )}\n`
    );
    // Copying the netlify folder content to the root directory
    execa(
      copyCommand,
      generateCopyExecaArray(
        "node_modules/rasengan/lib/esm/server/functions/netlify",
        "."
      ),
      {
        stdio: "inherit",
        shell: true,
      }
    );
  }
})();
