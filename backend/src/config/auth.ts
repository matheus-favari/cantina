import { SignOptions } from "jsonwebtoken";

interface AuthConfig {
  jwt: {
    secret: string;
    expiresIn: SignOptions["expiresIn"];
  };

  bcrypt: {
    saltRounds: number;
  };
}

const authConfig = {
  jwt: {
    secret: process.env.JWT_SECRET!,
    expiresIn: "7d",
  },

  bcrypt: {
    saltRounds: 10,
  },
} satisfies AuthConfig;

export { authConfig };
