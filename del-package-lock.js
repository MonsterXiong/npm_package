const fs = require('fs');
const path = require('path');

const readFileList = function (directory, filelist) {
  const fileList = filelist || []
  const files = fs.readdirSync(directory)
  if (files.length > 0) {
    files.forEach((filename) => {
      const filePath = path.resolve(directory, filename)
      if ( fs.statSync(filePath).isDirectory() && filename !=="node_modules") {
        readFileList(filePath, fileList)
      } else {
        fileList.push({
          filename,
          filePath
        })
      }

    })
  }
  return fileList
}


function exec() {
  const fileList = readFileList(path.resolve(__dirname)).filter(item=>item.filename==="package-lock.json")
  console.log(fileList.length);
  if(fileList.length > 0) {
    fileList.forEach(({filePath}) =>{
      fs.rmSync(filePath)
    })
    console.log('删除完毕，共删除'+fileList.length+'条数据');
  }else{
    console.log('暂无可删除的文件');
  }

}

exec()