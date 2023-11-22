const nodemailer = require("nodemailer");
const { findUserByToken } = require("../services/user.service");
const { getClassById } = require("../services/class.service");

let htmlMail = (telefono, email, horario, motivo) => `<div style="width: 700px">

    <div
        style="
    background-color: rgb(66, 195, 195);
    font: 700;
    font-size: 47px;
    color: white;
    padding: 10px;
    height:100%;
  "
    >
        Aulaez
    </div>
    <div
        style="
    display: flex;
    flex-direction: column;
    padding: 10px;
    align-items: center;
    width: 100%;
    height:100%;
    gap;20px;
  "
    >
        <span style="font-size: 27px"> Nueva contratacion</span>
        <div
            style="
      display: flex;
      flex-direction: column;
      gap;10px;
      margin-top: 15px;
      width: 100%;
    "
        >
            <div style="display: flex; justify-content: space-around">
                <span style="font-size: 20px">Telefono: </span>
                <span style="font-size: 20px">${telefono}</span>
            </div>
            <div style="display: flex; justify-content: space-around">
                <span style="font-size: 20px">Email de contacto: </span>
                <span style="font-size: 20px">${email}</span>
            </div>
            <div style="display: flex; justify-content: space-around">
                <span style="font-size: 20px">Horario de referencia: </span>
                <span style="font-size: 20px">${horario}</span>
            </div>
            <div style="display: flex; justify-content: space-around">
                <span style="font-size: 20px">Motivo: </span>
                <span style="font-size: 20px">${motivo}</span>
            </div>
        </div>
    </div>
</div > `



exports.sendEmail = function (emailProveedor, bodyMail) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: 'tpoapisfeliale@gmail.com',
            pass: 'hoel xjpt ktsh jarw'
        }
    });

    const { telefono, mail, horario, motivo } = bodyMail
    var message = {
        from: "sender@server.com",
        to: emailProveedor,
        subject: "Nueva contratación",
        html: htmlMail(telefono, mail, horario, motivo)
    };

    transporter.sendMail(message)



    // verify connection configuration
    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log("Server is ready to take our messages");
        }
    });
}

