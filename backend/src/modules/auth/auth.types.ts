import { CanteenSegment } from "../../generated/prisma/enums";

interface RegisterDTO {
  canteenName: string;
  segment: CanteenSegment;
  name: string;
  email: string;
  password: string;
}

export { RegisterDTO };
