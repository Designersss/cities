import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {URL_API} from "../utils/utlis.ts";


export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: URL_API
    }),
    endpoints: (builder) => ({
        getUser: builder.query({
            query: () => '/users'
        }),
        getCities: builder.query({
            query: () => '/cities'
        })
    })
})

export const {useGetUserQuery} = api