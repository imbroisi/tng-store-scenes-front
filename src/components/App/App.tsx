import { useState } from 'react';
import CharactersContainer from '../CharactersContainer';
import { Container } from './App.styles';
import CharactersDataContainer from '../CharactersDataContainer';
import LocaisContainer from '../LocaisContainer';
// import Box from '../Box';

export default function App() {
  const [episode, setEpisode] = useState('');
  const [time, setTime] = useState('');
  const [localSelected, setLocalSelected] = useState('Bridge');
  const [checkedCharacters, setCheckedCharacters] = useState<{ [key: string]: boolean }>({});
  const [optionsSelecteds, setOptionsSelecteds] = useState<{ [key: string]: any }>({});

  const validateEpisodeTime = (time: string): boolean => {
    const regex = /^s\d{2}e\d{2}$/;
    return regex.test(time);
  };

  const validateTimeFormat = (time: string): boolean => {
    const regex = /^([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    return regex.test(time);
  };

  const handleSave = async () => {
    if (!validateEpisodeTime(episode)) {
      alert('INVALID EPISODE FORMAT.\nIt should be in the format for example s05e12.');
      return
    }

    if (!validateTimeFormat(time)) {
      alert('INVALID TIME FORMAT.\nRules:\n\t It should be in the format hh:mm:ss.\n\t The max values is 23:59:59');
      return;
    }


    // eslint-disable-next-line no-restricted-globals
    if (!confirm('Save scene?')) {
      console.log('==> not saved');
      return;
    }
    // const scene = {
    //   episode_time: `${episode} ${time} OK`,
    //   local: localSelected,
    //   characters: Object.keys(checkedCharacters).map(character => {
    //     return {
    //       name: character,
    //       actions: Object.keys(optionsSelecteds[character]).map(optionName => {
    //         return {
    //           name: optionName,
    //           values: Object.keys(optionsSelecteds[character][optionName]).filter(key => optionsSelecteds[character][optionName][key])
    //         }
    //       })
    //     }
    //   })
    // };

    // const characters: never[] = [];

    // Object.keys(checkedCharacters).forEach(character => {

    //   characters[character] = {}

    //   Object.keys(optionsSelecteds[character]).forEach(optionName => {
    //     characters[character][optionName] = Object.keys(optionsSelecteds[character][optionName]).filter(key => optionsSelecteds[character][optionName][key]) 
    //   })
    // })

    // console.log('==> checkedCharacters', checkedCharacters);

    

    const characters: { name: string; actions: string; }[] = [];
    
    Object.keys(checkedCharacters).forEach(character => {
      // console.log('==> character', character);
      // console.log('==> checkedCharacters[character]', checkedCharacters[character]);
      // console.log('==> optionsSelecteds[character]', optionsSelecteds[character]);
      if (!checkedCharacters[character]) {
        return;
      }

      const actionsString = JSON.stringify(optionsSelecteds[character]);

      characters.push({
        name: character,
        actions: actionsString
        
        // actions: Object.keys(optionsSelecteds[character]).map(optionName => {
        //   return {
        //     name: optionName,
        //     value: optionsSelecteds[character][optionName],
        //   }
        // })
      });
    });

    // console.log('==> optionsSelecteds', optionsSelecteds);

    const scene = {
      name: `${episode} ${time}`,
      local: localSelected,
      characters
      // characters: Object.keys(checkedCharacters).map(character => {
      //   return {
      //     [character]: {
      //       actions: Object.keys(optionsSelecteds[character]).map(optionName => {
      //         return {
      //           name: optionName,
      //           values: Object.keys(optionsSelecteds[character][optionName]).filter(key => optionsSelecteds[character][optionName][key])
      //         }
      //       })
      //     }
      //   }
      // })
    }

    console.log('==> scene', JSON.stringify(scene, null, 2));

    const response = await fetch('http://localhost:3001/add-scene', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(scene)
    });

    console.log('==> response', response);
  }

  const handleLocalChanged = (local: string) => {
    setLocalSelected(local);
  }

  const handleCharacterChanged = (character: string, isChecked: boolean) => {
    setCheckedCharacters({
      ...checkedCharacters,
      [character]: isChecked
    });
  }

  const handleOptionChanged = (
    character: string,
    optionName: string,
    optionChanged: string,
    isChecked: boolean
  ) => {
    setOptionsSelecteds({
      ...optionsSelecteds,
      [character]: {
        ...optionsSelecteds[character],
        [optionName]: optionChanged
        // {
        //   // ...optionsSelecteds[character]?.[optionName],
        //   [optionChanged]: isChecked
        // }
      }
    });
  };

  const handleEpisodeChange = (e: any) => {
    setEpisode(e.target.value);
  }

  const handleTimeChange = (e: any) => {
    const newTime = e.target.value;
    setTime(newTime);
  }

  const handleTmpRead = async () => {
    const characters = JSON.stringify({
      "Picard": {
        "WALKING": [
          "normal",
        ],
        "TALKING": [
          "swearing",
          "shouting"
        ]
      },
      "Data": {
        "FIGHTING": [
          "photonTorpedos",
          "disruptors"
        ]
      }
    });

    // // const chars = JSON.stringify(['Picard']);

    const response = await fetch(`http://localhost:3001/search-scenes?local=Bridge&characters=${encodeURIComponent(characters)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    // console.log('==> fetched scenes', data);
  }

  // console.log('(2) ==> optionsSelecteds', optionsSelecteds);


  return (
    <Container>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ border: '1px solid #aaa', padding: '16px', margin: '16px' }}>
          <div>
            <label>
              Episode:
            </label>
            <input type="text" value={episode} style={{ width: '97%' }} onChange={handleEpisodeChange} />
          </div>
          <div style={{ marginTop: '8px' }}>
            <label>
              Time:
            </label>
            <input type="text" value={time} style={{ width: '97%' }} onChange={handleTimeChange} />
          </div>
          <div>
            <button style={{ marginTop: '16px' }} onClick={handleSave}>
              Save
            </button>

            <button style={{ marginTop: '16px' }} onClick={handleTmpRead}>
              TMP Get
            </button>
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <LocaisContainer localSelected={localSelected} onChange={handleLocalChanged} />
          <CharactersContainer checkedCharacters={checkedCharacters} onChange={handleCharacterChanged} />
        </div>
      </div>
      <CharactersDataContainer optionsSelecteds={optionsSelecteds} checkedCharacters={checkedCharacters} onChange={handleOptionChanged} />
    </Container>
  );
}

/*

I have example they are in json, but must be saved in SQLite to be searchable. 


{e to save the following informations in SQLite.
In th
  episode_time: 's04e12 00:01:00',
  local: 'Corridor',
  characters: [
    {
      name: 'Picard',
      actions: [
      {
        name: 'TALKING',
        values: ['normal', 'quietly', 'loudly']
      },
      {
        name: 'FIGHTING',
        values: ['fists', 'phasers', 'photonTorpedos']
      }
    },
    {
      name: 'Data',
      actions: [
      {
        name: 'TALKING',
        values: ['normal', 'quietly']
      },
      {
        name: 'WALKING',
        values: ['normal', 'fast', 'slow']
      }
    },
  ]
}

So to bem possible to search for a scene in the "Corridor", with character "Picard", action "TALKING" with values ["loudly", "normal"].

the return must be the episode_time.


*/