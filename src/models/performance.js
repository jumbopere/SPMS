import mongoose from 'mongoose';

const PerformanceDataSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
    required: true
  },
  speed: {
    type: Number,
    required: true
  },
  rpm: {
    type: Number,
    required: true
  },
  temperature: {
    type: Number,
    required: true,
  },
  fuelConsumption: {
    type: Number,
    required: true
  },
  ship: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ship',
    required: true
  }
});

const PerformanceData = mongoose.model('PerformanceData', PerformanceDataSchema);

export default PerformanceData;