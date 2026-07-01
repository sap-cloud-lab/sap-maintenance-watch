# SAP S/4HANA Cloud Maintenance Watch

Public website and calendar feed for SAP S/4HANA Cloud Public Edition maintenance, upgrade, hotfix, RASD, and release-watch information.

## Public URLs

- Website: https://sap-cloud-lab.github.io/sap-maintenance-watch/
- Calendar feed: https://sap-cloud-lab.github.io/sap-maintenance-watch/SAP-S4HANA-Cloud-Maintenance-Watch.ics

## What Is Published

This repository publishes only public/static website files:

- `index.html`
- `styles.css`
- `script.js`
- `data.js`
- `SAP-S4HANA-Cloud-Maintenance-Watch.ics`
- `source-state.json`
- `assets/`

Do not commit SAP S-user IDs, passwords, cookies, session tokens, browser profiles, `.env` files, or downloaded private SAP-for-Me attachments that are not allowed to be redistributed.

## Secure SAP Access

If an authenticated SAP-for-Me updater is added later, credentials must be stored only in GitHub repository secrets:

1. Open the repository on GitHub.
2. Go to **Settings**.
3. Open **Secrets and variables**.
4. Choose **Actions**.
5. Add repository secrets such as:
   - `SAP_SUSER_ID`
   - `SAP_SUSER_PASSWORD`

Important: do not paste credentials into source files, workflow YAML, issues, commits, pull requests, or chat. If a password was ever pasted into chat, change it before using it in GitHub Secrets.

## MFA Reality Check

Normal SAP S-user login can require MFA, trusted-browser approval, or SSO renewal. A GitHub Action cannot reliably complete those interactive prompts by itself. The reliable model is:

- refresh public SAP sources automatically;
- use subscribed SAP-for-Me or SAP Cloud ALM notifications where possible;
- use authenticated SAP sources only when a non-interactive technical credential or an already-approved integration is available.

## Publishing

GitHub Pages publishes automatically on every push to `main` using `.github/workflows/pages.yml`.
