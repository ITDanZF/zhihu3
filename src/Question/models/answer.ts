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
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: '回答内容'
      }
    }, {
      sequelize,
      tableName: 'answer',
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
