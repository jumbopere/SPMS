import { createShip, deleteShip, getAllUserShips, updateShip } from "../controllers/ship";


module.exports=(express)=> {
    const router  = express.Router();

    router.post('/',async(req,res)=> {
        await createShip(req,res)
    });
    router.get('/:userId', async(req,res)=> {
        await getAllUserShips(req, res);  
    })
router.put('/:id', async(req,res)=> {
    await updateShip(req, res)
})
router.delete('/:id', async(req,res)=> {
    await deleteShip(req,res)
})
    return router
}