import * as z from "zod"

export const PokemonModel = z.object({
  id: z.number().int(),
  name: z.string(),
  votesUp: z.number().int(),
  votesDown: z.number().int(),
})
