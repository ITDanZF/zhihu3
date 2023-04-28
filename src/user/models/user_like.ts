import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export default interface user_likeAttributes {
  id: number
  user_id: number
  answer_id: number
  created_at: Date
  updated_at: Date
}

export type user_likePk = 'id'
export type user_likeId = user_like[user_likePk]
export type user_likeOptionalAttributes = 'id' | 'created_at' | 'updated_at'
export type user_likeCreationAttributes = Optional<user_likeAttributes, user_likeOptionalAttributes>

export class user_like extends Model {
  id!: number
  user_id!: number
  answer_id!: number
  created_at!: Date
  updated_at!: Date

  static initModel (sequelize: Sequelize.Sequelize): typeof user_like {
    return user_like.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: '用户点赞ID'
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '点赞用户ID'
      },
      answer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '被点赞回答ID'
      }
    }, {
      sequelize,
      tableName: 'user_like',
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
