const capitalized = function (string: string): string {
  const otherChars = string.split("").slice(1);
  const capitalChar = string[0].toLocaleUpperCase();
  return [capitalChar, ...otherChars].join("");
};

export default capitalized;
