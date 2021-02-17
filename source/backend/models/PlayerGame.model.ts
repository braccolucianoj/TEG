import { DataTypes, Model, Optional } from 'sequelize';
import * as Sequelize from 'sequelize';
import type { AppUser, AppUserId } from './AppUser.model';
import type { Game, GameId } from './Game.model';
import type { Goal, GoalId } from './Goal.model';

export interface PlayerGameAttributes {
  id: number;
  userId: number;
  gameId: number;
  goalId: number;
  color: string;
  continentCardUsed?: string[];
}

export type PlayerGamePk = 'id';
export type PlayerGameId = PlayerGame[PlayerGamePk];
export type PlayerGameCreationAttributes = Optional<PlayerGameAttributes, PlayerGamePk>;

export class PlayerGame
  extends Model<PlayerGameAttributes, PlayerGameCreationAttributes>
  implements PlayerGameAttributes {
  id!: number;
  userId!: number;
  gameId!: number;
  goalId!: number;
  color!: string;
  continentCardUsed?: string[];

  // PlayerGame belongsTo Game
  Game!: Game;
  getGame!: Sequelize.BelongsToGetAssociationMixin<Game>;
  setGame!: Sequelize.BelongsToSetAssociationMixin<Game, GameId>;
  createGame!: Sequelize.BelongsToCreateAssociationMixin<Game>;
  // PlayerGame belongsTo Goal
  Goal!: Goal;
  getGoal!: Sequelize.BelongsToGetAssociationMixin<Goal>;
  setGoal!: Sequelize.BelongsToSetAssociationMixin<Goal, GoalId>;
  createGoal!: Sequelize.BelongsToCreateAssociationMixin<Goal>;
  // PlayerGame belongsTo AppUser
  AppUser!: AppUser;
  getAppUser!: Sequelize.BelongsToGetAssociationMixin<AppUser>;
  setAppUser!: Sequelize.BelongsToSetAssociationMixin<AppUser, AppUserId>;
  createAppUser!: Sequelize.BelongsToCreateAssociationMixin<AppUser>;

  static initModel(sequelize: Sequelize.Sequelize): typeof PlayerGame {
    PlayerGame.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'app_user',
            key: 'id',
          },
          unique: 'player_game_user_id_game_id_key',
          field: 'user_id',
        },
        gameId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'game',
            key: 'id',
          },
          unique: 'player_game_user_id_game_id_key',
          field: 'game_id',
        },
        goalId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'goal',
            key: 'id',
          },
          unique: 'player_game_game_id_goal_id_key',
          field: 'goal_id',
        },
        color: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: 'player_game_game_id_color_key',
        },
        continentCardUsed: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: true,
          field: 'continent_card_used',
        },
      },
      {
        sequelize,
        tableName: 'player_game',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'player_game_game_id_color_key',
            unique: true,
            fields: [{ name: 'game_id' }, { name: 'color' }],
          },
          {
            name: 'player_game_game_id_goal_id_key',
            unique: true,
            fields: [{ name: 'game_id' }, { name: 'goal_id' }],
          },
          {
            name: 'player_game_pkey',
            unique: true,
            fields: [{ name: 'id' }],
          },
          {
            name: 'player_game_user_id_game_id_key',
            unique: true,
            fields: [{ name: 'user_id' }, { name: 'game_id' }],
          },
        ],
      }
    );
    return PlayerGame;
  }
}
