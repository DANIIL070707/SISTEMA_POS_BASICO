import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

export const enviarMail = async (email) =>{

    const fecha = new Date();

const config = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth:{
        user:process.env.USERMAIL,
        pass:process.env.PASSEMAIL
    }
}
    const transport = nodemailer.createTransport(config)
 
    const mensaje = {
        from: process.env.USERMAIL, // sender address
        to: email, // list of receivers
        subject: `Hello ${email}`, // Subject line
        text: `Has inciado sesion ${fecha}`, // plain text body
      //  html: "<b>Hello world?</b>", // html body
    }

    const info =  await transport.sendMail(mensaje)

    console.log(info)
}

export const enviarMailCodigo = async (codigo, email, platform, browser) =>{

 //   const fecha = new Date();
console.log('Hola')
const config = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth:{
        user:process.env.USERMAIL,
        pass:process.env.PASSEMAIL
    }
}
    const transport = nodemailer.createTransport(config)
 
    const mensaje = {
        from: process.env.USERMAIL, // sender address
        to: email, // list of receivers
        subject: `Hola ${email} solicitud restablecer contraseña`, // Subject line
        text: `Su codigo para restablecer contraseña es **${codigo}** Enviado desde Platform: ${platform}, Browser: ${browser}
        `, // plain text body
      //  html: "<b>Hello world?</b>", // html body
    }

    const info =  await transport.sendMail(mensaje)

    console.log(info)
}