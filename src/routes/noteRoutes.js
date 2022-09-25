import {
  createNote,
  deleteNote,
  getStatistic,
  getNotes,
  updateNote,
} from "../controllers/noteController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

export const noteRoutes = (router) => {
  router.get("/note/getall", protectRoute, getNotes);
  router.post("/note/create", protectRoute, createNote);
  router.patch("/note/update/:id", protectRoute, updateNote);
  router.delete("/note/delete/:id", protectRoute, deleteNote);

  router.get("/note/statistic", protectRoute, getStatistic);
};
