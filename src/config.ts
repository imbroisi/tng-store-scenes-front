export const LOCAIS = [
  'Bridge',
  'ScreenBridge',
  'HelmBridge',
  'BackPanelBridge',
  'SecurityBridge',
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
  
  'SpaceDeep',
  'SpaceStation',
  'SpaceOrbitPlanet',
  'SpaceOrbitStar',
  'PlanetSurface',
];

export const CHARACTERS = [
  'none',
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

];

export const CHARACTERS_ACTIONS = {
  'talking/sound': [
    'silence',
    'talking',
    'warning',
    'shouting',
    'crying',
    'laughing',
    'surprised',
    'singing',
  ],
  movement: [
    'seated',
    'lying',
    'standing',
    'walking',
    'running',
    'dancing',
    'shaking',
    'warp',
  ],
  fighting: [
    'no',
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