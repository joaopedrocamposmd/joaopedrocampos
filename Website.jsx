import React, { useState, useEffect } from 'react';
import {
  Stethoscope,
  MapPin,
  BookOpen,
  Linkedin,
  ExternalLink,
  Menu,
  X,
  ChevronRight,
  Users,
  Briefcase,
  GraduationCap,
  CalendarDays
} from 'lucide-react';

// --- ILUSTRAÇÕES MÉDICAS PERSONALIZADAS (Estilo UBNIC: "Anatomia de Precisão") ---

const IllustrationLCA = () => (
  <svg viewBox="0 0 400 220" className="w-full h-full" style={{ backgroundColor: 'var(--color-bg)' }}>
    <defs>
      <pattern id="gridLCA" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(44, 62, 80, 0.05)" strokeWidth="1" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#gridLCA)" />

    {/* Fémur e Tíbia Abstratos */}
    <path d="M 180 20 C 180 70, 150 90, 150 110 C 150 130, 230 130, 230 110 C 230 90, 200 70, 200 20" fill="none" stroke="#2c3e50" strokeWidth="6" strokeLinecap="round" opacity="0.8" />
    <path d="M 150 150 C 150 130, 230 130, 230 150 L 210 220 L 170 220 Z" fill="none" stroke="#2c3e50" strokeWidth="6" strokeLinecap="round" opacity="0.8" />

    {/* Ligamentos (LCA em destaque) */}
    <line x1="165" y1="105" x2="215" y2="145" stroke="#3b877b" strokeWidth="6" strokeLinecap="round" opacity="0.9" />
    <line x1="215" y1="105" x2="165" y2="145" stroke="#3b877b" strokeWidth="6" strokeLinecap="round" opacity="0.3" />

    {/* Pontos de Dados Clínicos */}
    <circle cx="190" cy="125" r="5" fill="#e67e22" />
    <circle cx="165" cy="105" r="4" fill="#2a6058" />
    <circle cx="215" cy="145" r="4" fill="#2a6058" />

    {/* UI Elements */}
    <line x1="230" y1="125" x2="280" y2="125" stroke="#3b877b" strokeWidth="1.5" strokeDasharray="4 4" />
    <text x="290" y="129" fill="#2c3e50" fontSize="11" fontFamily="monospace" fontWeight="600">LCA_RECONSTRUCT</text>
    <text x="290" y="145" fill="#3b877b" fontSize="9" fontFamily="monospace">GRAFT_TENSION: OK</text>
  </svg>
);

const IllustrationMeniscus = () => (
  <svg viewBox="0 0 400 220" className="w-full h-full" style={{ backgroundColor: 'var(--color-bg)' }}>
    <defs>
      <pattern id="gridMeniscus" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(44, 62, 80, 0.05)" strokeWidth="1" />
      </pattern>
      <radialGradient id="meniscusGrad" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" stopColor="#3b877b" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#2a6058" stopOpacity="0.9" />
      </radialGradient>
      <linearGradient id="boneGradMeniscus" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f4f7f6" />
        <stop offset="100%" stopColor="#e2e8e6" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#gridMeniscus)" />

    {/* Planalto Tibial (Vista Superior) */}
    <ellipse cx="200" cy="110" rx="120" ry="60" fill="url(#boneGradMeniscus)" stroke="#2c3e50" strokeWidth="2" opacity="0.5" />

    {/* Menisco Medial (Forma de C) */}
    <path d="M 140 80 C 100 80, 90 140, 140 140 C 170 140, 170 120, 150 120 C 130 120, 130 100, 150 100 C 170 100, 170 80, 140 80 Z" fill="url(#meniscusGrad)" stroke="#2a6058" strokeWidth="1" opacity="0.9" />

    {/* Menisco Lateral (Forma de O) */}
    <path d="M 260 80 C 300 80, 310 140, 260 140 C 230 140, 230 120, 250 120 C 270 120, 270 100, 250 100 C 230 100, 230 80, 260 80 Z" fill="url(#meniscusGrad)" stroke="#2a6058" strokeWidth="1" opacity="0.3" />

    {/* Lesão Meniscal Longitudinal e Foco */}
    {/* Nova rotura longitudinal ao longo do menisco medial */}
    <path d="M 135 95 C 115 95, 110 125, 135 125" stroke="#e67e22" strokeWidth="3" strokeLinecap="round" fill="none" />

    {/* Círculo de foco reposicionado */}
    <circle cx="125" cy="110" r="25" fill="none" stroke="#e67e22" strokeWidth="2" strokeDasharray="4 4" />

    {/* Linha de chamada e textos atualizados */}
    <line x1="125" y1="85" x2="125" y2="50" stroke="#e67e22" strokeWidth="1.5" />
    <text x="130" y="45" fill="#2c3e50" fontSize="11" fontFamily="monospace" fontWeight="600">MENISCAL_TEAR</text>
    <text x="130" y="60" fill="#e67e22" fontSize="9" fontFamily="monospace">TYPE: LONGITUDINAL</text>
  </svg>
);

const IllustrationProsthesis = () => (
  <svg viewBox="0 0 400 220" className="w-full h-full" style={{ backgroundColor: 'var(--color-bg)' }}>
    <defs>
      <pattern id="gridProsth" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(44, 62, 80, 0.05)" strokeWidth="1" />
      </pattern>
      <linearGradient id="metalProsth" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#94a3b8" />
        <stop offset="20%" stopColor="#f8fafc" />
        <stop offset="50%" stopColor="#94a3b8" />
        <stop offset="80%" stopColor="#cbd5e1" />
        <stop offset="100%" stopColor="#475569" />
      </linearGradient>
      <linearGradient id="polyProsth" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#e2e8e6" />
      </linearGradient>
      <linearGradient id="boneProsth" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f4f7f6" />
        <stop offset="100%" stopColor="#cbd5e1" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#gridProsth)" />

    {/* Fémur Distal Anatómico */}
    <path d="M 155 -10 L 155 40 C 155 70, 135 90, 135 120 C 135 140, 150 155, 175 145 C 185 140, 195 130, 205 140 C 220 155, 245 140, 245 110 C 245 80, 215 60, 215 -10 Z" fill="url(#boneProsth)" stroke="#2c3e50" strokeWidth="2" opacity="0.8" />

    {/* Tíbia Proximal e Perónio */}
    <path d="M 130 180 C 130 190, 145 230, 145 230 L 215 230 C 215 230, 240 190, 240 180 C 240 160, 130 160, 130 180 Z" fill="url(#boneProsth)" stroke="#2c3e50" strokeWidth="2" opacity="0.8" />
    <path d="M 265 195 L 250 230 L 265 230 Z" fill="url(#boneProsth)" stroke="#2c3e50" strokeWidth="2" opacity="0.6" />

    {/* Componente Femoral UKA (Medial - Lado Esquerdo) */}
    <path d="M 130 115 C 130 85, 150 75, 160 75 C 175 75, 185 95, 185 120 C 185 145, 170 155, 155 155 C 140 155, 130 140, 130 115 Z" fill="url(#metalProsth)" stroke="#2c3e50" strokeWidth="1.5" />

    {/* Reflexo extra para dar volume 3D ao metal */}
    <path d="M 135 115 C 135 95, 145 85, 155 85" fill="none" stroke="#ffffff" strokeWidth="3" opacity="0.8" strokeLinecap="round" />

    {/* Componente Tibial UKA (Bandeja Metálica Medial) */}
    <path d="M 125 172 C 145 177, 180 177, 190 172 L 190 178 C 180 183, 145 183, 125 178 Z" fill="url(#metalProsth)" stroke="#2c3e50" strokeWidth="1.5" />

    {/* Inserto em Polietileno (Poly) */}
    <path d="M 128 152 C 145 158, 175 158, 187 152 L 188 172 C 175 177, 145 177, 128 172 Z" fill="url(#polyProsth)" stroke="#2c3e50" strokeWidth="1.5" />

    {/* Interface de Dados Clínicos */}
    <line x1="185" y1="115" x2="250" y2="80" stroke="#3b877b" strokeWidth="1.5" />
    <circle cx="185" cy="115" r="3" fill="#3b877b" />
    <text x="255" y="78" fill="#2c3e50" fontSize="11" fontFamily="monospace" fontWeight="600">PARTIAL_KNEE_UKA</text>
    <text x="255" y="93" fill="#3b877b" fontSize="9" fontFamily="monospace">COMPARTMENT: MEDIAL</text>
  </svg>
);


const IllustrationPreservation = () => (
  <svg viewBox="0 0 400 220" className="w-full h-full" style={{ backgroundColor: 'var(--color-bg)' }}>
    <defs>
      <pattern id="gridPreserv" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(44, 62, 80, 0.05)" strokeWidth="1" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#gridPreserv)" />

    {/* Contorno Perna / Eixo Mecânico Original */}
    <path d="M 190 20 L 170 120 L 195 220" fill="none" stroke="#2c3e50" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />

    {/* Eixo Corrigido (Osteotomia) */}
    <line x1="190" y1="20" x2="190" y2="220" stroke="#3b877b" strokeWidth="2" strokeDasharray="6 4" />

    {/* Ângulo de Correção */}
    <path d="M 183 150 A 40 40 0 0 0 190 157" fill="none" stroke="#e67e22" strokeWidth="2" />
    <text x="195" y="155" fill="#e67e22" fontSize="11" fontFamily="monospace" fontWeight="600">VARUS CORR.</text>

    {/* Foco Articular */}
    <circle cx="170" cy="120" r="12" fill="none" stroke="#2c3e50" strokeWidth="2.5" />
    <circle cx="170" cy="120" r="3" fill="#3b877b" />
    <line x1="170" y1="120" x2="250" y2="80" stroke="#2c3e50" strokeWidth="1" opacity="0.6" />
    <text x="255" y="78" fill="#2c3e50" fontSize="11" fontFamily="monospace" fontWeight="600">HTO_REALIGNMENT</text>
    <text x="255" y="93" fill="#3b877b" fontSize="9" fontFamily="monospace">AXIS: 180°</text>
  </svg>
);

const IllustrationFallback = () => (
  <svg viewBox="0 0 400 220" className="w-full h-full" style={{ backgroundColor: 'var(--color-bg)' }}>
    <defs>
      <pattern id="gridFallback" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(44, 62, 80, 0.05)" strokeWidth="1" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#gridFallback)" />

    {/* Abstract fallback medical graphic */}
    <circle cx="200" cy="100" r="40" fill="none" stroke="rgba(59, 135, 123, 0.2)" strokeWidth="2" strokeDasharray="4 4" />
    <circle cx="200" cy="100" r="20" fill="none" stroke="rgba(59, 135, 123, 0.4)" strokeWidth="1" />
    <path d="M 195 95 L 205 105 M 205 95 L 195 105" stroke="rgba(59, 135, 123, 0.4)" strokeWidth="2" strokeLinecap="round" />

    <text x="200" y="160" fill="rgba(44, 62, 80, 0.4)" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="500">MEDICAL_DATA_PENDING</text>
  </svg>
);



// --- DADOS DO CIRURGIÃO ---
// Altere estes dados para reutilizar a página para outros cirurgiões.
const surgeonData = {
  name: "Dr. João Pedro Campos",
  heroTag: "Especialista em Ortopedia",
  heroTitle: "Cirurgião de Joelho",
  heroSubtitle: "Knee Surgeon",
  heroDescription: "Dedicado à patologia do joelho. O meu foco é proporcionar os tratamentos mais avançados, apoiados em dados e precisão clínica, para restaurar a sua mobilidade.",
  yearsOfExperience: "8",
  linkedinUrl: "https://www.linkedin.com/in/jo%C3%A3o-pedro-campos-765214208/",
  orcidId: "0000-0003-2156-5820",
  googleSheetsCsvUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vQyXFTKmHSbZhTmOYi9Oqo4B-r71zZ_TJE_oBIXLH61d7Ln7E2QHoyDf6PFRbX3A5kyYW5ji5DHWajg/pub?gid=462780236&single=true&output=csv",
  schedulingUrl: "https://www.lusiadas.pt/corpo-clinico/dr-joao-pedro-campos",
  expertises: [
    {
      title: "Lesões Desportivas e Ligamentares",
      desc: "Tratamento cirúrgico e conservador de roturas do Ligamento Cruzado Anterior (LCA) e lesões multiligamentares associadas à prática desportiva.",
      illustration: <IllustrationLCA />
    },
    {
      title: "Patologia do Menisco e Cartilagem",
      desc: "Técnicas de preservação, sutura meniscal e tratamento de lesões condrais (cartilagem) focadas na longevidade da articulação.",
      illustration: <IllustrationMeniscus />
    },
    {
      title: "Artroplastia (Prótese) do Joelho",
      desc: "Substituição articular total ou parcial recorrendo às vias de abordagem mais adequadas para uma recuperação otimizada e retorno à qualidade de vida.",
      illustration: <IllustrationProsthesis />
    },
    {
      title: "Cirurgia de Preservação Articular",
      desc: "Osteotomias de realinhamento para correção de eixos e preservação da articulação biológica em casos de desgaste precoce.",
      illustration: <IllustrationPreservation />
    }
  ],
  experiences: [
    {
      role: "Cirurgia do Joelho",
      company: "Lusíadas Saúde - Maia",
      period: "Set 2025 - Presente",
      location: "Maia",
    },
    {
      role: "Cirurgia do Joelho",
      company: "Hospital Pedro Hispano - ULSM",
      period: "Mar 2023 - Presente",
      location: "Matosinhos",
    },
    {
      role: "Cirurgia do Joelho",
      company: "Hospital Privado da Boa Nova / Hospital de Dia da Maia",
      period: "Mar 2023 - Ago 2025",
      location: "Matosinhos e Maia",
    },
    {
      role: "IFE Ortopedia e Traumatologia",
      company: "Hospital Pedro Hispano - ULSM",
      period: "Jan 2017 - Mar 2023",
      location: "Matosinhos",
    },
    {
      role: "Fellowship em Patologia Desportiva do Joelho",
      company: "Centre Orthopédique Santy",
      period: "Dez 2021 - Jan 2022",
      location: "Lyon, França",
      description: "Desenvolvimento dos conhecimentos e técnicas cirúrgicas na área do diagnóstico e tratamento de lesões desportivas do joelho com o Dr. Bertrand Sonnery-Cottet no Centre Orthopédique Santy, FIFA Medical Center of Excellence."
    },
    {
      role: "Fellowship em Patologia do Joelho",
      company: "OS - Orthopaedic Specialists",
      period: "Set 2021 - Nov 2021",
      location: "Londres, Reino Unido",
    }
  ],
  education: [
    {
      course: "Pós-graduação em Medicina Desportiva",
      school: "Faculdade de Medicina da Universidade do Porto",
      period: "Set 2019 – Ago 2020",
    },
    {
      course: "Mestrado Integrado em Medicina",
      school: "Faculdade de Medicina da Universidade do Porto",
      period: "Set 2009 – Jul 2015",
    }
  ]
};

// --- COMPONENTE PRINCIPAL ---

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [publications, setPublications] = useState([]);
  const [loadingPubs, setLoadingPubs] = useState(true);



  // Efeito para alterar o estilo da navbar ao fazer scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Estado para o contador de cirurgias
  const [surgeryCount, setSurgeryCount] = useState(0);

  // URL carregada das configurações
  const GOOGLE_SHEETS_CSV_URL = surgeonData.googleSheetsCsvUrl;

  // Buscar número de cirurgias do Google Sheets Intermédio
  useEffect(() => {
    const fetchSurgeries = async () => {

      try {
        const response = await fetch(GOOGLE_SHEETS_CSV_URL);
        const text = await response.text();

        // Tenta ler o texto diretamente como um número (já que o sheet intermédio só terá 1 célula)
        const parsedNumber = parseInt(text.trim(), 10);

        if (!isNaN(parsedNumber)) {
          setSurgeryCount(parsedNumber);
        } else {
          // Fallback: se o ficheiro tiver linhas, conta as linhas
          const rows = text.split('\n');
          const count = rows.length > 1 ? rows.length - 1 : 0;
          setSurgeryCount(count);
        }
      } catch (error) {
        console.error("Erro ao carregar dados do Google Sheets:", error);
        setSurgeryCount(3500); // Fallback visual em caso de erro de rede
      }
    };

    fetchSurgeries();
  }, []);

  // Buscar publicações diretamente do ORCID
  useEffect(() => {
    const fetchOrcidData = async () => {
      try {
        const response = await fetch(`https://pub.orcid.org/v3.0/${surgeonData.orcidId}/works`, {
          headers: {
            'Accept': 'application/json'
          }
        });

        if (!response.ok) throw new Error('Falha ao carregar publicações');

        const data = await response.json();

        if (data && data.group) {
          const works = data.group.map(item => {
            const summary = item['work-summary'][0];
            const title = summary?.title?.title?.value || 'Título Indisponível';
            const year = summary?.['publication-date']?.year?.value || 'N/D';

            // Extrair DOI
            const externalIds = summary?.['external-ids']?.['external-id'] || [];
            const doiObj = externalIds.find(extId => extId['external-id-type'] === 'doi');
            const doiUrl = doiObj ? doiObj['external-id-url']?.value : null;

            return { title, year, doiUrl };
          });

          // Ordenar do mais recente para o mais antigo
          works.sort((a, b) => (b.year === 'N/D' ? 0 : parseInt(b.year)) - (a.year === 'N/D' ? 0 : parseInt(a.year)));
          setPublications(works);
        }
      } catch (error) {
        console.error("Erro ao buscar dados do ORCID:", error);
      } finally {
        setLoadingPubs(false);
      }
    };

    fetchOrcidData();
  }, []);

  const navLinks = [
    { name: 'Sobre Mim', href: '#sobre' },
    { name: 'Especialidade', href: '#especialidade' },
    { name: 'Equipa Orto+', href: '#equipa' },
    { name: 'Locais de Trabalho', href: '#locais' },
    { name: 'Publicações', href: '#publicacoes' },
    { name: 'Percurso', href: '#percurso' },
  ];

  // as listagens expertises, experiences e education foram movidas para surgeonData


  return (
    <>
      {/* Injeção dos estilos e tipografia da UBNIC */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap');

        :root {
          --color-primary: #3b877b;
          --color-primary-dark: #2a6058;
          --color-bg: #f4f7f6;
          --color-text: #2c3e50;
          --color-alert: #e67e22;
          --color-success: #2ecc71;
          --surface-glass: rgba(255, 255, 255, 0.70);
          --surface-border: rgba(255, 255, 255, 0.50);
          --blur-amount: 12px;
          --radius-sm: 8px;
          --radius-md: 12px;
          --radius-lg: 20px;
        }

        body {
          background-color: var(--color-bg);
          color: var(--color-text);
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .glass-panel {
          background: var(--surface-glass);
          backdrop-filter: blur(var(--blur-amount));
          -webkit-backdrop-filter: blur(var(--blur-amount));
          border: 1px solid var(--surface-border);
          border-radius: var(--radius-md);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }

        .btn-primary {
          background-color: var(--color-primary);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-sm);
          font-weight: 600;
          transition: all 0.2s ease;
          border: none;
          cursor: pointer;
        }

        .btn-primary:hover {
          background-color: var(--color-primary-dark);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 135, 123, 0.25);
        }

        .clinical-data {
          font-family: 'IBM Plex Mono', monospace;
          font-weight: 500;
          color: var(--color-text);
        }

        /* Abstract background blobs for glassmorphism to pop */
        .bg-blob-1 {
          position: fixed;
          top: -10%;
          right: -5%;
          width: 50vw;
          height: 50vw;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(59,135,123,0.08) 0%, rgba(244,247,246,0) 70%);
          z-index: -1;
        }
        .bg-blob-2 {
          position: fixed;
          bottom: -10%;
          left: -10%;
          width: 60vw;
          height: 60vw;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(44,62,80,0.04) 0%, rgba(244,247,246,0) 70%);
          z-index: -1;
        }
      `}</style>

      <div className="min-h-screen relative overflow-hidden">

        {/* Decorative Background Elements */}
        <div className="bg-blob-1"></div>
        <div className="bg-blob-2"></div>

        {/* Navigation */}
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? (isMobileMenuOpen ? 'bg-white/90 py-3 shadow-lg' : 'glass-panel py-3 !border-t-0 !border-x-0 !rounded-none shadow-lg') : 'bg-transparent py-5'}`}>
          <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
            <a href="#" className="flex items-center gap-2">
              <span className=" font-bold text-xl tracking-tight" style={{ color: 'var(--color-text)' }}>{surgeonData.name}</span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-sm font-medium transition-colors hover:text-[#3b877b]" style={{ color: 'var(--color-text)' }}>
                  {link.name}
                </a>
              ))}
              <a href={surgeonData.schedulingUrl} target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center gap-2 text-sm">
                Marcar Consulta
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={{ color: 'var(--color-text)' }}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Nav */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full glass-panel !rounded-none shadow-xl py-4 flex flex-col items-center gap-4 border-t border-white/20">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-base font-medium w-full text-center py-2 hover:text-[#3b877b]"
                  style={{ color: 'var(--color-text)' }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section id="sobre" className="pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-12 container mx-auto flex flex-col-reverse md:flex-row items-center gap-12 relative z-10">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium" style={{ backgroundColor: 'rgba(59, 135, 123, 0.1)', color: 'var(--color-primary)' }}>
              <Stethoscope size={18} strokeWidth={1.5} />
              <span className="text-sm tracking-wide uppercase">{surgeonData.heroTag}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight" style={{ color: 'var(--color-text)' }}>
              {surgeonData.heroTitle} <br />
              <span className="font-medium" style={{ color: 'var(--color-primary)' }}>{surgeonData.heroSubtitle}</span>
            </h1>
            <p className="text-lg max-w-xl leading-relaxed opacity-80" style={{ color: 'var(--color-text)' }}>
              {surgeonData.heroDescription}
            </p>



            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a href="#locais" className="btn-primary flex items-center gap-2">
                Locais de Consulta
                <ChevronRight size={18} />
              </a>
              <a href={surgeonData.linkedinUrl} target="_blank" rel="noopener noreferrer" className="glass-panel px-6 py-3 font-medium transition-all flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
                <Linkedin size={18} strokeWidth={1.5} />
                Perfil LinkedIn
              </a>
            </div>
          </div>
          <div className="flex-1 flex justify-center md:justify-end relative">
            <div className="absolute inset-0 transform rotate-3 scale-95 opacity-20" style={{ backgroundColor: 'var(--color-primary)', borderRadius: 'var(--radius-lg)' }}></div>
            <img
              src="/foto-minha.jpg"
              alt={surgeonData.name}
              className="w-full max-w-md shadow-xl relative z-10 object-cover aspect-[4/5]"
              style={{ borderRadius: 'var(--radius-lg)' }}
            />
          </div>
        </section>

        {/* Secção Estatísticas / Em Números */}
        <section className="pb-20 relative z-10">
          <div className="container mx-auto px-6 md:px-12">
            <div className="glass-panel p-8 grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x" style={{ borderColor: 'var(--surface-border)' }}>

              <div className="flex flex-col items-center justify-center text-center pt-4 md:pt-0">
                <div className="clinical-data text-4xl lg:text-5xl font-bold mb-2 flex items-center gap-1" style={{ color: 'var(--color-primary)' }}>
                  {surgeryCount}<span className="text-3xl">+</span>
                </div>
                <div className="font-medium text-sm tracking-wide uppercase opacity-80" style={{ color: 'var(--color-text)' }}>Cirurgias Realizadas</div>
              </div>

              <div className="flex flex-col items-center justify-center text-center pt-8 md:pt-0" style={{ borderColor: 'var(--surface-border)' }}>
                <div className="clinical-data text-4xl lg:text-5xl font-bold mb-2 flex items-center gap-1" style={{ color: 'var(--color-primary)' }}>
                  {surgeonData.yearsOfExperience}<span className="text-3xl">+</span>
                </div>
                <div className="font-medium text-sm tracking-wide uppercase opacity-80" style={{ color: 'var(--color-text)' }}>Anos de Experiência</div>
              </div>

              <div className="flex flex-col items-center justify-center text-center pt-8 md:pt-0" style={{ borderColor: 'var(--surface-border)' }}>
                <div className="clinical-data text-4xl lg:text-5xl font-bold mb-2" style={{ color: 'var(--color-primary)' }}>
                  {publications.length > 0 ? publications.length : '10+'}
                </div>
                <div className="font-medium text-sm tracking-wide uppercase opacity-80" style={{ color: 'var(--color-text)' }}>Publicações Indexadas</div>
              </div>

            </div>
          </div>
        </section>


        {/* Secção Áreas de Especialização */}
        <section id="especialidade" className="py-20 relative z-10">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>Áreas de Intervenção</h2>
              <p className="opacity-80" style={{ color: 'var(--color-text)' }}>Foco absoluto na patologia do joelho, garantindo as técnicas mais adequadas e precisas para cada lesão.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {surgeonData.expertises.map((item, idx) => (
                <div key={idx} className="glass-panel hover:-translate-y-1 transition-transform duration-300 group flex flex-col overflow-hidden p-2">
                  <div className="w-full h-48 md:h-56 rounded-t-xl rounded-b-sm overflow-hidden mb-6 relative border-b border-black/5">
                    {item.illustration ? item.illustration : <IllustrationFallback />}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-transparent opacity-40"></div>
                  </div>
                  <div className="px-6 pb-6">
                    <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--color-text)' }}>{item.title}</h3>
                    <p className="leading-relaxed opacity-80" style={{ color: 'var(--color-text)' }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Secção Equipa Orto+ */}
        <section id="equipa" className="py-20 relative z-10">
          <div className="container mx-auto px-6 md:px-12">
            <div className="glass-panel p-8 md:p-12 border-0">
              <div className="flex flex-col gap-12">
                {/* Top row: Text and Logo */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-3">
                      <Users size={28} strokeWidth={1.5} style={{ color: 'var(--color-primary)' }} />
                      <h2 className="text-3xl font-bold" style={{ color: 'var(--color-text)' }}>A Equipa Orto+</h2>
                    </div>
                    <p className="leading-relaxed text-lg opacity-80" style={{ color: 'var(--color-text)' }}>
                      Faço parte do Grupo de Ortopedia Especializada <strong>Orto+</strong>. Trabalhamos em equipa para garantir que cada paciente recebe um acompanhamento multidisciplinar, altamente especializado e rigoroso.
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <img
                      src="/logotipo-ortomais.png"
                      alt="Logotipo Orto+"
                      className="h-60 md:h-50 object-contain"
                    />
                  </div>
                </div>

                {/* Bottom row: Team Photo */}
                <div className="w-full relative">
                  <img
                    src="/foto-equipa-ortomais.jpg"
                    alt="Equipa Orto+"
                    className="w-full shadow-lg object-cover"
                    style={{ borderRadius: 'var(--radius-lg)' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Locais de Trabalho */}
        <section id="locais" className="py-20 relative z-10">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>Locais de Trabalho</h2>
              <p className="opacity-80" style={{ color: 'var(--color-text)' }}>Centros clínicos preparados para o receber com tecnologia de ponta e máximo conforto.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">

              {/* Hospital Lusíadas Maia */}
              <div className="glass-panel p-8 flex flex-col h-full hover:-translate-y-1 transition-transform duration-300">
                <div className="h-20 md:h-28 flex items-center mb-8">
                  <img src="/logotipo-lusiadas.png" alt="Lusíadas Maia" className="h-20 md:h-28 object-contain" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--color-text)' }}>Hospital Lusíadas Maia</h3>
                  <a
                    href="https://maps.app.goo.gl/BChR7gy5QLGjqjrp6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-8 flex items-start gap-3 opacity-80 hover:opacity-100 transition-opacity group"
                    style={{ color: 'var(--color-text)' }}
                  >
                    <MapPin size={20} strokeWidth={1.5} className="mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" style={{ color: 'var(--color-primary)' }} />
                    <span className="clinical-data text-sm hover:underline">Tv. Dom Júlio Tavares Rebimbas 1,<br />4470-155 Maia</span>
                  </a>
                </div>
                <a href={surgeonData.schedulingUrl} target="_blank" rel="noopener noreferrer" className="w-full py-3 px-4 font-semibold transition-colors flex items-center justify-center gap-2 hover:opacity-80" style={{ backgroundColor: 'rgba(59, 135, 123, 0.1)', color: 'var(--color-primary)', borderRadius: 'var(--radius-sm)' }}>
                  Agendar neste local <ChevronRight size={18} strokeWidth={2} />
                </a>
              </div>

              {/* Hospital Pedro Hispano (ULSM) */}
              <div className="glass-panel p-8 flex flex-col h-full hover:-translate-y-1 transition-transform duration-300">
                <div className="h-20 md:h-28 flex items-center gap-4 md:gap-6 mb-8">
                  <img src="/logotipo-servico-ortopedia-ulsm.png" alt="Serviço de Ortopedia ULSM" className="h-16 md:h-28 object-contain flex-[0.5] min-w-0" />
                  <div className="w-px h-12 md:h-20 flex-shrink-0" style={{ backgroundColor: 'var(--surface-border)' }}></div>
                  <img src="/logotipo-ulsm.png" alt="ULS Matosinhos" className="h-16 md:h-28 object-contain flex-1 min-w-0" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--color-text)' }}>Hospital Pedro Hispano</h3>
                  <a
                    href="https://maps.app.goo.gl/6iEQYTZWvsUFv6A58"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-8 flex items-start gap-3 opacity-80 hover:opacity-100 transition-opacity group"
                    style={{ color: 'var(--color-text)' }}
                  >
                    <MapPin size={20} strokeWidth={1.5} className="mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" style={{ color: 'var(--color-primary)' }} />
                    <span className="clinical-data text-sm hover:underline">R. Dr. Eduardo Torres,<br />4464-513 Sra. da Hora, Matosinhos</span>
                  </a>
                </div>
                <a href="https://www.ulsm.min-saude.pt/" target="_blank" rel="noopener noreferrer" className="w-full py-3 px-4 font-semibold transition-colors flex items-center justify-center gap-2 hover:opacity-80" style={{ backgroundColor: 'rgba(59, 135, 123, 0.1)', color: 'var(--color-primary)', borderRadius: 'var(--radius-sm)' }}>
                  Mais Informações <ChevronRight size={18} strokeWidth={2} />
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* Secção ORCID / Publicações */}
        <section id="publicacoes" className="py-20 relative z-10">
          <div className="container mx-auto px-6 md:px-12 max-w-4xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(59, 135, 123, 0.1)', color: 'var(--color-primary)' }}>
                  <BookOpen size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="text-3xl font-bold" style={{ color: 'var(--color-text)' }}>Produção Científica</h2>
                  <p className="opacity-70 mt-1" style={{ color: 'var(--color-text)' }}>Artigos e publicações indexadas.</p>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 md:p-8">
              {loadingPubs ? (
                <div className="flex flex-col items-center justify-center py-16 opacity-60 gap-4" style={{ color: 'var(--color-text)' }}>
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: 'var(--color-primary)' }}></div>
                  <p className="clinical-data text-sm">A processar dados do ORCID...</p>
                </div>
              ) : publications.length > 0 ? (
                <ul className="space-y-3">
                  {publications.map((pub, idx) => (
                    <li key={idx} className="bg-white/40 p-5 rounded-lg border flex flex-col md:flex-row md:items-center justify-between gap-4 group transition-colors hover:bg-white/60" style={{ borderColor: 'var(--surface-border)' }}>
                      <div className="flex-1 pr-4">
                        <h4 className="font-semibold leading-snug transition-colors" style={{ color: 'var(--color-text)' }}>
                          {pub.title}
                        </h4>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="clinical-data text-xs px-2 py-1 rounded" style={{ backgroundColor: 'rgba(44, 62, 80, 0.05)' }}>
                            {pub.year}
                          </span>
                        </div>
                      </div>
                      {pub.doiUrl && (
                        <a
                          href={pub.doiUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="clinical-data inline-flex items-center justify-center gap-2 px-4 py-2 text-xs transition-colors shrink-0 hover:text-white"
                          style={{
                            border: '1px solid var(--color-primary)',
                            color: 'var(--color-primary)',
                            borderRadius: 'var(--radius-sm)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                            e.currentTarget.style.color = 'white';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = 'var(--color-primary)';
                          }}
                        >
                          LER ARTIGO <ExternalLink size={14} strokeWidth={1.5} />
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center py-8 opacity-60 clinical-data" style={{ color: 'var(--color-text)' }}>Nenhum registo encontrado.</p>
              )}
            </div>
          </div>
        </section>


        {/* Secção Formação e Experiência */}
        <section id="percurso" className="py-20 relative z-10">
          <div className="container mx-auto px-6 md:px-12">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>Percurso Profissional e Formação</h2>
              <p className="opacity-80" style={{ color: 'var(--color-text)' }}>Evolução contínua, rigor académico e experiência clínica dedicada à excelência.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">

              {/* Coluna Experiência */}
              <div>
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(59, 135, 123, 0.1)', color: 'var(--color-primary)' }}>
                    <Briefcase size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>Experiência Profissional</h3>
                </div>

                <div className="relative border-l-2 ml-4" style={{ borderColor: 'rgba(59, 135, 123, 0.2)' }}>
                  {surgeonData.experiences.map((exp, idx) => (
                    <div key={idx} className="mb-10 ml-8 relative group">
                      <span className="absolute flex items-center justify-center w-4 h-4 rounded-full -left-[41px] top-1.5 transition-colors duration-300" style={{ backgroundColor: 'var(--color-primary)', boxShadow: '0 0 0 4px var(--color-bg)' }}></span>

                      <h4 className="text-lg font-bold leading-snug mb-1" style={{ color: 'var(--color-text)' }}>{exp.role}</h4>
                      <div className="font-semibold text-sm mb-3" style={{ color: 'var(--color-primary)' }}>{exp.company}</div>

                      <div className="flex flex-wrap items-center gap-4 mb-3">
                        <span className="clinical-data text-xs px-2.5 py-1 rounded-md flex items-center gap-1.5" style={{ backgroundColor: 'rgba(44, 62, 80, 0.05)' }}>
                          <CalendarDays size={14} /> {exp.period}
                        </span>
                        {exp.location && (
                          <span className="clinical-data text-xs flex items-center gap-1.5 opacity-70">
                            <MapPin size={14} /> {exp.location}
                          </span>
                        )}
                      </div>

                      {exp.description && (
                        <p className="text-sm leading-relaxed opacity-80 mt-2" style={{ color: 'var(--color-text)' }}>
                          {exp.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Coluna Formação */}
              <div>
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(59, 135, 123, 0.1)', color: 'var(--color-primary)' }}>
                    <GraduationCap size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>Formação Académica</h3>
                </div>

                <div className="relative border-l-2 ml-4" style={{ borderColor: 'rgba(59, 135, 123, 0.2)' }}>
                  {surgeonData.education.map((edu, idx) => (
                    <div key={idx} className="mb-10 ml-8 relative group">
                      <span className="absolute flex items-center justify-center w-4 h-4 rounded-full -left-[41px] top-1.5 transition-colors duration-300" style={{ backgroundColor: 'var(--color-primary)', boxShadow: '0 0 0 4px var(--color-bg)' }}></span>

                      <h4 className="text-lg font-bold leading-snug mb-1" style={{ color: 'var(--color-text)' }}>{edu.course}</h4>
                      <div className="font-semibold text-sm mb-3" style={{ color: 'var(--color-primary)' }}>{edu.school}</div>

                      <div className="flex flex-wrap items-center gap-4 mb-3">
                        <span className="clinical-data text-xs px-2.5 py-1 rounded-md flex items-center gap-1.5" style={{ backgroundColor: 'rgba(44, 62, 80, 0.05)' }}>
                          <CalendarDays size={14} /> {edu.period}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* Footer Simplificado */}
        <footer id="contacto" className="py-12 mt-12 relative z-10 border-t border-black/5" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
          <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">

            {/* Copyright */}
            <div className="flex items-center gap-3">
              <p className="clinical-data text-sm opacity-60">
                &copy; {new Date().getFullYear()} <span className="font-bold opacity-100">{surgeonData.name}</span>
              </p>
            </div>

            {/* Ubnic Reference */}
            <div className="flex items-center gap-6">
              <span className="text-xs uppercase tracking-widest opacity-40 font-semibold">Desenvolvido por</span>
              <a href="https://ubnic.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group transition-all hover:opacity-80">
                <img src="/ubnic-logo-full.svg" alt="Ubnic Logo" className="h-9 object-contain" />
              </a>
            </div>

          </div>
        </footer>

      </div>
    </>
  );
}