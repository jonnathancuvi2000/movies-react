
import '../App.css';
import Pelicula from './Pelicula';
import PageWrapper from './PageWrapper';
import PeliculaJson from '../peliculas.json';
import Paginacion from './Paginacion';
import { useState } from 'react';



function ListadoPeliculas() {

  const [paginaAtual, setPaginaActual] = useState(1);
  const TOTAL_POR_PAGINA = 7;

  let peliculas = PeliculaJson;

  // para obtener las pelicuals de un elnace en la nuve pero no funciono y no voy a probar todo (minuto 2:38 del video)
  const buscarPeliculas = async () => {
    let url = 'https://lucasmoy.dev/data/react/peliculas.json';

    var respuesta = await fetch(url, {
      "method": 'GET',
      "headers": {
        "Accept": 'application/json',
        "Content-Type": 'application/json',
      }
    });
    let json = await respuesta.json();
    alert (json);

  }
  // buscarPeliculas();
  
  const getTotalPaginas = () => {
    let cantitdadTotalPeliculas = PeliculaJson.length;
    return Math.ceil(cantitdadTotalPeliculas / TOTAL_POR_PAGINA);
  }


  let peliculasPorPagina = peliculas = peliculas.slice(
    (paginaAtual - 1) * TOTAL_POR_PAGINA,
    paginaAtual * TOTAL_POR_PAGINA
  );

  return (
    <PageWrapper>
      {peliculasPorPagina.map(pelicula =>
        <Pelicula titulo={pelicula.titulo} calificacion={pelicula.calificacion}
          director={pelicula.director} actores={pelicula.actores}
          fecha={pelicula.fecha} duracion={pelicula.duracion}
          img={pelicula.img}>
          {pelicula.descripcion}
        </Pelicula>
      )}

      <Paginacion pagina={paginaAtual} total={getTotalPaginas()} onChange={(pagina) => {
        setPaginaActual(pagina)
      }} />

    </PageWrapper>

  );
}

export default ListadoPeliculas;
