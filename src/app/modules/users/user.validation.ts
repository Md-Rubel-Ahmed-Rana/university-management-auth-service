import { z } from 'zod';
import { bloodGroup, gender } from '../student/student.constants';

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required',
        }),
        middleName: z.string().optional(),
        lastName: z.string({
          required_error: 'Last name is required',
        }),
      }),
      dateOfBirth: z.string({
        required_error: 'Date of Birth is required',
      }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),
      bloodGroup: z.enum([...bloodGroup] as [string, ...string[]]).optional(),
      email: z.string({ required_error: 'Email is required' }).email(),
      contactNo: z.string({ required_error: 'Contact No is required' }),
      emergencyContactNo: z.string({
        required_error: 'Emergency Contact No is required',
      }),
      presentAddress: z.string({
        required_error: 'Present address is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required',
      }),
      guardian: z.object({
        fatherName: z.string({
          required_error: 'Father name is required',
        }),
        fatherOccupation: z.string({
          required_error: 'fatherOccupation is required',
        }),
        fatherContactNo: z.string({
          required_error: 'fatherContactNo is required',
        }),
        motherName: z.string({
          required_error: 'motherName is required',
        }),
        motherOccupation: z.string({
          required_error: 'motherOccupation is required',
        }),
        motherContactNo: z.string({
          required_error: 'motherContactNo is required',
        }),
        address: z.string({
          required_error: 'address is required',
        }),
      }),
      localGuardian: z.object({
        name: z.string({
          required_error: 'Name is required',
        }),
        occupation: z.string({
          required_error: 'occupation is required',
        }),
        contactNo: z.string({
          required_error: 'contactNo is required',
        }),
        address: z.string({
          required_error: 'address is required',
        }),
      }),
      profileImage: z.string().optional(),
    }),
  }),
});

export const UserValidation = {
  createUserZodSchema,
};
