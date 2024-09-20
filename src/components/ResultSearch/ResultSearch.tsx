import { useEffect, useState } from 'react';
import { Container, Result, ResulteData, Scene } from './ResultSearch.styles';

export interface ResultSearchProps {
  scenesFound: string[] | null
}

export default function ResultSearch({ scenesFound }: ResultSearchProps) {
  const [open, setOpen] = useState(false);
  const [showTotal, setShowTotal] = useState(true);

  useEffect(() => {
    if (scenesFound && scenesFound.length > 0) {
      setOpen(true);
    } else {
      setShowTotal(false);
      setTimeout(() => {
        setShowTotal(true);
      }, 500);
    }

  },[scenesFound]);

  return (
    <Container>
      <Result onClick={() => setOpen(!open)}>
        <div>Click for Results</div>
        <div style={{ position: 'absolute', right: '20px', visibility: showTotal ? 'visible' : 'hidden'}}>
          Total: {scenesFound?.length || 0}
        </div>
      </Result>
      {open && (
        <ResulteData>
          {
            scenesFound && scenesFound.map((scene) => (
              <Scene key={scene}>
                {scene}
              </Scene>
          ))}
        </ResulteData>
      )}
    </Container>
  );
}
