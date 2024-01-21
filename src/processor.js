const processor = {
  types: {
    image: (item) => {
      let path = item.path || "";
      path = path.replace("resize@width:130;", "resize@width:1500;");
      path = path.replace("resize@width:250;", "resize@width:1500;");
      if (item.crop) {
        path = path.replace("/resize@", `/${item.crop}resize@`);
      }

      return {
        ...item,
        path,
      };
    },
  },
};
export default processor;
