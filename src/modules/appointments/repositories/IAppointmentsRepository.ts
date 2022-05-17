import Appointment from "../infra/typeorm/entities/appointment";
import IcreateAppointmentDTO from "../dtos/ICreateAppointmentDTO";

export default interface IAppointmentsRepository {
  create(data: IcreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
