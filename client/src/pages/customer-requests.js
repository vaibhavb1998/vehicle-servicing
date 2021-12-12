import Head from "next/head";
import { Box, Container } from "@mui/material";
import { CustomerListResults } from "../components/customer/customer-list-results";
import { CustomerListToolbar } from "../components/customer/customer-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import { useDispatch, useSelector } from "react-redux";
import { validateUser, getAllServiceRequests } from "../store/reducers/store.reducer";
import { isEmpty, get } from "lodash";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Customer = () => {
  const [list, setList] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.store.validateUser);
  const getAllServiceRequestsData = useSelector((state) => state.store.getAllServiceRequests);

  const [pageValidate, setPageValidate] = useState(false);

  useEffect(() => {
    dispatch(validateUser());
    dispatch(getAllServiceRequests());
  }, [dispatch]);

  useEffect(() => {
    if (!isEmpty(userData.user)) {
      if (userData.user.userType !== "admin") {
        router.push("/404");
      }

      setPageValidate(true);
    }

    if (!isEmpty(userData.error)) {
      setPageValidate(true);
    }
  }, [dispatch, router, userData]);

  useEffect(() => {
    const apiSuccess = get(getAllServiceRequestsData, "data", {});

    if (!isEmpty(apiSuccess)) {
      setList(apiSuccess.list);
    }
  }, [dispatch, router, getAllServiceRequestsData]);

  return (
    <>
      <Head>
        <title>Customers</title>
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
            <CustomerListToolbar />
            <Box sx={{ mt: 3 }}>
              <CustomerListResults customers={list} />
            </Box>
          </Container>
        </Box>
      )}
    </>
  );
};
Customer.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Customer;
