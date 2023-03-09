import { createPerformanceData, deletePerformanceData, updatePerformanceData, getPerformanceData } from "../controllers/performance";

module.exports  = (express)=> {
    const router = express.Router();
    router.post('/', async(req, res)=> {
        await createPerformanceData(req, res)
    })
    router.get('/:id', async(req, res)=> {
        await getPerformanceData(req, res)
    })
    router.put('/:id', async(req, res)=> {
        await updatePerformanceData(req, res)
    })
    router.delete('/:id', async(req, res)=> {
        await deletePerformanceData(req, res)
    })
    return router
}