# La tríada CIA: infografía interactiva

Infografía web sobre la **tríada CIA** de la ciberseguridad, creada como aplicación en React y publicada en Vercel.

## Enlace a la aplicación

**https://info-guagian.vercel.app**

## Datos del trabajo

| | |
|---|---|
| **Autor/a** | [Giancarlo Guarda] |
|**Profesor/a** | [Ruben Schnettler] |
| **Fecha** | [15-10-26] |

## ¿Qué es la tríada CIA?

Es un modelo que define las tres propiedades que debe cumplir la información para considerarse segura. Su nombre viene del inglés *Confidentiality, Integrity, Availability*; en español también se conoce como CID.

| Principio | Idea central | Ejemplo de fallo |
|---|---|---|
| **Confidencialidad** | Solo las personas autorizadas acceden a la información. | Se filtra una base de datos de clientes. |
| **Integridad** | La información es exacta y no se modifica sin autorización. | Un atacante cambia la cuenta de destino de una transferencia. |
| **Disponibilidad** | Los sistemas y datos están accesibles cuando se necesitan. | Un ataque DDoS deja fuera de servicio un sitio web. |

Los tres principios se tensan entre sí: reforzar uno suele costar algo en otro (por ejemplo, un cifrado muy estricto puede dificultar el acceso). Por eso la seguridad busca equilibrio.

## Contenido de la aplicación

- **Triángulo interactivo:** al tocar cada vértice se muestra la definición, la pregunta clave, un caso en que falla, las amenazas y los controles de protección.
- **Sección de tensiones:** cómo se relacionan y se limitan los tres principios.
- **Quiz:** cinco situaciones para identificar qué principio se vulnera.

## Tecnologías utilizadas

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [Vercel](https://vercel.com/) para el despliegue

## Cómo ejecutarlo en local

```bash
npm install
npm run dev
```

Después abre la dirección que aparece en la terminal (normalmente `http://localhost:5173`).

Para generar la versión de producción:

```bash
npm run build
```

## Estructura principal

```
src/
├── App.jsx     # contenido y componentes de la infografía
├── App.css     # estilos de la infografía
├── index.css   # estilos globales y tipografías
└── main.jsx    # punto de entrada de React
```

## Referencias

- [Resumen de la tríada CIA, NIST Computer Security Resource Center](https://csrc.nist.gov/glossary/term/confidentiality)
- [ISO/IEC 27001: gestión de la seguridad de la información](https://www.iso.org/standard/27001)