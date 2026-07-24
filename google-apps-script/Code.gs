// ============================================
// Google Apps Script - SBRS Contact Form Handler
// ============================================
// Setup:
// 1. Go to https://script.google.com
// 2. Create new project
// 3. Paste this code
// 4. Update ADMIN_EMAIL below
// 5. Run setup() once to create the sheet
// 6. Deploy → New deployment → Web app → Execute as Me → Anyone can access
// 7. (Optional) To keep Supabase free tier alive:
//    a. Run keepAlive() manually once to test (View > Logs to check)
//    b. Go to Triggers (clock icon) → Add Trigger
//    c. Function: keepAlive, Time-driven: Day timer → Every 3 days
// ============================================

const ADMIN_EMAIL = 'karkalasbrs2002@gmail.com'; // Admin email for notifications
const SPREADSHEET_NAME = 'SBRS Contact Form Responses';

// Supabase config for keep-alive ping
const SUPABASE_URL = 'https://rqrbwbqpzacevxfqfyfy.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_PX4bt4QoH2iZ6BkX0KavDg_D-OoTWvF';

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ status: 'ok', message: 'SBRS Contact Form API' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const data = e.parameter;

    // Route to appropriate handler based on type
    if (data.type === 'feedback') {
      return handleFeedback(data);
    }

    // Default: contact form
    const name = data.name || '';
    const email = data.email || '';
    const phone = data.phone || 'Not provided';
    const subject = data.subject || 'General Inquiry';
    const message = data.message || '';
    const timestamp = data.timestamp || new Date().toISOString();

    // Save to Google Sheet
    saveToSheet(timestamp, name, email, phone, subject, message);

    // Send emails individually (catch errors so one failure doesn't block the other)
    try { sendUserEmail(name, email, subject, message); } catch (e) { console.error('User email failed: ' + e); }
    try { sendAdminEmail(name, email, phone, subject, message); } catch (e) { console.error('Admin email failed: ' + e); }

    return ContentService.createTextOutput(JSON.stringify({ status: 'success', message: 'Form submitted successfully' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function saveToSheet(timestamp, name, email, phone, subject, message) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Responses');

  if (!sheet) {
    sheet = ss.insertSheet('Responses');
    sheet.appendRow(['Timestamp', 'Name', 'Email', 'Phone', 'Subject', 'Message']);
    sheet.getRange(1, 1, 1, 6).setFontWeight('bold').setBackground('#1a1a2e').setFontColor('#ffffff');
    sheet.setColumnWidth(1, 180);
    sheet.setColumnWidth(2, 200);
    sheet.setColumnWidth(3, 220);
    sheet.setColumnWidth(4, 150);
    sheet.setColumnWidth(5, 150);
    sheet.setColumnWidth(6, 400);
  }

  sheet.appendRow([timestamp, name, email, phone, subject, message]);
}

function sendUserEmail(name, email, subject, message) {
  const htmlBody = getUserEmailTemplate(name, subject, message);

  MailApp.sendEmail({
    to: email,
    name: 'Sri Bhuvanendra Residential School',
    subject: 'We received your message - SBRS',
    htmlBody: htmlBody,
  });
}

function sendAdminEmail(name, email, phone, subject, message) {
  const htmlBody = getAdminEmailTemplate(name, email, phone, subject, message);

  MailApp.sendEmail({
    to: ADMIN_EMAIL,
    name: 'SBRS Website Notifications',
    subject: 'New Contact Form Submission - ' + subject,
    htmlBody: htmlBody,
  });
}

function getUserEmailTemplate(name, subject, message) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 30px 40px; text-align: center;">
              <img src="https://sbrs.sribhuvanendra.org/images/logo.webp" alt="SBRS Logo" width="70" style="border-radius:50%;margin-bottom:12px;" />
              <h1 style="color:#ffffff; margin:0; font-size:20px; font-weight:600; letter-spacing:0.5px;">
                Sri Bhuvanendra Residential School
              </h1>
              <p style="color:#c9a84c; margin:6px 0 0; font-size:12px; letter-spacing:2px; text-transform:uppercase;">
                Karkala, Karnataka
              </p>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding:35px 40px 10px;">
              <h2 style="color:#1a1a2e; margin:0 0 8px; font-size:22px;">Dear ${name},</h2>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:10px 40px;">
              <p style="color:#555; line-height:1.7; font-size:15px; margin:0 0 15px;">
                Thank you for reaching out to us! We have received your message and our team will get back to you within <strong>24-48 hours</strong>.
              </p>
              <div style="background-color:#f8f9fa; border-left:4px solid #c9a84c; padding:15px 20px; border-radius:0 8px 8px 0; margin:20px 0;">
                <p style="color:#888; font-size:11px; text-transform:uppercase; letter-spacing:1px; margin:0 0 6px;">Your Message Details</p>
                <p style="color:#333; font-size:14px; margin:0 0 6px;"><strong>Subject:</strong> ${subject}</p>
                <p style="color:#555; font-size:14px; margin:0; line-height:1.6;">${message}</p>
              </div>
            </td>
          </tr>

          <!-- Closing -->
          <tr>
            <td style="padding:10px 40px 30px;">
              <p style="color:#555; line-height:1.7; font-size:15px; margin:0 0 15px;">
                If your query is urgent, please feel free to call us at <strong>+91 98445 48735</strong> or email us at <a href="mailto:sbrs2002@gmail.com" style="color:#c9a84c; text-decoration:none;">sbrs2002@gmail.com</a>.
              </p>
              <p style="color:#555; font-size:15px; margin:0;">Warm regards,</p>
              <p style="color:#1a1a2e; font-size:15px; font-weight:600; margin:4px 0 0;">Sri Bhuvanendra Residential School</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#1a1a2e; padding:25px 40px; text-align:center;">
              <p style="color:#999; font-size:12px; margin:0 0 8px;">
                Madhav Nagar, Karkala, Udupi District, Karnataka — 574104
              </p>
              <p style="margin:0 0 12px;">
                <a href="https://sbrs.sribhuvanendra.org/" style="color:#c9a84c; text-decoration:none; font-size:13px; font-weight:500;">Visit Website</a>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <a href="tel:+919844548735" style="color:#c9a84c; text-decoration:none; font-size:13px;">+91 98445 48735</a>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <a href="mailto:sbrs2002@gmail.com" style="color:#c9a84c; text-decoration:none; font-size:13px;">Email Us</a>
              </p>
              <p style="color:#666; font-size:11px; margin:0;">
                &copy; ${new Date().getFullYear()} Sri Bhuvanendra Residential School. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function getAdminEmailTemplate(name, email, phone, subject, message) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #c9a84c 0%, #b8942e 100%); padding: 25px 40px; text-align: center;">
              <h1 style="color:#ffffff; margin:0; font-size:18px; font-weight:600;">
                New Contact Form Submission
              </h1>
              <p style="color:rgba(255,255,255,0.8); margin:6px 0 0; font-size:12px; letter-spacing:1px; text-transform:uppercase;">
                SBRS Website
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:30px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:12px 0; border-bottom:1px solid #eee;">
                    <span style="color:#888; font-size:12px; text-transform:uppercase; letter-spacing:1px;">Name</span><br/>
                    <span style="color:#1a1a2e; font-size:15px; font-weight:600;">${name}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0; border-bottom:1px solid #eee;">
                    <span style="color:#888; font-size:12px; text-transform:uppercase; letter-spacing:1px;">Email</span><br/>
                    <a href="mailto:${email}" style="color:#c9a84c; font-size:15px; text-decoration:none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0; border-bottom:1px solid #eee;">
                    <span style="color:#888; font-size:12px; text-transform:uppercase; letter-spacing:1px;">Phone</span><br/>
                    <a href="tel:${phone}" style="color:#1a1a2e; font-size:15px; text-decoration:none;">${phone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0; border-bottom:1px solid #eee;">
                    <span style="color:#888; font-size:12px; text-transform:uppercase; letter-spacing:1px;">Subject</span><br/>
                    <span style="color:#1a1a2e; font-size:15px; font-weight:600;">${subject}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;">
                    <span style="color:#888; font-size:12px; text-transform:uppercase; letter-spacing:1px;">Message</span><br/>
                    <div style="background-color:#f8f9fa; border-left:4px solid #c9a84c; padding:15px; border-radius:0 8px 8px 0; margin-top:8px;">
                      <p style="color:#333; font-size:14px; line-height:1.7; margin:0;">${message}</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Action -->
          <tr>
            <td style="padding:0 40px 30px; text-align:center;">
              <a href="mailto:${email}?subject=Re: ${subject}" style="display:inline-block; background-color:#c9a84c; color:#ffffff; text-decoration:none; padding:12px 30px; border-radius:8px; font-size:14px; font-weight:600;">Reply to ${name}</a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#1a1a2e; padding:20px 40px; text-align:center;">
              <p style="color:#999; font-size:12px; margin:0 0 8px;">
                This is an automated notification from the SBRS website contact form.
              </p>
              <p style="margin:0;">
                <a href="https://sbrs.sribhuvanendra.org/" style="color:#c9a84c; text-decoration:none; font-size:13px;">View Website</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ============================================
// Feedback form handler
// ============================================
function handleFeedback(data) {
  const timestamp = data.timestamp || new Date().toISOString();
  const role = data.role || '';
  const feedback = data.feedback || '';
  const suggestions = data.suggestions || '';
  const name = data.name || '';
  const phone = data.phone || '';
  const email = data.email || '';

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('Feedback');

  if (!sheet) {
    sheet = ss.insertSheet('Feedback');
    sheet.appendRow(['Timestamp', 'Role', 'Feedback', 'Suggestions', 'Name', 'Phone', 'Email']);
    sheet.getRange(1, 1, 1, 7).setFontWeight('bold').setBackground('#1a1a2e').setFontColor('#ffffff');
    sheet.setColumnWidth(1, 180);
    sheet.setColumnWidth(2, 120);
    sheet.setColumnWidth(3, 350);
    sheet.setColumnWidth(4, 350);
    sheet.setColumnWidth(5, 200);
    sheet.setColumnWidth(6, 150);
    sheet.setColumnWidth(7, 220);
  }

  sheet.appendRow([timestamp, role, feedback, suggestions, name, phone, email]);

  // Notify admin
  try {
    MailApp.sendEmail({
      to: ADMIN_EMAIL,
      name: 'SBRS Website Notifications',
      subject: 'New Feedback from ' + name,
      htmlBody: getFeedbackAdminTemplate(name, email, phone, role, feedback, suggestions),
    });
  } catch (e) {
    console.error('Admin notification failed: ' + e);
  }

  // Send user confirmation
  if (email) {
    try {
      sendFeedbackUserEmail(name, email);
    } catch (e) {
      console.error('User email failed: ' + e);
    }
  }

  return ContentService.createTextOutput(JSON.stringify({ status: 'success', message: 'Feedback submitted successfully' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function sendFeedbackUserEmail(name, email) {
  MailApp.sendEmail({
    to: email,
    name: 'Sri Bhuvanendra Residential School',
    subject: 'We received your feedback - SBRS',
    htmlBody: getFeedbackUserTemplate(name),
  });
}

function getFeedbackUserTemplate(name) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
          <tr>
            <td style="background: linear-gradient(135deg, #1B4332 0%, #2d6a4f 100%); padding: 30px 40px; text-align: center;">
              <img src="https://sbrs.sribhuvanendra.org/images/logo.webp" alt="SBRS Logo" width="70" style="border-radius:50%;margin-bottom:12px;" />
              <h1 style="color:#ffffff; margin:0; font-size:20px; font-weight:600;">
                Sri Bhuvanendra Residential School
              </h1>
              <p style="color:#c9a84c; margin:6px 0 0; font-size:12px; letter-spacing:2px; text-transform:uppercase;">
                Karkala, Karnataka
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:35px 40px 10px;">
              <h2 style="color:#1a1a2e; margin:0 0 8px; font-size:22px;">Dear ${name},</h2>
            </td>
          </tr>
          <tr>
            <td style="padding:10px 40px;">
              <p style="color:#555; line-height:1.7; font-size:15px; margin:0 0 15px;">
                Thank you for taking the time to share your valuable feedback with us! We truly appreciate your input and are always looking for ways to improve.
              </p>
              <p style="color:#555; line-height:1.7; font-size:15px; margin:0 0 15px;">
                Your thoughts help us create a better experience for everyone at SBRS.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:10px 40px 30px;">
              <p style="color:#555; line-height:1.7; font-size:15px; margin:0 0 15px;">
                Warm regards,<br/>
                <strong style="color:#1a1a2e;">Sri Bhuvanendra Residential School</strong>
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color:#1a1a2e; padding:25px 40px; text-align:center;">
              <p style="color:#999; font-size:12px; margin:0 0 8px;">
                Madhav Nagar, Karkala, Udupi District, Karnataka — 574104
              </p>
              <p style="margin:0 0 12px;">
                <a href="https://sbrs.sribhuvanendra.org/" style="color:#c9a84c; text-decoration:none; font-size:13px; font-weight:500;">Visit Website</a>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <a href="tel:+919844548735" style="color:#c9a84c; text-decoration:none; font-size:13px;">+91 98445 48735</a>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <a href="mailto:sbrs2002@gmail.com" style="color:#c9a84c; text-decoration:none; font-size:13px;">Email Us</a>
              </p>
              <p style="color:#666; font-size:11px; margin:0;">
                &copy; ${new Date().getFullYear()} Sri Bhuvanendra Residential School. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function getFeedbackAdminTemplate(name, email, phone, role, feedback, suggestions) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#f4f4f4;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">
          <tr>
            <td style="background: linear-gradient(135deg, #1B4332 0%, #2d6a4f 100%); padding: 25px 40px; text-align: center;">
              <h1 style="color:#ffffff; margin:0; font-size:18px; font-weight:600;">New Feedback Received</h1>
              <p style="color:rgba(255,255,255,0.8); margin:6px 0 0; font-size:12px; letter-spacing:1px; text-transform:uppercase;">SBRS Website</p>
            </td>
          </tr>
          <tr>
            <td style="padding:30px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:12px 0; border-bottom:1px solid #eee;">
                    <span style="color:#888; font-size:12px; text-transform:uppercase; letter-spacing:1px;">Name</span><br/>
                    <span style="color:#1a1a2e; font-size:15px; font-weight:600;">${name}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0; border-bottom:1px solid #eee;">
                    <span style="color:#888; font-size:12px; text-transform:uppercase; letter-spacing:1px;">Email</span><br/>
                    <span style="color:#1a1a2e; font-size:15px;">${email}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0; border-bottom:1px solid #eee;">
                    <span style="color:#888; font-size:12px; text-transform:uppercase; letter-spacing:1px;">Phone</span><br/>
                    <span style="color:#1a1a2e; font-size:15px;">${phone}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0; border-bottom:1px solid #eee;">
                    <span style="color:#888; font-size:12px; text-transform:uppercase; letter-spacing:1px;">Role</span><br/>
                    <span style="color:#1a1a2e; font-size:15px;">${role}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0; border-bottom:1px solid #eee;">
                    <span style="color:#888; font-size:12px; text-transform:uppercase; letter-spacing:1px;">Feedback</span><br/>
                    <div style="background-color:#f8f9fa; border-left:4px solid #1B4332; padding:15px; border-radius:0 8px 8px 0; margin-top:8px;">
                      <p style="color:#333; font-size:14px; line-height:1.7; margin:0;">${feedback}</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:12px 0;">
                    <span style="color:#888; font-size:12px; text-transform:uppercase; letter-spacing:1px;">Suggestions</span><br/>
                    <div style="background-color:#f8f9fa; border-left:4px solid #1B4332; padding:15px; border-radius:0 8px 8px 0; margin-top:8px;">
                      <p style="color:#333; font-size:14px; line-height:1.7; margin:0;">${suggestions || 'N/A'}</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background-color:#1a1a2e; padding:20px 40px; text-align:center;">
              <p style="color:#999; font-size:12px; margin:0;">
                This is an automated notification from the SBRS website feedback form.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ============================================
// Keep Supabase free tier alive (prevents 7-day auto-pause)
// Run manually once to test, then set a time-driven trigger
// ============================================
function keepAlive() {
  try {
    const url = SUPABASE_URL + '/rest/v1/events?select=id&limit=1';
    const options = {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
      },
      muteHttpExceptions: true,
    };
    const response = UrlFetchApp.fetch(url, options);
    Logger.log('Supabase ping status: ' + response.getResponseCode());
  } catch (e) {
    Logger.log('Supabase ping failed: ' + e);
  }
}

// Run this once to set up the spreadsheet
function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.rename(SPREADSHEET_NAME);
  let sheet = ss.getSheetByName('Responses');
  if (!sheet) {
    sheet = ss.insertSheet('Responses');
    sheet.appendRow(['Timestamp', 'Name', 'Email', 'Phone', 'Subject', 'Message']);
    sheet.getRange(1, 1, 1, 6).setFontWeight('bold').setBackground('#1a1a2e').setFontColor('#ffffff');
    sheet.setColumnWidth(1, 180);
    sheet.setColumnWidth(2, 200);
    sheet.setColumnWidth(3, 220);
    sheet.setColumnWidth(4, 150);
    sheet.setColumnWidth(5, 150);
    sheet.setColumnWidth(6, 400);
  }
  Logger.log('Setup complete! Sheet: ' + SPREADSHEET_NAME);
}
