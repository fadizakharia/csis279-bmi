import React, { Suspense, useEffect } from "react";
import { Route, Switch } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { currentUserAction } from "./store/actions/user";
import Spinner from "./components/Spinner";
import Navbar from "./components/Navbar";
const Login = React.lazy(() => import("./pages/Login"));
const Signup = React.lazy(() => import("./pages/Signup"));
const Welcome = React.lazy(() => import("./pages/Welcome"));
const Bmi = React.lazy(() => import("./pages/Bmi"));
const BmiHistory = React.lazy(() => import("./pages/BmiHistory"));

function App() {
  const dispatch = useDispatch();
  const user = useSelector<rootReducer>((state) => state.user) as user;
  const loading = useSelector<rootReducer>((state) => state.loading);
  useEffect(() => {
    dispatch(currentUserAction());
    return () => {};
  }, []);
  console.log(user);

  return (
    <React.Fragment>
      <Navbar />
      {loading && <Spinner />}
      <Suspense fallback={"loading..."}>
        {!Boolean(user.id) ? (
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/" component={Welcome} />
          </Switch>
        ) : (
          <Switch>
            <Route path="/bmi/history" component={BmiHistory} />
            <Route path="/bmi" component={Bmi} />
            <Route path="/" component={Welcome} />
          </Switch>
        )}
      </Suspense>
    </React.Fragment>
  );
}

export default App;
