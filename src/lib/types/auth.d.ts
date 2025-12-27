/* ----------------------------- RegsterRespone ----------------------------- */
export type RegsterRespone = {
  token: string;
  user: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
    isVerified: boolean;
    _id: string;
    createdAt: string;
  };
};
/* ------------------------------ LoginRespone ------------------------------ */
export type LoginRespone = RegsterRespone;

/* ----------------------------- Forgot Password Respone ----------------------------- */
export type ForgotPasswordRespone = {
  info: string;
};
/* -------------------------- verify Reset Code -------------------------- */
export type VerifyResetCodeRespone = {
  status: string;
};

/* ------------------------------ Reset Password ----------------------------- */
export type ResetPasswordRespone = {
  token: string;
};
