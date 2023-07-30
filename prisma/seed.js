// seed.ts
import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

async function seed() {
  try {
    await prisma.project.deleteMany();
    // Read the contents of projects.json
    const data = fs.readFileSync("projects.json", "utf8");
    const projects = JSON.parse(data);

    for (const project of projects) {
      // Create the project using the Prisma Client
      await prisma.project.create({
        data: {
          type: project.type,
          name: project.name,
          description: project.description,
          img: project.img,
          projectTime: project.date,
        },
      });
    }

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Error occurred during seeding:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
