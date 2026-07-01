import type { LocalizedString } from "./projects";

export interface ProjectCaseStudyContent {
  overview: LocalizedString;
  designApproach: LocalizedString;
  keyFeatures: LocalizedString[];
  deliverables: LocalizedString[];
}

export const PROJECT_CASE_STUDIES: Record<string, ProjectCaseStudyContent> = {
  "sudeep-nutrition": {
    overview: {
      it: "Progettato per Vitafoods Europe di Barcellona, questo stand fieristico è stato realizzato per Sudeep Nutrition per presentare il portfolio nutraceutico in un ambiente accogliente e di forte visibilità. Il progetto combina forme architettoniche organiche, esposizioni prodotto illuminate e aree meeting aperte per favorire conversazioni, scoperta dei prodotti e networking internazionale.",
      en: "Designed for Vitafoods Europe in Barcelona, this exhibition stand was created for Sudeep Nutrition to showcase its nutraceutical portfolio in a welcoming and highly visible environment. The project combines organic architectural forms, illuminated product displays and open meeting areas to encourage conversation, product discovery and international business networking.",
    },
    designApproach: {
      it: "Il concept si sviluppa attorno a una pensilina illuminata scultorea ispirata a forme naturali, che crea un punto di riferimento visivo distintivo all'interno del padiglione. Circolazione chiara, branding integrato e spazi hospitality dedicati garantiscono comunicazione del prodotto e interazione confortevole con i clienti durante tutta la fiera.",
      en: "The concept is centred around a sculptural illuminated canopy inspired by natural forms, creating a distinctive visual landmark within the exhibition hall. Clear circulation, integrated branding and dedicated hospitality spaces ensure both product communication and comfortable client interaction throughout the event.",
    },
    keyFeatures: [
      {
        it: "Elemento architettonico organico centrale",
        en: "Organic architectural centerpiece",
      },
      {
        it: "Pareti espositive prodotto illuminate",
        en: "Illuminated product display walls",
      },
      {
        it: "Spazi meeting aperti",
        en: "Open meeting spaces",
      },
      {
        it: "Identità di brand integrata",
        en: "Integrated brand identity",
      },
    ],
    deliverables: [
      { it: "Progettazione stand fieristico", en: "Exhibition Stand Design" },
      { it: "Sviluppo tecnico", en: "Technical Development" },
      { it: "Produzione", en: "Production" },
      { it: "Installazione", en: "Installation" },
    ],
  },
  mindware: {
    overview: {
      it: "Progettato e realizzato per Mindware allo Smart City Expo World Congress di Barcellona, questo stand tecnologico unisce forme architettoniche pulite, illuminazione LED integrata e zone dedicate alle presentazioni. Lo spazio supporta dimostrazioni prodotto, incontri professionali e aree brand dedicate per NVIDIA, Dell Technologies e Southcamp Polaris.",
      en: "Designed and delivered for Mindware at Smart City Expo World Congress in Barcelona, this technology-focused exhibition stand combines clean architectural forms, integrated LED lighting and dedicated presentation zones. The space supports product demonstrations, business meetings and branded areas for NVIDIA, Dell Technologies and Southcamp Polaris.",
    },
    designApproach: {
      it: "Lo stand segue un linguaggio architettonico deciso, definito da telai strutturali illuminati, circolazione aperta e aree presentazione modulari. Zone brand distinte per Mindware e i partner tecnologici mantengono visibilità chiara a NVIDIA, Dell Technologies e Southcamp Polaris, con un'identità visiva unitaria nell'ambiente espositivo.",
      en: "The stand follows a bold architectural language defined by illuminated structural frames, open circulation and modular presentation areas. Distinct branded zones for Mindware and its technology partners maintain clear visibility for NVIDIA, Dell Technologies and Southcamp Polaris while preserving a unified visual identity across the exhibition space.",
    },
    keyFeatures: [
      {
        it: "Architettura espositiva modulare",
        en: "Modular exhibition architecture",
      },
      {
        it: "Illuminazione LED integrata",
        en: "Integrated LED lighting",
      },
      {
        it: "Area meeting dedicata",
        en: "Dedicated meeting area",
      },
      {
        it: "Zone presentazione multi-brand",
        en: "Multi-brand presentation zones",
      },
    ],
    deliverables: [
      { it: "Progettazione stand fieristico", en: "Exhibition Stand Design" },
      { it: "Sviluppo tecnico", en: "Technical Development" },
      { it: "Produzione", en: "Production" },
      { it: "Installazione", en: "Installation" },
    ],
  },
  "egypt-tourism": {
    overview: {
      it: "Il padiglione Egypt Tourism promuove l'Egitto come destinazione di viaggio globale attraverso un ambiente espositivo immersivo che unisce turismo, cultura, storia e ospitalità. Lo stand accoglie più partner — Egyptian Tourism Authority, EgyptAir, Nubian Hotels, agenzie di viaggio e operatori turistici — con aree meeting, reception e schermi digitali per la presentazione delle destinazioni.",
      en: "The Egypt Tourism pavilion promotes Egypt as a global travel destination through an immersive exhibition environment combining tourism, culture, history, and hospitality. The stand brings together multiple partners — including the Egyptian Tourism Authority, EgyptAir, Nubian Hotels, travel agencies, and tourism operators — with meeting areas, reception desks, and digital presentation screens.",
    },
    designApproach: {
      it: "Il concept architettonico si ispira all'Antico Egitto, con texture geroglifiche, portali monumentali, statue, piramidi, la Sfinge e un'identità visiva egiziana riconoscibile. Il layout aperto articola spazi hospitality premium, zone meeting, reception, display digitali e ampie superfici di branding, favorendo una circolazione fluida tra promozione turistica e networking.",
      en: "The architectural concept is inspired by Ancient Egypt, using hieroglyphic textures, monumental portals, statues, pyramids, the Sphinx, and Egyptian visual identity to create a memorable visitor experience. The large open layout combines premium hospitality spaces, meeting zones, reception counters, digital displays, and monumental branding surfaces, supporting strong visitor circulation between tourism promotion and business networking.",
    },
    keyFeatures: [
      {
        it: "Padiglione nazionale del turismo egiziano",
        en: "National tourism pavilion",
      },
      {
        it: "Esperienza culturale immersiva",
        en: "Immersive cultural experience",
      },
      {
        it: "Ambiente espositivo multi-partner",
        en: "Multi-partner exhibition environment",
      },
      {
        it: "Aree hospitality premium",
        en: "Premium hospitality areas",
      },
      {
        it: "Ampie superfici di branding monumentale",
        en: "Large branding surfaces",
      },
      {
        it: "Display digitali interattivi",
        en: "Interactive digital displays",
      },
      {
        it: "Architettura a tema dell'Antico Egitto",
        en: "Ancient Egyptian themed architecture",
      },
    ],
    deliverables: [
      { it: "Progettazione stand fieristico", en: "Exhibition Stand Design" },
      { it: "Costruzione stand", en: "Stand Construction" },
      { it: "Allestimento interno", en: "Interior Fit-Out" },
      { it: "Integrazione branding", en: "Branding Integration" },
      { it: "Progettazione illuminotecnica", en: "Lighting Design" },
      { it: "Esperienza visitatore", en: "Visitor Experience" },
      { it: "Produzione grafica", en: "Graphic Production" },
      { it: "Installazione chiavi in mano", en: "Turnkey Installation" },
    ],
  },
  "amana-foods": {
    overview: {
      it: "Creative Design ha progettato e realizzato un ampio stand fieristico per Amana Foods, presentando più marchi alimentari in un ambiente espositivo unificato. Lo stand combina esposizione premium dei prodotti, branding illuminato, media digitali, spazi hospitality e sistemi di scaffalatura organizzati per un'esperienza coinvolgente rivolta a distributori, retailer e buyer internazionali.",
      en: "Creative Design designed and built a large exhibition stand for Amana Foods, presenting multiple food brands within a unified exhibition environment. The stand combined premium product displays, illuminated branding, digital media, hospitality spaces, and organized shelving systems to create an engaging experience for distributors, retailers, and international buyers.",
    },
    designApproach: {
      it: "Il concept articola lo stand in zone dedicate alla presentazione retail dei prodotti, all'accoglienza e alla consultazione commerciale. Finiture in legno naturale e verde, superfici di branding illuminate e display LED organizzano l'esposizione multi-brand con una circolazione aperta e chiara tra le aree espositive.",
      en: "The concept structures the stand into zones for retail-style product presentation, hospitality, and commercial consultation. Natural wood and green finishes, illuminated branding surfaces, and LED displays organise the multi-brand exhibition with open, clear circulation between display areas.",
    },
    keyFeatures: [
      {
        it: "Concept espositivo multi-brand",
        en: "Multi-brand exhibition concept",
      },
      {
        it: "Presentazione prodotti in stile retail",
        en: "Retail-inspired product presentation",
      },
      {
        it: "Area meeting hospitality premium",
        en: "Premium hospitality meeting area",
      },
      {
        it: "Grande segnaletica brand illuminata",
        en: "Large illuminated brand signage",
      },
      {
        it: "Display LED digitali per la presentazione",
        en: "Digital LED presentation displays",
      },
      {
        it: "Scaffalatura prodotti organizzata",
        en: "Organized product shelving",
      },
      {
        it: "Finiture in legno naturale e verde",
        en: "Natural wood and green finishes",
      },
      {
        it: "Circolazione aperta dei visitatori",
        en: "Open visitor circulation",
      },
    ],
    deliverables: [
      { it: "Progettazione stand fieristico", en: "Exhibition Stand Design" },
      { it: "Costruzione stand", en: "Stand Construction" },
      { it: "Sistemi espositivi retail", en: "Retail Display Systems" },
      { it: "Falegnameria su misura", en: "Custom Joinery" },
      { it: "Integrazione LED", en: "LED Integration" },
      { it: "Branding e grafica", en: "Branding & Graphics" },
      { it: "Progettazione illuminotecnica", en: "Lighting Design" },
      { it: "Gestione progetto", en: "Project Management" },
    ],
  },
  illulian: {
    overview: {
      it: "Creative Design ha realizzato lo stand di Illulian per il Salone del Mobile Milano 2023 a Fiera Milano. L'allestimento presenta i tappeti artigianali di lusso in un ambiente espositivo minimalista, con pareti curve, palette bianca e illuminazione architettonica che valorizza le superfici tessili.",
      en: "Creative Design delivered the exhibition stand for Illulian at Salone del Mobile Milano 2023 at Fiera Milano. The installation presents luxury handmade rugs within a minimalist exhibition environment, combining curved walls, a clean white material palette and architectural lighting that highlights the textile surfaces.",
    },
    designApproach: {
      it: "Lo stand è organizzato come una galleria temporanea con percorsi aperti e una circolazione chiara tra le aree espositive. Le pareti curve e le superfici bianche definiscono uno spazio misurato, dove i tappeti sono esposti su grandi formati con un'atmosfera vicina a quella museale.",
      en: "The stand is organised as a temporary gallery with open routes and clear circulation between display areas. Curved walls and white surfaces define a measured space, where rugs are shown in large formats within a museum-like atmosphere.",
    },
    keyFeatures: [
      {
        it: "Architettura espositiva minimalista",
        en: "Minimalist exhibition architecture",
      },
      {
        it: "Pareti curve e palette materiali bianca",
        en: "Curved walls and a clean white material palette",
      },
      {
        it: "Circolazione ispirata alla galleria",
        en: "Gallery-inspired circulation",
      },
      {
        it: "Presentazione premium dei tappeti artigianali",
        en: "Premium rug presentation",
      },
      {
        it: "Illuminazione architettonica e grandi superfici tessili",
        en: "Architectural lighting and large-format textile displays",
      },
      {
        it: "Flusso aperto dei visitatori",
        en: "Open visitor flow",
      },
    ],
    deliverables: [
      { it: "Progettazione stand fieristico", en: "Exhibition Stand Design" },
      { it: "Costruzione stand", en: "Stand Construction" },
      { it: "Montaggio in sito", en: "On-site Installation" },
    ],
  },
  alpa70: {
    overview: {
      it: "Creative Design ha progettato e realizzato lo stand di ALPA Salotti per il Salone del Mobile Milano 2026. L'allestimento presenta la collezione di salotti premium in un ambiente fieristico ispirato al residenziale, con illuminazione calda, lounge e aree hospitality che favoriscono la circolazione dei visitatori e la presentazione dei prodotti.",
      en: "Creative Design designed and delivered the exhibition stand for ALPA Salotti at Salone del Mobile Milano 2026. The installation presents the premium sofa collection within a residential-inspired exhibition environment, combining warm lighting, lounge settings and hospitality areas that support open visitor circulation and product-focused display.",
    },
    designApproach: {
      it: "Lo stand articola l'esposizione attraverso un linguaggio architettonico pulito e una palette di materiali raffinata. Zone living, percorsi aperti e aree di accoglienza organizzano la presentazione dei prodotti in modo chiaro, mantenendo un'atmosfera calda e misurata adatta a un brand di arredamento di lusso.",
      en: "The stand structures the display through clean architectural lines and a refined material palette. Lounge settings, open circulation routes and hospitality areas organise the product presentation clearly, while maintaining a warm, measured atmosphere suited to a luxury furniture brand.",
    },
    keyFeatures: [
      {
        it: "Presentazione di arredi premium",
        en: "Premium furniture presentation",
      },
      {
        it: "Ambiente fieristico ispirato al residenziale",
        en: "Residential-inspired exhibition environment",
      },
      {
        it: "Illuminazione calda e lounge settings",
        en: "Warm lighting and lounge settings",
      },
      {
        it: "Circolazione aperta e aree hospitality",
        en: "Open visitor circulation and hospitality areas",
      },
      {
        it: "Esposizione prodotto con linguaggio architettonico pulito",
        en: "Product-focused display with clean architectural language",
      },
      {
        it: "Palette materiali raffinata",
        en: "Refined material palette",
      },
    ],
    deliverables: [
      { it: "Progettazione stand fieristico", en: "Exhibition Stand Design" },
      { it: "Costruzione stand", en: "Stand Construction" },
      { it: "Montaggio in sito", en: "On-site Installation" },
    ],
  },
};
