// Package to prompt user to enter inputs
var inquirer = require("inquirer");
// Package to read and write files using node.
var fs = require("fs");
// util is used for node.js internal APIs
const util = require("util");

// function to write the file based on user data returning resolved if successful or reject if there was an error
const writeOutput = util.promisify(fs.writeFile);

// function to prompt the user with a series of questions to gather data for the file being created
function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "github",
      message: "Please enter your Github username",
    },
    {
      type: "input",
      name: "github_repo",
      message: "Please enter the name of the repository",
    },
    {
      type: "input",
      name: "email",
      message: "Please enter your email address",
    },
    {
      type: "input",
      name: "title",
      message: "Project title",
    },
    {
      type: "input",
      name: "description",
      message: "Project description",
    },
    {
      type: "input",
      name: "installation",
      message: "Provide installation instructions",
    },
    {
      type: "input",
      name: "usage",
      message: "Steps to use this app",
    },
    {
      type: "list",
      message: "License type",
      name: "license",
      choices: [
        "MIT", 
        "Apache", 
        "GNU", 
        "ISC"
      ]
    },
    {
      type: "input",
      name: "version",
      message: "Version",
    },

  ]);
}

// function to generate the content required for the file being created
function generateReadMe(userInputs) {
  return `
  ![Code Count](https://img.shields.io/github/languages/count/${userInputs.github}/${userInputs.github_repo}) 
  ![Main Code Base](https://img.shields.io/github/languages/top/${userInputs.github}/${userInputs.github_repo}) 
  ![License Badge](https://img.shields.io/badge/license-${userInputs.license}-blue) 
  ![Version Badge](https://img.shields.io/badge/license-${userInputs.version}-red) 
  ![Last Commit](https://img.shields.io/github/last-commit/${userInputs.github}/${userInputs.github_repo}) 
  ![Open Issues](https://img.shields.io/github/issues-raw/${userInputs.github}/${userInputs.github_repo}) 
  ![Repo Size](https://img.shields.io/github/repo-size/${userInputs.github}/${userInputs.github_repo})\n
  # Welcome to ${userInputs.title}\n
  ## Description\n
  ${userInputs.description}\n
  ## Table of Contents 🗂\n
  * [Description](#Description)
  * [Installation](#Installation)
  * [Usage](#Usage)
  * [License](#License)
  * [Version](#Version)
  * [Contributing](#Contributing)
  * [Tests](#Tests)
  * [Questions](#Questions)\n
  ## Installation\n
  ${userInputs.installation}\n
  ## Usage\n
  ${userInputs.usage}\n
  ## License\n
  ![License Badge](https://img.shields.io/badge/license-${userInputs.license}-blue)\n
  This app is using ${userInputs.license} license.
  View [here](assets/licences/${userInputs.license}.txt)
  ## Version\n
  ![Version Badge](https://img.shields.io/badge/license-${userInputs.version}-red)\n
  https://github.com/${userInputs.github} \n
  ${userInputs.email}\n
  `;
}

async function init() {
  console.log("hi");
  try {
    // function pauses whilst gathering user data through the promptUser function and stores the data in "userInputs"
    const userInputs = await promptUser();

    // the userInputs from above are passed into the generateReadMe function which is stored in "readme"
    const readme = generateReadMe(userInputs);

    // function pauses whilst writing the file with the content from "readme"
    await writeOutput("README.md", readme);

    // notifies the user if successful
    console.log("Successfully wrote to README.md");
  } catch (err) {
    // notifies the user if there was an error
    console.log(err);
  }
}

init();
