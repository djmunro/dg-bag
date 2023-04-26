import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
  getDiscs: publicProcedure.query(async ({ ctx }) => {
    const res = await fetch(
      "https://www.api.dgcentral.dev/discs?pageSize=2000"
    );
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    // Recommendation: handle errors
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }

    return res.json();
  }),
  addDisc: publicProcedure
    .input(z.object({ name: z.string(), weight: z.number() }))
    .mutation(({ input }) => {
      console.log({
        name: input.name,
        weight: input.weight,
      });
    }),
});
