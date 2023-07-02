import express from 'express';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { SemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { UserRoutes } from '../modules/users/user.route';

const router = express.Router();

const moduleRoutes = [
  { path: '/users', route: UserRoutes },
  { path: '/academic-semesters', route: SemesterRoutes },
  { path: '/academic-faculties', route: AcademicFacultyRoutes },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
