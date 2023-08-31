import { Container } from './styles';
/* passei propiedade icone para ele, passei propieda em minusculo */
export function Input({icon: Icon,...rest }){
  return(
    <Container>
      {/* && faz com q mostra icone se existir */}
      {Icon && <Icon size={20} />}
      <input {...rest}/>
    </Container>
  )
}