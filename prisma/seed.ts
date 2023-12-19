// seed.ts
import prisma from "../lib/prisma";
import fs from "fs";

async function seed() {
  try {
    // await prisma.projectContent.deleteMany({});
    // await prisma.project.deleteMany({});
    // Read the contents of projects.json
    const projects = require("./projects.json");
    const projectContents = require("./projectContents.json");

    for (const project of projects) {
      // Create the project using the Prisma Client
      await prisma.project.create({
        data: {
          type: project.type,
          name: project.name,
          description: project.description,
          img: project.img,
          github: project.githubLink,
          projectStartYear: project.projectStartYear ?? null,
          projectStartMonth: project.projectStartMonth ?? null,
          projectEndYear: project.projectEndYear ?? null,
          projectEndMonth: project.projectEndMonth ?? null,
        },
      });
    }

    for (const projectContent of projectContents) {
      const project = await prisma.project.findFirst({
        where: { name: projectContent.projectName },
      });
      if (project && project.id) {
        await prisma.projectContent.create({
          data: {
            content: projectContent.content,
            order: projectContent.order,
            contentType: projectContent.contentType,
            projectId: project?.id,
          },
        });
      }
    }

    console.log("Seeding completed successfully!");
  } catch (error) {
    console.error("Error occurred during seeding:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
