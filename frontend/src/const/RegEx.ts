export const USER_REGEX: RegExp = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
export const PWD_REGEX: RegExp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;