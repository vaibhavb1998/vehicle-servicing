import Head from "next/head";
import { Box, Container, Grid, Typography } from "@mui/material";
import { AccountProfile } from "../components/account/account-profile";
import { AccountProfileDetails } from "../components/account/account-profile-details";
import { DashboardLayout } from "../components/dashboard-layout";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { validateUser } from "../store/reducers/store.reducer";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";

const Account = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.store.validateUser);
  const [pageValidate, setPageValidate] = useState(false);

  useEffect(() => {
    dispatch(validateUser());
  }, [dispatch]);

  useEffect(() => {
    if (!isEmpty(userData.user)) {
      if (userData.user.userType !== "user") {
        router.push("/404");
      }

      setPageValidate(true);
    }

    if (!isEmpty(userData.error)) {
      setPageValidate(true);
    }
  }, [dispatch, router, userData]);

  return (
    <>
      <Head>
        <title>Request a service</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            Request a service
          </Typography>

          <AccountProfileDetails />
        </Container>
      </Box>
    </>
  );
};

Account.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Account;
