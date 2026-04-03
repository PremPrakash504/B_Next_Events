import { indexSlice } from './indexSlice'

export const contactApiSlice = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendContact: builder.mutation({
      query: (formData) => ({
        url: '/site/addbook',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
})

export const { useSendContactMutation } = contactApiSlice;
