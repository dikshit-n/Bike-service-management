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
import DetailedView from "./DetailedView/DetailedView";
import Alert from "../../UI/Alert/Alert";

const Orders = (props) => {
  const [orders, setOrders] = useState([]);
  const [dataCopy, setDataCopy] = useState([]);
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
            setDataCopy([...res.data]);
            setOrders([
              ...res.data.map((el) => ({
                id: el.id,
                price: el.price,
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
                        id: "",
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
        setDataCopy([
          {
            userName: "Mani",
            orderName: "Scooty Service",
            price: "600",
            orderedDate: "10-8-2020",
            status: "Pending",
            id: "aokfks",
          },
          {
            userName: "Jaga",
            price: "500",
            orderName: "Car Service",
            orderedDate: "10-8-2020",
            status: "Completed",
            id: "wdweedwe",
          },
          {
            userName: "Dikshit",
            orderName: "Bike Service",
            orderedDate: "11-8-2020",
            price: "700",
            status: "Ready for Delivery",
            id: "adasda",
          },
        ]);
        setOrders([
          {
            heading: "Scooty Service",
            description: "ordered on 17th",
            id: "aokfks",
            price: "5050",
            color: "danger",
            onClick: () =>
              setShow((prev) => ({
                display: false,
                id: "aokfks",
                userName: "Mani",
                orderName: "Scooty Service",
                price: "600",
                orderedDate: "10-8-2020",
                status: "Pending",
                display: true,
                goback: () =>
                  setShow({
                    display: false,
                    id: "",
                    userName: "",
                    orderName: "",
                    orderedDate: "",
                    price: "",
                    status: "",
                  }),
              })),
          },
          {
            heading: "Car Service",
            description: "ordered on 19th",
            id: "wdweedwe",
            price: "5050",
            color: "success",
            onClick: () =>
              setShow((prev) => ({
                id: "wdweedwe",
                display: false,
                userName: "Jaga",
                price: "500",
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
                    price: "",
                    status: "",
                    id: "",
                  }),
              })),
          },
          {
            heading: "Bike Service",
            description: "ordered on 20th",
            id: "adasda",
            price: "5050",
            color: "warning",
            onClick: () =>
              setShow((prev) => ({
                display: false,
                userName: "Dikshit",
                orderName: "Bike Service",
                orderedDate: "11-8-2020",
                id: "adasda",
                price: "700",
                status: "Ready for Delivery",
                display: true,
                goback: () =>
                  setShow({
                    display: false,
                    userName: "",
                    orderName: "",
                    orderedDate: "",
                    price: "",
                    status: "",
                    id: "",
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
        <DetailedView data={show} reacted={getData} entireData={dataCopy} />
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
