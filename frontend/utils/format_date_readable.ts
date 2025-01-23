const formatDateReadable = (isoString: string): string => {
  const date = new Date(isoString);

  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    // second: "numeric",
    hour12: true,
  });
};

export default formatDateReadable;
