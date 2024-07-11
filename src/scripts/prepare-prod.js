import { execa } from "execa";
import chalk from "chalk";

const hostingStrategy = process.env.HOSTING_STRATEGY || "custom";

(function() {
  if (hostingStrategy === "vercel") {
    // Displaying the message
    console.log(
      `Your project is configured to be hosted on ${chalk.bold.blue(
        hostingStrategy
      )}\n`
    );

    // Copying the api folder to the root directory
    execa(
      "cp",
      ["-r", "node_modules/rasengan/lib/esm/server/functions/vercel/api", "."],
      {
        stdio: "inherit",
      }
    );

    // Copying the vercel.json file to the root directory
    execa(
      "cp",
      ["node_modules/rasengan/lib/esm/server/functions/vercel/vercel.json", "."],
      {
        stdio: "inherit",
      }
    );
  } else if (hostingStrategy === "netlify") {
    // Displaying the message
    console.log(
      `Your project is configured to be hosted on ${chalk.bold.blue(
        hostingStrategy
      )}\n`
    );

    // create a netlify folder at the root
    execa("mkdir", ["-p", "netlify"], {
      stdio: "inherit",
    });

    // Copying the netlify folder to the root directory
    execa(
      "cp",
      [
        "-r",
        "node_modules/rasengan/lib/esm/server/functions/netlify/functions",
        "./netlify",
      ],
      {
        stdio: "inherit",
      }
    );

    // Copying the netlify.toml file to the root directory
    execa(
      "cp",
      ["node_modules/rasengan/lib/esm/server/functions/netlify/netlify.toml", "."],
      {
        stdio: "inherit",
      }
    );
  }
})()