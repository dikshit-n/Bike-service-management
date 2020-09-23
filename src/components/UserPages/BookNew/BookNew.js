import React from "react";
import "./BookNew.css";
import SelectInput from "../../UI/Select/Select";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Spinner,
} from "reactstrap";

const BookNew = (props) => {
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      Book New Service
      <Card className="orders">
        <CardHeader>
          <CardTitle>Services</CardTitle>
        </CardHeader>
        <CardBody>
          <SelectInput
            placeholder="Select status"
            value=""
            options={["Bike Service", "Car Service"]}
          ></SelectInput>
        </CardBody>
      </Card>
    </div>
  );
};

export default BookNew;
