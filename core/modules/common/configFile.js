import { rootDir, defaultDirectory } from "./common";
import fs from "fs";
import path from "path";
import { config } from "process";

const configFile = path.join(rootDir, "entity-cli.json");

const configFileExists = () => {
  return fs.existsSync(configFile);
};

export const getConfigFile = () => {
  if (configFileExists())
    return JSON.parse(fs.readFileSync(configFile).toString());
  return null;
};

export const getSrcPathFormConfigFile = () => {
  const config = getConfigFile();
  if (config && config.src) return path.join(rootDir, config.src);
  return defaultDirectory;
};

export const getDirectoryFromConfigFile = () => {
  const config = getConfigFile();
  if (config && config.src) return path.join(rootDir, config.src);
  return defaultDirectory;
};

export const entityExistsFromConfigFile = (name) => {
  const dest = path.join(getDirectoryFromConfigFile(), `${name}.entity.ts`);
  if (fs.existsSync(dest)) return true;
  return false;
};

const getOrm = () => {
  const config = getConfigFile();
  let orm = "typeorm";

  if (config && config.orm) {
    switch (config.orm) {
      case "sequelize":
      case "mongoose":
        orm = config.orm;
    }
  }

  return orm;
};

export const getFileExtension = () => {
  const config = getConfigFile();
  if (getOrm() != "typeorm" && config && config.lang && config.lang == "js")
    return "js";
  return "ts";
};
