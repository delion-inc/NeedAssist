export type RegisterActions = 
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_SURNAME'; payload: string }
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_PHONE'; payload: string }
  | { type: 'SET_PASSWORD'; payload: string }
  | { type: 'SET_MATCH_PASSWORD'; payload: string }
  | { type: 'SET_ERR_MSG'; payload: string }
  | { type: 'SET_SUCCESS'; payload: boolean }
  | { type: 'SET_NAME_FOCUS'; payload: boolean }
  | { type: 'SET_SURNAME_FOCUS'; payload: boolean }
  | { type: 'SET_PASSWORD_FOCUS'; payload: boolean }
  | { type: 'SET_EMAIL_FOCUS'; payload: boolean }
  | { type: 'SET_PHONE_FOCUS'; payload: boolean }
  | { type: 'SET_MATCH_FOCUS'; payload: boolean };