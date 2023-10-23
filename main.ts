#!/usr/bin/env node
import chalk from "chalk";
import { Command } from "commander";
import ora from "ora";
import { exec } from "child_process";
import fs from "node:fs/promises";
import path from "node:path";
import ncp from "ncp";
import { Templates } from "./constants/index.js";
import __dirname from "./utils/dirname.js";
import inquirer from "inquirer";

// Spinner
const spinner = (text: string) =>
  ora({
    text,
    spinner: "dots",
    color: "blue",
  });

const program = new Command();

program
  .name(chalk.blue("rasengan"))
  .version("1.0.0", "-v, --version", "Output the current version number")
  .description(
    `${chalk.blue(
      "Rasengan"
    )} is a CLI tool for creating and managing your frontend projects built using Rasengan.js Framework.`
  );

program
  .command("create [project-name]")
  .description("Create a new project")
  .option("-t, --template <template-name>", "Use custom template")
  .action(async (projectName, options) => {
    // Getting the current directory
    const currentDirectory = process.cwd();

    let nameOfProject = projectName;

    // Checking if the project name is provided
    if (!projectName) {
      const question = {
        type: "input",
        name: "projectName",
        message: "Enter the project name:",
      };

      const answer = await inquirer.prompt([question]);

      nameOfProject = answer.projectName;
    }

    // Checking if the project already exists
    const projectPath = path.join(currentDirectory, nameOfProject);

    // Checking if the project already exists
    try {
      await fs.readdir(projectPath);

      // Returning if the project already exists
      console.error("Project already exists!");
    } catch (err) {
      // Get the template name
      let templateName = options.template || null;

      // If the template name is not provided
      if (!templateName) {
        const menuQuestion = {
          type: "list",
          name: "template",
          message: "Select a template:",
          choices: Templates,
        };

        const answer = await inquirer.prompt([menuQuestion]);

        templateName = answer.template;
      }

      // Checking if the template exists
      if (!Templates.includes(templateName)) {
        console.log(chalk.red(`Template ${templateName} is not supported!`));
        return;
      }

      // Copying the template files
      const templatePath = path.join(
        __dirname,
        "../..",
        `templates/${templateName}`
      );

      // Copying the template files to the project directory
      ncp(templatePath, projectPath, async (err) => {
        if (err) {
          console.log(err);
          console.log(chalk.red("Error copying template files!"));
          return;
        }

        // Updating the package.json file
        const packageJson = await fs.readFile(
          path.join(projectPath, "package.json"),
          "utf-8"
        );

        // Parsing the package.json file
        const parsedPackageJson = JSON.parse(packageJson);

        // Setting the project name
        parsedPackageJson.name = projectName;

        // Writing the package.json file
        await fs.writeFile(
          path.join(projectPath, "package.json"),
          JSON.stringify(parsedPackageJson, null, 2)
        );

        console.log(chalk.green("Project created successfully!"));
      });
    }
  });

program
  .command("dev")
  .description("Start development server")
  .action(() => {
    // const devSpinner = spinner("Starting development server...");
    // devSpinner.start();
    console.log(chalk.blue("Starting development server..."));

    const childProcess = exec("npm --prefix node_modules/rasengan run dev");

    childProcess.stdout?.on("data", (data) => {
      console.log(data);
    });

    childProcess.stderr?.on("data", (data) => {
      console.log(data);
    });

    childProcess.on("close", (code) => {
      if (code === 0) {
        // devSpinner.succeed("Development server started successfully!");
        console.log(chalk.green("Development server started successfully!"));
      }
    });
  });

program
  .command("build")
  .description("Build the project")
  .action(() => {
    const childProcess = exec("npm --prefix node_modules/rasengan run build");

    childProcess.stdout?.on("data", (data) => {
      console.log(data);
    });

    childProcess.stderr?.on("data", (data) => {
      console.log(data);
    });

    childProcess.on("close", (code) => {
      if (code === 0) {
        console.log(chalk.green("Project built successfully!"));
      }
    });
  });

program
  .command("start")
  .description("Start the project in production mode")
  .action(() => {
    const startSpinner = spinner("Starting the project...");
    startSpinner.start();

    const childProcess = exec("npm --prefix node_modules/rasengan run preview");

    childProcess.stdout?.on("data", (data) => {
      console.log(data);
    });

    childProcess.stderr?.on("data", (data) => {
      console.log(data);
    });

    childProcess.on("close", (code) => {
      if (code === 0) {
        startSpinner.succeed("Project started successfully!");
      }
    });
  });

program.parse(process.argv);
