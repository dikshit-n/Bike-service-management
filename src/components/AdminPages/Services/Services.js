import React, { Fragment, useEffect, useState } from "react";
import "./Services.css";
import axios from "axios";
import { baseUrl } from "../../../baseUrl";
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
import EditService from "./EditService/EditService";
import List from "../../UI/List/List";
import Alert from "../../UI/Alert/Alert";
import SmallSpinner from "../../UI/SmallSpinner/SmallSpinner";

const Services = (props) => {
  const [data, setData] = useState([]);
  const [dataCopy, setDataCopy] = useState([]);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [addDetails, setAddDetails] = useState({
    serviceName: "",
    price: "",
  });
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
      .post(baseUrl + "/orders")
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

  const submit = (event) => {
    event.preventDefault();
    setAddLoading(true);
    let submitData = data.push({ ...addDetails, id: data.length });
    axios
      .post(baseUrl + "/updateservices", { data: submitData })
      .then((res) => {
        console.log(res.data);
        setAddLoading(false);
        setMessage("Successfully Added");
        setStatus("Success");
      })
      .catch((err) => {
        console.log(err);
        setAddLoading(false);
        setMessage("Error Adding");
        setStatus("Error");
      });
  };

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setAddDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
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
        <EditService data={show} reacted={getData} entireData={dataCopy} />
      ) : (
        <Card className="orders">
          <CardHeader>
            <CardTitle>Services</CardTitle>
          </CardHeader>
          <CardBody>
            {loading ? (
              <Spinner />
            ) : data.length === 0 ? (
              <h4>No Services !</h4>
            ) : (
              <Fragment>
                <List data={data} />
                {add ? (
                  <form onSubmit={submit} style={{ textAlign: "left" }}>
                    <label>Service Name</label>
                    <Input
                      name="serviceName"
                      type="text"
                      value={addDetails.serviceName}
                      placeholder="Enter Service Name"
                      onChange={changeHandler}
                      required
                    />
                    <br />
                    <label>Price in ($)</label>
                    <Input
                      name="price"
                      type="tel"
                      value={addDetails.price}
                      placeholder="Enter Price"
                      onChange={changeHandler}
                      required
                    />
                    <button
                      style={{ width: 1, height: 1, opacity: 0 }}
                      type="submit"
                      disdisabled={
                        addDetails.serviceName.trim() === "" ||
                        addDetails.price.trim() === ""
                      }
                      bled
                    />
                  </form>
                ) : null}
              </Fragment>
            )}
          </CardBody>
          <CardFooter>
            {add ? (
              <div>
                <Fragment>
                  <Button
                    color="success"
                    type="submit"
                    onClick={(event) => submit(event)}
                    disabled={
                      addDetails.serviceName.trim() === "" ||
                      addDetails.price.trim() === ""
                    }
                  >
                    {addLoading ? <SmallSpinner /> : null} Add
                  </Button>{" "}
                  &nbsp;&nbsp;&nbsp;
                  <Button onClick={() => setAdd(false)} color="danger">
                    Cancel
                  </Button>
                </Fragment>
              </div>
            ) : !loading ? (
              <div className="add-service" onClick={() => setAdd(true)}>
                Add Order
              </div>
            ) : null}
          </CardFooter>
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

export default Services;
