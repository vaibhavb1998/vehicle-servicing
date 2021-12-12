import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { validateUser, requestService } from "../../store/reducers/store.reducer";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";

const states = [
  {
    value: "alabama",
    label: "Alabama",
  },
  {
    value: "new-york",
    label: "New York",
  },
  {
    value: "san-francisco",
    label: "San Francisco",
  },
];

const vehicleTypePricing = {
  truck: 500,
  bus: 400,
  "four-wheeler": 300,
  "three-wheeler": 200,
  "two-wheeler": 100,
};

const serviceTypePricing = {
  washing: 500,
  cleaning: 400,
  servicing: 300,
  "part-replacement": 200,
  "oil-change": 100,
};

export const AccountProfileDetails = (props) => {
  const [values, setValues] = useState({
    vehicleType: "truck",
    serviceType: "washing",
    vehicleNumber: "",
    price: 0,
  });

  const router = useRouter();
  const userData = useSelector((state) => state.store.validateUser);
  const registerData = useSelector((state) => state.store.register);
  const [pageValidate, setPageValidate] = useState(false);

  const dispatch = useDispatch();

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
  }, [dispatch, userData]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    setValues({
      ...values,
      price: vehicleTypePricing[values.vehicleType] + serviceTypePricing[values.serviceType],
    });
  }, [values.vehicleType, values.serviceType]);

  const handleSubmit = () => {
    dispatch(requestService(values));
    router.push("/my-services");
  };

  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader subheader="Enter your requirements" title="Vehicle Servicing" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Select Vehicle Type"
                name="vehicleType"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.vehicleType}
                variant="outlined"
              >
                <option key={"truck"} value={"truck"}>
                  Truck
                </option>
                <option key={"bus"} value={"bus"}>
                  Bus
                </option>
                <option key={"four-wheeler"} value={"four-wheeler"}>
                  Four Wheeler
                </option>
                <option key={"three-wheeler"} value={"three-wheeler"}>
                  Three Wheeler
                </option>
                <option key={"two-wheeler"} value={"two-wheeler"}>
                  Two Wheeler
                </option>
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Select Service Type"
                name="serviceType"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.serviceType}
                variant="outlined"
              >
                <option key={"washing"} value={"washing"}>
                  Washing
                </option>
                <option key={"cleaning"} value={"cleaning"}>
                  Cleaning
                </option>
                <option key={"servicing"} value={"servicing"}>
                  Servicing
                </option>
                <option key={"part-replacement"} value={"part-replacement"}>
                  Part Replacement
                </option>
                <option key={"oil-change"} value={"oil-change"}>
                  Oil Change
                </option>
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify your vehicle number"
                label="Vehicle number"
                name="vehicleNumber"
                onChange={handleChange}
                required
                value={values.vehicleNumber}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="This will be your payable amount"
                label="Amount"
                name="price"
                onChange={handleChange}
                required
                value={values.price}
                variant="outlined"
                disabled
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit}
            disabled={!values.serviceType || !values.vehicleType || !values.vehicleNumber}
          >
            Request service
          </Button>
        </Box>
      </Card>
    </form>
  );
};
