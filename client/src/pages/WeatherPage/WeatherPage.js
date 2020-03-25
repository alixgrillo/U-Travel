import React, { useState, useEffect } from 'react';
import {  Row, Col } from 'reactstrap';
import moment from 'moment';
import WeatherSearchBar from '../../components/Weather/WeatherSearchBar';
import WeatherDayCard from '../../components/Weather/WeatherDayCard';
import API from '../../utils/API';
import './style.css';

const WeatherPage = (props) => {
  // using react hook to set state
  const [data, setData] = useState({
    days: [],
    location: '',
    searchTerm: ''
  });

  // destructure state object to make it easier to use
  const { days, location, searchTerm } = data;

  // useEffect replaces componentDidMount. Denver will show until the user types a search.
  useEffect(() => {

    getWeather(props.destination);
  }, [props]);

  const handleInputChange = event => {
    // when using hooks use spread to make a copy of key value pairs. Copies in exsiting state so we don't loose it and add change on top.
    setData({
      ...data,
      searchTerm: event.target.value
    });
  };

  const getWeather = city => {
    API.getWeather(city)
      .then(res => {
        setData({
          searchTerm: '',
          days: res.data.data,
          location: res.data.city_name + ', ' + res.data.state_code
        });
      })
      .catch(err => console.log(err));
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    if (searchTerm) {
      getWeather(searchTerm);
    } else {
      alert('You must type a city to search');
    }
  };

  return (
    <div>
      <Row>
        <Col lg={8}>
          <h3 className='weather-for'>Weather for {location}</h3>
        </Col>
        <Col lg={4}>
          <WeatherSearchBar
            searchTerm={searchTerm}
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
          />
        </Col>
      </Row>
      <Row>
     
        {days.map(day => (
          <WeatherDayCard
            key={day.ts}
            id={day.ts}
            day={moment(day.valid_date, 'YYYY-MM-DD').format('dddd')}
            current={day.temp}
            high={day.max_temp}
            low={day.min_temp}
            icon={day.weather.icon}
            description={day.weather.description}
          />
        ))}
      </Row>
    </div>
  );
};

export default WeatherPage;
