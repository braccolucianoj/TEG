import { DataTypes, Model, Optional } from 'sequelize';
import * as Sequelize from 'sequelize';
import type { AppUser, AppUserId } from './AppUser.model';
import type { Game, GameId } from './Game.model';
import type { GameCountry, GameCountryId } from './GameCountry.model';

export interface CountryGameOccupationAttributes {
  userId: number;
  gameId: number;
  countryId: number;
  occupation: number[];
}

export type CountryGameOccupationPk = "gameId" | "countryId";
export type CountryGameOccupationId = CountryGameOccupation[CountryGameOccupationPk];
export type CountryGameOccupationCreationAttributes = Optional<CountryGameOccupationAttributes, CountryGameOccupationPk>;

export class CountryGameOccupation extends Model<CountryGameOccupationAttributes, CountryGameOccupationCreationAttributes> implements CountryGameOccupationAttributes {
  userId!: number;
  gameId!: number;
  countryId!: number;
  occupation!: number[];

  // CountryGameOccupation belongsTo GameCountry
  GameCountry!: GameCountry;
  getGameCountry!: Sequelize.BelongsToGetAssociationMixin<GameCountry>;
  setGameCountry!: Sequelize.BelongsToSetAssociationMixin<GameCountry, GameCountryId>;
  createGameCountry!: Sequelize.BelongsToCreateAssociationMixin<GameCountry>;
  // CountryGameOccupation belongsTo Game
  Game!: Game;
  getGame!: Sequelize.BelongsToGetAssociationMixin<Game>;
  setGame!: Sequelize.BelongsToSetAssociationMixin<Game, GameId>;
  createGame!: Sequelize.BelongsToCreateAssociationMixin<Game>;
  // CountryGameOccupation belongsTo AppUser
  AppUser!: AppUser;
  getAppUser!: Sequelize.BelongsToGetAssociationMixin<AppUser>;
  setAppUser!: Sequelize.BelongsToSetAssociationMixin<AppUser, AppUserId>;
  createAppUser!: Sequelize.BelongsToCreateAssociationMixin<AppUser>;

  static initModel(sequelize: Sequelize.Sequelize): typeof CountryGameOccupation {
    CountryGameOccupation.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'app_user',
        key: 'id'
      },
      field: 'user_id'
    },
    gameId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'game',
        key: 'id'
      },
      field: 'game_id'
    },
    countryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'game_country',
        key: 'id'
      },
      field: 'country_id'
    },
    occupation: {
      type: DataTypes.ARRAY(DataTypes.SMALLINT),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'country_game_occupation',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "user_game_pk",
        unique: true,
        fields: [
          { name: "country_id" },
          { name: "game_id" },
        ]
      },
    ]
  });
  return CountryGameOccupation;
  }
}
