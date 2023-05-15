import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface imageAttributes {
  id: number
  image_name?: string
  image_url?: string
  image_path?: string
  image_flag?: string
  image_description?: string
  created_at: Date
  updated_at: Date
}

export type imagePk = 'id'
export type imageId = image[imagePk]
export type imageOptionalAttributes = 'id' | 'image_name' | 'image_url' | 'image_path' | 'image_flag' | 'image_description' | 'created_at' | 'updated_at'
export type imageCreationAttributes = Optional<imageAttributes, imageOptionalAttributes>

export default class image extends Model {
  id!: number
  image_name?: string
  image_url?: string
  image_path?: string
  image_flag?: string
  image_description?: string
  created_at!: Date
  updated_at!: Date

  static initModel (sequelize: Sequelize.Sequelize): typeof image {
    return image.init({
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true
      },
      image_name: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      image_url: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      image_path: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      image_flag: {
        type: DataTypes.BOOLEAN,
        allowNull: true
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
      tableName: 'image',
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
