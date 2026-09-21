import { Router } from 'express';
const router = Router();
import {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  exportProjects,
  exportComponentEnv,
  showProjectStats,
} from '../controllers/projectController.js';
import {
  validateProjectInput,
  validateProjectIdParam,
} from '../middleware/validationMiddleware.js';

router
  .route('/')
  .get(getAllProjects)
  .post(validateProjectInput, createProject);

router.route('/stats').get(showProjectStats);
router.route('/export').get(exportProjects);

router
  .route('/:id')
  .get(validateProjectIdParam, getProject)
  .patch(validateProjectIdParam, validateProjectInput, updateProject)
  .delete(validateProjectIdParam, deleteProject);

router
  .route('/:id/components/:componentId/env')
  .get(validateProjectIdParam, exportComponentEnv);

export default router;
