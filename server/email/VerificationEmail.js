const verificationEmailTemplate = (firstname, verificationTokenUrl) => `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Verify your Blogify account</title>
</head>
<body style="margin:0;padding:0;background-color:#F0EBE1;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F0EBE1;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="520" cellpadding="0" cellspacing="0" style="background-color:#EDE4D0;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(45,80,22,0.10);border:1px solid #D4C9B0;">

          <!-- ── Header ── -->
          <tr>
            <td style="background-color:#2D5016;padding:36px 40px 28px;text-align:center;">
              <!-- Logo -->
              <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr>
                  <td style="vertical-align:middle;">
                    <div style="width:40px;height:40px;background-color:#F5F0E8;border-radius:10px;display:inline-block;text-align:center;line-height:40px;font-weight:900;font-size:20px;color:#2D5016;vertical-align:middle;">B</div>
                  </td>
                  <td style="vertical-align:middle;padding-left:10px;">
                    <span style="font-size:26px;font-weight:800;color:#F5F0E8;letter-spacing:-0.5px;vertical-align:middle;">Blogify</span>
                  </td>
                </tr>
              </table>
              <p style="color:#A8C98A;font-size:13px;margin:10px 0 0;letter-spacing:0.3px;">A home for thoughtful writing</p>
            </td>
          </tr>

          <!-- ── Body ── -->
          <tr>
            <td style="padding:40px 40px 32px;">

              <!-- Greeting -->
              <h1 style="font-size:22px;font-weight:700;color:#3D2B1A;margin:0 0 12px;line-height:1.3;">
                Verify your email address 👋
              </h1>
              <p style="font-size:15px;color:#7A6547;line-height:1.7;margin:0 0 32px;">
                Hello <strong style="color:#3D2B1A;">${firstname}</strong>, thanks for signing up for Blogify!
                To complete your registration and start reading and writing, please enter
                the one-time code below.
              </p>

              <!-- OTP label -->
              <p style="font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#7A6547;margin:0 0 12px;">
                Your verification code
              </p>

              <!-- OTP Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F0E8;border:2px solid #2D5016;border-radius:12px;margin-bottom:10px;">
                <tr>
                  <td style="padding:28px 0;text-align:center;">
                     <p>Please click the button below to verify your email.</p>

        <a href="${verificationTokenUrl}">
          Verify Email
        </a>
                  </td>
                </tr>
              </table>

              <!-- Expiry -->
              <p style="font-size:12px;color:#7A6547;margin:0 0 32px;text-align:center;">
                This code expires in <strong style="color:#2D5016;">10 minutes</strong>. Do not share it with anyone.
              </p>

              <!-- Divider -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td style="border-top:1px solid #D4C9B0;font-size:0;line-height:0;">&nbsp;</td>
                </tr>
              </table>

              <!-- Security notice -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F0E8;border-left:3px solid #C4A882;border-radius:0 8px 8px 0;margin-bottom:0;">
                <tr>
                  <td style="padding:14px 16px;">
                    <p style="font-size:13px;color:#7A6547;line-height:1.6;margin:0;">
                      <strong style="color:#3D2B1A;">Didn't sign up for Blogify?</strong>
                      You can safely ignore this email. Someone may have entered your address
                      by mistake. Your account will not be created unless this code is entered.
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- ── Footer ── -->
          <tr>
            <td style="background-color:#E4D9C4;border-top:1px solid #D4C9B0;padding:24px 40px;text-align:center;">
              <p style="font-size:12px;color:#7A6547;line-height:1.7;margin:0;">
                This email was sent to you because you recently created a Blogify account.<br/>
                If you did not make this request, you can safely ignore this email.
              </p>
              <table cellpadding="0" cellspacing="0" style="margin:12px auto 0;">
                <tr>
                  <td style="padding:0 8px;">
                    <a href="#" style="font-size:12px;color:#7A6547;text-decoration:none;">Help Centre</a>
                  </td>
                  <td style="padding:0 8px;border-left:1px solid #C4A882;">
                    <a href="#" style="font-size:12px;color:#7A6547;text-decoration:none;">Privacy Policy</a>
                  </td>
                  <td style="padding:0 8px;border-left:1px solid #C4A882;">
                    <a href="#" style="font-size:12px;color:#7A6547;text-decoration:none;">Unsubscribe</a>
                  </td>
                </tr>
              </table>
              <p style="font-size:12px;color:#C4A882;margin:16px 0 0;">
                © ${new Date().getFullYear()} Blogify · All rights reserved
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

export default verificationEmailTemplate;