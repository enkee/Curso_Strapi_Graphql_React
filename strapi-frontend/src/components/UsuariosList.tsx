import { Container, Typography, CircularProgress, Card, CardContent } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_USUARIOS } from '../graphql/queries/getUsuarios';


export default function UsuariosList() {
  const { data, loading, error } = useQuery(GET_USUARIOS);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error al cargar los usuarios</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Lista de Usuarios
      </Typography>
      {data.usuarios.map((usu: any) => (
        <Card key={usu.documentId} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{usu.nombre}</Typography>
            <Typography variant="h6">{usu.apellidos}</Typography>
            <Typography variant="body2">{usu.email}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}
