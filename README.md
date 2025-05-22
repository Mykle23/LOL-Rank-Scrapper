# League Rank Scrapper

## Objetivos
  Pantalla para visualizar las cuentas de League of Legends, en la que se pueda ver el elo de cada cuenta, la region, el rol principal y los campeones mas jugados. La idea es poder tener una vista general de todas las cuentas y poder ver rapidamente en que liga se encuentran y si han jugado partidas recientemente.

Con un vistazo se debe de poder ver, todas las cuentas en una tabla, y poder distinguir rapidamente en que liga se encuentran division y LP, deben de poder ordenarse por lo menos por la liga, y la region.
Tambien se deben de ver lo campeones mas jugados y el rol principal que se juega con esa cuenta
Se deben de poder copiar los username y password de cada cuenta.

El proyecto tendra un backend y un frontend, el backend se encargara de obtener la informacion de las cuentas y el frontend se encargara de mostrar la informacion obtenida por el backend, tambien tendremos una base de datos donde se guardaran las cuentas y la informacion obtenida por el backend con express, en este caso con mongodb y mongoose.
## Requisitos frontend

Debe de contener un logo en la parte superior izquierda en el header

Luego tendremos una tabla, con la lista de las cuentas.

Cada registro tendra lo siguiente:
  - Un icono al principio. : El icono de la cuenta. Este icono estara dentro de un circulo que no sea muy resalton, y justo en la parte inferior del circulo debera aparecer el nivel de la cuenta en pequeño
  - El nickname de la cuenta y una etiqueta donde ira el hashtag
  - La region de la cuenta
  - Luego el elo, en esta parte se insertara una imagen de la liga siguedo con las letras de la division y entre parentesis los LP que tenga esa cuenta esa liga-division.
  - Habra dos iconos, que indicaran las posiciones mas jugadas, uno sera mas grande que otro(Top,Jungle,Mid,Adc,Support)
  - Tambien habra una checkbox que indicara si esta bloqueada o no la cuenta
  - username de la cuenta, debe aparecer un pequeño icono de copiar y cuando se le de click se copiara al portapapeles
  - password de la cuenta, debe aparecer un pequeño icono de copiar y cuando se le de click se copiara al portapapeles
  - Tambien aparecera como un calendario muy parecido al de github. Este calendario debera comprender los ultimos 4 meses los colores de cada dia tiene que ser de color gris y por defecto esto indica que no se ha jugado ningun partida ese dia. Tendra una leyenda justo debaja que indicara lo siguiente, el color de un dia puede ser de 4 tipos entre bueno y malo, si se ha ganado o perdido LP. En esta leyenda tambien se indica las horas jugandas en tdo el periodo comprendido y las partidas
  - Habra tambien un apartado donde se podra visualizar los 5 campeones mas jugados. Y si se despliega se podran ver todos los campeones con los que se ha jugando en esa cuenta, se visualizara solo con iconos en el desplegable


## Recursos
[blitz.gg](https://blitz.gg/lol/profile/EUW1/MarquesaFanAcc-EUW) layouts de liga.
[mobalytics.gg](https://mobalytics.gg/lol/profile/euw/marquesafanacc-euw/overview) Layout liga
