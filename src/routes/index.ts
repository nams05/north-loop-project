import { Router } from 'express';
import FinanceRouter from './finance-router'
// Init router and path
const router = Router();

// Add sub-routes
router.use('/finance', FinanceRouter);

// Export the base-router
export default router;
