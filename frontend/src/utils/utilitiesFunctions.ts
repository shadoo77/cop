// Check if some variable, array or object is empty
export const isEmpty = (value: any): boolean => value === undefined
  || value === null
  || (typeof value === 'object' && Object.keys(value).length === 0)
  || (typeof value === 'string' && value.trim().length === 0);
