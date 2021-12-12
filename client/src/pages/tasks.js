import Head from "next/head";
import { Box, Container } from "@mui/material";
// import { CustomerListResults } from "../components/customer/customer-list-results";
import { AssignedTaskResults } from "../components/assigned-tasks/assigned-task-results";
// import { CustomerListToolbar } from "../components/customer/customer-list-toolbar";
import { AssignedTaskToolbar } from "../components/assigned-tasks/assigned-task-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import { useDispatch, useSelector } from "react-redux";
import { validateUser, getAssignedTasks } from "../store/reducers/store.reducer";
import { isEmpty, get } from "lodash";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Tasks = () => {
  const [list, setList] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.store.validateUser);
  const getAssignedTasksData = useSelector((state) => state.store.getAssignedTasks);

  const [pageValidate, setPageValidate] = useState(false);

  useEffect(() => {
    dispatch(validateUser());
    dispatch(getAssignedTasks());
  }, [dispatch]);

  useEffect(() => {
    if (!isEmpty(userData.user)) {
      if (userData.user.userType !== "worker") {
        router.push("/404");
      }

      setPageValidate(true);
    }

    if (!isEmpty(userData.error)) {
      setPageValidate(true);
    }
  }, [dispatch, router, userData]);

  useEffect(() => {
    const apiSuccess = get(getAssignedTasksData, "data", {});

    if (!isEmpty(apiSuccess)) {
      setList(apiSuccess.list);
    }
  }, [dispatch, router, getAssignedTasksData]);

  return (
    <>
      <Head>
        <title>Assigned Tasks</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          {/* <CustomerListToolbar /> */}
          <AssignedTaskToolbar />
          <Box sx={{ mt: 3 }}>
            {/* <CustomerListResults customers={customers} /> */}
            <AssignedTaskResults tasks={list} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

Tasks.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Tasks;
