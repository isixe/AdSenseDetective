# AdSense Detective

AdSense Detective is a tool designed to help you quickly analyze any website for Google AdSense ownership verification, script implementation, and ad unit detection (both HTML and AMP).

## Key Features

- **Verify Setup:**

  - Checks for AdSense verification meta tags, `ads.txt` files, and core AdSense script implementations.
  - Ensures proper ownership and validates eligibility for ad serving.

- **Detect Ad Slots:**
  - Identifies all HTML and AMP ad units on a web page.
  - Details each ad unit's client and slot IDs for quick verification.

## How It Works

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

Clone the repository:

```bash
git clone https://github.com/isixe/adsense-detective.git
cd adsense-detective
```

Install dependencies:

```bash
pnpm install
```

## Usage

Start the application (adjust for your framework/environment):

```bash
pnpm dev
```

Then open the interface and enter the website URL you want to check.

## License

This project is licensed under the MIT License.
