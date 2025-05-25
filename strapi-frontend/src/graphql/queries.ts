import { gql } from '@apollo/client';

export const GET_ESPECIALIDADES_CON_MODULOS = gql`
  query {
    especialidades {
      data {
        id
        attributes {
          nombre
          modulos {
            data {
              id
              attributes {
                nombre
                descripcion
                duracionHoras
              }
            }
          }
        }
      }
    }
  }
`;
