import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {URL_API} from "../utils/utlis.ts";


export const api = createApi({
    reducerPath: "api",
    tagTypes: ['Users'],
    baseQuery: fetchBaseQuery({
        baseUrl: URL_API
    }),
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => '/users',
            providesTags: () => [{type: 'Users'}]
        }),
        getCities: builder.query({
            query: () => '/cities'
        }),
        createUser: builder.mutation({
            query: (user) => ({
                url: '/users',
                body: user,
                method: 'POST'
            }),
            invalidatesTags: () => [{type: 'Users'}]
        })
    })
})

export const {useGetUserQuery, useCreateUserMutation} = api