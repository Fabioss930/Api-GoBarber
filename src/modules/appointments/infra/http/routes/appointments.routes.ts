import { Router } from "express";

import AppointmentController from "../controllers/AppointmentsController";
import ensureAuthenticated from "@modules/users/infra/typeorm/entities/http/middlewares/ensureAuthenticated";

const appointmentsRouter = Router();
const appointmentController = new AppointmentController();

appointmentsRouter.use(ensureAuthenticated);
appointmentsRouter.post("/", appointmentController.create);

export default appointmentsRouter;
