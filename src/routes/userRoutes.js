import { uploader } from "../config/multer.js";
import { deleteFile, uploadFile } from "../controllers/uploadController.js";
import { getMe, loginUser, registerUser, updateUser } from "../controllers/userController.js";
import { protectRoute } from "../middlewares/authMiddleware.js";

export const userRoutes = (router) => {
  router.post("/user/register", registerUser);
  router.post("/user/login", loginUser);
  router.get("/user/me", protectRoute, getMe);
  router.patch("/user/update", protectRoute, updateUser);

  router.post("/file/upload", uploader.single("image"), uploadFile);
  router.delete("/file/delete", deleteFile);
};
