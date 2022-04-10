import { Router } from "express";
import multer from "multer";
import uploadConfig from "../config/upload";
import CreateUserService from "../services/CreateUserService";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";
import { getRepository } from "typeorm";
import User from "../models/User";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const usersRouter = Router();

const upload = multer(uploadConfig);

usersRouter.get("/", async (request, response) => {
  const user = getRepository(User);
  const users = await user.find();

  return response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { name, email, password } = request.body;
  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return response.json(user);
});

usersRouter.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;
    return response.json(user);
  }
);

export default usersRouter;
