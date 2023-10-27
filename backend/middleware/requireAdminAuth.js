const requireAdminAuth = async (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: 'Permission denied' });
    }
    next();
}


export default requireAdminAuth;
