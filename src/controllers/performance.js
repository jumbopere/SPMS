import PerformanceData from '../models/performance';

export const createPerformanceData = async (req, res) => {
  const { speed, rpm, fuelConsumption, ship, temperature, position } = req.body;

  try {
    const performanceData = new PerformanceData({
      speed,
      rpm,
      fuelConsumption,
      ship,
      temperature,
      position
    });

    await performanceData.save();

    return res.status(201).json({
      success: true,
      data: performanceData
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

export const getPerformanceData = async (req, res) => {
  try {
    const performanceData = await PerformanceData.findById(req.params.id);

    return res.status(200).json({
      success: true,
      count: performanceData.length,
      data: performanceData
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

export const updatePerformanceData = async (req, res) => {
  const { id } = req.params;

  try {
    const performanceData = await PerformanceData.findByIdAndUpdate(id, req.body, { new: true });

    return res.status(200).json({
      success: true,
      data: performanceData
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

export const deletePerformanceData = async (req, res) => {
  const { id } = req.params;

  try {
    await PerformanceData.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

