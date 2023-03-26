import Ship from "../models/ship";

export const createShip = async (req, res) => {
  const {
    name,
    imo,
    type,
    yearBuilt,
    dwt,
    lengthOverall,
    beam,
    speed,
    userId,
    sensors,
  } = req.body;
  try {
    const ship = new Ship({
      name,
      imo,
      type,
      yearBuilt,
      dwt,
      lengthOverall,
      beam,
      userId,
      speed,
      sensors,
    });
    await ship.save();
    return res
      .status(201)
      .json({ message: "Ship was created successfully", data: ship });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
export const getAllUserShips = async (req, res) => {
  const { userId } = req.params;
  try {
    const ships = await Ship.find({}).where("userId").equals(userId);

    return res.status(200).json({
      message: "Ships fetched successfully",
      data: ships,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
export const getOneShip = async (req, res) => {

  try {
    const ship = await Ship.findById(req.params.id);
    if (!ship) {
      return res.status(404).send({ success: false, error: "Ship not found" });
    }
    return res.status(200).json({ success: true, data: ship });
  } catch (error) {
    console.log(error)
   return res.status(500).json({ message: "Something went wrong" , error: error.message});
  }
};

export const updateShip = async (req, res) => {
  try {
    const { id } = req.params;
    const ship = await Ship.findOne({ _id: id });
    if (!ship) {
      return res.status(404).send({ message: "Ship not found" });
    }

    const query = {
      _id: id,
    };
    const userObj = {
      $set: {
        ...req.body,
      },
    };
    const updatedShip = await Ship.findOneAndUpdate(query, userObj, {
      new: true,
    });

    return res
      .status(201)
      .send({ message: "Ship was updated successfully", updatedShip });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteShip = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedShip = await Ship.findByIdAndDelete(id);
    if (!deletedShip) {
      return res.status(401).json({ message: "Ship not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Ship deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
