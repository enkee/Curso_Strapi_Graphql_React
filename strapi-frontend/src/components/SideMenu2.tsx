import { useQuery } from '@apollo/client';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { GET_ESPECIALIDADES_CON_MODULOS } from '../graphql/queries';

export default function SideMenu() {
  const { data, loading, error } = useQuery(GET_ESPECIALIDADES_CON_MODULOS);

  if (loading) return <p>Cargando menú...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        MÓDULOS
      </Typography>

      {data.especialidades.data.map((esp: any) => (
        <Accordion key={esp.id}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{esp.attributes.nombre}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              {esp.attributes.modulos.data.map((modulo: any) => (
                <ListItem key={modulo.id}>
                  {modulo.attributes.nombre}
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
