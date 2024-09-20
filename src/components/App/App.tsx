import { useState } from 'react';
import CharactersContainer from '../CharactersContainer';
import { Container } from './App.styles';
import CharactersDataContainer from '../CharactersDataContainer';
import LocaisContainer from '../LocaisContainer';
import { CHARACTERS_ACTIONS } from '../../config';
import ResultSearch from '../ResultSearch';
// import Box from '../Box';

const ACTIONS_KEYS = Object.keys(CHARACTERS_ACTIONS);

export default function App() {
  const [pageModel, setPageModel] = useState('get');
  const [episode, setEpisode] = useState('');
  const [time, setTime] = useState('');
  const [localSelected, setLocalSelected] = useState('Bridge');
  const [checkedCharacters, setCheckedCharacters] = useState<{ [key: string]: boolean }>({});
  const [optionsSelecteds, setOptionsSelecteds] = useState<{ [key: string]: any }>({});
  const [mode, setMode] = useState('FLEX');
  const [scenesFound, setScenesFound] = useState<string[] | null>(null);

  const formatCharacters = () => {
    const characters: { name: string; actions: string; }[] = [];

    Object.keys(checkedCharacters).forEach(character => {
      if (!checkedCharacters[character]) {
        return;
      }

      const actionsFormated: { [key: string]: string } = {};
      ACTIONS_KEYS.forEach(action => {
        if (optionsSelecteds[character][action] === 'ignore') {
          return;
        }

        actionsFormated[action] = optionsSelecteds[character][action];
      });
      const actionsString = JSON.stringify(actionsFormated);

      characters.push({
        name: character,
        actions: actionsString
      });
    });

    return characters;
  }

  const handleGet = async () => {
    setScenesFound(null);

    const characters = formatCharacters();

    const search = {
      mode,
      local: localSelected,
      characters
    }

    const response = await fetch('http://localhost:3001/search-scenes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(search)
    });

    const { scenes } = await response.json();

    setScenesFound(scenes);

    console.log('==> fetched scenes', scenes);
  }

  const handleSave = async () => {
    console.log('==> saving scene');
    const validateTimeFormat = (time: string): boolean => {
      const regex = /^([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
      return regex.test(time);
    };

    const validateEpisodeTime = (time: string): boolean => {
      const regex = /^s\d{2}e\d{2}$/;
      return regex.test(time);
    };

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

    const characters = formatCharacters();

    const scene = {
      name: `${episode} ${time}`,
      local: localSelected,
      characters
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
    if (response.status !== 200) {
      const body = await response.json();
      console.log('==> body', body);
      alert('Error saving scene: ' + body.error);
    }
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
  ) => {
    let newOptionsSelecteds: { [action: string]: string; };

    if (optionName === 'ALL') {
      newOptionsSelecteds = {};
      ACTIONS_KEYS.forEach(action => {
        newOptionsSelecteds[action] = optionChanged;
      });
    } else {
      newOptionsSelecteds = { [optionName]: optionChanged };
    }

    setOptionsSelecteds({
      ...optionsSelecteds,
      [character]: {
        ...optionsSelecteds[character],
        ...newOptionsSelecteds
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

  const noCharSelected = Object.keys(checkedCharacters).filter(character => checkedCharacters[character]).length === 0;

  return (
    <>
      <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', borderBottom: '1px solid #ddd', padding: '0px', margin: 0, height: '60px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: pageModel === 'get' ? 'transparent' : '#ffaaaa',
          width: '100%',
          height: '100%'
        }}>
          {pageModel === 'get' ? 'Get Scenes' : 'Save Scenes'}
        </div>
        <div style={{ position: 'absolute', right: '24px', fontSize: '14px', cursor: 'pointer', color: 'blue' }}>
          <div onClick={() => setPageModel(pageModel === 'get' ? 'save' : 'get')}>
            {pageModel === 'get' ? 'save scenes >' : 'get scenes >'}
          </div>
        </div>
      </h1>

      <Container>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ border: '1px solid #aaa', padding: '16px', margin: '16px' }}>
            {pageModel === 'get' ? (
              <div>
                <div style={{ display: 'flex', width: '100%', justifyContent: 'center', marginTop: '6px' }}>
                  <label>
                    Search mode
                    <select
                      disabled={noCharSelected} style={{ marginTop: '6px', fontSize: '14px', padding: '4px 8px' }}
                      value={mode}
                      onChange={(e) => setMode(e.target.value)}
                    >
                      <option value="STRICT"> Exact Match </option>
                      <option value="FLEX"> Exact Match accepting other characters in scene </option>
                    </select>
                  </label>
                </div>
                <div style={{ display: 'flex', width: '100%', justifyContent: 'center', marginTop: '20px' }}>
                  <button onClick={handleGet} disabled={noCharSelected}>
                    Get Scenes
                  </button>
                </div>
              </div>
            ) : (
              <>
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
                </div>
              </>
            )}
          </div>
          <div style={{ display: 'flex' }}>
            <LocaisContainer localSelected={localSelected} onChange={handleLocalChanged} />
            <CharactersContainer checkedCharacters={checkedCharacters} onChange={handleCharacterChanged} />
          </div>
        </div>
        <CharactersDataContainer optionsSelecteds={optionsSelecteds} checkedCharacters={checkedCharacters} onChange={handleOptionChanged} />
      </Container>

      <ResultSearch scenesFound={scenesFound} />
    </>
  );
}
