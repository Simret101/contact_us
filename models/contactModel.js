class Contact {
    constructor(email, subject, message) {
      this.email = email;
      this.subject = subject;
      this.message = message;
      this.timestamp = new Date();
    }
  }
  
  module.exports = Contact;
  