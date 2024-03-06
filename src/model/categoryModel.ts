import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.config";

class Category extends Model {
  public id!: number;
  public description!: string;
  public genre!: string[];
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    genre: {
      type: DataTypes.ENUM('fiction', 'non-fiction', 'romance', 'thriller', 'fantasy'),
      allowNull: false,
      validate: {
        isIn: [['fiction', 'non-fiction', 'romance', 'thriller', 'fantasy']],
      },
    },
  },
  {
    sequelize,
    modelName: "Category",
    timestamps: true,
    underscored: true,
  }
);

export default Category;
