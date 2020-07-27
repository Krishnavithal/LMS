import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withRouter, Link } from "react-router-dom";

class ClassRoomComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userType: "" };
  }
//   useStyles = () => {
//     makeStyles({
//       root: {
//         maxWidth: 345,
//       },
//       media: {
//         height: 140,
//       },
//     });
//   };
  handleView = (path) => {
    this.props.history.push({
      pathname: path,
    });
  };
  render() {
//     const classes = this.useStyles;
    const isStudent =
      this.state.userType === "Student" ? this.state.userType : null;
    return (
      <Card
        style={{
          alignItems: "left",
          textAlign: "left",
          background: "#e3dfc8",
        }}
        onClick={() => {
          console.log("detailssssssss", this.props.details);
          this.handleView("/overview/" + this.props.details.id);
        }}
      >
        <CardActionArea>
          <CardMedia
            image="/static/images/cards/contemplative-reptile.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {this.props.details.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {this.props.details.subject}
              <br />
              {this.props.details.days}
              <br />
              {this.props.details.time}
              {isStudent}
            </Typography>
            <CardActions>
              <Button
                size="small"
                color="primary"
                onClick={() => {
                  this.handleView("/overview/" + this.props.details.id);
                }}
                // component={Link}
                // to="/class"
              >
                View Classroom
              </Button>
            </CardActions>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }
}
export default withRouter(ClassRoomComponent);
