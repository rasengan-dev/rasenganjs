#!/usr/bin/env node
import chalk from "chalk";
import { Command } from "commander";
import { exec, spawn } from "child_process";
import __dirname from "./dirname.js";
import ora from "ora";
import fs from "node:fs/promises";

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

    // const childProcess = exec("node node_modules/rasengan/server");
    const childProcess = spawn("node", ["node_modules/rasengan/server"]);

    // Updating the package.json file
    const packageJson = await fs.readFile(
      "node_modules/rasengan/package.json",
      "utf-8"
    );

    // Parsing the package.json file
    const parsedPackageJson = JSON.parse(packageJson);

    spinner.succeed(
      `${chalk.bold.blue(
        `Rasengan V${parsedPackageJson["version"]}`
      )} is running 🚀`
    );

    console.log("");

    childProcess.stdout?.on("data", async (data) => {
      process.stdout.write(data);
    });

    childProcess.stderr?.on("data", (data) => {
      process.stdout.write(data);
    });

    childProcess.on("close", async (code) => {
      console.log(`Code: ${code}`);
    });
  });

program
  .command("build")
  .description("Build the project")
  .action(() => {
    const childProcess = exec("npm --prefix node_modules/rasengan run build");

    childProcess.stdout?.on("data", (data) => {
      process.stdout.write(data);
    });

    childProcess.stderr?.on("data", (data) => {
      process.stdout.write(data);
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
  .action(() => {
    const childProcess = exec("npm --prefix node_modules/rasengan run preview");

    childProcess.stdout?.on("data", (data) => {
      process.stdout.write(data);
    });

    childProcess.stderr?.on("data", (data) => {
      process.stdout.write(data);
    });

    childProcess.on("close", (code) => {
      if (code === 0) {
        process.stdout.write("Project started Succesfully");
      }
    });
  });

program.parse(process.argv);
