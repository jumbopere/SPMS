import {
  login,
  register,
  updateUser,
  deleteUser,
  getAllUsers,
  getOneUser,
} from "../controllers/user";

module.exports = (express) => {
  const router = express.Router();

  router.post("/register", async (req, res) => {
    await register(req, res);
  });
  router.post("/login", async (req, res) => {
    await login(req, res);
  });
  router.get("/admin/get-users", async (req, res) => {
    await getAllUsers(req, res);
  });
  router.get("/:id", async (req, res) => {
    await getOneUser(req, res);
  });
  router.put("/:id", async (req, res) => {
    await updateUser(req, res);
  });
  router.delete("/:id", async (req, res) => {
    await deleteUser(req, res);
  });
  return router;
};
