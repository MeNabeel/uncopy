# Uncopy 🚀

A modern, high-performance publishing platform & blog application built with Next.js 15, React 19, Supabase, and TipTap rich-text editing.

## 🌟 Key Features

- **Rich Text Editor**: Powered by TipTap with support for images, tables, YouTube embeds, and links.
- **Admin Dashboard**: Content management, post publishing, and category administration.
- **Supabase Integration**: Authentication and database management with `@supabase/ssr`.
- **Modern UI & Styling**: Built with Tailwind CSS and Lucide React icons.
- **SEO & Performance**: Optimized rendering with Next.js App Router and MDX support.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Database & Auth**: [Supabase](https://supabase.com/)
- **Styling**: Tailwind CSS & PostCSS
- **Rich Text**: TipTap Editor Suite

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MeNabeel/uncopy.git
   cd uncopy
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Copy `.env.example` to `.env.local` and add your Supabase credentials:
   ```bash
   cp .env.example .env.local
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📜 Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.

## 📄 License

MIT
