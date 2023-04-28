import { TokenUserInfo } from '../../user/dto/user.dto'
import jwt, { sign } from 'jsonwebtoken'
import SECRET_KEY from '../constant/secret-key.constants'

export const token2UserInfo = (token: string): any => {
  if (!token) return null
  return jwt.verify(token, SECRET_KEY.CRYPTO_SECRET_KEY)
}

export const getToken = (id: string, time: string = '2h'): string => {
  return sign({
    id
  }, SECRET_KEY.CRYPTO_SECRET_KEY, {
    expiresIn: time
  })
}
