# API Hook Builder (api-hook-gen)

**API Hook Builder** is a blazing-fast, client-side tool designed to instantly generate production-ready React hooks, fetch functions, and comprehensive TypeScript interfaces from any JSON API endpoint. 

Just paste your endpoint URL and instantly receive typed code ready to be pasted into your project—saving you hours of writing boilerplate code.

 

---

## 🚀 Features

- **Instant Generation:** No sign-up, no CLI configuration. Paste the URL, hit generate, and copy the code.
- **Type-Safe Output:** The inference engine fetches the response, recursively walks through every key, and builds full TypeScript interfaces (including nested objects and arrays).
- **Production-Ready Code:** Outputs a generic `fetch` wrapper and a custom **TanStack (React) Query** hook ready for immediate use.
- **100% Client-Side:** No data is stored or proxied to a server. The API fetch runs directly from your browser.
- **Copy-Paste Ready:** One-click copy for the entire generated code block.

## 🏗 Architecture

The application is built with a pure client-side architecture to ensure speed and data privacy:

1. **User Input (`EndpointForm`)**: The user provides a REST API endpoint (must support CORS for browser fetching).
2. **Inference Engine (`lib/codeGenerator`)**: The core engine fetches the JSON response from the provided URL, parses the payload, and infers the data schema recursively.
3. **Code Generation**: The inferred schema is mapped to TypeScript interfaces. The engine then builds an asynchronous fetch function and a React Query hook tailored to the types.
4. **Display (`CodeOutput`)**: The generated output is formatted and displayed with syntax highlighting for the user to copy.

## 🛠 Tech Stack

This project is built using modern web development standards and UI libraries:

- **Frontend Framework:** [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) (Built on top of Radix UI primitives)
- **Icons:** [Lucide React](https://lucide.dev/)
- **State/Data Management (for generated code):** [TanStack Query](https://tanstack.com/query/latest)

## 🏃 Getting Started (Local Development)

To run this project locally, you'll need [Node.js](https://nodejs.org/) installed on your machine.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/biswajit-sarkar-007/api-hook-builder.git
   cd api-hook-builder
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Open `http://localhost:5173` in your browser to see the app running.

## 🤝 How to Contribute

Contributions, issues, and feature requests are always welcome! We want to make API Hook Builder the best tool for frontend engineers.

1. **Fork the repository** on GitHub.
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_GITHUB_USERNAME/api-hook-builder.git
   ```
3. **Create a new branch** for your feature or bugfix:
   ```bash
   git checkout -b feature/amazing-new-feature
   ```
4. **Make your changes** and commit them with descriptive messages:
   ```bash
   git commit -m "feat: add support for axios generation"
   ```
5. **Push your branch** to your fork:
   ```bash
   git push origin feature/amazing-new-feature
   ```
6. **Open a Pull Request** against the `main` branch of the original repository.

### Development Guidelines
- Ensure your code follows the existing style (TypeScript strict mode).
- Run `npm run lint` to check for formatting or linting errors.
- Test the generator thoroughly if you are modifying the core `codeGenerator` logic to ensure nested arrays and objects still correctly infer types.

---

*Built for frontend engineers who value their time.*