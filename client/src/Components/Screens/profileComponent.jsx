import React, { Component } from "react";
import {
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@material-ui/core";

class ProfileComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: JSON.parse(localStorage.getItem("user")),
    };
  }
  render() {
    if (this.state.rows === null) {
      window.location.href = "http://localhost:3000/signin";
    }
    return (
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <TableContainer
          component={Paper}
          style={{
            minWidth: "80vh",
            maxWidth: "80vh",
            margin: "auto",
            background: "#e3dfc8",
          }}
        >
          <Table aria-label="simple table">
            <TableBody>
              <TableRow key="name">
                <TableCell component="th" scope="row" align="center">
                  Name
                </TableCell>
                <TableCell align="center">{this.state.rows.name}</TableCell>
              </TableRow>
              <TableRow key="email">
                <TableCell component="th" scope="row" align="center">
                  Email
                </TableCell>
                <TableCell align="center">{this.state.rows.email}</TableCell>
              </TableRow>
              <TableRow key="userType">
                <TableCell component="th" scope="row" align="center">
                  User Type
                </TableCell>
                <TableCell align="center">{this.state.rows.type}</TableCell>
              </TableRow>
              <TableRow key="phone">
                <TableCell component="th" scope="row" align="center">
                  Mobile No
                </TableCell>
                <TableCell align="center">{this.state.rows.mobile}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default ProfileComponent;
