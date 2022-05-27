import { Router } from "express";
import multer from "multer";
import uploadConfig from "@config/upload";
import UsersController from "../controllers/UsersController";

import { getRepository } from "typeorm";
import User from "../../User";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import UserAvatarController from "../controllers/UserAvatarController";

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

usersRouter.get("/", async (request, response) => {
  const user = getRepository(User);
  const users = await user.find();

  return response.json(users);
});

usersRouter.post("/", usersController.create);

usersRouter.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  userAvatarController.update
);

export default usersRouter;
