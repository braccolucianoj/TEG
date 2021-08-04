export const GameStatus = {
  started: 'Started',
  ended: 'Started',
};

export const GameRoundStatus = {
  started: 'Started',
  firstPhaseArmy: 'Phase1-Army',
  firstPhaseAttack: 'Phase1-Attack',
  ended: 'Started',
};

export const RoundSituation = {
  nieve: 'Nieve',
  vientoAFavor: 'Viento a favor',
  fronterasCerradas: 'Fronteras cerradas',
  fronterasAbiertas: 'Fronteras abiertas',
  crisis: 'Crisis',
  refuerzosExtra: 'Refuerzos extra',
  descanso: 'Descanso ${color}',
};

export const MediaTypes = {
  AUTHORIZATION: 'authorization',
  REFRESH_TOKEN: 'refreshToken',
  BEARER: 'Bearer',
  AUTHORIZATION_EXPIRATION: 'authorization-expiration',
  REFRESH_TOKEN_EXPIRATION: 'refresh-token-expiration',
  CONTENT_TYPE: 'content-type',
  ACCEPT_TYPE: 'accept',
  v1: {
    JSON: 'application/vnd.api.v1+json; charset=utf-8',
  },
};
