import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import * as SecureStore from 'expo-secure-store';
import { ACCESS_TOKEN_KEY } from '@/constants/StorageKeys';

export interface Rating {
  rating: number;
  rater: number;
  is_consultant: boolean;
}

export interface Patient {
  mrn: string;
  ratings: Rating[];
}

export const patientsApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://backend.ashybay-faf6a614.uksouth.azurecontainerapps.io/",
    prepareHeaders: async (headers) => {
      const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Patients"],
  endpoints: (builder) => ({
    // GET all patients
    getPatients: builder.query<Patient[], void>({
      query: () => "/patient",
      providesTags: ["Patients"],
    }),

    // GET a single patient by MRN
    getPatient: builder.query<Patient, string>({
      query: (mrn: string) => `/patient/${mrn}`,
      providesTags: (result, error, mrn) => [{ type: "Patients", id: mrn }],
    }),

    // CREATE a new patient
    createPatient: builder.mutation<Patient, Patient>({
      query: (newPatient) => ({
        url: "/patient",
        method: "POST",
        body: newPatient,
      }),
      async onQueryStarted(newPatient, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            patientsApi.util.updateQueryData("getPatients", undefined, (draft) => {
              draft.push(data);
            })
          );
        } catch (error) {
          // Handle error
        }
      },
      invalidatesTags: ["Patients"],
    }),

    // UPDATE an existing patient
    updatePatient: builder.mutation<Patient, { mrn: string; data: Partial<Patient> }>({
      query: ({ mrn, data }) => ({
        url: `/patient/${mrn}`,
        method: "PUT",
        body: data,
      }),
      async onQueryStarted({ mrn }, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedPatient } = await queryFulfilled;
          dispatch(
            patientsApi.util.updateQueryData("getPatients", undefined, (draft) => {
              const patient = draft.find((p) => p.mrn === mrn);
              if (patient) Object.assign(patient, updatedPatient);
            })
          );
        } catch (error) {
          // Handle error
        }
      },
      invalidatesTags: (result, error, { mrn }) => [{ type: "Patients", id: mrn }],
    }),

    // DELETE a patient (optimistic)
    deletePatient: builder.mutation<{ success: boolean }, string>({
      query: (mrn: string) => ({
        url: `/patient/${mrn}`,
        method: "DELETE",
      }),
      async onQueryStarted(mrn, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          patientsApi.util.updateQueryData("getPatients", undefined, (draft) => {
            const index = draft.findIndex((p) => p.mrn === mrn);
            if (index !== -1) draft.splice(index, 1);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      invalidatesTags: ["Patients"],
    }),
  }),
});

// Hooks for use in components
export const {
  useGetPatientsQuery,
  useGetPatientQuery,
  useCreatePatientMutation,
  useUpdatePatientMutation,
  useDeletePatientMutation,
} = patientsApi;

export default patientsApi;