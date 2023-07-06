import { IFaculty } from './faculty.interface';
import Faculty from './faculty.model';

const getAllFaculties = async (): Promise<IFaculty[]> => {
  const result = await Faculty.find({})
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};
const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findById(id)
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};

const deletdFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findByIdAndDelete(id)
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};

export const FacultyService = {
  getAllFaculties,
  getSingleFaculty,
  deletdFaculty,
};
