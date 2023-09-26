// seed.ts
import prisma from "../lib/prisma";
import fs from "fs";

async function seed() {
  try {
    await prisma.project.deleteMany();
    // Read the contents of projects.json
    const projects = require("./projects.json");

    for (const project of projects) {
      // Create the project using the Prisma Client
      await prisma.project.create({
        data: {
          type: project.type,
          name: project.name,
          description: project.description,
          img: project.img,
          projectTime: project.date,
          inProgress: project.inProgress,
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
