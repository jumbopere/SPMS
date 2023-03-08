import mongoose from 'mongoose';

const ShipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  imo: {
    type: Number,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true
  },
  year_built: {
    type: Number,
    required: true
  },
  dwt: {
    type: Number,
    required: true
  },
  length_overall: {
    type: Number,
    required: true
  },
  beam: {
    type: Number,
    required: true
  },
  speed: {
    type: Number,
    required: true
  },
  sensors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sensor'
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
});

const Ship = mongoose.model('Ship', ShipSchema);

export default Ship;