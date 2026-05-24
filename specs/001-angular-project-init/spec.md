# Feature Specification: Inicializar Proyecto Angular

**Feature Branch**: `001-angular-project-init`

**Created**: 2026-05-24

**Status**: Draft

**Input**: User description: "Lo primero va a ser iniciar el proyecto angular en este directorio"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Inicializar proyecto Angular desde CLI (Priority: P1)

El desarrollador quiere crear un proyecto Angular moderno en este directorio de trabajo
usando las herramientas de línea de comandos de Angular. El proyecto debe seguir las
convenciones modernas de Angular: componentes standalone, routing configurado y estilos SCSS.

**Why this priority**: Es el punto de partida obligatorio. Sin esta inicializacion, no
se puede continuar con ningun desarrollo de funcionalidades.

**Independent Test**: Ejecutar `ng serve` y verificar que la aplicacion carga correctamente
en el navegador en `http://localhost:4200` mostrando la pagina por defecto.

**Acceptance Scenarios**:

1. **Given** el directorio de trabajo con tooling configurado, **When** el desarrollador
   ejecuta el comando de scaffolding `ng new`, **Then** se crea un proyecto Angular con
   componentes standalone, routing habilitado y estilos SCSS configurados.

2. **Given** el proyecto Angular ha sido creado, **When** el desarrollador ejecuta
   `ng serve`, **Then** la aplicacion compila sin errores y se sirve en
   `http://localhost:4200`.

3. **Given** la aplicacion esta corriendo, **When** el desarrollador abre el navegador
   en `http://localhost:4200`, **Then** se muestra la pagina de bienvenida por defecto
   de Angular.

---

### User Story 2 - Estructura base del proyecto (Priority: P2)

El desarrollador necesita verificar que la estructura generada sigue las convenciones
establecidas: TypeScript en modo estricto, uso de signals para reactividad, y
configuracion de testing funcional.

**Why this priority**: La estructura correcta es necesaria antes de comenzar a escribir
codigo de aplicacion, pero puede verificarse despues del scaffolding inicial.

**Independent Test**: Revisar `angular.json`, `tsconfig.json` y ejecutar `ng test`
para confirmar que la configuracion de testing funciona.

**Acceptance Scenarios**:

1. **Given** el proyecto ha sido creado, **When** el desarrollador revisa la configuracion
   de TypeScript, **Then** el modo estricto (`strict: true`) esta habilitado.

2. **Given** el proyecto ha sido creado, **When** el desarrollador ejecuta `ng test`,
   **Then** los tests por defecto se ejecutan y pasan sin errores.

3. **Given** el proyecto ha sido creado, **When** el desarrollador ejecuta `ng build`,
   **Then** el proyecto compila correctamente sin warnings ni errores.

---

### Edge Cases

- Que ocurre si `@angular/cli` no esta instalado globalmente? La herramienta debe
  detectarlo e indicar al usuario como instalarlo.
- Que ocurre si ya existe un `package.json` o carpeta `src/` en el directorio? El
  scaffolding debe alertar al usuario y evitar sobrescribir archivos existentes.
- Que ocurre si el directorio no tiene permisos de escritura?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: El sistema DEBE crear un proyecto Angular usando el CLI oficial
  de Angular (`ng new`) con los flags `--standalone`, `--routing` y `--style=scss`.
- **FR-002**: El proyecto creado DEBE usar componentes standalone como arquitectura
  por defecto (sin NgModules para componentes y directivas).
- **FR-003**: El proyecto DEBE tener el enrutador configurado y funcional desde el
  inicio.
- **FR-004**: El proyecto DEBE usar SCSS como preprocesador de estilos por defecto.
- **FR-005**: El proyecto DEBE incluir configuracion de testing funcional lista para
  ejecutar (`ng test` funciona sin configuracion adicional).
- **FR-006**: La configuracion de TypeScript DEBE habilitar el modo estricto
  (`strict: true` en `tsconfig.json`).
- **FR-007**: El proyecto DEBE poder compilarse (`ng build`) y servirse en modo
  desarrollo (`ng serve`) sin errores.

### Key Entities

- **Proyecto Angular**: La estructura raiz generada que contiene `angular.json`,
  `package.json`, `tsconfig.json`, carpeta `src/` con el codigo fuente inicial.
- **Componente App**: El componente raiz (`app.component.ts`) generado como standalone
  que sirve como punto de entrada visual de la aplicacion.
- **Configuracion de Rutas**: El archivo `app.routes.ts` que define el enrutamiento
  inicial de la aplicacion.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: La aplicacion se inicia y se sirve en el navegador en menos de 30
  segundos tras ejecutar `ng serve` por primera vez.
- **SC-002**: El comando `ng build` completa la compilacion sin errores ni warnings.
- **SC-003**: El comando `ng test` ejecuta los tests por defecto y todos pasan.
- **SC-004**: La pagina de bienvenida por defecto de Angular se renderiza
  correctamente en el navegador.

## Assumptions

- El desarrollador tiene Node.js y npm instalados en versiones compatibles con la
  version mas reciente de Angular.
- El directorio de trabajo tiene permisos de escritura y no contiene una aplicacion
  Angular previa que pueda entrar en conflicto.
- Se usa la version mas reciente estable de Angular CLI disponible en el momento
  de ejecucion.
- La configuracion de red local permite que el servidor de desarrollo se ejecute
  en el puerto 4200.
- El proyecto se nombra `opencode_angular` (nombre del repositorio/directorio raiz)
  segun la configuracion existente.

## Dependencies

- Angular CLI (`@angular/cli`) — debe estar disponible via `npx` o instalado
  globalmente.
- Node.js y npm — requeridos por Angular CLI para descargar dependencias y compilar.
- El skill `angular-new-app` debe cargarse antes de ejecutar el scaffolding para
  seguir las guias de configuracion moderna de Angular.
