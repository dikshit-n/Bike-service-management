import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Input,
} from "reactstrap";
import "./DetailedBooking.css";
import axios from "axios";
import { baseUrl } from "../../../../baseUrl";
import SmallSpinner from "../../../UI/SmallSpinner/SmallSpinner";
import Alert from "../../../UI/Alert/Alert";

const DetailedBooking = (props) => {
  const [formData, setFormData] = useState({
    serviceName: "",
    price: "",
    orderedDate: "",
  });

  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, ...props.data }));
  }, [props.data]);

  const submit = (event) => {
    event.preventDefault();
    setLoading(true);
    let submitData;
    props.entireData.map((el) => {
      if (el.id === props.data.id) {
        el = { ...el, ...formData, userName: "Mani" };
        submitData = {
          id: el.id,
          orderedDate: el.orderedDate,
          price: el.price,
          serviceName: el.serviceName,
          userName: el.userName,
        };
      }
      return null;
    });
    console.log(submitData);
    axios
      .post(baseUrl + "/updateservice", { data: submitData })
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        setMessage("Success");
        setStatus("Success");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setMessage("Error");
        setStatus("Error");
      });
  };

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const hideAlert = () => {
    setStatus(null);
    props.data.goback();
    props.reacted();
  };

  return (
    <Card className="orders">
      <CardHeader>
        <CardTitle>{props.data.serviceName}</CardTitle>
        <Button color="danger" onClick={props.data.goback}>
          Go Back
        </Button>
      </CardHeader>
      <CardBody>
        <form onSubmit={submit} style={{ textAlign: "left" }}>
          <label>Service Name</label>
          <Input
            name="serviceName"
            disabled
            value={formData.serviceName}
            placeholder="Enter Service Name"
            required
            onChange={changeHandler}
          />
          <br />
          <label>Price in ($)</label>
          <Input
            name="price"
            value={formData.price}
            disabled
            placeholder="Enter Price"
            onChange={changeHandler}
            type="tel"
            required
          />
          <br />
          <label>Ordering Date</label>
          <Input
            name="orderedDate"
            value={formData.orderedDate}
            placeholder="Select Date of booking"
            onChange={changeHandler}
            type="date"
            required
          />
          <br />
          <Button
            disabled={
              formData.serviceName.trim() === "" ||
              formData.price.trim() === "" ||
              formData.orderedDate.trim() === ""
            }
            type="submit"
            color="success"
          >
            {loading ? <SmallSpinner /> : null} Add
          </Button>
        </form>
      </CardBody>
      <Alert status={status} message={message} hideAlert={hideAlert} />
    </Card>
  );
};

export default DetailedBooking;
