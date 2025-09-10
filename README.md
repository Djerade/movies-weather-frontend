# Movies & Weather Frontend

A modern Next.js application built with TypeScript, featuring movies discovery and weather information.

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **UI Library**: Chakra UI
- **State Management**: Apollo GraphQL Client
- **Authentication**: NextAuth.js
- **Forms**: Formik with Yup validation
- **Code Quality**: ESLint + Prettier
- **Package Manager**: Yarn

## 📦 Features

- 🔐 Authentication with NextAuth.js
- 🎬 Movies discovery and management
- 🌤️ Weather information
- 📱 Responsive design with Chakra UI
- 🎨 Modern UI/UX
- 🔍 GraphQL integration with Apollo Client
- 📝 Form handling with Formik
- 🧹 Code formatting with Prettier
- 🔍 Linting with ESLint

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- Yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd movies-weather-frontend-1
```

2. Install dependencies:

```bash
yarn install
```

3. Set up environment variables:

```bash
cp env.example .env.local
```

Edit `.env.local` with your configuration:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:4000/graphql
```

4. Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard page
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── forms/            # Form components
│   └── ui/               # UI components
├── lib/                  # Utility libraries
│   ├── apollo-wrapper.tsx # Apollo Client setup
│   ├── auth-provider.tsx  # Auth provider
│   ├── auth.ts           # NextAuth configuration
│   └── formik-config.ts  # Formik configuration
└── types/                # TypeScript type definitions
```

## 🎯 Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn lint:fix` - Fix ESLint errors
- `yarn format` - Format code with Prettier
- `yarn format:check` - Check code formatting
- `yarn type-check` - Run TypeScript type checking

## 🔧 Configuration

### Chakra UI

The app is configured with Chakra UI for consistent styling and theming.

### Apollo GraphQL

GraphQL client is set up with authentication headers and error handling.

### NextAuth.js

Authentication is configured with credentials provider. You can extend it with other providers.

### Formik

Form handling is set up with common validation schemas and configurations.

### ESLint & Prettier

Code quality tools are configured with Next.js, TypeScript, and Prettier rules.

## 🚀 Deployment

The application can be deployed to any platform that supports Next.js:

- [Vercel](https://vercel.com) (recommended)
- [Netlify](https://netlify.com)
- [Railway](https://railway.app)
- [Docker](https://docker.com)

## 📝 License

This project is licensed under the MIT License.
