const db = require("../database/models");

module.exports = {
  findAll: function(req, res) {
    db.Trip.find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByID: function(req, res) {
    db.Trip.findById(req.query.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByUserID: function(req, res) {
    db.Trip.findOne({ user: req.params.userId })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Trip.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateById: function(req, res) {
    db.Trip.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { destination: req.body.destination } },
      req.body
    )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateFlightById: function(req, res) {
    db.Trip.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          flight: {
            flight_id: req.body.flight.id,
            flightSegments: req.body.flight.offerItems[0].services[0],
            price: req.body.flight.offerItems[0].price.total
          },
          returnFlight: {
            flight_id: req.body.flight.id,
            flightSegments: req.body.flight.offerItems[0].services[1],
            price: req.body.flight.offerItems[0].price.total
          }
        }
      },
      req.body
    )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateHotelById: function(req, res) {
    db.Trip.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          hotel: {
            hotel_id: req.body.hotel.id,
            name: req.body.hotel.name,
            roomType: req.body.hotel.roomType,
            price: req.body.hotel.price,
            checkInDate: req.body.hotel.checkInDate,
            checkOutDate: req.body.hotel.checkOutDate,
            currency: req.body.hotel.currency
          }
        }
      },
      req.body
    )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateByTripId: function(req, res) {
    db.Trip.findOneAndUpdate(
      { _id: req.params.tripId },
      { $set: { trip: req.body.trip } },
      { new: true }
    )
      .then(dbModel => {
       // console.log(dbModel);
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  findByTripID: function(req, res) {
    db.Trip.findOne({ _id: req.params.tripId })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updatePackingByTripId: function(req, res) {
    db.Trip.findOneAndUpdate(
      { _id: req.params.tripId },
      { $set: { item: req.body.item } },
      { new: true }
    )
      .then(dbModel => {
       // console.log(dbModel);
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },

  updateTotalByTripId: function(req, res) {
    db.Trip.findOneAndUpdate(
      { _id: req.params.tripId },
      { $set: { total: req.body.total } },
      { new: true }
    )
      .then(dbModel => {
      //  console.log(dbModel);
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  updateDestinationByTripId: function(req, res) {
    db.Trip.findOneAndUpdate(
      { _id: req.params.tripId },
      { $set: { destination: req.body.destination } },

      { new: true }
    )
      .then(dbModel => {
        //console.log(dbModel);
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  },
  updateDateByTripID: function(req, res) {
    db.Trip.findOneAndUpdate(
      { _id: req.params.tripId },
      { $set: { date: req.body.date } },
      { new: true }
    )
      .then(dbModel => {
      //  console.log(dbModel);
        res.json(dbModel);
      })
      .catch(err => res.status(422).json(err));
  }
};
