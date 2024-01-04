import { axiosClient } from './apiClient';

type ChangePersonalDataPayload = {
  firstName: string;
  lastName: string;
};

export const changePersonalDataRequest = async (
  payload: ChangePersonalDataPayload,
) => {
  const { data } = await axiosClient.put('/users/me', {
    firstName: payload.firstName,
    lastName: payload.lastName,
  });

  return data;
};
