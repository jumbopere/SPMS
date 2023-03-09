import { createSensor, deleteSensor, getAllSensors, getSensorById, updateSensor} from "../controllers/sensor";

module.exports = (express)=> {
const router = express.Router();

router.post('/', async(req, res)=> {
    await createSensor(req, res)
})
router.get('/', async(req, res)=> {
    await getAllSensors(req, res)
})
router.get('/:id', async(req, res)=> {
    await getSensorById(req, res)
})
router.put('/:id', async(req, res)=> {
    await updateSensor(req, res)
})
router.delete('/:id', async(req, res)=> {
    await deleteSensor(req, res)
})
return router
}