import { Container } from "./styles";

export function Section({title, children}) {
  return (
    <Container>
      {/* children foi passado tudo apos title */}
      <h2>{ title }</h2>
      {children}
    </Container>
  );
}