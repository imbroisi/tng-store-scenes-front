export const LOCAIS = [
  'Bridge',
  'ScreenBridge',
  'BackPanelBridge',
  'ReadyRoom',
  'ConferenceRoom',
  'NotListedRoom',
  'Engineering',
  'TenForward',
  'Corridor',
  'Elevator',
  'Sickbay',
  'HolodeckEntrance',
  'TransporterRoom',
  'ShuttleBay',
  'ShuttleCraft',
  'ObservationLounge',
  'CaptainsQuarters',
  'CargoBay',
  'JeffriesTube',

  'InsideKlingonShip',
  'InsideBorgShip',
  'InsideRomulanShip',
  'InsideFederationShip',
  'Space',
  'PlanetSurface',
];

export const CHARACTERS = [
  'Picard',
  'Data',
  'Ricker',
  'Geordi',
  'Worf',
  'Troi',
  'DraCrusher',
  'Wesley',
  'Q',
  'Guinan',
  'Almirante',
  'Klingon',
  'Borg',
  'Romulan',

  'EnterpriseFront',
  'EnterpriseBack',
  'EnterpriseSide',
  
  'KlingonShip',
  'BorgShip',
  'RomulanShip',  
  'FederationShip',

  'PlanetGround',
  'PlanetOrbit',
  'SpaceStation',
];

export const CHARACTERS_ACTIONS = {
  'TALKING/SOUND': [
    'ignore',
    'silence',
    'normal',
    'quietly',
    'loudly',
    'shouting',
    'laughing',
    'crying',
    'singing',
    'swearing',
  ],
  MOVEMENT: [
    'ignore',
    'stopped',
    'normal',
    'slow',
    'fast',
    'running',
    'warp',
    'dancing'
  ],
  FIGHTING: [
    'ignore',
    'fists',
    'phasers',
    'photonTorpedos',
    'disruptors',
    'sword',
    'bat\'leth'
  ],
};

/*
  Por exemplo Bridge.js
  {
    's04e12 00:01:00': {
      Picard: {
        TALKING/SOUND: ['normal', 'quietly', 'loudly']
        FIGHTING: ['fists', 'phasers', 'photonTorpedos']
      },
      Data: {
        TALKING/SOUND: ['normal', 'quietly']
        MOVEMENT: ['normal', 'fast', 'slow']
      }
    },
    ...  
}  


*/

/*
  pesquisa por nome do personagem:
    * -> qualquer um
 
*/