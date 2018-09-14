import React, { Component } from 'react';
import './Login.css';
import logo from './media/ryerson_logo.png';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    // Set up test tokens prior to authentication implementation
    this.MASTER = "master";
    this.STUDENT = "student";
    this.ADMIN = "admin";
  }

  onChangeField = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  onLogin = () => {
      /** For Demo Purposes prior to authentication implementation
       *  have student account, admin, and master account
       */
      let authorizationToken = ""
      if (this.state.username === this.MASTER && this.state.password === this.MASTER) {
          authorizationToken = "mastertoken";
      } else if (this.state.username === this.ADMIN && this.state.password === this.ADMIN) {
          authorizationToken = "admintoken";
      } else if (this.state.username === this.STUDENT && this.state.password === this.STUDENT) {
          authorizationToken = "studenttoken";
      } else {
          // Do nothing
          authorizationToken = "unauthorized";
      }
      alert(authorizationToken);
      // Reset/Clear Fields
      this.setState({ 
          username: "",
          password: ""
      });
  }

  handleKeyPress = (e) => {  
        if (e.key === 'Enter') {
            this.onLogin();
        }
    }

  render() {
    return (
      <div id="cas">
        <div id="compatibility">
            <p><strong>Your browser version is not supported by Ryerson University.</strong></p>
            <p>Please update or adjust Compatibility View settings for an optimal experience.</p>
        </div>
        <div id="container" class="container">
          <header>
            <div id="logo">
              <img src={logo} width="227" height="110" alt="Ryerson University"/>
            </div>
          </header>
          <div class="box" id="login">
          <form method="post" id="fm1" action="">

            <div class="login-form">
                <section class="username">
                    <label for="username" class="formLabel">Ryerson SCS username</label>
                    <div>
                        <input class="required form-control" id="username" type="text" size="25" placeholder="Ryerson SCS username" autocomplete="off" aria-required="true" autofocus="" name="username" value={this.state.username} onChange={this.onChangeField} onKeyPress={this.handleKeyPress}/></div>
                </section>

                <section class="password">
                    <label for="password" class="formLabel">Password</label>
                    <div>
                        <input class="required form-control" id="password" type="password" size="25" placeholder="Password" autocomplete="off" aria-required="true" name="password" value={this.state.password} onChange={this.onChangeField} onKeyPress={this.handleKeyPress} /><span id="capslock-on">
                            {this.state.capsLock ? <p>
                                <i class="fa fa-exclamation-circle"></i>
                                <span>CAPSLOCK key is turned on!</span>
                            </p> : null}
                        </span>
                    </div>
                </section>
            </div>
            <section>
            <input type="hidden" name="execution" value="" /><input type="hidden" name="_eventId" value="submit" /><input id="submit" class="btn btn-submit btn-block btn-login" name="submit" value="Log in" onClick={this.onLogin} /></section>
            </form>
            <div class="loginBottom">
                <p>For technical issues specifically with the exam bank, please contact the <a href="mailto:admin@ryecscu.com">CSCU System Administrator</a>.<br/><br/>If you're having trouble logging into your SCS account across all platforms such as SCS webmail, please get in touch with the <a href="mailto:request@scs.ryerson.ca">CS System Administrators</a>.</p>
            </div>
            <footer>
                <div id="footer-message">
                    <div>Before entering your Ryerson SCS username and password, verify that the URL for this page begins with <strong>"https://scs.ryerson.ca/"</strong>.</div>
                </div>
            </footer>
        </div>
        </div>
      </div>
    );
  }
}

export default App;
