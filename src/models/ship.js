import mongoose from 'mongoose';
import timestampPlugin from './plugins/timestamp';

const shipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true
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
  yearBuilt: {
    type: Number,
    required: true
  },
  dwt: {
    type: Number,
    required: true
  },
  lengthOverall: {
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
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}
);

shipSchema.plugin(timestampPlugin)
const Ship = mongoose.model('Ship', shipSchema);

export default Ship;