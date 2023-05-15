import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface answerAttributes {
  id: number
  user_id: number
  question_id: number
  content: string
  created_at: Date
  updated_at: Date
}

export type answerPk = 'id'
export type answerId = answer[answerPk]
export type answerOptionalAttributes = 'id' | 'created_at' | 'updated_at'
export type answerCreationAttributes = Optional<answerAttributes, answerOptionalAttributes>

export class answer extends Model {
  id!: number
  user_id!: number
  question_id!: number
  content!: string
  image_id?: string | null
  created_at!: Date
  updated_at!: Date

  static initModel (sequelize: Sequelize.Sequelize): typeof answer {
    return answer.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: '回答ID'
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '回答用户ID'
      },
      question_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: '回答所属问题ID'
      },
      image_id: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: '图片id'
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: '回答内容'
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
      tableName: 'answer',
      timestamps: true,
      indexes: [
        {
          name: 'PRIMARY',
          unique: false,
          using: 'BTREE',
          fields: [
            { name: 'id' },
          ]
        },
      ]
    })
  }
}
