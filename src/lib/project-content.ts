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
      it: "Un ambiente fieristico pensato per presentare un brand del settore nutrizione con chiarezza, credibilità e un’identità visiva coerente. Lo stand traduce i valori del cliente in uno spazio espositivo strutturato, accogliente e immediatamente leggibile.",
      en: "An exhibition environment designed to present a nutrition-sector brand with clarity, credibility, and a cohesive visual identity. The stand translates the client's values into a structured, welcoming, and immediately readable spatial experience.",
    },
    designApproach: {
      it: "Il concept parte da un percorso espositivo lineare che guida il visitatore dalla scoperta del brand alla consultazione dei prodotti. Materiali puliti, illuminazione controllata e una palette sobria costruiscono un’atmosfera professionale adatta a un contesto health & wellness.",
      en: "The concept begins with a linear exhibition route that guides visitors from brand discovery to product consultation. Clean materials, controlled lighting, and a restrained palette build a professional atmosphere suited to a health and wellness context.",
    },
    keyFeatures: [
      {
        it: "Layout modulare con area welcome, esposizione prodotti e spazio informativo",
        en: "Modular layout with welcome area, product display, and information zone",
      },
      {
        it: "Grafica integrata nell’architettura dello stand per rafforzare il riconoscimento del brand",
        en: "Graphics integrated into the stand architecture to strengthen brand recognition",
      },
      {
        it: "Illuminazione scenografica per valorizzare materiali e superfici espositive",
        en: "Scenographic lighting to enhance materials and display surfaces",
      },
      {
        it: "Soluzioni di allestimento pensate per montaggio, utilizzo e smontaggio efficienti",
        en: "Display solutions designed for efficient setup, use, and dismantling",
      },
    ],
    deliverables: [
      { it: "Concept spaziale e layout espositivo", en: "Spatial concept and exhibition layout" },
      { it: "Progettazione stand fieristico", en: "Trade show stand design" },
      { it: "Direzione creativa dell’ambiente", en: "Environmental creative direction" },
      { it: "Coordinamento grafico e segnaletica", en: "Graphic and signage coordination" },
    ],
  },
  nvidia: {
    overview: {
      it: "Un ambiente espositivo ad alta tecnologia che comunica innovazione, precisione e presenza internazionale. Lo stand è concepito come un’esperienza immersiva in cui architettura, luce e contenuti digitali lavorano in sinergia.",
      en: "A high-tech exhibition environment that communicates innovation, precision, and international presence. The stand is conceived as an immersive experience where architecture, light, and digital content work in synergy.",
    },
    designApproach: {
      it: "La progettazione enfatizza prospettive profonde, superfici scultoree e un ritmo visivo dinamico. L’identità del brand guida ogni scelta formale, dalla scala degli elementi al trattamento luminoso, per creare un ambiente distintivo e contemporaneo.",
      en: "The design emphasizes deep perspectives, sculptural surfaces, and a dynamic visual rhythm. Brand identity guides every formal decision—from element scale to lighting treatment—to create a distinctive, contemporary environment.",
    },
    keyFeatures: [
      {
        it: "Architettura espositiva con forte impatto visivo e percorsi fluidi",
        en: "Exhibition architecture with strong visual impact and fluid circulation",
      },
      {
        it: "Integrazione di superfici per contenuti digitali e demo prodotto",
        en: "Integration of surfaces for digital content and product demonstrations",
      },
      {
        it: "Sistema illuminotecnico per enfatizzare volumi e materiali tecnologici",
        en: "Lighting system to emphasize volumes and technical materials",
      },
      {
        it: "Area meeting riservata per incontri professionali durante il evento",
        en: "Dedicated meeting area for professional conversations during the event",
      },
    ],
    deliverables: [
      { it: "Concept architettonico dello stand", en: "Stand architectural concept" },
      { it: "Progettazione spaziale e allestimento", en: "Spatial design and installation planning" },
      { it: "Direzione creativa dell’esperienza", en: "Experience creative direction" },
      { it: "Specifiche materiali e finiture", en: "Material and finish specifications" },
    ],
  },
  egyptair: {
    overview: {
      it: "Uno stand nel settore travel & tourism che traduce l’identità del brand in un ambiente elegante, accogliente e riconoscibile. Lo spazio è progettato per comunicare qualità del servizio e senso del viaggio attraverso composizione, luce e materiali.",
      en: "A travel and tourism stand that translates brand identity into an elegant, welcoming, and recognizable environment. The space is designed to communicate service quality and a sense of journey through composition, light, and materials.",
    },
    designApproach: {
      it: "Il concept combina riferimenti culturali sobri con un linguaggio espositivo contemporaneo. Zone dedicate all’accoglienza, alla consultazione e al relax permettono una fruizione equilibrata dello stand durante l’intera durata della fiera.",
      en: "The concept combines subtle cultural references with a contemporary exhibition language. Dedicated welcome, consultation, and lounge zones allow balanced use of the stand throughout the trade show.",
    },
    keyFeatures: [
      {
        it: "Fronte espositivo distintivo con forte presenza scenica",
        en: "Distinctive exhibition front with strong scenographic presence",
      },
      {
        it: "Area hospitality per accogliere visitatori e partner",
        en: "Hospitality area to welcome visitors and partners",
      },
      {
        it: "Percorso espositivo chiaro con punti di storytelling visivo",
        en: "Clear exhibition route with visual storytelling moments",
      },
      {
        it: "Palette cromatica e materiali coerenti con l’identità del brand",
        en: "Color palette and materials aligned with brand identity",
      },
    ],
    deliverables: [
      { it: "Concept stand e layout funzionale", en: "Stand concept and functional layout" },
      { it: "Progettazione allestimento fieristico", en: "Trade show installation design" },
      { it: "Direzione creativa dell’ambiente", en: "Environmental creative direction" },
      { it: "Coordinamento segnaletica e comunicazione visiva", en: "Signage and visual communication coordination" },
    ],
  },
  "amana-foods": {
    overview: {
      it: "Un ambiente espositivo per il settore food & beverage che mette al centro prodotti, gusto e autenticità del brand. Lo stand crea un’esperienza calda e invitante, pensata per attrarre il visitatore e favorire la scoperta dell’offerta.",
      en: "An exhibition environment for the food and beverage sector that places product, taste, and brand authenticity at the center. The stand creates a warm, inviting experience designed to draw visitors in and encourage product discovery.",
    },
    designApproach: {
      it: "La progettazione articola lo spazio in aree di degustazione, esposizione e racconto del brand. Texture naturali, illuminazione calda e un layout aperto contribuiscono a un’atmosfera genuina e professionale.",
      en: "The design organizes space into tasting, display, and brand narrative areas. Natural textures, warm lighting, and an open layout contribute to a genuine, professional atmosphere.",
    },
    keyFeatures: [
      {
        it: "Isola espositiva centrale per la presentazione dei prodotti",
        en: "Central display island for product presentation",
      },
      {
        it: "Backwall grafica per rafforzare la comunicazione del brand",
        en: "Graphic backwall to strengthen brand communication",
      },
      {
        it: "Area campionatura con flusso visitatori ottimizzato",
        en: "Sampling area with optimized visitor flow",
      },
      {
        it: "Soluzioni di allestimento resistenti e adatte a contesti ad alto traffico",
        en: "Durable display solutions suited to high-traffic environments",
      },
    ],
    deliverables: [
      { it: "Concept spaziale e zoning espositivo", en: "Spatial concept and exhibition zoning" },
      { it: "Progettazione stand food & beverage", en: "Food and beverage stand design" },
      { it: "Direzione creativa dell’allestimento", en: "Installation creative direction" },
      { it: "Coordinamento materiali e finiture", en: "Material and finish coordination" },
    ],
  },
  illulian: {
    overview: {
      it: "Un ambiente espositivo per il mondo dell’arredamento e del design d’interni, dove materiali pregiati, craft e identità del brand trovano espressione in uno spazio raffinato. Lo stand è pensato come una gallery temporanea che valorizza texture, colore e composizione.",
      en: "An exhibition environment for interior design and furnishings, where premium materials, craft, and brand identity find expression in a refined space. The stand is conceived as a temporary gallery that elevates texture, color, and composition.",
    },
    designApproach: {
      it: "Il concept privilegia proporzioni equilibrate, superfici tattili e un’illuminazione studiata per esaltare i prodotti. Ogni elemento architettonico supporta una lettura elegante e contemplativa dello spazio.",
      en: "The concept favors balanced proportions, tactile surfaces, and lighting designed to highlight products. Every architectural element supports an elegant, contemplative reading of the space.",
    },
    keyFeatures: [
      {
        it: "Layout gallery con esposizione prodotti su più livelli visivi",
        en: "Gallery layout with product display across multiple visual levels",
      },
      {
        it: "Materiali e finiture selezionati per coerenza con il posizionamento premium",
        en: "Materials and finishes selected for consistency with premium positioning",
      },
      {
        it: "Illuminazione d’accento per valorizzare texture e campionature",
        en: "Accent lighting to enhance textures and product samples",
      },
      {
        it: "Area conversazione riservata per clienti e professionisti",
        en: "Private conversation area for clients and professionals",
      },
    ],
    deliverables: [
      { it: "Concept espositivo e layout gallery", en: "Exhibition concept and gallery layout" },
      { it: "Progettazione stand e allestimento", en: "Stand and installation design" },
      { it: "Direzione creativa dell’ambiente", en: "Environmental creative direction" },
      { it: "Specifiche materiali e palette cromatica", en: "Material and color palette specifications" },
    ],
  },
  alpa70: {
    overview: {
      it: "Uno stand per il settore furniture design che presenta collezioni e soluzioni abitative in un ambiente contemporaneo e strutturato. Lo spazio traduce il linguaggio del brand in un’esperienza espositiva chiara, modulare e di forte impatto visivo.",
      en: "A furniture design stand that presents collections and living solutions in a contemporary, structured environment. The space translates the brand language into a clear, modular exhibition experience with strong visual impact.",
    },
    designApproach: {
      it: "La progettazione combina volumi geometrici, zone funzionali distinte e un percorso espositivo intuitivo. L’attenzione alla scala, alla luce e alla relazione tra prodotti e architettura definisce un ambiente coerente e professionale.",
      en: "The design combines geometric volumes, distinct functional zones, and an intuitive exhibition route. Attention to scale, light, and the relationship between products and architecture defines a coherent, professional environment.",
    },
    keyFeatures: [
      {
        it: "Composizione modulare adatta a diverse configurazioni espositive",
        en: "Modular composition suited to various exhibition configurations",
      },
      {
        it: "Pedane e livelli per creare gerarchia visiva tra i prodotti",
        en: "Platforms and levels to create visual hierarchy among products",
      },
      {
        it: "Illuminazione architetturale per definire atmosfera e focus",
        en: "Architectural lighting to define atmosphere and focus",
      },
      {
        it: "Elementi di arredo espositivo integrati nel concept stand",
        en: "Display furniture elements integrated into the stand concept",
      },
    ],
    deliverables: [
      { it: "Concept stand e layout modulare", en: "Stand concept and modular layout" },
      { it: "Progettazione allestimento furniture", en: "Furniture exhibition design" },
      { it: "Direzione creativa dell’esperienza", en: "Experience creative direction" },
      { it: "Coordinamento finiture e dettagli costruttivi", en: "Finish and construction detail coordination" },
    ],
  },
};
