import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.models';

export const findlastStudent = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastStudent?.id.substring(4);
};

export const generateStudentId = async (
  academicSemester: IAcademicSemester | null
): Promise<string | undefined> => {
  const currentId =
    (await findlastStudent()) || (0).toString().padStart(5, '0');
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `${academicSemester?.year.substring(2)}${
    academicSemester?.code
  }${incrementedId}`;
  return incrementedId;
};

export const findlastFaculty = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastFaculty?.id.substring(2);
};

export const generateFacultyId = async (): Promise<string | undefined> => {
  const currentId =
    (await findlastFaculty()) || (0).toString().padStart(5, '0');

  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `F-${incrementedId}`;
  return incrementedId;
};
