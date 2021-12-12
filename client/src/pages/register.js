import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useDispatch, useSelector } from "react-redux";
import { validateUser, register, clearRegisterAction } from "../store/reducers/store.reducer";
import { isEmpty, get } from "lodash";
import { useEffect, useState } from "react";

const Register = () => {
  const userData = useSelector((state) => state.store.validateUser);
  const registerData = useSelector((state) => state.store.register);
  const [pageValidate, setPageValidate] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      city: "",
      state: "",
      phoneNumber: "",
      landline: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().max(255).required("Name is required"),
      address: Yup.string().max(255).required("Address is required"),
      city: Yup.string().max(255).required("City is required"),
      state: Yup.string().max(255).required("State is required"),
      phoneNumber: Yup.string().max(255).required("Phone number is required"),
      landline: Yup.string().max(255).required("Landline number is required"),
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: (values) => {
      dispatch(register(values));
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
    const apiSuccess = get(registerData, "data", {});
    const apiFailure = get(registerData, "error", "");

    if (!isEmpty(apiSuccess)) {
      router.push("/login");
      dispatch(clearRegisterAction());
    }
    if (apiFailure) {
      alert("Email already in use");
      dispatch(clearRegisterAction());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, registerData]);

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      {pageValidate && (
        <Box
          component="main"
          sx={{
            alignItems: "center",
            display: "flex",
            flexGrow: 1,
            minHeight: "100%",
            py: 6,
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
                  Create a new account
                </Typography>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  Use your email to create a new account
                </Typography>
              </Box>
              <TextField
                error={Boolean(formik.touched.name && formik.errors.name)}
                fullWidth
                helperText={formik.touched.name && formik.errors.name}
                label="Name"
                margin="normal"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.name}
                variant="outlined"
              />
              <TextField
                error={Boolean(formik.touched.address && formik.errors.address)}
                fullWidth
                helperText={formik.touched.address && formik.errors.address}
                label="Address"
                margin="normal"
                name="address"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.address}
                variant="outlined"
              />
              <TextField
                error={Boolean(formik.touched.city && formik.errors.city)}
                fullWidth
                helperText={formik.touched.city && formik.errors.city}
                label="City"
                margin="normal"
                name="city"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.city}
                variant="outlined"
              />
              <TextField
                error={Boolean(formik.touched.state && formik.errors.state)}
                fullWidth
                helperText={formik.touched.state && formik.errors.state}
                label="State"
                margin="normal"
                name="state"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.state}
                variant="outlined"
              />
              <TextField
                error={Boolean(formik.touched.phoneNumber && formik.errors.phoneNumber)}
                fullWidth
                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                label="Phone number"
                margin="normal"
                name="phoneNumber"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                variant="outlined"
              />
              <TextField
                error={Boolean(formik.touched.landline && formik.errors.landline)}
                fullWidth
                helperText={formik.touched.landline && formik.errors.landline}
                label="Landline"
                margin="normal"
                name="landline"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.landline}
                variant="outlined"
              />
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
                  Sign Up
                </Button>
              </Box>
              <Typography color="textSecondary" variant="body2">
                Have an account?{" "}
                <NextLink href="/login" passHref>
                  <Link variant="subtitle2" underline="hover">
                    Sign In
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

export default Register;
