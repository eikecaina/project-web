export const searchOptions = (inputValue: string, options: any[]) => {
  const normalizeString = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  return options.some((option) => {
    const label = normalizeString(option.label.toLowerCase());
    const input = normalizeString(inputValue.toLowerCase());
    return label.includes(input);
  });
}
