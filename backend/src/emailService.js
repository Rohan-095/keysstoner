const nodemailer = require("nodemailer");

function isConfigured() {
  return !!(
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS &&
    process.env.NOTIFICATION_EMAIL
  );
}

async function sendLeadNotification(lead) {
  if (!isConfigured()) {
    console.log("[email] SMTP not configured — skipping notification. Set SMTP_HOST, SMTP_USER, SMTP_PASS, NOTIFICATION_EMAIL.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host:   process.env.SMTP_HOST,
    port:   parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_PORT === "465",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const html = `
    <div style="font-family:sans-serif;max-width:520px;margin:0 auto;color:#1a1a1a">
      <h2 style="margin:0 0 1rem;color:#0d1c3f">🔔 New Lead — KeystoneCleaner</h2>
      <table style="width:100%;border-collapse:collapse;font-size:15px">
        <tr><td style="padding:8px 0;color:#555;width:130px">Name</td><td style="padding:8px 0;font-weight:600">${lead.name}</td></tr>
        <tr><td style="padding:8px 0;color:#555">Phone</td><td style="padding:8px 0"><a href="tel:${lead.phone}">${lead.phone}</a></td></tr>
        <tr><td style="padding:8px 0;color:#555">Email</td><td style="padding:8px 0">${lead.email || "—"}</td></tr>
        <tr><td style="padding:8px 0;color:#555">Service</td><td style="padding:8px 0">${lead.service || "—"}</td></tr>
        <tr><td style="padding:8px 0;color:#555">City</td><td style="padding:8px 0">${lead.city || "—"}</td></tr>
        <tr><td style="padding:8px 0;color:#555">Preferred Time</td><td style="padding:8px 0">${lead.preferred_time || "—"}</td></tr>
        <tr><td style="padding:8px 0;color:#555">Notes</td><td style="padding:8px 0">${lead.notes || "—"}</td></tr>
      </table>
      <p style="margin:1.5rem 0 0;color:#888;font-size:13px">Sent by KeystoneCleaner backend</p>
    </div>
  `;

  await transporter.sendMail({
    from:    `"KeystoneCleaner" <${process.env.SMTP_USER}>`,
    to:      process.env.NOTIFICATION_EMAIL,
    subject: `New lead: ${lead.name} — ${lead.service || "Exterior Cleaning"} in ${lead.city || "BC"}`,
    html,
  });

  console.log(`[email] Notification sent to ${process.env.NOTIFICATION_EMAIL} for lead ${lead.id}`);
}

module.exports = { sendLeadNotification };
