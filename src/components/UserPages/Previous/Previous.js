import React, { useEffect, useState } from "react";
import "./Previous.css";
import axios from "axios";
import { baseUrl } from "../../../baseUrl.js";
import { Card, CardBody, CardHeader, CardTitle, Spinner } from "reactstrap";
import List from "../../UI/List/List";
import Alert from "../../UI/Alert/Alert";

const Previous = (props) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
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
                price: el.price,
                heading: el.orderName,
                description: "Ordered on " + el.orderedDate,
                color:
                  el.status === "Pending"
                    ? "danger"
                    : el.status === "Ready for Delivery"
                    ? "warning"
                    : "success",
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
            price: "5050",
            color: "danger",
          },
          {
            heading: "Car Service",
            description: "ordered on 19th",
            id: "wdweedwe",
            price: "5050",
            color: "success",
          },
          {
            heading: "Bike Service",
            description: "ordered on 20th",
            id: "adasda",
            price: "5050",
            color: "warning",
          },
        ]);
      });
  };

  const hideAlert = () => {
    setStatus(null);
  };

  return (
    <div>
      <Card className="orders">
        <CardHeader>
          <CardTitle>Previous Orders</CardTitle>
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
      <Alert
        status={status}
        successMessage={message}
        errroMessage={message}
        hideAlert={hideAlert}
      />
    </div>
  );
};

export default Previous;
