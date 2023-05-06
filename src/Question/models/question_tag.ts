import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface question_tagAttributes {
  id: number
  question_id: number
  tag_id: number
  created_at: Date
  updated_at: Date
}

export type question_tagPk = 'id'
export type question_tagId = question_tag[question_tagPk]
export type question_tagOptionalAttributes = 'id' | 'created_at' | 'updated_at'
export type question_tagCreationAttributes = Optional<question_tagAttributes, question_tagOptionalAttributes>

export default class question_tag extends Model {
  id!: number
  question_id!: number
  tag_id!: number
  created_at!: Date
  updated_at!: Date

  static initModel (sequelize: Sequelize.Sequelize): typeof question_tag {
    return question_tag.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: '问题标签ID'
      },
      question_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '问题ID'
      },
      tag_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '标签ID'
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
      tableName: 'question_tag',
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
