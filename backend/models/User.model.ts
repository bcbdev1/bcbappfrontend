import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import bcrypt from 'bcryptjs';

class User extends Model {
  public id!: number;
  public fullName!: string;  // Added fullName field
  public email!: string;
  public password!: string;
  public isEmailVerified!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public comparePassword(candidatePassword: string): Promise<boolean> {
    
    return bcrypt.compare(candidatePassword,this.password);
  }
}

User.init(
  {
    fullName: {  // Added fullName field
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Full name cannot be empty'
        },
        len: {
          args: [1, 100],
          msg: 'Full name must be between 1 and 100 characters'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { 
        isEmail: {
          msg: 'Please provide a valid email address'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 100],
          msg: 'Password must be at least 6 characters long'
        }
      }
    },
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    sequelize,
    modelName: 'User'
  }
);

export default User;