import React, { useEffect, useState } from "react";
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
} from "reactstrap";

const List = (props) => {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    setDetails([
      ...props.data.map((el, index) => ({
        ...el,
        active: false,
        id: index,
      })),
    ]);
  }, [props.data]);

  const activate = (id) => {
    setDetails((prev) => {
      let clone = prev.map((el, index) => {
        if (index === id) {
          el.active = true;
        }
        return el;
      });
      return clone;
    });
  };

  const deActivate = (id) => {
    setDetails((prev) => {
      let clone = prev.map((el, index) => {
        if (index === id) {
          el.active = false;
        }
        return el;
      });
      return clone;
    });
  };

  return (
    <ListGroup>
      {details.length === 0 ? (
        <h4>Empty !</h4>
      ) : (
        details.map((el, index) => (
          <ListGroupItem
            color={el.color ? el.color : null}
            key={el.id ? el.id : index}
            onMouseEnter={() => activate(index)}
            onMouseLeave={() => deActivate(index)}
            onClick={el.onClick ? el.onClick : () => {}}
            active={el.active}
            style={{ cursor: "pointer" }}
          >
            <ListGroupItemHeading>{el.heading}</ListGroupItemHeading>
            <ListGroupItemText>{el.description}</ListGroupItemText>
          </ListGroupItem>
        ))
      )}
    </ListGroup>
  );
};

export default List;
