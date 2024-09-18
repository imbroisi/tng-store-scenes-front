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
  
  const handleSave = async () => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm('Save scene?')){
      console.log('==> not saved');
      return;
    }
    const scene = {
      episode_time: `${episode} ${time} OK`,
      local: localSelected,
      characters: Object.keys(checkedCharacters).map(character => {
        return {
          name: character,
          actions: Object.keys(optionsSelecteds[character]).map(optionName => {
            return {
              name: optionName,
              values: Object.keys(optionsSelecteds[character][optionName]).filter(key => optionsSelecteds[character][optionName][key])
            }
          })
        }
      })
    };

    console.log('==> scene', scene);


    const response = await fetch('http://localhost:3001/save-scene', {
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
        [optionName]: {
          ...optionsSelecteds[character]?.[optionName],
          [optionChanged]: isChecked
        }
      }
    });
  };

  const handleEpisodeChange = (e: any) => {
    setEpisode(e.target.value);
  }

  const handleTimeChange = (e: any) => {
    console.log('==> time', e.target.value);
    setTime(e.target.value);
  }

  const handleTmpPost = async () => {
    const response = await fetch(`http://localhost:3001/search-scenes?local=Bridge&char=Data&action=TALKING&values=normal`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    console.log('==> fetched scenes', data);
  }

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

            <button style={{ marginTop: '16px' }} onClick={handleTmpPost}>
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