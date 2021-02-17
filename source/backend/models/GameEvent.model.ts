import { DataTypes, Model, Optional } from 'sequelize';
import * as Sequelize from 'sequelize';
import type { AppUser, AppUserId } from './AppUser.model';
import type { Game, GameId } from './Game.model';

export interface GameEventAttributes {
  id: number;
  playerId: number;
  gameId: number;
  info?: any;
  gameEventType: string;
  createdAt: Date;
}

export type GameEventPk = "id";
export type GameEventId = GameEvent[GameEventPk];
export type GameEventCreationAttributes = Optional<GameEventAttributes, GameEventPk>;

export class GameEvent extends Model<GameEventAttributes, GameEventCreationAttributes> implements GameEventAttributes {
  id!: number;
  playerId!: number;
  gameId!: number;
  info?: any;
  gameEventType!: string;
  createdAt!: Date;

  // GameEvent belongsTo Game
  Game!: Game;
  getGame!: Sequelize.BelongsToGetAssociationMixin<Game>;
  setGame!: Sequelize.BelongsToSetAssociationMixin<Game, GameId>;
  createGame!: Sequelize.BelongsToCreateAssociationMixin<Game>;
  // GameEvent belongsTo AppUser
  AppUser!: AppUser;
  getAppUser!: Sequelize.BelongsToGetAssociationMixin<AppUser>;
  setAppUser!: Sequelize.BelongsToSetAssociationMixin<AppUser, AppUserId>;
  createAppUser!: Sequelize.BelongsToCreateAssociationMixin<AppUser>;

  static initModel(sequelize: Sequelize.Sequelize): typeof GameEvent {
    GameEvent.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    playerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'app_user',
        key: 'id'
      },
      field: 'player_id'
    },
    gameId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'game',
        key: 'id'
      },
      field: 'game_id'
    },
    info: {
      type: DataTypes.JSON,
      allowNull: true
    },
    gameEventType: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'game_event_type'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at'
    }
  }, {
    sequelize,
    tableName: 'game_event',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "game_event_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return GameEvent;
  }
}
