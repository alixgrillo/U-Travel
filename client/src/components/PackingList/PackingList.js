import React, { useState, useEffect } from "react";
import AddItemForm from "../PackingList/AddItemForm";
import Item from "../PackingList/Item";
import { Card, CardHeader, CardBody } from "reactstrap";
import "./style.css";
import Axios from "axios";

const PackingList = props => {
  const [items, setItems] = useState([]);
  const [tripIdPack, setTripIdPack] = useState(props.tripId);

  useEffect(() => {
    setTripIdPack(props.tripId);

    if (props.tripId) {
      Axios.get(`/getpacking/${props.tripId}`).then(res => {
        let itemdata = [];
        res.data.item.forEach(() => {
          itemdata = itemdata.concat(res.data.item);
        });
        setItems(res.data.item);
      });
    }
  }, [props.tripId]);

  const addItem = text => {
    const newItems = [...items, { text, isCompleted: false }];

    Axios.put(`/packing/${props.tripId}`, {
      item: newItems
    }).then(res => {
      setItems(res.data.item);
    });
  };

  const completeItem = index => {
    const newItems = [...items];
    if (newItems[index].isCompleted === false)
      newItems[index].isCompleted = true;
    else newItems[index].isCompleted = false;
    Axios.put(`/packing/${props.tripId}`, {
      item: newItems
    }).then(res => {
      setItems(res.data.item);
    });
  };

  const removeItem = index => {
    const newItems = [...items];
    newItems.splice(index, 1);
    Axios.put(`/packing/${props.tripId}`, {
      item: newItems
    }).then(res => {
      setItems(res.data.item);
    });
  };

  return (
    <Card className="packing-card">
      <CardHeader className="packing-header">Packing List</CardHeader>
      <CardBody className="item-list">
        {items.map((item, index) => (
          <Item
            key={index}
            index={index}
            item={item}
            completeItem={completeItem}
            removeItem={removeItem}
          />
        ))}
        <br></br>
        <AddItemForm addItem={addItem} />
      </CardBody>
    </Card>
  );
};

export default PackingList;
