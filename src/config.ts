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
  'Holodeck',
  'TransporterRoom',
  'ShuttleBay',
  'ShuttleCraft',
  'ObservationLounge',
  'CaptainsQuarters',
  'CargoBay',
  'Space',
  'Planet',
  'JeffriesTube',
];

export const CHARACTERS = [
  'Picard',
  'Data',
  'Ricker',
  'Geordi',
  'Worf',
  'Troi',
  'Crusher',
  'Q',
  'Guinan',
  'Almirante',
  'Klingon',
  'Borg',
  'Romulan',
  'Native',
  'KlingonShip',
  'BorgShip',
  'RomulanShip',  
  'FederationShip',
];

export const CHARACTERS_ACTIONS = {
  TALKING: [
    'none',
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
    'none',
    'normal',
    'fast',
    'slow',
    'running'
  ],
  FIGHTING: [
    'none',
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