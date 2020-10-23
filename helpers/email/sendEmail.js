const nodemailer = require('nodemailer');
const fs = require('fs');
require('dotenv').config({ path: `${__dirname}/../.env` });

const ErrorResponse = require('../errors/ErrorResponse');
const errors = require('../errors/errorCodes');

const mailAccountUser = process.env.EMAIL;
const mailAccountPassword = process.env.EMAIL_PASS;
const templatePath = `${__dirname}/../assets/email`;

function sendPass(userEmail, generatedPassword, name) {
  const fromEmailAddress = mailAccountUser;
  const toEmailAddress = userEmail;

  const mailSubject = 'Recuperação de Senha';
  let mailBody = fs.readFileSync(`${templatePath}/resetPass.html`, { encoding: 'utf-8', flag: 'r' });
  mailBody = mailBody.replace('#NOME_DO_CONTATO', name);
  mailBody = mailBody.replace('#NOVA_SENHA', generatedPassword);

  const transport = nodemailer.createTransport({
    service: 'gmail',
    tls: { rejectUnauthorized: false },
    auth: {
      user: mailAccountUser,
      pass: mailAccountPassword,
    },
  });

  const mail = {
    from: `Formei e Agora <${fromEmailAddress}>`,
    to: toEmailAddress,
    subject: mailSubject,
    html: mailBody,
  };

  transport.sendMail(mail, (error/* , response */) => {
    if (error) {
      console.log(error);
      throw new ErrorResponse(errors.FAILED_TO_SEND_EMAIL);
    }
  });
  transport.close();
}

function sendNewestJobs(userEmail, jobs, name) {
  const fromEmailAddress = mailAccountUser;
  const toEmailAddress = userEmail;

  const mailSubject = 'Recuperação de Senha';
  let mailBody = fs.readFileSync(`${templatePath}/resetPass.html`, { encoding: 'utf-8', flag: 'r' });
  mailBody = mailBody.replace('#NOME_DO_CONTATO', name);
  mailBody = mailBody.replace('#NOVA_SENHA', jobs[0].description);

  const transport = nodemailer.createTransport({
    service: 'gmail',
    tls: { rejectUnauthorized: false },
    auth: {
      user: mailAccountUser,
      pass: mailAccountPassword,
    },
  });

  const mail = {
    from: `Formei e Agora <${fromEmailAddress}>`,
    to: toEmailAddress,
    subject: mailSubject,
    html: mailBody,
  };

  transport.sendMail(mail, (error/* , response */) => {
    if (error) {
      console.log(error);
      throw new ErrorResponse(errors.FAILED_TO_SEND_EMAIL);
    }
  });
  transport.close();
}

module.exports = {
  sendPass,
  sendNewestJobs,
};
