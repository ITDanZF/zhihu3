import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface user_followAttributes {
  id: number
  user_id: number
  follow_id: number
  created_at: Date
  updated_at: Date
}

export type user_followPk = 'id'
export type user_followId = user_follow[user_followPk]
export type user_followOptionalAttributes = 'id' | 'created_at' | 'updated_at'
export type user_followCreationAttributes = Optional<user_followAttributes, user_followOptionalAttributes>

export default class user_follow extends Model {
  id!: number
  user_id!: number
  follow_id!: number
  created_at!: Date
  updated_at!: Date

  static initModel (sequelize: Sequelize.Sequelize): typeof user_follow {
    return user_follow.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: '用户关注ID'
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '关注用户ID'
      },
      follow_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '被关注用户ID'
      }
    }, {
      sequelize,
      tableName: 'user_follow',
      timestamps: true,
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
