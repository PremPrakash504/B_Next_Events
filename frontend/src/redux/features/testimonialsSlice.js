import { indexSlice } from './indexSlice'

export const testimonialsApiSlice = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTestimonials: builder.query({
      query: () => '/clientssay/getApprovedReviews',
    }),
  }),
})

export const { useGetTestimonialsQuery } = testimonialsApiSlice;
