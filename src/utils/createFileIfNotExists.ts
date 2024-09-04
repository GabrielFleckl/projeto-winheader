import fs from "fs";
import { Settings, Shortcut } from "../types/electron";

const createFileIfNotExists = (filePath:string, defaultContent:Settings | Shortcut[]) => {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(
        filePath,
        JSON.stringify(defaultContent, null, 2),
        "utf8",
      );
      console.log(`${filePath} criado.`);
    } else {
      console.log(`${filePath} ja existe.`);
    }
  } catch (e) {
    console.log(e);
  }
};

export default createFileIfNotExists