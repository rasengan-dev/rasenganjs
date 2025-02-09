import fs from "node:fs";
import path from "node:path";
import { execa } from "execa";

const buildDir = "./lib";

function copyExtraFiles() {
  fs.readdir(buildDir, function (err, dirs) {
    if (err) {
      throw err;
    }
    dirs.forEach(function (dir) {
      if (dir === "esm" || dir === "cjs") {
        const targetDir = path.join(
          buildDir,
          dir
        );
        execa(
          "cp",
          [
            `./src/server/functions/netlify/netlify.toml`,
            `${targetDir}/server/functions/netlify`,
          ],
          {
            stdio: "inherit",
          }
        );

         execa(
						"cp",
						[
							`./src/server/functions/vercel/vercel.json`,
							`${targetDir}/server/functions/vercel`,
						],
						{
							stdio: "inherit",
						}
					);
      }
    });
  });
}

copyExtraFiles();
