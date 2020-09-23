import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Input,
} from "reactstrap";
import "./DetailedView.css";
import axios from "axios";
import SelectInput from "../../../UI/Select/Select";
import SmallSpinner from "../../../UI/SmallSpinner/SmallSpinner";
import Alert from "../../../UI/Alert/Alert";
import { baseUrl } from "../../../../baseUrl";

const DetailedView = (props) => {
  const [formData, setFormData] = useState({
    userName: "",
    orderName: "",
    orderedDate: "",
    status: "",
  });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");

  const submit = (event) => {
    event.preventDefault();
    setSubmitLoading(true);
    let submitData = props.entireData.map((el) => {
      if (el.id === props.data.id) {
        el = formData;
      }
      return el;
    });
    axios
      .post(baseUrl + "/updateorder", { data: submitData })
      .then((res) => {
        console.log(res.data);
        setSubmitLoading(false);
        setStatus("Success");
        setMessage("Updated");
      })
      .catch((err) => {
        console.log(err);
        setSubmitLoading(false);
        setStatus("Error");
        setMessage("Error");
      });
  };

  const Delete = (id) => {
    setDeleteLoading(true);
    let submitData = props.entireData.filter((ele) => ele.id !== id);
    axios
      .post(baseUrl + "/updateorder", { data: submitData })
      .then((res) => {
        console.log(res.data);
        setDeleteLoading(false);
        setStatus("Success");
        setMessage("Deleted");
      })
      .catch((err) => {
        console.log(err);
        setDeleteLoading(false);
        setStatus("Error");
        setMessage("Error Deleting");
      });
  };

  useEffect(() => {
    setFormData({ ...props.data });
  }, [props.data]);

  const hideAlert = () => {
    setStatus(null);
    props.data.goback();
    props.reacted();
  };

  return (
    <Card className="orders">
      <CardHeader>
        <CardTitle>{props.data.name}</CardTitle>
        <Button
          onClick={props.data.goback}
          color="danger"
          style={{ textAlign: "left" }}
        >
          Go Back
        </Button>
      </CardHeader>
      <CardBody>
        <form style={{ textAlign: "left" }} onSubmit={submit}>
          <label>User Name</label>
          <Input
            name="userName"
            disabled
            value={formData.userName}
            type="text"
          />
          <br />
          <label>Order</label>
          <Input
            name="orderName"
            disabled
            value={formData.orderName}
            type="text"
          />
          <br />
          <label>Ordered On</label>
          <Input
            name="orderDate"
            disabled
            value={formData.orderedDate}
            type="text"
          />
          <br />
          <label>Status</label>
          <SelectInput
            placeholder="Select status"
            value={formData.status}
            options={["Pending", "Ready for Delivery", "Completed"]}
            onChange={(value, name) =>
              setFormData((prev) => ({
                ...prev,
                status: value,
              }))
            }
          />
          <br />
          <Button
            disabled={formData.status.trim() === ""}
            type="submit"
            color="success"
          >
            {submitLoading ? <SmallSpinner /> : null} Update
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button
            type="button"
            onClick={() => Delete(props.data.id)}
            color="danger"
          >
            {deleteLoading ? <SmallSpinner /> : null} Delete Order
          </Button>
        </form>
      </CardBody>
      <Alert
        status={status}
        errorMessage={message}
        successMessage={message}
        hideAlert={hideAlert}
      />
    </Card>
  );
};

export default DetailedView;
