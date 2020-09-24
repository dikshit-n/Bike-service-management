import React, { useEffect, useState } from "react";
import "./BookNew.css";
import axios from "axios";
import { baseUrl } from "../../../baseUrl";
import { Card, CardBody, CardHeader, CardTitle, Spinner } from "reactstrap";
import List from "../../UI/List/List";
import Alert from "../../UI/Alert/Alert";
import DetailedBooking from "./DetailedBooking/DetailedBooking";

const BookNew = (props) => {
  const [data, setData] = useState([]);
  const [dataCopy, setDataCopy] = useState([]);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [add, setAdd] = useState(false);
  const [show, setShow] = useState({
    display: false,
    serviceName: "",
    price: "",
    id: "",
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoading(true);
    axios
      .post(baseUrl + "/services")
      .then((res) => {
        console.log(res.data);
        setLoading(false);
        if (res.data === undefined || res.data === null) {
          setMessage("Something went wrong !");
          setStatus("Error");
          setData([]);
        } else {
          if (res.data === "nothing") {
            setData([]);
          } else {
            setDataCopy([...res.data]);
            setData([
              ...res.data.map((el) => ({
                heading: el.serviceName,
                description: el.price,
                id: el.id,
                onClick: () => {
                  setShow({
                    display: true,
                    serviceName: el.serviceName,
                    price: el.price,
                    id: el.id,
                    goback: () => {
                      setShow({
                        display: false,
                        serviceName: "",
                        price: "",
                        id: "",
                      });
                    },
                  });
                },
              })),
            ]);
          }
        }
      })
      .catch((err) => {
        setLoading(false);
        setStatus("Error");
        setMessage("Error Occurred");
        setDataCopy([
          {
            serviceName: "Scooty Service",
            price: "500",
            id: "ejfks",
          },
          {
            serviceName: "Bike Service",
            price: "600",
            id: "ejfkssd",
          },
          {
            serviceName: "Car Service",
            price: "1000",
            id: "efsejfkssd",
          },
        ]);
        setData([
          {
            heading: "Scooty Service",
            description: "500",
            id: "ejfks",
            onClick: () => {
              setShow({
                display: true,
                serviceName: "Scooty Service",
                price: "500",
                id: "ejfks",
                goback: () => {
                  setShow({
                    display: false,
                    serviceName: "",
                    price: "",
                    id: "",
                  });
                },
              });
            },
          },
          {
            heading: "Bike Service",
            description: "600",
            id: "ejfkssd",
            onClick: () => {
              setShow({
                display: true,
                serviceName: "Bike Service",
                price: "600",
                id: "ejfkssd",
                goback: () => {
                  setShow({
                    display: false,
                    serviceName: "",
                    price: "",
                    id: "",
                  });
                },
              });
            },
          },
          {
            heading: "Car Service",
            description: "1000",
            id: "efsejfkssd",
            onClick: () => {
              setShow({
                display: true,
                serviceName: "Car Service",
                price: "1000",
                id: "efsejfkssd",
                goback: () => {
                  setShow({
                    display: false,
                    serviceName: "",
                    price: "",
                    id: "",
                  });
                },
              });
            },
          },
        ]);
      });
  };

  const hideAlert = () => {
    setStatus(null);
    if (add) {
      setAdd(false);
      getData();
    }
  };

  return (
    <div>
      {show.display ? (
        <DetailedBooking data={show} reacted={getData} entireData={dataCopy} />
      ) : (
        <Card className="orders">
          <CardHeader>
            <CardTitle>Available Services</CardTitle>
          </CardHeader>
          <CardBody>
            {loading ? (
              <Spinner />
            ) : data.length === 0 ? (
              <h4>No Services !</h4>
            ) : (
              <List data={data} />
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

export default BookNew;
