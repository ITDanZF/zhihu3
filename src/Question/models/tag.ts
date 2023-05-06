import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface tagAttributes {
  id: number
  name: string
  description?: string
  created_at: Date
  updated_at: Date
}

export type tagPk = 'id'
export type tagId = tag[tagPk]
export type tagOptionalAttributes = 'id' | 'description' | 'created_at' | 'updated_at'
export type tagCreationAttributes = Optional<tagAttributes, tagOptionalAttributes>

export default class tag extends Model {
  id!: number
  name!: string
  description?: string
  created_at!: Date
  updated_at!: Date

  static initModel (sequelize: Sequelize.Sequelize): typeof tag {
    return tag.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: '标签ID'
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: 'tag_name_IDX',
        comment: '标签名称'
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '标签描述'
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
      tableName: 'tag',
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
