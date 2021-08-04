import type { Sequelize, Model } from 'sequelize';
import { AppUser } from './AppUser.model';
import type { AppUserAttributes, AppUserCreationAttributes } from './AppUser.model';
import { Continent } from './Continent.model';
import type { ContinentAttributes, ContinentCreationAttributes } from './Continent.model';
import { CountryGameOccupation } from './CountryGameOccupation.model';
import type {
  CountryGameOccupationAttributes,
  CountryGameOccupationCreationAttributes,
} from './CountryGameOccupation.model';
import { Game } from './Game.model';
import type { GameAttributes, GameCreationAttributes } from './Game.model';
import { GameCountry } from './GameCountry.model';
import type { GameCountryAttributes, GameCountryCreationAttributes } from './GameCountry.model';
import { GameEvent } from './GameEvent.model';
import type { GameEventAttributes, GameEventCreationAttributes } from './GameEvent.model';
import { GameRound } from './GameRound.model';
import type { GameRoundAttributes, GameRoundCreationAttributes } from './GameRound.model';
import { Goal } from './Goal.model';
import type { GoalAttributes, GoalCreationAttributes } from './Goal.model';
import { PlayerGame } from './PlayerGame.model';
import type { PlayerGameAttributes, PlayerGameCreationAttributes } from './PlayerGame.model';

export { AppUser, Continent, CountryGameOccupation, Game, GameCountry, GameEvent, GameRound, Goal, PlayerGame };

export type {
  AppUserAttributes,
  AppUserCreationAttributes,
  ContinentAttributes,
  ContinentCreationAttributes,
  CountryGameOccupationAttributes,
  CountryGameOccupationCreationAttributes,
  GameAttributes,
  GameCreationAttributes,
  GameCountryAttributes,
  GameCountryCreationAttributes,
  GameEventAttributes,
  GameEventCreationAttributes,
  GameRoundAttributes,
  GameRoundCreationAttributes,
  GoalAttributes,
  GoalCreationAttributes,
  PlayerGameAttributes,
  PlayerGameCreationAttributes,
};

export interface Models {
  AppUser: typeof AppUser;
  Continent: typeof Continent;
  CountryGameOccupation: typeof CountryGameOccupation;
  Game: typeof Game;
  GameCountry: typeof GameCountry;
  GameEvent: typeof GameEvent;
  GameRound: typeof GameRound;
  Goal: typeof Goal;
  PlayerGame: typeof PlayerGame;
}

export const initModels = (sequelize: Sequelize): Models => {
  AppUser.initModel(sequelize);
  Continent.initModel(sequelize);
  CountryGameOccupation.initModel(sequelize);
  Game.initModel(sequelize);
  GameCountry.initModel(sequelize);
  GameEvent.initModel(sequelize);
  GameRound.initModel(sequelize);
  Goal.initModel(sequelize);
  PlayerGame.initModel(sequelize);

  Game.belongsToMany(GameCountry, {
    through: CountryGameOccupation as typeof Model,
    foreignKey: 'gameId',
    otherKey: 'countryId',
  });
  GameCountry.belongsToMany(Game, {
    through: CountryGameOccupation as typeof Model,
    foreignKey: 'countryId',
    otherKey: 'gameId',
  });
  CountryGameOccupation.belongsTo(GameCountry, { foreignKey: 'countryId' });
  GameCountry.hasMany(CountryGameOccupation, { foreignKey: 'countryId' });
  CountryGameOccupation.belongsTo(Game, { foreignKey: 'gameId' });
  Game.hasMany(CountryGameOccupation, { foreignKey: 'gameId' });
  CountryGameOccupation.belongsTo(AppUser, { foreignKey: 'userId' });
  AppUser.hasMany(CountryGameOccupation, { foreignKey: 'userId' });
  GameCountry.belongsTo(Continent, { foreignKey: 'continentId' });
  Continent.hasMany(GameCountry, { foreignKey: 'continentId' });
  GameEvent.belongsTo(Game, { foreignKey: 'gameId' });
  Game.hasMany(GameEvent, { foreignKey: 'gameId' });
  GameEvent.belongsTo(AppUser, { foreignKey: 'playerId' });
  AppUser.hasMany(GameEvent, { foreignKey: 'playerId' });
  GameRound.belongsTo(Game, { foreignKey: 'gameId' });
  Game.hasMany(GameRound, { foreignKey: 'gameId' });
  PlayerGame.belongsTo(Game, { foreignKey: 'gameId' });
  Game.hasMany(PlayerGame, { foreignKey: 'gameId' });
  PlayerGame.belongsTo(Goal, { foreignKey: 'goalId' });
  Goal.hasOne(PlayerGame, { foreignKey: 'goalId' });
  PlayerGame.belongsTo(AppUser, { foreignKey: 'userId' });
  AppUser.hasMany(PlayerGame, { foreignKey: 'userId' });

  return {
    AppUser: AppUser,
    Continent: Continent,
    CountryGameOccupation: CountryGameOccupation,
    Game: Game,
    GameCountry: GameCountry,
    GameEvent: GameEvent,
    GameRound: GameRound,
    Goal: Goal,
    PlayerGame: PlayerGame,
  };
};
