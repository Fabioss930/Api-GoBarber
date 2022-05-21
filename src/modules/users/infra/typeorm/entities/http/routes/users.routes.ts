import { Router } from "express";
import multer from "multer";
import uploadConfig from "@config/upload";
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepositories";
import CreateUserService from "@modules/users/services/CreateUserService";
import UpdateUserAvatarService from "@modules/users/services/UpdateUserAvatarService";
import { getRepository } from "typeorm";
import User from "../../User";
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
  const usersRepository = new UsersRepository();
  const createUser = new CreateUserService(usersRepository);

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
    const usersRepository = new UsersRepository();
    const updateUserAvatar = new UpdateUserAvatarService(usersRepository);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;
    return response.json(user);
  }
);

export default usersRouter;
