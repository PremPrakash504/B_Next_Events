import { indexSlice } from './indexSlice'

export const portfolioApiSlice = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPortfolio: builder.query({
      query: () => '/portfolio/getportfolio',
    }),
  }),
})

export const { useGetPortfolioQuery } = portfolioApiSlice;
