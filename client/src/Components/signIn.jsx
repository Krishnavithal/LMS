import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { useToasts } from "react-toast-notifications";
//const { addToast } = useToasts();
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: "",
      otp: "",
      isClicked: false,
      isError: "",
      isEnabled: true,
      logged: false,
    };
  }
  toHome() {
    console.log("in toHome");
    console.log(this.props);
    this.props.hist.push("/");
  }
  handleClick(event) {
    var apiBaseUrl = "/";
    var self = this;
    var payload = {
      email: this.state.username,
      password: this.state.password,
    };
    //9308712123 834921
    console.log(this.state.phoneNumber, this.state.otp);
    fetch("/auth/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobile: this.state.phoneNumber,
        otp: this.state.otp,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.errors) {
          console.log(result.error);
        } else {
          this.setState({ logged: true });
          console.log(result.token);
          localStorage.setItem("jwt", result.token);
          localStorage.setItem("user", JSON.stringify(result.user));
          console.log(localStorage.getItem("user"));
          console.log("Login successfull");
          this.toHome();
        }
      })
      .catch((err) => console.log(err));
  }
  render() {
    let showOtp = this.state.isClicked ? (
      <>
        <TextField
          hintText="Enter your OTP"
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
      </>
    ) : null;
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <AppBar title="Login" />
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <TextField
                errorText={this.state.isError}
                hintText="Enter your Mobile Number"
                floatingLabelText="Mobile Number"
                onChange={(event, newValue) => {
                  if (newValue.length !== 10) {
                    this.setState({
                      isError: "Phone number must contain 10 digits",
                      isEnabled: true,
                    });
                  } else {
                    this.setState({ isError: "", isEnabled: false });
                  }
                  this.setState({ phoneNumber: newValue });
                }}
              />
              <br />
              <RaisedButton
                disabled={this.state.isEnabled}
                label="Send OTP"
                primary={true}
                style={style}
                onClick={() => this.setState({ isClicked: true })}
              />
              <br />
              {showOtp}
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
  margin: 15,
};
export default SignIn;
