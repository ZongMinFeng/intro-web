import fs from 'fs';
import path from 'path';

const getJsonFile=function (filePath) {
    const json=fs.readFileSync(path.resolve(__dirname, filePath), 'utf-8');
    console.log(json);
    return JSON.parse(json);
};

export  default  {getJsonFile};
