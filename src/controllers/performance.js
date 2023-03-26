import PerformanceData from "../models/performance";

export const createPerformanceData = async (req, res) => {
  const { speed, rpm, fuelConsumption, ship, temperature, position } = req.body;

  try {
    const performanceData = new PerformanceData({
      speed,
      rpm,
      fuelConsumption,
      ship,
      temperature,
      position,
    });

    const newPerformance = await performanceData.save();

    return res.status(201).json({
      success: true,
      data: newPerformance,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getPerformanceData = async (req, res) => {
  try {
    const performanceData = await PerformanceData.findById(req.params.id);
    if (!performanceData) {
      return res.status(404).send({ success: false, error: "Performance not found" });
    }

    return res.status(200).json({
      success: true,
      count: performanceData.length,
      data: performanceData,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const updatePerformanceData = async (req, res) => {
  const { id } = req.params;

  try {
    const performanceData = await PerformanceData.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!performanceData) {
      return res.status(404).send({ message: "Performance not found" });
    }

    return res.status(201).json({
      message: 'Performance was updated successfully',
      data: performanceData,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deletePerformanceData = async (req, res) => {
  const { id } = req.params;

  try {
  const deletedPerformance=  await PerformanceData.findByIdAndDelete(id);
  if (!deletedPerformance){
    return res.status(401).json({message: 'Performance not found'})
}

    return res.status(200).json({
      success: true,
    message: 'Performance deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
