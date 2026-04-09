import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_DEV_BACKEND_URL,
  credentials: "include",
});

export const indexSlice = createApi({
  baseQuery,
  tagTypes: ["auth", "bookings", "portfolio", "testimonials", "hero"],
  endpoints: (builder) => ({
    getBookings: builder.query({
      query: () => "/site/getallbooking",
      providesTags: ["bookings"],
    }),
    updateBooking: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/site/updatebooking/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["bookings"],
    }),
    updateBookingStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/site/updatebookingstatus/${id}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["bookings"],
    }),
    deleteBooking: builder.mutation({
      query: (id) => ({
        url: `/site/deletebooking/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["bookings"],
    }),
    getPortfolios: builder.query({
      query: () => "/portfolio/getportfolio",
      providesTags: ["portfolio"],
    }),
    addPortfolio: builder.mutation({
      query: (formData) => ({
        url: "/portfolio/addportfolio",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["portfolio"],
    }),
    updatePortfolio: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/portfolio/updateportfolio/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["portfolio"],
    }),
    deletePortfolio: builder.mutation({
      query: (id) => ({
        url: `/portfolio/deleteportfolio/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["portfolio"],
    }),
    getCategories: builder.query({
      query: () => "/portfolio/getcategories",
      providesTags: ["categories"],
    }),
    getTestimonials: builder.query({
      query: () => "/clientssay/getAllReviewsByAdminBeforeApproval",
      providesTags: ["testimonials"],
    }),
    getAllTestimonialsForAdmin: builder.query({
      query: () => "/clientssay/getAllReviewsForAdmin",
      providesTags: ["testimonials"],
    }),
    getAllTestimonials: builder.query({
      query: () => "/clientssay/getApprovedReviews",
      providesTags: ["testimonials"],
    }),
    updateReviewStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/clientssay/reviewstatus/${id}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["testimonials"],
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/clientssay/deletereview/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["testimonials"],
    }),
    getHeroSections: builder.query({
      query: () => "/herosection/getHeroSection",
      providesTags: ["hero"],
    }),
    addHeroSection: builder.mutation({
      query: (formData) => ({
        url: "/herosection/addHeroSection",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["hero"],
    }),
    updateHeroSection: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/herosection/updateHeroSection/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["hero"],
    }),
    deleteHeroSection: builder.mutation({
      query: (id) => ({
        url: `/herosection/deleteHeroSection/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["hero"],
    }),
  }),
});

export const {
  useGetBookingsQuery,
  useUpdateBookingMutation,
  useUpdateBookingStatusMutation,
  useDeleteBookingMutation,
  useGetPortfoliosQuery,
  useAddPortfolioMutation,
  useUpdatePortfolioMutation,
  useDeletePortfolioMutation,
  useGetCategoriesQuery,
  useGetTestimonialsQuery,
  useGetAllTestimonialsForAdminQuery,
  useUpdateReviewStatusMutation,
  useDeleteReviewMutation,
  useGetHeroSectionsQuery,
  useAddHeroSectionMutation,
  useUpdateHeroSectionMutation,
  useDeleteHeroSectionMutation,
} = indexSlice;
