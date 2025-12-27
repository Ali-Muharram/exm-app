export type ProfilrResponse = {
  user: {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
    password?: string;
    isVerified: boolean;
    createdAt: string;
  };
};

export type ChangePaswword = {
  token: string;
  user: string;
};
