class Contact {
  constructor(email, name, message) { 
    this.email = email;
    this.name = name;  
    this.message = message;
    this.timestamp = new Date();
  }
}

module.exports = Contact;
