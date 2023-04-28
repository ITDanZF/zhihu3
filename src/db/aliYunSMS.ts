import Dysmsapi20170525, * as $Dysmsapi20170525 from '@alicloud/dysmsapi20170525'
import * as $OpenApi from '@alicloud/openapi-client'
import Util, * as $Util from '@alicloud/tea-util'
import { ApiException } from '../common/exception/api.exception'
import HttpStatusCode from '../common/constant/http-code.constants'

class Client {
  /**
   * 使用AK&SK初始化账号Client
   * @param accessKeyId
   * @param accessKeySecret
   * @return Client
   * @throws Exception
   */
  async createClient (accessKeyId: string, accessKeySecret: string): Promise<Dysmsapi20170525> {
    const config = new $OpenApi.Config({
      accessKeyId,
      accessKeySecret,
    })
    // 访问的域名
    config.endpoint = 'dysmsapi.aliyuncs.com'
    return new Dysmsapi20170525(config)
  }

  async getSMSCodeFromAliYun (code: string, phone: string) {
    const client = await this.createClient(process.env.ACCESSKEYID ?? '', process.env.ACCESSKEYSECRET ?? '')
    const sendSmsRequest = new $Dysmsapi20170525.SendSmsRequest({
      signName: process.env.SIGN_NAME,
      templateCode: process.env.TEMPLATECODE,
      templateParam: `{"code":"${code}"}`,
      phoneNumbers: phone,
    })
    const runtime = new $Util.RuntimeOptions({ })
    try {
      // 复制代码运行请自行打印 API 的返回值
      return await client.sendSmsWithOptions(sendSmsRequest, runtime)
    } catch (error: any) {
      // 如有需要，请打印 error
      Util.assertAsString(error.message)
      throw new ApiException(HttpStatusCode.BAD_REQUEST, error.message)
    }
  }
}

export default new Client()
