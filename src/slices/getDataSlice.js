
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:80' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name) => `/${name}`,
    }),
  }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { getPokemonByNameQuery } = pokemonApi