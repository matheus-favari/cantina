import { prisma } from "../../config/prisma";
import AppError from "../../errors/AppError";
import { defaultCategories } from "../categories/defaultCategories";
import bcrypt from "bcrypt";
import { LoginDTO, RegisterDTO } from "./auth.schema";
import { authConfig } from "../../config/auth";
import jwt from "jsonwebtoken";

const registerService = async (data: RegisterDTO) => {
  const userAlreadyExists = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (userAlreadyExists) {
    throw new AppError("Email já cadastrado", 409);
  }

  const hashedPassword = await bcrypt.hash(data.password, authConfig.bcrypt.saltRounds);

  const result = await prisma.$transaction(async (tx) => {
    const canteen = await tx.canteen.create({
      data: {
        name: data.canteenName,
        segment: data.segment,
      },
    });

    const user = await tx.user.create({
      data: {
        name: data.name,

        email: data.email,
        passwordHash: hashedPassword,
        role: "OWNER",
        canteenId: canteen.id,
      },
    });

    await tx.category.createMany({
      data: defaultCategories.map((category) => ({
        name: category,
        canteenId: canteen.id,
      })),
    });

    return { canteen, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
  });

  return result;
};

const loginService = async (data: LoginDTO) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (!user) {
    throw new AppError("Credenciais inválidas", 401);
  }

  const passwordMacthes = await bcrypt.compare(data.password, user.passwordHash);

  if (!passwordMacthes) {
    throw new AppError("Credenciais inválidas", 401);
  }

  const token = jwt.sign(
    {
      canteenId: user.canteenId,
      role: user.role,
    },
    authConfig.jwt.secret,
    {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    },
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

export { loginService, registerService };
