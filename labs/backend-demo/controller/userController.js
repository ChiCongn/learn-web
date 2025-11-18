export const createUser = async (req, res) => {
    try {
        const user = await req.models.User.create(req.body);
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getUsers = async (req, res) => {
    const users = await req.models.User.findAll();
    res.json(users);
};

export const getUserById = async (req, res) => {
    const user = await req.models.User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
};

export const deleteUser = async (req, res) => {
    const user = await req.models.User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    await user.destroy();
    res.json({ message: "User deleted" });
};
