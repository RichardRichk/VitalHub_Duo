using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace WebAPI.Utils.Mail
{
    public class EmailService : IEmailService
    {
        private readonly EmailSettings emailSettings;

        public EmailService (IOptions<EmailSettings> options)
        {
            emailSettings = options.Value;
        }
        public async Task SendEmailAsync(MailRequest mailRequest)
        {
            try
            {
                //obj que representa email 
                var email = new MimeMessage();
                //define o remetente do email
                email.Sender = MailboxAddress.Parse(emailSettings.Email);
                //adiciona destinatario do email 
                email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));
                //define o assunto do email 
                email.Subject = mailRequest.Subject;
                //Cria corpo do email 
                var builder = new BodyBuilder();
                //define o corpo do email com html 
                builder.HtmlBody = mailRequest.Body;
                //define o corpo do objeto mimemessage
                email.Body = builder.ToMessageBody();

                //cria um cliente SMTP para envio do email
                using (var smtp = new SmtpClient())
                {
                    //conecta-se ao servidor SMTP usando os dados do emailSettings
                    smtp.Connect
                        (emailSettings.Host, emailSettings.Port, SecureSocketOptions.StartTls);

                    //autentic-se no servidor SMTP usando dados do emailSettings
                    smtp.Authenticate(emailSettings.Email, emailSettings.Password);

                    //envia o e-mal assincrono
                    await smtp.SendAsync(email);
                }

            }
            catch (Exception)
            {

                throw;
            }

        }
    }
}
