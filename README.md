<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Keene's Linkhub

A sleek, premium Linktree alternative built with **Vite**, **React**, and **Tailwind CSS**. It features a modern dark theme, smooth glassmorphism, dynamic animations, and a centralized resume synchronization pipeline.

## Features

- 🎨 **Premium Dark Theme:** Modern color palette featuring charcoal/navy bases with cyan-teal accents and glowing card hover states.
- 📱 **Responsive Design:** Works flawlessly on desktop and mobile.
- 📇 **vCard Generation:** Automatically generates and downloads a `.vcf` contact file so visitors can easily save the profile to their phone's contacts.
- 🔄 **Cross-Repo Resume Sync:** The built-in PDF resume is synchronized automatically with a central repository (`Koala3353/Koala3353`). 

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
