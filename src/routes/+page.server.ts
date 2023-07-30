// src/routes/+page.server.ts

import prisma from "$lib/prisma";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
  // 1.
  const response = await prisma.project.findMany();

  // 2.
  return { projects: response };
}) satisfies PageServerLoad;
