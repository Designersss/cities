import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {URL_API} from "../utils/utlis.ts";
import {ICities, IUser} from "../type-global/user-types.ts";


export const api = createApi({
    reducerPath: "api",
    tagTypes: ['Users'],
    baseQuery: fetchBaseQuery({
        baseUrl: URL_API
    }),
    endpoints: (builder) => ({
        getUser: builder.query<IUser[], object>({
            query: () => '/users',
            providesTags: () => [{type: 'Users'}]
        }),
        getCities: builder.query<ICities[], object>({
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

export const {useGetUserQuery, useCreateUserMutation, useGetCitiesQuery} = api