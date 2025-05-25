import { gql } from '@apollo/client';

export const GET_USUARIOS = gql`
  query usuarios {
  usuarios {
    documentId
    nombre
    dni
    apellidos
    email
    telefono
    fechaNacimiento
  }
}
`;
