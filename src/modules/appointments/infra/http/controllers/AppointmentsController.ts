import { Request, Response } from "express";
import CreateApointmentService from '@modules/appointments/services/CreateAppointmentService';

import { parseISO } from 'date-fns';
import {container } from 'tsyringe';



export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
  const user_id = request.user.id;
  const { provider_id, date } = request.body;
  const parsedDate = parseISO(date);

  const createAppointment = container.resolve(CreateApointmentService)

  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
    user_id,
  });
  return response.json(appointment);
  }
}