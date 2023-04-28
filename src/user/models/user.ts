import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface userAttributes {
  id: number
  username: string
  password: string
  mobile: string
  avatar?: string
  introduction?: string
  reputation: number
  created_at: Date
  updated_at: Date
}

export type userPk = 'id'
export type userId = user[userPk]
export type userOptionalAttributes = 'id' | 'avatar' | 'introduction' | 'reputation' | 'created_at' | 'updated_at'
export type userCreationAttributes = Optional<userAttributes, userOptionalAttributes>

export default class user extends Model {
  id!: number
  username!: string
  password!: string
  mobile!: string
  avatar?: string
  introduction?: string
  reputation!: number
  created_at!: Date
  updated_at!: Date

  static initModel (sequelize: Sequelize.Sequelize): typeof user {
    return user.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: '用户ID'
      },
      username: {
        type: DataTypes.STRING(255),
        unique: 'idx_username',
        allowNull: false,
        comment: '用户名'
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        comment: '密码'
      },
      mobile: {
        type: DataTypes.STRING(255),
        unique: 'idx_phone_number',
        allowNull: false,
        comment: '手机号'
      },
      avatar: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '头像图片URL'
      },
      introduction: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '个人简介'
      },
      reputation: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '用户声望'
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: '注册时间'
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: '最后修改时间'
      }
    }, {
      sequelize,
      tableName: 'user',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [
            { name: 'id' },
          ]
        },
      ]
    })
  }
}
