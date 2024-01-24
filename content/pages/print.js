import fs from "fs";
import path from "path";

async function mergeJsonChildren() {
  const pages = [
    "",
    "/reference-mark",
    "/brackets",
    "/markers-of-approval-disapproval",
    "/setting-aesthetic-accents",
    "/typographic-strategies-for-webpage-integrations",
    "/finals-stroke",
  ];
  const basePath = "./content/pages/"; // Update this with the actual path to your JSON files
  const outputFile = "print.json";

  // Function to get file path, replace empty string with "/index"
  function getFile(page) {
    return path.join(basePath, page ? `${page}.json` : "index.json");
  }

  try {
    // Read and parse the first JSON file
    let firstFilePath = getFile(pages[0]);
    let mainJson = JSON.parse(fs.readFileSync(firstFilePath, "utf8"));
    mainJson.path = "/print/"; // Set the "path" key to "/print"

    // Merge children from the other JSON files
    for (let i = 1; i < pages.length; i++) {
      let filePath = getFile(pages[i]);
      let currentJson = JSON.parse(fs.readFileSync(filePath, "utf8"));

      if (currentJson.children && Array.isArray(currentJson.children)) {
        mainJson.children = mainJson.children.concat(currentJson.children);
      } else {
        console.warn(
          `Warning: Skipping file ${filePath} as it does not contain a valid 'children' array.`
        );
      }
    }

    // Write the merged JSON to a new file
    fs.writeFileSync(
      path.join(basePath, outputFile),
      JSON.stringify(mainJson, null, 2)
    );
    console.log(`Merged JSON saved to ${outputFile}`);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

mergeJsonChildren();
