import React, { useEffect, useState } from "react";
import "./Orders.css";
import axios from "axios";
import { baseUrl } from "../../../baseUrl.js";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Spinner,
} from "reactstrap";
import List from "../../UI/List/List";
import Previous from "../../UserPages/Previous/Previous";
import DetailedView from "./DetailedView/DetailedView";
import Alert from "../../UI/Alert/Alert";

const Orders = (props) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState({
    display: false,
    userName: "",
    orderName: "",
    orderedDate: "",
    status: "",
  });
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoading(true);
    axios
      .post(baseUrl + "/getorders")
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        if (res.data === undefined || res.data === null) {
          setStatus("Error");
          setMessage("Something went Wrong !");
          setOrders([]);
        } else {
          if (res.data === "nothing") {
            setOrders([]);
          } else {
            setOrders([
              ...res.data.map((el) => ({
                id: el.id,
                heading: el.orderName + " ( " + el.userName + " )",
                description: "Ordered on " + el.orderedDate,
                color:
                  el.status === "Pending"
                    ? "danger"
                    : el.status === "Ready for Delivery"
                    ? "warning"
                    : "success",
                onClick: () =>
                  setShow((prev) => ({
                    ...el,
                    display: true,
                    goback: () =>
                      setShow({
                        display: false,
                        userName: "",
                        orderName: "",
                        orderedDate: "",
                        status: "",
                      }),
                  })),
              })),
            ]);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setStatus("Error");
        setMessage("Something Went Wrong !");
        setOrders([
          {
            heading: "Scooty Service",
            description: "ordered on 17th",
            id: "aokfks",
            color: "danger",
            onClick: () =>
              setShow((prev) => ({
                display: false,
                userName: "Mani",
                orderName: "Scooty Service",
                orderedDate: "10-8-2020",
                status: "Pending",
                display: true,
                goback: () =>
                  setShow({
                    display: false,
                    userName: "",
                    orderName: "",
                    orderedDate: "",
                    status: "",
                  }),
              })),
          },
          {
            heading: "Car Service",
            description: "ordered on 19th",
            id: "aoafdakfks",
            color: "success",
            onClick: () =>
              setShow((prev) => ({
                display: false,
                userName: "Jaga",
                orderName: "Car Service",
                orderedDate: "10-8-2020",
                status: "Completed",
                display: true,
                goback: () =>
                  setShow({
                    display: false,
                    userName: "",
                    orderName: "",
                    orderedDate: "",
                    status: "",
                  }),
              })),
          },
          {
            heading: "Bike Service",
            description: "ordered on 20th",
            id: "aoafdakfks",
            color: "warning",
            onClick: () =>
              setShow((prev) => ({
                display: false,
                userName: "Dikshit",
                orderName: "Bike Service",
                orderedDate: "11-8-2020",
                status: "Ready for Delivery",
                display: true,
                goback: () =>
                  setShow({
                    display: false,
                    userName: "",
                    orderName: "",
                    orderedDate: "",
                    status: "",
                  }),
              })),
          },
        ]);
      });
  };

  const hideAlert = () => {
    setStatus(null);
  };

  return (
    <div>
      {show.display ? (
        <DetailedView data={show} reacted={getData} entireData={orders} />
      ) : (
        <Card className="orders">
          <CardHeader>
            <CardTitle>Orders</CardTitle>
          </CardHeader>
          <CardBody>
            {loading ? (
              <Spinner />
            ) : orders.length === 0 ? (
              <h4>No Orders !</h4>
            ) : (
              <List data={orders} />
            )}
          </CardBody>
        </Card>
      )}
      <Alert
        status={status}
        successMessage={message}
        errroMessage={message}
        hideAlert={hideAlert}
      />
    </div>
  );
};

export default Orders;
