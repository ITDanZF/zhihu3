import { Context } from 'koa'
import ImageModel from '../models/image'
import ANSService from '../service/ANS.service'

class ANSController {
  async pubAnswer (ctx: Context) {
    const { user_id, question_id, content } = ctx.pubANS
    let imageIdsArr = null
    const uploadImages = ctx.request.files as any
    if (uploadImages?.length) {
      const ImageArray = uploadImages.map((item: any) => {
        return {
          image_name: item.originalname,
          image_url: `http://${process.env.APP_HOST}:${process.env.PORT}/${process.env.UPLOADIMAGE_DIR}/${item.filename}`,
          image_path: `${process.env.UPLOAD_PATH}\\${process.env.UPLOADIMAGE_DIR}`,
          image_flag: false,
        }
      })
      imageIdsArr = await ImageModel.bulkCreate(ImageArray)
      imageIdsArr = imageIdsArr.map((item: any) => {
        return item.id
      })
    }
    await ANSService.InsertINTOANS({
      user_id, question_id, content, image_id: imageIdsArr ? JSON.stringify(imageIdsArr) : imageIdsArr
    })
    ctx.body = {
      status: 200,
      message: '上传成功',
      data: []
    }
  }
}

export default new ANSController()
