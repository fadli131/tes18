import express from 'express';
import { loginUser, registerUser, getUser } from '../controllers/userController.js';
import requireAuth from '../middleware/requireAuth.js';
import requireAdminAuth from '../middleware/requireAdminAuth.js'; 
import { deleteUser, getAllUsers } from '../controllers/userController.js'; 

const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/getAllUsers', requireAuth, requireAdminAuth, getAllUsers);
router.get('/admin/getUsers', requireAuth, requireAdminAuth, getAllUsers);
router.delete('/admin/deleteUser/:id', requireAuth, requireAdminAuth, deleteUser);




export default router;
