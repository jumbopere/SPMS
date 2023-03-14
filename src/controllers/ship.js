import Ship from "../models/ship";

export const createShip =async (req,res)=> {
    const {
        name,
        imo,
        type,
        yearBuilt,
        dwt,
        lengthOverall,
        beam,
        speed,
        userId
    } = req.body
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
            speed
        })
        await ship.save()
        return res.status(201).json({message: "ship was created successfully", data:ship})
    } catch (error){
        console.error(error);
        return res.status(500).json({
          success: false,
          error: 'Server Error'
        });
    }
};
export const getAllUserShips = async(req,res)=> {
    const {userId} = req.params
    try {
        const ships = await Ship.find({}).where('userId').equals(userId)

        return res.status(200).json({
            message: 'ships fetched successfully',
            data: ships
        })
    }
    catch (error){
        console.error(error);
        return res.status(500).json({
          success: false,
          error: 'Server Error'
        });
    }
}

export const updateShip = async (req, res) => {
    try {
      const { id } = req.params;
      const ship = await Ship.findOne({ _id: id });
      if (!ship) {
        return res.status(404).send({ error: 'ship not found' });
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
        .send({ message: 'updated was successfully', updatedShip });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
          success: false,
          error: 'Server Error'
        });
    }
  };

export const deleteShip = async(req, res)=> {
    const { id } = req.params;
    try{
     const deletedShip =   await Ship.findByIdAndDelete(id);
if (!deletedShip){
    return res.status(401).json({message: 'ship not found'})
}
        return res.status(200).json({
          success: true,
          message: 'ship deleted successfully'
        });
    }
    catch (error){
        console.error(error);
        return res.status(500).json({
          success: false,
          error: 'Server Error'
        });
    }
}