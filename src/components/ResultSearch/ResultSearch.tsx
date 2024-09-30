import { useEffect, useState } from 'react';
import { Container, Result, ResulteData, Scene } from './ResultSearch.styles';
import { set } from 'video.js/dist/types/tech/middleware';
import { on } from 'events';

export interface ResultSearchProps {
  scenesFound: string[],
  onOpenEpisode: (scene: string) => void
  close: boolean
  onClose: () => void
}

export default function ResultSearch({ scenesFound, onOpenEpisode, close, onClose }: ResultSearchProps) {
  const [open, setOpen] = useState(!close);
  const [showTotal, setShowTotal] = useState(false);
  const [showMinTime, setShowMinTime] = useState(false);
  const [showMaxTime, setShowMaxTime] = useState(false);
  const [minTime, setMinTime] = useState(1);
  const [maxTime, setMaxTime] = useState(30);

  useEffect(() => {
    if (open) {
      onClose();
    }
  }, [open]);

  useEffect(() => {
    if (scenesFound && scenesFound.length > 0) {
      setOpen(true);
    } else {
      setShowTotal(false);
      setTimeout(() => {
        setShowTotal(true);
      }, 500);
    }

  }, [scenesFound]);

  useEffect(() => {
    if (close) {
      setOpen(false);
    }
  }, [close]);

  console.log('scenesFound', scenesFound);


  return (
    <Container>
      <div style={{
        position: 'absolute',
        display: open ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'top',
        paddingLeft: '16px',
        left: '4px',
        top: '4px',
        height: '38px',
        fontSize: '14px',
      }}>
        <b>Durantion:</b>
        <input
          type="checkbox"
          checked={showMinTime}
          onChange={() => setShowMinTime(!showMinTime)}
          style={{ marginLeft: '30px' }}

        />
        greater then
        <div style={{ margin: '2px 6px 0 6px', border: '1px solid #aaa' }}>
          <input
            style={{ visibility: showMinTime ? 'visible' : 'hidden', width: '50px', border: 0, padding: '4px' }}
            type="number"
            value={minTime}
            disabled={false}
            onChange={(e) => { setMinTime(Number(e.target.value)) }}
          />
        </div>
        secs

        <input
          type="checkbox"
          checked={showMaxTime}
          onChange={() => setShowMaxTime(!showMaxTime)}
          style={{ marginLeft: '40px' }}
        />
        less then
        <div style={{ margin: '2px 6px 0 6px', border: '1px solid #aaa' }}>
          <input
            style={{ visibility: showMaxTime ? 'visible' : 'hidden', width: '50px', border: 0, padding: '4px' }}
            type="number"
            value={maxTime}
            disabled={false}
            onChange={(e) => { setMaxTime(Number(e.target.value)) }}
          />
        </div>
        secs

      </div>
      <Result>
        <div style={{ visibility: open ? 'hidden' : 'visible' }}>Click for Results</div>
        <div style={{ position: 'absolute', right: '20px', visibility: showTotal ? 'visible' : 'hidden', display: 'flex' }}>
          <button onClick={() => {console.log('AQIWQOIHWOQIHWOQ'); setOpen(!open)}} style={{ marginRight: '20px' }}>{ open? 'Close' : 'Open'}</button>
          <div>Total: {scenesFound?.length || 0}</div>
        </div>
      </Result>
      {open && (
        <ResulteData>
          {
            scenesFound && scenesFound.map((scene) => {
              const [episode, time, duration ] = scene.split(' ');
              const name = `${episode} ${time}`;
                if (showMinTime && parseInt(duration) < minTime) {
                  return null;
                }
                if (showMaxTime && parseInt(duration) > maxTime) {
                  return null;
                }
              // const [episode, time] = name.split(' ');
              console.log('==================================', minTime, maxTime);
              return (
                <Scene key={name} onClick={() => onOpenEpisode(name)}>
                  <b>{episode}</b> - {time} ({duration}s)
                </Scene>
              )
            })}
        </ResulteData>
      )}
    </Container>
  );
}
