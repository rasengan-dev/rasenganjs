#!/usr/bin/env node
import chalk from "chalk";
import { Command } from "commander";
import { exec, spawn } from "child_process";
import __dirname from "./dirname.js";
import ora from "ora";
import fs from "node:fs/promises";
import { execa } from "execa";

const program = new Command();

program
  .name(chalk.blue("rasengan"))
  .version("1.0.0", "-v, --version", "Output the current version number");

program
  .command("dev")
  .description("Start development server")
  .action(async () => {
    // Spinner
    console.log("");
    const spinner = ora({
      text: `Starting server in development mode...`,
      color: "blue",
      spinner: "dots",
    }).start();

    execa("node", ["node_modules/rasengan/server"], { stdio: "inherit" });

    // Getting the package.json file
    const packageJson = await fs.readFile(
      "node_modules/rasengan/package.json",
      "utf-8"
    );

    // Parsing the package.json file
    const parsedPackageJson = JSON.parse(packageJson);

    spinner.succeed(
      `${chalk.bold.blue(
        `Rasengan v${parsedPackageJson["version"]}`
      )} is running 🚀`
    );

    console.log("");
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
    // Spinner
    console.log("");
    const spinner = ora({
      text: `Starting server in production mode...`,
      color: "blue",
      spinner: "dots",
    }).start();

    const childProcess = execa("npm", ["run", "preview"], {
      cwd: "node_modules/rasengan",
      stdio: "inherit", // Pipe child process output to the parent process
    });

    childProcess.on("close", (code) => {
      if (code === 0) {
        process.stdout.write("Project started Succesfully");
      }
    });

    // Getting the package.json file
    const packageJson = await fs.readFile(
      "node_modules/rasengan/package.json",
      "utf-8"
    );

    // Parsing the package.json file
    const parsedPackageJson = JSON.parse(packageJson);

    spinner.succeed(
      `${chalk.bold.blue(
        `Rasengan v${parsedPackageJson["version"]}`
      )} is running 🚀`
    );

    console.log("");
  });

program.parse(process.argv);
