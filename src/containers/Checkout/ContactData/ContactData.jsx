import React, { Component } from "react";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
  };
  render() {
    return (
      <div>
        <h4>Enter your contact</h4>
      </div>
    );
  }
}

export default ContactData;
