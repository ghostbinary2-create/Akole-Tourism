const nodemailer = require('nodemailer');

/**
 * Creates and returns a nodemailer transporter configured with environment variables.
 */
const getTransporter = () => {
  const user = (process.env.SMTP_USER || process.env.EMAIL_USER || '').trim();
  const rawPass = process.env.SMTP_PASS || process.env.EMAIL_PASS || '';
  const pass = rawPass.replace(/\s+/g, '');
  const host = (process.env.SMTP_HOST || 'smtp.gmail.com').trim();
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : port === 465;

  if (!user || !pass) {
    return null;
  }

  // If using Gmail, nodemailer provides optimized settings
  if (host.includes('gmail.com') || process.env.SMTP_SERVICE === 'gmail') {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user,
        pass,
      },
    });
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
};

/**
 * Send a generic email
 */
const sendMail = async ({ to, subject, html, text }) => {
  const transporter = getTransporter();

  if (!transporter) {
    console.warn(
      `[EmailService] SMTP credentials not set in .env (SMTP_USER / SMTP_PASS). Skipping email to ${to}.`
    );
    return { success: false, reason: 'SMTP not configured' };
  }

  const fromAddress = process.env.EMAIL_FROM || `"Akole Tourism" <${process.env.SMTP_USER || process.env.EMAIL_USER}>`;

  try {
    const info = await transporter.sendMail({
      from: fromAddress,
      to,
      subject,
      text,
      html,
    });
    console.log(`[EmailService] Email sent successfully to ${to}. Message ID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error(`[EmailService] Error sending email to ${to}:`, error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Send Welcome Email to newly registered user
 */
const sendWelcomeEmail = async ({ to, name }) => {
  const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
  const exploreUrl = `${clientUrl.replace(/\/$/, '')}/packages`;
  const firstName = name ? name.split(' ')[0] : 'Traveler';

  const subject = `Welcome to Akole Tourism, ${firstName}! 🌄`;

  const text = `
Hi ${firstName},

Welcome to Akole Tourism! Your account has been successfully created.

We're thrilled to have you with us. Akole is the jewel of the Sahyadri mountains, known for stunning peaks, pristine lakes, and majestic waterfalls.

What you can do:
- Explore Tour Packages: ${exploreUrl}
- Discover Destinations: Bhandardara, Kalsubai Peak, Harishchandragad, and more
- Manage bookings and get instant updates directly from your dashboard

If you have any questions or need assistance with custom tour bookings, feel free to reply to this email.

Happy Exploring!
The Akole Tourism Team
  `.trim();

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Akole Tourism</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #0f172a;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #334155;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      background-color: #0f172a;
      padding: 32px 12px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3);
    }
    .header {
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #064e3b 100%);
      padding: 40px 32px;
      text-align: center;
      color: #ffffff;
    }
    .badge {
      display: inline-block;
      padding: 6px 14px;
      background: rgba(16, 185, 129, 0.2);
      border: 1px solid rgba(16, 185, 129, 0.5);
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 700;
      color: #34d399;
      letter-spacing: 0.5px;
      margin-bottom: 12px;
      text-transform: uppercase;
    }
    .header h1 {
      margin: 0;
      font-size: 26px;
      font-weight: 800;
      letter-spacing: -0.5px;
    }
    .header p {
      margin: 8px 0 0 0;
      color: #94a3b8;
      font-size: 14px;
    }
    .content {
      padding: 36px 32px 24px 32px;
      color: #334155;
      font-size: 15px;
      line-height: 1.6;
    }
    .greeting {
      font-size: 18px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 12px;
    }
    .card-grid {
      margin: 24px 0;
      background: #f8fafc;
      border-radius: 14px;
      border: 1px solid #e2e8f0;
      padding: 16px;
    }
    .card-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 14px;
    }
    .card-item:last-child {
      margin-bottom: 0;
    }
    .card-icon {
      font-size: 20px;
      margin-right: 12px;
      line-height: 1.2;
    }
    .card-text strong {
      display: block;
      color: #0f172a;
      font-size: 14px;
      margin-bottom: 2px;
    }
    .card-text span {
      color: #64748b;
      font-size: 13px;
    }
    .cta-container {
      text-align: center;
      margin: 32px 0 16px 0;
    }
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #10b981 0%, #0d9488 100%);
      color: #ffffff !important;
      text-decoration: none;
      font-weight: 700;
      font-size: 15px;
      padding: 14px 32px;
      border-radius: 12px;
      box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.4);
    }
    .account-box {
      margin-top: 24px;
      padding: 14px 18px;
      background-color: #ecfdf5;
      border-left: 4px solid #10b981;
      border-radius: 6px;
      font-size: 13px;
      color: #065f46;
    }
    .footer {
      background-color: #f1f5f9;
      border-top: 1px solid #e2e8f0;
      padding: 24px 32px;
      text-align: center;
      font-size: 12px;
      color: #64748b;
      line-height: 1.5;
    }
    .footer a {
      color: #0d9488;
      text-decoration: none;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      
      <!-- Header -->
      <div class="header">
        <div class="badge">Akole Tourism</div>
        <h1>Welcome to the Sahyadri Paradise! 🌄</h1>
        <p>Explore peaks, cascading waterfalls & serene lakes</p>
      </div>

      <!-- Main Body -->
      <div class="content">
        <div class="greeting">Hello ${firstName},</div>
        <p>
          Welcome to <strong>Akole Tourism</strong>! Your account has been successfully created. We're delighted to have you join our traveler community.
        </p>

        <!-- Highlights Box -->
        <div class="card-grid">
          <div class="card-item">
            <div class="card-icon">🏔️</div>
            <div class="card-text">
              <strong>Historic Treks & Highest Peaks</strong>
              <span>Conquer Mt. Kalsubai (highest peak in Maharashtra), Ratangad, and Harishchandragad.</span>
            </div>
          </div>
          <div class="card-item">
            <div class="card-icon">🌊</div>
            <div class="card-text">
              <strong>Bhandardara & Waterfalls</strong>
              <span>Visit Umbrella Falls, Arthur Lake, and Randha Falls for tranquil getaways.</span>
            </div>
          </div>
          <div class="card-item">
            <div class="card-icon">🏕️</div>
            <div class="card-text">
              <strong>Curated Tour Packages & Camping</strong>
              <span>Book end-to-end guided tours, lakeside tents, meals, and local experiences easily.</span>
            </div>
          </div>
        </div>

        <!-- Account Info Box -->
        <div class="account-box">
          <strong>Your Registered Email:</strong> ${to}<br/>
          You can now log in anytime to reserve packages, check booking status, and view travel updates.
        </div>

        <!-- CTA Button -->
        <div class="cta-container">
          <a href="${exploreUrl}" target="_blank" class="cta-button">
            Explore Tour Packages &rarr;
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div class="footer">
        <p style="margin: 0 0 6px 0;">
          <strong>Akole Tourism & Tour Management</strong><br/>
          Ahmednagar District, Maharashtra, India
        </p>
        <p style="margin: 0;">
          Need help? Contact us or visit our portal at <a href="${clientUrl}" target="_blank">${clientUrl}</a>.
        </p>
      </div>

    </div>
  </div>
</body>
</html>
  `.trim();

  return sendMail({
    to,
    subject,
    text,
    html,
  });
};

/**
 * Send Broadcast Announcement Email to a list of users
 */
const sendBroadcastToUsers = async ({ users, title, message }) => {
  if (!users || !Array.isArray(users) || users.length === 0) {
    return { success: false, reason: 'No recipients provided' };
  }

  const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
  const cleanClientUrl = clientUrl.replace(/\/$/, '');

  console.log(`[EmailService] Preparing to dispatch broadcast email to ${users.length} users: "${title}"`);

  const sendPromises = users.map(async (user) => {
    if (!user.email) return;

    const firstName = user.name ? user.name.split(' ')[0] : 'Traveler';
    const subject = `📢 Notice: ${title} | Akole Tourism`;

    const text = `
Hello ${firstName},

Important Announcement from Akole Tourism:

${title}
--------------------------------------------------
${message}

Visit portal to view details: ${cleanClientUrl}/dashboard

Warm regards,
Akole Tourism Administration
    `.trim();

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #070e24;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #334155;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      background-color: #070e24;
      padding: 32px 12px;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.4);
    }
    .header {
      background: linear-gradient(135deg, #070e24 0%, #0f1d40 60%, #064e3b 100%);
      padding: 36px 32px;
      text-align: center;
      color: #ffffff;
    }
    .badge {
      display: inline-block;
      padding: 6px 14px;
      background: rgba(245, 158, 11, 0.2);
      border: 1px solid rgba(245, 158, 11, 0.6);
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 800;
      color: #fbbf24;
      letter-spacing: 0.8px;
      margin-bottom: 12px;
      text-transform: uppercase;
    }
    .header h1 {
      margin: 0;
      font-size: 22px;
      font-weight: 800;
      line-height: 1.3;
    }
    .content {
      padding: 32px;
      color: #334155;
      font-size: 15px;
      line-height: 1.6;
    }
    .greeting {
      font-size: 17px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 14px;
    }
    .message-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-left: 4px solid #f59e0b;
      border-radius: 12px;
      padding: 20px;
      margin: 20px 0;
      color: #1e293b;
      font-size: 15px;
      line-height: 1.7;
      white-space: pre-wrap;
    }
    .cta-container {
      text-align: center;
      margin: 28px 0 16px 0;
    }
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #10b981 0%, #0d9488 100%);
      color: #ffffff !important;
      text-decoration: none;
      font-weight: 700;
      font-size: 14px;
      padding: 13px 30px;
      border-radius: 10px;
      box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.3);
    }
    .footer {
      background-color: #f1f5f9;
      border-top: 1px solid #e2e8f0;
      padding: 20px 32px;
      text-align: center;
      font-size: 12px;
      color: #64748b;
      line-height: 1.5;
    }
    .footer a {
      color: #0d9488;
      text-decoration: none;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <div class="badge">Official Announcement</div>
        <h1>${title}</h1>
      </div>
      <div class="content">
        <div class="greeting">Hello ${firstName},</div>
        <p>An official notice has been published by the <strong>Akole Tourism Administration</strong>:</p>
        <div class="message-card">${message}</div>
        <div class="cta-container">
          <a href="${cleanClientUrl}/dashboard" target="_blank" class="cta-button">
            Open Tourism Dashboard &rarr;
          </a>
        </div>
      </div>
      <div class="footer">
        <p style="margin: 0 0 4px 0;">
          <strong>Akole Tourism & Tour Package Management</strong>
        </p>
        <p style="margin: 0;">
          You received this announcement as a registered user of Akole Tourism.<br/>
          Visit our portal at <a href="${cleanClientUrl}">${cleanClientUrl}</a>.
        </p>
      </div>
    </div>
  </div>
</body>
</html>
    `.trim();

    return sendMail({
      to: user.email,
      subject,
      text,
      html,
    });
  });

  const results = await Promise.allSettled(sendPromises);
  const successCount = results.filter(
    (r) => r.status === 'fulfilled' && r.value && r.value.success
  ).length;

  console.log(
    `[EmailService] Broadcast completed. Delivered to ${successCount} of ${users.length} recipients.`
  );

  return { success: true, count: successCount, total: users.length };
};

module.exports = {
  sendMail,
  sendWelcomeEmail,
  sendBroadcastToUsers,
};
