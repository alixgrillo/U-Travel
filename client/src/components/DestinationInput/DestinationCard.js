import React from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import DestinationInput from './DestinationInput';
import './style.css';

const DestinationCard = () => {

return (
    <div>
      <Card className='destination-card'>
        <CardHeader className='destination-header'>Destination</CardHeader>
            <CardBody>
              <DestinationInput />
            </CardBody>
      </Card>
    </div>
  );
}

export default DestinationCard;