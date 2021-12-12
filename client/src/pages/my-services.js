import Head from "next/head";
import { Box, Container } from "@mui/material";
import { MyServicesResults } from "../components/my-services/my-services-results";
import { MyServicesToolbar } from "../components/my-services/my-services-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { validateUser, myRequests } from "../store/reducers/store.reducer";
import { isEmpty, get } from "lodash";
import { useEffect, useState } from "react";

const MyServices = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.store.validateUser);
  const myRequestsData = useSelector((state) => state.store.myRequests);
  const [pageValidate, setPageValidate] = useState(false);
  const [list, setList] = useState([]);

  useEffect(() => {
    dispatch(validateUser());
    dispatch(myRequests());
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

  useEffect(() => {
    const apiSuccess = get(myRequestsData, "data", {});

    if (!isEmpty(apiSuccess)) {
      setList(apiSuccess.list);
    }
  }, [dispatch, router, myRequestsData]);

  return (
    <>
      <Head>
        <title>My Services</title>
      </Head>
      {pageValidate && (
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth={false}>
            <MyServicesToolbar />
            <Box sx={{ mt: 3 }}>
              <MyServicesResults services={list} />
            </Box>
          </Container>
        </Box>
      )}
    </>
  );
};
MyServices.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default MyServices;
