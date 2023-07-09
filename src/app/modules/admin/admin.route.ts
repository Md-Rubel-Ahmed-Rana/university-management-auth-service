import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AdminController } from './admin.controller';
import { AdminValidation } from './admin.validation';

const adminRouter = Router();
adminRouter.get('/', AdminController.getAllAdmins);

adminRouter.get('/:id', AdminController.getSingleAdmin);

adminRouter.patch(
  '/:id',
  validateRequest(AdminValidation.updateAdminZodSchema),
  AdminController.updateAdmin
);

export const AdminRoutes = adminRouter;
