import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import classes from "./Navbar.module.css";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { logoutAction } from "../store/actions/user";

export default function Navbar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const handleLogin = () => {
    history.push("/login");
  };
  const handleLogout = () => {
    dispatch(logoutAction());
  };
  const user = useSelector<rootReducer>((state) => state.user) as user;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {Boolean(user.id) && (
            <React.Fragment>
              <Typography variant="h6" component="div">
                <Link className={classes.navigation} to="/bmi">
                  bmi
                </Link>
              </Typography>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link className={classes.navigation} to="/bmi/history">
                  history
                </Link>
              </Typography>
            </React.Fragment>
          )}
          {Boolean(user.id) ? (
            <Button onClick={handleLogout} color="inherit">
              Logout
            </Button>
          ) : (
            <Button onClick={handleLogin} color="inherit">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
