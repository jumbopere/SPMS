import mongoose from 'mongoose';

const SensorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  calibration: {
    type: Number,
    required: true
  },
  ship: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ship',
    required: true
  }
});

const Sensor = mongoose.model('Sensor', SensorSchema);

export default Sensor;
