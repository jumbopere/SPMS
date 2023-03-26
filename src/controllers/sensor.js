import Sensor from "../models/sensor";

export const createSensor = async (req, res) => {
    try {
        const sensorExists = await Sensor.findOne( {name: req.body.name });
        if (sensorExists) {
          return res.status(409).json({ message: 'Sensor already exists' });
        }
  
        const sensor = new Sensor(req.body);
        await sensor.save();
        res.status(201).json({ message: "Sensor created successfully", data: sensor });
    } catch (error) {

        res.status(500).json({ message: "Something went wrong", error:error.message  });
    }
};

export const getAllShipSensors = async (req, res) => {
    try {
        const sensors = await Sensor.find({}).where("ship").equals(req.params.shipId);
        res.status(200).json({success: true, data: sensors });
    } catch (error) {

        res.status(500).json({ message: "Something went wrong" });
    }
};

export const getSensorById = async (req, res) => {
    try {
        const sensor = await Sensor.findById(req.params.id);
        if (!sensor) {
            return res.status(404).json({ message: "Sensor not found" });
        }
        res.status(200).json({success: true, data: sensor });
    } catch (error) {
    
        res.status(500).json({ message: "Something went wrong" });
    }
}

// Update a sensor by ID
export const updateSensor = async (req, res) => {
    try {
        const sensor = await Sensor.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!sensor) {
            return res.status(404).json({ message: "Sensor not found" });
        }
        res.status(200).json({ message: "Sensor was updated successfully", data: sensor });
    } catch (error) {
   
        res.status(500).json({ message: "Something went wrong",  });
    }
}

// Delete a sensor by ID
export const deleteSensor = async (req, res) => {
    try {
        const sensor = await Sensor.findByIdAndDelete(req.params.id);
        if (!sensor) {
            return res.status(404).json({ message: "Sensor not found" });
        }
        res.status(200).json({ message: "Sensor deleted successfully" });
    } catch (error) {
    
        res.status(500).json({ message: "Something went wrong" });
    }
}