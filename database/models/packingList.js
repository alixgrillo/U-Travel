const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const packingListSchema = new Schema({any:[Schema.Types.Mixed]});

const Packing = mongoose.model("Packing", packingListSchema);

module.exports = Packing;