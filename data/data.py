# Python code to illustrate
# inserting data in MongoDB
from pymongo import MongoClient
import uuid
import os

try:
	conn = MongoClient("mongodb://SergioArroni:julio321@mongo:27017/DeDesktop?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false")
	print("Connected successfully!!!")
except:
	print("Could not connect to MongoDB")

# database
db = conn.DeDesktop

prod1_id = str(uuid.uuid4())
prod2_id = str(uuid.uuid4())
prod3_id = str(uuid.uuid4())
prod4_id = str(uuid.uuid4())
prod5_id = str(uuid.uuid4())
prod6_id = str(uuid.uuid4())
prod7_id = str(uuid.uuid4())
prod8_id = str(uuid.uuid4())
prod9_id = str(uuid.uuid4())
prod10_id = str(uuid.uuid4())
prod11_id = str(uuid.uuid4())
prod12_id = str(uuid.uuid4())
prod13_id = str(uuid.uuid4())
prod14_id = str(uuid.uuid4())
prod15_id = str(uuid.uuid4())
prod16_id = str(uuid.uuid4())
prod17_id = str(uuid.uuid4())
prod18_id = str(uuid.uuid4())
prod19_id = str(uuid.uuid4())
prod20_id = str(uuid.uuid4())
prod21_id = str(uuid.uuid4())
prod22_id = str(uuid.uuid4())
prod23_id = str(uuid.uuid4())
prod24_id = str(uuid.uuid4())
prod25_id = str(uuid.uuid4())
prod26_id = str(uuid.uuid4())
dc1_id = str(uuid.uuid4())
dc2_id = str(uuid.uuid4())

# Created or Switched to collection names: my_gfg_collection
collection = db.product

prod1 = {
		"id": prod1_id,
		"name":"Samsung Galaxy Book2",
		"description":"Características:\n\nImpulsado por la plataforma Intel® Evo™ más avanzada: Galaxy Book2 Pro maneja con facilidad las cargas intensas de trabajo informático gracias a un procesador Intel® Core™ de 12ª generación, construido sobre la nueva arquitectura de núcleo híbrido. Junto con un SSD rápido, una solución de mejora LPDDR5 y un avanzado sistema de refrigeración, puede hasta con las cargas de trabajo más intensas.\n\nMantente seguro: El Galaxy Book2 Pro está diseñado para proteger tu privacidad, manteniendo la información crítica en secreto hasta el nivel del firmware, con características basadas en el hardware. Controla tu información personal sin preocupaciones con Galaxy Book2 Pro.\n\nAcelera con Wi-Fi 6E: Acelera tus datos con la conectividad WiFi 6E. Experimentarás velocidades de datos ultrarrápidas con la banda adicional de 6GHz y la latencia superbaja que necesitas para un rendimiento increíble.\n\nEspecificaciones\n- Procesador/ Chipset Intel 12th Gen (Intel EVO™) i7 1260P\n- Pantalla 15.6” FHD AMOLED\n- Almacenamiento 512GB NVMe SSD\n- Gráficos Intel® Iris® X\n-Wi-Fi 6E (Gig+)\n- Batería 63Wh, carga USB-C 65W\n- Dimensiones (ancho x profundidad x alto) 355.4×225.8×11.7mm\n- Peso 1.05kg",
		"price":1548,
		"category":"Laptop",
		"urlPhoto":"https://res.cloudinary.com/dedesktop/image/upload/v1651412131/Productos/1719-samsung-galaxy-book2-pro-intel-core-i7-1260p-16gb-512gb-ssd-156_eravyk.webp",
		}
prod2 = {
		"id": prod2_id,
		"name":"Lenovo V14 G2 ITL",
		"description":"Características\n\nProductividad y seguridad mejoradas: El módulo de plataforma segura (TPM) 2.0 (firmware)—mantiene el trabajo resultante seguro mediante el cifrado de datos y contraseñas.\n\nEstilo visual: El diseño contemporáneo de este elegante portátil negro le da un aspecto y una sensación de primera calidad. En especial, la cubierta opcional de laminado en molde (IMR) con líneas texturizadas y su cuerpo fino se adapta a tus viajes cuando estás fuera de la oficina. La pantalla opcional FHD con resolución 1920x1080 de 35,56 cm (14”), ahora con marcos laterales más estrechos para una mejor experiencia visual, muestra colores maravillosos y aporta claridad a los vídeos, imágenes y texto.\n\nFiabilidad extrema: Hemos sometido este portátil a pruebas de fiabilidad y durabilidad en ocho condiciones extremas: prueba de coche, prueba de vibración, prueba de teclado dentro del sistema, prueba de vida de las bisagras, prueba de fiabilidad del ventilador, prueba de desgaste del panel, prueba de temperatura de funcionamiento y prueba de presión. Está preparado para cualquier circunstancia a la que pueda verse sometido en tu negocio.\n\nAsistencia organizativa: Comienza con Windows 10, que incluye el asistente personal Cortana. No tendrás que andar buscando documentos, fotos o reuniones; deja que Cortana se encargue de ello. Si integras Cortana con el calendario, podrás buscar archivos por fecha y participantes, en lugar de tener que recordar el nombre de cada archivo.\n\nEspecificaciones\n- Procesador Intel Core i5-1135G7 (4C / 8T, 2.4 / 4.2GHz, 8MB)\n- Memoria RAM 4GB Soldered DDR4-3200 + 4GB SO-DIMM DDR4-3200\n- Almacenamiento 256GB SSD M.2 2242 PCIe 3.0x4 NVMe\n- Unidad óptica No\n- Display 14” FHD (1920x1080) TN 220nits Anti-glare\n- Controlador gráfico Integrada Intel Iris Xe Graphics\n- Cámara de portátil 720p con tapa de privacidad\n- Micrófono Sí, Mono\n- Batería Integrada Ión de Litio 38 Wh\n- Sistema operativo Windows 10 Home 64 bits\n- Dimensiones (Ancho x Profundidad x Altura) 324.2 x 215.2 x 19.9 mm\n- Peso 1,6 kg\n- Color Negro",
        "price":538.99,
		"category":"Laptop",
		"urlPhoto":"https://res.cloudinary.com/dedesktop/image/upload/v1651418687/Productos/1211-lenovo-v14-g2-itl-intel-core-i5-1135g7-8-gb-256gb-ssd-14_ygf2ti.webp",
		}
prod3 = {
		"id": prod3_id,
		"name":"MSI GF63 Thin",
		"description":"Características\n\nEquipa el último procesador Intel® Core ™ i7 de undécima generación, aumenta el rendimiento hasta en un 40./. con respecto a la generación anterior. Consiga una mayor potencia con este procesador de 8 núcleos que admite una frecuencia de doble núcleo de hasta 4,6 GHz para maximizar la eficiencia en el juego, el trabajo multitarea y la productividad.\n\nEspecificaciones\n- Procesador Intel Core Tiger Lake i7-11800H+HM570\n- Memoria RAM DDR IV 8GB*2 (3200MHz)\n- Almacenamiento 512GB NVMe PCIe Gen3x4 SSD (new)\n- Unidad óptica No dispone\n- Display 15.6” FHD (1920*1080), 144Hz 72%NTSC IPS-Level\n- Controlador gráfico RTX3050 Ti Max-Q, GDDR6 4GB\n- Webcam HD (30fps a 720p)\n- Micrófono Sí\n- Batería 51 Wh\n- Teclado Retroiluminado en rojo\n- Dimensiones (Ancho x Profundidad x Altura) 359 x 254 x 21.7 mm\n- Peso 1,86 kg\n- Color Negro",
		"price":1249,
		"category":"Laptop",
		"urlPhoto":"https://res.cloudinary.com/dedesktop/image/upload/v1651416806/Productos/1390-msi-gf63-thin-11ud-271xes-intel-core-i7-11800h-16-gb-512gb-ssd-rtx-3050ti-156_hycr54.webp",
		}
prod4 = {
		"id": prod4_id,
		"name":"Lenovo ThinkBook 14",
		"description":"Características\n\nDa un impulso a tu negocio con el Lenovo ThinkBook 14 de 2.ª generación (Intel) de 35,56 cm (14”).\nEste potente portátil va equipado con procesador Intel® Core™ de 11ª generación y ofrece gran variedad de opciones de memoria y almacenamiento resistentes. Sus funciones Smart mejoran las conferencias para poder trabajar a distancia sin interrupciones, proteger tus ojos de la luz azul dañina, gestionar la refrigeración de forma inteligente y más.\n\nEspecificaciones\n- Procesador Intel® Core™ i3-1115G4 (2 núcleos, frecuencia turbo máxima de 4.10 GHz, 6 MB Intel® Smart Cache)\n- Memoria RAM 8 GB DDR4 3200 MHz (integrada)\n- Almacenamiento 256 GB SSD M.2 2242 PCIe\n- Unidad óptica No\n- Display 14” IPS, Retroiluminación LED, Full HD (1920 x 1080) 16:9, 300 nits, Anti-reflejo, gama de colores 45% NTSC, ángulo de visión de 170º\n- Controlador gráfico Integrado: Intel UHD Graphics\n- Webcam HD 720p con tapa de privacidad\n- Micrófono Matriz doble\n- Audio 2 altavoces estéreo de 1.5 W de alta definición, Dolby Audio\n- Teclado Retroiluminado\n- Touchpad Multitáctil, panel táctil sin botones, zona táctil de precisión\n- Batería 3 celdas, Polímero de litio, 45Wh\n- Dimensiones (Ancho x Profundidad x Altura) 323 x 218 x 17,9 mm\n- Peso 1,4 kg\n- Color Gris mineral",
        "price":550.94,
		"category":"Laptop",
		"urlPhoto":"https://res.cloudinary.com/dedesktop/image/upload/v1651416991/Productos/1417-lenovo-thinkbook-14-g2-itl-intel-core-i3-1115g4-8gb-256gb-ssd-14_miacgn.webp",
		}
prod5 = {
		"id": prod5_id,
		"name":"Asus TUF Gaming F15",
		"description":"Características\n\nProcesadores de última generación para jugar en cualquier lugar: Los nuevos portátiles TUF Gaming están disponibles con Intel® Core ™ i5 de décima generación\n\n16GB de memoria RAM, 512GB almacenamiento SSD y gráfica NVIDIA GTX1650 para una máxima experiencia de juego y trabajo\n\nDiseñado para ser portátil y durar más tiempo: Equipado con más capacidad de batería, un chasis más compacto y durabilidad militar\n\nEspecificaciones\n- Procesador Intel® Intel® Core™ i5-10300H (Caché: 8MB SmartCache, 2.5GHz hasta 4.5GHz, 64-bit)\n- Memoria RAM 16GB (8GB*2) DDR4 2933MHz\n- Disco duro 512GB SSD M.2 NVMe™ PCIe® 3.0\n- Almacenamiento óptico NO\n- Display 15.6” - 39,62cm / LED Retroiluminado / FHD (1920x1080/16:9) /144Hz\n- Controlador gráfico NVIDIA® GeForce® GTX 1650/ 4GB GDDR6 VRAM\n- Cámara de portátil Sí\n- Micrófono Sí\n- Batería 3 celdas Ion de litio 48W/h\n- Sistema operativo SIN SISTEMA OPERATIVO\n- Dimensiones (Ancho x Profundidad x Altura) 359 x 256 x 24,7~24,9 mm\n- Peso 2,3 Kg (con batería de 3 celdas)\n- Color Negro",
        "price":749,
		"category":"Laptop",
		"urlPhoto":"https://res.cloudinary.com/dedesktop/image/upload/v1651417185/Productos/1464-asus-tuf-gaming-f15-fx506lh-hn042-intel-core-i5-10300h-16gb-512gb-ssd-gtx-1650-156_xjlhrq.webp",
		}
prod6 = {
		"id": prod6_id,
		"name":"HP Victus 16",
		"description":"Características:\n\nQue nada te preocupe para jugar más tiempo: Supera el acaloramiento de cada partida gracias a unsistema de refrigeración que evita elsobrecalentamiento.\n\nDiseñado para jugar: Dalo todo con una pantalla de juego con frecuenciade actualización y sin tearing, y disfruta de unaexperiencia visual increíblemente nítida.\n\nOMEN Gaming Hub: Desde mejoras en el software hasta el control delhardware y servicios en directo, OMEN Gaming Hubeleva el juego de una manera fácil y sencilla.\n\nEspecificaciones:\n- Procesador AMD Ryzen 7 5800H (16MB Cache, 3.2GHz)\n- Memoria RAM RAM DDR4-3200 MHz 16 GB (2 x 8 GB)\n- Disco duro SSD PCIe® NVMe™ TLC M.2 de 512 GB\n- Almacenamiento óptico NO\n- Display 40,9 cm (16,1”) en diagonal, FHD (1920 x 1080), 144 Hz, tiempo de respuesta de 7 ms, IPS, microborde, antirreflectante, Low Blue Light, 300 nits, 100 % de sRGB\n- Controlador gráfico NVIDIA GeForce RTX 3050 (4GB GDDR6)\n- Cámara de portátil Cámara HP Wide Vision 720p HD con micrófonos digitales de matriz dual integrados\n- Micrófono Sí\n- Batería Polímero de ion-litio 4 celdas, 70 Wh\n- Sistema operativo FreeDOS\n- Teclado: Teclado de tamaño completo, con retroiluminación, de color plata mica y teclado numéricoHP Imagepad compatible con función gestual multitáctil; Compatible con panel táctil deprecisión\n- Dimensiones (Ancho x Profundidad x Altura) 37 x 26 x 2,35 cm;\n- Peso 2,46 kg\n- Color Azul intenso, logotipo cromado",
        "price":849,
		"category":"Laptop",
		"urlPhoto":"https://res.cloudinary.com/dedesktop/image/upload/v1651417316/Productos/1646-hp-victus-16-e0000ns-amd-ryzen-7-5800h-16gb-512gb-ssd-rtx-3050-161_gufttp.webp",
		}
prod7 = {
		"id": prod7_id,
		"name":"HP ChromeBook 14",
		"description":"Características:\n\nEl sueño de un seriéfilo La belleza de una pantalla de alta definición con microborde y los altavoces ideados por los expertos en audio de B&O te ofrecen un entretenimiento de primera categoría con gran portabilidad.\n\nDiseñado para seguir tu ritmo Consigue el rendimiento que buscas con un procesador Intel®, un amplio almacenamiento y una batería de larga duración que te ayudará a completar todo lo que te propongas.\n\nAplicaciones para todo Redefine tu forma de trabajar y jugar con la perfecta integración de tu navegador Chrome favorito, siempre seguro y actualizado, y accede a una numerosa selección de aplicaciones en Google Play Store.\n\nEspecificaciones\n- Procesador  Intel Celeron N4020 (4MB Cache, 1.1GHz)\n- Memoria RAM  4GB (2400MHz) LPDDR4-SDRAM\n- Disco duro 64GB eMMC\n- Almacenamiento óptico NO\n- Display 14” HD (1366x768) 16:9 Antigalre\n- Controlador gráfico Intel UHD Graphics\n- Cámara de portátil Sí\n- Micrófono Sí\n- Batería 2 celdas Ion de litio 47Wh\n- Sistema operativo Chrome OS\n- Dimensiones (Ancho x Profundidad x Altura) 32.57 x 21.85 x 1.78cm\n- Peso 1.46 kg\n- Color Gris",
        "price":195,
		"category":"Laptop",
		"urlPhoto":"https://res.cloudinary.com/dedesktop/image/upload/v1651417456/Productos/155-hp-chromebook-14a-na0004ns-intel-celeron-n4020-4gb-64gb-emmc-14_pvwfnk.webp",
		}
prod8 = {
		"id": prod8_id,
		"name":"Microsoft Surface Pro 8",
		"description":"Características\n\nPantalla táctil PixelSense™ Flow que va casi de borde a borde, con una frecuencia de actualización de hasta 120 Hz\n\nCombínala con Microsoft Surface Slim Pen 2,* que se guarda y carga** en Microsoft Surface Pro Signature Keyboard,* para disfrutar de una sensación natural de bolígrafo sobre papel7\n\nProcesador Intel® Core™ de 11.ª generación, Windows 11 y hasta 32 GB de RAM\n\nCrea la configuración de productividad definitiva con puertos Thunderbolt™ 4\n\nTrabaja en modo multitarea entre todas las apps de Microsoft 365?y disfruta de juegos de calidad de consola\n\nEstablece el ángulo perfecto con el soporte trasero integrado que se ajusta a casi 180 grados\n\nUn teclado real: agrega Microsoft Surface Pro Signature Keyboard* para escribir de manera cómoda, con teclas con retroiluminación y un panel táctil de cristal y de gran tamaño\n\nEspecificaciones:\n- Opciones de unidad de estado sólido (SSD) extraíble: 1 TB\n- Dimensiones 287 mm × 208 mm × 9.3 mm (11.3” × 8.2” × 0.37”)\n- Duración de la batería hasta 16 horas de uso típico del dispositivo\n- 16 GB de RAM (LPDDR4x)\n- Gráficos Intel® Iris® Xe Graphics\n- Procesador Intel® Core™ i7-1185G7 de cuatro núcleos y 11.ª generación\n- Altavoces estéreo de 2 W con Dolby Atmos®\n- WiFi 6: compatible con 802.11ax\n- Windows 11 Home\n- Sensor de colores de ambiente (brillo y color)\n- Garantía limitada de 1 año para hardware\n- Peso 1.96 lb (891 g)\n- Compatibilidad con lápiz Microsoft Surface Slim Pen 2*\n- Compatibilidad con teclado Microsoft Surface Pro Keyboard",
        "price":2319,
		"category":"Laptop",
		"urlPhoto":"https://res.cloudinary.com/dedesktop/image/upload/v1651417584/Productos/1738-microsoft-surface-pro-8-intel-core-i7-1185g7-16gb-1tb-ssd-13-tactil-platino-microsoft-365-personal-12-meses_exeqtn.webp",
		}
prod9 = {
		"id": prod9_id,
		"name":"HP 15S",
		"description":"Características\n\nHaz más cosas desde donde quieras. Todo el día.\nPermanece conectado a lo que más te importa gracias a una batería de larga duración y a un diseño ligero y fino con bisel con microborde. El ordenador portátil HP de 15,6 pulgadas, diseñado para mantener la productividad y estar entretenido en cualquier parte, ofrece un rendimiento fiable y una amplia pantalla que te permiten hacer streaming, navegar y completar tareas con rapidez.\n\nEspecificaciones\n- Procesador Intel® Core™ i3-1115G4 (hasta 4,1 GHz con tecnología Intel® Turbo Boost, 6 MB de caché L3, 2 núcleos, 4 subprocesos)\n- Memoria RAM RAM DDR4-3200 MHz 8 GB (2 x 4 GB)\n- Almacenamiento SSD de 256 GB PCIe® NVMe™ M.2\n- Unidad óptica No\n- Display 15,6” (39,6 cm) en diagonal, bisel micro-edge, antirreflectante, 250 nits, 45 % NTSC, FHD (1920 x 1080)\n- Controlador gráfico Integrado: Intel® UHD\n- Conectividad Combo Realtek RTL8822CE 802.11a/b/g/n/ac (2x2) Wi-Fi® y Bluetooth® 5\n- Webcam HP True Vision 720p HD con micrófonos digitales de matriz dual integrados\n- Audio Altavoces dobles\n- Teclado Tamaño completo de color blanco nieve y con teclado numérico\n- Touchpad HP Imagepad compatible con función gestual multitáctil; Compatible con panel táctil de precisión\n- Batería Ion-litio de 3 celdas 41 Wh\n- Sistema operativo Windows 11 S. Windows 11 en modo S es una versión de Windows 11 optimizada para seguridad y rendimiento que ofrece una experiencia familiar de Windows. Solo admite aplicaciones de Microsoft Store y requiere Microsoft Edge para realizar una exploración segura. Para obtener más información, consulta aquí.\n- Dimensiones (Ancho x Profundidad x Altura) 35,85 x 24,2 x 1,79 cm\n- Peso 1,69 kg\n- Color Plata natural",
        "price":448,
		"category":"Laptop",
		"urlPhoto":"https://res.cloudinary.com/dedesktop/image/upload/v1651417909/Productos/1100-hp-15s-fq2159ns-intel-core-i3-1115g4-8gb-256gb-ssd-156_zi7ibf.webp",
		}
prod10 = {
		"id": prod10_id,
		"name":"Lenovo IdeaPad 3",
		"description":"Características\n\nJusto el rendimiento que necesitas. ¿Buscas un portátil de gama básica lo suficientemente potente para que te ayude a sacar el trabajo adelante? Echa un vistazo al IdeaPad 3 (15, Intel) de 39,62 cm (15,6”). Los últimos procesadores Intel® Core™ de 11.ª generación aumentan el rendimiento, te permiten realizar fácilmente varias tareas a la vez y te ofrecen una extraordinaria experiencia de entretenimiento. Los detalles de diseño bien meditados, como el obturador de seguridad físico de la cámara web, completan el producto.\n\nEspecificaciones\n- Procesador Intel Core i5-1135G7 (4C / 8T, 2.4 / 4.2GHz, 8MB)\n- Memoria RAM 4GB Soldered DDR4-3200 + 4GB SO-DIMM DDR4-3200\n- Almacenamiento 512GB SSD M.2 2242 PCIe 3.0x4 NVMe\n- Unidad óptica No\n- Display 15.6” FHD (1920x1080) TN 250nits Anti-glare\n- Controlador gráfico Intel Iris Xe Graphics\n- Cámara de portátil 720p with Privacy Shutter\n- Micrófono 2x, Array\n- Batería Integrated 38Wh\n- Sistema operativo SIN SISTEMA OPERATIVO\n- Dimensiones 359.2 x 236.5 x 19.9 mm\n- Peso 1.65 kg\n- Color Arctic Grey",
        "price":479,
		"category":"Laptop",
		"urlPhoto":"https://res.cloudinary.com/dedesktop/image/upload/v1651417942/Productos/1748-lenovo-ideapad-3-15itl6-intel-core-i5-1135g7-8gb-512gb-ssd-156_xgljyj.webp",
		}
prod11 = {
		"id": prod11_id,
		"name":"HP OMEN 25i",
		"description":"Tu juego cobra vida. Vida de verdad. Reacciona más rápido, apunta mejor y preocúpate solo de darlo todo jugando. Hemos redefinido el juego de alta definición con una configuración de 165 Hz, un tiempo de respuesta de 1 ms, AMD FreeSync™ Premium Pro y más colores que nunca.\n\nReacciona más rápido, apunta mejor y concéntrate en todos los aspectos de tu juego. Hemos redefinido los juegos de alta definición con 165 Hz, respuesta de 1 ms, GSYNC, AMD FreeSync ™ Premium Pro * y más colores, contraste y calidad de imagen que nunca.\n\nEspecificaciones\n- Diagonal de la pantalla: 62,2 cm (24.5'')\n- Brillo de la pantalla (típico): 400 cd / m²\n- Resolución de la pantalla: 1920 x 1080 Pixeles\n- Relación de aspecto nativa: 16:9\n- Tiempo de respuesta: 1 ms\n- Tipo HD: Full HD\n- Pantalla antirreflectante: Si\n- Forma de la pantalla: Plana\n- Formatos gráficos soportados: 640 x 480 (VGA),720 x 400,720 x 480,800 x 600 (SVGA),1024 x 768 (XGA),1280 x 720 (HD 720),1280 x 800 (WXGA),1440 x 900 (WXGA+),1600 x 900,1680 x 1050 (WSXGA+),1920 x 1080 (HD 1080)\n- Razón de contraste (típica): 1000:1\n- Relación de contraste (dinámico): 12000000:1\n- Máxima velocidad de actualización: 165 Hz\n- Ángulo de visión, horizontal: 178°\n- Ángulo de visión, vertical: 178°\n- Tipo de pantalla: IPS\n- Tamaño de pixel: 0,2832 x 0,2802 mm\n- Intervalo de escaneado horizontal: 31 - 192 kHz\n- Intervalo de escaneado vertical: 60 - 165 Hz\n- Dureza de la superficie: 3H",
        "price":261.70,
		"category":"Monitor",
		"urlPhoto":"https://res.cloudinary.com/dedesktop/image/upload/v1651418864/Productos/1720-hp-omen-25i-245-led-ips-fullhd-165hz-g-sync_h79el0.webp",
		}
prod12 = {
		"id": prod12_id,
		"name":"PcCom Discovery",
		"description":"Desde PCCOM presentamos el Monitor Discovery de 24 pulgadas. Un exclusivo modelo de 24 pulgadas curvo 1500R que te ofrece una experiencia gaming totalmente envolvente gracias a su resolución Full HD y tasa de refresco de hasta 165 Hz con 1ms de respuesta MPRT. Si quieres disfrutar de las buenas características de este monitor, no puede faltar en tu setup gaming.\n\nEspecificaciones\n- Modelo: PCC-24165VA-CV\n- Tamaño de pantalla: 23,6”\n- Aspecto Ratio: 16:9\n- Retroiluminación: Edge-LED\n- Brillo: 320cd/m2\n- Panel: VA\n- Resolución: DP 1.2: 1920 x 1080 165Hz, HDMI 1.4: 1920 x 1080 144Hz\n- Tasa de refresco: 165Hz\n- Tiempo de respuesta: 1 Ms MPRT\n- Ángulo de visión: 178 ° (H) / 178 ° (V)\n- Ratio de contraste: 3000: 1\n- Compatibilidad VESA: si,  75 * 75 mm\n- Colores: 16.7 Millones\n- FreeSync: Sí\n- Señal de entrada: DP1.2 * 1, HDMl1.4 * 2\n- Alimentación: 12.0V 3A\n- Altavoces: No\n- Salida de audio: Sí\n- Accesorios:\n- Cable DisplayPort: Sí\n- Cable de alimentación: Sí\n- Adaptador de corriente: Sí\n- Funciones adicionales:\n- Filtro de luz Azul: Sí\n- Dimensiones físicas:\n- Dimensiones (con soporte):537,86 x 410,12 x 200,39 mm\n- Dimensiones (sin soporte): 537,86 x 333,54 x 73,96 mm\n- Peso neto: 3.25Kg",
        "price":229,
		"category":"Monitor",
		"urlPhoto":"https://res.cloudinary.com/dedesktop/image/upload/v1651419074/Productos/1606-pccom-discovery-236-led-fullhd-165hz-freesync-curvo_cdausf.webp",
		}
prod13 = {
		"id": prod13_id,
		"name":"Newskill Icarus RGB",
		"description":"El monitor gaming Newskill Icarus RGB está enfocado a jugadores exigentes que buscan la perfección al mejor precio. Podrás disfrutar de 165Hz a una resolución de 2K y la tecnología HDR para experimentar la mejor calidad en tus sesiones de gaming. Su añadido RGB será el toque extra de skill que necesita tu set-up.\n\nCon Icarus sobran las presentaciones, nuestra familia de monitores se expande con esta nueva versión, el upgrade que necesitaba para enamorar a jugadores exigentes con sus periféricos y a aquellos que solo buscan disfrutar del gaming.\n\nIcarus RGB es un monitor con resolución 2K (2560x1440p) y 165Hz que comienza con cambios en su exterior, como su peana o su nuevo y flamante RGB trasero para profundizar en su interior y darnos el máximo rendimiento para disfrutar nuestras partidas a la perfección.\n\nEspecificaciones\n- Stand Fijo\n- Fabricante del panel: SAMSUNG\n- Dimensiones del panel/Proporción: 27'' 16:9\n- Tecnología de panel: VA\n- Brillo maximo: 300cd/m2(typ.), 250cd/m2(min) (HDR Compatible)\n- Contraste: 3000:1\n- Tiempo de respuesta: 1ms MPRT, 3ms (G-to-G) (Overdrive)\n- Angulos de visión:178º, V:178º\n- Gama de colores: 72% NTSC\n- Colores de pantalla: 16.7M (8bit)\n- Compatibilidad VESA: 75X75mm, 100X100mm\n- Flicker free: SI\n- Filtro Blue light: SI\n- HDR Compatible: SI\n- Freesync: SI\n- G-Sync: Compatible\n- MPRT 1MS: SI\n- Dimensiones con peana: 46x61x24cm(AnchoxAltoxProfundidad)\n- Dimensiones sin peana: 36x61x10.5cm (AnchoxAltoxProfundidad)\n- Anillo con efecto Rainbow RGB",
        "price":269.99,
		"category":"Monitor",
		"urlPhoto":"https://res.cloudinary.com/dedesktop/image/upload/v1651419263/Productos/1657-newskill-icarus-rgb-ic27qrc-27-led-quadhd-165hz-g-sync-compatible_ukbiib.webp",
		}
prod14 = {
		"id": prod14_id,
		"name":"MSI Optix G27C7",
		"description":"Visualice su victoria con el monitor MSI Optix G27C7 Curved Gaming ™. Equipado con una frecuencia de actualización de 1920 x 1080, 165 Hz y un panel de tiempo de respuesta de 1 ms, Optix G27C7 le brindará la ventaja competitiva que necesita para derrotar a sus oponentes. Construido con sincronización adaptativa, Optix G27C7 puede igualar la frecuencia de actualización de la pantalla con su GPU para un juego ultra fluido. Asegúrese de que puede dar en el blanco con las últimas tecnologías integradas en el monitor MSI Curved Gaming ™ para un juego competitivo.\n\nEspecificaciones\n- Diagonal de la pantalla: 68,6 cm (27'')\n- Brillo de la pantalla (típico): 250 cd / m²\n- Resolución de la pantalla: 1920 x 1080 Pixeles\n- Relación de aspecto nativa: 16:9\n- Tiempo de respuesta: 1 ms\n- Tipo HD: Full HD\n- Tecnología de visualización: LED\n- Pantalla antirreflectante: Si\n- Forma de la pantalla: Curva\n- Formatos gráficos soportados: 1920 x 1080 (HD 1080)\n- Relación de aspecto: 16:9\n- Razón de contraste (típica): 3000:1\n- Relación de contraste (dinámico): 100000000:1\n- Máxima velocidad de actualización: 165 Hz\n- Ángulo de visión, horizontal: 178°\n- Ángulo de visión, vertical: 178°\n- Número de colores de la pantalla: 16,7 millones de colores\n- Tipo de pantalla: VA\n- Tamaño de pixel: 0,3108 x 0,3108 mm\n- Tamaño visible, horizontal: 59,7 cm\n- Tamaño visible, vertical: 33,6 cm\n- Frecuencia digital horizontal: 104 - 186,8 kHz\n- Frecuencia digital vertical: 30 - 165 Hz\n- Cobertura sRGB (típica): 118%",
        "price":247.88,
		"category":"Monitor",
		"urlPhoto":"https://res.cloudinary.com/dedesktop/image/upload/v1651419458/Productos/1713-msi-optix-g27c7-27-led-fullhd-165hz-freesync-premium-curva_khz0qi.webp",
		}
prod15 = {
		"id": prod15_id,
		"name":"MSI Optix G27",
		"description":"Los monitores Optix utilizan un panel de pantalla curva que tiene una velocidad de curvatura de 1500R, que es la más cómoda y adecuada para una amplia gama de aplicaciones, desde informática general hasta juegos. Los paneles curvos también ayudan con la inmersión en el juego, haciéndote sentir más conectado con toda la experiencia.\n\nLos monitores Optix están equipados con una frecuencia de actualización de 165Hz + un panel LED VA de tiempo de respuesta de 1 ms que tiene el mayor beneficio en géneros de juegos de movimiento rápido como tiradores en primera persona, luchadores, simuladores de carreras, estrategia en tiempo real y deportes. Este tipo de juegos requieren movimientos muy rápidos y precisos, que con una frecuencia de actualización ultra alta y un monitor de tiempo de respuesta rápido lo pondrán por delante de su competencia.\n\nEl monitor de juegos curvo Optix G27CQ4 cuenta con un panel WQHD de 27'' que admite una resolución de hasta 2560x1440. Este panel 16: 9 permite a los jugadores examinar escenas de juego más grandes en comparación con otros paneles FHD tradicionales, y ponerlos por delante de otros competidores. Dicha resolución también permite a los jugadores realizar múltiples tareas con varias ventanas mostradas al mismo tiempo, lo que les brinda la eficiencia para lograr todo lo que desean.\n\nEspecificaciones\n- Diagonal de la pantalla: 68,6 cm (27'')\n- Resolución de la pantalla: 2560 x 1440 Pixeles\n- Relación de aspecto nativa: 16:9\n- Tipo HD: WQHD\n- Tecnología de visualización: LCD\n- Tipo de retroiluminación: LED\n- Superficie de la pantalla: Mate\n- Forma de la pantalla: Curva\n- Número de colores de la pantalla: 16,78 millones de colores\n- 3D: No\n- Tipo de pantalla: VA\n- Tamaño de pixel: 0,2331 x 0,2331 mm\n- Intervalo de escaneado horizontal: 70,56 - 243,37 kHz\n- Intervalo de escaneado vertical: 48 - 165 Hz\n- Tamaño visible, horizontal: 59,7 cm\n- Tamaño visible, vertical: 33,6 cm\n- Colour gamut DCI-P3: 92%",
        "price":269,
		"category":"Monitor",
		"urlPhoto":"https://res.cloudinary.com/dedesktop/image/upload/v1651419674/Productos/msi-optix-g27cq4-27-led-wide-quadhd-165hz-freesync-curvo_ksb4n7.webp",
		}
prod16 = {
		"id": prod16_id,
		"name":"Viewsonic VX Series",
		"description":"El monitor VX2468-PC-MHD de ViewSonic® con resolución Full HD de 1080p y pantalla curva inmersiva 1500R ofrece una increíble experiencia de visualización para trabajar o para jugar. Este monitor con características que incluyen frecuencia de actualización alta de 165 Hz, tiempo de respuesta rápido de 1 ms (MPRT) y tecnología AMD FreeSync Premium, prácticamente, elimina los cortes e interrupciones en la pantalla, lo que brinda una experiencia de juego fluida. El VX2468-PC-MHD también viene equipado con ajustes preestablecidos ViewMode™ exclusivos de ViewSonic, que proporcionan un rendimiento optimizado de pantalla para el entretenimiento en el hogar, como mirar películas, editar archivos o jugar videojuegos. Dos entradas HDMI (v2.0) y una entrada DisplayPort (v1.2) ofrecen conectividad para el uso general y el ocio.\n\nEspecificaciones\n- Diagonal de la pantalla: 61 cm (24'')\n- Brillo de la pantalla (típico): 250 cd / m²\n- Resolución de la pantalla: 1920 x 1080 Pixeles\n- Relación de aspecto nativa: 16:9\n- Tiempo de respuesta: 2 ms\n- Tipo HD: Full HD\n- Tecnología de visualización: LED\n- Forma de la pantalla: Curva\n- Clasificación de curvatura de la pantalla: 1500R\n- Razón de contraste (típica): 3000:1\n- Relación de contraste (dinámico): 80000000:1\n- Máxima velocidad de actualización: 165 Hz\n- Ángulo de visión, horizontal: 178°\n- Ángulo de visión, vertical: 178°\n- Número de colores de la pantalla: 16,7 millones de colores\n- Tipo de pantalla: MVA\n- Tiempo de respuesta (rápido): 1 ms\n- Frecuencia digital horizontal: 30 - 184 kHz\n- Frecuencia digital vertical: 48 - 165 Hz",
        "price":179.99,
		"category":"Monitor",
		"urlPhoto":"https://res.cloudinary.com/dedesktop/image/upload/v1651419807/Productos/1515-viewsonic-vx-series-vx2468-pc-mhd-24-led-fullhd-165hz-freesync-premium-pro-curva_z1u11y.webp",
		}
prod17 = {
		"id": prod17_id,
		"name":"Forgeon Acrux Leather",
		"description":"Otro modelo de sillas gaming recién traídas al mercado es la nueva Forgeon Acrux Gaming Chair Leather.\n\nUna silla de piel sintética de alta calidad que te proporciona una mejor temperatura frente a las diferentes estaciones del año. También sus acabados exclusivos te ofrecen la mejor experiencia de uso que todo jugador en modo competitivo necesita.",
        "price":299,
		"category":"Chair",
		"urlPhoto":"https://res.cloudinary.com/dedesktop/image/upload/v1651420181/Productos/1668-forgeon-acrux-leather-silla-gaming-negra-comprar_cdu1na.webp",
		}
prod18 = {
		"id": prod18_id,
		"name":"Tempest F36-2",
		"description":"Presentamos dentro de la gama de silla de Tempest, su nuevo modelo Tempest F36-2. Una silla que completará tu setup gaming y te permitirá disfrutar de una comodidad inimaginable. Sus acabados de cuero artificial junto a sus reposabrazos acolchados, te brindará la experiencia perfecta para que puedas seguir disfrutando con total tranquilidad de tus partidas gaming. Adquiere calidad, adquiere tempest.",
        "price":109.99,
		"category":"Chair",
		"urlPhoto":"https://res.cloudinary.com/dedesktop/image/upload/v1651420238/Productos/1514-tempest-f36-2-silla-gaming-con-reposapies-negra-gris-review_xqi2xn.webp",
		}
prod19 = {
		"id": prod19_id,
		"name":"Newskill Kitsune",
		"description":"unque al principio no te des cuenta, las largas sesiones de juego delante de la pantalla pueden acabar pasándote factura. Espalda y cuello son, particularmente, dos de las partes del cuerpo que más se resienten debido a las malas postura que adoptamos frente al ordenador. Para evitar estas molestias, en Newskill hemos diseñado KITSUNE, la silla gaming profesional con la que podrás jugar durante horas sin que tu cuerpo ni tu rendimiento se vean afectados.",
        "price":158.62,
		"category":"Chair",
		"urlPhoto":"https://res.cloudinary.com/dedesktop/image/upload/v1651420271/Productos/dpp-26492_szyaaq.webp",
		}
prod20 = {
		"id": prod20_id,
		"name":"Owlotech Columbia V2",
		"description":"Desde Owlotech presentamos la nueva versión de esta increíble silla de oficina Columbia fabricada con unos materiales de alta calidad que proporcionan una comodidad excelente, gracias a su gran ergonomía. Esta silla mejora algunos de los elementos ya presentes en la anterior versión, dotándola de mejores materiales y acabados que permitan una mayor durabilidad y resistencia frente al paso del tiempo.\n\nUna silla que destaca por su comodidad frente a largas jornadas frente al ordenador, con un diseño atemporal que destaca en cualquier escritorio. Gracias a su acabado en maya",
        "price":51.99,
		"category":"Chair",
		"urlPhoto":"https://res.cloudinary.com/dedesktop/image/upload/v1651420329/Productos/1620-owlotech-columbia-v2-silla-oficina_opg2ar.webp",
		}
prod21 = {
		"id": prod21_id,
		"name":"HP Omen Spacer TKL",
		"description":"Características\n\nSin cables, pero como si utilizases uno: La tecnología inalámbrica Warp proporciona en cada partida una conexión fiable y constante de 2,4 GHz con tecnología Zero-Lag, o si lo prefieres apuesta por la opción con cable.\n\nSon conmutadores. No fallan: Disfruta de la excelente calidad de los conmutadores CHERRY MX marrones. Son muy rápidos, con un tiempo de respuesta de 1 ms y una duración de hasta 100 millones de pulsaciones.\n\nSu batería dura tanto que se te olvidará ir a dormir: 5 minutos de carga mediante USB-C serán suficientes para jugar durante 6 horas. Además, su carga completa dura hasta 75 horas, así que no te olvides de ir a dormir.\n\nCobertura total: Descansa tranquilo con la garantía limitada de un año estándar de HP.\n\nSin problemas de espacio en el escritorio: Tu escritorio estará ordenado gracias al diseño TKL, al cable extraíble y al reposamanos magnético que facilitan el almacenamiento, el orden y la comodidad.\n\nSin efecto fantasma. Juega: Sistema 100 % anti-ghosting: con N-Key rollover, puedes pulsar todas las teclas que quieras a la vez y sin perderte ningún movimiento.\n\nTodo bajo control: Controla luminosidad y macros y personaliza el teclado desde el OMEN Command Center.\n\nNo hay de qué preocuparse: Personaliza el brillo y la iluminación LED en cualquier momento cómodamente con la tecla de encendido y apagado.\n\nEspecificaciones\n- Uso recomendado: Juego\n- Interfaz del dispositivo: RF inalámbrico\n- Interruptor del teclado: Interruptor mecánico\n- Dispositivo apuntador: No\n- Formato del teclado: Estándar\n- Teclado numérico: No\n- Frecuencia de banda: 2.4 GHz\n- Retroiluminación: Si\n- Estilo de teclado: Derecho\n- Descansa muñecas: Si\n- Color del producto: Negro\n- Alimentación: Batería\n- Recargable: Si\n- Fuente de carga: USB\n- Dimensiones de teclado (Ancho x Profundidad x Altura): 369,3 x 139,5 x 36 mm\n- Peso del teclado: 960 g",
        "price":179,
		"category":"Keyboard",
		"urlPhoto":"https://res.cloudinary.com/dedesktop/image/upload/v1651420529/Productos/1276-hp-omen-spacer-tkl-teclado-mecanico-gaming-inalambrico-cherry-mx-brown_deeawv.webp",
		}
prod22 = {
		"id": prod22_id,
		"name":"Newskill Serike TKL",
		"description":"Características\n\nSerike TKL Ivory Edition: El teclado gaming Serike TKL se ha convertido en uno de los productos más deseados de Newskill y se merecía entrar en la familia Ivory. Disfruta de todas las prestaciones y características de uno de nuestros productos más queridos pero ahora en una versión totalmente renovada. Dale un toque diferente a tu set-up con Serike TKL Ivory.\n\nCompacto y ligero: Gracias a su fabricación en aluminio y sus dimensiones, Serike TKL Ivory es un teclado compacto y muy ligero que a la vez nos proporciona seguridad en cada tecla. Hemos añadido la tecnología antighosting también en nuestros dos modelos de la gama Serike, sabemos que cada movimiento es crucial en la batalla y en un segundo puede cambiar el curso de una batalla así que para que no se pierda un solo click tendrás esta tecnología a tu disposición. \n\nMás iluminación para tu juego: Con el teclado mecánico gaming Serike TKL Ivory podremos disfrutar de más de veinte modos distintos de iluminación. En su zona lateral Serike TKL Ivory destaca por su iluminación, creando un halo alrededor de nuestro teclado gracias a sus once modos RGB más los ocho modos de “respiración” sobre nuestras teclas y cinco modos interactivos que podremos programar. \n\nTodas las opciones al alcance de tus dedos: Todo esto podremos programarlo y crear nuestras combinaciones de colores utilizando su software dedicado y los 16.8 millones de colores que tendremos a nuestra disposición. Además, tendremos la opción de grabar nuestras macros directamente al vuelo. Una combinación de opciones para realizar las mejores configuraciones. \n\nTKL: La gran novedad que supone Serike TKL Ivory se debe a que es un teclado compacto TenKeyLess que deja de lado todo el pad numérico para ofrecerte toda su potencia y características en un formato ideal para que te acompañe cómodamente a cualquier zona de juego o para liberar espacio en tu set-up.\n\nEspecificaciones\n- 11 modos de retroiluminación RGB en sus laterales\n- Modo respiración con 8 modos distintos\n- 5 modos de fondo interactivo\n- Teclas totalmente programables con grabación de macros sobre la marcha\n- 100% anti-efecto fantasma con tecnología N-key rollover\n- Tecnología de interruptores mecánicos, más de 50 millones de pulsaciones de teclas aseguradas\n- Dimensiones: 366 (L) x 137 (W) x 30.3 (H) mm\n- Peso: 830 ± 30g\n- Longitud del cable: 1.8m",
        "price":42.96,
		"category":"Keyboard",
		"urlPhoto":"https://res.cloudinary.com/dedesktop/image/upload/v1651420668/Productos/1475-newskill-serike-tkl-ivory-red-teclado-mecanico-gaming-full-rgb-switch-red_m1bano.webp",
		}
prod23 = {
		"id": prod23_id,
		"name":"Razer Huntsman Tournament",
		"description":"Características\n\nSwitches ópticos lineales Razer?. Pulsaciones más rápidas y sensibles. Disfruta de una respuesta inmediata con activación óptica de 1 mm, ya que cada pulsación se registra mediante un haz de luz, lo que garantiza una ventaja inmediata en cualquier competición.\n\nTeclas de PBT de doble inyección. Acabado mate más robusto y con textura. Con una doble capa de PBT para mayor resistencia, estas teclas están diseñadas para mantener su textura en situaciones de entrenamiento intensivo y uso competitivo.\n\nMemoria integrada. Lleva tus ajustes contigo. Estarás listo para la acción al usar los 5 perfiles de configuración en la memoria integrada o los ajustes personalizados mediante almacenamiento en la nube.\n\nFormato compacto. Movilidad y comodidad. El diseño compacto y sin teclado numérico permite una maniobrabilidad y colocación más sencillas para que encuentres tu posición ideal.\n\nCable Tipo C desmontable. Instalación y almacenamiento sin complicaciones. Conecta tu teclado y juega al instante mientras vas de torneo en torneo. El cierre de seguridad mantiene el cable conectado durante toda la partida.\n\nVida útil de 100 millones de pulsaciones. Mayor fiabilidad. Los Switches ópticos lineales Razer? tienen una durabilidad líder en el mercado de 100 millones de pulsaciones, y están diseñados para aguantar la dureza del entrenamiento y el juego competitivo.\n\nSwitches ópticos lineales Razer?. Ejecución digna de campeones. Nada es más rápido que la velocidad de la luz; por eso hemos diseñado un switch que registra pulsaciones mediante un haz de luz. Switch óptico lineal Razer? presentan una activación óptica de 1 mm para que ejecutes tus movimientos al instante.\n\nEspecificaciones\n- Switches ópticos lineales Razer? para unas pulsaciones más rápidas y sensibles\n- Teclas de PBT de doble inyección para un acabado robusto y con textura mate\n- Memoria integrada para llevar tus ajustes a todas partes\n- Diseño compacto para mayor comodidad y movilidad\n- Cable tipo C desmontable para instalar y guardar tu teclado fácilmente\n- Iluminación: Razer Chroma?\n- Apoyo para la muñeca: No\n- Tamaño: Sin teclado numérico\n- Asistencia de software: Sí\n- Teclado con layout USA.",
        "price":149.99,
		"category":"Keyboard",
		"urlPhoto":"https://res.cloudinary.com/dedesktop/image/upload/v1651420766/Productos/huntsman-te-2019-render-05-top-down-intl-us-layout_s11jzf.webp",
		}
prod24 = {
		"id": prod24_id,
		"name":"Razer BlackWidow V3",
		"description":"Características\n\nFactor de forma del 65% para un rendimiento compacto y elegante.  BlackWidow V3 Mini HyperSpeed en un factor de forma del 65%, que ofrece un tamaño compacto con teclas de flecha dedicadas y 4 teclas de navegación que pueden funcionar como macros. Con esta combinación de tamaño compacto y versatilidad, es un teclado mini gaming que es perfecto para una variedad de casos de uso. El factor de forma del 65%, combinado con nuestra tecnología inalámbrica Razer HyperSpeed, es la combinación perfecta de tamaño y conveniencia para crear el mejor teclado inalámbrico para juegos.\n\nSwitches mecánico Razer™. Para aquellos que quieran sentir y escuchar cada pulsación, el switch mecánico amarillo de Razer™ presenta un punto de activación y un sonido distintivo al hacer click, junto con puntos de accionamiento y restablecimiento optimizados para obtener el mejor rendimiento de tecleado y de juego posible.\n\nTecnología inalámbrica Razer ™ HyperSpeed para juegos inalámbricos de baja latencia. La tecnología inalámbrica Razer ™ HyperSpeed se creó en torno a este ideal y ha demostrado su eficacia en los entornos más exigentes, como los torneos de e-sports. Razer ™ HyperSpeed Wireless es un 25% más rápido que cualquier otra tecnología, según lo probado por TUV SUD, un instituto de certificación reconocido a nivel mundial. Consigue la latencia de clic más baja que jamás se haya registrado.\n\n3 modos de conexión a través de Razer HyperSpeed (2,4 GHz), Bluetooth y USB-C. Con 3 modos de conexión, puede utilizar BlackWidow V3 Mini HyperSpeed con varios dispositivos. Cambia entre los 3 modos de conexión a través del interruptor que se encuentra en el lado izquierdo del teclado. \n\nTeclas ABS de doble inyección. Gracias al doble inyección garantiza que no se desgasten las etiquetas, las teclas de este teclado mecánico para juegos también cuentan con paredes extragruesas capaces de soportar un uso continuo y prolongado.\n\nHasta 200 horas de duración de la batería para un rendimiento duradero.\n\nEspecificaciones\n- Switches mecánicos Razer™ para una ejecución rápida y precisa\n- Iluminación personalizable Razer Chroma RGB con 16,8 millones de opciones de color\n- Teclas de ABS de doble inyección para resistir el uso intenso\n- Teclas totalmente programables con grabación de macros sobre la marcha\n- Estructura de aluminio para una mayor durabilidad\n- Conexión a través de Razer HyperSpeed (2,4 GHz), Bluetooth y USB-C.\n- Memoria híbrida integrada y almacenamiento en la nube de hasta 5 perfiles\n- N-key rollover\n- Tasa de sondeo (ultrapolling) de 1000 Hz\n- Compacto 65%\n- Layout Español\n- Peso 799 g.\n- Interfaz del dispositivo : USB\n- Teclado numérico : Si\n- Vida útil de las teclas del teclado : 80 millón de pulsaciones\n- Retroiluminación : Si\n- Color del producto : Negro\n- Tipo de retroiluminación : LED RGB\n- Control de energía\n- Alimentación : USB 2.0",
        "price":189.99,
		"category":"Keyboard",
		"urlPhoto":"https://res.cloudinary.com/dedesktop/image/upload/v1651420862/Productos/190-razer-blackwidow-v3-mini-hyperspeed-teclado-gaming-retroiluminado-yellow-switch_gbe20r.webp",
		}
prod25 = {
		"id": prod25_id,
		"name":"Corsair K65 RGB",
		"description":"Características\n\nTamaño pequeño, grandes funciones: el K65 RGB MINI ofrece grandes funciones comprimidas en un factor de forma del 60% para caber fácilmente incluso en los espacios más reducidos para un juego cómodo.\n\nDesarrollado por la tecnología de hiperprocesamiento CORSAIR AXON: transmite sus entradas a su PC hasta 8 veces más rápido que teclados para juegos convencionales con hiper-polling de 8.000 Hz.\n\nInterruptores de tecla mecánicos rojos 100% CHERRY MX RGB: ofrecen un recorrido lineal, combinado con una fuerza de resorte mínima, lo que resulta en una pulsación suave como la seda para juegos de alto rendimiento, registra pulsaciones de teclas hasta 4 veces más rápido que los teclados mecánicos estándar para juegos con CORSAIR AXON, y están garantizados para 100 millones de pulsaciones de teclas.\n\nPersonalice su juego: muestre su estilo con retroiluminación RGB dinámica por tecla, así como un accesorio opcional incluido barra espaciadora radiante y tecla con el logotipo de CORSAIR, junto con el diseño estándar de la fila inferior para que pueda cambiar las teclas de ABS por sus propios juegos de teclas personalizadas.\n\nCable USB tipo C trenzado desmontable: hace que el K65 RGB MINI portátil sea fácil de llevar y conectar a cualquier sistema, en cualquier lugar.\n\nAccesos directos integrados expansivos: acceda a un sólido conjunto de funciones, que incluyen controles de iluminación, perfiles, macros, medios, volumen y cursor del mouse.\n\nPotente software CORSAIR iCUE: compatible con Windows y macOS, que permite el control dinámico de iluminación RGB, reasignaciones de teclas, programación de macros e integraciones exclusivas con juegos selectos que convierten la iluminación de su sistema en una extensión de la acción.\n\n8 MB de almacenamiento integrado: almacene hasta 50 perfiles integrados con macros personalizadas y sus propios efectos de iluminación RGB vibrantes y únicos con hasta 20 capas de iluminación.\n\nRollover completo de N-Key (NKRO) y 100% Anti-Ghosting: Asegura que cada pulsación de tecla se registre, sin importar qué tan rápido juegues.\n\nModo de bloqueo de teclas de Windows: evita las pulsaciones accidentales de las teclas del menú contextual y de Windows para garantizar que nunca interrumpirá su juego en momentos críticos.\n\nEspecificaciones\n- Factor de forma 60%\n- Interruptores de llave CHERRY MX Rojo, mecánico, fuerza de actuación de 45 g, distancia de actuación de 2,0 mm\n- Luz de fondo Iluminada individualmente y programable por tecla\n- LED Color RGB, 16,8 millones de colores\n- Teclas ABS, compatibles con retroiluminación\n- Conectividad 1 x USB 3.0 Tipo A\n- Tasa de informe USB Hasta 8.000 Hz de hiper-polling\n- Rollover de clave completo de matriz (NKRO) con 100% anti-ghosting\n- Perfiles integrados Sí, hasta 50\n- Teclas multimedia Sí, atajos de FN\n- Tecla de brillo Sí, atajo FN\n- Tecla de bloqueo de Windows Sí, acceso directo FN\n- iCUE (software) compatible con Windows 10 y macOS 10.15\n- Cable 1,82 m / 6 pies, USB tipo C a tipo A, desmontable, negro, fibra trenzada\n- Dimensiones 294 (L) x 105 (W) x 44 (H) mm / 11.6 (L) x 4.14 (W) x 1.74 (H) in\n- Peso 0,58 kg / 1,28 libras",
        "price":128.02,
		"category":"Keyboard",
		"urlPhoto":"https://res.cloudinary.com/dedesktop/image/upload/v1651420964/Productos/1493-corsair-k65-rgb-mini-60-teclado-mecanico-gaming-rgb-led-cherry-mx-red_asegxl.webp",
		}
prod26 = {
		"id": prod26_id,
		"name":"Corsair K70 RGB",
		"description":"Características\n\nLa leyenda continúa: El K70 RGB PRO conserva los elementos icónicos del galardonado K70 RGB con una estructura de aluminio duradera, interruptores de teclas mecánicos CHERRY MX y retroiluminación RGB por tecla, al tiempo que establece un nuevo nivel de rendimiento con la tecnología AXON y un interruptor de torneo.\n\nCon la tecnología de hiperprocesamiento CORSAIR AXON: Permite un nuevo nivel de rendimiento K70, procesando y transmitiendo sus entradas hasta 8 veces más rápidamente que los teclados para juegos convencionales con sondeo avanzado de 8.000 Hz, escaneo de teclas y de 4.000 Hz hasta 20 capas de procesamiento de iluminación RGB por hardware, manteniendo el rendimiento de la velocidad.\n\nInterruptores de teclas mecánicos 100% CHERRY MX SPEED RGB: Tiempos de respuesta ultrarrápidos con una distancia de pulsación de 1,2 mm y una garantía de 100 millones de pulsaciones.\n\nTeclas de policarbonato con diseño de fila inferior estándar: Teclas de plástico de policarbonato duraderas con un diseño de fila inferior estándar compatible con juegos de teclas personalizados.\n\nActive la competición: Accione el interruptor de torneo para centrarse en ganar esas partidas tan cruciales, cambiando automáticamente a la retroiluminación estática sin distracciones y anulando las activaciones accidentales de las macros.\n\nCable USB tipo C trenzado y extraíble: Hace que el K70 RGB PRO sea fácil de transportar y conectar en cualquier lugar.\n\nReposamuñecas suave y magnético: Se acopla magnéticamente al teclado, con una superficie suave al tacto para un mejor agarre y comodidad durante las sesiones de juego más largas.\n\nTeclas específicas para control multimedia y rueda de volumen: Controle fácilmente sus medios con tan solo pulsar un botón, mientras que la rueda de control de aluminio característica de CORSAIR ajusta suavemente los niveles de volumen y es totalmente programable en el software iCUE para realizar acciones personalizadas.\n\nGrabación de macros integrada con capa de funciones: Grabe macros sobre la marcha con una cómoda tecla de acceso directo y guárdelas en los accesos directos de las combinaciones de teclas de función, para acceder fácilmente a acciones complejas sin sacrificar la funcionalidad de las teclas estándar.\n\nHasta 50 perfiles integrados: Guarde macros personalizadas, acciones y sus propios efectos de vibrante iluminación RGB personalizable, todo ello impulsado por AXON, que admite hasta 20 capas.\n\nUnifique su sistema: El potente software CORSAIR iCUE permite, tanto en Windows como en macOS, controlar la iluminación RGB dinámica, reasignar teclas, programar macros y aplicar integraciones con iCUE exclusivas con determinados juegos que convierten la iluminación de todo su sistema en una extensión de la acción.\n\nDetección simultánea de teclas (NKRO) y 100 % sin efecto fantasma: No importa lo rápidas que sean sus acciones durante el juego, cada pulsación de tecla se registra correctamente.\n\nEspecificaciones\n- Formato: Tamaño completo con teclado numérico\n- Chasis: Aluminio, anodizado negro, cepillado\n- Combinación de colores: Negro\n- Interruptores de teclas: CHERRY MX SPEED RGB SILVER, mecánicos lineales, fuerza de actuación de 45 g, distancia de pulsación de 1,2 mm, con garantía de 100 millones de pulsaciones\n- Número de teclas: 105\n- Teclas específicas para macros: No\n- Grabación de macros integrada: Sí, grabación y guardado con combinaciones de teclas FN\n- Retroiluminación: Iluminación individual y programable por tecla\n- Color LED: RGB - 16,8 millones de colores\n- Teclas: Policarbonato, compatibles con retroiluminación\n- Conectividad con cables: USB 3.0 Type-A\n- Interconexión USB: No\n- Velocidad de respuesta por USB: Sondeo de hasta 8.000 Hz\n- Matriz: Detección simultánea de teclas (NKRO) y 100 % sin efecto fantasma\n- Memoria interna: 8 MB\n- Perfiles internos: Hasta 50\n- Iluminación integrada: Hasta 20 capas de efectos de iluminación\n- Teclas multimedia: Cinco teclas de acceso rápido específicas (reproducción/pausa, detención, siguiente pista, última pista, silencio) y rueda de volumen (subir y bajar volumen)\n- Tecla de brillo: Sí\n- Tecla de bloqueo de Windows: Sí\n- Altura regulable: Sí, inclinación en dos etapas\n- Reposamuñecas: Magnético con acabado de tacto suave y estampado\n- iCUE (software): Compatible en Windows 10 y macOS 10.15\n- Cable: 1,82 metros, USB tipo C a tipo A, extraíble, negro, fibra trenzada\n- Dimensiones: 444 (L) x 166 (An) x 40 (Al) mm (sin reposamuñecas)\n- Peso 1,15 kg (sin reposamuñecas)",
        "price":217.95,
		"category":"Keyboard",
		"urlPhoto":"https://res.cloudinary.com/dedesktop/image/upload/v1651421071/Productos/1103-corsair-k70-rgb-pro-teclado-mecanico-gaming-switch-cherry-mx-speed-silver-negro_qxawc2.webp",
		}

# Insert Data
rec_prod_id1 = collection.insert_one(prod1)
rec_prod_id2 = collection.insert_one(prod2)
rec_prod_id3 = collection.insert_one(prod3)
rec_prod_id4 = collection.insert_one(prod4)
rec_prod_id5 = collection.insert_one(prod5)
rec_prod_id6 = collection.insert_one(prod6)
rec_prod_id7 = collection.insert_one(prod7)
rec_prod_id8 = collection.insert_one(prod8)
rec_prod_id9 = collection.insert_one(prod9)
rec_prod_id10 = collection.insert_one(prod10)
rec_prod_id11 = collection.insert_one(prod11)
rec_prod_id12 = collection.insert_one(prod12)
rec_prod_id13 = collection.insert_one(prod13)
rec_prod_id14 = collection.insert_one(prod14)
rec_prod_id15 = collection.insert_one(prod15)
rec_prod_id16 = collection.insert_one(prod16)
rec_prod_id17 = collection.insert_one(prod17)
rec_prod_id18 = collection.insert_one(prod18)
rec_prod_id19 = collection.insert_one(prod19)
rec_prod_id20 = collection.insert_one(prod20)
rec_prod_id21 = collection.insert_one(prod21)
rec_prod_id22 = collection.insert_one(prod22)
rec_prod_id23 = collection.insert_one(prod23)
rec_prod_id24 = collection.insert_one(prod24)
rec_prod_id25 = collection.insert_one(prod25)
rec_prod_id26 = collection.insert_one(prod26)

# print("Data inserted with record ids",rec_prod_id1," ",rec_prod_id2)

# insert users

collection = db.user

user1 = {
		"id": str(uuid.uuid4()),
		"username":"LeBron Raymone James Sr.",
		"email":"Thegoat@gmail.com",
        "salt": "596c06198d4ad5e349aab6de4e38c7a4",
        "hash": "55e2bf53ca5eecea3c225c6164abde0c008f86b5da63d68a52432025af08c134315359614b8a9f12a54917a539bc07636173a4ac9775be392d022ef748b07e0e",
		"rol":"Admin"
		}
user2 = {
		"id": str(uuid.uuid4()),
		"username":"Wardell Stephen Curry II",
		"email":"Chef@gmail.com",
     	"salt": "339ca94acee3deca6d7b828d32ec2c91",
        "hash": "dbca9157ddd245919d7d8f1447de16038fef80c6452654385257d3a32cc2b512f1fb2199df14248d6d6224ea8eb7eb783743038fa01d3ce2d5e07307b2517c74",
		"rol":"Client"
		}
user3 = {
		"id": str(uuid.uuid4()),
		"username":"Benjamin David Simmons",
		"email":"Ben@gmail.com",
        "salt": "00c5983ba369ba2bc1af6e0c097c8cc9",
        "hash": "6ee29247f6d06d7b1bfd550766c5d8ca4d0454deecfd2049cb4a9450ee823ec2ce5d0925fb91355ebc8423ac07cf87e70f66ec84c1f32c8dce097358a98bab5c",
		"rol":"Client"
		}
user4 = {
		"id": str(uuid.uuid4()),
		"username":"Dwyane Tyrone Wade, Jr.",
		"email":"Dwyane@gmail.com",
        "salt": "37028d151dd80a66e0228630712fd781",
        "hash": "81d2ab8889ecb3c4841a14f4cb2e45364f622405be31a1593f4f9ae373d62b376e64ab5392bbbbb6061f5cbe1f682562369d78720fab687959b45dcd7465b5b6",
		"rol":"Client"
		}
user5 = {
		"id": str(uuid.uuid4()),
		"username":"Russell Westbrook III",
		"email":"West@gmail.com",
        "salt": "f28fef0fc80e40a304ed402c8d3a8adc",
        "hash": "ca9cc4ac3f99fce105b6502fa4756dc77704fb6289ccbad485f414a47688983da4e62653601320c808e5066a1ab5f49652a89b6b9ea0e1c09d7173481b01b1d2",
		"rol":"Client"
		}

# Insert Data
rec_user_id1 = collection.insert_one(user1)
rec_user_id2 = collection.insert_one(user2)
rec_user_id3 = collection.insert_one(user3)
rec_user_id4 = collection.insert_one(user4)
rec_user_id5 = collection.insert_one(user5)


# print("Data inserted with record ids",rec_user_id1," ",rec_user_id2)

'''
# Printing the data inserted
cursor = collection.find()
for record in cursor:
	print(record)
import sys 
print("Output from Python") 
print("First name: " + sys.argv[1]) 
print("Last name: " + sys.argv[2]) 
'''



collection = db.distribution_center

dc1 = {
		"id": dc1_id,
		"address": "Calle Valdes Salas, 11, 33007 Oviedo, Asturias"
}
dc2 = {
		"id": dc2_id,
		"address": "Escuela Tecnica Superior de Ingenieria Informatica, Universidad de Sevilla, 41012 Sevilla",
}	
# Insert Data
rec_distcenter_id1=collection.insert_one(dc1)
rec_distcenter_id2=collection.insert_one(dc2)

collection = db.product_store

ps1_1 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc1_id,
	"product_id": prod1_id,
	"stock": 6
}
ps1_2 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc1_id,
	"product_id": prod2_id,
	"stock": 10
}
ps1_3 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc1_id,
	"product_id": prod3_id,
	"stock": 34
}
ps1_4 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc1_id,
	"product_id": prod4_id,
	"stock": 22
}
ps1_5 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc1_id,
	"product_id": prod5_id,
	"stock": 3
}
ps1_6 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc1_id,
	"product_id": prod6_id,
	"stock": 40
}
ps1_7 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc1_id,
	"product_id": prod7_id,
	"stock": 6
}
ps1_8 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc1_id,
	"product_id": prod8_id,
	"stock": 8
}
ps1_9 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc1_id,
	"product_id": prod9_id,
	"stock": 6
}
ps1_10 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc1_id,
	"product_id": prod10_id,
	"stock": 12
}
ps1_11 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc1_id,
	"product_id": prod11_id,
	"stock": 20
}
ps1_12 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc1_id,
	"product_id": prod12_id,
	"stock": 15
}
ps1_13 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc1_id,
	"product_id": prod13_id,
	"stock": 11
}
ps1_14 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc1_id,
	"product_id": prod14_id,
	"stock": 7
}
ps1_15 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc1_id,
	"product_id": prod15_id,
	"stock": 8
}
ps1_16 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc1_id,
	"product_id": prod16_id,
	"stock": 10
}
ps1_17 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc1_id,
	"product_id": prod17_id,
	"stock": 4
}
ps1_18 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc1_id,
	"product_id": prod17_id,
	"stock": 6
}
ps1_23 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc1_id,
	"product_id": prod23_id,
	"stock": 23
}
ps1_24 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc1_id,
	"product_id": prod24_id,
	"stock": 21
}
ps1_25 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc1_id,
	"product_id": prod25_id,
	"stock": 17
}
ps1_26 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc1_id,
	"product_id": prod26_id,
	"stock": 15
}
ps2_1 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc2_id,
	"product_id": prod1_id,
	"stock": 2
}
ps2_3 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc2_id,
	"product_id": prod3_id,
	"stock": 8
}
ps2_4 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc2_id,
	"product_id": prod4_id,
	"stock": 4
}
ps2_5 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc2_id,
	"product_id": prod5_id,
	"stock": 10
}
ps2_8 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc2_id,
	"product_id": prod8_id,
	"stock": 5
}
ps2_9 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc2_id,
	"product_id": prod9_id,
	"stock": 14
}
ps2_17 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc2_id,
	"product_id": prod17_id,
	"stock": 14
}
ps2_19 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc2_id,
	"product_id": prod17_id,
	"stock": 20
}
ps2_20 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc2_id,
	"product_id": prod17_id,
	"stock": 10
}
ps2_21 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc2_id,
	"product_id": prod17_id,
	"stock": 14
}
ps2_22 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc2_id,
	"product_id": prod17_id,
	"stock": 14
}
ps2_23 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc2_id,
	"product_id": prod17_id,
	"stock": 14
}
ps2_25 = {
	"id": str(uuid.uuid4()),
	"distributioncenter_id": dc2_id,
	"product_id": prod25_id,
	"stock": 22
}
collection.insert_one(ps1_1)
collection.insert_one(ps1_2)
collection.insert_one(ps1_3)
collection.insert_one(ps1_4)
collection.insert_one(ps1_5)
collection.insert_one(ps1_6)
collection.insert_one(ps1_7)
collection.insert_one(ps1_8)
collection.insert_one(ps1_9)
collection.insert_one(ps1_10)
collection.insert_one(ps1_11)
collection.insert_one(ps1_12)
collection.insert_one(ps1_13)
collection.insert_one(ps1_14)
collection.insert_one(ps1_15)
collection.insert_one(ps1_16)
collection.insert_one(ps1_17)
collection.insert_one(ps1_18)
collection.insert_one(ps1_23)
collection.insert_one(ps1_24)
collection.insert_one(ps1_25)
collection.insert_one(ps1_26)
collection.insert_one(ps2_1)
collection.insert_one(ps2_3)
collection.insert_one(ps2_4)
collection.insert_one(ps2_5)
collection.insert_one(ps2_8)
collection.insert_one(ps2_9)
collection.insert_one(ps2_17)
collection.insert_one(ps2_19)
collection.insert_one(ps2_20)
collection.insert_one(ps2_21)
collection.insert_one(ps2_22)
collection.insert_one(ps2_23)
collection.insert_one(ps2_25)

collection = db.productorder

prodord1 = {
		"id": str(uuid.uuid4()),
		"product": prod1,
		"quantity": 5,
		"shippingPrice": 1,
		"distributionCenter": dc1
		}
prodord2 = {
		"id": str(uuid.uuid4()),
		"product": prod3,
		"quantity": 2,
		"shippingPrice": 3,
		"distributionCenter": dc1
		}
prodord3 = {
		"id": str(uuid.uuid4()),
		"product": prod9,
		"quantity": 6,
		"shippingPrice": 1.5,
		"distributionCenter": dc1
		}
# Insert Data
rec_prodorder_id1=collection.insert_one(prodord1)
rec_prodorder_id2=collection.insert_one(prodord2)
rec_prodorder_id2=collection.insert_one(prodord3)

collection = db.order

ord1 = {
		"id": str(uuid.uuid4()),
		"user": "Thegoat@gmail.com",
		"products": [prodord1,prodord2]
		}
ord2 = {
		"id": str(uuid.uuid4()),
		"user": "Chef@gmail.com",
		"products": [prodord1,prodord2,prodord3]
		}
# Insert Data
rec_order_id1=collection.insert_one(ord1)
rec_order_id2=collection.insert_one(ord2)
