import "./App.css";
import Header from "./pages/Header";
import Home from "./pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Payment from "./pages/Payment";
import MyUserContext from "./context/MyUserContext";
import { useState } from "react";
import Pharmacy from "./Pharmacy/Pharmacy";
import PharmaLogin from "./pages/PharmaLogin";
import PharmacyRoute from "./routes/PharmacyRoute";

function App() {
  const [authedUser, setAuthedUser] = useState(false);
  return (
    // BEM
    <MyUserContext.Provider value={{ authedUser, setAuthedUser }}>
      <Router>
        <div className="app">
          <Switch>
            <Route path="/login">
              <Login />
            </Route>

            <Route path="/pharmacy-login">
              <PharmaLogin />
            </Route>

            <PharmacyRoute path="/pharmacy">
              <Pharmacy />
            </PharmacyRoute>

            <div>
              <Header
                signStatus={authedUser ? "Sign Out" : "Sign In"}
                username={authedUser ? "User" : "Guest"}
              />
              <Route path="/payment">
                <Payment />
              </Route>

              <Route path="/checkout">
                <Checkout />
              </Route>

              <Route exact path="/">
                <Home />
              </Route>
            </div>
          </Switch>
        </div>
      </Router>
    </MyUserContext.Provider>
  );
}

export default App;
