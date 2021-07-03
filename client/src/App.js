// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       Hello App
//     </div>
//   );
// }

// export default App;


import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";
import ForgotPasswordScreen from "./components/screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./components/screens/ResetPasswordScreen";
import PrivateScreen from "./components/screens/PrivateScreen";
import PrviateRoute from "./components/routing/PrivateRoute";

function App() {
  return (
    <Router>
      <Switch>
        <PrviateRoute exact path="/" component={PrivateScreen} />
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/register" component={RegisterScreen} />
        <Route exact path="/forgotpassword" component={ForgotPasswordScreen} />
        <Route exact path="/passwordreset/:resetToken" component={ResetPasswordScreen} />
      </Switch>
    </Router>
  );
}

export default App;
