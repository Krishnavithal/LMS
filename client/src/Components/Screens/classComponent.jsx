import React, { Component } from "react";
import Box from "@material-ui/core/Box";
import {
  AppBar,
  Toolbar,
  Typography,
  withStyles,
  TextField,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";

class ClassComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      className: "",
      subject: "",
      timeOfClass: "",
      daysOfClass: [],
      roomId: "",
      noOfStudents: "",
      editable: "true",
      // userType: "Student",
      instructor: "",
      class: {},
    };
  }
  componentDidMount() {
    const classId = this.props.hist.location.pathname.substring(
      this.props.hist.location.pathname.indexOf("/overview") + 10
    );
    console.log(classId);
    fetch(`/getclass/${classId}`, {
      method: "get",
      headers: {
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((result) => result.json())
      .then((res) => {
        console.log(res);
        this.setState({
          className: res.class.name,
          roomId: res.class.id,
          subject: res.class.subject,
          timeOfClass: res.class.time,
          daysOfClass: res.class.days,
          noOfStudents: res.noOfstudents,
          editable: true,
          instructor: res.class.instructor,
        });
      })
      .catch((err) => console.log(err));
  }
  handleSave = () => {
    console.log("saving.....");
    fetch("/editclass", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        id: this.state.roomId,
        name: this.state.className,
        subject: this.state.subject,
        time: this.state.timeOfClass,
        days: this.state.daysOfClass,
        instructor: this.state.instructor,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          console.log(result.error);
        } else {
          console.log("edit successfull");
          this.props.hist.push("/");
        }
      })
      .catch((err) => console.log(err));
  };
  handleDelete = () => {
    fetch("/deleteclass/" + this.state.roomId, {
      method: "delete",
      headers: {
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) console.log("error in delete");
        else {
          console.log("delete successfull");
          this.props.hist.push("/");
        }
      });
  };
  render() {
    //console.log("Hi", this.props.hist);
    //console.log(this.state.name);
    if (JSON.parse(localStorage.getItem("user")) === null) {
      window.location.href = "http://localhost:3000/signin";
    }
    const { classes } = this.props;
    let details = this.props.location;
    const isTeacher =
      JSON.parse(localStorage.getItem("user")).type === "teacher" ? (
        <div >
          <IconButton
            onClick={() => {
              this.setState({ editable: false });
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton onClick={this.handleDelete}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={this.handleSave}>
            <SaveIcon />
          </IconButton>
        </div>
      ) : null;
    return (
      <div
        style={{
          margin: "auto",
          paddingLeft: 16,
          paddingRight: 32,
          paddingTop: 8,
          paddingBottom: 32,
          minWidth: "80vh",
          maxWidth: "80vh",
        }}
      >
        <div>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" noWrap>
                {this.state.className}
              </Typography>
              <div style={{ flexGrow: 1 }} />
              {isTeacher}
            </Toolbar>
          </AppBar>
        </div>
        <Box
          bgcolor="#e3dfc8"
          color="background.paper"
          style={{
            minHeight: "60vh",
            maxHeight: "60vh",
            textAlign: "left",
          }}
        >
          <div style={{ textAlign: "left", paddingTop: "5vh" }}>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={4}>
                <Grid item>
                  {console.log(this.state)}
                  <TextField
                    disabled={this.state.editable}
                    id="standard-disabled"
                    label="Class Name"
                    value={this.state.className}
                    //defaultValue={this.state.className}
                    onChange={(event) => {
                      this.setState({ className: event.target.value });
                    }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    disabled={this.state.editable}
                    id="standard-disabled"
                    label="Subject"
                    //defaultValue={this.state.subject}
                    value={this.state.subject}
                    onChange={(event) => {
                      this.setState({ subject: event.target.value });
                    }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    disabled={this.state.editable}
                    id="standard-disabled"
                    label="Time of Class"
                    //defaultValue={this.state.timeOfClass}
                    value={this.state.timeOfClass}
                    onChange={(event) => {
                      this.setState({ timeOfClass: event.target.value });
                    }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    disabled={this.state.editable}
                    id="standard-disabled"
                    label="Days of Class"
                    //defaultValue={this.state.daysOfClass}
                    value={this.state.daysOfClass}
                    onChange={(event) => {
                      this.setState({ daysOfClass: event.target.value });
                    }}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    disabled
                    id="standard-disabled"
                    label="Classroom Id"
                    //defaultValue={this.state.roomId}
                    value={this.state.roomId}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    disabled
                    id="standard-disabled"
                    label="No. of Students"
                    //defaultValue="10"
                    value={this.state.noOfStudents}
                  />
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Box>
      </div>
    );
  }
}

export default ClassComponent;
