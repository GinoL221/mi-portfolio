---
name: Portfolio de Gino Lencina
description: Portfolio profesional con una primera pantalla en azul profundo y neutros.
colors:
  hero-light: "#f4f6fa"
  hero-dark: "#101c2c"
typography:
  body:
    fontFamily: "Onest Variable, system-ui, sans-serif"
---

# Design System: Portfolio de Gino Lencina

## Overview

**Creative North Star: "Portfolio profesional claro"**

La dirección acordada es sobria y cercana: la presentación personal y la evidencia de los proyectos tienen prioridad sobre la decoración. El proyecto destacado relaciona sus tecnologías con una decisión técnica y permite profundizar en el caso de estudio.

La paleta azul y neutra se aplica a la primera pantalla y a los acentos de navegación, proyectos, experiencia, educación, certificaciones, Sobre mí y enlaces del pie. Se conservan los fondos y estilos que no se describen aquí; esto no implica una remodelación visual completa.

**Key Characteristics:**
- Presentación personal y foto visibles.
- Proyecto destacado vinculado a una decisión técnica real.
- Opciones de tema claro y oscuro.
- Controles discretos y sombras puntuales.

## Colors

La primera pantalla usa fondos neutros claros y azul profundo oscuro. Los acentos principales son `#1e40af` en tema claro y `#93c5fd` en tema oscuro. Los fondos de las tarjetas y secciones conservan sus estilos existentes.

Las fechas y textos secundarios usan neutros con contraste suficiente. Los estados informativos de Educación usan los acentos azules sin cambiar su contenido.

## Typography

Onest Variable es la fuente principal, con `system-ui` y `sans-serif` como alternativas. El título visible es el nombre. El rol aparece una sola vez, debajo, con más peso que el texto descriptivo. El título de la pestaña conserva la barra. El proyecto destacado emplea un título secundario y texto de apoyo.

## Layout

La primera pantalla usa una columna en móvil y dos desde el breakpoint `md` de Tailwind. El perfil, los enlaces de contacto y el proyecto destacado permanecen en orden de lectura lógico. La barra de navegación puede ocupar más de una fila cuando el ancho es reducido. Las páginas de detalle y 404 reservan espacio superior para la navegación fija, de modo que el contenido de retorno no quede debajo de la barra.

## Elevation & Depth

El proyecto destacado usa una sombra suave y borde para separarse del fondo. Las etiquetas y enlaces de contacto mantienen un tratamiento contenido.

## Shapes

La foto y las etiquetas son redondeadas; el panel de la primera pantalla y la tarjeta del proyecto tienen esquinas redondeadas. Las tecnologías y la decisión técnica se separan con el borde de esa sección, sin una línea colgante.

## Components

### Navegación

Barra fija con enlaces en el mismo orden de lectura de la página: Inicio, Proyectos, Experiencia, Educación, Habilidades, Certificaciones y Sobre mí. Contacto queda al final porque abre el correo y no es una sección. Incluye el control de tema. En móvil los elementos se distribuyen en varias filas en lugar de quedar recortados. Una superficie sólida separa la barra del contenido en móvil y escritorio; en móvil conserva contorno y sombra suaves. Los enlaces y el control comparten un acento de interacción: azul `#1e40af` en tema claro y azul `#93c5fd` en tema oscuro; el enlace de la sección activa usa el mismo acento. Los enlaces conservan un foco visible al navegar con teclado. Si el sistema pide menos movimiento, la barra no cambia de forma al desplazar y las transiciones decorativas quedan quietas.

### Experiencia

La línea temporal mantiene la información laboral legible en ambos temas. Los cargos usan el acento azul de la navegación (`#1e40af` en claro y `#93c5fd` en oscuro); las fechas usan neutros con contraste suficiente.

### Educación

Las fechas usan tonos neutros legibles; los estados informativos usan el azul de la paleta (`#1e40af` en claro y `#93c5fd` en oscuro), sin cambiar el contenido del estado.

### Certificaciones

Las fechas usan neutros con contraste suficiente para leerse junto a los nombres e instituciones en ambos temas.

### Sobre mí

Los fragmentos destacados usan el acento azul (`#1e40af` en claro y `#93c5fd` en oscuro). El detalle detrás de la foto conserva un neutro en claro y usa un matiz azul sutil en oscuro.

### Proyecto destacado

En la lista, el caso con decisión técnica conserva la presentación completa. Los demás proyectos quedan en un grupo secundario, sin captura, para no competir con esa evidencia. El destacado presenta el nombre, una descripción, tecnologías, una decisión técnica y un enlace al caso de estudio. Se muestra si el proyecto existe, no está en borrador y tiene una descripción breve del caso. El enlace destacado y los botones de proyectos usan un contorno de foco de 2 px, separado 2 px, azul `#1e40af` en claro y `#93c5fd` en oscuro. Esos controles, las pastillas de contacto y los enlaces sueltos del pie miden al menos 44 px. El nombre dentro de la frase de copyright queda en línea.

### Acciones de retorno

Los enlaces «Volver a proyectos» del caso de estudio y «Volver al inicio» de 404 usan un contorno de foco de 2 px, separado 2 px, en el acento azul del tema: `#1e40af` en claro y `#93c5fd` en oscuro.

### Contacto y etiquetas

Los enlaces a perfiles y correo se muestran como controles redondeados, con hover de inversión neutra y foco de teclado azul: `#1e40af` en tema claro y `#93c5fd` en tema oscuro. Los enlaces del pie mantienen el subrayado y usan los mismos acentos azules al pasar el cursor. El pie hereda el fondo continuo de la página, sin una superficie independiente, y conserva una separación breve del contenido anterior. En móvil, los enlaces Inicio y Contacto se centran sobre el copyright, también centrado; en escritorio el copyright queda a la izquierda y los enlaces a la derecha. La legibilidad se define en los colores del texto, no con opacidad sobre todo el contenedor. Las tecnologías aparecen como etiquetas informativas, no como filtros interactivos. En la lista de Proyectos, su estado hover usa el mismo acento azul de la navegación en cada tema; las etiquetas de otras secciones conservan sus estilos propios.

## Do's and Don'ts

### Do
- Mantener legibles el perfil, los proyectos y sus enlaces en móvil y escritorio.
- Conservar ambos temas y mostrar decisiones técnicas respaldadas por contenido real.
- Verificar la navegación por teclado y el contraste antes de cerrar cambios visuales.

### Don't
- No añadir decoración que distraiga del contenido.
- No presentar una captura o una revisión manual puntual como una auditoría completa de accesibilidad.
