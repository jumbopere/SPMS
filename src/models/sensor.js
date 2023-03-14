import mongoose from 'mongoose';
import timestampPlugin from './plugins/timestamp';

const sensorSchema = new mongoose.Schema({
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

sensorSchema.plugin(timestampPlugin)
const Sensor = mongoose.model('Sensor', sensorSchema);

export default Sensor;
