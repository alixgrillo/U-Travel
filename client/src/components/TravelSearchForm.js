import React, { Component } from "react";
import { Form, Button, Input } from "reactstrap";

class TravelSearchForm extends Component {
  state = {
    origin: "",
    destination: "",
    date: "",
    numAdults: 1,
    nonStop: false
  };

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = event.target;
    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  airportSearch = () => {
    this.callApi(this.state.origin)
      .then(res => this.setState({ origin: res.data }))
      // .then(res2 => console.log(this.state.flights))
      .catch(err => console.log(err));
  }

  callApi = async (city) => {
    
    const response = await fetch(`/airport/${city}`);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    this.props.flightSearch(this.state);
    this.setState({
      origin: "",
      destination: "",
      date: ""
    });
  };
  render() {
    return (
      <Form>
        <Input
          type="text"
          name="origin"
          placeholder="Origin City"
          onInput={this.airportSearch}
          onChange={this.handleInputChange}
          value={this.state.origin}
        />
        <Input
          type="text"
          name="destination"
          placeholder="Destination City"
          onChange={this.handleInputChange}
          value={this.state.destination}
        />
        <Input
          type="text"
          name="date"
          placeholder="Start Date"
          onChange={this.handleInputChange}
          value={this.state.date}
        />
        <Button onClick={this.handleSubmit}>Submit</Button>
      </Form>
    );
  }
}

export default TravelSearchForm;
