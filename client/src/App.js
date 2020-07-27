import React, { useEffect, createContext, useReducer, useContext } from "react";
import { BrowserRouter, Switch, Route, useHistory } from "react-router-dom";
import "./App.css";
import Signin from "../src/Components/signIn";
import SignUp from "../src/Components/signUp";
import Home from "./Components/Screens/homeComponent";
import ProfileComponent from "./Components/Screens/profileComponent";
import ClassComponent from "./Components/Screens/classComponent";
import TopBar from "./Components/Screens/topBar";
import SignInScreen from "../src/Components/signInScreen";
import { reducer, initialState } from "../src/reducers/userReducer";

export const UserContext = createContext();
const Routing = () => {
  console.log("in routing.........");
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    console.log("in use effect");
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      console.log("inside if");
      dispatch({ type: "USER", payload: user });
    } else {
      console.log(user);
      console.log("appppppppppppp");
      history.push("/signin");
    }
  }, []);
  //useEffect();
  return (
    <Switch>
      <Route exact path="/">
        <TopBar></TopBar>
        <Home hist={history}></Home>
      </Route>
      <Route path="/signin">
        <Signin hist={history}></Signin>
      </Route>
      <Route path="/signup">
        <SignUp></SignUp>
      </Route>
      <Route path="/profile">
        <TopBar></TopBar>
        <ProfileComponent hist={history}></ProfileComponent>
      </Route>
      <Route path="/overview">
        <TopBar></TopBar>
        <ClassComponent hist={history}></ClassComponent>
      </Route>
    </Switch>
  );
};
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="App">
      {console.log("first.....")}
      <UserContext.Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <Routing></Routing>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}
// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       loginPage: [],
//       uploadScreen: [],
//     };
//   }
//   componentWillMount() {
//     var loginPage = [];
//     loginPage.push(<SignInScreen parentContext={this} />);
//     this.setState({
//       loginPage: loginPage,
//     });
//   }
//   render() {
//     return (
//       <div className="App">
//         {this.state.loginPage}
//         {this.state.uploadScreen}
//       </div>
//     );
//   }
// }
// const style = {
//   margin: 15,
// };
export default App;
