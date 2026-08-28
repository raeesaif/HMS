import HospitalModel, { type HospitalType } from '@src/models/HospitalModel';
import { Role } from '@src/models/UserModel';
import { registerUser } from '@src/services/authService';
import AppError from '@src/utils/appError';

const TRIAL_DURATION_DAYS = 30;

type AdminData = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
};

type CreateHospitalData = HospitalType & { admin: AdminData };

const createHospital = async (hospitalData: CreateHospitalData) => {
  const { admin, ...hospitalFields } = hospitalData;

  const hospitalEmail = hospitalFields.hospitalEmail.toLowerCase();

  const existingHospital = await HospitalModel.findOne({
    hospitalEmail,
  });
  if (existingHospital) {
    throw new AppError(409, 'Hospital with this email already exists');
  }

  const trialEndsAt = new Date();
  trialEndsAt.setDate(trialEndsAt.getDate() + TRIAL_DURATION_DAYS);

  const hospital = await HospitalModel.create({
    ...hospitalFields,
    hospitalEmail,
    status: 'trial',
    trialEndsAt,
  });

  try {
    const { user: adminUser } = await registerUser({
      firstName: admin.firstName,
      lastName: admin.lastName,
      email: admin.email,
      phone: admin.phone,
      role: Role.Admin,
      hospitalId: String(hospital._id),
    });

    return {
      hospital,
      admin: adminUser,
    };
  } catch (error) {
    await HospitalModel.findByIdAndDelete(hospital._id);
    throw error;
  }
};


const getAllHospital = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;

  const [hospitals, total] = await Promise.all([
    HospitalModel.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),

    HospitalModel.countDocuments(),
  ]);

  return {
    hospitals,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};


export { createHospital,getAllHospital };
