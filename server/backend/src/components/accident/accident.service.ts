import { PrismaClient, Accident } from "@prisma/client";
import { Service } from "typedi";
import { CreateAccidentDto } from "./accident.validation";

const prisma = new PrismaClient();

@Service()
export class AccidentService {
  async createAccident(dto: CreateAccidentDto): Promise<Accident> {
    return prisma.accident.create({
      data: dto,
    });
  }

  async getAccidentById(id: number): Promise<Accident | null> {
    return prisma.accident.findUnique({
      where: { id },
    });
  }

  async updateAccident(
    id: number,
    dto: CreateAccidentDto
  ): Promise<Accident | null> {
    const accident = await prisma.accident.findUnique({
      where: { id },
    });

    if (!accident) {
      throw new Error("Accident not found");
    }

    if (dto.days_without_accident > accident.record_days_without_accident) {
      dto.record_days_without_accident = dto.days_without_accident;
    }

    if (dto.accidents_this_year > accident.accidents_this_year) {
      dto.days_without_accident = 0;
    }

    return prisma.accident.update({
      where: { id },
      data: dto,
    });
  }

  async deleteAccident(id: number): Promise<Accident | null> {
    return prisma.accident.delete({
      where: { id },
    });
  }

  async getAllAccidents(): Promise<Accident[]> {
    return prisma.accident.findMany();
  }

  async incrementDaysWithoutAccident(): Promise<void> {
    const allAccidents = await prisma.accident.findMany();
    allAccidents.forEach(async (accident) => {
      await prisma.accident.update({
        where: { id: accident.id },
        data: { days_without_accident: accident.days_without_accident + 1 },
      });
    });
  }

  async resetOnNewYear(): Promise<void> {
    await prisma.accident.updateMany({
      data: { reset_on_new_year: true },
    });
  }
}
