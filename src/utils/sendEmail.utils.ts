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
          <mj-text>Olá, <strong>${userName}</strong>!</mj-text>
          <mj-text>
            Você recebeu este e-mail porque uma solicitação de <strong>redefinição de senha</strong> para sua conta foi recebida.
            Por favor, siga as instruções abaixo para <strong>redefinir sua senha</strong>:
          </mj-text>
          <mj-button href="${process.env.BASE_URL_FRONT}resetPassword/${tokenResetPassword}">
            Redefinir sua senha
          </mj-button>
          <mj-text>
            Se você não solicitou a redefinição de senha, nenhuma ação adicional é necessária.
            Este link expirará em <strong>10 minutos</strong> por motivos de segurança.
          </mj-text>
          <mj-text>
            Se você precisar de mais assistência, entre em contato conosco através deste e-mail ou visite nosso
            <a href="${process.env.BASE_URL_FRONT}">site</a>.
          </mj-text>
        </mj-column>
      </mj-section>
      <mj-section>
        <mj-column>
          <mj-image src="https://i.imgur.com/ePfnxeW.png" width="153.02px" alt="Kenzie Kars" />
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
