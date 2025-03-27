export const stopPropagation = (
  e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>
) => {
  e.stopPropagation();
  e.preventDefault();
};
