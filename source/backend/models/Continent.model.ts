import { DataTypes, Model, Optional } from 'sequelize';
import * as Sequelize from 'sequelize';
import type { GameCountry, GameCountryId } from './GameCountry.model';

export interface ContinentAttributes {
  id: number;
  name: string;
}

export type ContinentPk = "id";
export type ContinentId = Continent[ContinentPk];
export type ContinentCreationAttributes = Optional<ContinentAttributes, ContinentPk>;

export class Continent extends Model<ContinentAttributes, ContinentCreationAttributes> implements ContinentAttributes {
  id!: number;
  name!: string;

  // Continent hasMany GameCountry
  GameCountries!: GameCountry[];
  getGameCountries!: Sequelize.HasManyGetAssociationsMixin<GameCountry>;
  setGameCountries!: Sequelize.HasManySetAssociationsMixin<GameCountry, GameCountryId>;
  addGameCountry!: Sequelize.HasManyAddAssociationMixin<GameCountry, GameCountryId>;
  addGameCountries!: Sequelize.HasManyAddAssociationsMixin<GameCountry, GameCountryId>;
  createGameCountry!: Sequelize.HasManyCreateAssociationMixin<GameCountry>;
  removeGameCountry!: Sequelize.HasManyRemoveAssociationMixin<GameCountry, GameCountryId>;
  removeGameCountries!: Sequelize.HasManyRemoveAssociationsMixin<GameCountry, GameCountryId>;
  hasGameCountry!: Sequelize.HasManyHasAssociationMixin<GameCountry, GameCountryId>;
  hasGameCountries!: Sequelize.HasManyHasAssociationsMixin<GameCountry, GameCountryId>;
  countGameCountries!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Continent {
    Continent.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "continent_name_key"
    }
  }, {
    sequelize,
    tableName: 'continent',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "continent_name_key",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "continent_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return Continent;
  }
}
