const fs = require("fs");
const path = require("path");
const capitalize = require("lodash.capitalize");
const findLastIndex = require("lodash.findlastindex");
const { getSrcPathFormConfigFile } = require("../common/configFile");
const { linter } = require("../common/linter");

class BaseEntityManager {
  static directory = getSrcPathFormConfigFile();

  static init(name) {
    return path.join(this.directory, `${capitalize(name)}.entity.ts`);
  }

  static create(name) {}

  static update(name, content) {
    const file = path.join(this.directory, `${capitalize(name)}.entity.ts`);
    fs.writeFileSync(file, linter(content));
  }

  static append(nameOrContent, newContent, endTag) {
    const regex = new RegExp(endTag);

    let content = nameOrContent;
    let file = null;
    if (!Array.isArray(nameOrContent)) {
      file = path.join(
        this.directory,
        `${capitalize(nameOrContent)}.entity.ts`
      );
      content = fs.readFileSync(file).toString().split("\n");
    }

    const lastIndex = findLastIndex(content, (line) => regex.test(line));
    content.splice(lastIndex, 0, newContent);
    if (file) fs.writeFileSync(file, linter(content));
    else return content;
  }
}

module.exports = BaseEntityManager;
