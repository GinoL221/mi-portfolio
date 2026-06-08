---
title: "Dental Clinic - Sistema de Gestión Full Stack"
description: "Sistema integral para la gestión de clínicas dentales con Java, Spring Boot y React. Backend con arquitectura MVC, Spring Security y JWT. Frontend con gestión de turnos, pacientes y odontólogos. Entregado con TDD, auditoría de código muerto y PRs encadenados."
link: "https://github.com/GinoL221/Dental-Clinic"
github: "https://github.com/GinoL221/Dental-Clinic"
image: "home-dental-clinic.webp"
order: 1
tags:
  - java
  - springboot
  - react
  - mysql
  - jwt
tagline: "Cómo encontré un eval() sobre HTML del servidor en el flujo de login y lo rediseñé limpio."
metrics:
  - label: "eval() eliminados"
    value: "0"
  - label: "Tests en main"
    value: "37"
  - label: "Bugs corregidos"
    value: "5"
  - label: "Archivos de código muerto eliminados"
    value: "7"
---

## El problema

Durante una auditoría sistemática del frontend de Dental Clinic encontré que el flujo de login ejecutaba `eval()` sobre HTML crudo devuelto por el servidor. No era un code smell abstracto: cualquier respuesta maliciosa o manipulada ejecutaría JavaScript arbitrario en el navegador del usuario.

El problema de raíz era un contrato implícito entre backend y frontend: el servidor devolvía HTML que el cliente interpretaba como código. Sin un contrato explícito de datos, agregar validación o tests era imposible sin antes rediseñar la comunicación.

## El enfoque

Reemplacé el contrato implícito por un contrato JSON explícito: el backend devuelve datos estructurados, el frontend los renderiza. Sin intermediarios ejecutables.

Apliqué TDD (RED→GREEN) para cada pieza del rediseño: primero el test que falla por la razón correcta, después el código mínimo que lo hace pasar. Esto convirtió cada decisión de diseño en un caso de prueba verificable.

La auditoría de código muerto fue sistemática: cada archivo candidato se verificó con `rg` antes de eliminarlo. Nada se borró por intuición.

La entrega siguió la misma disciplina: PRs encadenados con slices revisables, donde cada PR tiene un inicio claro, un fin verificado y un rollback razonable. La misma práctica que este case study está usando.

## El resultado

El `eval()` quedó en cero. El contrato entre backend y frontend es ahora explícito, tipado y testeable.

37 tests pasan en main. 5 bugs de runtime (TypeError, ReferenceError) fueron corregidos en el proceso. 7 archivos de código muerto fueron eliminados — cada uno verificado antes de borrarlo.

El resultado no es solo un repo más limpio. Es evidencia de un proceso: encontré algo raro, entendí por qué importaba, lo rediseñé con un criterio claro, lo probé y lo entregué en piezas revisables.
