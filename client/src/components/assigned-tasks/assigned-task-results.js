import { useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
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
  IconButton,
  Drawer,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { getInitials } from "../../utils/get-initials";
import { DateTime } from "luxon";
import { Cog as CogIcon } from "../../icons/cog";
import { useDispatch, useSelector } from "react-redux";
import {
  validateUser,
  updateTaskStatus,
  getAssignedTasks,
} from "../../store/reducers/store.reducer";
import { isEmpty, get } from "lodash";

export const AssignedTaskResults = ({ tasks, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});

  const dispatch = useDispatch();
  const updateTaskStatusData = useSelector((state) => state.store.updateTaskStatus);

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

  const handleUpdateStatus = (event) => {
    const status = event.target.value;
    dispatch(updateTaskStatus({ params: { requestId: selectedRow._id }, body: { status } }));
  };

  useEffect(() => {
    const apiSuccess = get(updateTaskStatusData, "data", {});

    if (!isEmpty(apiSuccess)) {
      dispatch(getAssignedTasks());
    }
  }, [dispatch, updateTaskStatusData]);

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === tasks.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < tasks.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell> */}
                <TableCell>Vehicle Number</TableCell>
                <TableCell>Vehicle Type</TableCell>
                <TableCell>Service Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Request date</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.slice(0, limit).map((customer) => (
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
                  <TableCell>{customer.vehicleNumber}</TableCell>
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
        count={tasks.length}
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
            <div style={{ marginTop: 40 }}>
              <h2>Update Status</h2>
              <div>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="worker"
                    defaultValue={selectedRow.status}
                    name="radio-buttons-group"
                    onChange={handleUpdateStatus}
                  >
                    <FormControlLabel value="pending" control={<Radio />} label="Pending" />
                    <FormControlLabel value="in-progress" control={<Radio />} label="In Progress" />
                    <FormControlLabel value="completed" control={<Radio />} label="Completed" />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </Card>
  );
};

AssignedTaskResults.propTypes = {
  tasks: PropTypes.array.isRequired,
};
