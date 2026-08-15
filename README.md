# AdSense Detective

<p align="center">
  <img src="https://raw.githubusercontent.com/isixe/AdSenseDetective/refs/heads/main/public/favicon.ico" alt="AdSense Detective" width="100" />
</p>

<p align="center">
 A professional tool for analyzing websites for Google AdSense ownership verification, script implementation, and ad unit detection.
</p>

## Overview

AdSense Detective helps you quickly audit any website to verify AdSense integration. It checks for ownership verification, detects ad slots, and provides detailed reports on ad implementation.

## Features

- AdSense verification meta tags detection
- ads.txt file presence and validity
- Core AdSense script implementation checks
- Ownership verification status

## Tech Stack

- **Framework**: Next.js 15.3
- **UI Components**: Shadcn-ui
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## Usage

1. **Enter a Website URL:**  
   Input the URL of the website you wish to analyze (e.g., `https://example.com`).

2. **Check Website:**  
   The tool inspects the website for:
   - AdSense ownership verification tags.
   - Presence of `ads.txt` files.
   - Google AdSense core scripts.
   - All detected HTML and AMP ad units.

3. **Review Results:**  
   Get a clear report on:
   - Verification status and detected issues.
   - List of all ad units found (with client/slot IDs).

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/isixe/adsense-detective.git
   ```

2. Navigate to the project directory:

   ```sh
   cd adsense-detective
   ```

3. Install dependencies:

   ```sh
   pnpm install
   ```

## Usage

Start the development server:

```sh
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── page.tsx      # Main landing page
│   │   ├── layout.tsx    # Root layout
│   │   └── actions.ts   # Server actions
│   ├── components/       # React components
│   │   ├── ui/          # Reusable UI components
│   │   ├── view/        # Page view components
│   │   └── layout/      # Layout components
│   ├── lib/             # Utility functions
│   ├── styles/          # Global styles
│   └── types/           # TypeScript definitions
├── public/              # Static assets
├── next.config.ts       # Next.js configuration
├── tailwind.config.ts   # Tailwind configuration
└── package.json         # Dependencies
```

## License

This project is licensed under the [MIT License](LICENSE).
