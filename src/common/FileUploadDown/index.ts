// import multer from 'multer'
import multer from '@koa/multer'
import fs from 'fs'
import dayjs from 'dayjs'
import * as uuid from 'uuid'
/**
 * 用户上传多张图片
 */
export const uploadImages = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      const dir = `${process.env.UPLOAD_PATH}\\${process.env.UPLOADIMAGE_DIR}`
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
      }
      cb(null, dir)
    },
    filename: function (req, file, cb) {
      cb(null, `${dayjs().format('YYYYMMDDHHmmss')}${uuid.v4()}${file.originalname}`)
    }
  }),
  fileFilter: function (req, file, cb: (error: Error | null, acceptFile: boolean) => any) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'), false)
    }
    cb(null, true)
  },
  // limits: {
  //   fileSize: 1024 * 1024 * 5 // 限制上传文件的大小为 5MB
  // }
}).array('images')
