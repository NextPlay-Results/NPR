# Google Forms Integration Setup Guide

This guide will help you connect your NextPlay Results website forms to Google Forms so you can receive submissions via email.

## Overview

Your website has two forms:
1. **Consultation Request Form** - For scheduling consultations
2. **Service Request Form** - For requesting document services

Both forms will submit data directly to Google Forms, which will notify you via email.

---

## Step 1: Create Google Forms

### Form 1: Consultation Requests

1. Go to [https://forms.google.com](https://forms.google.com)
2. Click **+ Blank** to create a new form
3. Title: `NextPlay Results - Consultation Requests`
4. Add the following questions in this exact order:

| Question | Type | Required? |
|----------|------|-----------|
| Name | Short answer | Yes ✓ |
| Email | Short answer | Yes ✓ |
| Phone | Short answer | Yes ✓ |
| Preferred Date/Time | Short answer | Yes ✓ |
| Message | Paragraph | No |

### Form 2: Service Requests

1. Click **+ Blank** to create another form
2. Title: `NextPlay Results - Service Requests`
3. Add the following questions in this exact order:

| Question | Type | Options | Required? |
|----------|------|---------|-----------|
| Name | Short answer | - | Yes ✓ |
| Email | Short answer | - | Yes ✓ |
| Phone | Short answer | - | Yes ✓ |
| Service Type | Multiple choice | Demand Letter<br>Medical Chronology<br>Lemon Law Claim | Yes ✓ |
| Page Count | Short answer | - | No |
| Deadline | Short answer | - | No |
| Case Description | Paragraph | - | No |

---

## Step 2: Get Form IDs

For **each** of your two forms:

1. Click the **Send** button (top right)
2. Click the **Link** icon (🔗)
3. Copy the URL - it looks like:
   ```
   https://docs.google.com/forms/d/e/1FAIpQLSc_XXXXXXXXXXXXXXX/viewform
   ```
4. Save the part after `/d/e/` and before `/viewform` - this is your **FORM_ID**

Example:
- Full URL: `https://docs.google.com/forms/d/e/1FAIpQLSc_abc123xyz/viewform`
- **FORM_ID**: `1FAIpQLSc_abc123xyz`

---

## Step 3: Get Entry IDs

For **each** form, you need to find the entry IDs for every field:

1. Open the form preview link from Step 2
2. Right-click anywhere on the page
3. Select **Inspect** or **Inspect Element**
4. Press `Ctrl+F` (Windows) or `Cmd+F` (Mac) in the inspector
5. Search for: `entry.`
6. You'll see HTML like:
   ```html
   <input name="entry.123456789" type="text" ...>
   ```
7. Write down each `entry.XXXXXXXXX` value for each field

### Quick Method:

Open each form and paste this into the browser console (F12 → Console tab):

```javascript
document.querySelectorAll('[name^="entry."]').forEach(el => {
    console.log(el.getAttribute('aria-label') + ': ' + el.getAttribute('name'));
});
```

This will list all fields with their entry IDs.

---

## Step 4: Update script.js

1. Open `/script.js` in your code editor
2. Find the `GOOGLE_FORMS_CONFIG` object at the top of the file (around line 7)
3. Replace the placeholders with your actual values

### Example:

**Before:**
```javascript
consultation: {
    formUrl: 'https://docs.google.com/forms/d/e/YOUR_CONSULTATION_FORM_ID/formResponse',
    fields: {
        name: 'entry.XXXXXXXXX',
        email: 'entry.XXXXXXXXX',
        // ...
    }
}
```

**After** (with your actual values):
```javascript
consultation: {
    formUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSc_abc123xyz/formResponse',
    fields: {
        name: 'entry.987654321',
        email: 'entry.123456789',
        phone: 'entry.456789123',
        dateTime: 'entry.789123456',
        message: 'entry.321654987'
    }
}
```

⚠️ **Important:** Change `/viewform` to `/formResponse` in the URL!

---

## Step 5: Set Up Email Notifications

### Option A: Built-in Notifications (Recommended)

For each Google Form:

1. Open the form
2. Click the **Responses** tab
3. Click the three dots menu (⋮)
4. Select **Get email notifications for new responses**
5. Enter your email address

### Option B: Email Add-on (More Features)

1. In the form, click the puzzle piece icon (Add-ons)
2. Search for **"Email Notifications for Google Forms"** by Digital Inspiration
3. Install and configure with your email

---

## Step 6: Test Everything

1. Save `script.js`
2. Deploy your website or refresh your local preview
3. Go to each form on your website
4. Fill out and submit test data
5. Check your Google Forms dashboard:
   - Go to [https://forms.google.com](https://forms.google.com)
   - Open each form
   - Click **Responses** tab
   - Verify your test submission appears
6. Check your email for notifications

---

## Troubleshooting

### Forms don't submit
- **Check browser console** (F12 → Console tab) for errors
- Verify form URLs end with `/formResponse` not `/viewform`
- Make sure all entry IDs match exactly

### Data doesn't appear in Google Forms
- Double-check entry IDs are correct
- Ensure field names in config match the form fields
- Test the Google Form directly first to ensure it's working

### No email notifications
- Verify email notifications are enabled in Google Forms
- Check spam folder
- Confirm the email address is correct

### Entry IDs not found
- Make sure you're inspecting the form preview, not the edit page
- Look for `name="entry.XXXXXXXXX"` attributes in the HTML
- Try the JavaScript console method described in Step 3

---

## Quick Reference

### Consultation Form Fields

```javascript
GOOGLE_FORMS_CONFIG.consultation.fields = {
    name:     'entry.XXXXXXXXX',  // Name field
    email:    'entry.XXXXXXXXX',  // Email field
    phone:    'entry.XXXXXXXXX',  // Phone field
    dateTime: 'entry.XXXXXXXXX',  // Preferred Date/Time field
    message:  'entry.XXXXXXXXX'   // Message field
}
```

### Service Form Fields

```javascript
GOOGLE_FORMS_CONFIG.service.fields = {
    name:            'entry.XXXXXXXXX',  // Name field
    email:           'entry.XXXXXXXXX',  // Email field
    phone:           'entry.XXXXXXXXX',  // Phone field
    serviceType:     'entry.XXXXXXXXX',  // Service Type field
    pageCount:       'entry.XXXXXXXXX',  // Page Count field
    deadline:        'entry.XXXXXXXXX',  // Deadline field
    caseDescription: 'entry.XXXXXXXXX'   // Case Description field
}
```

---

## Security & Privacy

- ✅ All submissions go directly to your Google Forms
- ✅ No data is stored on your website
- ✅ Google Forms are secure and HIPAA-compliant when configured properly
- ✅ You control who has access to the form responses
- ✅ All data is encrypted in transit

---

## Support

If you need help:
1. Check the troubleshooting section above
2. Review the detailed comments in `script.js`
3. Test with browser developer tools (F12)
4. Verify each Google Form works when submitted directly

---

## What Happens When a User Submits?

1. User fills out form on your website
2. JavaScript validates the input
3. Data is sent to Google Forms via AJAX
4. Google Forms stores the response
5. You receive an email notification
6. User sees success message on website
7. Form clears automatically

No page refresh required! ✨
