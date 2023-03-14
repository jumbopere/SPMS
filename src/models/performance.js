import mongoose from 'mongoose';
import timestampPlugin from './plugins/timestamp';

const performanceDataSchema = new mongoose.Schema({
  
  speed: {
    type: Number,
    required: true
  },
  position : {
type: String,
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
performanceDataSchema.plugin(timestampPlugin)

const PerformanceData = mongoose.model('PerformanceData', performanceDataSchema);

export default PerformanceData;