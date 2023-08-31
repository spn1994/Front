import { Container } from "./styles";
/* rest faz pegar todas propiedades, se n for informado loading é falso */
export function Button({ title, loading = false, ...rest }){

  return(
  <Container 
    type="button"
    $disable={loading.toString()}
    {...rest}
    >
    { loading ? 'Carregando...' : title }
  </Container>
  );
}