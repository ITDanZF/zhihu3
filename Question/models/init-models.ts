import type { Sequelize } from "sequelize";
import { image as _image } from "./image";
import type { imageAttributes, imageCreationAttributes } from "./image";

export {
  _image as image,
};

export type {
  imageAttributes,
  imageCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const image = _image.initModel(sequelize);


  return {
    image: image,
  };
}
