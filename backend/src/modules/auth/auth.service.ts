import { prisma } from "../../config/prisma";
import { defaultCategories } from "../categories/defaultCategories";
import { RegisterDTO } from "./auth.types";

const registerService = async (data: RegisterDTO) => {
  console.log("Data", data);

  const userAlreadyExists = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (userAlreadyExists) {
    throw new Error("Email já cadastrado");
  }

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
        passwordHash: data.password,
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

export default registerService;
