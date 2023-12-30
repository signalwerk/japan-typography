import React from "react";
// import { PageMenu } from "../packages/signalwerk.documentation.md/src/components/helpers/PageMenu/";

// function root(data, { Helmet, processor }) {
//   if (!data) return null;
//   return (
//     <>
//       <Helmet>
//         <link rel="stylesheet" href="/style.css" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//       </Helmet>
//       <>{data.children && processor.run(data.children)}</>
//     </>
//   );
// }

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
