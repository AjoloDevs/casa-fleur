import { PrismaClient } from "../../generated/client";
import { UserDto } from "../../types";

export class UserService {
  constructor(private prisma: PrismaClient) {}

  findAll() {
    return this.prisma.user.findMany({
      omit: {
        password: true,
      },
    });
  }

  create(data: UserDto) {
    return this.prisma.user.create({ data });
  }
}
