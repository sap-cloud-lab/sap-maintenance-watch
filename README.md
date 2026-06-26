# SAP S/4HANA Cloud Maintenance Watch

Static public website and calendar feed for SAP S/4HANA Cloud Public Edition 3-system landscape maintenance watch windows.

## Public URLs

- Website: `https://sap-cloud-lab.github.io/sap-maintenance-watch/`
- Calendar subscription: `https://sap-cloud-lab.github.io/sap-maintenance-watch/SAP-S4HANA-Cloud-Maintenance-Watch.ics`

## Outlook Calendar Subscription

Use a subscription rather than importing the `.ics` file. A subscription keeps Outlook connected to the hosted feed when the schedule changes.

1. Open Outlook on the web.
2. Go to Calendar.
3. Select **Add calendar**.
4. Choose **Subscribe from web**.
5. Paste the hosted calendar subscription URL.
6. Name it `SAP S/4HANA Cloud Maintenance Watch`.
7. Save.

The feed is published as free time with reminder alarms included in the calendar file.

## Automated Refresh

The GitHub Actions workflow in `.github/workflows/pages.yml` runs every day at 7:00 AM Australia/Sydney. It checks SAP's public SAP S/4HANA Cloud Public Edition 3-system landscape schedule PDF, regenerates `data.js` and `SAP-S4HANA-Cloud-Maintenance-Watch.ics` only when the derived schedule data changes, commits the update, and redeploys GitHub Pages.

Source checked by the updater:

<https://www.sap.com/docs/download/2021/09/58ffa59e-f97d-0010-bca6-c68f7e60039b.pdf>

## Local Refresh

```sh
python -m pip install -r requirements.txt
python scripts/update_schedule.py
```

The website itself is static and does not require a build step.
