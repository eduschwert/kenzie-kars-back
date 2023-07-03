import { createTransport } from "nodemailer";
import AppError from "../errors/app.errors";
import { TUserEmailSend } from "../interfaces/user.interfaces";
import mjml2html from "mjml";

export const resetPasswordTemplate = (
  userName: string,
  userEmail: string,
  tokenResetPassword: string
) => {
  const mjmlTemplate = `
    <mjml>
      <mj-body>
        <mj-section>
          <mj-column>
            <mj-text>Olá, ${userName}!</mj-text>
            <mj-text>
              Você recebeu este e-mail porque uma solicitação de redefinição de senha para sua conta foi recebida.
              Por favor, siga as instruções abaixo para redefinir sua senha:
            </mj-text>
            <mj-button href="${process.env.BASE_URL_FRONT}resetPassword/${tokenResetPassword}">
              Redefinir sua senha
            </mj-button>
            <mj-text>
              Se você não solicitou a redefinição de senha, nenhuma ação adicional é necessária.
              Este link expirará em 10 minutos por motivos de segurança.
            </mj-text>
          </mj-column>
        </mj-section>
        <mj-section>
          <mj-column>
            <mj-text>
              Se você precisar de mais assistência, entre em contato conosco através deste e-mail ou visite nosso site.
            </mj-text>
            <mj-image src="https://raw.githubusercontent.com/G8-KenzieKars/Kenzie-Kars_front/develop/kenzie-kars-front/src/assets/logo.svg?token=GHSAT0AAAAAAB6HKSSNHDB2R37GDVXJZYF6ZFCGMVQ" width="153.02px" alt="Kenzie Kars" />
          </mj-column>
        </mj-section>
      </mj-body>
    </mjml>
  `;

  const { html } = mjml2html(mjmlTemplate);

  const emailTemplate = {
    to: userEmail,
    subject: "Redefinição de senha",
    html,
  };

  return emailTemplate;
};

export const sendEmail = async ({ to, subject, html }: TUserEmailSend) => {
  const transporter = createTransport({
    host: process.env.SMTP_HOST,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      html,
    });
  } catch (err) {
    console.log(err);
    throw new AppError(
      "Error sending email, please check your email and try again",
      400
    );
  }
};
