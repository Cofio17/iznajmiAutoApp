const { Resend } = require("resend");
const express = require('express');

const sendEmail = async (req, res) => {
    const resend = new Resend(process.env.EMAIL_RESEND_API_KEY);

    try {
        const { to, subject, html } = req.body; // Preuzimanje podataka iz zahteva

        if (!to || !subject || !html) {
            return res.status(400).json({
                message: "Invalid request. 'to', 'subject', and 'html' fields are required."
            });
        }

        // Slanje e-maila
        await resend.emails.send({
            from: 'rezervacije@iznajmi.me',
            to: to,
            subject: subject,
            html: html
        });

        // Uspešan odgovor
        res.status(201).json({
            message: "Email successfully sent",

        });
    } catch (error) {
        // Rukovanje greškom
        res.status(500).json({
            message: "Failed to send email",
            error: error.message
        });
    }
}

module.exports = {
    sendEmail
}
