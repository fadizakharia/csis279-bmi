import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Redirect, useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../store/actions/user";
import classes from "./Bmi.module.css";
import { Formik } from "formik";
import { signupSchema } from "../utils/validation/user";
import { registerCall } from "../api/auth";
import { clearLoadingAction, setLoadingAction } from "../store/actions/loading";
import { AxiosError } from "axios";
export default function Signup() {
  const dispatch = useDispatch();
  const [success, setSuccess] = useState<boolean>(false);
  const [serverErrors, setServerErrors] = useState<
    { field: string; message: string }[]
  >([]);
  const loading = useSelector<rootReducer>((state) => state.loading);
  const user = useSelector<rootReducer>((state) => state.user) as user;
  const signupHandler = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    dispatch(setLoadingAction());
    try {
      const res = await registerCall(
        firstName,
        lastName,
        email,
        password,
        confirmPassword
      );
      console.log(res);

      if (res.status === 200) {
        setSuccess(true);
        dispatch(clearLoadingAction());
      }
    } catch (err: any) {
      if (err.response.status === 400) {
        setServerErrors(await JSON.parse(err.response.message));
      } else {
        setServerErrors([
          { field: err.response.status, message: err.response.message },
        ]);
      }
    }
  };
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      onSubmit={(values) =>
        signupHandler(
          values.firstName,
          values.lastName,
          values.email,
          values.password,
          values.confirmPassword
        )
      }
      validationSchema={signupSchema}
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
            style={{ marginTop: "100px", padding: "20px" }}
            onSubmit={(event) => {
              event.preventDefault();
              return handleSubmit();
            }}
          >
            {serverErrors &&
              serverErrors.length > 0 &&
              serverErrors.map((err) => {
                <Container>
                  <Typography variant="subtitle1" color="red">
                    {err.field}:
                  </Typography>
                  <Typography variant="caption" color="red">
                    {err.message}
                  </Typography>
                </Container>;
              })}
            <Paper
              sx={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}
            >
              <Grid className={classes.root} container>
                <Grid
                  item
                  xs={12}
                  sx={{ textAlign: "center", marginBottom: "30px" }}
                >
                  <Typography variant="h5">create an account</Typography>
                </Grid>
                <Grid
                  item
                  sx={{ textAlign: "center", padding: "0 15px" }}
                  xs={12}
                  sm={6}
                >
                  <TextField
                    label="first name *"
                    name="firstName"
                    fullWidth
                    value={values.firstName}
                    variant="standard"
                    FormHelperTextProps={{
                      style: { color: "red", opacity: 0.5 },
                    }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.firstName && touched.firstName}
                    error={errors.firstName && touched.firstName ? true : false}
                    margin="normal"
                  />
                </Grid>
                <Grid
                  item
                  sx={{ textAlign: "center", padding: "0 15px" }}
                  xs={12}
                  sm={6}
                >
                  <TextField
                    label="last name *"
                    name="lastName"
                    fullWidth
                    value={values.lastName}
                    variant="standard"
                    FormHelperTextProps={{
                      style: { color: "red", opacity: 0.5 },
                    }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.lastName && touched.lastName}
                    error={errors.lastName && touched.lastName ? true : false}
                    margin="normal"
                  />
                </Grid>
                <Grid
                  item
                  sx={{ textAlign: "center", padding: "0 15px" }}
                  xs={12}
                >
                  <TextField
                    label="email *"
                    name="email"
                    fullWidth
                    value={values.email}
                    variant="standard"
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
                <Grid
                  item
                  sx={{ textAlign: "center", padding: "0 15px" }}
                  xs={12}
                >
                  <TextField
                    label="password *"
                    name="password"
                    fullWidth
                    value={values.password}
                    variant="standard"
                    FormHelperTextProps={{
                      style: { color: "red", opacity: 0.5 },
                    }}
                    type="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.password && touched.password}
                    error={errors.email && touched.email ? true : false}
                    margin="normal"
                  />
                </Grid>
                <Grid
                  item
                  sx={{ textAlign: "center", padding: "0 15px" }}
                  xs={12}
                >
                  <TextField
                    label="confirm password *"
                    name="confirmPassword"
                    type="password"
                    fullWidth
                    value={values.confirmPassword}
                    variant="standard"
                    FormHelperTextProps={{
                      style: { color: "red", opacity: 0.5 },
                    }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.confirmPassword && touched.confirmPassword
                    }
                    error={
                      errors.confirmPassword && touched.confirmPassword
                        ? true
                        : false
                    }
                    margin="normal"
                  />
                </Grid>
                {Boolean(user.id) && <Redirect to="/" />}
                <Grid
                  item
                  sx={{ textAlign: "center", marginTop: "30px" }}
                  xs={12}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={
                      !!errors.firstName ||
                      !!errors.lastName ||
                      !!errors.email ||
                      !!errors.password ||
                      !!errors.confirmPassword
                    }
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </form>
        );
      }}
    </Formik>
  );
}
