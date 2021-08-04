import { DataTypes, Model, Optional } from 'sequelize';
import * as Sequelize from 'sequelize';
import type { CountryGameOccupation, CountryGameOccupationId } from './CountryGameOccupation.model';
import type { GameEvent, GameEventId } from './GameEvent.model';
import type { PlayerGame, PlayerGameId } from './PlayerGame.model';

export interface AppUserAttributes {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  birthDate: string;
  password: string;
  passwordSalt: string;
  phone: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type AppUserPk = 'id';
export type AppUserId = AppUser[AppUserPk];
export type AppUserCreationAttributes = Optional<AppUserAttributes, AppUserPk>;

export class AppUser extends Model<AppUserAttributes, AppUserCreationAttributes> implements AppUserAttributes {
  id!: number;
  email!: string;
  firstName!: string;
  lastName!: string;
  username!: string;
  birthDate!: string;
  password!: string;
  passwordSalt!: string;
  phone!: string;
  imageUrl?: string;
  createdAt!: Date;
  updatedAt!: Date;

  // AppUser hasMany CountryGameOccupation
  CountryGameOccupations!: CountryGameOccupation[];
  getCountryGameOccupations!: Sequelize.HasManyGetAssociationsMixin<CountryGameOccupation>;
  setCountryGameOccupations!: Sequelize.HasManySetAssociationsMixin<CountryGameOccupation, CountryGameOccupationId>;
  addCountryGameOccupation!: Sequelize.HasManyAddAssociationMixin<CountryGameOccupation, CountryGameOccupationId>;
  addCountryGameOccupations!: Sequelize.HasManyAddAssociationsMixin<CountryGameOccupation, CountryGameOccupationId>;
  createCountryGameOccupation!: Sequelize.HasManyCreateAssociationMixin<CountryGameOccupation>;
  removeCountryGameOccupation!: Sequelize.HasManyRemoveAssociationMixin<CountryGameOccupation, CountryGameOccupationId>;
  removeCountryGameOccupations!: Sequelize.HasManyRemoveAssociationsMixin<
    CountryGameOccupation,
    CountryGameOccupationId
  >;
  hasCountryGameOccupation!: Sequelize.HasManyHasAssociationMixin<CountryGameOccupation, CountryGameOccupationId>;
  hasCountryGameOccupations!: Sequelize.HasManyHasAssociationsMixin<CountryGameOccupation, CountryGameOccupationId>;
  countCountryGameOccupations!: Sequelize.HasManyCountAssociationsMixin;
  // AppUser hasMany GameEvent
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
  // AppUser hasMany PlayerGame
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

  static initModel(sequelize: Sequelize.Sequelize): typeof AppUser {
    AppUser.init(
      {
        id: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: 'app_user_email_key',
        },
        firstName: {
          type: DataTypes.STRING(255),
          allowNull: false,
          field: 'first_name',
        },
        lastName: {
          type: DataTypes.STRING(255),
          allowNull: false,
          field: 'last_name',
        },
        username: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: 'app_user_username_key',
        },
        birthDate: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          field: 'birth_date',
        },
        password: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        passwordSalt: {
          type: DataTypes.STRING(255),
          allowNull: false,
          field: 'password_salt',
        },
        phone: {
          type: DataTypes.STRING(20),
          allowNull: false,
          unique: 'app_user_phone_key',
        },
        imageUrl: {
          type: DataTypes.TEXT,
          allowNull: true,
          field: 'image_url',
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          field: 'created_at',
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          field: 'updated_at',
        },
      },
      {
        sequelize,
        tableName: 'app_user',
        schema: 'public',
        timestamps: false,
        indexes: [
          {
            name: 'app_user_email_key',
            unique: true,
            fields: [{ name: 'email' }],
          },
          {
            name: 'app_user_phone_key',
            unique: true,
            fields: [{ name: 'phone' }],
          },
          {
            name: 'app_user_pkey',
            unique: true,
            fields: [{ name: 'id' }],
          },
          {
            name: 'app_user_username_key',
            unique: true,
            fields: [{ name: 'username' }],
          },
        ],
      }
    );
    return AppUser;
  }
}
