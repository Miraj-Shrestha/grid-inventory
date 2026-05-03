# Grid Inventory System

A spatial grid-based inventory system built with Next.js 16, Prisma, and SQLite.

## Features
- **Spatial Grid:** 10x10 active equipment grid where items take up multiple blocks.
- **Drag and Drop:** Native HTML5 drag and drop between the Stash and the Grid.
- **Full CRUD:** Create, Read, Update, and Delete items.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Setup the database:
   ```bash
   npx prisma db push
   npx prisma generate
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Technologies Used
- Next.js 16 (App Router)
- React
- Prisma ORM
- SQLite
- Tailwind CSS
