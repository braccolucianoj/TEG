import { DataTypes, Model, Optional } from 'sequelize';
import * as Sequelize from 'sequelize';
import type { PlayerGame, PlayerGameCreationAttributes, PlayerGameId } from './PlayerGame.model';

export interface GoalAttributes {
  id: number;
  name: string;
  functionCheckerName: string;
  description?: string;
}

export type GoalPk = 'id';
export type GoalId = Goal[GoalPk];
export type GoalCreationAttributes = Optional<GoalAttributes, GoalPk>;

export class Goal extends Model<GoalAttributes, GoalCreationAttributes> implements GoalAttributes {
  id!: number;
  name!: string;
  functionCheckerName!: string;
  description?: string;

  // Goal hasOne PlayerGame
  PlayerGame!: PlayerGame;
  getPlayerGame!: Sequelize.HasOneGetAssociationMixin<PlayerGame>;
  setPlayerGame!: Sequelize.HasOneSetAssociationMixin<PlayerGame, PlayerGameId>;
  createPlayerGame!: Sequelize.HasOneCreateAssociationMixin<PlayerGameCreationAttributes>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Goal {
    Goal.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        functionCheckerName: {
          type: DataTypes.STRING(255),
          allowNull: false,
          field: 'function_checker_name',
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'goal',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'goal_pkey',
            unique: true,
            fields: [{ name: 'id' }],
          },
        ],
      }
    );
    return Goal;
  }
}
