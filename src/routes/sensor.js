import { createSensor, deleteSensor, getAllSensors, getSensorById, updateSensor} from "../controllers/sensor";

module.exports = (express)=> {
const router = express.Router();

router.post('/sensors', async(req, res)=> {
    await createSensor(req, res)
})
router.get('/sensors', async(req, res)=> {
    await getAllSensors(req, res)
})
router.get('sensors/:id', async(req, res)=> {
    await getAllSensors(req, res)
})
router.put('sensors', async(req, res)=> {
    await updateSensor(req, res)
})
router.delete('sensors', async(req, res)=> {
    await deleteSensor(req, res)
})

}