const asyncHandler = require("../middlewares/asyncHandler"); // لو عندك middleware جاهز
const prisma = require("../prisma.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password, phoneNumber, role } = req.body;

  try {
    // تحقق لو الإيميل أو رقم الهاتف موجود
    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { phoneNumber }] },
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email or phone number already exists" });
    }

    // تشفير الباسورد
    const passwordHash = await bcrypt.hash(password, 10);

    // إنشاء المستخدم
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        phoneNumber,
        role, // لو ما بعتش role → بياخد "student"
      },
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  try {
    // إيجاد المستخدم
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // التحقق من الباسورد
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // توليد التوكن
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // الحصول على id من req.user الذي تم تعيينه في middleware
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, phoneNumber } = req.body;

  try {
    // تحقق لو المستخدم موجود
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // تحديث بيانات المستخدم
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name, email, phoneNumber },
    });

    res.json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const getAllTeachers = asyncHandler(async (req, res) => {
  const teachers = await prisma.user.findMany({
    where: { role: "teacher" },
  });

  res.json({ teachers });
});

module.exports = {
  register,
  login,
  getUserProfile,
  getAllUsers,
  updateUser,
  getAllTeachers,
};
