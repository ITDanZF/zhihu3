import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface imageAttributes {
  id: number;
  image_name?: string;
  image_url?: string;
  image_path?: string;
  image_flag?: string;
  image_description?: string;
}

export type imagePk = "id";
export type imageId = image[imagePk];
export type imageOptionalAttributes = "id" | "image_name" | "image_url" | "image_path" | "image_flag" | "image_description";
export type imageCreationAttributes = Optional<imageAttributes, imageOptionalAttributes>;

export class image extends Model<imageAttributes, imageCreationAttributes> implements imageAttributes {
  id!: number;
  image_name?: string;
  image_url?: string;
  image_path?: string;
  image_flag?: string;
  image_description?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof image {
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
      type: DataTypes.STRING(100),
      allowNull: true
    },
    image_path: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    image_flag: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    image_description: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'image',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
