export const formatTitle = (title: string | undefined) => {
  return (
    title?.split("").reduce((acc: string = "", c) => {
      if (acc === "") {
        return c;
      }
      if (c.toLowerCase() === c) {
        return acc + c;
      }
      return acc + " " + c;
    }) || ""
  );
};
