import Head from "next/head";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Container, Grid, Link, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { login, validateUser, clearLoginAction } from "../store/reducers/store.reducer";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, get } from "lodash";

const Login = () => {
  const [pageValidate, setPageValidate] = useState(false);

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.store.validateUser);
  const loginData = useSelector((state) => state.store.login);

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  useEffect(() => {
    dispatch(validateUser());
  }, [dispatch]);

  useEffect(() => {
    if (!isEmpty(userData.user)) {
      setPageValidate(true);

      switch (userData.user.userType) {
        case "admin":
          router.push("/customer-requests");
          break;
        case "worker":
          router.push("/tasks");
          break;
        case "user":
          router.push("/request-service");
          break;
      }
    }

    if (!isEmpty(userData.error)) {
      setPageValidate(true);
    }
  }, [dispatch, router, userData]);

  useEffect(() => {
    const apiFailure = get(loginData, "error", "");

    if (apiFailure) {
      alert("Incorrect email or password");
      dispatch(clearLoginAction());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, loginData]);

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      {pageValidate && (
        <Box
          component="main"
          sx={{
            alignItems: "center",
            display: "flex",
            flexGrow: 1,
            minHeight: "100%",
          }}
        >
          <Container maxWidth="sm">
            <NextLink href="/home" passHref>
              <Button component="a" startIcon={<ArrowBackIcon fontSize="small" />}>
                Home
              </Button>
            </NextLink>
            <form onSubmit={formik.handleSubmit}>
              <Box sx={{ my: 3 }}>
                <Typography color="textPrimary" variant="h4">
                  Sign in
                </Typography>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  Sign in on the platform
                </Typography>
              </Box>
              <TextField
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email Address"
                margin="normal"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="email"
                value={formik.values.email}
                variant="outlined"
              />
              <TextField
                error={Boolean(formik.touched.password && formik.errors.password)}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                label="Password"
                margin="normal"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.password}
                variant="outlined"
              />
              <Box sx={{ py: 2 }}>
                <Button
                  color="primary"
                  // disabled={formik.isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Sign In
                </Button>
              </Box>
              <Typography color="textSecondary" variant="body2">
                Don&apos;t have an account?{" "}
                <NextLink href="/register">
                  <Link
                    to="/register"
                    variant="subtitle2"
                    underline="hover"
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    Sign Up
                  </Link>
                </NextLink>
              </Typography>
            </form>
          </Container>
        </Box>
      )}
    </>
  );
};

export default Login;
