import { indexSlice } from './indexSlice'

export const heroApiSlice = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHero: builder.query({
      query: () => '/herosection/getHeroSection',
    }),
  }),
})

export const { useGetHeroQuery } = heroApiSlice;
