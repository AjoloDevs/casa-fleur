import { PrismaClient } from "../../generated/client";
import { PromotionInput, PromotionUpdateInput } from "./promotion.schema";

export class PromotionService {
  constructor(private prisma: PrismaClient) { }

  findAll() {
    return this.prisma.promotion.findMany()
  }

  //TODO: Agregar funcionalidad por termino
  findByTerm(term: string) {

  }

  create(data: PromotionInput) {
    return this.prisma.promotion.create({ data })
  }

  update(id: string, data: PromotionUpdateInput) {
    return this.prisma.promotion.update({ where: { idPromotion: id }, data })
  }

  delete(id: string) {
    return this.prisma.promotion.delete({ where: { idPromotion: id } })
  }
}

