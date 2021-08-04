import { DataTypes, Model, Optional } from 'sequelize';
import * as Sequelize from 'sequelize';
import type { Continent, ContinentId } from './Continent.model';
import type { CountryGameOccupation, CountryGameOccupationId } from './CountryGameOccupation.model';
import type { Game, GameId } from './Game.model';

export interface GameCountryAttributes {
  id: number;
  name: string;
  alpha2: string;
  countryType: string;
  continentId: number;
}

export type GameCountryPk = "id";
export type GameCountryId = GameCountry[GameCountryPk];
export type GameCountryCreationAttributes = Optional<GameCountryAttributes, GameCountryPk>;

export class GameCountry extends Model<GameCountryAttributes, GameCountryCreationAttributes> implements GameCountryAttributes {
  id!: number;
  name!: string;
  alpha2!: string;
  countryType!: string;
  continentId!: number;

  // GameCountry hasMany CountryGameOccupation
  CountryGameOccupations!: CountryGameOccupation[];
  getCountryGameOccupations!: Sequelize.HasManyGetAssociationsMixin<CountryGameOccupation>;
  setCountryGameOccupations!: Sequelize.HasManySetAssociationsMixin<CountryGameOccupation, CountryGameOccupationId>;
  addCountryGameOccupation!: Sequelize.HasManyAddAssociationMixin<CountryGameOccupation, CountryGameOccupationId>;
  addCountryGameOccupations!: Sequelize.HasManyAddAssociationsMixin<CountryGameOccupation, CountryGameOccupationId>;
  createCountryGameOccupation!: Sequelize.HasManyCreateAssociationMixin<CountryGameOccupation>;
  removeCountryGameOccupation!: Sequelize.HasManyRemoveAssociationMixin<CountryGameOccupation, CountryGameOccupationId>;
  removeCountryGameOccupations!: Sequelize.HasManyRemoveAssociationsMixin<CountryGameOccupation, CountryGameOccupationId>;
  hasCountryGameOccupation!: Sequelize.HasManyHasAssociationMixin<CountryGameOccupation, CountryGameOccupationId>;
  hasCountryGameOccupations!: Sequelize.HasManyHasAssociationsMixin<CountryGameOccupation, CountryGameOccupationId>;
  countCountryGameOccupations!: Sequelize.HasManyCountAssociationsMixin;
  // GameCountry belongsToMany Game
  Games!: Game[];
  getGames!: Sequelize.BelongsToManyGetAssociationsMixin<Game>;
  setGames!: Sequelize.BelongsToManySetAssociationsMixin<Game, GameId>;
  addGame!: Sequelize.BelongsToManyAddAssociationMixin<Game, GameId>;
  addGames!: Sequelize.BelongsToManyAddAssociationsMixin<Game, GameId>;
  createGame!: Sequelize.BelongsToManyCreateAssociationMixin<Game>;
  removeGame!: Sequelize.BelongsToManyRemoveAssociationMixin<Game, GameId>;
  removeGames!: Sequelize.BelongsToManyRemoveAssociationsMixin<Game, GameId>;
  hasGame!: Sequelize.BelongsToManyHasAssociationMixin<Game, GameId>;
  hasGames!: Sequelize.BelongsToManyHasAssociationsMixin<Game, GameId>;
  countGames!: Sequelize.BelongsToManyCountAssociationsMixin;
  // GameCountry belongsTo Continent
  Continent!: Continent;
  getContinent!: Sequelize.BelongsToGetAssociationMixin<Continent>;
  setContinent!: Sequelize.BelongsToSetAssociationMixin<Continent, ContinentId>;
  createContinent!: Sequelize.BelongsToCreateAssociationMixin<Continent>;

  static initModel(sequelize: Sequelize.Sequelize): typeof GameCountry {
    GameCountry.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "game_country_name_key"
    },
    alpha2: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "game_country_alpha2_key"
    },
    countryType: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'country_type'
    },
    continentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'continent',
        key: 'id'
      },
      field: 'continent_id'
    }
  }, {
    sequelize,
    tableName: 'game_country',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "game_country_alpha2_key",
        unique: true,
        fields: [
          { name: "alpha2" },
        ]
      },
      {
        name: "game_country_name_key",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "game_country_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return GameCountry;
  }
}
