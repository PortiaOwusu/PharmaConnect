import { Route, Redirect } from "react-router-dom";
import { usePharmacyState } from "../state/store";

const PharmacyRoute = ({ path, children, ...rest }) => {
  const isLoggedIn = usePharmacyState((state) => state.isLoggedIn);
  const pharmacy = usePharmacyState((state) => state.pharmacy);
  const state = usePharmacyState((state) => state);

  console.log(state);

  return (
    <Route {...rest} path={path}>
      {isLoggedIn && pharmacy?.registrationNumber ? (
        { ...children }
      ) : (
        <Redirect to="/pharmacy-login" />
      )}
    </Route>
  );
};

export default PharmacyRoute;
