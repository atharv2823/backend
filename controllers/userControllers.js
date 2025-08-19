import prisma from "../db/config.js";

// create User

export const createUser = async (req, res) => {
  const { name, email, number, city, password } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        number: req.body.number,
        password: req.body.password,
        city: req.body.city,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json({ Users: users });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ User: user });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.delete({
      where: { id: Number(id) },
    });
    res.json({ User: user });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, number, city } = req.body;
    try {
        const user = await prisma.user.update({
            where: { id: Number(id) },
            data: { name, email, number, city },
        });
        res.json({ User: user });
        console.log("User updated successfully", user);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};


