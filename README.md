# Keene's Linkhub

A sleek, premium Linktree alternative built with **Vite**, **React 19**, **Tailwind CSS v4**, and **Motion**. It shares its design tokens (zinc + signal orange, Geist, Phosphor icons) with my [portfolio](https://koala33## Features

- **Light, dark, and system themes**, resolved before first paint.
- **Short branded intro** on the first visit of a session. Skipped under `prefers-reduced-motion`.
- **Save contact**: downloads a `.vcf` card built from `constants.ts`.
- **Résumé viewer**: inline dialog on desktop, native PDF viewer on phones, plus a direct download.
- **Share and copy**: Web Share API with a copy-link fallback, and one-tap email copy.
- **Email signature assets** live in `public/email-sig/`.

All personal content (links, contact details, vCard) lives in `constants.ts`.

(`Koala3353/Koala3353`). 

## Architecture & Automation

### Automated Deployment
This project uses **GitHub Actions** for CI/CD. The deployment workflow (`deploy.yml`) is triggered on:
- Pushes to the `main` branch
- `repository_dispatch` events labeled `resume-updated`

### Resume Synchronization Pipeline
Instead of manually updating the PDF on this site, it fetches the latest version directly from another repository:
1. When the `BRIGADO-Resume.pdf` file is updated in the central repository (`Koala3353/Koala3353`), it fires a `repository_dispatch` event.
2. The GitHub Action in this repository catches the event and triggers a fresh deployment.
3. During the `prebuild` step, the latest PDF is downloaded into the `public/` folder using `curl`.
4. Vite bundles the application with the latest PDF.

## Run Locally

**Prerequisites:**  Node.js (v20+ recommended)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Koala3353/kbrigado-links.git
   cd kbrigado-links
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the local development server:**
   ```bash
   npm run dev
   ```
   *(Note: Running `npm run build` locally will execute the `prebuild` script and download the remote PDF into your `public` folder).*
