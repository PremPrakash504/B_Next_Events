import { indexSlice } from "./indexSlice";

export const testimonialsApiSlice = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTestimonials: builder.query({
      query: () => "/clientssay/getApprovedReviews",
    }),
    submitReview: builder.mutation({
      query: (formData) => ({
        url: "/clientssay/addreview",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useGetTestimonialsQuery, useSubmitReviewMutation } =
  testimonialsApiSlice;
