import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { withStyles } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { withRouter, useHistory } from "react-router-dom";
import { useStyles } from "../../shared/appBarStyleService";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@material-ui/core";
import { UserContext } from "../../App";

// const useStyles1 = makeStyles((theme) => ({
//   grow: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     display: "none",
//     [theme.breakpoints.up("sm")]: {
//       display: "block",
//     },
//   },
//   inputRoot: {
//     color: "inherit",
//   },
//   inputInput: {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("md")]: {
//       width: "20ch",
//     },
//   },
//   sectionDesktop: {
//     display: "none",
//     [theme.breakpoints.up("md")]: {
//       display: "flex",
//     },
//   },
//   sectionMobile: {
//     display: "flex",
//     [theme.breakpoints.up("md")]: {
//       display: "none",
//     },
//   },
// }));
function TopBar(props) {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const classes1 = props.classes;
  const classes = useStyles1();
  console.log(classes);
  console.log(classes1);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [isLogOutClicked, setIsLogOutClicked] = React.useState(false);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogOut = () => {
    setAnchorEl(null);
    setIsLogOutClicked(true);
    localStorage.clear();
    dispatch({ type: "CLEAR" });
    history.push("/signin");
  };
  const handleCancel = () => {
    setAnchorEl(null);
    setIsLogOutClicked(false);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      //onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          setAnchorEl(null);
          props.history.push({
            pathname: "/profile",
          });
        }}
      >
        Profile
      </MenuItem>
      <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
    </Menu>
  );

  return (
    <>
<!--       <div className={classes.grow}> -->
      <div>
        <AppBar position="static" style={{ background: "rgb(0, 188, 212)" }}>
          <Toolbar>
            <Typography
<!--               className={classes.title} -->
              variant="h6"
              noWrap
              style={{ cursor: "pointer" }}
              onClick={() => {
                props.history.push({
                  pathname: "/",
                });
              }}
            >
              Learning Management System
            </Typography>
            <div 
<!--               className={classes.grow}  -->
              />
            <div 
<!--               className={classes.sectionDesktop} -->
              >
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
      </div>
      <Dialog
        open={isLogOutClicked}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action will log you out of the application.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCancel} color="primary" autoFocus>
            Log Out
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
export default withRouter(withStyles(useStyles)(TopBar));
//export default PrimarySearchAppBar;
