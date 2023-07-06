import { z } from 'zod';

const updateFacultyZodSchema = z.object({
  body: z.object({
    faculty: z.object({
      id: z.string({
        required_error: 'ID is required',
      }),
      name: z.object({
        firstName: z.string({
          required_error: 'firstName is required',
        }),
        lastName: z.string({
          required_error: 'LastName is required',
        }),
        middleName: z.string({
          required_error: 'MiddleName is required',
        }),
      }),
      dateOfBirth: z.string({
        required_error: 'Date of birth is required',
      }),
      gender: z.string({
        required_error: 'Gender is required',
      }),
      bloodGroup: z.string({
        required_error: 'Blood group is required',
      }),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),
      contactNo: z.string({
        required_error: 'Contact no is required',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency Contact No is required',
      }),
      presentAddress: z.string({
        required_error: 'Present address is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address is required',
      }),
      designation: z.string({
        required_error: 'Designation is required',
      }),
      academicDepartment: z.string({
        required_error: 'Academic Department is required',
      }),
      academicFaculty: z.string({
        required_error: 'Academic Faculty is required',
      }),
      profileImage: z.string().optional(),
    }),
  }),
});

export const FacultyValidation = {
  updateFacultyZodSchema,
};
