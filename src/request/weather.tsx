import * as z from "zod";

const Weather = z.object({ 
    created: z.iso.datetime(),
    temperature: z.number(),
    city: z.string()
  });

export {Weather};