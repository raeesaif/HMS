import HospitalModel, { type HospitalType } from '@src/models/HospitalModel';
import { Role } from '@src/models/UserModel';
import { registerUser } from '@src/services/authService';
import AppError from '@src/utils/appError';
import UserModel from '@src/models/UserModel';
import sanitizeUser from '@src/utils/sanitizeUser';

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
    HospitalModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit),

    HospitalModel.countDocuments(),
  ]);

  const hospitalWithUsers = await Promise.all(
    hospitals.map(async (hospital) => {
      const [totalUser, adminUser] = await Promise.all([
        UserModel.countDocuments({
          hospitalId: hospital._id,
          role: { $in: ['doctor', 'nurse', 'receptionist', 'patient'] },
        }),
        UserModel.findOne({ hospitalId: hospital._id, role: Role.Admin }),
      ]);
      return {
        ...hospital.toObject(),
        totalUser,
        admin: adminUser ? sanitizeUser(adminUser) : null,
      };
    })
  );

  return {
    hospitals: hospitalWithUsers,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const updateHospital = async (id: string, payload: any) => {
  const { admin, ...hospitalFields } = payload;

  const hospital = await HospitalModel.findByIdAndUpdate(id, hospitalFields, {
    new: true,
    runValidators: true,
  });

  if (!hospital) {
    throw new AppError(404, 'Hospital not found');
  }

  let adminUser = null;
  if (admin) {
    adminUser = await UserModel.findOneAndUpdate(
      { hospitalId: id, role: Role.Admin },
      admin,
      { new: true, runValidators: true }
    );
  }

  return {
    hospital,
    admin: adminUser ? sanitizeUser(adminUser) : null,
  };
};

const getHospitalById = async (id: string) => {
  const hospital = await HospitalModel.findById(id);
  if (!hospital) {
    throw new AppError(404, 'Hospital not found');
  }
  return hospital;
};

const deleteHospital = async(id:string)=>{
    const hospital = await HospitalModel.findByIdAndDelete(id)

    if(!hospital){
        throw new AppError(404,"Hospital not found")
    }
}



export { createHospital, getAllHospital, updateHospital,getHospitalById,deleteHospital };
