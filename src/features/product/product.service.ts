import { PrismaClient } from "../../generated/client";
import { ProductInput, ProductUpdateInput } from "./product.schema";

export class ProductService {
  constructor(private prisma: PrismaClient) { }

  findAll() {
    return this.prisma.product.findMany()
  }

  // TODO: Solucionar el problema con term
  findByTerm(term: string) {
    return this.prisma.product.findMany({ where: { name: term } })
  }

  create(data: ProductInput) {
    return this.prisma.product.create({ data })
  }

  update(id: string, data: ProductUpdateInput) {
    return this.prisma.product.update({ where: { idProduct: id }, data })
  }

  delete(id: string) {
    return this.prisma.product.delete({ where: { idProduct: id } })
  }

}
