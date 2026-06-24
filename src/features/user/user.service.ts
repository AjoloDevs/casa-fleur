import { PrismaClient } from "../../generated/client";
import { UserSchema } from "./user.schema";
import { z } from "zod";

export class UserService {
  constructor(private prisma: PrismaClient) { }

  findAll() {
    return this.prisma.user.findMany({ omit: { password: true } });
  }

  create(data: z.infer<typeof UserSchema>) {
    return this.prisma.user.create({ data, omit: { password: true } });
  }

  update(id: string, data: Partial<z.infer<typeof UserSchema>>) {
    return this.prisma.user.update({ where: { idUser: id }, data, omit: { password: true } });
  }

  delete(id: string) {
    return this.prisma.user.delete({ where: { idUser: id } });
  }
}
