import { z } from 'zod';

const updateAdminZodSchema = z.object({
  id: z.string().optional(),
  name: z
    .object({
      firstName: z.string().optional(),
      middleName: z.string().optional(),
      lastName: z.string().optional(),
    })
    .optional(),
  dateOfBirth: z.string().optional(),
  email: z.string().optional(),
  contactNo: z.string().optional(),
  emergencyContactNo: z.string().optional(),
  gender: z.string().optional(),
  permanentAddress: z.string().optional(),
  presentAddress: z.string().optional(),
  bloodGroup: z.string().optional(),
  managementDepartment: z.string().optional(),
  designation: z.string().optional(),
  profileImage: z.string().optional(),
});

export const AdminValidation = {
  updateAdminZodSchema,
};
