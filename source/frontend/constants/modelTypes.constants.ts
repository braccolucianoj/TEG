import moment from 'moment';
// Constants
export const AttackGameEventName = 'Attack' as const;
export const DefenseGameEventName = 'Defense' as const;
const GameEventTypeNames = [AttackGameEventName, DefenseGameEventName] as const;

// TYPES
interface IIdentifiableObject {
  id: number;
}

export interface IUserData {
  email: string;
  firstName: string;
  lastName: string;
  birthDate: moment.Moment;
  username: string;
  imageURL: string;
}

export interface IUser extends IUserData, IIdentifiableObject {}

export interface IAttackGameEvent {
  from: string;
  to: string;
  toUser: IUser;
  result: IUser;
}

export interface IGameEvent extends IIdentifiableObject {
  player: IUser;
  type: typeof GameEventTypeNames[number];
  info: any;
  createdAt: moment.Moment;
}
