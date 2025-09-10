# Movies & Weather Frontend

A modern Next.js application for discovering movies and checking weather information.

## Tech Stack

- **Framework**: Next.js 15.5.2 (App Router)
- **Language**: TypeScript
- **UI Library**: Chakra UI v3
- **GraphQL Client**: Apollo Client
- **Authentication**: Auth.js (NextAuth)
- **Code Quality**: ESLint + Prettier
- **Styling**: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+ 
- Yarn or npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   yarn install
   ```

3. Create environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Update the environment variables in `.env.local` with your actual values

5. Run the development server:
   ```bash
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint
- `yarn lint:fix` - Fix ESLint errors
- `yarn format` - Format code with Prettier
- `yarn type-check` - Run TypeScript type checking

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── forms/            # Form components
│   └── ui/               # UI components
├── lib/                  # Utility libraries
│   ├── apollo-wrapper.tsx # Apollo Client setup
│   ├── auth-provider.tsx  # Auth provider
│   └── auth.ts           # Auth configuration
└── types/                # TypeScript type definitions
    └── index.ts
```

## Features

- 🔐 Authentication with Auth.js
- 🎬 Movie discovery (ready for integration)
- 🌤️ Weather information (ready for integration)
- 🎨 Modern UI with Chakra UI
- 📱 Responsive design
- 🔍 TypeScript for type safety
- 🚀 Optimized with Next.js App Router

## Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:4000/graphql
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.
