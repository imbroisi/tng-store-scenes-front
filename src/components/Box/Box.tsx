import { Container } from './Box.styles';

export interface BoxProps {
  children: React.ReactNode;
}

export default function Box({ children }: BoxProps) {
  return (
    <Container>
      {children}
    </Container>
  );
}
