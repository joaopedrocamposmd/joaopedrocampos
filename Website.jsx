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

  // Buscar publicações diretamente do ORCID
  useEffect(() => {
    const fetchOrcidData = async () => {
      try {
        const response = await fetch('https://pub.orcid.org/v3.0/0000-0003-2156-5820/works', {
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
    { name: 'Equipa Orto+', href: '#equipa' },
    { name: 'Locais de Trabalho', href: '#locais' },
    { name: 'Publicações', href: '#publicacoes' },
    { name: 'Percurso', href: '#percurso' },
  ];

  const experiences = [
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
  ];

  const education = [
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
  ];


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
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-panel py-3 !border-t-0 !border-x-0 !rounded-none !bg-white/80' : 'bg-transparent py-5'}`}>
          <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
            <a href="#" className="flex items-center gap-2">
              <span className=" font-bold text-xl tracking-tight" style={{ color: 'var(--color-text)' }}>Dr. João Pedro Campos</span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-sm font-medium transition-colors hover:text-[#3b877b]" style={{ color: 'var(--color-text)' }}>
                  {link.name}
                </a>
              ))}
              <a href="https://www.lusiadas.pt/corpo-clinico/dr-joao-pedro-campos" target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center gap-2 text-sm">
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
            <div className="md:hidden absolute top-full left-0 w-full glass-panel !rounded-none shadow-xl py-4 flex flex-col items-center gap-4 border-t">
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
              <span className="text-sm tracking-wide uppercase">Especialista em Ortopedia</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight" style={{ color: 'var(--color-text)' }}>
              Cirurgião de Joelho <br />
              <span className="font-medium" style={{ color: 'var(--color-primary)' }}>Knee Surgeon</span>
            </h1>
            <p className="text-lg max-w-xl leading-relaxed opacity-80" style={{ color: 'var(--color-text)' }}>
              Dedicado à patologia do joelho. O meu foco é proporcionar os tratamentos mais avançados, apoiados em dados e precisão clínica, para restaurar a sua mobilidade.
            </p>


            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a href="#locais" className="btn-primary flex items-center gap-2">
                Locais de Consulta
                <ChevronRight size={18} />
              </a>
              <a href="https://www.linkedin.com/in/jo%C3%A3o-pedro-campos-765214208/" target="_blank" rel="noopener noreferrer" className="glass-panel px-6 py-3 font-medium transition-all flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
                <Linkedin size={18} strokeWidth={1.5} />
                Perfil LinkedIn
              </a>
            </div>
          </div>
          <div className="flex-1 flex justify-center md:justify-end relative">
            <div className="absolute inset-0 transform rotate-3 scale-95 opacity-20" style={{ backgroundColor: 'var(--color-primary)', borderRadius: 'var(--radius-lg)' }}></div>
            <img
              src="/foto-minha.jpg"
              alt="Dr. João Pedro Campos"
              className="w-full max-w-md shadow-xl relative z-10 object-cover aspect-[4/5]"
              style={{ borderRadius: 'var(--radius-lg)' }}
            />
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
                <a href="https://www.lusiadas.pt/corpo-clinico/dr-joao-pedro-campos" target="_blank" rel="noopener noreferrer" className="w-full py-3 px-4 font-semibold transition-colors flex items-center justify-center gap-2 hover:opacity-80" style={{ backgroundColor: 'rgba(59, 135, 123, 0.1)', color: 'var(--color-primary)', borderRadius: 'var(--radius-sm)' }}>
                  Agendar neste local <ChevronRight size={18} strokeWidth={2} />
                </a>
              </div>

              {/* Hospital Pedro Hispano (ULSM) */}
              <div className="glass-panel p-8 flex flex-col h-full hover:-translate-y-1 transition-transform duration-300">
                <div className="h-20 md:h-28 flex items-center gap-4 md:gap-6 mb-8">
                  <img src="/logotipo-servico-ortopedia-ulsm.png" alt="Serviço de Ortopedia ULSM" className="h-16 md:h-28 object-contain flex-1 min-w-0" />
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
                  {experiences.map((exp, idx) => (
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
                  {education.map((edu, idx) => (
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
                &copy; {new Date().getFullYear()} <span className="font-bold opacity-100">Dr. João Pedro Campos</span>
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