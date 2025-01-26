# Backend Starter CLI

Welcome to **Backend Starter CLI**! 🚀 This command-line interface (CLI) tool helps developers quickly scaffold a backend project with customizable options like framework selection, database setup, and boilerplate code generation. Simplify your workflow and focus on building amazing applications!

---

## Features

- **Framework Selection**: Choose between popular backend frameworks like:
  - Express
  - NestJS
  - Koa
- **Database Setup**: Includes support for:
  - MongoDB
  - PostgreSQL
  - MySQL
- **Optional Prisma ORM**: Simplify database management with Prisma.
- **Automatic Environment Configuration**: Generate an `.env` file for your project.
- **Git Integration**: Optionally initialize a Git repository.
- **Custom Boilerplate Code**: Generate framework-specific starter code.

---

## Installation

To use the `backend-starter` CLI, first ensure you have [Node.js](https://nodejs.org/) (version 14 or higher) installed.

### Global Installation

Install the package globally using npm:
```bash
npm install -g backend-starte-cli
```

Now you can use the CLI anywhere with:
```bash
backend-starte-cli
```

### One-Time Use with NPX

Alternatively, you can use it without installation via npx:
```bash
npx backend-starte-cli
```

---

## Usage

### Starting a New Project

Run the CLI and follow the interactive prompts:
```bash
backend-starte-cli
```

You will be asked to provide the following details:
- **Project Name**: The name of your new project.
- **Initialize Git**: Whether to initialize a Git repository.
- **Framework**: Select your preferred backend framework.
- **Include Database Setup**: Choose whether to configure a database.

### Example Workflow

#### 1. Scaffold a Project
```bash
backend-starte-cli
```
*Example prompt interaction:*
```
? Enter your project name: my-awesome-backend
? Do you want to Initialize git? (Y/n) Yes
? Choose a backend framework: (Use arrow keys)
  > Express
    NestJS
    Koa
? Do you want to include a database setup? (Y/n) Yes
```

#### 2. Navigate to Your New Project
```bash
cd my-awesome-backend
```

#### 3. Install Dependencies
If you didn't install dependencies during setup, you can do so manually:
```bash
npm install
```

#### 4. Start Building 🚀
Start coding with your generated boilerplate!

---

## Project Structure

Below is an example structure of a project generated with the **Express** framework:
```
my-awesome-backend/
├── .env                 # Environment variables
├── package.json         # Project metadata and dependencies
├── node_modules/        # Installed dependencies
└── index.js              # Entry point for the application
```

---

## Requirements

- Node.js >= 14.0.0
- npm >= 6.0.0

---

## Contributing

We welcome contributions to improve **Backend Starter CLI**! To contribute:

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "feat: add new feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Feedback

If you encounter any issues or have suggestions, please open an [issue](https://github.com/your-repo/backend-starter/issues) or contact us.

---

### Happy Coding! 🎉
