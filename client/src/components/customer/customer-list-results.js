import { useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Drawer,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
  Modal,
  Divider,
} from "@mui/material";
import { getInitials } from "../../utils/get-initials";
import { DateTime } from "luxon";
import { useDispatch, useSelector } from "react-redux";
import {
  validateUser,
  assignTask,
  getAssignedTasks,
  getAllServiceRequests,
  getUsersByType,
  getBillById,
} from "../../store/reducers/store.reducer";
import { isEmpty, get } from "lodash";
import { Cog as CogIcon } from "../../icons/cog";

export const CustomerListResults = ({ customers, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const [workersList, setWorkersList] = useState([]);
  const [billData, setBillData] = useState({});

  const dispatch = useDispatch();
  const assignTaskData = useSelector((state) => state.store.assignTask);
  const getUsersByTypeData = useSelector((state) => state.store.getUsersByType);
  const getBillByIdData = useSelector((state) => state.store.getBillById);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const formatDate = (date) => {
    const dateObj = DateTime.fromISO(date);
    const result = dateObj.toLocaleString(DateTime.DATE_MED);
    return result;
  };

  const handleAssignWorker = (event) => {
    const workerId = event.target.value;
    dispatch(assignTask({ params: { requestId: selectedRow._id, workerId } }));
  };

  useEffect(() => {
    const apiSuccess = get(assignTaskData, "data", {});

    if (!isEmpty(apiSuccess)) {
      dispatch(getAllServiceRequests());
    }
  }, [dispatch, assignTaskData]);

  useEffect(() => {
    const apiSuccess = get(getUsersByTypeData, "data", {});

    if (!isEmpty(apiSuccess)) {
      setWorkersList(apiSuccess.list);
    }
  }, [dispatch, getUsersByTypeData]);

  useEffect(() => {
    const apiSuccess = get(getBillByIdData, "data", {});

    if (!isEmpty(apiSuccess)) {
      setBillData(apiSuccess.bill);
      setIsModalOpen(true);
      setIsDrawerOpen(false);
    }
  }, [dispatch, getBillByIdData]);

  useEffect(() => {
    dispatch(getUsersByType({ params: { userType: "worker" } }));
  }, [dispatch]);

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === customers.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < customers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell> */}
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Vehicle Type</TableCell>
                <TableCell>Service Type</TableCell>
                <TableCell>Vehicle Number</TableCell>
                <TableCell>Worker</TableCell>
                <TableCell>Request date</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.slice(0, limit).map((customer) => (
                <TableRow
                  hover
                  key={customer.id}
                  selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                >
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                      onChange={(event) => handleSelectOne(event, customer.id)}
                      value="true"
                    />
                  </TableCell> */}
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Avatar src={customer.avatarUrl} sx={{ mr: 1 }}>
                        {getInitials(customer.userId.name)}
                      </Avatar>
                      {customer.userId.name}
                    </Box>
                  </TableCell>
                  <TableCell>{customer.userId.email}</TableCell>
                  <TableCell>{customer.userId.phoneNumber}</TableCell>
                  <TableCell>
                    <Chip
                      color={
                        customer.status === "completed"
                          ? "success"
                          : customer.status === "in-progress"
                          ? "primary"
                          : "warning"
                      }
                      label={
                        customer.status === "completed"
                          ? "Completed"
                          : customer.status === "in-progress"
                          ? "In Progress"
                          : "Pending"
                      }
                    />
                  </TableCell>
                  <TableCell>
                    {customer.vehicleType === "truck"
                      ? "Truck"
                      : customer.vehicleType === "bus"
                      ? "Bus"
                      : customer.vehicleType === "four-wheeler"
                      ? "Four wheeler"
                      : customer.vehicleType === "three-wheeler"
                      ? "Three wheeler"
                      : "Two wheeler"}
                  </TableCell>
                  <TableCell>
                    {customer.serviceType[0] === "washing"
                      ? "Washing"
                      : customer.serviceType[0] === "cleaning"
                      ? "Cleaning"
                      : customer.serviceType[0] === "servicing"
                      ? "Servicing"
                      : customer.serviceType[0] === "part-replacement"
                      ? "Part replacement"
                      : "Oil change"}
                  </TableCell>
                  <TableCell>{customer.vehicleNumber}</TableCell>
                  <TableCell>{isEmpty(customer.workerId) ? "" : customer.workerId.name}</TableCell>
                  <TableCell>{formatDate(customer.createdAt)}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        setIsDrawerOpen(true);
                        setSelectedRow(customer);
                      }}
                    >
                      <CogIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={customers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
      <Drawer anchor={"right"} open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <div
          style={{
            minWidth: 400,
            minHeight: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 30,
            paddingTop: 60,
          }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2>View Bill</h2>{" "}
              <Button
                variant="contained"
                onClick={() => dispatch(getBillById({ params: { requestId: selectedRow._id } }))}
              >
                Click here
              </Button>
            </div>
            <div style={{ marginTop: 40 }}>
              <h2>Assign Worker</h2>
              <div>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="worker"
                    name="radio-buttons-group"
                    onChange={handleAssignWorker}
                    defaultValue={isEmpty(selectedRow.workerId) ? null : selectedRow.workerId._id}
                  >
                    {workersList.map((worker) => (
                      <FormControlLabel
                        key={worker._id}
                        value={worker._id}
                        control={<Radio />}
                        label={worker.name}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
      <Modal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {!isEmpty(billData) && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <div>
              <Typography id="modal-modal-title" variant="h4" component="h2">
                Bill
              </Typography>
              <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mt: 2 }}>
                User Details
              </Typography>
              <Typography id="modal-modal-description" variant="subtitle2" sx={{ mt: 2 }}>
                <span style={{ fontWeight: 700 }}> Name:</span> {billData.userId.name}
              </Typography>
              <Typography id="modal-modal-description" variant="subtitle2" sx={{ mt: 1 }}>
                <span style={{ fontWeight: 700 }}> Address:</span> {billData.userId.address}
              </Typography>
              <Typography id="modal-modal-description" variant="subtitle2" sx={{ mt: 1 }}>
                <span style={{ fontWeight: 700 }}> City:</span> {billData.userId.city}
              </Typography>
              <Typography id="modal-modal-description" variant="subtitle2" sx={{ mt: 1 }}>
                <span style={{ fontWeight: 700 }}> State:</span> {billData.userId.state}
              </Typography>
              <Typography id="modal-modal-description" variant="subtitle2" sx={{ mt: 1 }}>
                <span style={{ fontWeight: 700 }}> Phone Number:</span>{" "}
                {billData.userId.phoneNumber}
              </Typography>
              <Typography id="modal-modal-description" variant="subtitle2" sx={{ mt: 1 }}>
                <span style={{ fontWeight: 700 }}> Landline:</span> {billData.userId.landline}
              </Typography>
              <Typography id="modal-modal-description" variant="subtitle2" sx={{ mt: 1 }}>
                <span style={{ fontWeight: 700 }}> Name:</span> {billData.userId.name}
              </Typography>
            </div>
            <Divider style={{ marginTop: 20, marginBottom: 20 }} />
            <div>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Service Request Details
              </Typography>
              <Typography id="modal-modal-description" variant="subtitle2" sx={{ mt: 2 }}>
                <span style={{ fontWeight: 700 }}> Vehicle Number:</span> {billData.vehicleNumber}
              </Typography>
              <Typography id="modal-modal-description" variant="subtitle2" sx={{ mt: 1 }}>
                <span style={{ fontWeight: 700 }}> Vehicle Type:</span> {billData.vehicleType}
              </Typography>
              <Typography id="modal-modal-description" variant="subtitle2" sx={{ mt: 1 }}>
                <span style={{ fontWeight: 700 }}> Service Type:</span> {billData.serviceType}
              </Typography>
            </div>

            <Divider style={{ marginTop: 20, marginBottom: 20 }} />
            <div>
              <Typography
                id="modal-modal-description"
                variant="subtitle2"
                sx={{
                  mt: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ fontWeight: 700 }}> Total Price:</span>{" "}
                <Chip label={`$ ${billData.price}`} />
              </Typography>
            </div>
          </Box>
        )}
      </Modal>
    </Card>
  );
};

CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired,
};
