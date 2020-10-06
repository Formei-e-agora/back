const fs = require('fs');

exports.checkTypeImage = (type) => {
  if (type === 'image/png' || type === 'image/jpg' || type === 'image/jpeg' || type === 'image/gif') return true;
  return false;
};
exports.checkFolderExists = (path) => {
  if (fs.existsSync(path)) {
    return true;
  }
  return false;
};

exports.checkFileExists = (path) => {
  if (fs.existsSync(path)) {
    return true;
  }
  return false;
};

exports.createFolderIfNotExist = (path) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
};

exports.moveFromTempToAssets = (type, fromPath, toPath, fileName) => {
  if (this.checkTypeImage(type)) {
    this.createFolderIfNotExist(toPath);
    const newPath = toPath + fileName;
    fs.rename(fromPath, newPath, (error) => {
      if (error) {
        return false;
      }
      return true;
    });
  } else {
    return false;
  }
  return true;
};

exports.isValid = (value) => value !== undefined && value != null;
