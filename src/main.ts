#!/usr/bin/env node

/**
 * Copyright (c) 2023-Present, Rasengan.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Create-Rasengan-App CLI Tool for creating your frontend projects built using Rasengan.js Framework.
 *
 * You don't need to install this package manually before trying to use it in order to create your project.
 * You can use this package by running the following command:
 *
 * npx create-rasengan-app <project-name>
 *
 * or
 *
 * yarn create rasengan-app <project-name>
 *
 * or
 *
 * pnpm create rasengan-app <project-name>
 */

import chalk from "chalk";
import { Command } from "commander";
import ora from "ora";
import fs from "node:fs/promises";
import path from "node:path";
import ncp from "ncp";
import { Languages, StateManagers, Templates } from "./constants/index.js";
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
  .name(chalk.blue("create-rasengan"))
  .version("1.0.0", "-v, --version", "Output the current version number")
  .description(
    `${chalk.blue(
      "Create Rasengan"
    )} is a CLI tool for creating your frontend projects built using ${chalk.bold.cyan(
      "Rasengan.js"
    )} Framework.`
  );

program
  .command("new [project-name]")
  .description("Create a new project")
  .action(async (projectName, options) => {
    // Showing the welcome message
    console.log(`\nYou are using ${chalk.bold.blue("Create Rasengan CLI")} 🎉\n`);

    // Getting the current directory
    const currentDirectory = process.cwd();

    let nameOfProject = projectName || "";

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

    // Checking the format of the project name
    if (!/^[a-z0-9_-]*$/i.test(nameOfProject)) {
      console.error(
        chalk.red(
          "Project name can only include letters, numbers, underscores and hashes."
        )
      );
      return;
    }

    if (nameOfProject !== nameOfProject.toLowerCase()) {
      console.error(
        chalk.red("Project name can only be in lowercase letters.")
      );
      return;
    }

    if (nameOfProject.includes(" ")) {
      console.error(
        chalk.red("Project name can't include spaces. Please use dashes.")
      );
      return;
    }

    // Checking if the project already exists
    const projectPath = path.join(currentDirectory, nameOfProject);

    // Checking if the project already exists
    try {
      await fs.readdir(projectPath);

      // Returning if the project already exists
      console.log(
        `It seems like a project with the name ${chalk.bold.blue(
          projectName
        )} already exists!\n`
      );
      console.log(`
        Try using a different project name or delete the existing project.
      `)
    } catch (err) {
      // Ask for the language
      let languageName = "";

      // Prepare the question for the language
      const languageQuestion = {
        type: "list",
        name: "language",
        message: "Select a language:",
        choices: Languages,
      };

      const languageAnswer = await inquirer.prompt([languageQuestion]);
      languageName = languageAnswer.language;

      // Get the template name
      let templateName = "";

      // Prepare the question for the template
      const templateQuestion = {
        type: "list",
        name: "template",
        message: "Select a template:",
        choices: Templates,
      };

      const templateAnswer = await inquirer.prompt([templateQuestion]);

      templateName = templateAnswer.template;

      // Prepare question for the state manager
      let stateManager = "";

      // Prepare the question for the state manager
      const stateManagerQuestion = {
        type: "list",
        name: "stateManager",
        message: "Select a state manager:",
        choices: StateManagers,
      };

      const stateManagerAnswer = await inquirer.prompt([stateManagerQuestion]);

      stateManager = stateManagerAnswer.stateManager;

      // Handling all answers
      const templatePath = path.join(
        __dirname,
        "../..",
        `templates/${languageName}`
      );

      // Starting the spinner for creating the project
      const createSpinner = spinner("Creating project...");

      createSpinner.start();

      // Copying the template files to the project directory
      ncp(templatePath, projectPath, async (err) => {
        if (err) {
          console.log(err);
          createSpinner.fail(chalk.red("Error while creating the project!"));
          console.log("");
          return;
        }

        // Updating the package.json file
        let packageJson = null;

        if (templateName === "blank") {
          packageJson = await fs.readFile(
            path.join(projectPath, "package.json"),
            "utf-8"
          );
        } else if (templateName === "tailwind") {
          packageJson = await fs.readFile(
            path.join(
              __dirname,
              "../..",
              `templates/${templateName}/${languageName}`,
              "package.json"
            ),
            "utf-8"
          );
        } else {
          console.log(chalk.red("Invalid template name!"));

          return;
        }

        // Parsing the package.json file
        const parsedPackageJson = JSON.parse(packageJson);

        // Setting the project name
        parsedPackageJson.name = projectName;

        // Writing the package.json file
        await fs.writeFile(
          path.join(projectPath, "package.json"),
          JSON.stringify(parsedPackageJson, null, 2)
        );

        // Adding more configuration files when the template is tailwind
        if (templateName === "tailwind") {
          // Copying the tailwind.config.js file
          await fs.copyFile(
            path.join(
              __dirname,
              "../..",
              `templates/${templateName}/${languageName}`,
              "tailwind.config.js"
            ),
            path.join(projectPath, "tailwind.config.js")
          );

          // Copying the postcss.config.js file
          await fs.copyFile(
            path.join(
              __dirname,
              "../..",
              `templates/${templateName}/${languageName}`,
              "postcss.config.js"
            ),
            path.join(projectPath, "postcss.config.js")
          );

          // Copying the src/pages/index.css file
          await fs.copyFile(
            path.join(
              __dirname,
              "../..",
              `templates/${templateName}/${languageName}`,
              "src/pages/index.css"
            ),
            path.join(projectPath, "src/pages/index.css")
          );

          // Copying the src/pages/home.page.tsx file or src/pages/home.page.jsx
          if (languageName === "typescript") {
            await fs.copyFile(
              path.join(
                __dirname,
                "../..",
                `templates/${templateName}/${languageName}`,
                "src/pages/home.page.tsx"
              ),
              path.join(projectPath, "src/pages/home.page.tsx")
            );
          } else {
            await fs.copyFile(
              path.join(
                __dirname,
                "../..",
                `templates/${templateName}/${languageName}`,
                "src/pages/home.page.jsx"
              ),
              path.join(projectPath, "src/pages/home.page.jsx")
            );
          }
        }

        await new Promise((resolve) =>
          setTimeout(() => {
            createSpinner.succeed(
              chalk.green("\nProject created successfully!")
            );

            resolve("");
          }, 2000)
        );
        console.log("");

        // Display the next steps
        console.log(chalk.bold.blue("Next steps:"));

        console.log("");

        // Display the next steps
        console.log(`1. ${chalk.blue(`cd ${nameOfProject}`)}`);
        console.log(
          `2. ${chalk.blue("npm install")} or ${chalk.blue(
            "yarn"
          )} or ${chalk.blue("pnpm install")}`
        );
        console.log(
          `3. ${chalk.blue("npm run dev")} or ${chalk.blue(
            "yarn dev"
          )} or ${chalk.blue("pnpm run dev")}`
        );

        console.log("");

        // Congratulation message
        console.log(`${chalk.bold.blue("Congratulation !")} 🎉`);

        console.log("");
        console.log(
          `For more information, visit ${chalk.blue("https://rasenganjs.dev")}`
        );
      });
    }
  });

program.parse(process.argv);
