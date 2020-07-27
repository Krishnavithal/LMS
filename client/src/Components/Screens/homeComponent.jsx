import React, { Component } from "react";
import ClassRoomComponent from "./classRoomComponent";
class Home extends Component {
  state = {};
  constructor(props) {
    super(props);
    this.state = {
      sortBy: "",
      classRooms: [],
    };
    // this.handleSelect().bind(this);
  }
  componentDidMount() {
    fetch("/getClasses", {
      headers: {
        authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          console.log(result);
        } else {
          console.log(result);
          if (JSON.parse(localStorage.getItem("user")).type === "student") {
            console.log("student");
            this.setState({ classRooms: result.studentRooms });
          } else {
            console.log(JSON.parse(localStorage.getItem("user")).type);
            this.setState({ classRooms: result });
          }
        }
      });
  }
  sample = () => {
    return <ClassRoomComponent name={this.state.classRooms[0].Name} />;
  };
  handleSelect = (event) => {
    console.log("select clicked");
    this.setState({ sortBy: event.target.value }, () => {
      if (this.state.sortBy === "ClassName")
        this.handleSortByClass(this.state.sortBy);
      else this.handleSortBySubject(this.state.sortBy);
    });
  };
  handleSortByClass = (params) => {
    console.log(params);
    const sorted = this.state.classRooms.sort((a, b) => {
      const isReversed = 1; //this.state.sortBy === "ClassName" ? 1 : -1;
      return isReversed * a.name.localeCompare(b.name);
    });
    this.setState({ classRooms: sorted });
  };
  handleSortBySubject = (params) => {
    console.log(params);
    const sorted = this.state.classRooms.sort((a, b) => {
      const isReversed = 1; //this.state.sortBy === "ClassName" ? 1 : -1;
      return isReversed * a.subject.localeCompare(b.subject);
    });
    this.setState({ classRooms: sorted });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div>
          {/* <select class="custom-select" onChange={this.handleSelect}>
            <option value="" selected disabled>
              Sort By
            </option>
            <option value="ClassName">Class Name</option>
            <option value="Subject">Subject Name</option>
          </select> */}
          <select class="custom-select" onChange={this.handleSelect}>
            <option value="" selected disabled>
              Sort By
            </option>
            <option value="ClassName">Class Name</option>
            <option value="Subject">Subject Name</option>
          </select>
        </div>
        {this.state.classRooms.map((i) => {
          if (i) {
            console.log(i);
            return (
              <>
                <ClassRoomComponent details={i} hist={this.props.hist} />
              </>
            );
          }
        })}
      </div>
    );
  }
}

export default Home;
