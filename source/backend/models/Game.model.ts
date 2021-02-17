import { DataTypes, Model, Optional } from 'sequelize';
import * as Sequelize from 'sequelize';
import type { CountryGameOccupation, CountryGameOccupationId } from './CountryGameOccupation.model';
import type { GameCountry, GameCountryId } from './GameCountry.model';
import type { GameEvent, GameEventId } from './GameEvent.model';
import type { GameRound, GameRoundId } from './GameRound.model';
import type { PlayerGame, PlayerGameId } from './PlayerGame.model';

export interface GameAttributes {
  id: number;
  createdAt: Date;
  status: string;
}

export type GamePk = "id";
export type GameId = Game[GamePk];
export type GameCreationAttributes = Optional<GameAttributes, GamePk>;

export class Game extends Model<GameAttributes, GameCreationAttributes> implements GameAttributes {
  id!: number;
  createdAt!: Date;
  status!: string;

  // Game hasMany CountryGameOccupation
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
  // Game belongsToMany GameCountry
  GameCountries!: GameCountry[];
  getGameCountries!: Sequelize.BelongsToManyGetAssociationsMixin<GameCountry>;
  setGameCountries!: Sequelize.BelongsToManySetAssociationsMixin<GameCountry, GameCountryId>;
  addGameCountry!: Sequelize.BelongsToManyAddAssociationMixin<GameCountry, GameCountryId>;
  addGameCountries!: Sequelize.BelongsToManyAddAssociationsMixin<GameCountry, GameCountryId>;
  createGameCountry!: Sequelize.BelongsToManyCreateAssociationMixin<GameCountry>;
  removeGameCountry!: Sequelize.BelongsToManyRemoveAssociationMixin<GameCountry, GameCountryId>;
  removeGameCountries!: Sequelize.BelongsToManyRemoveAssociationsMixin<GameCountry, GameCountryId>;
  hasGameCountry!: Sequelize.BelongsToManyHasAssociationMixin<GameCountry, GameCountryId>;
  hasGameCountries!: Sequelize.BelongsToManyHasAssociationsMixin<GameCountry, GameCountryId>;
  countGameCountries!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Game hasMany GameEvent
  GameEvents!: GameEvent[];
  getGameEvents!: Sequelize.HasManyGetAssociationsMixin<GameEvent>;
  setGameEvents!: Sequelize.HasManySetAssociationsMixin<GameEvent, GameEventId>;
  addGameEvent!: Sequelize.HasManyAddAssociationMixin<GameEvent, GameEventId>;
  addGameEvents!: Sequelize.HasManyAddAssociationsMixin<GameEvent, GameEventId>;
  createGameEvent!: Sequelize.HasManyCreateAssociationMixin<GameEvent>;
  removeGameEvent!: Sequelize.HasManyRemoveAssociationMixin<GameEvent, GameEventId>;
  removeGameEvents!: Sequelize.HasManyRemoveAssociationsMixin<GameEvent, GameEventId>;
  hasGameEvent!: Sequelize.HasManyHasAssociationMixin<GameEvent, GameEventId>;
  hasGameEvents!: Sequelize.HasManyHasAssociationsMixin<GameEvent, GameEventId>;
  countGameEvents!: Sequelize.HasManyCountAssociationsMixin;
  // Game hasMany GameRound
  GameRounds!: GameRound[];
  getGameRounds!: Sequelize.HasManyGetAssociationsMixin<GameRound>;
  setGameRounds!: Sequelize.HasManySetAssociationsMixin<GameRound, GameRoundId>;
  addGameRound!: Sequelize.HasManyAddAssociationMixin<GameRound, GameRoundId>;
  addGameRounds!: Sequelize.HasManyAddAssociationsMixin<GameRound, GameRoundId>;
  createGameRound!: Sequelize.HasManyCreateAssociationMixin<GameRound>;
  removeGameRound!: Sequelize.HasManyRemoveAssociationMixin<GameRound, GameRoundId>;
  removeGameRounds!: Sequelize.HasManyRemoveAssociationsMixin<GameRound, GameRoundId>;
  hasGameRound!: Sequelize.HasManyHasAssociationMixin<GameRound, GameRoundId>;
  hasGameRounds!: Sequelize.HasManyHasAssociationsMixin<GameRound, GameRoundId>;
  countGameRounds!: Sequelize.HasManyCountAssociationsMixin;
  // Game hasMany PlayerGame
  PlayerGames!: PlayerGame[];
  getPlayerGames!: Sequelize.HasManyGetAssociationsMixin<PlayerGame>;
  setPlayerGames!: Sequelize.HasManySetAssociationsMixin<PlayerGame, PlayerGameId>;
  addPlayerGame!: Sequelize.HasManyAddAssociationMixin<PlayerGame, PlayerGameId>;
  addPlayerGames!: Sequelize.HasManyAddAssociationsMixin<PlayerGame, PlayerGameId>;
  createPlayerGame!: Sequelize.HasManyCreateAssociationMixin<PlayerGame>;
  removePlayerGame!: Sequelize.HasManyRemoveAssociationMixin<PlayerGame, PlayerGameId>;
  removePlayerGames!: Sequelize.HasManyRemoveAssociationsMixin<PlayerGame, PlayerGameId>;
  hasPlayerGame!: Sequelize.HasManyHasAssociationMixin<PlayerGame, PlayerGameId>;
  hasPlayerGames!: Sequelize.HasManyHasAssociationsMixin<PlayerGame, PlayerGameId>;
  countPlayerGames!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Game {
    Game.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at'
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'game',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "game_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return Game;
  }
}
