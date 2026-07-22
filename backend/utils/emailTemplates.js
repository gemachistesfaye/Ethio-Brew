const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

const coffeeIconSvg = `
<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="48" height="48" rx="12" fill="#4B2C20"/>
  <path d="M14 18h16v12c0 2.2-1.8 4-4 4h-8c-2.2 0-4-1.8-4-4V18z" fill="#FFD700"/>
  <path d="M30 20h2c2.2 0 4 1.8 4 4s-1.8 4-4 4h-2" stroke="#FFD700" stroke-width="2" fill="none"/>
  <rect x="12" y="14" width="20" height="3" rx="1.5" fill="#FFD700"/>
  <path d="M20 10c0-2 1-3 2-3s2 1 2 3" stroke="#FFD700" stroke-width="1.5" stroke-linecap="round" fill="none"/>
  <path d="M16 11c0-2 1-3 2-3" stroke="#FFD700" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.6"/>
  <path d="M26 11c1-1 2-1 2-3" stroke="#FFD700" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.6"/>
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
          
          <!-- Logo Header -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right:12px;vertical-align:middle;">
                    ${coffeeIconSvg}
                  </td>
                  <td style="vertical-align:middle;">
                    <span style="font-size:28px;font-weight:900;color:#4B2C20;letter-spacing:-0.5px;">Ethio-Brew</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Card -->
          <tr>
            <td>
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
                
                <!-- Content -->
                <tr>
                  <td style="padding:48px 40px;">
                    ${content}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
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

const verificationEmail = (userName, verifyUrl) => baseTemplate(`
  <div style="text-align:center;margin-bottom:32px;">
    <div style="width:64px;height:64px;background-color:#E8F5E9;border-radius:50%;margin:0 auto 20px;display:inline-flex;align-items:center;justify-content:center;">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#006341" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    </div>
    <h1 style="margin:0;font-size:24px;font-weight:800;color:#4B2C20;">Welcome to Ethio-Brew!</h1>
  </div>
  
  <p style="margin:0 0 8px;font-size:15px;color:#666666;text-align:center;">Hi <strong>${userName}</strong>,</p>
  <p style="margin:0 0 32px;font-size:15px;color:#666666;text-align:center;line-height:1.6;">
    Thanks for joining Ethio-Brew. Please verify your email address to start exploring our premium Ethiopian coffees.
  </p>

  <div style="text-align:center;margin-bottom:32px;">
    <a href="${verifyUrl}" style="display:inline-block;background-color:#006341;color:#ffffff;padding:16px 48px;border-radius:16px;font-size:15px;font-weight:700;text-decoration:none;letter-spacing:0.3px;">
      Verify My Account
    </a>
  </div>

  <div style="background-color:#FDFCF8;border-radius:12px;padding:16px 20px;margin-bottom:24px;">
    <p style="margin:0;font-size:13px;color:#999999;text-align:center;line-height:1.5;">
      This link expires in <strong>24 hours</strong>. If you didn't create this account, you can safely ignore this email.
    </p>
  </div>
`);

const resendVerificationEmail = (userName, verifyUrl) => baseTemplate(`
  <div style="text-align:center;margin-bottom:32px;">
    <div style="width:64px;height:64px;background-color:#E8F5E9;border-radius:50%;margin:0 auto 20px;display:inline-flex;align-items:center;justify-content:center;">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#006341" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 4v16h16"/>
        <path d="m9 14 3-3 3 3"/>
        <path d="M12 17V7"/>
      </svg>
    </div>
    <h1 style="margin:0;font-size:24px;font-weight:800;color:#4B2C20;">Verify Your Email</h1>
  </div>
  
  <p style="margin:0 0 8px;font-size:15px;color:#666666;text-align:center;">Hi <strong>${userName}</strong>,</p>
  <p style="margin:0 0 32px;font-size:15px;color:#666666;text-align:center;line-height:1.6;">
    You requested a new verification link. Click below to verify your email address.
  </p>

  <div style="text-align:center;margin-bottom:32px;">
    <a href="${verifyUrl}" style="display:inline-block;background-color:#006341;color:#ffffff;padding:16px 48px;border-radius:16px;font-size:15px;font-weight:700;text-decoration:none;letter-spacing:0.3px;">
      Verify My Account
    </a>
  </div>

  <div style="background-color:#FDFCF8;border-radius:12px;padding:16px 20px;margin-bottom:24px;">
    <p style="margin:0;font-size:13px;color:#999999;text-align:center;line-height:1.5;">
      This link expires in <strong>24 hours</strong>.
    </p>
  </div>
`);

const passwordResetEmail = (userName, resetUrl) => baseTemplate(`
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
    We received a request to reset your password. Click below to create a new one.
  </p>

  <div style="text-align:center;margin-bottom:32px;">
    <a href="${resetUrl}" style="display:inline-block;background-color:#4B2C20;color:#ffffff;padding:16px 48px;border-radius:16px;font-size:15px;font-weight:700;text-decoration:none;letter-spacing:0.3px;">
      Reset Password
    </a>
  </div>

  <div style="background-color:#FDFCF8;border-radius:12px;padding:16px 20px;margin-bottom:24px;">
    <p style="margin:0;font-size:13px;color:#999999;text-align:center;line-height:1.5;">
      This link expires in <strong>1 hour</strong>. If you didn't request this, you can safely ignore this email.
    </p>
  </div>
`);

module.exports = {
  verificationEmail,
  resendVerificationEmail,
  passwordResetEmail,
};
