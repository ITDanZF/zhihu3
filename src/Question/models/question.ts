import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'

export interface questionAttributes {
  id: number
  user_id: number
  title: string
  content: string
  created_at: Date
  updated_at: Date
}

export type questionPk = 'id'
export type questionId = question[questionPk]
export type questionOptionalAttributes = 'id' | 'created_at' | 'updated_at'
export type questionCreationAttributes = Optional<questionAttributes, questionOptionalAttributes>

export default class question extends Model {
  id!: number
  user_id!: number
  title!: string
  content!: string
  created_at!: Date
  updated_at!: Date

  static initModel (sequelize: Sequelize.Sequelize): typeof question {
    return question.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        comment: '问题ID'
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: '提问用户ID'
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: true,
        comment: '问题标题'
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: '问题内容'
      }
    }, {
      sequelize,
      tableName: 'question',
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
