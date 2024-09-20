export const LOCAIS = [
  'Bridge',
  'ScreenBridge',
  'ReadyRoom',
  'ConferenceRoom',
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
  'PlanetNative',
  'KlingonShip',
  'BorgShip',
  'RomulanShip',  
  'FederationShip',
];

export const CHARACTERS_ACTIONS = {
  TALKING: [
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
  WALKING: [
    'ignore',
    'normal',
    'fast',
    'slow',
    'running'
  ],
  FIGHTING: [
    'ignore',
    'fists',
    'phasers',
    'photonTorpedos',
    'disruptors',
    'sword',
  ],
};

/*
  Por exemplo Bridge.js
  {
    's04e12 00:01:00': {
      Picard: {
        TALKING: ['normal', 'quietly', 'loudly']
        FIGHTING: ['fists', 'phasers', 'photonTorpedos']
      },
      Data: {
        TALKING: ['normal', 'quietly']
        WALKING: ['normal', 'fast', 'slow']
      }
    },
    ...  
}  


*/

/*
  pesquisa por nome do personagem:
    * -> qualquer um
 
*/