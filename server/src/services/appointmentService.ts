import appoinmentModel from '@src/models/AppointmentModel';
import { AppoinmentType } from '@src/models/AppointmentModel';
import UserModel, { Role } from '@src/models/UserModel';
import AppError from '@src/utils/appError';
import { generateRandomString } from '@src/utils/helper';
import generateTimeSlots from '@src/utils/appointmentSlots';

const CreateAppoinmentService = async (
  appoinmentData: Omit<AppoinmentType, 'appointmentId'>,
  createdBy?: string
) => {
  const { patient, doctor, appointmentDate, appoinmentTime } = appoinmentData;

  const doctorDoc = await UserModel.findOne({ _id: doctor, role: Role.Doctor });
  if (!doctorDoc) {
    throw new AppError(404, 'Doctor not found');
  }

  const patientDoc = await UserModel.findOne({
    _id: patient,
    role: Role.Patient,
  });
  if (!patientDoc) {
    throw new AppError(404, 'Patient not found');
  }

  const conflict = await appoinmentModel.findOne({
    doctor,
    appointmentDate,
    appoinmentTime,
    status: { $in: ['scheduled', 'confirmed'] },
  });
  if (conflict) {
    throw new AppError(
      409,
      'This slot is already booked for the selected doctor'
    );
  }

  const appointmentId = `APT-${generateRandomString(8).toUpperCase()}`;

  const appointment = await appoinmentModel.create({
    ...appoinmentData,
    appointmentId,
    createdBy,
  });

  await appointment.populate([
    { path: 'patient', select: 'firstName lastName email' },
    { path: 'doctor', select: 'firstName lastName email' },
    { path: 'department', select: 'name' },
    { path: 'createdBy', select: 'firstName lastName' },
  ]);

  return appointment;
};

const getAllappoinmentService = async () => {
  return appoinmentModel
    .find()
    .populate('patient', 'firstName lastName email')
    .populate('doctor', 'firstName lastName email')
    .populate('department', 'name')
    .populate('createdBy', 'firstName lastName')
    .sort({ appointmentDate: 1 });
};

const dayRange = (date: string | Date) => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  return { start, end };
};

const getAvailableSlotsService = async (doctorId: string, date: string) => {
  const doctorDoc = await UserModel.findOne({
    _id: doctorId,
    role: Role.Doctor,
  });
  if (!doctorDoc) {
    throw new AppError(404, 'Doctor not found');
  }

  if (!doctorDoc.shiftStart || !doctorDoc.shiftEnd) {
    throw new AppError(400, 'Doctor has no shift timing configured');
  }

  const allSlots = generateTimeSlots(doctorDoc.shiftStart, doctorDoc.shiftEnd);

  const { start, end } = dayRange(date);

  const bookedAppointments = await appoinmentModel.find({
    doctor: doctorId,
    appointmentDate: { $gte: start, $lt: end },
    status: { $in: ['scheduled', 'confirmed'] },
  });

  const bookedSlots = new Set(
    bookedAppointments.map((appt) => appt.appoinmentTime)
  );

  return allSlots.filter((slot) => !bookedSlots.has(slot));
};

const cancelAppoinmentService = async (id: string, cancelreason: string) => {
  const appoinment = await appoinmentModel.findByIdAndUpdate(
    id,
    { status: 'cancelled', cancelreason },
    { new: true }
  );

  if (!appoinment) {
    throw new AppError(404, 'Appoinment not found');
  }

  return appoinment;
};

const deleteAppoinmentService = async (id: string) => {
  const appoinment = await appoinmentModel.findByIdAndDelete(id);

  if (!appoinment) {
    throw new AppError(404, 'Appoinment not found');
  }
};

export {
  CreateAppoinmentService,
  getAllappoinmentService,
  getAvailableSlotsService,
  deleteAppoinmentService,
  cancelAppoinmentService,
};
