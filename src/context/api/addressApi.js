import { api2 } from "./index";

export const addressApi = api2.injectEndpoints({
  endpoints: (build) => ({
    getAddress: build.query({
      query: ({ body, id }) => ({
        url: `/api/company${id}`,
        method: "GET",
        body,
      }),
      invalidatesTags: ["Address"],
    }),
    createAddress: build.mutation({
      query: (body) => ({
        url: "/api/company",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Address"],
    }),
    updateAddress: build.mutation({
      query: (id) => ({
        url: `/api/company/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Address"],
    }),
    deleteAddress: build.mutation({
      query: (id) => ({
        url: `/api/company/${id}`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Address"],
    }),
  }),
});

export const {
  useGetAddressQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = addressApi;
