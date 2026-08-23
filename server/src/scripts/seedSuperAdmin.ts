/**
 * One-time bootstrap script for creating the first superadmin/admin account.
 *
 * Not exposed over HTTP on purpose: the public /auth/register endpoint
 * deliberately cannot create admin/superadmin accounts (see
 * userValidation.ts), since it has no auth guard. This script is the only
 * way to create the very first privileged account; after that, a protected
 * "create staff" endpoint (once login exists) can create the rest.
 *
 * Usage:
 *   npm run seed:admin -- --email=admin@hms.com --password=Secret123 --firstName=Super --lastName=Admin [--role=admin]
 */
import 'dotenv/config';
import mongoose from 'mongoose';
import UserModel, { Role } from '@src/models/UserModel';
import { hashPassword, generateRandomString, generateStaffId } from '@src/utils/helper';

type Args = {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
};

const parseArgs = (argv: string[]): Args => {
  const args: Args = {};
  for (const raw of argv) {
    const match = /^--([^=]+)=(.*)$/.exec(raw);
    if (match) {
      const [, key, value] = match;
      (args as Record<string, string>)[key] = value;
    }
  }
  return args;
};

async function main() {
  const args = parseArgs(process.argv.slice(2));

  const email = args.email?.trim().toLowerCase();
  const firstName = args.firstName?.trim();
  const lastName = args.lastName?.trim();
  const role = args.role === 'admin' ? Role.Admin : Role.SuperAdmin;

  if (!email || !firstName || !lastName) {
    console.error(
      'Usage: npm run seed:admin -- --email=you@example.com --password=Secret123 --firstName=First --lastName=Last [--role=admin]'
    );
    process.exit(1);
  }

  const password = args.password ?? generateRandomString(8);

  if (password.length < 6) {
    console.error('Password must be at least 6 characters.');
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI as string);

  const existing = await UserModel.findOne({ email });
  if (existing) {
    console.error(`A user with email "${email}" already exists (role: ${existing.role}).`);
    await mongoose.disconnect();
    process.exit(1);
  }

  const hashedPassword = await hashPassword(password);
  const userId = generateStaffId(role);

  const user = await UserModel.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
    userId,
    isVerified: true,
    isFirstLogin: true,
    isActive: true,
  });

  console.log(`Created ${role} account:`);
  console.log(`  userId:   ${user.userId}`);
  console.log(`  email:    ${user.email}`);
  console.log(`  password: ${password}`);
  console.log('Store this password now — it is not saved anywhere in plaintext.');

  await mongoose.disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
