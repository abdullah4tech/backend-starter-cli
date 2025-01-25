#!/usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs';
import shell from 'shelljs';

// Listen to ctrl + c to exit gracefully
process.on("SIGINT", () => {
  console.log(chalk.yellow("\nProcess terminated by user. Goodbye!"));
  process.exit(0); // Exit without errors
});

async function setupProject() {
  console.log(chalk.blue('Welcome to the Backend Starter CLI! 🚀'));

  // Prompt the user for project preferences
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Enter your project name:',
      default: 'my-backend-project',
    },
    {
      type: 'confirm',
      name: 'versionControl',
      message: 'Do you want to Initialize git?',
      default: false
    },
    {
      type: 'list',
      name: 'framework',
      message: 'Choose a backend framework:',
      choices: ['Express', 'NestJS', 'Koa'],
      default: 'Express',
    },
    {
      type: 'confirm',
      name: 'addDatabase',
      message: 'Do you want to include a database setup?',
      default: true,
    },
  ]);

  let dbConfig = {};
  if (answers.addDatabase) {
    // Prompt the user for additional database configuration
    dbConfig = await inquirer.prompt([
      {
        type: 'list',
        name: 'databaseType',
        message: 'Choose a database type:',
        choices: ['MongoDB', 'PostgreSQL', 'MySQL'],
        default: 'PostgreSQL',
      },
      {
        type: 'input',
        name: 'schemaName',
        message: 'Enter the database schema name:',
        default: 'my_schema',
      },
      {
        type: 'confirm',
        name: 'usePrisma',
        message: 'Do you want to use Prisma as your ORM?',
        default: true,
      },
      {
        type: 'confirm',
        name: 'createEnvFile',
        message: 'Do you want to create an .env file for your database configuration?',
        default: true,
      },
    ]);
  }

  const { projectName, framework, versionControl, addDatabase } = answers;

  // Create the project directory
  if (!fs.existsSync(projectName)) {
    fs.mkdirSync(projectName);
    console.log(chalk.green(`Created project directory: ${projectName}`));
  } else {
    console.log(chalk.red(`Directory "${projectName}" already exists! Exiting.`));
    process.exit(1);
  }

  shell.cd(projectName);

  // Initialize an npm project
  console.log(chalk.yellow('Initializing npm project...'));
  shell.exec('npm init -y > /dev/null 2>&1');

  // Install the selected framework
  console.log(chalk.yellow(`Installing ${framework}...`));
  const dependencies = {
    Express: ['express'],
    NestJS: ['@nestjs/core', '@nestjs/common', 'reflect-metadata'],
    Koa: ['koa'],
  };
  shell.exec(`npm install ${dependencies[framework].join(' ')} > /dev/null 2>&1`);

  // Generate boilerplate code
  console.log(chalk.yellow('Generating boilerplate code...'));
  const boilerplate = {
    Express: `
import express from 'express';
const app = express();
const PORT = import.meta.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(\`Server is running on http://localhost:\${PORT}\`);
});
`,
    NestJS: `
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
`,
    Koa: `
import Koa from 'koa';
const app = new Koa();

app.use(async (ctx) => {
  ctx.body = 'Hello, World!';
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
`,
  };
  fs.writeFileSync('index.js', boilerplate[framework]);

  // Add database setup if selected
  if (addDatabase) {
    console.log(chalk.yellow('Adding database setup...'));

    // Create the .env file if requested
    if (dbConfig.createEnvFile) {
      const envContent = `# Environment Variables
DATABASE_TYPE=${dbConfig.databaseType}
SCHEMA_NAME=${dbConfig.schemaName}
DB_HOST=localhost
DB_PORT=${dbConfig.databaseType === 'MongoDB' ? '27017' : '5432'}
DB_USER=username
DB_PASSWORD=password
DATABASE_URL=`;

      fs.writeFileSync('.env', envContent);
      console.log(chalk.green('.env file created successfully!'));
    }

    // Set up Prisma if selected
    if (dbConfig.usePrisma) {
      console.log(chalk.yellow('\nSetting up Prisma...'));
      shell.exec('npm install prisma --save-dev > /dev/null 2>&1');
      shell.exec('npx prisma init');
      console.log(chalk.green('Prisma has been set up successfully!'));
    }

    // Example database connection setup
    if (dbConfig.databaseType === 'MongoDB') {
      shell.exec('npm install mongoose > /dev/null 2>&1');
      fs.writeFileSync(
        'db.js',
        `
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/${dbConfig.schemaName}', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected successfully');
  } catch (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  }
};

export default connectDB;
`
      );
    }
  }

  // Initialize Git if requested
  if (versionControl) {
    try {
      shell.exec('git init > /dev/null 2>&1');
      console.log(chalk.yellow("Initialized git!"));
    } catch (error) {
      console.error(chalk.red('Git initialization failed:', error.message));
      process.exit(1);
    }
  }

  console.log(chalk.green('Project setup complete. Happy coding! 🎉'));
}

setupProject();
