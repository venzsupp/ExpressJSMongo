import * as z from "zod";

const Client = z.object({ 
    client_name: z.string(),
    client_id: z.string()
  });

export {Client};