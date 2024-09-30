import { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import CharactersContainer from '../CharactersContainer';

import { Container } from './App.styles';
import CharactersDataContainer from '../CharactersDataContainer';
import LocaisContainer from '../LocaisContainer';
import { CHARACTERS_ACTIONS } from '../../config';
import ResultSearch from '../ResultSearch';

const ACTIONS_KEYS = Object.keys(CHARACTERS_ACTIONS);

const [lastEpisode, lastTime, lastDuration] = (localStorage.getItem('episodeAndTimeAndDuration')?.split(' ')) || ['', '', ''];

export default function App() {
  const [pageModel, setPageModel] = useState('get');
  const [episode, setEpisode] = useState(lastEpisode);
  const [time, setTime] = useState(lastTime);
  const [duration, setDuration] = useState(lastDuration);
  const [localSelected, setLocalSelected] = useState('Bridge');
  const [checkedCharacters, setCheckedCharacters] = useState<{ [key: string]: boolean }>({});
  const [optionsSelecteds, setOptionsSelecteds] = useState<any>({});
  const [mode, setMode] = useState('FLEX');
  const [scenesFound, setScenesFound] = useState<string[]>([]);
  const divIframeRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [videoData, setVideoData] = useState({ videoSrc: '', videoStartTime: '' });
  const [closeResult, setCloseResult] = useState(false);

  const formatCharacters = () => {
    // const charactersResponse: { name: string; actions: any; }[] = [];

    console.log('1) ==> checkedCharacters', JSON.stringify(checkedCharacters, null, 2));

    const charactersNames: string[] = [];

    Object.keys(checkedCharacters).forEach(characterSelected => {
      if (!checkedCharacters[characterSelected]) {
        return;
      }

      charactersNames.push(characterSelected);

    });

    console.log('3) ==> charactersNames', charactersNames);

    if (charactersNames.length === 0) {
      return [];
    }

    console.log('4) ==> charactersNames', charactersNames);

    // DOC: aqui charactersNames => ['Picard', 'Data']

    const charactersFormated: { [key: string]: any } = {};

    charactersNames.forEach(thisCharacterName => {
      
      // DOC: aqui charactersNames => 'Picard'
      console.log('5) ==> thisCharacterName', thisCharacterName);
      
      charactersFormated[thisCharacterName] = {};
      
      let thisCharacterOptions = optionsSelecteds[thisCharacterName];

      console.log('6) ==> thisCharacterOptions', JSON.stringify(thisCharacterOptions, null, 2));

      if (!thisCharacterOptions) {
        alert('Please select the actions for the characters');
        return;
      }

      const thisCharacterOptionsKeys = Object.keys(thisCharacterOptions);
      const thisCharacterOptionsValues = Object.values(thisCharacterOptions);


      console.log('7) ==> thisCharacterOptionsKeys', JSON.stringify(thisCharacterOptionsKeys, null, 2));
      console.log('8) ==> thisCharacterOptionsValues', JSON.stringify(thisCharacterOptionsValues, null, 2));

      thisCharacterOptionsValues.forEach((value: any, index) => {
        console.log('9) ==> value', JSON.stringify(value, null, 2));
        const thisCharacterOptionsValuesArray =  Object.keys(value).filter((thisActionValue: any) => value[thisActionValue]);
        console.log('10) ==> thisCharacterOptionsValuesArray', JSON.stringify(thisCharacterOptionsValuesArray, null, 2));
        charactersFormated[thisCharacterName][thisCharacterOptionsKeys[index]] = thisCharacterOptionsValuesArray
      }); 

      console.log('11) ==> charactersFormated', JSON.stringify(charactersFormated, null, 2));


    });

    return charactersFormated;
  }

  
      // const thisCharacterObject = {
      //   name: thisCharacterName,
      //   actions: []
      // }

// 

    //   const thisCharacterOptionsKeys = Object.keys(thisCharacterOptions)
    //   const thisCharacterOptionsValues = Object.values(thisCharacterOptions)

    //   console.log('6.1) ==> thisCharacterOptionsKeys', thisCharacterOptionsKeys);
    //   console.log('6.2) ==> thisCharacterOptionsValues', JSON.stringify(thisCharacterOptionsValues, null, 2));
    //   // const thisActionValuesArray = Object.keys(thisActionValues).filter(thisActionValue => thisActionValues[thisActionValue]);



    //   const thisCharacterObjectActions = Object.keys(thisCharacterOptions).map(thisActionName => {
    //     console.log('7) ==> thisActionName', thisActionName);
    //     // DOC: aqui thisActionName => 'movement'

    //     const thisActionValues = thisCharacterOptions[thisActionName];

    //     console.log('8) ==> thisActionValues', thisActionValues);

    //     const thisActionValuesArray = Object.keys(thisActionValues).filter(thisActionValue => thisActionValues[thisActionValue]);

    //     console.log('9) ==> thisActionValuesArray', thisActionValuesArray);

    //     const thisActionObject = {
    //       name: thisActionName,
    //       values: thisActionValuesArray
    //     }

    //     console.log('10) ==> thisActionObject', thisActionObject);

    //     return thisActionObject;
    //   });

    //   console.log('11) ==> thisCharacterObjectActions', thisCharacterObjectActions);

    //   /* 
    //     aqui 
    //     thisCharacterObjectActions = 
    //     [
    //       {
    //         name: 'movement',
    //         values: ['walk', 'running]
    //       },
    //       {
    //         name: 'talking',
    //         values: ['talking', 'singing']
    //       }
    //     ]
      
    //   */
    //   return {
    //     ...thisCharacterObject,
    //     actions: thisCharacterObjectActions
    //   }


  //   });

  //   // console.log('12) ==> charactersFormated', JSON.stringify(charactersFormated, null, 2));


  //   // // DOC: aqui charactersNames => ['Picard']







  //   return charactersFormated;
  // }

  const handleGet = async () => {
    setScenesFound([]);

    const characters = formatCharacters();

    console.log('==> characters', characters);


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

    console.log('==> response', response);


    const { scenes, error } = await response.json();

    setScenesFound(scenes);

    console.log('==> fetched scenes', scenes);
  }

  const handleSave = async () => {
    console.log('==> saving scene');
    const validateTimeFormat = (time: string): boolean => {
      const regex = /^([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
      return regex.test(time);
    };

    const validateEpisodeTime = (episode: string): boolean => {
      const regex = /^s\d{2}e\d{2}$/;
      return regex.test(episode);
    };

    const validateDuration = (duration: string): boolean => {
      const regex = /^\d+$/;
      return regex.test(duration);
    }

    if (!validateEpisodeTime(episode)) {
      alert('INVALID EPISODE FORMAT.\nIt should be in the format for example s05e12.');
      return
    }

    if (!validateTimeFormat(time)) {
      alert('INVALID TIME FORMAT.\nRules:\n\t It should be in the format hh:mm:ss.\n\t The max values is 23:59:59');
      return;
    }

    if (!validateDuration(duration)) {
      alert('INVALID DURATION FORMAT.\nIt should be a number.');
      return;
    }

    // eslint-disable-next-line no-restricted-globals
    if (!confirm('Save scene?')) {
      console.log('==> not saved');
      return;
    }

    const characters = formatCharacters();

    const scene = {
      sceneName: `${episode} ${time}`,
      duration: parseInt(duration),
      local: localSelected, // localSelected será o nome do arquivo .json
      characters
    }

    localStorage.setItem('episodeAndTimeAndDuration', `${episode} ${time} ${duration}`);

    console.log('==> scene', JSON.stringify(scene, null, 2));

    const response = await fetch('http://localhost:3001/add-scene', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(scene)
    });

    console.log('==> response', response);

    if (response.status === 200) {
      alert('Scene saved');
      return;
    }

    const body = await response.json();
    console.log('==> body', body);
    alert('Error saving scene: ' + body.error);
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

    // console.log('==> character', character);
    // console.log('==> optionName', optionName);
    // console.log('==> optionChanged', optionChanged);
    // console.log('==> isChecked', isChecked);

    // let newOptionsSelecteds: { [action: string]: string; };


    // newOptionsSelecteds = { [optionName]: optionChanged };

    // console.log('==> newOptionsSelecteds', newOptionsSelecteds);
    // console.log('==> optionsSelecteds', optionsSelecteds);

    const newValue = {
      ...optionsSelecteds,
      [character]: {
        ...optionsSelecteds[character],
        [optionName]: {
          ...optionsSelecteds[character]?.[optionName],
          [optionChanged]: isChecked
        }
      }
    };

    // console.log('==> newValue', newValue);


    setOptionsSelecteds(newValue);


    // setOptionsSelecteds({
    //   ...optionsSelecteds,
    //   [character]: {
    //     ...optionsSelecteds[character],
    //     ...newOptionsSelecteds
    //   }
    // });
  };

  const handleEpisodeChange = (e: any) => {
    setEpisode(e.target.value);
  }

  const handleTimeChange = (e: any) => {
    const newTime = e.target.value;
    setTime(newTime);
  }

  const handleDurantioChange = (e: any) => {
    const newDuration = e.target.value;
    setDuration(newDuration);
  }

  const closeVideoScreen = () => {
    if (divIframeRef.current) {
      console.log('==> closing iframe');
      // @ts-ignore
      iframeRef.current.contentWindow?.pauseVideo();
      divIframeRef.current.style.display = 'none';
    }
  }

  const deleteVideo = async () => {
    // eslint-disable-next-line no-restricted-globals
    if (!confirm('Delete scene?')) {
      return;
    }

    const sceneName = `${videoSrc} ${videoStartTime}`;

    console.log('==> deleting scene', sceneName);

    const response = await fetch('http://localhost:3001/delete-scene', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ sceneName }),
    });

    console.log('==> response', response);

    const body = await response.text();

    if (response.status !== 200) {
      alert('ERROR: ' + body);
    } else {
      alert('Scene ' + sceneName + ' deleted');
    }

    setScenesFound([])

    closeVideoScreen();
  }

  const changePageModel = () => {
    closeVideoScreen();
    setPageModel(pageModel === 'get' ? 'save' : 'get')
  }

  const handleOpenEpisode = (scene: string) => {
    console.log('==> opening episode', scene);
    const [src, startTime] = scene.split(' ');
    if (divIframeRef.current) {
      divIframeRef.current.style.display = 'flex';
    }

    setVideoData({
      videoSrc: src,
      videoStartTime: startTime
    });
  }

  const clearSelections = () => {
    setCheckedCharacters({});
    setOptionsSelecteds({});
    setLocalSelected('Bridge');
    setDuration('');
  }

  const noCharSelected = Object.keys(checkedCharacters).filter(character => checkedCharacters[character]).length === 0;

  // TMP
  const { videoSrc, videoStartTime } = videoData;

  // console.log('==> rendering... videoSrc videoStartTime', videoSrc, videoStartTime);

  return (
    <div>
      <Draggable>
        <div
          ref={divIframeRef}
          style={{
            display: videoSrc ? 'flex' : 'none',
            flexDirection: 'column',
            alignItems: 'flex-end',
            border: '2px solid #444',
            borderRadius: '4px',
            position: 'fixed',
            zIndex: 1000,
            top: '20px',
            left: '20px',
            backgroundColor: '#000',
            padding: '8px',
            color: '#fff',
          }}
        >
          <div>
            <iframe
              ref={iframeRef}
              src={`/video-player.html?src=${videoSrc}&starttime=${videoStartTime}`}
              width="960"
              height="720"
              style={{ marginBottom: '8px', border: 0 }}
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              padding: '0 8px',
              boxSizing: 'border-box',
            }}
          >
            <div id="video-title" />

            <div style={{ fontSize: '14px' }}>start &#8594; {videoStartTime}</div>

            <button onClick={deleteVideo}>
              Delete
            </button>
            <button onClick={closeVideoScreen}>
              Close
            </button>
          </div>
        </div>
      </Draggable>

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
          <div onClick={changePageModel}>
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
                <div style={{ marginTop: '8px' }}>
                  <label>
                    Duration (secs):
                  </label>
                  <input type="text" value={duration} style={{ width: '97%' }} onChange={handleDurantioChange} />
                </div>
                <div>
                  <button style={{ marginTop: '16px' }} onClick={handleSave}>
                    Save
                  </button>
                </div>
              </>
            )}
          </div>
          <div style={{ width: '100%', marginLeft: '32px' }}>
            <button onClick={clearSelections}>
              Clear Selections
            </button>
          </div>
          <div style={{ display: 'flex' }}>
            <LocaisContainer localSelected={localSelected} onChange={handleLocalChanged} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <CharactersContainer checkedCharacters={checkedCharacters} onChange={handleCharacterChanged} />
            </div>
          </div>
        </div>
        <CharactersDataContainer optionsSelecteds={optionsSelecteds} checkedCharacters={checkedCharacters} onChange={handleOptionChanged} />
      </Container>


      {pageModel === 'get' && <ResultSearch close={closeResult} scenesFound={scenesFound || []} onOpenEpisode={handleOpenEpisode} onClose={() => setCloseResult(false)} />}
    </div>
  );
}
