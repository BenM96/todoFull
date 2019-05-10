import React, { Component } from 'react';


class Header extends Component {
  state={
    ran:false,
    ran2:1
  }

    render() {
      return (
        <header align="center" id="header">
          <h1>ToDo lists</h1>

        </header>
      );
    }
  }
export default Header;
