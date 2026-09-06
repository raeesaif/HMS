const welcomeEmailTemplate = (
  firstname,
  lastName,
  email,
  role,
  password,
  loginUrl
) => `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Welcome to HMS - Your Account is Ready</title>
</head>
<body style="margin:0;padding:0;background-color:#F8FAFC;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F8FAFC;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="520" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,119,182,0.10);border:1px solid #E2E8F0;">
          <tr>
            <td style="background-color:#0077B6;padding:36px 40px 28px;text-align:center;">
              <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr>
                  <td style="vertical-align:middle;">
                    <div style="width:40px;height:40px;background-color:#FFFFFF;border-radius:10px;display:inline-block;text-align:center;line-height:40px;font-weight:900;font-size:20px;color:#0077B6;vertical-align:middle;">H</div>
                  </td>
                  <td style="vertical-align:middle;padding-left:10px;">
                    <span style="font-size:26px;font-weight:800;color:#FFFFFF;letter-spacing:-0.5px;vertical-align:middle;">HMS</span>
                  </td>
                </tr>
              </table>
              <p style="color:#BEE9F5;font-size:13px;margin:10px 0 0;letter-spacing:0.3px;">Hospital Management System</p>
            </td>
          </tr>
          <tr>
            <td style="padding:40px 40px 32px;">
              <h1 style="font-size:22px;font-weight:700;color:#1E293B;margin:0 0 12px;line-height:1.3;">
                Welcome aboard, ${firstname} ${lastName} 🎉
              </h1>
              <p style="font-size:15px;color:#475569;line-height:1.7;margin:0 0 28px;">
                Your account has been successfully created on the Hospital Management System.
                Below are your login credentials — please keep them secure and change your password after your first login.
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;margin-bottom:24px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:8px 0;border-bottom:1px solid #E2E8F0;">
                          <p style="font-size:12px;color:#64748B;margin:0 0 2px;text-transform:uppercase;letter-spacing:0.5px;">Full Name</p>
                          <p style="font-size:15px;color:#1E293B;font-weight:600;margin:0;">${firstname} ${lastName}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:12px 0;border-bottom:1px solid #E2E8F0;">
                          <p style="font-size:12px;color:#64748B;margin:0 0 2px;text-transform:uppercase;letter-spacing:0.5px;">Email</p>
                          <p style="font-size:15px;color:#1E293B;font-weight:600;margin:0;">${email}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:12px 0;border-bottom:1px solid #E2E8F0;">
                          <p style="font-size:12px;color:#64748B;margin:0 0 2px;text-transform:uppercase;letter-spacing:0.5px;">Role</p>
                          <p style="font-size:15px;margin:0;">
                            <span style="background-color:#E0F7FB;color:#0077B6;font-weight:700;font-size:13px;padding:4px 12px;border-radius:20px;display:inline-block;">${role}</span>
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:12px 0;">
                          <p style="font-size:12px;color:#64748B;margin:0 0 2px;text-transform:uppercase;letter-spacing:0.5px;">Temporary Password</p>
                          <p style="font-size:15px;color:#1E293B;font-weight:600;margin:0;font-family:'Courier New',monospace;letter-spacing:0.5px;">${password}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F8FAFC;border:2px solid #0077B6;border-radius:12px;margin-bottom:10px;">
                <tr>
                  <td style="padding:24px 0;text-align:center;">
                    <a href="${loginUrl}" style="background-color:#0077B6;color:#FFFFFF;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:700;font-size:15px;">
                      Login to Your Dashboard
                    </a>
                  </td>
                </tr>
              </table>

              <p style="font-size:12px;color:#64748B;margin:0 0 32px;text-align:center;">
                For security, please change your password immediately after logging in for the first time.
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#FEF3E2;border-left:3px solid #F59E0B;border-radius:0 8px 8px 0;">
                <tr>
                  <td style="padding:14px 16px;">
                    <p style="font-size:13px;color:#92400E;line-height:1.6;margin:0;">
                      <strong style="color:#1E293B;">Didn't expect this account?</strong>
                      Please contact your hospital administrator immediately.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background-color:#F1F5F9;border-top:1px solid #E2E8F0;padding:24px 40px;text-align:center;">
              <p style="font-size:12px;color:#64748B;line-height:1.7;margin:0;">
                © ${new Date().getFullYear()} HMS · Hospital Management System · All rights reserved
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

</body>
</html>
`;

module.exports = welcomeEmailTemplate;
