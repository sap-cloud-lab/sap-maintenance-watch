# SAP Maintenance Watch Website Publishing Guide

This folder contains a static website. It does not need a build step.

## Files Required

Keep these files together when publishing:

- `index.html`
- `styles.css`
- `script.js`
- `data.js`
- `SAP-S4HANA-Cloud-Maintenance-Watch.ics`
- `assets/sap-maintenance-calendar-page5.jpg`

`SAP-Maintenance-Watch-Shareable.html` is the one-file fallback version for email, OneDrive, or SharePoint sharing. It is not required when publishing as a normal website.

## Recommended Option: Netlify Drag And Drop

This is the simplest path and does not require Git.

1. On your personal computer, go to `https://app.netlify.com/drop`.
2. Sign in or create a Netlify account.
3. Drag the folder named `sap-maintenance-watch-publish` onto the page.
4. Netlify will publish the site and give you a public URL.
5. Open the URL and test:
   - schedule loads
   - filters/search work
   - `Download .ics` downloads the calendar file

## Option: GitHub Pages

Use this if you want the site hosted from GitHub.

1. Install Git from `https://git-scm.com/download/win`.
2. Create a new GitHub repository, for example `sap-maintenance-watch`.
3. Upload the contents of `sap-maintenance-watch-publish` to the repository root.
4. In GitHub, open repository `Settings`.
5. Go to `Pages`.
6. Under `Build and deployment`, choose:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
7. Save.
8. GitHub will provide a Pages URL after the first deployment finishes.

## Option: Cloudflare Pages

1. Go to `https://pages.cloudflare.com`.
2. Create a Pages project.
3. Choose direct upload if available, or connect a GitHub repository.
4. Use this as a static site:
   - Build command: leave blank
   - Output directory: `/`
5. Upload the contents of `sap-maintenance-watch-publish`.

## After Publishing

Share the final `https://...` URL with others.

Do not share the local `file:///C:/...` path; that only works on the original laptop.

## Updating Later

When SAP changes the schedule:

1. Update the local files in this folder.
2. Re-create or re-upload the publish package.
3. Re-publish using the same hosting service.

