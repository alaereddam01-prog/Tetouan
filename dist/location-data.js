// Verified geographic records. A district label is not an entrance or a walking route.
// Photographic coverage is deliberately explicit: no generic view is labelled as an exact site.
import { footballDetails } from './football-data.js';
const T=(fr,ar,en,es)=>({fr,ar,en,es});
const label=T('Repère de quartier publié dans le répertoire GeoNames ; ce point ne définit ni ses limites ni une entrée.','نقطة تعريف بالحي منشورة في دليل GeoNames؛ لا تحدد حدود الحي ولا مدخله.','Published GeoNames district label; this point does not define its boundaries or an entrance.','Referencia del barrio publicada en GeoNames; este punto no define sus límites ni una entrada.');
const site=T('Repère du site ; confirmez les accès et conditions de visite sur place.','نقطة تعريف بالموقع؛ تأكد محلياً من المداخل وشروط الزيارة.','Site reference; confirm entrances and visiting conditions locally.','Referencia del lugar; confirme los accesos y condiciones de visita.');
const GN=(id,lat,lng,kind='district-label',note=label)=>({lat,lng,kind,sourceUrl:`https://www.geonames.org/${id}/`,sourceName:'GeoNames · Morocco gazetteer (MA.txt)',datasetUrl:'https://download.geonames.org/export/dump/MA.zip',checkedOn:'2026-10-10',photoIds:[],note});
const WD=(id,lat,lng,photoIds=[])=>({lat,lng,kind:'site',sourceUrl:`https://www.wikidata.org/wiki/${id}#P625`,sourceName:'Wikidata · coordinate location',checkedOn:'2026-10-11',photoIds,note:site});
const OSM=(type,id,lat,lng,photoIds=[],note=site,kind='site')=>({lat,lng,kind,sourceUrl:`https://www.openstreetmap.org/${type}/${id}`,sourceName:'OpenStreetMap · published object (verified through Nominatim)',checkedOn:'2026-10-10',photoIds,note});
const osmLabel=T('Repère de quartier publié dans OpenStreetMap ; ce point ne définit ni ses limites ni une entrée.','نقطة تعريف بالحي منشورة في OpenStreetMap؛ لا تحدد حدود الحي ولا مدخله.','Published OpenStreetMap neighbourhood label; this point does not define its boundaries or an entrance.','Referencia de barrio publicada en OpenStreetMap; este punto no define sus límites ni una entrada.');
export const locationRecords={
  'el-blad':OSM('way',575146171,35.5718538,-5.3652610,[],T('La Grande Mosquée de la médina sert de repère pour cette promenade ; le point ne définit pas les limites d’El Blad et n’indique pas un accès à la mosquée.','الجامع الكبير بالمدينة العتيقة نقطة تعريف لهذه الجولة؛ لا تحدد النقطة حدود البلاد ولا تشير إلى مدخل للمسجد.','The medina’s Great Mosque serves as a landmark for this walk; this point does not define El Blad’s boundaries or indicate mosque access.','La Gran Mezquita de la medina sirve como referencia del paseo; este punto no define los límites de El Blad ni indica un acceso a la mezquita.')),
  'el-ayoun':OSM('way',104676466,35.5728702,-5.3732723,[],T('Repère de la rue Nmar El Ayun dans la médina, pas le centre ni les limites du quartier El Ayoun.','نقطة تعريف بزنقة نمار العيون بالمدينة العتيقة، وليست مركز حي العيون أو حدوده.','Nmar El Ayun street reference within the medina, not the centre or boundaries of the El Ayoun district.','Referencia de la calle Nmar El Ayun en la medina, no el centro ni los límites del barrio El Ayoun.')),
  'mellah':GN(11060537,35.56906,-5.36633),
  'saniat-rmel':{...OSM('way',150999458,35.5727595,-5.3485891,[],T('Le stade Saniat Rmel sert de repère à cette découverte du secteur ; ce point ne définit pas les limites du quartier et n’indique pas une entrée du stade.','ملعب سانية الرمل نقطة تعريف لاكتشاف المنطقة؛ لا تحدد النقطة حدود الحي ولا تشير إلى مدخل الملعب.','Saniat Rmel Stadium serves as a landmark for exploring the area; this point does not define district boundaries or indicate a stadium entrance.','El estadio Saniat Rmel sirve como referencia para descubrir la zona; este punto no define los límites del barrio ni indica una entrada al estadio.')),checkedOn:'2026-10-11'},
  'taboula':GN(11060439,35.57278,-5.40524),
  'jamaa-mezouak':OSM('node',8196047483,35.5740642,-5.3961661,[],T('L’arrêt nommé Jamaa Mezouak, avenue Zaio, sert de repère. Ce point ne définit pas les limites du quartier et ne garantit aucun service de bus actuel.','محطة جامع المزواق المسماة في شارع زايو نقطة تعريف؛ لا تحدد حدود الحي ولا تضمن خدمة حافلات حالية.','The named Jamaa Mezouak stop on Avenue Zaio serves as a reference. This point does not define district boundaries or guarantee a current bus service.','La parada denominada Jamaa Mezouak, en la avenida Zaio, sirve de referencia. Este punto no define los límites del barrio ni garantiza un servicio actual de autobús.')),
  'mhannech':OSM('node',6903918964,35.5646246,-5.3569392,[],osmLabel,'district-label'),
  'boujarrah':GN(11060522,35.58884,-5.36366),
  'touibla':OSM('node',4636374702,35.5880240,-5.3505876,[],osmLabel,'district-label'),
  'samsa':GN(2537743,35.59367,-5.40681,'district-label',T('GeoNames publie ce repère pour la localité Samsa/Semsa ; il ne définit pas les limites administratives d’un quartier.','ينشر GeoNames هذه النقطة لتجمع سمسة؛ لا تحدد الحدود الإدارية لحي.','GeoNames publishes this reference for the locality Samsa/Semsa; it does not define administrative neighbourhood boundaries.','GeoNames publica esta referencia para la localidad Samsa/Semsa; no define los límites administrativos de un barrio.')),
  'feddan':OSM('way',1217899233,35.5721229,-5.3732682,['feddan'],T('Centre cartographique du Feddan Park, distinct de la place Hassan II devant le Palais royal.','المركز المرسوم لساحة الفدان، وهي مختلفة عن ساحة الحسن الثاني أمام القصر الملكي.','Mapped centre of Feddan Park, distinct from Place Hassan II in front of the Royal Palace.','Centro cartográfico del Feddan Park, distinto de la plaza Hassan II ante el Palacio Real.')),
  'palais':OSM('way',292009193,35.5703779,-5.3689925,['palace'],T('Repère de la place Hassan II devant le Palais royal ; le palais n’est pas ouvert à la visite.','نقطة تعريف بساحة الحسن الثاني أمام القصر الملكي؛ القصر غير مفتوح للزيارة.','Place Hassan II reference in front of the Royal Palace; the palace is not open to visitors.','Referencia de la plaza Hassan II ante el Palacio Real; el palacio no está abierto a las visitas.')),
  'dar-oddi':OSM('node',13190098601,35.5706879,-5.3660941),
  'dar-sanaa':OSM('way',151003631,35.5702075,-5.3632475),
  'ensanche':OSM('relation',7130325,35.5701819,-5.3741454,['ensanche'],T('Repère de promenade : place Moulay El Mehdi, dans l’Ensanche. Ce point ne définit pas les limites du quartier.','نقطة للجولة: ساحة مولاي المهدي داخل الإنسانشي. لا تحدد هذه النقطة حدود الحي.','Walking reference: Place Moulay El Mehdi within the Ensanche. This point does not define the district boundaries.','Referencia de paseo: plaza Moulay El Mehdi, en el Ensanche. Este punto no define los límites del barrio.')),
  'trankat':OSM('way',104233932,35.5718002,-5.3705603,[],T('Repère de la rue Trankat/Abdelatif El Medouri ; il ne définit pas les limites du quartier.','نقطة تعريف بزنقة الطرنكات/عبد اللطيف المدوري؛ لا تحدد حدود الحي.','Trankat/Abdelatif El Medouri street reference; it does not define the district boundaries.','Referencia de la calle Trankat/Abdelatif El Medouri; no define los límites del barrio.')),
  'souika':OSM('way',576910068,35.5697197,-5.3658483,[],T('Repère de la rue Suika Ulia ; il ne définit pas les limites du quartier.','نقطة تعريف بزنقة السويقة العليا؛ لا تحدد حدود الحي.','Suika Ulia street reference; it does not define the district boundaries.','Referencia de la calle Suika Ulia; no define los límites del barrio.')),
  'jbel-dersa':GN(2552287,35.5939,-5.38494,'site',T('Repère de la montagne dans GeoNames, pas un départ de sentier ni un itinéraire de randonnée.','نقطة تعريف بالجبل في GeoNames، وليست بداية مسار أو طريقاً للمشي الجبلي.','GeoNames mountain reference, not a trailhead or hiking route.','Referencia de la montaña en GeoNames; no es un inicio de sendero ni una ruta de montaña.')),
  'bab-okla':WD('Q60331336',35.570578,-5.363517,['babokla']),
  'museum':WD('Q64956001',35.57029728191463,-5.363957233256539),
  'tamuda':{lat:35.559835,lng:-5.410938,kind:'site',sourceUrl:'https://commons.wikimedia.org/wiki/File:Tamuda_northern_gate_of_the_Roman_military_camp.jpg',sourceName:'Ideophagous · published camera GPS at Tamuda’s northern Roman gate',checkedOn:'2026-10-10',photoIds:[],note:T('Point GPS publié par le photographe à la porte nord du camp romain ; ce n’est pas l’entrée de la billetterie.','نقطة GPS نشرها المصور عند الباب الشمالي للمعسكر الروماني؛ ليست مدخل شباك التذاكر.','Photographer’s published GPS reference at the northern gate of the Roman camp; this is not the ticket-office entrance.','Referencia GPS publicada por el fotógrafo en la puerta norte del campamento romano; no es la entrada de la taquilla.')},
  'martil':GN(2542987,35.61662,-5.27522,'town-centre',T('Repère du centre de Martil ; la plage s’étend à l’est. Ce point n’est pas une entrée de plage.','نقطة تعريف بوسط مرتيل؛ يمتد الشاطئ شرقاً. هذه ليست نقطة دخول للشاطئ.','Martil town-centre reference; the beach lies to the east. This point is not a beach entrance.','Referencia del centro de Martil; la playa se encuentra al este. Este punto no es un acceso a la playa.'))
};
export const locationPhotos=[
  {
    "id": "museum-courtyard",
    "src": "assets/locations/museum-courtyard.jpg",
    "remote": "https://upload.wikimedia.org/wikipedia/commons/f/f4/%D9%85%D8%AA%D8%AD%D9%81_%D8%A8%D8%A7%D8%A8_%D8%A7%D9%84%D8%B9%D9%82%D9%84%D8%A9%D8%8C_%D8%A7%D9%84%D9%85%D8%AF%D9%8A%D9%86%D8%A9_%D8%A7%D9%84%D9%82%D8%AF%D9%8A%D9%85%D8%A9_%D8%A8%D8%AA%D8%B7%D9%88%D8%A7%D9%86.jpg",
    "source": "https://commons.wikimedia.org/wiki/File:%D9%85%D8%AA%D8%AD%D9%81_%D8%A8%D8%A7%D8%A8_%D8%A7%D9%84%D8%B9%D9%82%D9%84%D8%A9%D8%8C_%D8%A7%D9%84%D9%85%D8%AF%D9%8A%D9%86%D8%A9_%D8%A7%D9%84%D9%82%D8%AF%D9%8A%D9%85%D8%A9_%D8%A8%D8%AA%D8%B7%D9%88%D8%A7%D9%86.jpg",
    "sourceTitle": "File:متحف باب العقلة، المدينة القديمة بتطوان.jpg",
    "title": {
      "fr": "La cour d’entrée du musée Bab el Oqla",
      "ar": "باحة مدخل متحف باب العقلة",
      "en": "The entrance courtyard at Bab El Oqla Museum",
      "es": "El patio de entrada del museo Bab el Oqla"
    },
    "author": "Ideophagous",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "originalWidth": 3264,
    "originalHeight": 2448,
    "entryIds": [
      "museum"
    ],
    "changes": {
      "fr": "Redimensionnement proportionnel et compression JPEG ; aucun agrandissement.",
      "ar": "تصغير تناسبي وضغط JPEG دون تكبير.",
      "en": "Proportional resizing and JPEG compression; no upscaling.",
      "es": "Redimensionado proporcional y compresión JPEG, sin ampliación."
    },
    "width": 2560,
    "height": 1920
  },
  {
    "id": "museum-fortress",
    "src": "assets/locations/museum-fortress.jpg",
    "remote": "https://upload.wikimedia.org/wikipedia/commons/0/07/Ethnographic_museum_%D8%A7%D9%84%D9%85%D8%AA%D8%AD%D9%81_%D8%A7%D9%84%D8%A5%D8%AB%D9%86%D9%88%D8%BA%D8%B1%D8%A7%D9%81%D9%8A.jpg",
    "source": "https://commons.wikimedia.org/wiki/File:Ethnographic_museum_%D8%A7%D9%84%D9%85%D8%AA%D8%AD%D9%81_%D8%A7%D9%84%D8%A5%D8%AB%D9%86%D9%88%D8%BA%D8%B1%D8%A7%D9%81%D9%8A.jpg",
    "sourceTitle": "File:Ethnographic museum المتحف الإثنوغرافي.jpg",
    "title": {
      "fr": "L’entrée historique du musée Bab el Oqla",
      "ar": "المدخل التاريخي لمتحف باب العقلة",
      "en": "The historic entrance to Bab El Oqla Museum",
      "es": "La entrada histórica del museo Bab el Oqla"
    },
    "author": "Oumaima Achoua",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "originalWidth": 4160,
    "originalHeight": 2340,
    "entryIds": [
      "museum"
    ],
    "changes": {
      "fr": "Redimensionnement proportionnel et compression JPEG ; aucun agrandissement.",
      "ar": "تصغير تناسبي وضغط JPEG دون تكبير.",
      "en": "Proportional resizing and JPEG compression; no upscaling.",
      "es": "Redimensionado proporcional y compresión JPEG, sin ampliación."
    },
    "width": 2560,
    "height": 1440
  },
  {
    "id": "museum-entrance",
    "src": "assets/locations/museum-entrance.jpg",
    "remote": "https://upload.wikimedia.org/wikipedia/commons/1/15/%D8%A7%D9%84%D9%85%D8%AA%D8%AD%D9%81_%D8%A7%D9%84%D8%A7%D8%AB%D9%86%D9%88%D8%BA%D8%B1%D8%A7%D9%81%D9%8A%D8%8C_%D9%85%D8%AA%D8%AD%D9%81_%D8%A8%D8%A7%D8%A8_%D8%A7%D9%84%D8%B9%D9%82%D9%84%D8%A9%D8%8C_%D8%AA%D8%B7%D9%88%D8%A7%D9%86_%D8%A7%D9%84%D9%85%D8%AF%D9%8A%D9%86%D8%A9_%D8%A7%D9%84%D9%82%D8%AF%D9%8A%D9%85%D8%A9.jpg",
    "source": "https://commons.wikimedia.org/wiki/File:%D8%A7%D9%84%D9%85%D8%AA%D8%AD%D9%81_%D8%A7%D9%84%D8%A7%D8%AB%D9%86%D9%88%D8%BA%D8%B1%D8%A7%D9%81%D9%8A%D8%8C_%D9%85%D8%AA%D8%AD%D9%81_%D8%A8%D8%A7%D8%A8_%D8%A7%D9%84%D8%B9%D9%82%D9%84%D8%A9%D8%8C_%D8%AA%D8%B7%D9%88%D8%A7%D9%86_%D8%A7%D9%84%D9%85%D8%AF%D9%8A%D9%86%D8%A9_%D8%A7%D9%84%D9%82%D8%AF%D9%8A%D9%85%D8%A9.jpg",
    "sourceTitle": "File:المتحف الاثنوغرافي، متحف باب العقلة، تطوان المدينة القديمة.jpg",
    "title": {
      "fr": "L’enseigne du musée Bab el Oqla",
      "ar": "لافتة متحف باب العقلة",
      "en": "The sign at Bab El Oqla Museum",
      "es": "El letrero del museo Bab el Oqla"
    },
    "author": "Rachidourkia",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "originalWidth": 8000,
    "originalHeight": 6000,
    "entryIds": [
      "museum"
    ],
    "changes": {
      "fr": "Redimensionnement proportionnel et compression JPEG ; aucun agrandissement.",
      "ar": "تصغير تناسبي وضغط JPEG دون تكبير.",
      "en": "Proportional resizing and JPEG compression; no upscaling.",
      "es": "Redimensionado proporcional y compresión JPEG, sin ampliación."
    },
    "width": 2560,
    "height": 1920
  },
  {
    "id": "tamuda-camp",
    "src": "assets/locations/tamuda-camp.jpg",
    "remote": "https://upload.wikimedia.org/wikipedia/commons/6/6b/Roman_military_camp_of_Tamuda%2C_Morocco_%2827486915949%29.jpg",
    "source": "https://commons.wikimedia.org/wiki/File:Roman_military_camp_of_Tamuda,_Morocco_(27486915949).jpg",
    "sourceTitle": "File:Roman military camp of Tamuda, Morocco (27486915949).jpg",
    "title": {
      "fr": "Le camp romain de Tamuda",
      "ar": "المعسكر الروماني بتمودة",
      "en": "The Roman camp at Tamuda",
      "es": "El campamento romano de Tamuda"
    },
    "author": "Carole Raddato from FRANKFURT, Germany",
    "license": "CC BY-SA 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
    "originalWidth": 3266,
    "originalHeight": 2163,
    "entryIds": [
      "tamuda"
    ],
    "changes": {
      "fr": "Redimensionnement proportionnel et compression JPEG ; aucun agrandissement.",
      "ar": "تصغير تناسبي وضغط JPEG دون تكبير.",
      "en": "Proportional resizing and JPEG compression; no upscaling.",
      "es": "Redimensionado proporcional y compresión JPEG, sin ampliación."
    },
    "width": 2560,
    "height": 1695
  },
  {
    "id": "tamuda-view",
    "src": "assets/locations/tamuda-view.jpg",
    "remote": "https://upload.wikimedia.org/wikipedia/commons/d/d2/Tamuda_and_Tetouan.jpg",
    "source": "https://commons.wikimedia.org/wiki/File:Tamuda_and_Tetouan.jpg",
    "sourceTitle": "File:Tamuda and Tetouan.jpg",
    "title": {
      "fr": "Tamuda avec Tétouan à l’arrière-plan",
      "ar": "تمودة وتطوان في الخلفية",
      "en": "Tamuda with Tétouan in the background",
      "es": "Tamuda con Tetuán al fondo"
    },
    "author": "Ideophagous",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "originalWidth": 4080,
    "originalHeight": 3060,
    "entryIds": [
      "tamuda"
    ],
    "changes": {
      "fr": "Redimensionnement proportionnel et compression JPEG ; aucun agrandissement.",
      "ar": "تصغير تناسبي وضغط JPEG دون تكبير.",
      "en": "Proportional resizing and JPEG compression; no upscaling.",
      "es": "Redimensionado proporcional y compresión JPEG, sin ampliación."
    },
    "width": 2560,
    "height": 1920
  },
  {
    "id": "tamuda-walls",
    "src": "assets/locations/tamuda-walls.jpg",
    "remote": "https://upload.wikimedia.org/wikipedia/commons/a/a8/%D8%AC%D8%B2%D8%A1_%D9%85%D9%86_%D8%A7%D9%84%D9%85%D9%88%D9%82%D8%B9_%D8%A7%D9%84%D8%A3%D8%AB%D8%B1%D9%8A_%D9%84%D8%AA%D9%85%D9%88%D8%AF%D8%A9_%D8%A8%D8%AA%D8%B7%D9%88%D8%A7%D9%86.jpg",
    "source": "https://commons.wikimedia.org/wiki/File:%D8%AC%D8%B2%D8%A1_%D9%85%D9%86_%D8%A7%D9%84%D9%85%D9%88%D9%82%D8%B9_%D8%A7%D9%84%D8%A3%D8%AB%D8%B1%D9%8A_%D9%84%D8%AA%D9%85%D9%88%D8%AF%D8%A9_%D8%A8%D8%AA%D8%B7%D9%88%D8%A7%D9%86.jpg",
    "sourceTitle": "File:جزء من الموقع الأثري لتمودة بتطوان.jpg",
    "title": {
      "fr": "Les vestiges du site archéologique de Tamuda",
      "ar": "آثار الموقع الأثري لتمودة",
      "en": "Ruins at the archaeological site of Tamuda",
      "es": "Ruinas del yacimiento arqueológico de Tamuda"
    },
    "author": "Rachidourkia",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "originalWidth": 8000,
    "originalHeight": 6000,
    "entryIds": [
      "tamuda"
    ],
    "changes": {
      "fr": "Redimensionnement proportionnel et compression JPEG ; aucun agrandissement.",
      "ar": "تصغير تناسبي وضغط JPEG دون تكبير.",
      "en": "Proportional resizing and JPEG compression; no upscaling.",
      "es": "Redimensionado proporcional y compresión JPEG, sin ampliación."
    },
    "width": 2560,
    "height": 1920
  },
  {
    "id": "tamuda-northern-gate",
    "src": "assets/locations/tamuda-northern-gate.jpg",
    "remote": "https://upload.wikimedia.org/wikipedia/commons/5/5b/Tamuda_northern_gate_of_the_Roman_military_camp.jpg",
    "source": "https://commons.wikimedia.org/wiki/File:Tamuda_northern_gate_of_the_Roman_military_camp.jpg",
    "sourceTitle": "File:Tamuda northern gate of the Roman military camp.jpg",
    "title": {
      "fr": "La porte nord du camp romain de Tamuda",
      "ar": "الباب الشمالي للمعسكر الروماني بتمودة",
      "en": "The northern gate of the Roman camp at Tamuda",
      "es": "La puerta norte del campamento romano de Tamuda"
    },
    "author": "Ideophagous",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "originalWidth": 3264,
    "originalHeight": 2448,
    "entryIds": [
      "tamuda"
    ],
    "changes": {
      "fr": "Redimensionnement proportionnel et compression JPEG ; aucun agrandissement.",
      "ar": "تصغير تناسبي وضغط JPEG دون تكبير.",
      "en": "Proportional resizing and JPEG compression; no upscaling.",
      "es": "Redimensionado proporcional y compresión JPEG, sin ampliación."
    },
    "width": 2560,
    "height": 1920
  },
  {
    "id": "palace-facade",
    "src": "assets/locations/palace-facade.jpg",
    "remote": "https://upload.wikimedia.org/wikipedia/commons/5/52/Royal_Palace_in_Tetouan_Morocco.jpg",
    "source": "https://commons.wikimedia.org/wiki/File:Royal_Palace_in_Tetouan_Morocco.jpg",
    "sourceTitle": "File:Royal Palace in Tetouan Morocco.jpg",
    "title": {
      "fr": "La façade du Palais royal, depuis l’espace public",
      "ar": "واجهة القصر الملكي من الفضاء العام",
      "en": "The Royal Palace façade, seen from public space",
      "es": "La fachada del Palacio Real desde el espacio público"
    },
    "author": "Degeefe",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/",
    "originalWidth": 2080,
    "originalHeight": 1544,
    "entryIds": [
      "palais"
    ],
    "changes": {
      "fr": "Redimensionnement proportionnel et compression JPEG ; aucun agrandissement.",
      "ar": "تصغير تناسبي وضغط JPEG دون تكبير.",
      "en": "Proportional resizing and JPEG compression; no upscaling.",
      "es": "Redimensionado proporcional y compresión JPEG, sin ampliación."
    },
    "width": 2080,
    "height": 1544
  },
  {
    "id": "palace-square",
    "src": "assets/locations/palace-square.jpg",
    "remote": "https://upload.wikimedia.org/wikipedia/commons/4/4f/Tetouan_Morocco_%C2%A9_02.jpg",
    "source": "https://commons.wikimedia.org/wiki/File:Tetouan_Morocco_%C2%A9_02.jpg",
    "sourceTitle": "File:Tetouan Morocco © 02.jpg",
    "title": {
      "fr": "La place Hassan II devant le Palais royal",
      "ar": "ساحة الحسن الثاني أمام القصر الملكي",
      "en": "Place Hassan II in front of the Royal Palace",
      "es": "La plaza Hassan II ante el Palacio Real"
    },
    "author": "Dickelbers",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "originalWidth": 2476,
    "originalHeight": 1500,
    "entryIds": [
      "palais"
    ],
    "changes": {
      "fr": "Redimensionnement proportionnel et compression JPEG ; aucun agrandissement.",
      "ar": "تصغير تناسبي وضغط JPEG دون تكبير.",
      "en": "Proportional resizing and JPEG compression; no upscaling.",
      "es": "Redimensionado proporcional y compresión JPEG, sin ampliación."
    },
    "width": 2476,
    "height": 1500
  },
  {
    "id": "bab-oqla-gate",
    "src": "assets/locations/bab-oqla-gate.jpg",
    "remote": "https://upload.wikimedia.org/wikipedia/commons/8/8d/Bab_Al-Uqla_%D8%A8%D8%A7%D8%A8_%D8%A7%D9%84%D8%B9%D9%82%D9%84%D8%A9.jpg",
    "source": "https://commons.wikimedia.org/wiki/File:Bab_Al-Uqla_%D8%A8%D8%A7%D8%A8_%D8%A7%D9%84%D8%B9%D9%82%D9%84%D8%A9.jpg",
    "sourceTitle": "File:Bab Al-Uqla باب العقلة.jpg",
    "title": {
      "fr": "La porte Bab el Oqla",
      "ar": "باب العقلة",
      "en": "Bab El Oqla gate",
      "es": "La puerta Bab el Oqla"
    },
    "author": "Oumaima Achoua",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "originalWidth": 4160,
    "originalHeight": 2340,
    "entryIds": [
      "bab-okla"
    ],
    "changes": {
      "fr": "Redimensionnement proportionnel et compression JPEG ; aucun agrandissement.",
      "ar": "تصغير تناسبي وضغط JPEG دون تكبير.",
      "en": "Proportional resizing and JPEG compression; no upscaling.",
      "es": "Redimensionado proporcional y compresión JPEG, sin ampliación."
    },
    "width": 2560,
    "height": 1440
  },
  {
    "id": "bab-oqla-medina",
    "src": "assets/locations/bab-oqla-medina.jpg",
    "remote": "https://upload.wikimedia.org/wikipedia/commons/b/bf/Medina_de_Tetuan_7.jpg",
    "source": "https://commons.wikimedia.org/wiki/File:Medina_de_Tetuan_7.jpg",
    "sourceTitle": "File:Medina de Tetuan 7.jpg",
    "title": {
      "fr": "La muraille et les abords de Bab el Oqla",
      "ar": "السور ومحيط باب العقلة",
      "en": "The city wall and surroundings of Bab El Oqla",
      "es": "La muralla y el entorno de Bab el Oqla"
    },
    "author": "MONUMENTA",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "originalWidth": 4608,
    "originalHeight": 3456,
    "entryIds": [
      "bab-okla"
    ],
    "changes": {
      "fr": "Redimensionnement proportionnel et compression JPEG ; aucun agrandissement.",
      "ar": "تصغير تناسبي وضغط JPEG دون تكبير.",
      "en": "Proportional resizing and JPEG compression; no upscaling.",
      "es": "Redimensionado proporcional y compresión JPEG, sin ampliación."
    },
    "width": 2560,
    "height": 1920
  },
  {
    "id": "martil-beach",
    "src": "assets/locations/martil-beach.jpg",
    "remote": "https://upload.wikimedia.org/wikipedia/commons/4/49/A_seagull_flying_in_Martil_beach.jpg",
    "source": "https://commons.wikimedia.org/wiki/File:A_seagull_flying_in_Martil_beach.jpg",
    "sourceTitle": "File:A seagull flying in Martil beach.jpg",
    "title": {
      "fr": "La plage de Martil",
      "ar": "شاطئ مرتيل",
      "en": "Martil beach",
      "es": "La playa de Martil"
    },
    "author": "Mohamed Haddi",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "originalWidth": 4806,
    "originalHeight": 2920,
    "entryIds": [
      "martil"
    ],
    "changes": {
      "fr": "Redimensionnement proportionnel et compression JPEG ; aucun agrandissement.",
      "ar": "تصغير تناسبي وضغط JPEG دون تكبير.",
      "en": "Proportional resizing and JPEG compression; no upscaling.",
      "es": "Redimensionado proporcional y compresión JPEG, sin ampliación."
    },
    "width": 2560,
    "height": 1555
  },
  {
    "id": "martil-promenade",
    "src": "assets/locations/martil-promenade.jpg",
    "remote": "https://upload.wikimedia.org/wikipedia/commons/f/f5/%D9%83%D9%88%D8%B1%D9%86%D9%8A%D8%B4_%D9%85%D8%A7%D8%B1%D8%AA%D9%8A%D9%84.jpg",
    "source": "https://commons.wikimedia.org/wiki/File:%D9%83%D9%88%D8%B1%D9%86%D9%8A%D8%B4_%D9%85%D8%A7%D8%B1%D8%AA%D9%8A%D9%84.jpg",
    "sourceTitle": "File:كورنيش مارتيل.jpg",
    "title": {
      "fr": "La promenade de Martil",
      "ar": "كورنيش مرتيل",
      "en": "The Martil promenade",
      "es": "El paseo marítimo de Martil"
    },
    "author": "RACHID BAYA",
    "license": "CC0",
    "licenseUrl": "https://creativecommons.org/publicdomain/zero/1.0/",
    "originalWidth": 4080,
    "originalHeight": 3060,
    "entryIds": [
      "martil"
    ],
    "changes": {
      "fr": "Redimensionnement proportionnel et compression JPEG ; aucun agrandissement.",
      "ar": "تصغير تناسبي وضغط JPEG دون تكبير.",
      "en": "Proportional resizing and JPEG compression; no upscaling.",
      "es": "Redimensionado proporcional y compresión JPEG, sin ampliación."
    },
    "width": 2560,
    "height": 1920
  },
  {
    "id": "feddan-park",
    "src": "assets/locations/feddan-park.jpg",
    "remote": "https://upload.wikimedia.org/wikipedia/commons/1/1f/Feddan_Park_Tetouan_2.jpg",
    "source": "https://commons.wikimedia.org/wiki/File:Feddan_Park_Tetouan_2.jpg",
    "sourceTitle": "File:Feddan Park Tetouan 2.jpg",
    "title": {
      "fr": "Le Feddan Park, autre point de vue",
      "ar": "ساحة الفدان من زاوية أخرى",
      "en": "Feddan Park from another viewpoint",
      "es": "El Feddan Park desde otro ángulo"
    },
    "author": "BOUCHRA MOUSSAOUI",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "originalWidth": 1803,
    "originalHeight": 2048,
    "entryIds": [
      "feddan"
    ],
    "changes": {
      "fr": "Redimensionnement proportionnel et compression JPEG ; aucun agrandissement.",
      "ar": "تصغير تناسبي وضغط JPEG دون تكبير.",
      "en": "Proportional resizing and JPEG compression; no upscaling.",
      "es": "Redimensionado proporcional y compresión JPEG, sin ampliación."
    },
    "width": 1803,
    "height": 2048
  },
  {
    "id": "feddan-square",
    "src": "assets/locations/feddan-square.jpg",
    "remote": "https://upload.wikimedia.org/wikipedia/commons/c/c4/Feddan_Park_Tetouan_3.jpg",
    "source": "https://commons.wikimedia.org/wiki/File:Feddan_Park_Tetouan_3.jpg",
    "sourceTitle": "File:Feddan Park Tetouan 3.jpg",
    "title": {
      "fr": "Une vue de la place du Feddan",
      "ar": "منظر لساحة الفدان",
      "en": "A view of Feddan Square",
      "es": "Una vista de la plaza del Feddan"
    },
    "author": "BOUCHRA MOUSSAOUI",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "originalWidth": 1720,
    "originalHeight": 1720,
    "entryIds": [
      "feddan"
    ],
    "changes": {
      "fr": "Redimensionnement proportionnel et compression JPEG ; aucun agrandissement.",
      "ar": "تصغير تناسبي وضغط JPEG دون تكبير.",
      "en": "Proportional resizing and JPEG compression; no upscaling.",
      "es": "Redimensionado proporcional y compresión JPEG, sin ampliación."
    },
    "width": 1720,
    "height": 1720
  },
  {
    "id": "ensanche-square",
    "src": "assets/locations/ensanche-square.jpg",
    "remote": "https://upload.wikimedia.org/wikipedia/commons/6/67/Spanish_town_in_Tetouan.jpeg",
    "source": "https://commons.wikimedia.org/wiki/File:Spanish_town_in_Tetouan.jpeg",
    "sourceTitle": "File:Spanish town in Tetouan.jpeg",
    "title": {
      "fr": "L’architecture de l’Ensanche autour de la place Moulay El Mehdi",
      "ar": "هندسة الإنسانشي حول ساحة مولاي المهدي",
      "en": "Ensanche architecture around Place Moulay El Mehdi",
      "es": "Arquitectura del Ensanche alrededor de la plaza Moulay El Mehdi"
    },
    "author": "Yassine Abbadi from Tétouan, Morocco",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "originalWidth": 5163,
    "originalHeight": 3098,
    "entryIds": [
      "ensanche"
    ],
    "changes": {
      "fr": "Redimensionnement proportionnel et compression JPEG ; aucun agrandissement.",
      "ar": "تصغير تناسبي وضغط JPEG دون تكبير.",
      "en": "Proportional resizing and JPEG compression; no upscaling.",
      "es": "Redimensionado proporcional y compresión JPEG, sin ampliación."
    },
    "width": 2560,
    "height": 1536
  },
  {
    "id": "ensanche-church",
    "src": "assets/locations/ensanche-church.jpg",
    "remote": "https://upload.wikimedia.org/wikipedia/commons/5/58/Church_of_our_Lady_of_Victory%2C_Tetouan_4.jpg",
    "source": "https://commons.wikimedia.org/wiki/File:Church_of_our_Lady_of_Victory,_Tetouan_4.jpg",
    "sourceTitle": "File:Church of our Lady of Victory, Tetouan 4.jpg",
    "title": {
      "fr": "L’église Notre-Dame-des-Victoires dans l’Ensanche",
      "ar": "كنيسة سيدة الانتصار داخل الإنسانشي",
      "en": "Our Lady of Victory church in the Ensanche",
      "es": "La iglesia de Nuestra Señora de las Victorias en el Ensanche"
    },
    "author": "Ideophagous",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "originalWidth": 3264,
    "originalHeight": 2448,
    "entryIds": [
      "ensanche"
    ],
    "changes": {
      "fr": "Redimensionnement proportionnel et compression JPEG ; aucun agrandissement.",
      "ar": "تصغير تناسبي وضغط JPEG دون تكبير.",
      "en": "Proportional resizing and JPEG compression; no upscaling.",
      "es": "Redimensionado proporcional y compresión JPEG, sin ampliación."
    },
    "width": 2560,
    "height": 1920
  },
  {
    "id": "mellah-street",
    "src": "assets/locations/mellah-street.jpg",
    "remote": "https://upload.wikimedia.org/wikipedia/commons/3/3d/Mellah_de_Tetouan_10112020_004.jpg",
    "source": "https://commons.wikimedia.org/wiki/File:Mellah_de_Tetouan_10112020_004.jpg",
    "sourceTitle": "File:Mellah de Tetouan 10112020 004.jpg",
    "title": {
      "fr": "Une fontaine dans le Mellah de Tétouan",
      "ar": "نافورة في ملاح تطوان",
      "en": "A fountain in the Mellah of Tétouan",
      "es": "Una fuente del Mellah de Tetuán"
    },
    "author": "Yamen",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "originalWidth": 2634,
    "originalHeight": 3731,
    "entryIds": [
      "mellah"
    ],
    "changes": {
      "fr": "Redimensionnement proportionnel et compression JPEG ; aucun agrandissement.",
      "ar": "تصغير تناسبي وضغط JPEG دون تكبير.",
      "en": "Proportional resizing and JPEG compression; no upscaling.",
      "es": "Redimensionado proporcional y compresión JPEG, sin ampliación."
    },
    "width": 1807,
    "height": 2560
  },
  {
    "id": "mellah-passage",
    "src": "assets/locations/mellah-passage.jpg",
    "remote": "https://upload.wikimedia.org/wikipedia/commons/2/2d/Mellah_de_Tetouan_10112020_022.jpg",
    "source": "https://commons.wikimedia.org/wiki/File:Mellah_de_Tetouan_10112020_022.jpg",
    "sourceTitle": "File:Mellah de Tetouan 10112020 022.jpg",
    "title": {
      "fr": "Une porte et sa plaque dans le Mellah",
      "ar": "باب ولافتته في الملاح",
      "en": "A doorway and its plaque in the Mellah",
      "es": "Una puerta y su placa en el Mellah"
    },
    "author": "Yamen",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "originalWidth": 3024,
    "originalHeight": 4032,
    "entryIds": [
      "mellah"
    ],
    "changes": {
      "fr": "Redimensionnement proportionnel et compression JPEG ; aucun agrandissement.",
      "ar": "تصغير تناسبي وضغط JPEG دون تكبير.",
      "en": "Proportional resizing and JPEG compression; no upscaling.",
      "es": "Redimensionado proporcional y compresión JPEG, sin ampliación."
    },
    "width": 1920,
    "height": 2560
  },
  {
    "id": "mellah-facades",
    "src": "assets/locations/mellah-facades.jpg",
    "remote": "https://upload.wikimedia.org/wikipedia/commons/e/e9/Jewish_quarter%2C_Mellah_of_Tetouan.jpg",
    "source": "https://commons.wikimedia.org/wiki/File:Jewish_quarter,_Mellah_of_Tetouan.jpg",
    "sourceTitle": "File:Jewish quarter, Mellah of Tetouan.jpg",
    "title": {
      "fr": "Les façades du Mellah de Tétouan",
      "ar": "واجهات ملاح تطوان",
      "en": "Façades in the Mellah of Tétouan",
      "es": "Fachadas del Mellah de Tetuán"
    },
    "author": "TomiValny",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "originalWidth": 1723,
    "originalHeight": 2756,
    "entryIds": [
      "mellah"
    ],
    "changes": {
      "fr": "Redimensionnement proportionnel et compression JPEG ; aucun agrandissement.",
      "ar": "تصغير تناسبي وضغط JPEG دون تكبير.",
      "en": "Proportional resizing and JPEG compression; no upscaling.",
      "es": "Redimensionado proporcional y compresión JPEG, sin ampliación."
    },
    "width": 1600,
    "height": 2560
  },
  {
    "id": "dar-sanaa-facade",
    "src": "assets/locations/dar-sanaa-facade.jpg",
    "remote": "https://upload.wikimedia.org/wikipedia/commons/6/64/%C3%89cole_des_arts_et_m%C3%A9tiers_%28Dar_Sanaa%29.jpg",
    "source": "https://commons.wikimedia.org/wiki/File:%C3%89cole_des_arts_et_m%C3%A9tiers_(Dar_Sanaa).jpg",
    "sourceTitle": "File:École des arts et métiers (Dar Sanaa).jpg",
    "title": {
      "fr": "La façade de l’École des arts et métiers Dar Sanaa",
      "ar": "واجهة مدرسة الفنون والحرف دار الصنعة",
      "en": "The façade of Dar Sanaa School of Arts and Crafts",
      "es": "La fachada de la Escuela de Artes y Oficios Dar Sanaa"
    },
    "author": "YOUSSEF_AKSISSOU",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "rightsStatus": "licensed",
    "hosting": "local",
    "originalWidth": 2592,
    "originalHeight": 1944,
    "entryIds": [
      "dar-sanaa"
    ],
    "changes": {
      "fr": "Redimensionnement proportionnel et compression JPEG ; aucun agrandissement.",
      "ar": "تصغير تناسبي وضغط JPEG دون تكبير.",
      "en": "Proportional resizing and JPEG compression; no upscaling.",
      "es": "Redimensionado proporcional y compresión JPEG, sin ampliación."
    },
    "checkedOn": "2026-10-11",
    "width": 2560,
    "height": 1920
  },
  {
    "id": "dersa-kasbah",
    "src": "assets/locations/dersa-kasbah.jpg",
    "remote": "https://upload.wikimedia.org/wikipedia/commons/5/5f/%D9%82%D8%B5%D8%A8%D8%A9_%D8%AC%D8%A8%D9%84_%D8%AF%D8%B1%D8%B3%D8%A9_%D8%A7%D9%84%D9%85%D9%86%D8%B8%D8%B1%D9%8A%D8%A9%D8%8C_%D8%AA%D8%B7%D9%88%D8%A7%D9%86_4.jpg",
    "source": "https://commons.wikimedia.org/wiki/File:%D9%82%D8%B5%D8%A8%D8%A9_%D8%AC%D8%A8%D9%84_%D8%AF%D8%B1%D8%B3%D8%A9_%D8%A7%D9%84%D9%85%D9%86%D8%B8%D8%B1%D9%8A%D8%A9%D8%8C_%D8%AA%D8%B7%D9%88%D8%A7%D9%86_4.jpg",
    "sourceTitle": "File:قصبة جبل درسة المنظرية، تطوان 4.jpg",
    "title": {
      "fr": "La kasbah sur les hauteurs de Jbel Dersa",
      "ar": "القصبة بمرتفعات جبل درسة",
      "en": "The kasbah on the heights of Jbel Dersa",
      "es": "La alcazaba en las alturas de Jbel Dersa"
    },
    "author": "Ideophagous",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "rightsStatus": "licensed",
    "hosting": "local",
    "originalWidth": 3264,
    "originalHeight": 2448,
    "entryIds": [
      "jbel-dersa"
    ],
    "changes": {
      "fr": "Redimensionnement proportionnel et compression JPEG ; aucun agrandissement.",
      "ar": "تصغير تناسبي وضغط JPEG دون تكبير.",
      "en": "Proportional resizing and JPEG compression; no upscaling.",
      "es": "Redimensionado proporcional y compresión JPEG, sin ampliación."
    },
    "checkedOn": "2026-10-11",
    "width": 2560,
    "height": 1920
  },
  {
    "id": "dersa-barracks",
    "src": "assets/locations/dersa-barracks.jpg",
    "remote": "https://upload.wikimedia.org/wikipedia/commons/8/83/%D8%A7%D9%84%D8%AB%D9%83%D9%86%D8%A9_%D8%A7%D9%84%D8%B9%D8%B3%D9%83%D8%B1%D9%8A%D8%A9_%D8%A7%D9%84%D9%82%D8%AF%D9%8A%D9%85%D8%A9_%D9%84%D9%84%D8%B1%D9%8A%D9%83%D9%88%D9%84%D8%A7%D8%B1%D9%8A%D8%B3_%D8%A8%D9%82%D8%B5%D8%A8%D8%A9_%D8%AC%D8%A8%D9%84_%D8%AF%D8%B1%D8%B3%D8%A9%D8%8C_%D8%AA%D8%B7%D9%88%D8%A7%D9%86.jpg",
    "source": "https://commons.wikimedia.org/wiki/File:%D8%A7%D9%84%D8%AB%D9%83%D9%86%D8%A9_%D8%A7%D9%84%D8%B9%D8%B3%D9%83%D8%B1%D9%8A%D8%A9_%D8%A7%D9%84%D9%82%D8%AF%D9%8A%D9%85%D8%A9_%D9%84%D9%84%D8%B1%D9%8A%D9%83%D9%88%D9%84%D8%A7%D8%B1%D9%8A%D8%B3_%D8%A8%D9%82%D8%B5%D8%A8%D8%A9_%D8%AC%D8%A8%D9%84_%D8%AF%D8%B1%D8%B3%D8%A9%D8%8C_%D8%AA%D8%B7%D9%88%D8%A7%D9%86.jpg",
    "sourceTitle": "File:الثكنة العسكرية القديمة للريكولاريس بقصبة جبل درسة، تطوان.jpg",
    "title": {
      "fr": "Les anciennes casernes sur Jbel Dersa, vues depuis la ville — octobre 2026",
      "ar": "الثكنات القديمة على جبل درسة من المدينة — أكتوبر 2026",
      "en": "The former barracks on Jbel Dersa, seen from the city — October 2026",
      "es": "Los antiguos cuarteles de Jbel Dersa vistos desde la ciudad — octubre de 2026"
    },
    "author": "Dahbi fatima zahrae",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "rightsStatus": "licensed",
    "hosting": "local",
    "originalWidth": 1868,
    "originalHeight": 3901,
    "entryIds": [
      "jbel-dersa"
    ],
    "changes": {
      "fr": "Redimensionnement proportionnel et compression JPEG ; aucun agrandissement.",
      "ar": "تصغير تناسبي وضغط JPEG دون تكبير.",
      "en": "Proportional resizing and JPEG compression; no upscaling.",
      "es": "Redimensionado proporcional y compresión JPEG, sin ampliación."
    },
    "checkedOn": "2026-10-11",
    "width": 1226,
    "height": 2560
  },
  {
    "id": "el-ayoun-archive",
    "src": "assets/locations/el-ayoun-archive.jpg",
    "remote": "https://upload.wikimedia.org/wikipedia/commons/6/6f/Vista_del_barrio_del_Ay%C3%BAn_y_el_Ensanche_Espa%C3%B1ol_de_Tet%C3%BA%C3%A1n.jpg",
    "source": "https://commons.wikimedia.org/wiki/File:Vista_del_barrio_del_Ay%C3%BAn_y_el_Ensanche_Espa%C3%B1ol_de_Tet%C3%BA%C3%A1n.jpg",
    "sourceTitle": "File:Vista del barrio del Ayún y el Ensanche Español de Tetúán.jpg",
    "title": {
      "fr": "El Ayoun et l’Ensanche depuis Dersa — photographie d’archive, mai 2008",
      "ar": "العيون والإنسانشي من درسة — صورة أرشيفية، ماي 2008",
      "en": "El Ayoun and the Ensanche from Dersa — archive photograph, May 2008",
      "es": "El Ayún y el Ensanche desde Dersa — fotografía de archivo, mayo de 2008"
    },
    "author": "Jaro Varga",
    "license": "CC BY-SA 3.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
    "rightsStatus": "licensed",
    "hosting": "local",
    "originalWidth": 1024,
    "originalHeight": 768,
    "entryIds": [
      "el-ayoun"
    ],
    "changes": {
      "fr": "Redimensionnement proportionnel et compression JPEG ; aucun agrandissement.",
      "ar": "تصغير تناسبي وضغط JPEG دون تكبير.",
      "en": "Proportional resizing and JPEG compression; no upscaling.",
      "es": "Redimensionado proporcional y compresión JPEG, sin ampliación."
    },
    "checkedOn": "2026-10-11",
    "width": 1024,
    "height": 768
  },
  {
    "id": "dar-oddi-exhibition-entry",
    "src": "https://dareloddi.com/wp-content/uploads/2018/07/Inicio-1A.jpg",
    "remote": "https://dareloddi.com/wp-content/uploads/2018/07/Inicio-1A.jpg",
    "source": "https://dareloddi.com/?lang=fr",
    "sourceTitle": "https://dareloddi.com/?lang=fr",
    "title": {
      "fr": "L’entrée de l’exposition Visions de Tétouan à Dar El Oddi",
      "ar": "مدخل معرض «رؤى تطوان» بدار العدي",
      "en": "The Visions of Tétouan exhibition entrance at Dar El Oddi",
      "es": "La entrada a la exposición Visiones de Tetuán en Dar El Oddi"
    },
    "author": "Dar El Oddi",
    "license": "© Dar El Oddi · All rights reserved",
    "licenseUrl": "https://dareloddi.com/?lang=fr",
    "rightsStatus": "reserved",
    "hosting": "remote",
    "originalWidth": 1601,
    "originalHeight": 1200,
    "width": 1601,
    "height": 1200,
    "entryIds": [
      "dar-oddi"
    ],
    "changes": {
      "fr": "Image originale affichée depuis le site de son éditeur ; droits réservés.",
      "ar": "الصورة الأصلية معروضة من موقع ناشرها؛ الحقوق محفوظة.",
      "en": "Original image displayed from its publisher’s website; rights reserved.",
      "es": "Imagen original mostrada desde la web de su editor; derechos reservados."
    },
    "checkedOn": "2026-10-11"
  },
  {
    "id": "dar-oddi-courtyard",
    "src": "https://dareloddi.com/wp-content/uploads/2018/07/Inicio-2.jpg",
    "remote": "https://dareloddi.com/wp-content/uploads/2018/07/Inicio-2.jpg",
    "source": "https://dareloddi.com/?lang=fr",
    "sourceTitle": "https://dareloddi.com/?lang=fr",
    "title": {
      "fr": "La cour restaurée de la maison El Oddi",
      "ar": "الباحة المرممة لدار العدي",
      "en": "The restored courtyard of the El Oddi house",
      "es": "El patio restaurado de la casa El Oddi"
    },
    "author": "Dar El Oddi",
    "license": "© Dar El Oddi · All rights reserved",
    "licenseUrl": "https://dareloddi.com/?lang=fr",
    "rightsStatus": "reserved",
    "hosting": "remote",
    "originalWidth": 1602,
    "originalHeight": 1200,
    "width": 1602,
    "height": 1200,
    "entryIds": [
      "dar-oddi"
    ],
    "changes": {
      "fr": "Image originale affichée depuis le site de son éditeur ; droits réservés.",
      "ar": "الصورة الأصلية معروضة من موقع ناشرها؛ الحقوق محفوظة.",
      "en": "Original image displayed from its publisher’s website; rights reserved.",
      "es": "Imagen original mostrada desde la web de su editor; derechos reservados."
    },
    "checkedOn": "2026-10-11"
  },
  {
    "id": "dar-oddi-exhibition-gallery",
    "src": "https://dareloddi.com/wp-content/uploads/2018/07/inicio-car4-1024x300.jpg",
    "remote": "https://dareloddi.com/wp-content/uploads/2018/07/inicio-car4-1024x300.jpg",
    "source": "https://dareloddi.com/?lang=fr",
    "sourceTitle": "https://dareloddi.com/?lang=fr",
    "title": {
      "fr": "La galerie d’exposition de Dar El Oddi — photographie panoramique publiée par le lieu",
      "ar": "قاعة معرض دار العدي — صورة بانورامية منشورة من الفضاء",
      "en": "Dar El Oddi’s exhibition gallery — panoramic photograph published by the venue",
      "es": "La galería de Dar El Oddi — fotografía panorámica publicada por el espacio"
    },
    "author": "Dar El Oddi",
    "license": "© Dar El Oddi · All rights reserved",
    "licenseUrl": "https://dareloddi.com/?lang=fr",
    "rightsStatus": "reserved",
    "hosting": "remote",
    "originalWidth": 1024,
    "originalHeight": 300,
    "width": 1024,
    "height": 300,
    "entryIds": [
      "dar-oddi"
    ],
    "changes": {
      "fr": "Image originale affichée depuis le site de son éditeur ; droits réservés.",
      "ar": "الصورة الأصلية معروضة من موقع ناشرها؛ الحقوق محفوظة.",
      "en": "Original image displayed from its publisher’s website; rights reserved.",
      "es": "Imagen original mostrada desde la web de su editor; derechos reservados."
    },
    "checkedOn": "2026-10-11"
  },
  {
    "id": "dar-sanaa-painting-workshop",
    "src": "https://www.scottponemone.com/wp-content/uploads/2018/12/Dar-Sanaa-painting-690x1035.jpg",
    "remote": "https://www.scottponemone.com/wp-content/uploads/2018/12/Dar-Sanaa-painting-690x1035.jpg",
    "source": "https://www.scottponemone.com/tetouan-art-i-see/",
    "sourceTitle": "https://www.scottponemone.com/tetouan-art-i-see/",
    "title": {
      "fr": "Études de motifs à Dar Sanaa — montage photographique de la visite de 2018",
      "ar": "دراسة الزخارف بدار الصنعة — تركيب صور من زيارة سنة 2018",
      "en": "Pattern studies at Dar Sanaa — photographic collage from the 2018 visit",
      "es": "Estudio de motivos en Dar Sanaa — montaje fotográfico de la visita de 2018"
    },
    "author": "Scott Ponemone",
    "license": "© Scott Ponemone · All rights reserved",
    "licenseUrl": "https://www.scottponemone.com/tetouan-art-i-see/",
    "rightsStatus": "reserved",
    "hosting": "remote",
    "originalWidth": 690,
    "originalHeight": 1035,
    "width": 690,
    "height": 1035,
    "entryIds": [
      "dar-sanaa"
    ],
    "changes": {
      "fr": "Image originale affichée depuis le site de son éditeur ; droits réservés.",
      "ar": "الصورة الأصلية معروضة من موقع ناشرها؛ الحقوق محفوظة.",
      "en": "Original image displayed from its publisher’s website; rights reserved.",
      "es": "Imagen original mostrada desde la web de su editor; derechos reservados."
    },
    "checkedOn": "2026-10-11"
  },
  {
    "id": "dar-sanaa-embroidery-workshop",
    "src": "https://www.scottponemone.com/wp-content/uploads/2018/12/Dar-Sanaa-sew-690x623.jpg",
    "remote": "https://www.scottponemone.com/wp-content/uploads/2018/12/Dar-Sanaa-sew-690x623.jpg",
    "source": "https://www.scottponemone.com/tetouan-art-i-see/",
    "sourceTitle": "https://www.scottponemone.com/tetouan-art-i-see/",
    "title": {
      "fr": "Broderie à Dar Sanaa — montage photographique de la visite de 2018",
      "ar": "التطريز بدار الصنعة — تركيب صور من زيارة سنة 2018",
      "en": "Embroidery at Dar Sanaa — photographic collage from the 2018 visit",
      "es": "Bordado en Dar Sanaa — montaje fotográfico de la visita de 2018"
    },
    "author": "Scott Ponemone",
    "license": "© Scott Ponemone · All rights reserved",
    "licenseUrl": "https://www.scottponemone.com/tetouan-art-i-see/",
    "rightsStatus": "reserved",
    "hosting": "remote",
    "originalWidth": 690,
    "originalHeight": 623,
    "width": 690,
    "height": 623,
    "entryIds": [
      "dar-sanaa"
    ],
    "changes": {
      "fr": "Image originale affichée depuis le site de son éditeur ; droits réservés.",
      "ar": "الصورة الأصلية معروضة من موقع ناشرها؛ الحقوق محفوظة.",
      "en": "Original image displayed from its publisher’s website; rights reserved.",
      "es": "Imagen original mostrada desde la web de su editor; derechos reservados."
    },
    "checkedOn": "2026-10-11"
  }
];
// Reuse the club's verified stadium sources rather than duplicate photographs or metadata.
// A stadium photograph is labelled as the stadium, not as a view of the whole district.
for(const [index,p] of footballDetails.stadium.photos.entries())locationPhotos.push({
 id:['saniat-rmel-2017-renovation','saniat-rmel-2026-cup','saniat-rmel-2025-derby'][index],
 src:p.src,remote:p.src,source:p.source,sourceTitle:p.source,title:p.caption,
 author:p.author,license:p.license,licenseUrl:p.licenseUrl,rightsStatus:'reserved',hosting:'remote',
 originalWidth:p.width,originalHeight:p.height,width:p.width,height:p.height,entryIds:['saniat-rmel'],
 changes:T('Image originale affichée depuis le site officiel du club ; droits réservés.','الصورة الأصلية معروضة من الموقع الرسمي للنادي؛ الحقوق محفوظة.','Original image displayed from the club’s official website; rights reserved.','Imagen original mostrada desde la web oficial del club; derechos reservados.'),checkedOn:footballDetails.checkedOn
});
const unavailable=T('Aucune photographie du lieu avec attribution et droit de réutilisation vérifiés n’a été retenue.','لم يتم اعتماد صورة للمكان مع توثيق نسبتها وحق إعادة استخدامها.','No photograph of this specific place with verified attribution and reuse rights has been selected.','No se ha seleccionado una fotografía de este lugar concreto con autoría y derechos de reutilización verificados.');
export const photoCoverage={};
for(const id of ['el-blad','el-ayoun','trankat','souika','mellah','rbat-aala','rbat-asfal','essania','ensanche','feddan','bab-okla','saniat-rmel','palais','museum','dar-oddi','dar-sanaa','jbel-dersa','tamuda','martil','taboula','jamaa-mezouak','mhannech','boujarrah','touibla','samsa','sidi-bahrouri'])photoCoverage[id]={status:'unavailable',photoIds:[],reason:unavailable};
for(const [id,photoIds]of [
 ['museum',['museum-courtyard','museum-fortress','museum-entrance']],
 ['tamuda',['tamuda-camp','tamuda-walls','tamuda-northern-gate','tamuda-view']],
 ['palais',['palace','palace-square','palace-facade']],
 ['bab-okla',['babokla','bab-oqla-gate','bab-oqla-medina']],
 ['martil',['martil-beach','martil','martil-promenade']],
 ['feddan',['feddan','feddan-park','feddan-square']],
 ['ensanche',['ensanche-square','ensanche','ensanche-church']],
 ['mellah',['mellah-facades','mellah-street','mellah-passage']],
 ['jbel-dersa',['panorama','dersa-kasbah','dersa-barracks']],
 ['el-ayoun',['el-ayoun-archive']],
 ['saniat-rmel',['saniat-rmel-2017-renovation','saniat-rmel-2026-cup','saniat-rmel-2025-derby']],
 ['dar-oddi',['dar-oddi-courtyard','dar-oddi-exhibition-entry','dar-oddi-exhibition-gallery']],
 ['dar-sanaa',['dar-sanaa-facade','dar-sanaa-painting-workshop','dar-sanaa-embroidery-workshop']]
])photoCoverage[id]={status:'verified',photoIds,reason:T('Photographies identifiées sur leurs pages sources et vérifiées visuellement ; les légendes précisent les sujets et les points de vue.','صور موثقة في صفحاتها الأصلية ومراجعة بصرياً؛ توضح التعليقات المواضيع وزوايا التصوير.','Photographs identified on their source pages and visually reviewed; captions specify subjects and viewpoints.','Fotografías identificadas en sus páginas de origen y revisadas visualmente; los pies precisan los lugares y los puntos de vista.')};
for(const [id,record] of Object.entries(locationRecords))record.photoIds=photoCoverage[id]?.photoIds??[];
