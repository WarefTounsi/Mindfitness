export const isFound = (array, id) => {
    let isFound = false;
    array.forEach((item) => (item.id.toString() === id.toString() ? (isFound = true) : null));
    return isFound;
  };
  