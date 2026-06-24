import { PrismaClient } from "../../generated/client";
import { UserInput, UserUpdateInput } from "./user.schema";

export class UserService {
  constructor(private prisma: PrismaClient) { }

  findAll() {
    return this.prisma.user.findMany({ omit: { password: true } });
  }

  findById(id: string) {
    return this.prisma.user.findUnique({
      where: { idUser: id },
      omit: { password: true },
    });
  }

  create(data: UserInput) {
    return this.prisma.user.create({ data, omit: { password: true } });
  }

  update(id: string, data: UserUpdateInput) {
    return this.prisma.user.update({
      where: { idUser: id },
      data,
      omit: { password: true },
    });
  }

  delete(id: string) {
    return this.prisma.user.delete({ where: { idUser: id } });
  }
}
