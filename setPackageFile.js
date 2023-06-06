/*
 * @Author       : jin.xu
 * @Date         : 2023-02-02 14:12:02
 * @LastEditors  : jin.xu
 * @LastEditTime : 2023-06-06 11:09:49
 * @Description  :
 */
const fs = require('fs');
const path = require('path');
const packageConfig = require('./package.json');

/**
 * 设置packagejson file
 */
const setPackageFile = () => {
  delete packageConfig.scripts.postinstall;
  delete packageConfig.devDependencies;
  fs.writeFileSync(
    path.resolve('./package.json'),
    JSON.stringify(packageConfig, null, 2)
  );
};

setPackageFile();
