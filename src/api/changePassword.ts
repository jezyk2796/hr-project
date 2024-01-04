import { axiosClient } from './apiClient';

type ChangePasswordPayload = {
  oldPassword: string;
  retypedPassword: string;
};

export const changePasswordRequest = async (payload: ChangePasswordPayload) => {
  const { data } = await axiosClient.post('/auth/change-password', {
    oldPassword: payload.oldPassword,
    newPassword: payload.retypedPassword,
  });

  return data;
};
