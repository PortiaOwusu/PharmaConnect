import React from "react";

const MyUserContext = React.createContext({
  authedUser: false,
  setAuthedUser: (auth) => {},
});
export default MyUserContext;
