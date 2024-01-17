import React from "react";
// import { PageMenu } from "../packages/signalwerk.documentation.md/src/components/helpers/PageMenu/";

function typoExample(node, configuration) {
  if (!node) return null;

  // Construct the className string
  const baseClass = "nodebox";
  const nodeClass = node.class ? ` ${node.class}` : "";
  const presetClass = ` nodebox--${node.preset || "default"}`;

  // Combine all class names
  const className = baseClass + nodeClass + presetClass;

  return (
    <>
      {/* <pre>{JSON.stringify({ grid: node }, null, 2)}</pre> */}
      <div className={className}>
        <div className="box__header">
          <div className="box__title">{node.title}</div>
        </div>
        <div className="box__inner">
          <div className="box__content">
            <>{node.children && configuration.processor.run(node.children)}</>
          </div>
        </div>
      </div>
    </>
  );
}

// function page(node, { Helmet, processor }) {
//   if (!node) return null;

//   return (
//     <>
//       <Helmet>
//         <title>{node.title}</title>
//         <meta name="description" content={node.description} />
//       </Helmet>

//       <div className="header">
//         <PageMenu page={node} name="main" />
//       </div>

//       <div className="content">
//         <div className={`node-page ${node.class || ""}`}>
//           <>{node.children && processor.run(node.children)}</>
//         </div>
//       </div>
//     </>
//   );
// }

const config = {
  data: {
    image: (item) => ({
      path: item.path.replace("width:130", "width:1500"),
      ...item,
    }),
  },
  types: {
    box: typoExample,
  },
  // types: {
  //   ":root": root,
  //   page: page,
  // },
  // // for the admin interface
  // admin: {
  //   // for init the admin interface
  //   init: ({ CMS }) => {
  //     CMS.registerPreviewStyle(url);
  //   },
  // },
};
export default config;
