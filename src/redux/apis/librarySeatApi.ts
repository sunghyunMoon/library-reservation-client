import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LibrarySeat, LibrarySeatStatus } from '../../types/states.ts';
import { BASE_URL } from '../../config/URL.ts';

export const librarySeatApi = createApi({
    reducerPath: 'librarySeatApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    tagTypes: ['LibrarySeats'],
    endpoints: (builder) => ({
        fetchLibrarySeats: builder.query<LibrarySeat[], void>({
            query: () => 'librarySeats',
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(
                              ({ id }) =>
                                  ({ type: 'LibrarySeats', id }) as const
                          ),
                          { type: 'LibrarySeats', id: 'LIST' },
                      ]
                    : [{ type: 'LibrarySeats', id: 'LIST' }],
        }),
        fetchLibrarySeatById: builder.query<LibrarySeat, string>({
            query: (id) => `librarySeats/${id}`,
            providesTags: (result, error, id) => [{ type: 'LibrarySeats', id }],
        }),
        updateLibrarySeat: builder.mutation<
            LibrarySeat,
            { id: string; status: LibrarySeatStatus }
        >({
            query: ({ id, status }) => ({
                url: `librarySeats/${id}`,
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'LibrarySeats', id },
            ],
        }),
    }),
});

export const {
    useFetchLibrarySeatsQuery,
    useFetchLibrarySeatByIdQuery,
    useUpdateLibrarySeatMutation,
} = librarySeatApi;
