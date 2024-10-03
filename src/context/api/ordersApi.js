import { api2 } from "./index";

export const ordersApi = api2.injectEndpoints({
  endpoints: (build) => ({
    getAllOrders: build.query({
      query: (body) => ({
        url: "/api/orders",
        method: "GET",
        body,
      }),
      invalidatesTags: ["Orders"],
    }),
    getOrder: build.query({
      query: ({ body, id }) => ({
        url: `/api/orders${id}`,
        method: "GET",
        body,
      }),
      invalidatesTags: ["Orders"],
    }),
    createOrders: build.mutation({
      query: (body) => ({
        url: "/api/order",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Orders"],
    }),
    updateOrders: build.mutation({
      query: (id) => ({
        url: `/api/order/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Orders"],
    }),
    deleteOrders: build.mutation({
      query: (id) => ({
        url: `/api/order/${id}`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetOrderQuery,
  useCreateOrdersMutation,
  useUpdateOrdersMutation,
  useDeleteOrdersMutation,
} = ordersApi;
