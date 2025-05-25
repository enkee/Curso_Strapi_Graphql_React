import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    List,
    ListItem,
    Typography,
  } from '@mui/material';
  import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
  import { useEffect, useState } from 'react';
  
  type Modulo = {
    id: number;
    nombre: string;
    descripcion?: string;
    duracionHoras?: number;
  };
  
  type Especialidad = {
    id: number;
    nombre: string;
    modulos: Modulo[];
  };
  
  export default function SideMenu() {
    const [data, setData] = useState<Especialidad[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch('/data/menu.json');
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const json = await res.json();
          setData(json);
        } catch (err: any) {
          console.error('Error al cargar el menú:', err);
          setError('No se pudo cargar el menú');
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    if (loading) return <p>Cargando menú...</p>;
    if (error) return <p>{error}</p>;
  
    return (
      <div>
        <Typography variant="h6" gutterBottom>
          MÓDULOS
        </Typography>
  
        {data.map((esp) => (
          <Accordion key={esp.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{esp.nombre}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List dense>
                {esp.modulos.map((modulo) => (
                  <ListItem key={modulo.id}>{modulo.nombre}</ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    );
  }
  