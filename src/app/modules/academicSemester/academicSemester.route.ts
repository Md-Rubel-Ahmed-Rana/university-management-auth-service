import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './academicSemester.controller';
import { AcademicSemesterValidation } from './academicSemester.validation';

const semesterRouter = Router();

semesterRouter.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester
);

semesterRouter.get('/', AcademicSemesterController.getAllSemester);
semesterRouter.get('/:id', AcademicSemesterController.getSingleSemester);
semesterRouter.patch(
  '/:id',
  validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  AcademicSemesterController.updateSemester
);

semesterRouter.delete('/:id', AcademicSemesterController.deleteSemester);
export const SemesterRoutes = semesterRouter;
