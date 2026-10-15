import { useState } from 'react'
import './App.css'

/* ---------- Contenido ---------- */

const PILARES = [
  {
    id: 'C',
    clase: 'c',
    nombre: 'Confidencialidad',
    pregunta: '¿Quién puede ver esta información?',
    definicion:
      'Garantiza que la información solo sea accesible para las personas, sistemas o procesos autorizados.',
    ejemplo:
      'Se filtra la base de datos de clientes de una tienda y sus correos y contraseñas terminan publicados en internet.',
    amenazas: [
      'Phishing e ingeniería social',
      'Robo o reutilización de contraseñas',
      'Interceptación del tráfico en redes inseguras',
      'Personal interno con más accesos de los necesarios',
    ],
    controles: [
      'Cifrado en tránsito y en reposo',
      'Autenticación multifactor (MFA)',
      'Principio de mínimo privilegio',
      'Clasificación de la información',
    ],
  },
  {
    id: 'I',
    clase: 'i',
    nombre: 'Integridad',
    pregunta: '¿Puedo confiar en que no fue alterada?',
    definicion:
      'Asegura que la información sea exacta y completa, y que nadie la modifique sin autorización.',
    ejemplo:
      'Un atacante cambia la cuenta de destino de una transferencia bancaria y el dinero llega a otra persona.',
    amenazas: [
      'Malware que altera archivos',
      'Inyección SQL y manipulación de datos',
      'Modificación de datos en tránsito (man-in-the-middle)',
      'Errores humanos al editar registros',
    ],
    controles: [
      'Funciones hash (por ejemplo SHA-256)',
      'Firmas digitales',
      'Control de versiones y registros de auditoría',
      'Validación de datos de entrada',
    ],
  },
  {
    id: 'A',
    clase: 'a',
    nombre: 'Disponibilidad',
    pregunta: '¿Puedo acceder cuando lo necesito?',
    definicion:
      'Garantiza que los sistemas y los datos estén operativos y accesibles para los usuarios autorizados cuando los necesitan.',
    ejemplo:
      'Un ataque DDoS satura el sitio de una tienda en plena campaña de ventas y nadie puede comprar.',
    amenazas: [
      'Ataques de denegación de servicio (DDoS)',
      'Ransomware que cifra los equipos',
      'Fallas de hardware o cortes de energía',
      'Desastres naturales y errores de configuración',
    ],
    controles: [
      'Copias de respaldo (regla 3-2-1)',
      'Redundancia y balanceo de carga',
      'Plan de recuperación ante desastres',
      'Monitoreo y actualizaciones al día',
    ],
  },
]

const ESCENARIOS = [
  {
    texto:
      'Una persona de Recursos Humanos envía por error la planilla de sueldos a toda la empresa.',
    correcta: 'C',
    porque:
      'La información llegó a personas que no estaban autorizadas a verla: se perdió la confidencialidad.',
  },
  {
    texto:
      'Un atacante cambia la cuenta de destino de una transferencia mientras viaja por la red.',
    correcta: 'I',
    porque:
      'Los datos fueron alterados sin autorización: se perdió la integridad.',
  },
  {
    texto:
      'Millones de peticiones falsas dejan fuera de servicio la web de una tienda en plena campaña de ventas.',
    correcta: 'A',
    porque:
      'El servicio dejó de estar accesible para quienes lo necesitaban: es un ataque de denegación de servicio contra la disponibilidad.',
  },
  {
    texto: 'Un estudiante entra al sistema académico y modifica sus propias notas.',
    correcta: 'I',
    porque:
      'Los registros ya no son fiables porque alguien los cambió sin permiso: se perdió la integridad.',
  },
  {
    texto:
      'Un correo falso engaña a un empleado y este entrega su contraseña corporativa.',
    correcta: 'C',
    porque:
      'Un tercero ahora puede acceder a información reservada: se compromete la confidencialidad.',
  },
]

/* ---------- Diagrama ---------- */

const POS = { C: { x: 200, y: 80 }, I: { x: 70, y: 310 }, A: { x: 330, y: 310 } }
const ETIQUETA = { C: { x: 200, y: 26 }, I: { x: 70, y: 382 }, A: { x: 330, y: 382 } }

function Triangulo({ activo, onSelect }) {
  return (
    <svg
      viewBox="0 0 400 396"
      className="triangulo"
      role="group"
      aria-label="Triángulo de la tríada CIA: confidencialidad, integridad y disponibilidad"
    >
      <polygon points="200,80 70,310 330,310" className="tri-forma" />
      <text x="200" y="228" className="centro">
        Seguridad de la
      </text>
      <text x="200" y="250" className="centro">
        información
      </text>

      {PILARES.map((p) => {
        const { x, y } = POS[p.id]
        const on = activo === p.id
        return (
          <g
            key={p.id}
            className={`nodo nodo-${p.clase}`}
            data-activo={on}
            role="button"
            tabIndex={0}
            aria-pressed={on}
            aria-label={p.nombre}
            onClick={() => onSelect(p.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onSelect(p.id)
              }
            }}
          >
            <circle cx={x} cy={y} r="46" className="anillo" />
            <circle cx={x} cy={y} r="34" className="disco" />
            <text x={x} y={y + 11} className="letra">
              {p.id}
            </text>
            <text x={ETIQUETA[p.id].x} y={ETIQUETA[p.id].y} className="etiqueta">
              {p.nombre}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

/* ---------- Panel de detalle ---------- */

function Detalle({ pilar, onSelect }) {
  return (
    <article className={`detalle detalle-${pilar.clase}`}>
      <div className="pestanas" role="tablist" aria-label="Elegir principio">
        {PILARES.map((p) => (
          <button
            key={p.id}
            role="tab"
            aria-selected={p.id === pilar.id}
            className={`pestana pestana-${p.clase}`}
            onClick={() => onSelect(p.id)}
          >
            {p.nombre}
          </button>
        ))}
      </div>

      <h2>{pilar.nombre}</h2>
      <p className="pregunta">{pilar.pregunta}</p>
      <p>{pilar.definicion}</p>

      <div className="caso">
        <h3>Cuando falla</h3>
        <p>{pilar.ejemplo}</p>
      </div>

      <div className="listas">
        <div>
          <h3>Qué lo amenaza</h3>
          <ul>
            {pilar.amenazas.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Cómo se protege</h3>
          <ul>
            {pilar.controles.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}

/* ---------- Quiz ---------- */

function Quiz() {
  const [indice, setIndice] = useState(0)
  const [elegida, setElegida] = useState(null)
  const [puntaje, setPuntaje] = useState(0)

  const terminado = indice >= ESCENARIOS.length
  const escenario = ESCENARIOS[indice]

  function responder(id) {
    if (elegida) return
    setElegida(id)
    if (id === escenario.correcta) setPuntaje((p) => p + 1)
  }

  function siguiente() {
    setElegida(null)
    setIndice((i) => i + 1)
  }

  function reiniciar() {
    setIndice(0)
    setElegida(null)
    setPuntaje(0)
  }

  return (
    <section className="quiz" aria-labelledby="titulo-quiz">
      <h2 id="titulo-quiz">Ponte a prueba</h2>
      <p className="intro">
        Lee cada situación y elige qué principio de la tríada se ve afectado.
      </p>

      {terminado ? (
        <div className="resultado">
          <p className="puntaje">
            {puntaje} de {ESCENARIOS.length} correctas
          </p>
          <p>
            {puntaje === ESCENARIOS.length
              ? 'Distingues muy bien los tres principios.'
              : 'Repasa el panel de cada principio e inténtalo de nuevo.'}
          </p>
          <button className="boton" onClick={reiniciar}>
            Volver a empezar
          </button>
        </div>
      ) : (
        <div>
          <p className="progreso">
            Situación {indice + 1} de {ESCENARIOS.length}
          </p>
          <p className="situacion">{escenario.texto}</p>

          <div className="opciones">
            {PILARES.map((p) => {
              let estado = ''
              if (elegida) {
                if (p.id === escenario.correcta) estado = 'correcta'
                else if (p.id === elegida) estado = 'incorrecta'
              }
              return (
                <button
                  key={p.id}
                  className={`opcion opcion-${p.clase} ${estado}`}
                  onClick={() => responder(p.id)}
                  disabled={Boolean(elegida) && estado === ''}
                >
                  {p.nombre}
                </button>
              )
            })}
          </div>

          <div role="status" className="feedback">
            {elegida && (
              <>
                <p>
                  <strong>
                    {elegida === escenario.correcta ? 'Correcto. ' : 'No exactamente. '}
                  </strong>
                  {escenario.porque}
                </p>
                <button className="boton" onClick={siguiente}>
                  {indice + 1 === ESCENARIOS.length ? 'Ver resultado' : 'Siguiente situación'}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

/* ---------- App ---------- */

export default function App() {
  const [activo, setActivo] = useState('C')
  const pilar = PILARES.find((p) => p.id === activo)

  return (
    <>
      <header className="cabecera">
        <h1>La tríada CIA</h1>
        <p className="bajada">
          Tres propiedades que debe cumplir la información para considerarse segura.
          Es la base de casi cualquier política de ciberseguridad.
        </p>
        <p className="nota">
          CIA viene del inglés <em>Confidentiality, Integrity, Availability</em>. En español
          también se conoce como CID. Toca un vértice del triángulo para explorarlo.
        </p>
      </header>

      <main>
        <section className="explorador" aria-label="Explorador de la tríada">
          <Triangulo activo={activo} onSelect={setActivo} />
          <Detalle pilar={pilar} onSelect={setActivo} />
        </section>

        <section className="tension" aria-labelledby="titulo-tension">
          <h2 id="titulo-tension">Los tres lados se tensan entre sí</h2>
          <p className="intro">
            Reforzar un principio suele costar algo en otro. Por eso la seguridad se
            diseña buscando equilibrio, no el máximo de cada uno.
          </p>
          <div className="tension-grid">
            <div>
              <h3>Más confidencialidad, menos disponibilidad</h3>
              <p>
                Cifrado fuerte, accesos restringidos y MFA protegen los datos, pero si se
                pierde una clave o falla el segundo factor, nadie puede entrar.
              </p>
            </div>
            <div>
              <h3>Más disponibilidad, más superficie de ataque</h3>
              <p>
                Replicar datos en varios servidores y regiones evita caídas, pero cada copia
                es un punto más que hay que proteger.
              </p>
            </div>
          </div>
        </section>

        <Quiz />
      </main>

      <footer className="pie">
        <p>
          Algunos modelos amplían la tríada con autenticidad y no repudio, pero CIA sigue
          siendo el punto de partida.
        </p>
        <p>
          Infografía educativa hecha con React y Vite ·{' '}
          <a href="https://info-guagian.vercel.app">info-guagian.vercel.app</a>
        </p>
      </footer>
    </>
  )
}
