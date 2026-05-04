/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {useState, useEffect, useMemo} from 'react';
import {motion, AnimatePresence} from 'motion/react';
import {Menu, X, Book, FileText, Download, HelpCircle, GraduationCap, Github, Mail, MapPin, Phone, Clock, ExternalLink, ChevronDown, ChevronRight, Star, Search, MessageSquare, Send} from 'lucide-react';
import {SEMESTERS, FAQS} from './constants';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [expandedSems, setExpandedSems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'bug' | 'suggestion'>('suggestion');

  const toggleSem = (id: string) => {
    setExpandedSems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const filteredSemesters = useMemo(() => {
    if (!searchQuery.trim()) return SEMESTERS;
    
    const query = searchQuery.toLowerCase();
    return SEMESTERS.map(sem => {
      const matchesSem = sem.title.toLowerCase().includes(query);
      const filteredSubjects = sem.subjects.filter(sub => 
        sub.name.toLowerCase().includes(query)
      );
      
      if (matchesSem || filteredSubjects.length > 0) {
        return {
          ...sem,
          subjects: matchesSem ? sem.subjects : filteredSubjects
        };
      }
      return null;
    }).filter(Boolean) as typeof SEMESTERS;
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery.trim() && filteredSemesters.length > 0) {
      setExpandedSems(filteredSemesters.map(s => s.id));
    }
  }, [filteredSemesters, searchQuery]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'resources', 'faqs', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex min-h-screen bg-cream text-ink font-body selection:bg-gold selection:text-dark-brown">
      <div className="noise-overlay" />

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed md:sticky top-0 left-0 h-screen w-64 bg-dark-brown border-r-3 border-double border-gold 
        sidebar-gradient z-50 transition-transform duration-300 transform
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-8 text-center border-b-2 border-brown relative">
          <div className="w-16 h-16 mx-auto mb-4 bg-gold flex items-center justify-center shadow-[0_0_0_3px_var(--color-brown),0_0_0_5px_var(--color-gold)]" style={{clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'}}>
            <div className="w-12 h-12 bg-dark-brown flex items-center justify-center text-gold text-2xl font-display" style={{clipPath: 'polygon(50% 5%, 95% 27%, 95% 73%, 50% 95%, 5% 73%, 5% 27%)'}}>
              EL
            </div>
          </div>
          <h1 className="font-display text-sm font-bold text-gold-light tracking-widest uppercase leading-tight">
            EL Resource<br/>Lair
          </h1>
          <div className="font-special text-[10px] text-tan mt-2 tracking-[0.2em]">BURNING BRIGHT</div>
          <div className="text-gold text-[9px] mt-2 tracking-widest">✦ ✦ ✦</div>
        </div>

        <nav className="flex-1 py-6">
          <div className="px-6 py-2 text-[9px] text-brown font-mono uppercase tracking-[0.3em]">Navigate</div>
          {[
            {id: 'about', label: 'About Us', icon: Book},
            {id: 'resources', label: 'Academic Resources', icon: GraduationCap},
            {id: 'faqs', label: 'Guidelines & FAQs', icon: HelpCircle},
            {id: 'contact', label: 'Connect With Us', icon: Mail},
          ].map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => {
                setActiveSection(link.id);
                setIsSidebarOpen(false);
              }}
              className={`
                flex items-center gap-3 px-6 py-3 font-head text-xs uppercase tracking-widest transition-all
                ${activeSection === link.id ? 'text-gold-light bg-gold/10 border-l-4 border-gold' : 'text-parchment hover:text-gold-light hover:bg-gold/5 border-l-4 border-transparent'}
              `}
            >
              <span className="text-brown">›</span>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="p-4 border-t-2 border-brown text-center">
          <p className="font-mono text-[9px] text-brown tracking-wider uppercase leading-relaxed">
            ✦ Knowledge & Preservation ✦<br/>
            The EL Archive Project<br/>
            <span className="opacity-50 text-[8px]">NON-OFFICIAL / COMMUNITY DRIVEN</span>
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 relative">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 bg-dark-brown border-b-2 border-gold fixed top-0 w-full z-40">
          <button onClick={() => setIsSidebarOpen(true)} className="text-gold p-2 border-2 border-gold">
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-display text-gold-light text-sm tracking-widest font-bold">EL RESOURCE LAIR</span>
          <div className="w-10 h-10" />
        </div>

        {/* Hero Section */}
        <header id="hero" className="banner bg-dark-brown p-20 py-24 text-center relative overflow-hidden border-b-6 border-double border-gold banner-gradient">
          <div className="absolute top-4 left-4 w-20 h-20 border-t-3 border-l-3 border-gold/50" />
          <div className="absolute top-4 right-4 w-20 h-20 border-t-3 border-r-3 border-gold/50" />
          <div className="absolute bottom-4 left-4 w-20 h-20 border-b-3 border-l-3 border-gold/50" />
          <div className="absolute bottom-4 right-4 w-20 h-20 border-b-3 border-r-3 border-gold/50" />

          <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            className="font-mono text-[10px] text-tan uppercase tracking-[0.6em] mb-4"
          >
            CET Electrical & Electronics &mdash; Independent Archive
          </motion.div>

          <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{delay: 0.5}}
            className="font-special text-[11px] text-gold uppercase tracking-[0.8em] mb-8"
          >
            ✦ &nbsp; ACCESS &nbsp; ✦ &nbsp; LEARN &nbsp; ✦ &nbsp; EXCEL &nbsp; ✦
          </motion.div>

          <motion.h2
            initial={{opacity: 0, y: 30}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8}}
            className="font-display text-5xl md:text-7xl font-black italic text-gold-light banner-title-shadow leading-tight mb-4"
          >
            The Resource<br/>Lair
            <span className="block font-head text-2xl md:text-3xl not-italic tracking-[0.4em] text-parchment mt-2 shadow-none">
              STUDENT INITIATIVE 1987-2026
            </span>
          </motion.h2>

          <div className="text-gold text-2xl tracking-[0.5em] my-6">⚜ &nbsp; ⚜ &nbsp; ⚜</div>

          <motion.p
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.3}}
            className="font-special text-sm text-cream max-w-2xl mx-auto leading-relaxed opacity-90"
          >
            A dedicated sanctuary for EL students. Serving reference texts, academic notes, 
            and historical examination patterns, maintained independently for the pursuit of excellence.
          </motion.p>

          <div className="flex items-center gap-4 justify-center mt-8">
            <div className="h-px bg-gradient-to-r from-transparent to-gold w-32 md:w-48" />
            <span className="font-special text-gold text-xs tracking-widest uppercase whitespace-nowrap">
              ✦ Open Access Academic Vault ✦
            </span>
            <div className="h-px bg-gradient-to-l from-transparent to-gold w-32 md:w-48" />
          </div>
        </header>

        {/* Ticker */}
        <div className="bg-red border-y-2 border-gold overflow-hidden py-2">
          <div className="flex whitespace-nowrap ticker-scroll">
            {Array(4).fill(0).map((_, i) => (
              <span key={i} className="font-head text-[11px] uppercase tracking-widest text-cream px-10">
                LATEST NOTES FOR S4 DIGITAL ELECTRONICS ADDED ✦ PREVIOUS YEAR QUESTION PAPERS UPDATED ✦ JOIN THE DISCORD FOR REALTIME ASSISTANCE ✦ NEW REFERENCE TEXTS AVAILABLE FOR S2 MATHEMATICS ✦ 
              </span>
            ))}
          </div>
        </div>

        {/* Notice Bar */}
        <div className="bg-olive border-b-3 border-dark-brown px-8 py-3 flex items-center gap-4">
          <span className="bg-red text-cream font-head text-[9px] uppercase tracking-widest px-3 py-1 flex-shrink-0">
            📢 BULLETIN
          </span>
          <p className="text-cream text-xs font-body opacity-90">
            Internal Sessional examinations start next week. All students are advised to revise the question paper bank for patterns.
          </p>
        </div>

        {/* About Section */}
        <section id="about" className="p-12 md:p-20 relative border-b-4 border-double border-tan overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="font-display text-[150px] md:text-[250px] font-black text-tan/5 -rotate-12 select-none uppercase">LAIR</div>
          </div>

          <div className="text-center mb-16 relative">
            <span className="font-mono text-[10px] text-red uppercase tracking-[0.5em] block mb-3">§ Intentions</span>
            <h3 className="font-display text-4xl md:text-5xl font-black text-dark-brown">The <em>Genesis</em> of the Lair</h3>
            <div className="flex items-center gap-4 justify-center mt-6">
              <div className="h-0.5 bg-gradient-to-r from-transparent to-brown w-32" />
              <span className="text-gold">✦</span>
              <div className="h-0.5 bg-gradient-to-l from-transparent to-brown w-32" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 relative">
            <div className="space-y-6">
              <p className="text-sm leading-8 text-ink text-justify first-letter:float-left first-letter:text-6xl first-letter:font-black first-letter:font-display first-letter:text-red first-letter:mr-3 first-letter:mt-1">
                For years, the official channels have been sufficient for administrative grievances, yet the academic thirst of the EL student remained partially unquenched. The lack of a centralized, accessible repository for high-quality reference scans and student-authored notes led to the inception of this burner initiative—The EL Resource Lair.
              </p>
              <p className="text-sm leading-8 text-ink text-justify">
                We believe that knowledge should be shared without friction. Our mission is to bridge the gap between the classroom and the study table, providing resources that are often hard to find or distribute through formal association portals. This is your vault, built by students, for students.
              </p>
              <blockquote className="border-l-4 border-gold bg-gold/5 p-6 relative">
                <span className="absolute top-2 left-4 text-6xl text-gold/20 font-display">"</span>
                <p className="font-display italic text-lg text-dark-brown">
                  Academic excellence is not an act, but a habit of accessing the right resources at the right time.
                </p>
                <footer className="mt-4 text-xs font-mono text-brown/70">— Anonymous EL Senior, '92</footer>
              </blockquote>
            </div>

            <div className="space-y-6">
              <div className="bg-dark-brown border-2 border-brown border-t-4 border-gold p-6 relative transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0_var(--color-brown)]">
                <div className="text-4xl font-display font-black text-gold-light">S1 - S4</div>
                <div className="font-head text-xs text-tan uppercase tracking-widest mt-1">Current Coverage</div>
                <p className="text-parchment text-[11px] mt-2 opacity-70">Extensive resources for the foundational years of our degree program are now fully online.</p>
              </div>
              <div className="bg-dark-brown border-2 border-brown border-t-4 border-gold p-6 relative transition-transform hover:-translate-y-1 hover:shadow-[6px_6px_0_var(--color-brown)]">
                <div className="text-4xl font-display font-black text-gold-light">100%</div>
                <div className="font-head text-xs text-tan uppercase tracking-widest mt-1">Digital Archive</div>
                <p className="text-parchment text-[11px] mt-2 opacity-70">Every document is verified for clarity and correctness by our volunteer team.</p>
              </div>
              <div className="p-6 bg-parchment border-2 border-tan shadow-inner">
                <h4 className="font-head text-[10px] text-red uppercase tracking-[0.3em] mb-4">Maintenance Schedule</h4>
                <div className="font-special text-xs space-y-2 leading-relaxed">
                  Resource Audit — Fortnightly<br/>
                  Link Verification — Every Sunday<br/>
                  Question Bank Push — Post Examination<br/>
                  New Notes Drop — Semester Start
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section id="resources" className="p-12 md:p-20 bg-parchment border-b-4 border-double border-tan">
          <div className="text-center mb-12">
            <span className="font-mono text-[10px] text-red uppercase tracking-[0.5em] block mb-3">§ The Vault</span>
            <h3 className="font-display text-4xl md:text-5xl font-black text-dark-brown">Academic <em>Resources</em></h3>
            <div className="flex items-center gap-4 justify-center mt-6">
              <div className="h-0.5 bg-gradient-to-r from-transparent to-brown w-32" />
              <span className="text-gold">✦</span>
              <div className="h-0.5 bg-gradient-to-l from-transparent to-brown w-32" />
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mb-12 relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-brown/50 group-focus-within:text-gold transition-colors">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Search by subject or semester..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-cream border-2 border-tan px-12 py-4 font-body text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all placeholder:text-tan/60"
            />
            <div className="absolute right-4 inset-y-0 flex items-center font-mono text-[9px] text-tan uppercase tracking-widest pointer-events-none">
              Filter Active
            </div>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {filteredSemesters.length > 0 ? (
              filteredSemesters.map((sem) => (
                <div key={sem.id} className="border-2 border-tan bg-cream overflow-hidden">
                  <button
                    onClick={() => toggleSem(sem.id)}
                    className="w-full flex items-center justify-between p-6 bg-dark-brown text-gold-light hover:text-white transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <GraduationCap className="w-6 h-6" />
                      <span className="font-display text-2xl font-bold italic">{sem.title}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <a 
                        href={sem.syllabusLink} 
                        target="_blank" 
                        onClick={(e) => e.stopPropagation()}
                        className="text-[10px] font-mono border border-gold/30 px-3 py-1 hover:bg-gold hover:text-dark-brown transition-all"
                      >
                        SYLLABUS
                      </a>
                      {expandedSems.includes(sem.id) ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {expandedSems.includes(sem.id) && (
                      <motion.div
                        initial={{height: 0}}
                        animate={{height: 'auto'}}
                        exit={{height: 0}}
                        className="overflow-hidden"
                      >
                        <div className="p-6 space-y-8">
                          {/* Subjects Grid */}
                          <div>
                            <h4 className="font-head text-xs text-red uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                               <Book className="w-4 h-4" /> Subjects & Textbooks
                            </h4>
                            <div className="grid md:grid-cols-2 gap-4">
                              {sem.subjects.map((sub, idx) => (
                                <div key={idx} className="p-4 border border-tan/50 bg-parchment/30 hover:border-brown transition-all group">
                                  <div className="font-display font-bold text-dark-brown mb-3 group-hover:text-red transition-colors">{sub.name}</div>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    <a href={sub.referenceLink} target="_blank" className="flex items-center gap-1 text-[10px] font-head border border-brown px-3 py-1.5 hover:bg-brown hover:text-cream transition-all">
                                      <Book className="w-3 h-3" /> REFERENCE
                                    </a>
                                    <a href={sub.notesLink} target="_blank" className="flex items-center gap-1 text-[10px] font-head border border-brown px-3 py-1.5 hover:bg-brown hover:text-cream transition-all">
                                      <FileText className="w-3 h-3" /> NOTES
                                    </a>
                                    <a href={sub.questionPaperLink} target="_blank" className="flex items-center gap-1 text-[10px] font-head border border-brown px-3 py-1.5 hover:bg-brown hover:text-cream transition-all">
                                      <Download className="w-3 h-3" /> QP BANK
                                    </a>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                        {/* Additional Sub-sections */}
                        <div className="grid md:grid-cols-2 gap-8 pt-6 border-t border-tan/30">
                          <div className="bg-white/30 p-6 border-2 border-dashed border-tan">
                            <h5 className="font-head text-[10px] text-dark-brown uppercase tracking-widest mb-3 flex items-center gap-2">
                              <Star className="w-4 h-4 text-gold" /> Previous Year Question Papers
                            </h5>
                            <p className="text-[11px] mb-4 opacity-70">Consolidated collection of question papers spanning the last 5 years for all subjects in {sem.title}.</p>
                            <a href={sem.syllabusLink} target="_blank" className="flex items-center justify-center gap-2 font-head text-xs border-2 border-dark-brown p-3 hover:bg-dark-brown hover:text-gold transition-all">
                              ACCESS QP REPOSITORY <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                          <div className="bg-white/30 p-6 border-2 border-dashed border-tan">
                            <h5 className="font-head text-[10px] text-dark-brown uppercase tracking-widest mb-3 flex items-center gap-2">
                              <FileText className="w-4 h-4 text-gold" /> Official Syllabus (KTU)
                            </h5>
                            <p className="text-[11px] mb-4 opacity-70">Download the detailed scheme and syllabus as prescribed by the university for this semester.</p>
                            <a href={sem.syllabusLink} target="_blank" className="flex items-center justify-center gap-2 font-head text-xs border-2 border-dark-brown p-3 hover:bg-dark-brown hover:text-gold transition-all">
                              DOWNLOAD SYLLABUS <Download className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))
          ) : (
            <div className="text-center p-12 bg-white/30 border-2 border-dashed border-tan">
              <p className="font-display italic text-dark-brown/50">No manuscripts or archives found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

        {/* FAQs Section */}
        <section id="faqs" className="p-12 md:p-20 relative">
          <div className="text-center mb-16">
            <span className="font-mono text-[10px] text-red uppercase tracking-[0.5em] block mb-3">§ Clarity</span>
            <h3 className="font-display text-4xl md:text-5xl font-black text-dark-brown">Guidelines &amp; <em>FAQs</em></h3>
            <div className="flex items-center gap-4 justify-center mt-6">
              <div className="h-0.5 bg-gradient-to-r from-transparent to-brown w-32" />
              <span className="text-gold">✦</span>
              <div className="h-0.5 bg-gradient-to-l from-transparent to-brown w-32" />
            </div>
          </div>

          <div className="max-w-3xl mx-auto grid gap-6">
            {FAQS.map((faq, i) => (
              <div key={i} className="p-8 bg-cream border border-tan relative before:content-['\201C'] before:absolute before:top-2 before:left-4 before:text-6xl before:text-gold/20 before:font-display">
                <h4 className="font-display font-bold text-dark-brown mb-4 text-lg italic">{faq.question}</h4>
                <p className="text-sm opacity-80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Join/Connect Section */}
        <section id="connect" className="bg-dark-brown p-12 md:p-20 text-center relative overflow-hidden border-y-4 border-double border-gold">
          <div className="absolute inset-0 sidebar-gradient opacity-30" />
          <div className="relative z-10">
            <span className="font-mono text-[10px] text-tan uppercase tracking-[0.4em] block mb-4">§ Contribution</span>
            <h3 className="font-display text-4xl md:text-5xl font-black text-gold-light mb-8">Join the <em className="text-parchment">Archive Initiative</em></h3>
            <p className="text-parchment text-sm max-w-xl mx-auto leading-relaxed mb-10 opacity-80">
              Have notes, reference books, or old question papers that aren't on here yet? Help your fellow students by contributing to the Lair.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="bg-white/5 border border-gold/30 p-4 px-8 flex flex-col items-center">
                <Github className="w-6 h-6 text-gold mb-2" />
                <span className="font-mono text-[9px] uppercase tracking-widest text-parchment">Contribute Code</span>
              </div>
              <div className="bg-white/5 border border-gold/30 p-4 px-8 flex flex-col items-center">
                <FileText className="w-6 h-6 text-gold mb-2" />
                <span className="font-mono text-[9px] uppercase tracking-widest text-parchment">Submit Notes</span>
              </div>
              <div className="bg-white/5 border border-gold/30 p-4 px-8 flex flex-col items-center cursor-pointer hover:bg-white/10 transition-colors" onClick={() => setIsFeedbackModalOpen(true)}>
                <MessageSquare className="w-6 h-6 text-gold mb-2" />
                <span className="font-mono text-[9px] uppercase tracking-widest text-parchment">Feedback & Help</span>
              </div>
            </div>
            <button 
              onClick={() => setIsFeedbackModalOpen(true)}
              className="inline-block bg-gold text-dark-brown font-head text-xs uppercase tracking-[0.3em] px-12 py-5 border-4 border-gold-light hover:bg-gold-light transition-all shadow-[0_4px_20px_rgba(200,146,42,0.3)]"
            >
              SUBMIT RESOURCE / BUG REPORT
            </button>
          </div>
        </section>

        {/* Feedback Modal */}
        <AnimatePresence>
          {isFeedbackModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                onClick={() => setIsFeedbackModalOpen(false)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />
              <motion.div
                initial={{scale: 0.9, opacity: 0}}
                animate={{scale: 1, opacity: 1}}
                exit={{scale: 0.9, opacity: 0}}
                className="relative bg-cream border-4 border-gold w-full max-w-lg overflow-hidden shadow-2xl"
              >
                <div className="bg-dark-brown p-6 border-b-2 border-gold flex items-center justify-between">
                  <h4 className="font-display italic text-xl text-gold-light">Communications Center</h4>
                  <button onClick={() => setIsFeedbackModalOpen(false)} className="text-gold hover:text-white">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="p-8 space-y-6">
                  <div className="flex gap-4 p-1 bg-dark-brown/10 border border-tan">
                    <button 
                      onClick={() => setFeedbackType('suggestion')}
                      className={`flex-1 py-2 font-head text-[10px] uppercase tracking-widest transition-all ${feedbackType === 'suggestion' ? 'bg-gold text-dark-brown shadow-inner' : 'text-brown hover:bg-gold/10'}`}
                    >
                      Suggestion
                    </button>
                    <button 
                      onClick={() => setFeedbackType('bug')}
                      className={`flex-1 py-2 font-head text-[10px] uppercase tracking-widest transition-all ${feedbackType === 'bug' ? 'bg-red text-cream shadow-inner' : 'text-brown hover:bg-red/10'}`}
                    >
                      Report Bug
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block font-mono text-[9px] uppercase tracking-widest text-brown mb-2 pl-1">Identification</label>
                      <input type="text" placeholder="Your name (Optional)" className="w-full bg-parchment/30 border border-tan p-3 font-body text-sm focus:outline-none focus:border-gold" />
                    </div>
                    <div>
                      <label className="block font-mono text-[9px] uppercase tracking-widest text-brown mb-2 pl-1">Detailed Message</label>
                      <textarea 
                        rows={4} 
                        placeholder={feedbackType === 'bug' ? "Describe the technical issue in detail..." : "Suggest new resources or improvements..."}
                        className="w-full bg-parchment/30 border border-tan p-3 font-body text-sm focus:outline-none focus:border-gold resize-none"
                      />
                    </div>
                  </div>

                  <button className="w-full bg-gold text-dark-brown py-4 font-head text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-gold-light transition-all shadow-[4px_4px_0_var(--color-dark-brown)] active:translate-x-1 active:translate-y-1 active:shadow-none">
                    <Send className="w-4 h-4" /> Dispatch Message
                  </button>
                  
                  <p className="text-[10px] text-center opacity-50 font-mono italic">"The Archive survives on community vigilance."</p>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <footer id="contact" className="bg-black text-parchment">
          <div className="bg-red border-y-3 border-double border-gold px-8 md:px-20 py-4 flex items-center justify-between">
            <span className="font-head text-xs tracking-[0.3em] uppercase text-cream">EL Resource Lair</span>
            <span className="text-gold-light text-xl">⚜ ✦ ⚜</span>
            <span className="font-head text-xs tracking-[0.3em] uppercase text-cream">Est. MCMLXXXVII</span>
          </div>

          <div className="p-12 md:p-20 grid md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/5">
            <div className="space-y-6">
              <div className="font-display italic text-2xl text-gold-light">EL Resource Lair</div>
              <div className="h-px bg-gold/30 w-full" />
              <p className="text-[11px] leading-relaxed opacity-60">
                A community-driven digital archive for Electrical & Electronics Engineering students at CET. Dedicated to free and fair distribution of academic wisdom.
              </p>
              <div className="flex gap-4">
                {[Github, Mail, ExternalLink].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 bg-white/5 border border-gold/30 flex items-center justify-center text-parchment hover:bg-gold hover:text-dark-brown transition-all">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <div className="font-head text-[10px] text-gold uppercase tracking-[0.4em] mb-6 pb-2 border-b border-gold/20">The Archive</div>
              <ul className="text-[11px] space-y-3 opacity-60">
                {['About Initiative', 'S1-S2 Resources', 'S3-S4 Resources', 'Question Paper Bank', 'University Syllabus', 'Faculty Notes'].map((item) => (
                  <li key={item} className="flex items-center gap-2 hover:text-gold-light transition-colors">
                    <span className="text-gold">›</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="font-head text-[10px] text-gold uppercase tracking-[0.4em] mb-6 pb-2 border-b border-gold/20">Resources</div>
              <ul className="text-[11px] space-y-3 opacity-60">
                {['Reference Catalog', 'EL Association', 'Department News', 'Student Grievances', 'Academic Calendar'].map((item) => (
                  <li key={item} className="flex items-center gap-2 hover:text-gold-light transition-colors">
                    <span className="text-gold">›</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="font-head text-[10px] text-gold uppercase tracking-[0.4em] mb-6 pb-2 border-b border-gold/20">Contact Vault</div>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <MapPin className="w-5 h-5 text-gold flex-shrink-0" />
                  <div className="text-[11px]">
                    <strong className="block text-gold-light font-mono uppercase tracking-widest text-[9px] mb-1">Location</strong>
                    Room 102, EEE Block, CET<br/>Thiruvananthapuram, Kerala
                  </div>
                </div>
                <div className="flex gap-3">
                  <Mail className="w-5 h-5 text-gold flex-shrink-0" />
                  <div className="text-[11px]">
                    <strong className="block text-gold-light font-mono uppercase tracking-widest text-[9px] mb-1">Email</strong>
                    el.archive@cet.ac.in
                  </div>
                </div>
                <div className="flex gap-3">
                  <Clock className="w-5 h-5 text-gold flex-shrink-0" />
                  <div className="text-[11px]">
                    <strong className="block text-gold-light font-mono uppercase tracking-widest text-[9px] mb-1">Study Hours</strong>
                    24/7 Digital Access
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 px-12 md:px-20 flex flex-wrap items-center justify-between gap-4">
            <div className="font-mono text-[9px] opacity-40 tracking-widest">
              &copy; 2026 THE EL RESOURCE LAIR &mdash; INDEPENDENT PROJECT &mdash; ALL RIGHTS RESERVED
            </div>
            <div className="font-special text-[11px] text-gold opacity-50 tracking-[0.2em]">
              KNOWLEDGE · PRESERVATION · EXCELLENCE
            </div>
            <div className="font-mono text-[9px] opacity-40 tracking-widest uppercase">
              Curated by the class of '26
            </div>
          </div>
        </footer>
        
        {/* Back to Top */}
        <button 
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          className="fixed bottom-8 right-8 w-11 h-11 bg-dark-brown border-2 border-gold text-gold flex items-center justify-center hover:bg-gold hover:text-dark-brown transition-all z-50 shadow-lg"
        >
          ▲
        </button>
      </main>
    </div>
  );
}
