import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.config";

class Author extends Model {
  id!: string;
  fullName!: string;
  email!: string;
  password!: string;
  confirmPassword!: string;
}

Author.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    confirmPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        passwordsMatch(this: any, value: string) {
          if (this.password !== value) {
            throw new Error("Passwords do not match");
          }
        },
      },
    },
  },
  {
    sequelize,
    modelName: "Author",
    timestamps: true,
    underscored: true,
  }
);

export default Author;