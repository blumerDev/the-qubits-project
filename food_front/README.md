# Food Front - React App

## 📁 Estructura del Proyecto

```
src/
├── components/           # Componentes reutilizables
│   ├── layout/          # Componentes de estructura
│   │   ├── Layout.js    # Layout principal de la app
│   │   ├── Header.js    # Header con navegación
│   │   └── Sidebar.js   # Menú lateral
│   ├── common/          # Componentes comunes
│   └── ui/              # Componentes de UI básicos
├── pages/               # Páginas/Vistas de la aplicación
│   └── HomePage.js      # Página principal
├── styles/              # Sistema de estilos
│   ├── base/           # Estilos base y variables
│   ├── components/     # Estilos específicos de componentes
│   ├── utils/          # Utilidades CSS
│   └── main.css        # Punto de entrada de estilos
├── hooks/              # Custom hooks de React
├── utils/              # Funciones utilitarias
└── assets/             # Recursos estáticos
```

## 🎨 Sistema de Estilos

### Variables CSS
- **Colores**: Paleta consistente con variables CSS
- **Tipografía**: Tamaños y familias tipográficas estándar
- **Espaciado**: Sistema de espaciado uniforme
- **Z-index**: Gestión de capas organizadas

### Utilidades CSS
Clases utilitarias para desarrollo rápido:
- Espaciado: `.m-{size}`, `.p-{size}`
- Flexbox: `.flex`, `.justify-center`, `.items-center`
- Texto: `.text-{size}`, `.text-{color}`
- Grid: `.grid`, `.grid-cols-{n}`

## 🏗️ Arquitectura de Componentes

### Layout System
- **Layout**: Contenedor principal con sidebar y header
- **Header**: Navegación superior con menú hamburguesa
- **Sidebar**: Menú lateral colapsible

### Pages vs Components
- **Pages**: Vistas completas de la aplicación
- **Components**: Elementos reutilizables y modulares

## 🚀 Comandos

```bash
npm start    # Desarrollo
npm build    # Producción
npm test     # Testing
```

## 📱 Responsive Design
- Diseño mobile-first
- Breakpoints: 768px (tablet), 1024px (desktop)
- Sidebar colapsible en móvil

## 🔧 Convenciones

### Naming
- **Archivos**: PascalCase para componentes (`HomePage.js`)
- **CSS Classes**: BEM methodology (`.component__element--modifier`)
- **CSS Variables**: kebab-case (`--primary-color`)

### Estructura de Archivos
- Cada componente en su directorio con `.js` y `.css`
- Importación de estilos junto al componente
- Variables CSS centralizadas en `styles/base/`



