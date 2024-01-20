const processor = {
  types: {
    image: (item) => {
      return {
        ...item,
        path: item?.path?.replace("width:130", "width:1500"),
      };
    },
  },
};
export default processor;
