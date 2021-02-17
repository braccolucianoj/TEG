import { DataTypes, Model, Optional } from 'sequelize';
import * as Sequelize from 'sequelize';
import type { Game, GameId } from './Game.model';

export interface GameRoundAttributes {
  id: number;
  roundNumber: number;
  gameId: number;
  status: string;
  situation: string;
  userOrder: string[];
  userTurn: number;
  createdAt: Date;
  updatedAt: Date;
}

export type GameRoundPk = "id";
export type GameRoundId = GameRound[GameRoundPk];
export type GameRoundCreationAttributes = Optional<GameRoundAttributes, GameRoundPk>;

export class GameRound extends Model<GameRoundAttributes, GameRoundCreationAttributes> implements GameRoundAttributes {
  id!: number;
  roundNumber!: number;
  gameId!: number;
  status!: string;
  situation!: string;
  userOrder!: string[];
  userTurn!: number;
  createdAt!: Date;
  updatedAt!: Date;

  // GameRound belongsTo Game
  Game!: Game;
  getGame!: Sequelize.BelongsToGetAssociationMixin<Game>;
  setGame!: Sequelize.BelongsToSetAssociationMixin<Game, GameId>;
  createGame!: Sequelize.BelongsToCreateAssociationMixin<Game>;

  static initModel(sequelize: Sequelize.Sequelize): typeof GameRound {
    GameRound.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    roundNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "game_round_round_number_game_id_key",
      field: 'round_number'
    },
    gameId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'game',
        key: 'id'
      },
      unique: "game_round_round_number_game_id_key",
      field: 'game_id'
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    situation: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    userOrder: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      field: 'user_order'
    },
    userTurn: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_turn'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updated_at'
    }
  }, {
    sequelize,
    tableName: 'game_round',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "game_round_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "game_round_round_number_game_id_key",
        unique: true,
        fields: [
          { name: "round_number" },
          { name: "game_id" },
        ]
      },
    ]
  });
  return GameRound;
  }
}
