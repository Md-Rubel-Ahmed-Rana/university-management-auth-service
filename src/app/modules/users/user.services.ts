import config from '../../../config/index';
import ApiError from '../../../errors/ApiError';
import AcademicSemester from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import { User } from './user.models';
import { generateStudentId } from './user.utils';
import { UserInterface } from './users.interfaces';

const createStudent = async (
  student: IStudent,
  user: UserInterface
): Promise<UserInterface | null> => {
  if (!user.password) {
    user.password = config.default_student_password as string;
  }

  // set role
  user.role = 'student';

  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  );
  const id = await generateStudentId(academicSemester);
  const createdUser = await User.create(user);
  if (!createdUser) {
    throw new ApiError(400, 'Failed to create user!');
  }
  return createdUser;
};

export const UserService = {
  createStudent,
};
