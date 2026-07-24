Coloca tus archivos instaladores reales en esta carpeta:

1. Instalador para Windows:
   Nombre del archivo: GanemosDesktop_Installer.exe
   Ruta: c:\xampp\htdocs\Landing ganemos\downloads\GanemosDesktop_Installer.exe

2. Aplicación para Celulares Android:
   Nombre del archivo: GanemosMobile_App.apk
   Ruta: c:\xampp\htdocs\Landing ganemos\downloads\GanemosMobile_App.apk

Nota: Si deseas modificar el nombre de los archivos o usar enlaces externos (servidores de descarga/CDN), puedes editar directamente la constante CONFIG en el archivo js/main.js:

const CONFIG = {
  ADMIN_URL: 'TU_URL_DEL_PANEL_ADMIN',
  WINDOWS_EXE_PATH: 'downloads/GanemosDesktop_Installer.exe',
  ANDROID_APK_PATH: 'downloads/GanemosMobile_App.apk'
};
