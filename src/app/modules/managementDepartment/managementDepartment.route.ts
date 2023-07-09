import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ManagementDepartmentController } from './managementDepartmentController';
import { ManagementDepartmentValidation } from './validationmManagementDepartment';

const managementDepartmentRouter = Router();

managementDepartmentRouter.post(
  '/create-management',
  validateRequest(
    ManagementDepartmentValidation.createManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.createManagementDepartment
);

managementDepartmentRouter.get(
  '/',
  ManagementDepartmentController.getAllManagementDepartments
);

managementDepartmentRouter.get(
  '/:id',
  ManagementDepartmentController.getSinglelManagementDepartment
);

managementDepartmentRouter.patch(
  '/:id',
  validateRequest(
    ManagementDepartmentValidation.updateManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.updateManagementDepartment
);

export const ManagementDepartmentRoutes = managementDepartmentRouter;
