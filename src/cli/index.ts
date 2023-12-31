#!/usr/bin/env node
import chalk from "chalk";
import { Command } from "commander";
import __dirname from "./dirname.js";
import { execa } from "execa";

const program = new Command();

program
  .name(chalk.blue("rasengan"))
  .version("1.0.0", "-v, --version", "Output the current version number");

program
  .command("dev")
  .option("-p <port>")
  .description("Start development server")
  .action(async ({ p: port }: { p: number }) => {
    const convertedPort = Number(port);

    // Checking port
    if (
      port &&
      (isNaN(convertedPort) || convertedPort < 0 || convertedPort > 65535)
    ) {
      console.log("");
      console.log(
        chalk.red("Please provide a valid port number between 0-65535")
      );
      console.log("");
      process.exit(1);
    }

    execa("node", ["node_modules/rasengan/server"], {
      stdio: "inherit",
      env: {
        ...process.env,
        PORT: convertedPort ? convertedPort.toString() : undefined,
      },
    });
  });

program
  .command("build")
  .description("Build the project")
  .action(() => {
    // const childProcess = exec("npm --prefix node_modules/rasengan run build");
    const childProcess = execa("npm", ["run", "build"], {
      cwd: "node_modules/rasengan",
      stdio: "inherit", // Pipe child process output to the parent process
    });

    childProcess.on("close", (code) => {
      if (code === 0) {
        process.stdout.write(chalk.green("Project built successfully!"));
      }
    });
  });

program
  .command("start")
  .description("Start the project in production mode")
  .action(async () => {
    const childProcess = execa("npm", ["run", "preview"], {
      cwd: "node_modules/rasengan",
      stdio: "inherit", // Pipe child process output to the parent process
    });

    childProcess.on("close", (code) => {
      if (code === 0) {
        process.stdout.write("Project started Succesfully");
      }
    });
  });

program.parse(process.argv);
