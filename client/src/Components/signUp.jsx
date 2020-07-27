import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import axios from "axios";
import SignIn from "./signIn";
import { Radio, RadioGroup, FormControlLabel } from "@material-ui/core";
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      phoneNumber: "",
      otp: "",
      userType: "",
      firstNameError: "",
      lastNameError: "",
      emailError: "",
      mobileError: "",
    };
  }
  handleRadioChange = (event) => {
    this.setState({ userType: event.target.value });
  };
  handleClick(event) {
    var apiBaseUrl = "http://localhost:4000/api/";
    console.log(
      "values",
      this.state.first_name,
      this.state.last_name,
      this.state.email,
      this.state.password
    );
    //To be done:check for empty values before hitting submit
    var self = this;
    var payload = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post(apiBaseUrl + "/register", payload)
      .then(function (response) {
        console.log(response);
        if (response.data.code === 200) {
          //  console.log("registration successfull");
          var loginscreen = [];
          loginscreen.push(<SignIn parentContext={this} />);
          var loginmessage = "Not Registered yet.Go to registration";
          self.props.parentContext.setState({
            loginscreen: loginscreen,
            loginmessage: loginmessage,
            buttonLabel: "Register",
            isLogin: true,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar title="SignUp" />
            <TextField
              hintText="Enter your First Name"
              floatingLabelText="First Name"
              errorText={this.state.firstNameError}
              onChange={(event) =>
                this.setState({ first_name: event.target.value }, () => {
                  if (this.state.first_name.length < 5)
                    this.setState({
                      firstNameError:
                        "First Name should be atleast 5 characters",
                    });
                  else this.setState({ firstNameError: "" });
                })
              }
            />
            <br />
            <TextField
              hintText="Enter your Last Name"
              floatingLabelText="Last Name"
              errorText={this.state.lastNameError}
              onChange={(event, newValue) =>
                this.setState({ last_name: newValue }, () => {
                  if (this.state.last_name.length < 5)
                    this.setState({
                      lastNameError: "Last Name should be atleast 5 characters",
                    });
                  else this.setState({ lastNameError: "" });
                })
              }
            />
            <br />
            <TextField
              hintText="Enter your Email"
              type="email"
              floatingLabelText="Email"
              onChange={(event, newValue) => this.setState({ email: newValue })}
            />
            <br />
            <TextField
              hintText="Enter your Mobile Number"
              //type="phonenumber"
              floatingLabelText="Mobile"
              onChange={(event, newValue) =>
                this.setState({ phoneNumber: newValue })
              }
            />
            <br />
            <RadioGroup
              aria-label="quiz"
              name="quiz"
              style={{ display: "flow-root" }}
              //value={value}
              onChange={this.handleRadioChange}
            >
              <FormControlLabel
                value="Teacher"
                control={<Radio />}
                label="Teacher"
              />
              <FormControlLabel
                value="Student"
                control={<Radio />}
                label="Student"
              />
            </RadioGroup>
            <RaisedButton
              label="Send OTP"
              primary={true}
              style={style}
              onClick={(event) => this.handleClick(event)}
            />
            <br />
            <TextField
              //type="number"
              //errorText="Not a valid OTP"
              hintText="Enter 6 digit otp"
              floatingLabelText="OTP"
              onChange={(event, newValue) => this.setState({ otp: newValue })}
            />
            <br />
            <RaisedButton
              label="Submit"
              primary={true}
              style={style}
              onClick={(event) => this.handleClick(event)}
            />
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
  margin: 15,
};
export default SignUp;
