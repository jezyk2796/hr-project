export const updateDirtyFields = <T extends Record<string, string>>(
  original: T,
  edited: T,
): Partial<T> => {
  const dirtyFields: Partial<T> = {};

  Object.keys(edited).forEach((field) => {
    const key = field as keyof T;
    if (original[key] !== edited[key]) {
      dirtyFields[key] = edited[key];
    }
  });

  return dirtyFields;
};
