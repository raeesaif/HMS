import appoinmentModel from '@src/models/AppointmentModel';
import { AppoinmentType } from '@src/models/AppointmentModel';
import UserModel, { Role } from '@src/models/UserModel';
import AppError from '@src/utils/appError';
import { generateRandomString } from '@src/utils/helper';

const CreateAppoinmentService = async (
  appoinmentData: Omit<AppoinmentType, 'appointmentId'>
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
  });

  await appointment.populate([
    { path: 'patient', select: 'firstName lastName email' },
    { path: 'doctor', select: 'firstName lastName email' },
    { path: 'department', select: 'name' },
  ]);

  return appointment;
};

const getAllappoinmentService = async () => {
  return appoinmentModel
    .find()
    .populate('patient', 'firstName lastName email')
    .populate('doctor', 'firstName lastName email')
    .populate('department', 'name')
    .sort({ appointmentDate: 1 });
};

export { CreateAppoinmentService, getAllappoinmentService };
