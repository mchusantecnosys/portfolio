# v3

Third iteration of personal portfolio website built with modern Jekyll 4, Gulp 5, and Node.js.

> 📢 **PSA for those who want to fork or copy this repo and use it for their own site:**
>
> Please be a decent person and give me proper credit by linking back to the original author's website! Refer to this handy [quora post](https://www.quora.com/Is-it-bad-to-copy-other-peoples-code) if you're not sure.

## Requirements & Tech Stack

- **Node.js**: `v20+` (compatible with `v22` / `v23`)
- **Gulp**: `v5.x`
- **Ruby**: `3.x` / `4.x`
- **Jekyll**: `4.3+` (managed via `Bundler`, includes `webrick` support)

## Getting Started

1. **Install Ruby dependencies**:
   ```bash
   bundle install
   ```
   *(Alternatively, if not using Bundler: `gem install jekyll jekyll-minifier jekyll-sitemap webrick`)*

2. **Install Node.js dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm start
   ```
   This will compile Sass and JS assets, build the site with Jekyll, and launch BrowserSync with hot reloading.

4. **Build for production**:
   ```bash
   npm run build
   ```
