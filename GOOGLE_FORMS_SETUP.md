# Google Forms Setup — Request Form Backend

The website's "Request a document service" form posts submissions into a Google Form,
which stores them in your Google account (and can email you on every submission).
Until the form below is created and wired, the site falls back to opening a
pre-filled email to team@nextplayresults.com — no request is lost either way.

## Step 1 — Create the form (one time, ~5 minutes)

1. Go to https://forms.google.com while signed in as the account that should receive requests
2. Click **+ Blank** form
3. Title: `NextPlay Results — Service Requests`
4. Add these questions **in this order**, with these exact types:

| # | Question | Type | Required? |
|---|----------|------|-----------|
| 1 | Name | Short answer | No |
| 2 | Email | Short answer | No |
| 3 | Phone | Short answer | No |
| 4 | Service Type | **Short answer** | No |
| 5 | Estimated Page Count | Short answer | No |
| 6 | Deadline | Short answer | No |
| 7 | Case Description | Paragraph | No |

Two rules that keep this maintenance-free:

- **Service Type must be Short answer, not Multiple choice.** The website's dropdown
  already constrains the choices and posts the chosen text. Short answer accepts any
  value, so adding or renaming services on the website never requires editing this form.
- **Leave every question NOT required.** The website already enforces required fields.
  A required question here would silently reject any submission missing it.

5. Under **Responses** tab → click the three-dot menu → **Get email notifications
   for new responses** (this is what makes requests land in the inbox)

## Step 2 — Send the link

Click **Send** → link icon → copy the URL and send it over. Entry IDs will be
extracted from it and wired into the site (`GOOGLE_FORM` config in the app).

## Future changes

- **Edit the existing form — never create a new one.** Every question has a permanent
  `entry.N` ID. Rewording a question keeps its ID; a new form means all-new IDs and a
  full re-wire of the site.
- **Renaming/adding services on the website:** no form change needed (rule above).
- **Adding a brand-new field** (e.g. "Case number"): add one Short answer question to
  this form, then add the matching input + one entry-ID line in the site config.
- **Never delete and re-add a question** — that destroys its ID. Reword instead.

## Responses

All submissions appear under the form's **Responses** tab, and can be linked to a
Google Sheet (Responses → Sheets icon) for a running spreadsheet of every request.
