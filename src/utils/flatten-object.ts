export const flattenObject = (obj: object, parentKey?: string) => {
  let result = {};

  Object.entries(obj).forEach(([key, value]) => {
    const _key = parentKey ? `${parentKey} (${key})` : key;
    if (typeof value === 'object') {
      result = { ...result, ...flattenObject(value, _key) };
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      result[_key] = value;
    }
  });

  return result;
};