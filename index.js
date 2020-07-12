// Package to prompt user to enter inputs
var inquirer = require("inquirer");
// Package to read and write files using node.
var fs = require("fs");
// util is used for node.js internal APIs
const util = require("util");

// Write the readme from user inputs
const writeOutput = util.promisify(fs.writeFile);

// Prompt user inputs to populate sections of the readme
function promptUser() {
  return inquirer.prompt([

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
      name: "setup",
      message: "How can a user install this application?",
    },
    {
      type: "input",
      name: "github_userid",
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
      name: "usage",
      message: "How does a user use this application?",
    },
    {
      type: "list",
      message: "Does this application have a license? Select one or 'None' for no license",
      name: "license",
      choices: ["None", "MIT", "Apache", "GNU", "ISC"],
    },
    {
      type: "input",
      name: "version",
      message: "Enter the version of the application",
    },
  ]);
}

// function to generate the content required for the file being created
function generateReadMe(userInputs) {
  return `
  ![Code Count](https://img.shields.io/github/languages/count/${
    userInputs.github_userid
  }/${userInputs.github_repo}) 
  ![Main Code Base](https://img.shields.io/github/languages/top/${
    userInputs.github_userid
  }/${userInputs.github_repo}) 
  ![License](https://img.shields.io/badge/license-${userInputs.license}-blue) 
  ![Version](https://img.shields.io/badge/license-${userInputs.version}-red) 
  ![Last Commit](https://img.shields.io/github/last-commit/${
    userInputs.github_userid
  }/${userInputs.github_repo}) 
  ![Open Issues](https://img.shields.io/github/issues-raw/${
    userInputs.github_userid
  }/${userInputs.github_repo}) 
  ![Repo Size](https://img.shields.io/github/repo-size/${userInputs.github}/${
    userInputs.github_repo
  })\n
  # Welcome to ${userInputs.title}\n

  ## Table of Contents 🗂\n
  * [Description](#Description)
  * [Setup](#Setup)
  * [Usage](#Usage)
  * [License](#License)
  * [Version](#Version)


  ## Description\n
  ${userInputs.description}\n

  ## Setup\n
  ${userInputs.Setup}\n

  ## Usage\n
  ${userInputs.usage}\n

  ## License\n
  ![License Badge](https://img.shields.io/badge/license-${
    userInputs.license
  }-blue)\n
  ${
    userInputs.license==="None"
      ? "This application may be used freely without a license."
      : `You may utilize this application under the terms of the [${userInputs.license} license](assets/licences/${userInputs.license}.txt).`
  }

  ## Version\n
  ![Version Badge](https://img.shields.io/badge/version-${
    userInputs.version
  }-red)\n

  https://github.com/${userInputs.github_userid} \n
  ${userInputs.email}\n
  `;
}

async function init() {
  try {
    // function pauses whilst gathering user data through the promptUser function and stores the data in "userInputs"
    const userInputs = await promptUser();

    // the userInputs from above are passed into the generateReadMe function which is stored in "readme"
    const readme = generateReadMe(userInputs);

    // function pauses whilst writing the file with the content from "readme"
    await writeOutput("README_temp.md", readme);

    // notifies the user if successful
    console.log("Successfully wrote to README_temp.md");
  } catch (err) {
    // notifies the user if there was an error
    console.log(err);
  }
}

init();
