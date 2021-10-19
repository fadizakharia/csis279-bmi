import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Redirect } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../store/actions/user";
import classes from "./Bmi.module.css";
import { Formik } from "formik";
import { loginSchema } from "../utils/validation/user";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
export default function Login() {
  const dispatch = useDispatch();
  const user = useSelector<rootReducer>((state) => state.user) as user;
  const loginHandler = (email: string, password: string) => {
    dispatch(loginAction(email, password));
  };
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(values) => loginHandler(values.email, values.password)}
      validationSchema={loginSchema}
      validateOnBlur={true}
      validateOnChange={true}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          initialValues,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;

        return (
          <form
            style={{ margin: "0 auto", padding: "20px" }}
            onSubmit={(event) => {
              event.preventDefault();
              return handleSubmit(event);
            }}
          >
            <Paper sx={{ maxWidth: "800px", margin: "0 auto" }}>
              <Grid
                sx={{ width: "100%", padding: "20px", margin: "100px auto" }}
                className={classes.root}
                container
              >
                <Grid
                  sx={{ textAlign: "center", marginBottom: "30px" }}
                  item
                  xs={12}
                >
                  <Typography variant="h5">Login</Typography>
                </Grid>
                <Grid sx={{ textAlign: "center" }} item xs={12}>
                  <TextField
                    variant="outlined"
                    label="email *"
                    name="email"
                    value={values.email}
                    fullWidth
                    FormHelperTextProps={{
                      style: { color: "red", opacity: 0.5 },
                    }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.email && touched.email}
                    error={errors.email && touched.email ? true : false}
                    margin="normal"
                  />
                </Grid>
                <Grid sx={{ textAlign: "center" }} item xs={12}>
                  <TextField
                    variant="outlined"
                    label="password *"
                    name="password"
                    fullWidth
                    type="password"
                    value={values.password}
                    FormHelperTextProps={{
                      style: { color: "red", opacity: 0.5 },
                    }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.password && touched.password}
                    error={errors.email && touched.email ? true : false}
                    margin="normal"
                  />
                </Grid>
                {Boolean(user.id) && <Redirect to="/" />}
                <Grid item xs={12}>
                  <Box sx={{ textAlign: "center" }}>
                    <Button
                      sx={{ margin: "30px" }}
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={!!errors.email || !!errors.password}
                    >
                      Login
                    </Button>
                    <Typography>
                      don't have an account? <Link to="/signup">signup</Link>
                    </Typography>
                  </Box>
                </Grid>
                {/* </Grid> */}
              </Grid>
            </Paper>
          </form>
        );
      }}
    </Formik>
  );
}
