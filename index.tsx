export type Museum = {
  name: string;
  city: string;
  country: string;
  type: string;
  admission: "free" | "paid";
  tags: string[];
  desc: string;
  url: string;
  founded?: number;
  visitors?: number; // millions per year
};

export const museums: Museum[] = [
  // France
  { name: "Louvre", city: "Paris", country: "France", type: "Art & Antiquités", admission: "paid", tags: ["peinture", "sculpture", "antiquités"], desc: "Le plus grand musée d'art du monde, abritant la Joconde, la Vénus de Milo et des milliers d'œuvres couvrant sept millénaires de civilisations.", url: "https://www.louvre.fr", founded: 1793, visitors: 9.6 },
  { name: "Musée d'Orsay", city: "Paris", country: "France", type: "Impressionnisme", admission: "paid", tags: ["impressionnisme", "peinture", "sculpture"], desc: "Installé dans une ancienne gare, ce musée possède la plus grande collection d'art impressionniste au monde, avec Monet, Renoir et Van Gogh.", url: "https://www.musee-orsay.fr", founded: 1986, visitors: 3.2 },
  { name: "Centre Pompidou", city: "Paris", country: "France", type: "Art moderne", admission: "paid", tags: ["art moderne", "design", "architecture"], desc: "Temple de l'art moderne et contemporain, avec une architecture radicale retournée vers l'extérieur et une collection de plus de 120 000 œuvres.", url: "https://www.centrepompidou.fr", founded: 1977, visitors: 3.1 },
  { name: "Musée de l'Orangerie", city: "Paris", country: "France", type: "Impressionnisme", admission: "paid", tags: ["Monet", "Nymphéas", "impressionnisme"], desc: "Écrin lumineux aux Tuileries dédié aux Nymphéas de Monet, huit toiles panoramiques installées dans deux salles ovales selon le vœu du peintre.", url: "https://www.musee-orangerie.fr", founded: 1927, visitors: 1.0 },
  { name: "Musée Rodin", city: "Paris", country: "France", type: "Sculpture", admission: "paid", tags: ["sculpture", "Rodin", "art moderne"], desc: "L'hôtel Biron et son jardin accueillent les chefs-d'œuvre de Rodin : Le Penseur, Le Baiser, Les Bourgeois de Calais, dans un cadre exceptionnel.", url: "https://www.musee-rodin.fr", founded: 1919, visitors: 0.7 },
  { name: "Musée du quai Branly", city: "Paris", country: "France", type: "Arts premiers", admission: "paid", tags: ["arts premiers", "Afrique", "Océanie"], desc: "Dédié aux arts et civilisations d'Afrique, d'Asie, d'Océanie et des Amériques, ce musée singulier au bord de la Seine offre un voyage aux quatre coins du monde.", url: "https://www.quaibranly.fr", founded: 2006, visitors: 1.4 },
  { name: "Musée de Cluny", city: "Paris", country: "France", type: "Moyen Âge", admission: "paid", tags: ["Moyen Âge", "tapisseries", "art médiéval"], desc: "Niché dans un hôtel médiéval et des thermes gallo-romains, il abrite La Dame à la licorne, l'une des plus belles tapisseries au monde.", url: "https://www.musee-moyenage.fr", founded: 1843, visitors: 0.5 },

  // Royaume-Uni
  { name: "British Museum", city: "Londres", country: "Royaume-Uni", type: "Histoire & Archéologie", admission: "free", tags: ["archéologie", "histoire", "monde antique"], desc: "L'un des plus grands musées du monde, avec des collections retraçant l'histoire de l'humanité depuis la préhistoire, dont la Pierre de Rosette.", url: "https://www.britishmuseum.org", founded: 1753, visitors: 5.8 },
  { name: "National Gallery", city: "Londres", country: "Royaume-Uni", type: "Peinture", admission: "free", tags: ["peinture", "Renaissance", "maîtres anciens"], desc: "Galerie nationale abritant plus de 2 300 peintures européennes allant du XIIIe au XIXe siècle, dont des œuvres de Van Eyck, Turner et Velázquez.", url: "https://www.nationalgallery.org.uk", founded: 1824, visitors: 6.0 },
  { name: "Tate Modern", city: "Londres", country: "Royaume-Uni", type: "Art contemporain", admission: "free", tags: ["art contemporain", "art moderne", "installations"], desc: "Installée dans une ancienne centrale électrique sur la Tamise, la Tate Modern est l'un des musées d'art contemporain les plus visités au monde.", url: "https://www.tate.org.uk/visit/tate-modern", founded: 2000, visitors: 5.9 },
  { name: "Victoria and Albert Museum", city: "Londres", country: "Royaume-Uni", type: "Arts décoratifs", admission: "free", tags: ["design", "mode", "arts décoratifs"], desc: "Le plus grand musée au monde dédié aux arts décoratifs et au design, couvrant 5 000 ans de création humaine avec plus de 2,8 millions d'objets.", url: "https://www.vam.ac.uk", founded: 1852, visitors: 3.9 },
  { name: "National Museum of Scotland", city: "Édimbourg", country: "Royaume-Uni", type: "Histoire naturelle", admission: "free", tags: ["Écosse", "histoire naturelle", "sciences"], desc: "Un musée majeur d'Édimbourg retraçant l'histoire naturelle, les sciences et la culture écossaise depuis les origines jusqu'à aujourd'hui.", url: "https://www.nms.ac.uk", founded: 1998, visitors: 2.2 },

  // Pays-Bas
  { name: "Rijksmuseum", city: "Amsterdam", country: "Pays-Bas", type: "Art & Histoire", admission: "paid", tags: ["âge d'or hollandais", "Rembrandt", "Vermeer"], desc: "Le musée national des Pays-Bas, célébrant l'âge d'or hollandais avec La Ronde de nuit de Rembrandt et des centaines de chefs-d'œuvre du XVIIe siècle.", url: "https://www.rijksmuseum.nl", founded: 1800, visitors: 2.5 },
  { name: "Van Gogh Museum", city: "Amsterdam", country: "Pays-Bas", type: "Peinture", admission: "paid", tags: ["Van Gogh", "post-impressionnisme", "peinture"], desc: "La plus grande collection au monde d'œuvres de Vincent van Gogh, avec plus de 200 peintures, 500 dessins et 700 lettres du peintre néerlandais.", url: "https://www.vangoghmuseum.nl", founded: 1973, visitors: 2.1 },

  // Espagne
  { name: "Prado", city: "Madrid", country: "Espagne", type: "Peinture", admission: "paid", tags: ["peinture espagnole", "Goya", "Vélasquez"], desc: "Le principal musée national espagnol, avec la plus grande collection au monde de peintures de Goya, Velázquez, El Greco et Rubens.", url: "https://www.museodelprado.es", founded: 1819, visitors: 3.2 },
  { name: "Museo Reina Sofía", city: "Madrid", country: "Espagne", type: "Art contemporain", admission: "paid", tags: ["Picasso", "Guernica", "art contemporain"], desc: "Musée national d'art moderne et contemporain, abritant Guernica de Picasso et des œuvres majeures de Dalí, Miró et Juan Gris.", url: "https://www.museoreinasofia.es", founded: 1992, visitors: 3.8 },
  { name: "Fundació Joan Miró", city: "Barcelone", country: "Espagne", type: "Art moderne", admission: "paid", tags: ["Miró", "surréalisme", "art catalan"], desc: "Écrin de lumière conçu par Josep Lluís Sert pour accueillir l'œuvre foisonnante de Joan Miró, offrant une vision complète de son univers coloré et poétique.", url: "https://www.fmirobcn.org", founded: 1975, visitors: 0.6 },

  // Italie
  { name: "Galerie des Offices (Uffizi)", city: "Florence", country: "Italie", type: "Renaissance", admission: "paid", tags: ["Renaissance", "Botticelli", "peinture italienne"], desc: "La galerie des Offices abrite une collection exceptionnelle de la Renaissance italienne, dont La Naissance de Vénus et Le Printemps de Botticelli.", url: "https://www.uffizi.it", founded: 1765, visitors: 2.3 },
  { name: "Musées du Vatican", city: "Vatican", country: "Vatican", type: "Art & Histoire", admission: "paid", tags: ["chapelle Sixtine", "Michel-Ange", "antiquités"], desc: "Complexe de musées abritant d'immenses collections pontificales, culminant avec la Chapelle Sixtine peinte par Michel-Ange.", url: "https://www.museivaticani.va", founded: 1506, visitors: 6.9 },
  { name: "Galleria Borghese", city: "Rome", country: "Italie", type: "Sculpture & Peinture", admission: "paid", tags: ["Bernin", "Caravage", "baroque"], desc: "Nichée dans la Villa Borghese, cette galerie concentre en une douzaine de salles certains des plus grands chefs-d'œuvre du baroque, dont les sculptures de Bernin.", url: "https://galleriaborghese.beniculturali.it", founded: 1903, visitors: 0.5 },
  { name: "Pinacoteca di Brera", city: "Milan", country: "Italie", type: "Peinture italienne", admission: "paid", tags: ["Renaissance", "peinture italienne", "baroque"], desc: "La principale galerie d'art de Milan, avec une collection de maîtres italiens du XIVe au XXe siècle, dont Raphaël, Caravage et Mantegna.", url: "https://pinacotecabrera.org", founded: 1809, visitors: 0.5 },

  // Allemagne
  { name: "Pergamon Museum", city: "Berlin", country: "Allemagne", type: "Archéologie", admission: "paid", tags: ["monde antique", "Proche-Orient", "Grèce antique"], desc: "Musée archéologique de renommée mondiale abritant des reconstructions monumentales dont l'Autel de Pergame et la Porte d'Ishtar de Babylone.", url: "https://www.smb.museum/pergamonmuseum", founded: 1930, visitors: 1.3 },
  { name: "Deutsches Museum", city: "Munich", country: "Allemagne", type: "Sciences & Technique", admission: "paid", tags: ["sciences", "technique", "aviation"], desc: "Le plus grand musée de sciences et techniques au monde, avec des locomotives à vapeur, des avions historiques et des laboratoires interactifs.", url: "https://www.deutsches-museum.de", founded: 1903, visitors: 1.4 },

  // Russie
  { name: "Hermitage", city: "Saint-Pétersbourg", country: "Russie", type: "Art & Culture", admission: "paid", tags: ["art occidental", "antiquités", "arts décoratifs"], desc: "L'un des plus grands musées du monde, logé dans le Palais d'Hiver des tsars, avec plus de 3 millions d'objets couvrant toute l'histoire de l'art.", url: "https://www.hermitagemuseum.org", founded: 1764, visitors: 5.0 },

  // États-Unis
  { name: "MoMA", city: "New York", country: "États-Unis", type: "Art moderne", admission: "paid", tags: ["art moderne", "art contemporain", "design"], desc: "Le Museum of Modern Art est la référence mondiale de l'art moderne, avec des œuvres de Picasso, Warhol, Dali et une collection de design et cinéma.", url: "https://www.moma.org", founded: 1929, visitors: 3.0 },
  { name: "Metropolitan Museum of Art", city: "New York", country: "États-Unis", type: "Encyclopédique", admission: "paid", tags: ["encyclopédique", "antiquités", "art américain"], desc: "Le Met est le plus grand musée d'art des États-Unis, avec 5 000 ans d'art et de culture mondiale répartis sur plus de 200 000 œuvres.", url: "https://www.metmuseum.org", founded: 1870, visitors: 6.3 },
  { name: "Smithsonian National Museum of Natural History", city: "Washington D.C.", country: "États-Unis", type: "Sciences naturelles", admission: "free", tags: ["dinosaures", "minéraux", "anthropologie"], desc: "Le musée d'histoire naturelle le plus visité au monde, avec le diamant Hope, des squelettes de dinosaures et des dioramas de faune sauvage.", url: "https://naturalhistory.si.edu", founded: 1910, visitors: 7.7 },
  { name: "Art Institute of Chicago", city: "Chicago", country: "États-Unis", type: "Beaux-Arts", admission: "paid", tags: ["impressionnisme", "art américain", "architecture"], desc: "L'un des plus anciens et des plus grands musées des États-Unis, avec une collection encyclopédique incluant Un dimanche après-midi de Seurat.", url: "https://www.artic.edu", founded: 1879, visitors: 1.5 },
  { name: "Getty Center", city: "Los Angeles", country: "États-Unis", type: "Art & Architecture", admission: "free", tags: ["art européen", "photographie", "jardins"], desc: "Perché sur les collines de Brentwood, le Getty Center offre une collection d'art européen remarquable et une vue panoramique sur Los Angeles.", url: "https://www.getty.edu", founded: 1997, visitors: 1.8 },

  // Japon
  { name: "Tokyo National Museum", city: "Tokyo", country: "Japon", type: "Art asiatique", admission: "paid", tags: ["art japonais", "samouraïs", "céramique"], desc: "Le plus ancien et le plus grand musée du Japon, avec plus de 110 000 objets retraçant l'art et la culture japonaise depuis la préhistoire.", url: "https://www.tnm.jp", founded: 1872, visitors: 2.0 },
  { name: "teamLab Borderless", city: "Tokyo", country: "Japon", type: "Art numérique", admission: "paid", tags: ["art numérique", "immersif", "technologie"], desc: "Un musée d'art numérique sans frontières où les œuvres interactives débordent de salle en salle, créant un univers immersif et en perpétuelle transformation.", url: "https://borderless.teamlab.art", founded: 2018, visitors: 2.3 },

  // Taïwan
  { name: "National Palace Museum", city: "Taipei", country: "Taïwan", type: "Art chinois", admission: "paid", tags: ["art chinois", "jade", "porcelaine"], desc: "L'une des plus grandes collections d'art chinois classique au monde, avec plus de 700 000 pièces de jade, porcelaine, peinture et calligraphie.", url: "https://www.npm.gov.tw", founded: 1925, visitors: 2.7 },

  // Égypte
  { name: "Grand Egyptian Museum", city: "Le Caire", country: "Égypte", type: "Égyptologie", admission: "paid", tags: ["pharaons", "Toutankhamon", "antiquités"], desc: "Le plus grand musée archéologique du monde, ouvert en 2023 aux portes de Gizeh, abritant l'intégralité du trésor de Toutankhamon et des milliers d'artefacts pharaoniques.", url: "https://gem.gov.eg", founded: 2023, visitors: 2.0 },

  // Grèce
  { name: "Acropolis Museum", city: "Athènes", country: "Grèce", type: "Archéologie", admission: "paid", tags: ["Grèce antique", "Parthénon", "sculpture"], desc: "Musée de verre et béton au pied de l'Acropole, mettant en valeur les sculptures du Parthénon et les découvertes archéologiques du site sacré.", url: "https://www.theacropolismuseum.gr", founded: 2009, visitors: 1.9 },

  // Australie
  { name: "National Gallery of Victoria", city: "Melbourne", country: "Australie", type: "Beaux-Arts", admission: "free", tags: ["art australien", "art international", "design"], desc: "Le plus ancien et le plus visité des musées d'Australie, avec une collection internationale de 75 000 œuvres allant de l'Antiquité à l'art contemporain.", url: "https://www.ngv.vic.gov.au", founded: 1861, visitors: 3.0 },

  // Canada
  { name: "Royal Ontario Museum", city: "Toronto", country: "Canada", type: "Encyclopédique", admission: "paid", tags: ["dinosaures", "art asiatique", "histoire naturelle"], desc: "Le plus grand musée du Canada, avec des collections de sciences naturelles, d'archéologie mondiale et d'art qui retracent 4,5 milliards d'années d'histoire.", url: "https://www.rom.on.ca", founded: 1914, visitors: 1.4 },

  // Brésil
  { name: "Museu de Arte de São Paulo (MASP)", city: "São Paulo", country: "Brésil", type: "Beaux-Arts", admission: "paid", tags: ["art européen", "art brésilien", "design"], desc: "Suspendu sur pilotis au-dessus d'une esplanade emblématique, le MASP abrite la plus importante collection d'art occidental de l'hémisphère sud.", url: "https://masp.org.br", founded: 1947, visitors: 0.9 },

  // Afrique du Sud
  { name: "Zeitz Museum of Contemporary Art Africa", city: "Le Cap", country: "Afrique du Sud", type: "Art africain contemporain", admission: "paid", tags: ["art africain", "art contemporain", "design"], desc: "Installé dans un ancien silo à grain converti, le Zeitz MOCAA est le plus grand musée d'art contemporain africain au monde, avec une architecture spectaculaire.", url: "https://zeitzmocaa.museum", founded: 2017, visitors: 0.3 },

  // Corée du Sud
  { name: "National Museum of Korea", city: "Séoul", country: "Corée du Sud", type: "Histoire & Culture", admission: "free", tags: ["art coréen", "histoire", "céramique"], desc: "Le principal musée de Corée du Sud, avec plus de 220 000 artefacts retraçant 5 000 ans d'histoire et de culture coréenne.", url: "https://www.museum.go.kr", founded: 1945, visitors: 3.3 },

  // Inde
  { name: "National Museum of India", city: "New Delhi", country: "Inde", type: "Histoire & Culture", admission: "paid", tags: ["art indien", "histoire", "archéologie"], desc: "Le plus grand musée de l'Inde, avec plus de 200 000 œuvres couvrant 5 000 ans de civilisation indienne, des statuettes de l'Indus aux miniatures mogholes.", url: "https://nationalmuseumindia.gov.in", founded: 1949, visitors: 1.0 },
];
