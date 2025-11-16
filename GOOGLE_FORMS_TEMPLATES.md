# Google Forms Quick Setup Templates

Follow these instructions to quickly create both forms. Just copy and paste!

---

## FORM 1: Consultation Requests

### Step 1: Create the Form
1. Go to https://forms.google.com
2. Click **+ Blank** form
3. Click "Untitled form" at the top and change to: `NextPlay Results - Consultation Requests`

### Step 2: Add Questions (Copy-Paste Each)

**Question 1:**
- Question: `Name`
- Type: Short answer
- Toggle: **Required** ✓

**Question 2:**
- Question: `Email`
- Type: Short answer
- Click "⋮" menu → "Response validation"
  - Select: Text → Email
- Toggle: **Required** ✓

**Question 3:**
- Question: `Phone`
- Type: Short answer
- Click "⋮" menu → "Response validation"
  - Select: Regular expression → Matches → `^\d{10}$|^\(\d{3}\)\s?\d{3}-\d{4}$|^\d{3}-\d{3}-\d{4}$`
  - Custom error text: `Please enter a valid 10-digit phone number`
- Toggle: **Required** ✓
- Note: If "Regular expression" option isn't available, you can skip phone validation here since the website already validates it

**Question 4:**
- Question: `Preferred Date and Time`
- Type: Short answer
- Help text: `Example: January 15, 2025 at 2:00 PM`
- Toggle: **Required** ✓

**Question 5:**
- Question: `Message (Optional)`
- Type: Paragraph
- Help text: `Tell us briefly about your legal needs`
- Toggle: **Not Required**

### Step 3: Configure Settings
1. Click the gear icon (⚙️) at the top
2. Under "General":
   - Uncheck "Limit to 1 response"
3. Under "Presentation":
   - Confirmation message: `Thank you! We'll reach out shortly to schedule your consultation.`
4. Click "Save"

---

## FORM 2: Service Requests

### Step 1: Create the Form
1. Go to https://forms.google.com
2. Click **+ Blank** form
3. Click "Untitled form" at the top and change to: `NextPlay Results - Service Requests`

### Step 2: Add Questions (Copy-Paste Each)

**Question 1:**
- Question: `Name`
- Type: Short answer
- Toggle: **Required** ✓

**Question 2:**
- Question: `Email`
- Type: Short answer
- Click "⋮" menu → "Response validation"
  - Select: Text → Email
- Toggle: **Required** ✓

**Question 3:**
- Question: `Phone`
- Type: Short answer
- Click "⋮" menu → "Response validation"
  - Select: Regular expression → Matches → `^\d{10}$|^\(\d{3}\)\s?\d{3}-\d{4}$|^\d{3}-\d{3}-\d{4}$`
  - Custom error text: `Please enter a valid 10-digit phone number`
- Toggle: **Required** ✓
- Note: If "Regular expression" option isn't available, you can skip phone validation here since the website already validates it

**Question 4:**
- Question: `Service Type`
- Type: Multiple choice
- Options (add these exactly):
  1. `Demand Letter`
  2. `Medical Chronology`
  3. `Lemon Law Claim`
- Toggle: **Required** ✓

**Question 5:**
- Question: `Estimated Page Count`
- Type: Multiple choice
- Options:
  1. `Up to 250 pages`
  2. `250-500 pages`
  3. `500-1,000 pages`
  4. `1,000+ pages`
  5. `Not sure`
- Toggle: **Not Required**

**Question 6:**
- Question: `Deadline`
- Type: Short answer
- Help text: `Example: Urgent, 1 week, 2 weeks, etc.`
- Toggle: **Not Required**

**Question 7:**
- Question: `Case Description (Optional)`
- Type: Paragraph
- Help text: `Brief overview of your case`
- Toggle: **Not Required**

### Step 3: Configure Settings
1. Click the gear icon (⚙️) at the top
2. Under "General":
   - Uncheck "Limit to 1 response"
3. Under "Presentation":
   - Confirmation message: `Thank you! We'll review your request and get back to you shortly.`
4. Click "Save"

---

## NEXT: Get Your Form IDs and Entry IDs

After creating both forms, follow these steps:

### Get Form IDs

**For Consultation Form:**
1. Click "Send" button (top right)
2. Click the link icon (🔗)
3. Copy the URL - you'll see something like:
   ```
   https://docs.google.com/forms/d/e/1FAIpQLSc_XXXXXXXXXX/viewform
   ```
4. Save the part: `1FAIpQLSc_XXXXXXXXXX` (this is your Form ID)

**For Service Form:**
1. Repeat the same steps
2. Save that Form ID too

### Get Entry IDs (Easy Method)

**For EACH form:**

1. Open the form preview (the link from above)
2. Press `F12` to open Developer Tools
3. Click the "Console" tab
4. Paste this code and press Enter:

```javascript
const fields = {};
document.querySelectorAll('[name^="entry."]').forEach(el => {
    const label = el.getAttribute('aria-label') || el.parentElement.parentElement.querySelector('[role="heading"]')?.textContent || 'Unknown';
    const entry = el.getAttribute('name');
    fields[label.trim()] = entry;
});
console.table(fields);
```

5. You'll see a table with all field names and their entry IDs
6. **Copy these down!**

---

## FINAL STEP: Update script.js

Once you have all the IDs, open `/script.js` and update the `GOOGLE_FORMS_CONFIG` object (lines 7-32):

### Consultation Form:
```javascript
consultation: {
    formUrl: 'https://docs.google.com/forms/d/e/YOUR_FORM_ID_HERE/formResponse',
    fields: {
        name: 'entry.XXXXXXXXX',      // Replace with entry ID for "Name"
        email: 'entry.XXXXXXXXX',     // Replace with entry ID for "Email"
        phone: 'entry.XXXXXXXXX',     // Replace with entry ID for "Phone"
        dateTime: 'entry.XXXXXXXXX',  // Replace with entry ID for "Preferred Date and Time"
        message: 'entry.XXXXXXXXX'    // Replace with entry ID for "Message (Optional)"
    }
}
```

### Service Form:
```javascript
service: {
    formUrl: 'https://docs.google.com/forms/d/e/YOUR_FORM_ID_HERE/formResponse',
    fields: {
        name: 'entry.XXXXXXXXX',          // Replace with entry ID for "Name"
        email: 'entry.XXXXXXXXX',         // Replace with entry ID for "Email"
        phone: 'entry.XXXXXXXXX',         // Replace with entry ID for "Phone"
        serviceType: 'entry.XXXXXXXXX',   // Replace with entry ID for "Service Type"
        pageCount: 'entry.XXXXXXXXX',     // Replace with entry ID for "Estimated Page Count"
        deadline: 'entry.XXXXXXXXX',      // Replace with entry ID for "Deadline"
        caseDescription: 'entry.XXXXXXXXX' // Replace with entry ID for "Case Description"
    }
}
```

**IMPORTANT:**
- Change `/viewform` to `/formResponse` in the URLs!
- Make sure entry IDs match the question labels exactly

---

## Set Up Email Notifications

For both forms:

1. Open the form
2. Click **Responses** tab
3. Click the three dots (⋮)
4. Select **Get email notifications for new responses**
5. Enter your email address
6. Click **Save**

---

## Testing

1. Save `script.js` with your updated IDs
2. Open your website
3. Fill out both forms with test data
4. Check your Google Forms → Responses tab
5. Verify you received email notifications

---

## Example Entry Mapping

Here's an example of what your entry IDs might look like:

**Consultation Form:**
```javascript
{
    name: 'entry.123456789',
    email: 'entry.987654321',
    phone: 'entry.456789123',
    dateTime: 'entry.789123456',
    message: 'entry.321654987'
}
```

**Service Form:**
```javascript
{
    name: 'entry.111222333',
    email: 'entry.444555666',
    phone: 'entry.777888999',
    serviceType: 'entry.222333444',
    pageCount: 'entry.555666777',
    deadline: 'entry.888999111',
    caseDescription: 'entry.333444555'
}
```

Your actual entry IDs will be different - these are just examples!

---

## Quick Checklist

- [ ] Created Consultation Requests form
- [ ] Created Service Requests form
- [ ] Got both Form IDs
- [ ] Got all entry IDs for Consultation form (5 fields)
- [ ] Got all entry IDs for Service form (7 fields)
- [ ] Updated script.js with Form IDs
- [ ] Updated script.js with all entry IDs
- [ ] Changed `/viewform` to `/formResponse` in URLs
- [ ] Enabled email notifications for both forms
- [ ] Tested both forms on website
- [ ] Verified submissions appear in Google Forms
- [ ] Verified email notifications work

---

## Troubleshooting

**Problem:** Entry IDs not showing in console
- **Solution:** Make sure you're on the form preview page (the link URL), not the edit page

**Problem:** Forms created but can't find entry IDs
- **Solution:** Right-click on any input field → Inspect → Look for `name="entry.XXXXXXXXX"` in the HTML

**Problem:** Website forms submit but nothing in Google Forms
- **Solution:** Double-check that Form IDs and Entry IDs are correct and that you changed `/viewform` to `/formResponse`

**Problem:** No email notifications
- **Solution:** Check Google Forms settings → Responses → Make sure notifications are enabled

---

## Need Help?

If you get stuck:
1. Check that all question labels match exactly between the form and script.js
2. Use the browser console (F12) to check for errors
3. Test the Google Form directly first to make sure it works
4. Verify each entry ID is correctly mapped to its field
