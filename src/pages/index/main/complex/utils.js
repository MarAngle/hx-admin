
import api from '@api/index'

export function mutipleFileUpload(fileList) {
  return new Promise((resolve) => {
    let resList = []
    function next(fileList, index) {
      if (index < fileList.length) {
        fileUpload(fileList[index]).then(res => {
          resList.push(res)
          next(fileList, index + 1)
        }, err => {
          next(fileList, index + 1)
        })
      } else {
        resolve(resList)
      }
    }
    next(fileList, 0)
  })
}

export function fileUpload(file) {
  return new Promise((resolve, reject) => {
    api.itemImgUpload({
      status: 'pictureUpload',
      file: file
    }).then(res => {
      resolve({
        data: res.data.data.path,
        url: res.data.data.path,
        name: file.name
      })
    }, err => {
      reject(err)
    })
  })
}