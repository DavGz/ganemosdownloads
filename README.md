# 🎰 Ganemos.net - Landing Page de Descargas & Acceso Administrativo

Landing page oficial para **Ganemos.net**, solución Whitelabel de **Apuestas Deportivas y Loterías**. Diseñada con interfaz moderna estilo casino/sportsbook en modo oscuro con gradientes dorados y rojos, animaciones fluidas y diseño 100% responsivo para cualquier dispositivo.

---

## 📁 Estructura del Proyecto

```
Landing ganemos/
│
├── index.html              # Página principal (HTML5 semántico y SEO)
├── README.md               # Documentación y guía del proyecto
├── .gitignore              # Archivo de ignorados para Git/GitHub
│
├── assets/
│   └── images/             # Logotipos y recursos de imagen oficial
│       ├── glogo.png
│       └── logolarge.png
│
├── css/
│   └── styles.css          # Sistema de diseño CSS, variables y breakpoints
│
├── js/
│   └── main.js             # Lógica interactiva, menú móvil, modal y QR
│
└── downloads/              # Carpeta para colocar los archivos de instalación reales
    ├── README.txt          # Guía de colocación de ejecutables
    ├── GanemosDesktop_Installer.exe  (Opcional)
    └── GanemosMobile_App.apk        (Opcional)
```

---

## ⚡ Características Principales

- **Diseño Ultra-Responsivo**: Adaptado perfectamente para navegadores de escritorio, tablets y smartphones de cualquier resolución (incluso pantallas de 320px o menos).
- **Menú Desplegable Móvil**: Navegación lateral limpia con icono hamburguesa en pantallas pequeñas.
- **Acceso Administrativo**: Botones de acción directa con apertura en nueva pestaña (`target="_blank"`) hacia el portal de gestión.
- **Generador de Código QR Integrado**: Renderizado dinámico de código QR en SVG para escaneo e instalación inmediata en celulares Android.
- **Centro de Descargas**: Modal interactivo de descarga e instructivo paso a paso para Windows (.exe) y Android (.apk).

---

## ⚙️ Configuración Rápidas

Puedes ajustar la URL del panel administrativo y las rutas de los archivos de descarga editando el objeto `CONFIG` al inicio del archivo `js/main.js`:

```javascript
const CONFIG = {
  // Enlace a tu panel de administración o login
  ADMIN_URL: 'http://admin.ganemos.net',

  // Rutas relativas o URLs externas para la descarga de ejecutables
  WINDOWS_EXE_PATH: 'downloads/GanemosDesktop_Installer.exe',
  ANDROID_APK_PATH: 'downloads/GanemosMobile_App.apk'
};
```

---

## 🚀 Pasos para Subir a GitHub

1. Abre tu terminal dentro de la carpeta del proyecto:
   ```bash
   cd "c:\xampp\htdocs\Landing ganemos"
   ```

2. Inicializa el repositorio Git:
   ```bash
   git init
   ```

3. Agrega todos los archivos preparados:
   ```bash
   git add .
   ```

4. Haz tu primer commit:
   ```bash
   git commit -m "Initial commit: Ganemos.net landing page"
   ```

5. Asocia tu repositorio remoto de GitHub y sube los cambios:
   ```bash
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/landing-ganemos.git
   git push -u origin main
   ```
