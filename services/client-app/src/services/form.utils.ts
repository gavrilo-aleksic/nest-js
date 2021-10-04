export const getFormData = <T extends Record<string, any>>(
  form: HTMLFormElement,
): T => {
  const formData = new FormData(form);
  const res = {} as T;
  //@ts-ignore
  for (let pair of formData.entries()) {
    const el = pair as string[];
    //@ts-ignore
    res[el[0]] = el[1];
  }
  return res;
};
