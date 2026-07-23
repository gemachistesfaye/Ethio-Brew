const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

const coffeeIconSvg = `
<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="24" height="24" rx="8" fill="#4B2C20"/>
  <path d="M7 9h8v6c0 1.1-.9 2-2 2H9c-1.1 0-2-.9-2-2V9z" fill="#FFD700"/>
  <path d="M15 10h1c1.1 0 2 .9 2 2s-.9 2-2 2h-1" stroke="#FFD700" stroke-width="1.2" fill="none"/>
  <rect x="6" y="7" width="10" height="2" rx="1" fill="#FFD700"/>
  <path d="M10 5c0-1 .5-1.5 1-1.5s1 .5 1 1.5" stroke="#FFD700" stroke-width="0.8" stroke-linecap="round" fill="none"/>
</svg>`;

const baseTemplate = (content) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#FDFCF8;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#FDFCF8;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right:12px;vertical-align:middle;">
                    ${coffeeIconSvg}
                  </td>
                  <td style="vertical-align:middle;">
                    <span style="font-size:24px;font-weight:900;color:#4B2C20;letter-spacing:-0.5px;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">Ethio-Brew</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
                <tr>
                  <td style="padding:48px 40px;">
                    ${content}
                  </td>
                </table>
              </td>
            </tr>
          </tr>
          <tr>
            <td align="center" style="padding:32px 20px;">
              <p style="margin:0 0 8px;font-size:12px;color:#999999;">
                Premium Ethiopian Coffee Delivery
              </p>
              <p style="margin:0;font-size:11px;color:#cccccc;">
                &copy; ${new Date().getFullYear()} Ethio-Brew. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

const verificationOTPEmail = (userName, code, expiresIn = '10 minutes') => baseTemplate(`
  <div style="text-align:center;margin-bottom:32px;">
    <div style="width:64px;height:64px;background-color:#E8F5E9;border-radius:50%;margin:0 auto 20px;display:inline-flex;align-items:center;justify-content:center;">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#006341" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    </div>
    <h1 style="margin:0;font-size:24px;font-weight:800;color:#4B2C20;">Verify Your Email</h1>
  </div>
  <p style="margin:0 0 8px;font-size:15px;color:#666666;text-align:center;">Hi <strong>${userName}</strong>,</p>
  <p style="margin:0 0 32px;font-size:15px;color:#666666;text-align:center;line-height:1.6;">
    Use the following code to verify your Ethio-Brew account:
  </p>
  <div style="text-align:center;margin-bottom:32px;">
    <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
      <tr>
        ${code.split('').map(d => '<td style="width:56px;height:68px;background-color:#F0FDF4;border:2px solid #006341;border-radius:14px;text-align:center;vertical-align:middle;padding:0;"><span style="font-size:32px;font-weight:900;color:#006341;font-family:\'Courier New\',monospace;letter-spacing:2px;">' + d + '</span></td>').join('<td style="width:12px;"></td>')}
      </tr>
    </table>
  </div>
  <div style="background-color:#FDFCF8;border-radius:12px;padding:16px 20px;margin-bottom:24px;">
    <p style="margin:0;font-size:13px;color:#999999;text-align:center;line-height:1.5;">
      This code expires in <strong>${expiresIn}</strong>. If you didn't create this account, you can safely ignore this email.
    </p>
  </div>
`);

const resetOTPEmail = (userName, code, expiresIn = '10 minutes') => baseTemplate(`
  <div style="text-align:center;margin-bottom:32px;">
    <div style="width:64px;height:64px;background-color:#FFF3E0;border-radius:50%;margin:0 auto 20px;display:inline-flex;align-items:center;justify-content:center;">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4B2C20" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    </div>
    <h1 style="margin:0;font-size:24px;font-weight:800;color:#4B2C20;">Reset Your Password</h1>
  </div>
  <p style="margin:0 0 8px;font-size:15px;color:#666666;text-align:center;">Hi <strong>${userName}</strong>,</p>
  <p style="margin:0 0 32px;font-size:15px;color:#666666;text-align:center;line-height:1.6;">
    We received a request to reset your password. Use the following code to proceed:
  </p>
  <div style="text-align:center;margin-bottom:32px;">
    <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
      <tr>
        ${code.split('').map(d => '<td style="width:56px;height:68px;background-color:#FFF8F0;border:2px solid #4B2C20;border-radius:14px;text-align:center;vertical-align:middle;padding:0;"><span style="font-size:32px;font-weight:900;color:#4B2C20;font-family:\'Courier New\',monospace;letter-spacing:2px;">' + d + '</span></td>').join('<td style="width:12px;"></td>')}
      </tr>
    </table>
  </div>
  <div style="background-color:#FDFCF8;border-radius:12px;padding:16px 20px;margin-bottom:24px;">
    <p style="margin:0;font-size:13px;color:#999999;text-align:center;line-height:1.5;">
      This code expires in <strong>${expiresIn}</strong>. If you didn't request this, you can safely ignore this email.
    </p>
  </div>
`);

const welcomeEmail = (userName) => baseTemplate(`
  <div style="text-align:center;margin-bottom:32px;">
    <div style="width:64px;height:64px;background-color:#E8F5E9;border-radius:50%;margin:0 auto 20px;display:inline-flex;align-items:center;justify-content:center;">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#006341" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    </div>
    <h1 style="margin:0;font-size:24px;font-weight:800;color:#4B2C20;">Welcome to Ethio-Brew!</h1>
  </div>
  <p style="margin:0 0 8px;font-size:15px;color:#666666;text-align:center;">Hi <strong>${userName}</strong>,</p>
  <p style="margin:0 0 32px;font-size:15px;color:#666666;text-align:center;line-height:1.6;">
    Your account has been verified and is all set. Start exploring our premium Ethiopian coffees and enjoy the best brews delivered to your door.
  </p>
  <div style="text-align:center;margin-bottom:32px;">
    <a href="${FRONTEND_URL}/shop" style="display:inline-block;background-color:#006341;color:#ffffff;padding:16px 48px;border-radius:16px;font-size:15px;font-weight:700;text-decoration:none;letter-spacing:0.3px;">
      Browse Coffees
    </a>
  </div>
`);

const passwordChangedEmail = (userName) => baseTemplate(`
  <div style="text-align:center;margin-bottom:32px;">
    <div style="width:64px;height:64px;background-color:#E8F5E9;border-radius:50%;margin:0 auto 20px;display:inline-flex;align-items:center;justify-content:center;">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#006341" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    </div>
    <h1 style="margin:0;font-size:24px;font-weight:800;color:#4B2C20;">Password Changed</h1>
  </div>
  <p style="margin:0 0 8px;font-size:15px;color:#666666;text-align:center;">Hi <strong>${userName}</strong>,</p>
  <p style="margin:0 0 32px;font-size:15px;color:#666666;text-align:center;line-height:1.6;">
    Your password has been successfully updated. If you didn't make this change, please contact our support team immediately.
  </p>
  <div style="background-color:#FFF3E0;border-radius:12px;padding:16px 20px;margin-bottom:24px;">
    <p style="margin:0;font-size:13px;color:#4B2C20;text-align:center;line-height:1.5;">
      For your security, we recommend using a strong, unique password.
    </p>
  </div>
`);

const orderConfirmedEmail = (userName, orderId, totalAmount) => baseTemplate(`
  <div style="text-align:center;margin-bottom:32px;">
    <div style="width:64px;height:64px;background-color:#E8F5E9;border-radius:50%;margin:0 auto 20px;display:inline-flex;align-items:center;justify-content:center;">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#006341" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    </div>
    <h1 style="margin:0;font-size:24px;font-weight:800;color:#4B2C20;">Order Confirmed</h1>
  </div>
  <p style="margin:0 0 8px;font-size:15px;color:#666666;text-align:center;">Hi <strong>${userName}</strong>,</p>
  <p style="margin:0 0 32px;font-size:15px;color:#666666;text-align:center;line-height:1.6;">
    Thank you for your order! We've received your order and are preparing it with care.
  </p>
  <div style="background-color:#F0FDF4;border-radius:16px;padding:24px;margin-bottom:32px;text-align:center;">
    <p style="margin:0 0 4px;font-size:13px;color:#999999;">Order ID</p>
    <p style="margin:0 0 16px;font-size:16px;font-weight:800;color:#006341;">#${orderId}</p>
    <p style="margin:0 0 4px;font-size:13px;color:#999999;">Total Amount</p>
    <p style="margin:0;font-size:20px;font-weight:800;color:#4B2C20;">$${totalAmount}</p>
  </div>
  <div style="text-align:center;margin-bottom:16px;">
    <a href="${FRONTEND_URL}/orders" style="display:inline-block;background-color:#006341;color:#ffffff;padding:16px 48px;border-radius:16px;font-size:15px;font-weight:700;text-decoration:none;">
      View My Orders
    </a>
  </div>
`);

const orderShippedEmail = (userName, orderId, trackingNumber) => baseTemplate(`
  <div style="text-align:center;margin-bottom:32px;">
    <div style="width:64px;height:64px;background-color:#E3F2FD;border-radius:50%;margin:0 auto 20px;display:inline-flex;align-items:center;justify-content:center;">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1565C0" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="1" y="3" width="15" height="13"/>
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
        <circle cx="5.5" cy="18.5" r="2.5"/>
        <circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    </div>
    <h1 style="margin:0;font-size:24px;font-weight:800;color:#4B2C20;">Order Shipped</h1>
  </div>
  <p style="margin:0 0 8px;font-size:15px;color:#666666;text-align:center;">Hi <strong>${userName}</strong>,</p>
  <p style="margin:0 0 32px;font-size:15px;color:#666666;text-align:center;line-height:1.6;">
    Great news! Your order is on its way to you.
  </p>
  <div style="background-color:#E3F2FD;border-radius:16px;padding:24px;margin-bottom:32px;text-align:center;">
    <p style="margin:0 0 4px;font-size:13px;color:#999999;">Order ID</p>
    <p style="margin:0 0 16px;font-size:16px;font-weight:800;color:#1565C0;">#${orderId}</p>
    <p style="margin:0 0 4px;font-size:13px;color:#999999;">Tracking Number</p>
    <p style="margin:0;font-size:18px;font-weight:800;color:#4B2C20;font-family:'Courier New',monospace;">${trackingNumber}</p>
  </div>
  <div style="text-align:center;margin-bottom:16px;">
    <a href="${FRONTEND_URL}/orders" style="display:inline-block;background-color:#006341;color:#ffffff;padding:16px 48px;border-radius:16px;font-size:15px;font-weight:700;text-decoration:none;">
      Track Order
    </a>
  </div>
`);

const orderDeliveredEmail = (userName, orderId) => baseTemplate(`
  <div style="text-align:center;margin-bottom:32px;">
    <div style="width:64px;height:64px;background-color:#E8F5E9;border-radius:50%;margin:0 auto 20px;display:inline-flex;align-items:center;justify-content:center;">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#006341" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    </div>
    <h1 style="margin:0;font-size:24px;font-weight:800;color:#4B2C20;">Order Delivered</h1>
  </div>
  <p style="margin:0 0 8px;font-size:15px;color:#666666;text-align:center;">Hi <strong>${userName}</strong>,</p>
  <p style="margin:0 0 32px;font-size:15px;color:#666666;text-align:center;line-height:1.6;">
    Your order has been delivered. We hope you enjoy your Ethio-Brew coffee! If you have a moment, we'd love to hear your feedback.
  </p>
  <div style="background-color:#F0FDF4;border-radius:16px;padding:24px;margin-bottom:32px;text-align:center;">
    <p style="margin:0 0 4px;font-size:13px;color:#999999;">Order ID</p>
    <p style="margin:0;font-size:16px;font-weight:800;color:#006341;">#${orderId}</p>
  </div>
  <div style="text-align:center;margin-bottom:16px;">
    <a href="${FRONTEND_URL}/orders" style="display:inline-block;background-color:#006341;color:#ffffff;padding:16px 48px;border-radius:16px;font-size:15px;font-weight:700;text-decoration:none;">
      Rate Your Order
    </a>
  </div>
`);

const paymentApprovedEmail = (userName, orderId, amount) => baseTemplate(`
  <div style="text-align:center;margin-bottom:32px;">
    <div style="width:64px;height:64px;background-color:#E8F5E9;border-radius:50%;margin:0 auto 20px;display:inline-flex;align-items:center;justify-content:center;">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#006341" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
        <line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
    </div>
    <h1 style="margin:0;font-size:24px;font-weight:800;color:#4B2C20;">Payment Approved</h1>
  </div>
  <p style="margin:0 0 8px;font-size:15px;color:#666666;text-align:center;">Hi <strong>${userName}</strong>,</p>
  <p style="margin:0 0 32px;font-size:15px;color:#666666;text-align:center;line-height:1.6;">
    Your payment has been verified and approved. Your order is now being processed.
  </p>
  <div style="background-color:#F0FDF4;border-radius:16px;padding:24px;margin-bottom:32px;text-align:center;">
    <p style="margin:0 0 4px;font-size:13px;color:#999999;">Order ID</p>
    <p style="margin:0 0 16px;font-size:16px;font-weight:800;color:#006341;">#${orderId}</p>
    <p style="margin:0 0 4px;font-size:13px;color:#999999;">Amount Paid</p>
    <p style="margin:0;font-size:20px;font-weight:800;color:#4B2C20;">$${amount}</p>
  </div>
  <div style="text-align:center;margin-bottom:16px;">
    <a href="${FRONTEND_URL}/orders" style="display:inline-block;background-color:#006341;color:#ffffff;padding:16px 48px;border-radius:16px;font-size:15px;font-weight:700;text-decoration:none;">
      View Order
    </a>
  </div>
`);

const paymentRejectedEmail = (userName, orderId, adminNotes) => baseTemplate(`
  <div style="text-align:center;margin-bottom:32px;">
    <div style="width:64px;height:64px;background-color:#FFEBEE;border-radius:50%;margin:0 auto 20px;display:inline-flex;align-items:center;justify-content:center;">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C62828" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="15" y1="9" x2="9" y2="15"/>
        <line x1="9" y1="9" x2="15" y2="15"/>
      </svg>
    </div>
    <h1 style="margin:0;font-size:24px;font-weight:800;color:#4B2C20;">Payment Rejected</h1>
  </div>
  <p style="margin:0 0 8px;font-size:15px;color:#666666;text-align:center;">Hi <strong>${userName}</strong>,</p>
  <p style="margin:0 0 32px;font-size:15px;color:#666666;text-align:center;line-height:1.6;">
    Unfortunately, your payment for the following order could not be verified. Please try again or contact support.
  </p>
  <div style="background-color:#FFEBEE;border-radius:16px;padding:24px;margin-bottom:32px;text-align:center;">
    <p style="margin:0 0 4px;font-size:13px;color:#999999;">Order ID</p>
    <p style="margin:0 0 16px;font-size:16px;font-weight:800;color:#C62828;">#${orderId}</p>
    ${adminNotes ? `<p style="margin:0 0 4px;font-size:13px;color:#999999;">Reason</p><p style="margin:0;font-size:14px;color:#4B2C20;">${adminNotes}</p>` : ''}
  </div>
  <div style="text-align:center;margin-bottom:16px;">
    <a href="${FRONTEND_URL}/orders" style="display:inline-block;background-color:#4B2C20;color:#ffffff;padding:16px 48px;border-radius:16px;font-size:15px;font-weight:700;text-decoration:none;">
      Try Again
    </a>
  </div>
`);

const accountBlockedEmail = (userName) => baseTemplate(`
  <div style="text-align:center;margin-bottom:32px;">
    <div style="width:64px;height:64px;background-color:#FFEBEE;border-radius:50%;margin:0 auto 20px;display:inline-flex;align-items:center;justify-content:center;">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C62828" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
      </svg>
    </div>
    <h1 style="margin:0;font-size:24px;font-weight:800;color:#4B2C20;">Account Suspended</h1>
  </div>
  <p style="margin:0 0 8px;font-size:15px;color:#666666;text-align:center;">Hi <strong>${userName}</strong>,</p>
  <p style="margin:0 0 32px;font-size:15px;color:#666666;text-align:center;line-height:1.6;">
    Your Ethio-Brew account has been suspended by an administrator. You will not be able to log in or place orders until this is resolved.
  </p>
  <p style="margin:0 0 32px;font-size:15px;color:#666666;text-align:center;line-height:1.6;">
    If you believe this is a mistake, please contact our support team.
  </p>
  <div style="background-color:#FFEBEE;border-radius:12px;padding:16px 20px;margin-bottom:24px;">
    <p style="margin:0;font-size:13px;color:#C62828;text-align:center;line-height:1.5;">
      If you didn't violate any terms, please reach out to our support team for assistance.
    </p>
  </div>
`);

module.exports = {
  verificationOTPEmail,
  resetOTPEmail,
  welcomeEmail,
  passwordChangedEmail,
  orderConfirmedEmail,
  orderShippedEmail,
  orderDeliveredEmail,
  paymentApprovedEmail,
  paymentRejectedEmail,
  accountBlockedEmail,
};
