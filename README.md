# PROYECTO DENGUE

OBJETIVOS DEL PROYECTO

Objetivo General

Desarrollar un aplicativo web dirigido al personal de salud, que permita registrar y gestionar de forma sencilla, segura y eficiente los casos confirmados de dengue, incluyendo datos clínicos, demográficos, geográficos y temporales de los pacientes, con el fin de facilitar el seguimiento, análisis y visualización de patrones por ubicación y época del año, contribuyendo así a una mejor vigilancia epidemiológica.


Objetivos Específicos

-Desarrollar un formulario web interactivo para el registro de nuevos casos, que permita capturar información como: fecha del diagnóstico, síntomas presentados, edad, sexo y ubicación del paciente.

-Crear gráficas dinámicas que permitan identificar los departamentos y municipios con mayor número de casos confirmados de dengue.

-Establecer gráficas anuales que muestren la variación en el número de casos a lo largo del año, ayudando a detectar patrones estacionales y posibles brotes.


FUNCIONALIDAD EL PROGRAMA

este aplicativo web permite al personal de salud digitar los datos de los pacientes con casos de dengue confirmado y subirlos al servidor para aportar a las estadísticas de casos por departamento, municipio y época, los datos a solicitar son:

- el medico que dio que subio el diagnostico

-nombre

-apellidos

-edad

-identificación

-departamento

-municipio

-tipo de documento

-numero del documento

-sexo

-fecha del reporte

-clasificación

-observaciones diagnosticas

HERRAMIENTAS Y TECNOLOGIAS UTILIZADAS

Lenguaje de programación:
 
Python: Lenguaje principal usado para desarrollar la lógica del sistema y manejar los datos.

Framework de desarrollo web:

Django: Framework de alto nivel para desarrollar aplicaciones web robustas, seguras y escalables.

Manejo de datos y fechas:

pandas: Para manipular, filtrar y analizar grandes volúmenes de datos clínicos y estadísticos.

numpy: Para cálculos numéricos y análisis estadístico.

python-dateutil 2.9.0.post0 y pytz 2025.2: sirve para trabajar con fechas y zonas horarias

tzdata 2025.2: Base de datos de zonas horarias.

Visualización y procesamiento de consultas SQL:

sqlparse 0.5.3: Para el manejo interno de consultas SQL dentro de Django.

Soporte y compatibilidad:

asgiref 3.8.1: Utilizado por Django para manejar solicitudes asincrónicas.

typing_extensions 4.13.2: Para usar nuevas anotaciones de tipos en Python.

six 1.17.0: Para compatibilidad entre Python 2 y 3


CONCLUSION

-Este proyecto se desarrolló con el propósito de facilitar al personal de salud el ingreso y gestión de datos relacionados con casos confirmados de dengue, alimentando así una base de datos pública y accesible. Además, permite visualizar de forma gráfica y comprensible la distribución geográfica de los contagios por departamentos y municipios, así como identificar las épocas del año en las que se presenta un mayor aumento de casos. De esta manera, el aplicativo contribuye a una mejor vigilancia epidemiológica y toma de decisiones en el ámbito de la salud pública.