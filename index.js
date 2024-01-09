const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route to handle contact form submission
app.post('/api/contactForm', (req, res) => {
  const { fname, lname, email, phoneNumber, topic, message } = req.body;

  // Validate and process the form data
  // Example: Send an email using nodemailer
  const transporter = nodemailer.createTransport({
    // Setup your email configuration
    // Example for a Gmail account:
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: true,
    auth: {
      user:process.env.API_KEY,
      pass:process.env.SECRET_KEY,
    },
  });

  const mailOptions = {
    from: email,
    to: 'lua.kellly@gmail.com', 
    subject: `From portfolio: ${topic}`,
    html: `
      <p><strong>Name:</strong> ${fname} ${lname}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone Number:</strong> ${phoneNumber}</p>
      <p><strong>Topic:</strong> ${topic}</p>
      <br/>
      <p><strong>Message:</strong> ${message}</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ success: false, error: 'Failed to send email.' });
    }

    console.log('Email sent:', info.response);
    return res.status(200).json({ success: true, message: 'Email sent successfully.' });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
