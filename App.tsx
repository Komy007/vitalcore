import React, { useState, useEffect } from 'react';
import {
  Menu, X, Activity, HelpCircle, Shield, Brain, Heart, Droplet,
  ArrowRight, User, Edit, ChevronLeft, Sparkles, Bot, Search, ExternalLink, Globe, Lock, Eye, EyeOff, MessageCircle, Flame, Clock, Thermometer, ChevronDown, Info, FlaskConical, Zap, BookOpen, GraduationCap, Award, CheckCircle2, Coffee, Layers, Quote, ShoppingBag, Star, ShieldCheck, Mail, Send, FileText, Trash2, Plus, Loader2, Languages
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { IMAGES, TRANSLATIONS, VitalCoreLogo } from './constants';
import { Language, UserInfo, ResearchData } from './types';
import { useAuth } from './contexts/AuthContext';
import { api } from './services/api';

const benefitIcons = [Shield, Droplet, Zap, Sparkles, Brain];

const App: React.FC = () => {
  const { user, login, logout, isAuthenticated, isAdmin } = useAuth();

  const [lang, setLang] = useState<Language>(() => {
    if (typeof navigator !== 'undefined' && navigator.language) {
      return navigator.language.startsWith('ko') ? 'ko' : 'en';
    }
    return 'ko';
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('summary');
  const [aboutActiveTab, setAboutActiveTab] = useState('intro');
  const [benefitActiveTab, setBenefitActiveTab] = useState(0);
  const [isLangOpen, setIsLangOpen] = useState(false);

  // Mobile Modals
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isResearchModalOpen, setIsResearchModalOpen] = useState(false);
  const [isBenefitModalOpen, setIsBenefitModalOpen] = useState(false);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  // Auth Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPw, setLoginPw] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPw, setRegPw] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regCountry, setRegCountry] = useState('Cambodia');
  const [authMessage, setAuthMessage] = useState<string | null>(null);

  // Restored State & Functions
  const [selectedReport, setSelectedReport] = useState<any | null>(null);
  const [viewedReportCount, setViewedReportCount] = useState(parseInt(localStorage.getItem('health_views') || '0'));

  const [questions, setQuestions] = useState<any[]>([]);
  const [healthReports, setReports] = useState<any[]>([]);
  const [adminAnswer, setAdminAnswer] = useState<{ [key: number]: string }>({});

  const [isQnaModalOpen, setIsQnaModalOpen] = useState(false);
  const [editingQuestionId, setEditingQuestionId] = useState<number | null>(null);

  const [newQuestion, setNewQuestion] = useState({ title: '', content: '', is_secret: false });
  const [healthStatus, setHealthStatus] = useState<string>('Checking...');

  // Notice System State
  const [notices, setNotices] = useState<any[]>([]);
  const [activeBanner, setActiveBanner] = useState<any | null>(null);
  const [activePopup, setActivePopup] = useState<any | null>(null);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [noticeLang, setNoticeLang] = useState<Language>('ko');
  const [newNotice, setNewNotice] = useState<any>({ title: '', content: '', type: 'normal' });

  useEffect(() => {
    console.log("VitalCore App v1.5.0 Loaded");
    checkHealth();
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const checkHealth = async () => {
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const data = await res.json();
        setHealthStatus(data.db_connected ? 'Online (DB Connected)' : 'Online (DB Missing)');
      } else {
        setHealthStatus('Error ' + res.status);
      }
    } catch (e) {
      setHealthStatus('Offline');
    }
  };

  // Research Data
  const researchData = [
    { category: 'Tumor Inhibition', control: 12, phellinus: 96.7 },
    { category: 'Immune Activity', control: 25, phellinus: 88.4 },
    { category: 'Anti-Inflammation', control: 30, phellinus: 92.1 },
    { category: 'Cell Protection', control: 45, phellinus: 85.3 },
  ];

  const t = TRANSLATIONS[lang];

  const fetchReports = async () => {
    try {
      const data = await api.health.list();
      setReports(data);
    } catch (e) { console.error(e); }
  };

  useEffect(() => {
    fetchQuestions();
    fetchReports();
    fetchNotices();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthMessage(null);
    try {
      const { token, user } = await api.auth.login({ email: loginEmail, password: loginPw });
      login(token, user);
      setIsAuthModalOpen(false);
      setAuthMessage(null);
    } catch (err: any) {
      const msg = err.details ? `${err.error}: ${err.details}` : (err.error || 'Login failed');
      setAuthMessage(msg);
    }
  };

  const [currentView, setCurrentView] = useState('home'); // 'home', 'health', 'faq', 'admin'

  // Admin Dashboard State
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [adminTab, setAdminTab] = useState<'users' | 'reports' | 'qna'>('users');
  const [userList, setUserList] = useState<any[]>([]);
  const [editingUser, setEditingUser] = useState<any>(null);

  // Create Report State
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [editingReportId, setEditingReportId] = useState<number | null>(null);
  const [newReport, setNewReport] = useState<any>({ title: '', content: '', summary: '', key_point: '', image_url: '' });
  const [reportLang, setReportLang] = useState<'ko' | 'en' | 'zh' | 'ja'>('ko');

  // Notices State
  // (Removed duplicates: notices, isNoticeModalOpen, etc. were declared above)
  const [isTranslating, setIsTranslating] = useState(false);

  // Notice System Handlers
  const handleCreateNotice = async () => {
    try {
      await api.notices.create(newNotice);
      setIsNoticeModalOpen(false);
      setNewNotice({ title: '', content: '', type: 'normal' });
      fetchNotices();
      alert('Notice posted successfully!');
    } catch (e) { alert('Failed to post notice'); }
  };

  const handleClosePopup = (forever: boolean) => {
    if (activePopup) {
      if (forever) {
        localStorage.setItem(`hide_popup_${activePopup.id}`, new Date().toDateString());
      }
      setActivePopup(null);
    }
  };

  // SEO: Sync URL <-> Lang & Auto-Detect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang');
    if (urlLang && ['en', 'zh', 'ja', 'ko'].includes(urlLang)) {
      setLang(urlLang as any);
    } else {
      // Auto-detect browser language if no URL param
      const browserLang = navigator.language.split('-')[0];
      if (['en', 'zh', 'ja', 'ko'].includes(browserLang)) {
        setLang(browserLang as any);
      }
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (lang !== 'ko') params.set('lang', lang);
    else params.delete('lang');
    const newUrl = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
    window.history.replaceState({}, '', newUrl);
  }, [lang]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthMessage(null);
    try {
      await api.auth.register({ name: regName, email: regEmail, password: regPw, phone: regPhone, country: regCountry });
      setAuthMode('login');
      setAuthMessage('Account created. Please login.');
    } catch (err: any) {
      const msg = err.details ? `${err.error}: ${err.details}` : (err.error || 'Registration failed');
      setAuthMessage(msg);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await api.auth.getUsers();
      setUserList(data);
    } catch (err) { console.error(err); }
  };

  const fetchNotices = async () => {
    try {
      const data = await api.notices.list();
      setNotices(data);

      // Filter for active Banner & Popup
      const banner = data.find((n: any) => n.type === 'banner' && n.is_active);
      setActiveBanner(banner);

      const popup = data.find((n: any) => n.type === 'popup' && n.is_active);
      if (popup) {
        // Check local storage for "Do not show today"
        const hiddenDate = localStorage.getItem(`hide_popup_${popup.id}`);
        const today = new Date().toDateString();
        if (hiddenDate !== today) {
          setActivePopup(popup);
        }
      }
    } catch (e) { console.error(e); }
  };

  const handleUpdateUser = async () => {
    if (!editingUser) return;
    try {
      await api.auth.updateUser(editingUser.id, editingUser);
      setEditingUser(null);
      fetchUsers();
      alert('User updated successfully');
    } catch (err) { alert('Failed to update user'); }
  };

  const handleDeleteUser = async (id: number) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;
    try {
      await api.auth.deleteUser(id);
      fetchUsers();
    } catch (err) { alert('Failed to delete user'); }
  };

  const handleCreateReport = async () => {
    if (!newReport.title) return alert('Please enter a title.');
    if (!newReport.content) return alert('Please enter the full content.');

    try {
      if (editingReportId) {
        await api.health.update(editingReportId, newReport);
        alert('Report updated successfully');
      } else {
        await api.health.create(newReport);
        alert('Report published successfully');
      }
      setIsReportModalOpen(false);
      setNewReport({ title: '', content: '', summary: '', key_point: '', image_url: '' });
      setReportLang('ko');
      setEditingReportId(null);
      fetchReports();
    } catch (err: any) { alert(`Failed to ${editingReportId ? 'update' : 'publish'} report: ${err.error || err.message || 'Unknown error'}`); }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) return alert('File size too large. Max 5MB.');
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewReport({ ...newReport, image_url: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (isAdmin && isAdminDashboardOpen && adminTab === 'users') {
      fetchUsers();
    }
  }, [isAdmin, isAdminDashboardOpen, adminTab]);

  const handleAskQuestion = async () => {
    try {
      if (!newQuestion.title.trim() || !newQuestion.content.trim()) {
        alert("Please enter both title and content.");
        return;
      }

      // Verify user still exists (handle ephemeral DB restart)
      try {
        await api.auth.me();
      } catch (authErr) {
        alert("Session expired or server restarted. Please login again.");
        logout();
        return;
      }

      // DEBUG:
      // alert(`Submitting... Title: ${newQuestion.title}, Secret: ${newQuestion.is_secret}`);

      if (editingQuestionId) {
        await api.qna.update(editingQuestionId, newQuestion);
      } else {
        const res = await api.qna.create(newQuestion);
        // alert(`Success! Server returned ID: ${res.id}`);
      }

      alert("Question submitted successfully!");
      setIsQnaModalOpen(false);
      setNewQuestion({ title: '', content: '', is_secret: false });
      setEditingQuestionId(null);
      fetchQuestions();
    } catch (e: any) {
      console.error(e);
      alert(`Failed to submit question: ${e.error || e.message || 'Unknown error'}`);
    }
  };



  const handleTranslateNotice = async () => {
    const currentTitle = newNotice[noticeLang === 'ko' ? 'title' : `title_${noticeLang}`];
    const currentContent = newNotice[noticeLang === 'ko' ? 'content' : `content_${noticeLang}`];

    if (!currentTitle || !currentContent) return alert(`Please enter Title and Content in ${noticeLang} first.`);
    if (!confirm('Auto-translate to all other languages? This will overwrite existing translations.')) return;

    setIsTranslating(true);
    try {
      const targets = ['ko', 'en', 'zh', 'ja'].filter(t => t !== noticeLang);
      const fields = ['title', 'content'];

      // Parallel translation
      const promises = [];
      for (const target of targets) {
        // Title
        promises.push(api.translate(currentTitle, target).then(res => ({ field: 'title', target, text: res.translatedText })));
        // Content
        promises.push(api.translate(currentContent, target).then(res => ({ field: 'content', target, text: res.translatedText })));
      }

      const results = await Promise.all(promises);
      const updated = { ...newNotice };

      results.forEach(({ field, target, text }) => {
        const key = target === 'ko' ? field : `${field}_${target}`;
        updated[key] = text;
      });

      setNewNotice(updated);
      alert('✨ Notice Translated Successfully!');
    } catch (e) {
      console.error(e);
      alert('Translation failed.');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleDeleteNotice = async (id: number) => {
    if (!confirm('Delete this notice?')) return;
    try { await api.notices.delete(id); fetchNotices(); } catch (e) { alert('Failed'); }
  };

  const handleDeleteReport = async (id: number) => {
    if (!confirm('Delete this report?')) return;
    try { await api.health.delete(id); fetchReports(); } catch (e) { alert('Failed'); }
  };

  const handleDeleteQuestion = async (id: number) => {
    if (!confirm('Delete this question?')) return;
    try { await api.qna.delete(id); fetchQuestions(); } catch (e) { alert('Failed'); }
  };

  const loadAdminData = async () => {
    if (!isAdmin) return;
    fetchQuestions();
    api.health.list().then(setReports).catch(console.error);
  };

  const fetchQuestions = async () => {
    try {
      const q = await api.qna.list();
      setQuestions(q);
    } catch (e) { console.error(e); }
  }

  const handlePostReport = async () => {
    if (!newReport.title || !newReport.content) return alert('Title and content are required.');
    try {
      await api.health.create(newReport);
      setIsReportModalOpen(false);
      setNewReport({ title: '', key_point: '', image_url: '', content: '', summary: '' });
      loadAdminData();
    } catch (e: any) { alert(`Failed to post report: ${e.error || e.message}`); }
  }



  const handleAutoTranslate = async () => {
    if (!newReport.title || !newReport.content) return alert('Please enter at least Title and Content in Korean first.');
    if (!confirm('Auto-translate to English, Chinese, and Japanese? This will overwrite existing translations.')) return;

    setIsTranslating(true);
    try {
      const fields = ['title', 'content', 'summary', 'key_point'];
      const targets = ['en', 'zh', 'ja'];

      // Parallel translation
      const promises = [];
      for (const target of targets) {
        for (const field of fields) {
          const text = newReport[field] || '';
          if (text) {
            promises.push(
              api.translate(text, target).then(res => ({ field, target, text: res.translatedText }))
            );
          }
        }
      }

      const results = await Promise.all(promises);
      const updated = { ...newReport };

      results.forEach(({ field, target, text }) => {
        updated[`${field}_${target}`] = text;
      });

      setNewReport(updated);
      alert('✨ Transformation Complete! Please review the tabs.');
    } catch (e) {
      console.error(e);
      alert('Translation failed. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  };

  const handleAdminAnswer = async (qid: number) => {
    if (!adminAnswer[qid]) return;
    try {
      await api.qna.answer(qid, adminAnswer[qid]);
      setAdminAnswer({ ...adminAnswer, [qid]: '' });
      fetchQuestions();
    } catch (e) { alert('Failed to answer'); }
  }

  const handleEditClick = (q: any) => {
    setEditingQuestionId(q.id);
    setNewQuestion({
      title: q.title,
      content: q.content,
      is_secret: q.is_secret === 1 // Convert 1/0 to boolean if needed, or keep check matched with how it's stored
    });
    setIsQnaModalOpen(true);
  }



  const handleAboutTabClick = (tab: string) => {
    setAboutActiveTab(tab);
    if (window.innerWidth < 768) setIsAboutModalOpen(true);
  };

  const handleResearchTabClick = (tab: any) => {
    setActiveTab(tab);
    if (window.innerWidth < 768) setIsResearchModalOpen(true);
  };

  const handleBenefitClick = (index: number) => {
    setBenefitActiveTab(index);
    if (window.innerWidth < 768) setIsBenefitModalOpen(true);
  };

  const handleReadReport = async (report: any) => {
    if (isAuthenticated) {
      setSelectedReport(report);
      return;
    }

    if (viewedReportCount < 3) {
      const newCount = viewedReportCount + 1;
      setViewedReportCount(newCount);
      localStorage.setItem('health_views', newCount.toString());
      setSelectedReport(report);
      // Optional: Toast notification instead of alert for better UX, omitting alert for seamless reading
    } else {
      setAuthMessage("You have viewed 3 free articles. Please login to continue reading.");
      setIsAuthModalOpen(true);
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`min-h-screen bg-stone-950 font-sans selection:bg-amber-500/30 ${isScrolled ? 'scrolled' : ''}`}>

      {/* Top Notification Banner */}
      {activeBanner && (
        <div className="bg-amber-600 text-white text-xs md:text-sm font-bold uppercase tracking-widest relative z-[100] animate-in slide-in-from-top duration-500">
          <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="bg-white text-amber-600 px-2 py-0.5 rounded text-[10px]">NOTICE</span>
              <span className="truncate max-w-[70vw]">{activeBanner[`title_${lang}`] || activeBanner.title}</span>
            </div>
            <button onClick={() => setActiveBanner(null)} className="opacity-70 hover:opacity-100"><X size={16} /></button>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {
        isAuthModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 md:p-10 animate-in fade-in duration-500 overflow-y-auto">
            <div className="bg-stone-900 rounded-[3rem] p-10 w-full max-w-2xl shadow-2xl border border-white/5 my-auto text-center relative">
              <button
                onClick={() => { setIsAuthModalOpen(false); setAuthMessage(null); }}
                className="absolute top-6 right-6 text-stone-500 hover:text-white"
              >
                <X size={24} />
              </button>

              {authMessage && (
                <div className="mb-8 p-4 bg-amber-900/20 border border-amber-500/30 rounded-2xl animate-in slide-in-from-top-2">
                  <p className="text-amber-500 font-bold flex items-center justify-center gap-2">
                    <Lock size={16} /> {authMessage}
                  </p>
                </div>
              )}

              <div className="flex justify-center gap-8 mb-8 border-b border-white/5 pb-4">
                <button onClick={() => setAuthMode('login')} className={`text-2xl font-bold font-serif transition-all ${authMode === 'login' ? 'text-amber-500 scale-105' : 'text-stone-600'}`}>Login</button>
                <button onClick={() => setAuthMode('signup')} className={`text-2xl font-bold font-serif transition-all ${authMode === 'signup' ? 'text-amber-500 scale-105' : 'text-stone-600'}`}>Sign Up</button>
              </div>
              {/* ... (rest of form) */}
              {authMode === 'login' ? (
                <form onSubmit={handleLogin} className="space-y-6">
                  <input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} className="w-full p-6 bg-stone-800 border border-white/5 rounded-2xl outline-none text-white text-lg" placeholder="Email Address" required />
                  <input type="password" value={loginPw} onChange={e => setLoginPw(e.target.value)} className="w-full p-6 bg-stone-800 border border-white/5 rounded-2xl outline-none text-white text-lg" placeholder="Password" required />
                  <div className="flex gap-4 pt-4">
                    <button type="button" onClick={() => setIsAuthModalOpen(false)} className="flex-1 py-5 text-stone-500 font-bold uppercase tracking-widest">Cancel</button>
                    <button type="submit" className="flex-1 py-5 bg-amber-600 text-white font-black rounded-3xl uppercase tracking-widest shadow-xl">Login</button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                  <input type="text" value={regName} onChange={e => setRegName(e.target.value)} className="w-full p-6 bg-stone-800 border border-white/5 rounded-2xl text-lg text-white" placeholder="Full Name" required />
                  <input type="email" value={regEmail} onChange={e => setRegEmail(e.target.value)} className="w-full p-6 bg-stone-800 border border-white/5 rounded-2xl text-lg text-white" placeholder="Email Address" required />
                  <input type="password" value={regPw} onChange={e => setRegPw(e.target.value)} className="w-full p-6 bg-stone-800 border border-white/5 rounded-2xl text-lg text-white" placeholder="Password" required />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" value={regCountry} onChange={e => setRegCountry(e.target.value)} className="w-full p-6 bg-stone-800 border border-white/5 rounded-2xl text-lg text-white" placeholder="Country" />
                    <input type="text" value={regPhone} onChange={e => setRegPhone(e.target.value)} className="w-full p-6 bg-stone-800 border border-white/5 rounded-2xl text-lg text-white" placeholder="Phone" />
                  </div>
                  <button type="submit" className="w-full py-5 bg-amber-600 text-white font-black rounded-3xl mt-4 uppercase tracking-widest hover:bg-amber-500">Create Account</button>
                </form>
              )}
            </div>
          </div>
        )
      }

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-700 ${isScrolled || isMenuOpen ? 'bg-stone-950/80 backdrop-blur-2xl py-4 border-b border-white/5' : 'bg-transparent py-8'}`}>
        <div className="max-w-[1700px] mx-auto px-6 lg:px-12">
          <div className="nav-container justify-between flex items-center">
            <div className="flex items-center gap-4 cursor-pointer z-50 group shrink-0" onClick={() => { setCurrentView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <VitalCoreLogo className="w-14 h-14 md:w-20 md:h-20 drop-shadow-[0_0_20px_rgba(217,119,6,0.5)]" />
              <div className="flex flex-col justify-center">
                <span className="text-[10px] text-stone-500 font-mono mb-0.5 tracking-wider group-hover:text-amber-500 transition-colors">www.linteus.com</span>
                <span className="font-serif font-bold text-2xl md:text-3xl tracking-tight text-white uppercase leading-none">VITAL <span className="text-amber-500">CORE</span></span>
                <span className="text-[10px] text-stone-500 tracking-[0.4em] font-black uppercase hidden md:block mt-1">Phellinus Lab</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              <div className="flex bg-stone-900/50 rounded-full p-2 border border-white/5 backdrop-blur-md">
                {Object.entries(t.nav).map(([key, label]) => {
                  if (key === 'health' || key === 'faq') {
                    return (
                      <button key={key} onClick={() => { setCurrentView(key as any); window.scrollTo(0, 0); }} className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${currentView === key ? 'bg-amber-600 text-white shadow-lg scale-105' : 'text-stone-400 hover:text-white hover:bg-white/5'}`}>
                        {label as string}
                      </button>
                    )
                  }
                  return (
                    <button key={key} onClick={() => { setCurrentView('home'); setTimeout(() => scrollToSection(key), 100); }} className="px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-white hover:bg-white/5 transition-all">
                      {label as string}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-8 pl-8 border-l border-white/10">
              <div className="relative">
                <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center gap-2 p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all text-stone-400 hover:text-white">
                  <Globe size={22} /><span className="text-xs font-black uppercase">{lang}</span><ChevronDown size={14} className={`${isLangOpen ? 'rotate-180' : ''}`} />
                </button>
                {isLangOpen && (
                  <div className="absolute top-full right-0 mt-4 w-40 bg-stone-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl py-2">
                    {(['ko', 'en', 'zh', 'ja'] as const).map(l => (
                      <button key={l} onClick={() => { setLang(l); setIsLangOpen(false); }} className={`w-full px-6 py-3 text-left text-sm font-bold transition-all ${lang === l ? 'text-amber-500' : 'text-stone-400 hover:bg-amber-600 hover:text-white'}`}>{l === 'ko' ? '한국어' : l === 'en' ? 'English' : l === 'zh' ? '中文' : '日本語'}</button>
                    ))}
                  </div>
                )}
              </div>
              {isAdmin && (
                <button onClick={() => setIsAdminDashboardOpen(true)} className="px-6 py-3 bg-red-900/50 text-red-200 border border-red-500/30 rounded-full text-xs font-black uppercase tracking-widest hover:bg-red-900 hover:text-white transition-all">Admin</button>
              )}
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <span className="text-stone-400 text-xs font-bold uppercase tracking-wider">{user?.name}</span>
                  <button onClick={logout} className="px-8 py-3 bg-stone-800 text-stone-300 font-black rounded-full text-xs uppercase tracking-widest hover:bg-stone-700 transition-all">Logout</button>
                </div>
              ) : (
                <button onClick={() => setIsAuthModalOpen(true)} className="px-10 py-3 bg-amber-600 text-white font-black rounded-full text-[1.05rem] uppercase tracking-widest hover:bg-amber-500 transition-all">{t.common.login.split('/')[0]}</button>
              )}
            </div>
            <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X size={40} /> : <Menu size={40} />}</button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {
        isMenuOpen && (
          <div className="fixed inset-0 z-[45] bg-stone-950/95 backdrop-blur-xl pt-32 px-8 animate-in slide-in-from-right-10 duration-300 lg:hidden">
            <div className="flex flex-col space-y-8">
              <div className="flex flex-col space-y-6">
                {Object.entries(t.nav).map(([key, label]) => {
                  if (key === 'health' || key === 'faq') {
                    return (
                      <button
                        key={key}
                        onClick={() => { setCurrentView(key as any); setIsMenuOpen(false); window.scrollTo(0, 0); }}
                        className={`text-3xl font-serif font-bold text-left transition-colors ${currentView === key ? 'text-amber-500' : 'text-white hover:text-amber-500'}`}
                      >
                        {label as string}
                      </button>
                    );
                  }
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setCurrentView('home');
                        setIsMenuOpen(false);
                        window.scrollTo(0, 0);
                        setTimeout(() => scrollToSection(key), 100);
                      }}
                      className="text-3xl font-serif font-bold text-white hover:text-amber-500 text-left transition-colors"
                    >
                      {label as string}
                    </button>
                  );
                })}
              </div>

              <div className="h-px bg-white/10"></div>

              <div className="space-y-4">
                <p className="text-xs text-stone-500 font-bold uppercase tracking-widest">Language</p>
                <div className="flex flex-wrap gap-3">
                  {(['ko', 'en', 'zh', 'ja'] as const).map(l => (
                    <button
                      key={l}
                      onClick={() => { setLang(l); setIsMenuOpen(false); }}
                      className={`px-4 py-2 rounded-full text-sm font-bold border transition-all ${lang === l ? 'bg-amber-600 border-amber-600 text-white' : 'border-white/10 text-stone-400'}`}
                    >
                      {l === 'ko' ? '한국어' : l === 'en' ? 'English' : l === 'zh' ? '中文' : '日本語'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-px bg-white/10"></div>

              <div className="pt-2">
                {isAuthenticated ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center text-amber-500 font-bold">{user?.name[0]}</span>
                      <span className="text-white font-bold">{user?.name}</span>
                    </div>
                    <button onClick={() => { logout(); setIsMenuOpen(false); }} className="w-full py-4 bg-stone-900 border border-white/10 text-stone-400 font-bold rounded-2xl uppercase tracking-widest">Logout</button>
                  </div>
                ) : (
                  <button
                    onClick={() => { setIsAuthModalOpen(true); setIsMenuOpen(false); }}
                    className="w-full py-4 bg-amber-600 text-white font-black rounded-2xl uppercase tracking-widest shadow-lg"
                  >
                    {t.common.login}
                  </button>
                )}
              </div>
            </div>
          </div>
        )
      }



      {currentView === 'home' && (
        <>
          {/* Hero Section */}
          <section className="relative h-[100vh] min-h-[800px] flex items-center justify-center bg-fixed bg-center bg-cover overflow-hidden" style={{ backgroundImage: `url(${IMAGES.hero_forest})` }}>
            <div className="absolute inset-0 bg-stone-950/30 backdrop-blur-[2px]"></div>

            <div className="relative z-10 w-full max-w-[1800px] px-8 lg:px-12 flex flex-col items-center justify-center h-full pt-28 text-center">
              <div className="animate-fade-in-up max-w-6xl">
                <div className="inline-block px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-900/10 backdrop-blur-md mb-6">
                  <span className="text-amber-500 text-xs font-black uppercase tracking-[0.3em]">{t.hero.badge}</span>
                </div>
                {/* Refined Title Sizes for Harmony across Languages */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium text-white mb-8 leading-[1.1] tracking-tight drop-shadow-2xl">
                  {t.hero.title_top} <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-amber-700 font-serif italic pr-2">{t.hero.title_highlight}</span>
                </h1>
                {/* Refined Description Size & Max Width */}
                <p className="text-base md:text-lg lg:text-xl text-stone-300 mb-12 font-light leading-8 md:leading-relaxed max-w-2xl mx-auto tracking-wide">{t.hero.desc}</p>
                <button onClick={() => scrollToSection('research')} className="px-12 py-5 bg-amber-700 hover:bg-amber-600 text-white text-sm font-bold rounded-full shadow-[0_0_30px_rgba(180,83,9,0.4)] transition-all uppercase tracking-[0.2em] border border-white/10">{t.hero.btn_research}</button>
              </div>
            </div>
          </section>

          {/* About Section - Expanded with Recommended Phellinus Tab */}
          <section id="about" className="py-24 md:py-32 relative overflow-hidden bg-fixed bg-center bg-cover" style={{ backgroundImage: `url(${IMAGES.about_bg})` }}>
            <div className="absolute inset-0 bg-stone-950/35 backdrop-blur-sm"></div>
            <div className="max-w-[1500px] mx-auto px-8 relative z-10 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-amber-500 mb-8 uppercase tracking-tight">{t.about.title}</h2>
              <div className="flex flex-wrap justify-center gap-3 mb-12 px-4">
                {Object.entries(t.about.tabs).map(([key, label]) => (
                  <button key={key} onClick={() => handleAboutTabClick(key)} className={`px-6 py-3 rounded-full border text-xs font-bold uppercase tracking-widest transition-all ${aboutActiveTab === key ? 'bg-amber-700 border-amber-600 text-white shadow-xl scale-105' : 'bg-stone-900/50 border-white/5 text-stone-500 hover:text-stone-300 hover:border-white/10'}`}>
                    {label as string}
                  </button>
                ))}
              </div>

              <div className="bg-stone-900/60 backdrop-blur-3xl border border-white/10 p-10 md:p-16 rounded-[4rem] text-left min-h-[500px] shadow-2xl transition-all duration-500">
                {aboutActiveTab === 'recommended' ? (
                  <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-12 border-b border-white/10 pb-6">
                      <ShoppingBag className="text-amber-500" size={32} />
                      <h3 className="text-2xl md:text-3xl font-serif font-bold text-white">
                        Good Products
                        {t.about.linteus_note && <span className="ml-4 text-sm font-medium text-amber-500 tracking-wide font-sans">{t.about.linteus_note}</span>}
                      </h3>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {t.about.products?.map((p: any, i: number) => (
                        <div key={i} className="group bg-stone-950 rounded-[2rem] overflow-hidden border border-white/5 hover:border-amber-500/50 transition-all duration-500 shadow-2xl relative cursor-zoom-in" onClick={() => setSelectedProduct(p)}>
                          <div className="relative h-96 w-full overflow-hidden">
                            <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="p-4 bg-black/50 backdrop-blur-md rounded-full text-white/80"><Eye size={32} /></span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : aboutActiveTab === 'evidence' ? (
                  <div className="max-w-6xl mx-auto animate-in fade-in duration-700">
                    <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
                      <BookOpen className="text-amber-500" size={32} />
                      <h3 className="text-2xl md:text-3xl font-serif font-bold text-white">Global Medical Evidence</h3>
                      <span className="ml-auto text-xs text-stone-500 font-mono tracking-widest uppercase hidden md:block">Source: NIH PubMed Database</span>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                      {t.about.evidence?.map((paper: any, i: number) => (
                        <div key={i} className="flex flex-col bg-stone-950/40 p-6 rounded-[2rem] border border-white/5 hover:border-amber-500/40 transition-all hover:bg-stone-900/60 group">
                          <div className="mb-4">
                            <span className="text-[10px] font-black text-amber-600 uppercase tracking-wider bg-amber-900/10 px-2 py-1 rounded inline-block mb-2">{paper.journal}</span>
                            <h4 className="text-lg font-serif font-bold text-stone-200 leading-tight group-hover:text-amber-500 transition-colors">{paper.title}</h4>
                          </div>
                          <p className="text-sm text-stone-400 font-light leading-relaxed mb-6 flex-grow">{paper.summary}</p>
                          <div className="flex justify-between items-center pt-4 border-t border-white/5">
                            <span className="text-[10px] text-stone-600 font-mono">PMID: {paper.pmid}</span>
                            <a href={paper.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs font-bold text-stone-400 hover:text-white uppercase tracking-widest transition-colors">
                              View <ExternalLink size={12} />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="max-w-5xl mx-auto animate-in fade-in duration-700">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-1 bg-amber-600 rounded-full"></div>
                      <h3 className="text-2xl md:text-3xl font-serif font-bold text-white">
                        {aboutActiveTab === 'intro' ? t.about.cards[0]?.title :
                          aboutActiveTab === 'compounds' ? t.about.cards[1]?.title :
                            aboutActiveTab === 'mechanism' ? t.about.cards[2]?.title : t.about.cards[3]?.title}
                      </h3>
                    </div>

                    {/* Mobile Modal for About */}
                    <MobileModal isOpen={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)} title={t.about.tabs[aboutActiveTab]}>
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold text-amber-500 mb-2">
                          {aboutActiveTab === 'intro' ? t.about.cards[0]?.title :
                            aboutActiveTab === 'compounds' ? t.about.cards[1]?.title :
                              aboutActiveTab === 'mechanism' ? t.about.cards[2]?.title : t.about.cards[3]?.title}
                        </h3>
                        {aboutActiveTab === 'intro' && t.about.introDetails ? (
                          <div className="space-y-6">
                            <p className="text-stone-300 leading-relaxed font-light">{t.about.cards[0]?.desc}</p>
                            {t.about.introDetails.map((item: any, i: number) => (
                              <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/10">
                                <h4 className="text-amber-500 font-bold mb-2">{item.title}</h4>
                                <p className="text-stone-300 text-sm leading-relaxed whitespace-pre-line">{item.content}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-stone-300 text-lg leading-relaxed font-light whitespace-pre-wrap">
                            {aboutActiveTab === 'intro' ? t.about.cards[0]?.desc :
                              aboutActiveTab === 'compounds' ? t.about.cards[1]?.desc :
                                aboutActiveTab === 'mechanism' ? t.about.cards[2]?.desc : t.about.cards[3]?.desc}
                          </p>
                        )}
                        <div className="pt-6 border-t border-white/10">
                          <button onClick={() => setIsAboutModalOpen(false)} className="w-full py-4 bg-stone-800 text-white font-bold rounded-xl uppercase tracking-widest hover:bg-stone-700">Close</button>
                        </div>
                      </div>
                    </MobileModal>

                    {aboutActiveTab === 'intro' && t.about.introDetails ? (
                      <div className="grid lg:grid-cols-2 gap-12 items-start">
                        <div>
                          <p className="text-lg md:text-xl lg:text-2xl font-light leading-[1.8] text-stone-50 opacity-95 whitespace-pre-wrap first-letter:text-5xl first-letter:font-serif first-letter:float-left first-letter:mr-3 first-letter:text-amber-500">
                            {t.about.cards[0]?.desc}
                          </p>
                        </div>
                        <div className="space-y-4">
                          {t.about.introDetails.map((item: any, i: number) => (
                            <div key={i} className="bg-stone-950/50 p-6 rounded-2xl border border-white/10 hover:border-amber-500/30 transition-colors">
                              <h4 className="text-amber-500 font-bold mb-3 text-lg font-serif">{item.title}</h4>
                              <p className="text-stone-300 text-sm leading-relaxed whitespace-pre-line">{item.content}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="text-lg md:text-xl lg:text-2xl font-light leading-[1.8] text-stone-50 opacity-95 whitespace-pre-wrap first-letter:text-5xl first-letter:font-serif first-letter:float-left first-letter:mr-3 first-letter:text-amber-500">
                        {aboutActiveTab === 'intro' ? t.about.cards[0]?.desc :
                          aboutActiveTab === 'compounds' ? t.about.cards[1]?.desc :
                            aboutActiveTab === 'mechanism' ? t.about.cards[2]?.desc : t.about.cards[3]?.desc}
                      </p>
                    )}
                    <div className="mt-12 flex gap-4">
                      <span className="p-3 bg-amber-600/10 rounded-full text-amber-500"><Info size={24} /></span>
                      <span className="p-3 bg-amber-600/10 rounded-full text-amber-500"><FlaskConical size={24} /></span>
                      <span className="p-3 bg-amber-600/10 rounded-full text-amber-500"><Shield size={24} /></span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Research Section */}
          <section id="research" className="py-24 relative bg-fixed bg-center bg-cover" style={{ backgroundImage: `url(${IMAGES.research_bg})` }}>
            <div className="absolute inset-0 bg-stone-950/40 backdrop-blur-md"></div>
            <div className="max-w-7xl mx-auto px-8 relative z-10 text-white text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium mb-12 uppercase tracking-tight">{t.research.title}</h2>

              <div className="grid lg:grid-cols-3 gap-16 items-start text-left">
                {/* Chart Area */}
                <div className="lg:col-span-2 space-y-8">
                  {/* New Research Tabs Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {Object.entries(t.research.tabs).map(([key, label]) => (
                      <button key={key} onClick={() => handleResearchTabClick(key as any)} className={`px-4 py-3 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all ${activeTab === key ? 'bg-amber-600 border-amber-500 text-white shadow-lg scale-105' : 'bg-stone-900/60 border-white/10 text-stone-400 hover:bg-stone-800 hover:text-white'}`}>
                        {label as string}
                      </button>
                    ))}
                  </div>

                  <MobileModal isOpen={isResearchModalOpen} onClose={() => setIsResearchModalOpen(false)} title={t.research.tabs[activeTab]}>
                    <div className="space-y-6">
                      <div className="bg-amber-600/10 p-6 rounded-2xl border border-amber-500/30">
                        <div className="flex items-center gap-3 text-amber-500 mb-4">
                          <GraduationCap size={32} />
                          <span className="font-bold text-xs uppercase tracking-widest">Evidence Hub</span>
                        </div>
                        <h3 className="text-lg font-serif font-bold leading-tight text-white mb-3">{t.research.papers[activeTab]?.title}</h3>
                        <p className="text-stone-300 text-sm leading-relaxed font-light mb-4">{t.research.papers[activeTab]?.summary}</p>
                        <div className="pt-4 border-t border-white/10 flex flex-col gap-2 mb-4">
                          <span className="text-[10px] text-amber-500 font-bold uppercase tracking-wider">{t.research.papers[activeTab]?.journal}</span>
                          <span className="text-[10px] text-stone-500 font-mono">Impact: {t.research.papers[activeTab]?.impact}</span>
                        </div>
                        <a href={t.research.papers[activeTab]?.url} target="_blank" rel="noopener noreferrer" className="w-full py-4 bg-amber-600 hover:bg-amber-500 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 text-white">
                          {t.common.view_paper} <ExternalLink size={14} />
                        </a>
                      </div>
                      {/* Simplified Chart Message */}
                      <p className="text-xs text-stone-500 text-center">Detailed charts are available on the desktop version.</p>
                      <div className="pt-4 border-t border-white/10">
                        <button onClick={() => setIsResearchModalOpen(false)} className="w-full py-4 bg-stone-800 text-white font-bold rounded-xl uppercase tracking-widest hover:bg-stone-700">Close</button>
                      </div>
                    </div>
                  </MobileModal>

                  <div className="bg-stone-900/40 backdrop-blur-3xl p-10 rounded-[2.5rem] border border-white/10 shadow-2xl h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={researchData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
                        <XAxis dataKey="category" stroke="#bbb" tick={{ fontSize: 11, fontWeight: 'bold' }} />
                        <YAxis stroke="#bbb" tick={{ fontSize: 11 }} />
                        <Tooltip contentStyle={{ background: '#111', border: '1px solid #333', borderRadius: '14px', color: '#fff' }} />
                        <Bar dataKey="control" name="Control" fill="#333" radius={[6, 6, 0, 0]} barSize={45} />
                        <Bar dataKey="phellinus" name="Vital Core" fill="#d97706" radius={[6, 6, 0, 0]} barSize={45} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Evidence Hub Card */}
                <div className="bg-amber-600/10 backdrop-blur-3xl p-10 rounded-[3.5rem] border border-amber-500/30 text-white shadow-2xl space-y-6 sticky top-32">
                  <div className="flex items-center gap-4 text-amber-500">
                    <GraduationCap size={48} /><span className="font-black text-[10px] uppercase tracking-widest">Evidence Hub</span>
                  </div>
                  <h3 className="text-xl font-serif font-bold leading-tight">{t.research.papers[activeTab]?.title}</h3>
                  <p className="text-stone-100 text-sm leading-relaxed font-light opacity-95">{t.research.papers[activeTab]?.summary}</p>
                  <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
                    <span className="text-[10px] text-amber-500 font-bold uppercase tracking-wider">{t.research.papers[activeTab]?.journal}</span>
                    <span className="text-[10px] text-stone-500 font-mono">Impact: {t.research.papers[activeTab]?.impact}</span>
                  </div>
                  <a href={t.research.papers[activeTab]?.url} target="_blank" rel="noopener noreferrer" className="w-full py-5 bg-amber-600 hover:bg-amber-500 rounded-3xl font-black text-xs uppercase tracking-widest flex flex-col items-center justify-center gap-1 transition-all shadow-xl text-center mt-4 group">
                    <span className="flex items-center gap-2">
                      {t.common.view_paper} <ExternalLink size={14} />
                    </span>
                    <span className="font-serif text-[10px] capitalize opacity-70 group-hover:opacity-100 font-medium tracking-wide border-t border-white/20 pt-1 mt-1 w-2/3 mx-auto">
                      {t.research.papers[activeTab]?.journal}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section id="benefits" className="py-24 relative bg-scroll md:bg-fixed bg-center bg-cover bg-stone-950" style={{ backgroundImage: `url(${IMAGES.benefits_bg})` }}>
            <div className="absolute inset-0 bg-stone-950/30 backdrop-blur-lg"></div>
            <div className="max-w-[1600px] mx-auto px-8 relative z-10 text-white">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium tracking-tight mb-6 uppercase text-white">{t.benefits.title}</h2>
                <p className="text-white text-sm md:text-base font-bold tracking-[0.2em] uppercase">{t.benefits.desc}</p>
              </div>
              <div className="flex flex-wrap justify-center gap-5 mb-16 relative z-20">
                {t.benefits.items.map((item: string, i: number) => {
                  const Icon = benefitIcons[i] || Activity;
                  return (
                    <button key={i} onClick={() => handleBenefitClick(i)} className={`flex items-center gap-5 px-8 py-5 rounded-[1.5rem] border transition-all duration-500 ${benefitActiveTab === i ? 'bg-amber-600 border-amber-600 text-white shadow-2xl scale-105' : 'bg-stone-800 border-white/20 text-stone-200 hover:bg-stone-700 hover:border-amber-500/50'}`}>
                      <Icon size={28} className={benefitActiveTab === i ? 'text-white' : 'text-stone-400'} />
                      <span className="font-black text-sm xl:text-base tracking-tight uppercase whitespace-nowrap">{item}</span>
                    </button>
                  );
                })}
              </div>

              <MobileModal isOpen={isBenefitModalOpen} onClose={() => setIsBenefitModalOpen(false)} title={t.benefits.items[benefitActiveTab]}>
                {t.benefits.details && t.benefits.details[benefitActiveTab] && (
                  <div className="space-y-8">
                    {/* In-Modal Navigation */}
                    <div className="flex justify-between items-center gap-2 mb-6 p-2 bg-stone-950/80 border border-white/10 rounded-2xl overflow-x-auto no-scrollbar shadow-inner">
                      {t.benefits.items.map((item: string, i: number) => {
                        const Icon = benefitIcons[i] || Activity;
                        return (
                          <button key={i} onClick={() => setBenefitActiveTab(i)} className={`flex-1 min-w-[3.5rem] py-4 rounded-xl flex justify-center items-center transition-all ${benefitActiveTab === i ? 'bg-amber-600 text-white shadow-lg ring-1 ring-amber-400/50' : 'text-stone-400 hover:text-stone-200 hover:bg-white/5'}`}>
                            <Icon size={24} />
                          </button>
                        );
                      })}
                    </div>

                    <div>
                      <span className="text-amber-500 font-black text-xs uppercase tracking-[0.2em] block mb-2">{t.benefits.details[benefitActiveTab].scientificTerm}</span>
                      <h3 className="text-2xl font-serif font-bold text-white leading-tight mb-4">{t.benefits.details[benefitActiveTab].title}</h3>
                      <p className="text-amber-200 text-lg font-serif italic border-l-4 border-amber-600 pl-4 py-1">{t.benefits.details[benefitActiveTab].summary}</p>
                    </div>
                    <div className="h-px bg-white/10 w-full"></div>
                    <p className="text-stone-100 text-base leading-[1.8] opacity-95 whitespace-pre-wrap">{t.benefits.details[benefitActiveTab].content}</p>

                    <div className="p-6 bg-amber-900/20 rounded-2xl border border-amber-500/30">
                      <h4 className="text-amber-500 font-black text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2"><BookOpen size={16} /> Key Evidence</h4>
                      <p className="text-stone-100 text-sm font-medium leading-relaxed mb-6">"{t.benefits.details[benefitActiveTab].evidence}"</p>
                      <a href={t.benefits.details[benefitActiveTab].link} target="_blank" rel="noopener noreferrer" className="block w-full text-center py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-xs uppercase tracking-widest">
                        View Study <ExternalLink size={12} className="inline ml-1" />
                      </a>
                    </div>
                    <div className="pt-6 border-t border-white/10">
                      <button onClick={() => setIsBenefitModalOpen(false)} className="w-full py-4 bg-stone-800 text-white font-bold rounded-xl uppercase tracking-widest hover:bg-stone-700">Close</button>
                    </div>
                  </div>
                )}
              </MobileModal>
              <div className="bg-stone-900/60 backdrop-blur-3xl p-8 md:p-12 lg:p-16 rounded-[4rem] border border-white/5 shadow-2xl min-h-[400px] flex items-center mb-16 text-left relative overflow-hidden">
                {t.benefits.details && t.benefits.details[benefitActiveTab] && (
                  <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 w-full relative z-10">
                    <div className="lg:col-span-3 space-y-8">
                      <div className="space-y-4">
                        <span className="text-amber-500 font-black text-[10px] md:text-xs uppercase tracking-[0.4em] block">{t.benefits.details[benefitActiveTab].scientificTerm}</span>
                        <h3 className="text-2xl md:text-4xl font-serif font-bold text-white leading-tight">{t.benefits.details[benefitActiveTab].title}</h3>
                        <p className="text-amber-200 text-lg md:text-xl font-serif italic border-l-4 border-amber-600 pl-4 py-1">{t.benefits.details[benefitActiveTab].summary}</p>
                      </div>
                      <div className="h-px bg-white/10 w-full"></div>
                      <p className="text-stone-300 text-base md:text-lg leading-[1.8] font-light opacity-95 whitespace-pre-wrap">{t.benefits.details[benefitActiveTab].content}</p>
                    </div>
                    <div className="lg:col-span-2 space-y-8 flex flex-col justify-center">
                      <div className="p-8 bg-amber-900/20 rounded-[2.5rem] border border-amber-500/30 shadow-inner relative group">
                        <div className="absolute top-0 right-0 p-6 opacity-20"><FlaskConical size={64} className="text-amber-600" /></div>
                        <h4 className="text-amber-500 font-black text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2"><BookOpen size={16} /> Key Evidence (NCBI/PMC)</h4>
                        <p className="text-stone-100 text-sm md:text-base font-medium leading-relaxed mb-8 relative z-10">
                          "{t.benefits.details[benefitActiveTab].evidence}"
                        </p>
                        <a
                          href={t.benefits.details[benefitActiveTab].link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-2xl text-xs uppercase tracking-widest transition-all shadow-lg group-hover:scale-105"
                        >
                          View Original Study <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-1000">
                <div className="relative p-10 md:p-14 bg-gradient-to-br from-amber-600/20 via-stone-900/80 to-stone-950/90 backdrop-blur-2xl rounded-[4rem] border border-amber-500/30 shadow-[0_0_50px_rgba(217,119,6,0.15)] overflow-hidden text-left">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50"></div>
                  <Quote size={64} className="text-amber-500/20 absolute -top-4 -left-4 rotate-180" />
                  <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                    <div className="shrink-0 p-6 bg-amber-600/10 rounded-full border border-amber-500/20 shadow-inner"><FlaskConical size={64} className="text-amber-500" /></div>
                    <div className="space-y-6">
                      <h4 className="text-2xl md:text-3xl font-serif font-bold text-white italic">Scientific Summary</h4>
                      <p className="text-lg md:text-xl text-stone-100 font-light leading-relaxed italic">"{t.benefits.conclusion}"</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Usage Section */}
          <section id="usage" className="py-24 relative bg-fixed bg-center bg-cover" style={{ backgroundImage: `url(${IMAGES.usage_bg})` }}>
            <div className="absolute inset-0 bg-stone-950/40 backdrop-blur-xl"></div>
            <div className="max-w-7xl mx-auto px-8 relative z-10 text-white text-left">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-center mb-20 uppercase tracking-tight">{t.usage.title}</h2>
              <div className="space-y-16">
                {/* Boiling Method Steps */}
                <div className="bg-stone-900/65 backdrop-blur-3xl p-8 md:p-14 rounded-[3.5rem] border border-white/10 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5"><Coffee size={120} /></div>
                  <div className="flex items-center gap-5 mb-12 relative z-10">
                    <span className="p-4 bg-amber-600/20 rounded-full text-amber-500 border border-amber-600/30"><Flame size={32} /></span>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-serif font-bold text-white uppercase tracking-tight">{t.usage.sub1}</h3>
                      <p className="text-stone-400 text-sm font-medium mt-1 opacity-80">Follow these steps to extract the maximum potency.</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 relative z-10">
                    {t.usage.steps?.map((step: any, i: number) => (
                      <div key={i} className="group flex flex-col gap-6">
                        <div className="relative aspect-[4/5] md:aspect-square rounded-[2rem] overflow-hidden border border-white/10 shadow-lg cursor-pointer">
                          <img src={step.image} alt={`Step ${step.step}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-[0.85] group-hover:brightness-100" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                          <div className="absolute top-4 left-4 w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-md text-white font-black rounded-full text-sm border border-white/20 shadow-xl group-hover:bg-amber-600 group-hover:border-amber-500 transition-colors">
                            {step.step}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-lg mb-2 leading-tight group-hover:text-amber-500 transition-colors">Step {step.step}</h4>
                          <p className="text-stone-400 text-sm leading-relaxed border-l-2 border-stone-800 pl-4 group-hover:border-amber-600/50 transition-colors">{step.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Intake Recommendations & Safety Studies */}
                <div className="space-y-12">
                  <div className="flex items-center gap-5 justify-center md:justify-start">
                    <div className="w-16 h-16 bg-amber-600/20 rounded-2xl flex items-center justify-center border border-amber-600/30">
                      <ShieldCheck size={32} className="text-amber-500" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-white uppercase tracking-tight">{t.usage.sub2}</h3>
                  </div>

                  <div className="grid lg:grid-cols-3 gap-6">
                    {t.usage.safetyStudies?.map((study: any, i: number) => (
                      <div key={i} className="bg-stone-900/40 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/5 hover:border-amber-500/30 transition-colors group flex flex-col">
                        <div className="mb-6">
                          <span className="inline-block px-3 py-1 bg-amber-900/30 text-amber-500 text-[10px] font-bold uppercase tracking-widest rounded-full mb-3 border border-amber-500/20">
                            Scientific Evidence {i + 1}
                          </span>
                          <h4 className="text-white font-bold text-lg leading-tight mb-2 group-hover:text-amber-400 transition-colors">{study.title}</h4>
                          <p className="text-stone-500 text-xs font-medium uppercase tracking-wider">{study.subtitle}</p>
                        </div>

                        <div className="flex-grow space-y-4">
                          <div className="flex items-center gap-2 text-stone-400 text-xs border-b border-white/5 pb-4">
                            <BookOpen size={14} className="text-amber-600" />
                            <span className="truncate">{study.journal}</span>
                          </div>
                          <p className="text-stone-300 text-sm leading-relaxed">
                            {study.result}
                          </p>
                        </div>

                        <a href={study.link} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-amber-500 text-xs font-bold uppercase tracking-widest hover:text-amber-400 transition-colors">
                          View Paper <ExternalLink size={12} />
                        </a>
                      </div>
                    ))}
                  </div>

                  <div className="bg-amber-900/10 border border-amber-500/10 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-10">
                    <div className="shrink-0 p-4 bg-amber-500/10 rounded-full">
                      <CheckCircle2 size={32} className="text-amber-500" />
                    </div>
                    <div className="text-center md:text-left">
                      <h5 className="text-white font-bold text-lg mb-2">Safe for Daily Use</h5>
                      <p className="text-stone-400 text-sm md:text-base font-light">
                        {lang === 'ko' ? "독성이 없으므로 식수처럼 꾸준히 자주 드셔도 안전합니다." : "Non-toxic and safe for frequent daily consumption like water."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Health Report Section */}
          <section id="health" className="py-24 relative bg-stone-900 text-center">
            <div className="max-w-6xl mx-auto px-8">
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-white mb-12 uppercase tracking-tight">{t.nav.health}</h2>

              <div className="grid md:grid-cols-2 gap-8 text-left">
                {(!Array.isArray(healthReports) || healthReports.length === 0) && <p className="text-stone-500 col-span-2 text-center">No reports available yet.</p>}
                {Array.isArray(healthReports) && healthReports.map((report) => (
                  <div key={report.id} className="bg-gradient-to-br from-stone-900 to-stone-950 p-8 rounded-[2rem] border border-amber-500/10 hover:border-amber-500/30 shadow-2xl relative overflow-hidden group transition-all">
                    <span className="text-amber-500 text-[10px] font-black uppercase tracking-widest mb-4 block">Exclusive Report</span>
                    <h3 className="text-xl font-serif font-bold text-white mb-4 group-hover:text-amber-500 transition-colors">{report.title}</h3>
                    <p className="text-stone-400 text-sm leading-relaxed mb-6 line-clamp-3">
                      {report.summary || "Detailed analysis of Phellinus Linteus effects."}
                    </p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-xs text-stone-600 font-mono">{new Date(report.created_at).toLocaleDateString()} • {report.views} views</span>
                      <button onClick={() => handleReadReport(report)} className="px-6 py-2 bg-white/5 hover:bg-amber-600 hover:text-white border border-white/10 rounded-full font-bold transition-all text-xs uppercase tracking-wider">
                        Read Report
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {!isAuthenticated && viewedReportCount >= 3 && (
                <div className="mt-12 p-8 border border-amber-500/20 rounded-3xl bg-amber-900/10 inline-block">
                  <Lock size={32} className="text-amber-500 mx-auto mb-4" />
                  <p className="text-stone-300 mb-4">You have used your 3 free articles. Please login to continue reading.</p>
                  <button onClick={() => setIsAuthModalOpen(true)} className="px-8 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-full transition-all">Login / Join</button>
                </div>
              )}

              {/* Admin Post Report (Optional: Add UI for admin to post) */}
              {isAdmin && (
                <div className="mt-12 border-t border-white/5 pt-8">
                  <h4 className="text-amber-500 font-bold mb-4">Admin: Post New Report</h4>
                  {/* Simplified Admin Form - could be in a modal or separate page */}
                  <button
                    onClick={() => setIsReportModalOpen(true)}
                    className="px-6 py-2 bg-stone-800 text-stone-400 hover:text-white rounded-lg text-xs uppercase font-bold"
                  >
                    + Write Health Essay
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Report Writer Modal (Admin) */}
          {
            isAdmin && isReportModalOpen && (
              <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/95 backdrop-blur-3xl p-4 md:p-10 animate-in fade-in">
                <div className="bg-stone-900 rounded-[2rem] p-8 w-full max-w-4xl h-[90vh] overflow-y-auto border border-white/10 shadow-2xl relative flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-amber-600 text-xs font-bold uppercase tracking-widest">Writing Health Essay</span>
                    <button onClick={() => setIsReportModalOpen(false)} className="text-stone-500 hover:text-white"><X size={32} /></button>
                  </div>

                  <div className="space-y-6 flex-grow">
                    <div>
                      <label className="block text-stone-500 text-xs font-bold mb-2 uppercase">Title</label>
                      <input className="w-full text-3xl font-serif font-bold bg-transparent border-b border-white/10 p-2 text-white placeholder-stone-700 outline-none focus:border-amber-500 transition-colors" placeholder="Enter Title..." value={newReport.title} onChange={e => setNewReport({ ...newReport, title: e.target.value })} />
                    </div>

                    <div>
                      <label className="block text-amber-500 text-xs font-bold mb-2 uppercase flex items-center gap-2"><Sparkles size={12} /> Key Point (Core Message)</label>
                      <input className="w-full text-lg bg-amber-900/10 border border-amber-500/20 rounded-xl p-4 text-amber-100 placeholder-amber-900/50 outline-none focus:border-amber-500" placeholder="e.g. Consistency is key for immunity..." value={newReport.key_point} onChange={e => setNewReport({ ...newReport, key_point: e.target.value })} />
                    </div>

                    <div>
                      <label className="block text-stone-500 text-xs font-bold mb-2 uppercase">Cover Image URL (Optional)</label>
                      <input className="w-full bg-stone-800 border border-white/5 rounded-xl p-3 text-stone-300 text-sm outline-none focus:border-amber-500" placeholder="https://..." value={newReport.image_url} onChange={e => setNewReport({ ...newReport, image_url: e.target.value })} />
                    </div>

                    <div className="flex-grow flex flex-col">
                      <label className="block text-stone-500 text-xs font-bold mb-2 uppercase">Essay Content</label>
                      <textarea
                        className="w-full flex-grow bg-stone-950/50 border border-white/5 rounded-2xl p-6 text-lg leading-relaxed text-stone-300 outline-none focus:border-amber-500 resize-none font-serif min-h-[400px]"
                        placeholder="Write your health essay here... (Supports copy & paste)"
                        value={newReport.content}
                        onChange={e => setNewReport({ ...newReport, content: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/5 flex justify-end gap-4">
                    <button onClick={() => setIsReportModalOpen(false)} className="px-8 py-3 text-stone-500 hover:text-white font-bold transition-colors">Cancel</button>
                    <button onClick={handlePostReport} className="px-10 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-full shadow-lg transition-all flex items-center gap-2">Publish Essay <ArrowRight size={16} /></button>
                  </div>
                </div>
              </div>
            )
          }

          {/* Report Reader Modal - Improved Mobile UX */}


          {/* Conditional Content based on Current View */}
          <section id="health" className="py-24 relative bg-stone-900 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-6">
                <div>
                  <h2 onClick={() => { setCurrentView('health'); window.scrollTo(0, 0); }} className="text-3xl md:text-5xl font-serif font-medium text-white uppercase tracking-tight mb-2 cursor-pointer hover:text-amber-500 transition-colors">{t.nav.health}</h2>
                  <p className="text-stone-400 text-sm">Vital Core Research Team</p>
                </div>
                <button onClick={() => { setCurrentView('health'); window.scrollTo(0, 0); }} className="px-6 py-3 bg-stone-800 text-stone-300 font-bold rounded-full text-xs uppercase tracking-widest hover:text-white transition-all">View All Reports &rarr;</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {healthReports.slice(0, 3).map((report) => (
                  <div key={report.id} onClick={async () => { setSelectedReport(report); try { const full = await api.health.get(report.id); setSelectedReport(full); } catch (e) { console.error(e); } }} className="cursor-pointer group">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-stone-900 border border-white/5 relative">
                      {report.image_url ? (
                        <img src={report.image_url} alt={report.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-stone-800 text-stone-600"><FileText size={48} /></div>
                      )}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all"></div>
                    </div>
                    <span className="text-amber-500 font-bold text-xs uppercase tracking-widest mb-2 block">{new Date(report.created_at).toLocaleDateString()}</span>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-500 transition-colors lineHeight-tight">{report.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="faq" className="py-24 relative bg-stone-950">
            <div className="max-w-5xl mx-auto px-8 text-center">
              <h2 onClick={() => { setCurrentView('faq'); window.scrollTo(0, 0); }} className="text-3xl md:text-4xl font-serif font-medium text-white uppercase tracking-tight mb-6 cursor-pointer hover:text-amber-500 transition-colors">{t.nav.faq}</h2>
              <p className="text-stone-400 mb-8">Join our community discussions.</p>
              <button onClick={() => { setCurrentView('faq'); window.scrollTo(0, 0); }} className="px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-full uppercase tracking-widest shadow-lg transition-all">{t.board?.ask_btn || "Ask Question"}</button>
            </div>
          </section>
        </>
      )}

      {
        currentView === 'health' && (
          <div className="pt-32 min-h-screen bg-stone-950">
            <section className="max-w-7xl mx-auto px-6 mb-24">
              <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-6">
                <div>
                  <h2 className="text-3xl md:text-5xl font-serif font-medium text-white uppercase tracking-tight mb-2">{t.nav.health}</h2>
                  <p className="text-stone-400 text-sm">Medical Evidence & Case Studies</p>
                </div>
                {isAdmin && <button onClick={() => setIsReportModalOpen(true)} className="px-6 py-3 bg-stone-800 hover:bg-stone-700 text-white font-bold rounded-full text-xs uppercase tracking-widest shadow-lg flex items-center gap-2 transition-all"><Edit size={14} /> Write Health Essay</button>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {healthReports.map((report) => (
                  <div key={report.id} onClick={async () => { setSelectedReport(report); try { const full = await api.health.get(report.id); setSelectedReport(full); } catch (e) { console.error(e); } }} className="cursor-pointer group">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-stone-900 border border-white/5 relative">
                      {report.image_url ? (
                        <img src={report.image_url} alt={report.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-stone-800 text-stone-600"><FileText size={48} /></div>
                      )}
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all"></div>
                    </div>
                    <span className="text-amber-500 font-bold text-xs uppercase tracking-widest mb-2 block">{new Date(report.created_at).toLocaleDateString()}</span>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-500 transition-colors lineHeight-tight">{report.title}</h3>
                    <p className="text-stone-400 text-sm line-clamp-2">{report.summary || report.content?.substring(0, 100)}...</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )
      }

      {
        currentView === 'faq' && (
          <div className="pt-32 min-h-screen bg-stone-950 px-6">
            <section className="max-w-5xl mx-auto relative z-10 mb-24">
              <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-6">
                <div>
                  <h2 className="text-3xl md:text-4xl font-serif font-medium text-white uppercase tracking-tight mb-2">{t.nav.faq}</h2>
                  <p className="text-stone-400 text-sm">
                    귀하의 언어로 편하게 문의 하세요 / Please feel free to ask in your own language
                  </p>
                </div>
                {isAuthenticated && <button onClick={() => setIsQnaModalOpen(true)} className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-full text-xs uppercase tracking-widest shadow-lg flex items-center gap-2"><Edit size={14} /> {t.board?.ask_btn}</button>}
              </div>

              {/* Admin Notices */}
              {notices.length > 0 && (
                <div className="mb-12 space-y-4">
                  <h3 className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-4">📢 Admin Notices</h3>
                  {notices.map(notice => {
                    const nTitle = notice[`title_${lang}`] || notice.title;
                    const nContent = notice[`content_${lang}`] || notice.content;
                    return (
                      <div key={notice.id} className="bg-amber-900/20 border border-amber-500/30 p-6 rounded-2xl">
                        <h4 className="text-lg font-bold text-white mb-2">{nTitle}</h4>
                        <p className="text-stone-400 text-sm whitespace-pre-wrap">{nContent}</p>
                        <p className="text-xs text-amber-700 font-mono mt-4">{new Date(notice.created_at).toLocaleDateString()}</p>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="grid gap-4">
                {(!Array.isArray(questions) || questions.length === 0) && <p className="text-center text-stone-600 py-10">{t.board?.no_questions}</p>}
                {Array.isArray(questions) && questions.map((q: any) => (
                  <div key={q.id} className="bg-stone-900/50 p-6 md:p-8 rounded-[2rem] border border-white/5 hover:border-amber-500/30 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-lg font-bold text-white flex items-center gap-3">
                        {q.is_secret === 1 && <Lock size={14} className="text-amber-500" />}
                        {q.title}
                      </h4>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-stone-600 font-mono">{new Date(q.created_at).toLocaleDateString()}</span>
                        {user && user.id === q.user_id && (
                          <button onClick={() => handleEditClick(q)} className="text-xs text-amber-500 hover:text-white font-bold flex items-center gap-1 border border-amber-500/30 px-2 py-1 rounded bg-amber-900/10"><Edit size={10} /> {t.board?.edit_btn}</button>
                        )}
                        {(isAdmin || (user && user.id === q.user_id)) && (
                          <button onClick={() => handleDeleteQuestion(q.id)} className="text-xs text-red-500 hover:text-white font-bold flex items-center gap-1 border border-red-500/30 px-2 py-1 rounded bg-red-900/10 ml-2"><Trash2 size={10} /> {t.board?.delete_btn}</button>
                        )}
                      </div>
                    </div>
                    <p className="text-stone-400 font-light mb-6 leading-relaxed">{q.content}</p>
                    {q.answer && (
                      <div className="ml-4 md:ml-8 p-6 bg-amber-900/10 rounded-2xl border-l-2 border-amber-600">
                        <span className="text-[10px] font-black uppercase text-amber-600 mb-2 block">{t.board?.admin_answer}</span>
                        <p className="text-stone-300 text-sm">{q.answer}</p>
                      </div>
                    )}
                    {!q.answer && isAdmin && (
                      <div className="mt-4 pt-4 border-t border-white/5">
                        <div className="flex gap-2">
                          <input
                            className="flex-grow bg-black/30 p-3 rounded-lg text-white text-sm border border-white/5 outline-none focus:border-amber-500 transition-colors"
                            placeholder={t.board?.admin_reply_placeholder}
                            value={adminAnswer[q.id] || ''}
                            onChange={(e) => setAdminAnswer({ ...adminAnswer, [q.id]: e.target.value })}
                          />
                          <button onClick={() => handleAdminAnswer(q.id)} className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg text-xs uppercase">{t.board?.reply_btn}</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        )
      }

      {/* Q&A Modal */}
      {
        isQnaModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 md:p-10 animate-in fade-in duration-500 overflow-y-auto">
            <div className="bg-stone-900 rounded-[2rem] p-8 w-full max-w-2xl shadow-2xl border border-white/5 relative flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">{editingQuestionId ? t.board?.edit_title : t.board?.create_title}</h3>
                <button onClick={() => setIsQnaModalOpen(false)} className="p-2 -mr-2 text-stone-500 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-amber-900/10 border border-amber-500/20 p-4 rounded-xl mb-6">
                  <p className="text-amber-500 text-xs md:text-sm font-bold text-center">
                    귀하의 언어로 편하게 문의 하세요. <br />
                    Please feel free to ask in your own language.
                  </p>
                </div>
                <div>
                  <label className="block text-stone-500 text-xs font-bold mb-2 uppercase">{t.board?.label_title}</label>
                  <input className="w-full bg-stone-800 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-amber-500" placeholder={t.board?.placeholder_title} value={newQuestion.title} onChange={e => setNewQuestion({ ...newQuestion, title: e.target.value })} />
                </div>
                <div>
                  <label className="block text-stone-500 text-xs font-bold mb-2 uppercase">{t.board?.label_content}</label>
                  <textarea className="w-full bg-stone-800 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-amber-500 min-h-[150px]" placeholder={t.board?.placeholder_content} value={newQuestion.content} onChange={e => setNewQuestion({ ...newQuestion, content: e.target.value })} />
                </div>
                <div>
                  <label className="block text-stone-500 text-xs font-bold mb-4 uppercase">{t.board?.label_type}</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setNewQuestion({ ...newQuestion, is_secret: false })}
                      className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${!newQuestion.is_secret ? 'bg-amber-600 border-amber-500 text-white' : 'bg-stone-900 border-white/10 text-stone-500 hover:border-white/30'}`}
                    >
                      <Globe size={24} />
                      <span className="text-xs font-bold uppercase">{t.board?.type_public}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewQuestion({ ...newQuestion, is_secret: true })}
                      className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${newQuestion.is_secret ? 'bg-amber-600 border-amber-500 text-white' : 'bg-stone-900 border-white/10 text-stone-500 hover:border-white/30'}`}
                    >
                      <Lock size={24} />
                      <span className="text-xs font-bold uppercase">{t.board?.type_secret}</span>
                    </button>
                  </div>
                </div>
                <button onClick={handleAskQuestion} className="w-full py-4 bg-amber-600 text-white font-bold rounded-xl uppercase tracking-widest hover:bg-amber-500 transition-all shadow-lg mt-4">{editingQuestionId ? t.board?.update_btn : t.board?.submit_btn}</button>
              </div>
            </div>
          </div>
        )
      }

      {/* Footer */}
      <footer className="py-24 relative bg-stone-950 text-stone-500 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-10 text-center">
          <VitalCoreLogo className="w-20 h-20 mx-auto mb-8 opacity-25 group-hover:opacity-100 transition-opacity" />
          <h4 className="font-serif font-bold text-2xl text-white mb-4 uppercase tracking-tighter">VITAL CORE PREMIUM</h4>
          <p className="text-xs text-stone-600 font-mono">v1.5.0 • System Status: {healthStatus}</p>
          <p className="text-stone-600 max-w-lg mx-auto mb-10 font-light text-base">Scientific myco-oncology from the Cambodian highlands.</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-10 text-stone-400 text-sm">
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-amber-600" />
              <span className="font-bold text-stone-300">{t.footer.contact?.label}:</span>
              <a href="mailto:cambodia.bae@gmail.com" className="hover:text-amber-500 transition-colors">cambodia.bae@gmail.com</a>
            </div>
            <div className="flex items-center gap-2">
              <Send size={16} className="text-amber-600" />
              <span className="font-bold text-stone-300">Telegram:</span>
              <a href="https://t.me/cambodiabae" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors">{t.footer.contact?.telegram}</a>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-stone-900 rounded-full border border-white/5 mb-10">
            <Lock size={12} className="text-stone-600" />
            <span className="text-xs text-stone-500">{t.footer.contact?.secret}</span>
          </div>

          <p className="text-[10px] tracking-[0.5em] uppercase font-black opacity-30">{t.footer.copy}</p>
        </div>
      </footer>

      {/* Admin Dashboard Modal */}
      {
        isAdminDashboardOpen && (
          <div className="fixed inset-0 z-[70] bg-stone-950 flex flex-col animate-in slide-in-from-bottom duration-300">
            {/* Header */}
            <div className="px-6 py-4 bg-stone-900 border-b border-white/5 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  Admin Dashboard
                </h2>
                <div className="flex bg-stone-800 p-1 rounded-lg">
                  <button onClick={() => setAdminTab('users')} className={`px-4 py-2 rounded-md text-xs font-bold uppercase transition-all ${adminTab === 'users' ? 'bg-stone-700 text-white shadow' : 'text-stone-500 hover:text-white'}`}>Users</button>
                  <button onClick={() => setAdminTab('reports')} className={`px-4 py-2 rounded-md text-xs font-bold uppercase transition-all ${adminTab === 'reports' ? 'bg-stone-700 text-white shadow' : 'text-stone-500 hover:text-white'}`}>Health Reports</button>
                  <button onClick={() => setAdminTab('qna')} className={`px-4 py-2 rounded-md text-xs font-bold uppercase transition-all ${adminTab === 'qna' ? 'bg-stone-700 text-white shadow' : 'text-stone-500 hover:text-white'}`}>Questions</button>
                  <button onClick={() => setAdminTab('notices' as any)} className={`px-4 py-2 rounded-md text-xs font-bold uppercase transition-all ${adminTab === 'notices' ? 'bg-stone-700 text-white shadow' : 'text-stone-500 hover:text-white'}`}>Notices</button>
                </div>
              </div>
              <button onClick={() => setIsAdminDashboardOpen(false)} className="p-2 -mr-2 text-stone-500 hover:text-white hover:bg-white/5 rounded-full transition-all">
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 bg-stone-950">
              {adminTab === 'users' && (
                <div className="max-w-7xl mx-auto">
                  <div className="bg-stone-900 rounded-2xl border border-white/5 overflow-hidden">
                    <table className="w-full text-left text-sm text-stone-400">
                      <thead className="bg-stone-800 text-stone-300 uppercase text-xs font-bold">
                        <tr>
                          <th className="px-6 py-4">ID</th>
                          <th className="px-6 py-4">Name</th>
                          <th className="px-6 py-4">Email</th>
                          <th className="px-6 py-4">Role</th>
                          <th className="px-6 py-4">Created At</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {userList.map(u => (
                          <tr key={u.id} className="hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 font-mono text-xs">{u.id}</td>
                            <td className="px-6 py-4 text-white font-bold">{u.name}</td>
                            <td className="px-6 py-4">{u.email}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${u.role === 'admin' ? 'bg-red-900/30 text-red-500 border border-red-500/20' : 'bg-stone-800 text-stone-500'}`}>
                                {u.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 font-mono text-xs">{new Date(u.created_at).toLocaleDateString()}</td>
                            <td className="px-6 py-4 text-right flex justify-end gap-2">
                              <button onClick={() => setEditingUser(u)} className="p-2 bg-stone-800 hover:bg-amber-600 hover:text-white rounded transition-colors"><Edit size={14} /></button>
                              <button onClick={() => handleDeleteUser(u.id)} className="p-2 bg-stone-800 hover:bg-red-600 hover:text-white rounded transition-colors"><Trash2 size={14} /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {adminTab === 'reports' && (
                <div className="max-w-5xl mx-auto space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-white">Health Reports Management</h3>
                    <button onClick={() => { setEditingReportId(null); setNewReport({ title: '', content: '', summary: '', key_point: '', image_url: '' }); setIsReportModalOpen(true); }} className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg uppercase tracking-wider shadow-lg flex items-center gap-2">
                      <Plus size={16} /> New Report
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {healthReports.map(report => (
                      <div key={report.id} className="bg-stone-900 rounded-xl p-4 border border-white/5 flex flex-col gap-4">
                        <div className="flex gap-4">
                          <div className="w-20 h-20 bg-stone-800 rounded-lg overflow-hidden shrink-0">
                            {report.image_url ? <img src={report.image_url} alt="" className="w-full h-full object-cover" /> : <FileText className="m-auto mt-6 text-stone-600" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white font-bold truncate mb-1">{report.title}</h4>
                            <p className="text-stone-500 text-xs line-clamp-2">{report.summary}</p>
                            <div className="mt-2 text-xs text-stone-600 font-mono flex items-center gap-2">
                              <Eye size={10} /> {report.views} views
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 pt-2 border-t border-white/5 mt-auto">
                          <button onClick={() => { setEditingReportId(report.id); setNewReport(report); setIsReportModalOpen(true); }} className="flex-1 py-2 bg-stone-800 text-stone-400 hover:text-white text-xs font-bold rounded uppercase">Edit</button>
                          <button onClick={() => handleDeleteReport(report.id)} className="flex-1 py-2 bg-stone-800 text-red-500 hover:text-white hover:bg-red-600 text-xs font-bold rounded uppercase transition-colors">Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {adminTab === 'qna' && (
                <div className="max-w-7xl mx-auto space-y-6">
                  <h3 className="text-2xl font-bold text-white mb-4">Questions Management</h3>
                  <div className="bg-stone-900 rounded-2xl border border-white/5 overflow-hidden">
                    <table className="w-full text-left text-sm text-stone-400">
                      <thead className="bg-stone-800 text-stone-300 uppercase text-xs font-bold">
                        <tr>
                          <th className="px-6 py-4">Title</th>
                          <th className="px-6 py-4">User</th>
                          <th className="px-6 py-4">Date</th>
                          <th className="px-6 py-4">Status</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {questions.map((q: any) => (
                          <tr key={q.id} className="hover:bg-white/5">
                            <td className="px-6 py-4 font-bold text-white">{q.title} {q.is_secret === 1 && <Lock size={12} className="inline text-amber-500" />}</td>
                            <td className="px-6 py-4">{q.user_name}</td>
                            <td className="px-6 py-4 font-mono text-xs">{new Date(q.created_at).toLocaleDateString()}</td>
                            <td className="px-6 py-4"><span className={`text-[10px] uppercase font-bold px-2 py-1 rounded ${q.answer ? 'bg-green-900/30 text-green-500' : 'bg-stone-800'}`}>{q.answer ? 'Answered' : 'Pending'}</span></td>
                            <td className="px-6 py-4 text-right">
                              <button onClick={() => handleDeleteQuestion(q.id)} className="p-2 bg-stone-800 hover:bg-red-600 hover:text-white rounded"><Trash2 size={14} /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {adminTab === 'notices' && (
                <div className="max-w-7xl mx-auto space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-white">Admin Notices</h3>
                    <button onClick={() => { setIsNoticeModalOpen(true); setNewNotice({ title: '', content: '' }); }} className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg uppercase tracking-wider shadow-lg flex items-center gap-2"><Plus size={16} /> New Notice</button>
                  </div>
                  <div className="bg-stone-900 rounded-2xl border border-white/5 overflow-hidden">
                    <table className="w-full text-left text-sm text-stone-400">
                      <thead className="bg-stone-800 text-stone-300 uppercase text-xs font-bold">
                        <tr>
                          <th className="px-6 py-4">Title ({noticeLang})</th>
                          <th className="px-6 py-4">Date</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {notices.map((n: any) => (
                          <tr key={n.id} className="hover:bg-white/5">
                            <td className="px-6 py-4 font-bold text-white">{n.title}</td>
                            <td className="px-6 py-4 font-mono text-xs">{new Date(n.created_at).toLocaleDateString()}</td>
                            <td className="px-6 py-4 text-right">
                              <button onClick={() => handleDeleteNotice(n.id)} className="p-2 bg-stone-800 hover:bg-red-600 hover:text-white rounded"><Trash2 size={14} /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Edit User Modal */}
            {editingUser && (
              <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                <div className="bg-stone-900 p-8 rounded-2xl w-full max-w-md border border-white/10 shadow-2xl">
                  <h3 className="text-xl font-bold text-white mb-6">Edit User</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-stone-500 font-bold uppercase block mb-1">Name</label>
                      <input className="w-full bg-stone-800 text-white p-3 rounded-lg border border-white/5 outline-none focus:border-amber-500" value={editingUser.name} onChange={e => setEditingUser({ ...editingUser, name: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-xs text-stone-500 font-bold uppercase block mb-1">Email</label>
                      <input className="w-full bg-stone-800 text-white p-3 rounded-lg border border-white/5 outline-none focus:border-amber-500" value={editingUser.email} onChange={e => setEditingUser({ ...editingUser, email: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-xs text-stone-500 font-bold uppercase block mb-1">Role</label>
                      <select className="w-full bg-stone-800 text-white p-3 rounded-lg border border-white/5 outline-none focus:border-amber-500" value={editingUser.role} onChange={e => setEditingUser({ ...editingUser, role: e.target.value })}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-stone-500 font-bold uppercase block mb-1">New Password (Optional)</label>
                      <input className="w-full bg-stone-800 text-white p-3 rounded-lg border border-white/5 outline-none focus:border-amber-500" type="password" placeholder="Leave blank to keep current" onChange={e => setEditingUser({ ...editingUser, password: e.target.value })} />
                    </div>
                    <div className="flex gap-4 pt-4">
                      <button onClick={handleUpdateUser} className="flex-1 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg uppercase tracking-wide">Save Changes</button>
                      <button onClick={() => setEditingUser(null)} className="flex-1 py-3 bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white font-bold rounded-lg uppercase tracking-wide">Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      }

      {/* Create Report Modal */}
      {
        isReportModalOpen && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300">
            <div className="bg-stone-900 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col border border-white/10 shadow-2xl relative">
              <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-stone-900 rounded-t-3xl">
                <h3 className="text-2xl font-serif font-bold text-white">{editingReportId ? 'Edit Health Report' : 'New Health Report'}</h3>
                <button onClick={() => setIsReportModalOpen(false)} className="p-2 -mr-2 text-stone-500 hover:text-white"><X size={24} /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-stone-500 text-xs font-bold uppercase mb-2">Title</label>
                    <input className="w-full bg-stone-800 p-4 rounded-xl text-white outline-none focus:border-amber-500 border border-white/5" placeholder="Report Title" value={newReport.title} onChange={e => setNewReport({ ...newReport, title: e.target.value })} />
                  </div>
                  <div>
                    <label className="block text-stone-500 text-xs font-bold uppercase mb-2">Key Point (Subtitle)</label>
                    <input className="w-full bg-stone-800 p-4 rounded-xl text-white outline-none focus:border-amber-500 border border-white/5" placeholder="Short highlight..." value={newReport.key_point} onChange={e => setNewReport({ ...newReport, key_point: e.target.value })} />
                  </div>
                </div>
                <div>
                  <label className="block text-stone-500 text-xs font-bold uppercase mb-2">Cover Image URL</label>
                  <input className="w-full bg-stone-800 p-4 rounded-xl text-white outline-none focus:border-amber-500 border border-white/5 font-mono text-sm" placeholder="https://..." value={newReport.image_url} onChange={e => setNewReport({ ...newReport, image_url: e.target.value })} />
                </div>
                <div>
                  <label className="block text-stone-500 text-xs font-bold uppercase mb-2">Summary (Preview Text)</label>
                  <textarea className="w-full bg-stone-800 p-4 rounded-xl text-white outline-none focus:border-amber-500 border border-white/5 h-24" placeholder="Brief summary for the card view..." value={newReport.summary} onChange={e => setNewReport({ ...newReport, summary: e.target.value })} />
                </div>
                <div>
                  <label className="block text-stone-500 text-xs font-bold uppercase mb-2">Full Content (Markdown Supported)</label>
                  <textarea className="w-full bg-stone-800 p-4 rounded-xl text-white outline-none focus:border-amber-500 border border-white/5 h-64 font-mono leading-relaxed" placeholder="# Header\n\nBody text..." value={newReport.content} onChange={e => setNewReport({ ...newReport, content: e.target.value })} />
                </div>
              </div>
              <div className="p-6 border-t border-white/5 bg-stone-900 rounded-b-3xl flex justify-end gap-4">
                <button onClick={() => setIsReportModalOpen(false)} className="px-8 py-3 bg-stone-800 hover:bg-stone-700 text-stone-400 font-bold rounded-lg uppercase">Cancel</button>
                <button onClick={handleCreateReport} className="px-8 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg uppercase shadow-lg">{editingReportId ? 'Update Report' : 'Publish Report'}</button>
              </div>
            </div>
          </div>
        )
      }

      {/* Existing Footer Close Tag is Replaced Above */}
      {/* Admin Dashboard Modal */}
      {
        isAdminDashboardOpen && (
          <div className="fixed inset-0 z-[70] bg-stone-950 flex flex-col animate-in slide-in-from-bottom duration-300">
            {/* Header */}
            <div className="px-6 py-4 bg-stone-900 border-b border-white/5 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  Admin Dashboard
                </h2>
                <div className="flex bg-stone-800 p-1 rounded-lg">
                  <button onClick={() => setAdminTab('users')} className={`px-4 py-2 rounded-md text-xs font-bold uppercase transition-all ${adminTab === 'users' ? 'bg-stone-700 text-white shadow' : 'text-stone-500 hover:text-white'}`}>Users</button>
                  <button onClick={() => setAdminTab('reports')} className={`px-4 py-2 rounded-md text-xs font-bold uppercase transition-all ${adminTab === 'reports' ? 'bg-stone-700 text-white shadow' : 'text-stone-500 hover:text-white'}`}>Health Reports</button>
                  <button onClick={() => setAdminTab('qna')} className={`px-4 py-2 rounded-md text-xs font-bold uppercase transition-all ${adminTab === 'qna' ? 'bg-stone-700 text-white shadow' : 'text-stone-500 hover:text-white'}`}>Q&A Board</button>
                </div>
              </div>
              <button onClick={() => setIsAdminDashboardOpen(false)} className="p-2 -mr-2 text-stone-500 hover:text-white hover:bg-white/5 rounded-full transition-all">
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 bg-stone-950">
              {adminTab === 'users' && (
                <div className="max-w-7xl mx-auto">
                  <div className="bg-stone-900 rounded-2xl border border-white/5 overflow-hidden">
                    <table className="w-full text-left text-sm text-stone-400">
                      <thead className="bg-stone-800 text-stone-300 uppercase text-xs font-bold">
                        <tr>
                          <th className="px-6 py-4">ID</th>
                          <th className="px-6 py-4">Name</th>
                          <th className="px-6 py-4">Email</th>
                          <th className="px-6 py-4">Role</th>
                          <th className="px-6 py-4">Created At</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {userList.map(u => (
                          <tr key={u.id} className="hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4 font-mono text-xs">{u.id}</td>
                            <td className="px-6 py-4 text-white font-bold">{u.name}</td>
                            <td className="px-6 py-4">{u.email}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${u.role === 'admin' ? 'bg-red-900/30 text-red-500 border border-red-500/20' : 'bg-stone-800 text-stone-500'}`}>
                                {u.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 font-mono text-xs">{new Date(u.created_at).toLocaleDateString()}</td>
                            <td className="px-6 py-4 text-right flex justify-end gap-2">
                              <button onClick={() => setEditingUser(u)} className="p-2 bg-stone-800 hover:bg-amber-600 hover:text-white rounded transition-colors"><Edit size={14} /></button>
                              <button onClick={() => handleDeleteUser(u.id)} className="p-2 bg-stone-800 hover:bg-red-600 hover:text-white rounded transition-colors"><Trash2 size={14} /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {adminTab === 'reports' && (
                <div className="max-w-5xl mx-auto space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-white">Health Reports Management</h3>
                    <button onClick={() => setIsReportModalOpen(true)} className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg uppercase tracking-wider shadow-lg flex items-center gap-2">
                      <Plus size={16} /> New Report
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {healthReports.map(report => (
                      <div key={report.id} className="bg-stone-900 rounded-xl p-4 border border-white/5 flex gap-4">
                        <div className="w-20 h-20 bg-stone-800 rounded-lg overflow-hidden shrink-0">
                          {report.image_url ? <img src={report.image_url} alt="" className="w-full h-full object-cover" /> : <FileText className="m-auto mt-6 text-stone-600" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-bold truncate mb-1">{report.title}</h4>
                          <p className="text-stone-500 text-xs line-clamp-2">{report.summary}</p>
                          <div className="mt-2 text-xs text-stone-600 font-mono flex items-center gap-2">
                            <Eye size={10} /> {report.views} views
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {adminTab === 'qna' && (
                <div className="max-w-4xl mx-auto">
                  <div className="bg-amber-900/20 text-amber-500 p-4 rounded-xl border border-amber-500/20 text-center mb-8">
                    Please use the main Q&A Board interface for replying to questions. This tab is a placeholder for future bulk management tools.
                  </div>
                </div>
              )}
            </div>

            {/* Edit User Modal */}
            {editingUser && (
              <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                <div className="bg-stone-900 p-8 rounded-2xl w-full max-w-md border border-white/10 shadow-2xl">
                  <h3 className="text-xl font-bold text-white mb-6">Edit User</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-stone-500 font-bold uppercase block mb-1">Name</label>
                      <input className="w-full bg-stone-800 text-white p-3 rounded-lg border border-white/5 outline-none focus:border-amber-500" value={editingUser.name} onChange={e => setEditingUser({ ...editingUser, name: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-xs text-stone-500 font-bold uppercase block mb-1">Email</label>
                      <input className="w-full bg-stone-800 text-white p-3 rounded-lg border border-white/5 outline-none focus:border-amber-500" value={editingUser.email} onChange={e => setEditingUser({ ...editingUser, email: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-xs text-stone-500 font-bold uppercase block mb-1">Role</label>
                      <select className="w-full bg-stone-800 text-white p-3 rounded-lg border border-white/5 outline-none focus:border-amber-500" value={editingUser.role} onChange={e => setEditingUser({ ...editingUser, role: e.target.value })}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-stone-500 font-bold uppercase block mb-1">New Password (Optional)</label>
                      <input className="w-full bg-stone-800 text-white p-3 rounded-lg border border-white/5 outline-none focus:border-amber-500" type="password" placeholder="Leave blank to keep current" onChange={e => setEditingUser({ ...editingUser, password: e.target.value })} />
                    </div>
                    <div className="flex gap-4 pt-4">
                      <button onClick={handleUpdateUser} className="flex-1 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg uppercase tracking-wide">Save Changes</button>
                      <button onClick={() => setEditingUser(null)} className="flex-1 py-3 bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white font-bold rounded-lg uppercase tracking-wide">Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      }

      {/* Create Report Modal */}
      {
        isReportModalOpen && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300">
            <div className="bg-stone-900 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col border border-white/10 shadow-2xl relative">
              <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-stone-900 rounded-t-3xl">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-white">{editingReportId ? 'Edit Health Report' : 'New Health Report'}</h3>
                  <div className="flex flex-wrap gap-2 mt-4 items-center">
                    {['ko', 'en', 'zh', 'ja'].map((l) => (
                      <button
                        key={l}
                        onClick={() => setReportLang(l as any)}
                        className={`px-3 py-1 text-xs font-bold uppercase rounded-full transition-all ${reportLang === l ? 'bg-amber-600 text-white' : 'bg-stone-800 text-stone-500 hover:text-stone-300'}`}
                      >
                        {l === 'ko' ? '🇰🇷 KR' : l === 'en' ? '🇺🇸 EN' : l === 'zh' ? '🇨🇳 CN' : '🇯🇵 JP'}
                      </button>
                    ))}
                    <div className="w-px h-6 bg-white/10 mx-2"></div>
                    <button
                      onClick={handleAutoTranslate}
                      disabled={isTranslating}
                      className="px-4 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white text-xs font-bold rounded-full uppercase shadow-lg flex items-center gap-2 disabled:opacity-50"
                    >
                      {isTranslating ? <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Sparkles size={12} />}
                      AI Translate All
                    </button>
                  </div>
                </div>
                <button onClick={() => setIsReportModalOpen(false)} className="p-2 -mr-2 text-stone-500 hover:text-white"><X size={24} /></button>
              </div>
              <div className="flex-1 overflow-y-auto p-8 space-y-6">

                {/* Image is Shared */}
                <div className="bg-stone-800/50 p-4 rounded-xl border border-white/5">
                  <label className="block text-stone-500 text-xs font-bold uppercase mb-2">Cover Image (Shared)</label>
                  <div className="space-y-3">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="block w-full text-sm text-stone-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-stone-800 file:text-amber-500 hover:file:bg-stone-700"
                    />
                    <input className="w-full bg-stone-800 p-4 rounded-xl text-white outline-none focus:border-amber-500 border border-white/5 font-mono text-sm" placeholder="https://..." value={newReport.image_url || ''} onChange={e => setNewReport({ ...newReport, image_url: e.target.value })} />
                  </div>
                </div>

                {/* Localized Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-stone-500 text-xs font-bold uppercase mb-2">Title ({reportLang.toUpperCase()})</label>
                    <input
                      className="w-full bg-stone-800 p-4 rounded-xl text-white outline-none focus:border-amber-500 border border-white/5"
                      placeholder="Report Title"
                      value={newReport[reportLang === 'ko' ? 'title' : `title_${reportLang}`] || ''}
                      onChange={e => setNewReport({ ...newReport, [reportLang === 'ko' ? 'title' : `title_${reportLang}`]: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-stone-500 text-xs font-bold uppercase mb-2">Key Point ({reportLang.toUpperCase()})</label>
                    <input
                      className="w-full bg-stone-800 p-4 rounded-xl text-white outline-none focus:border-amber-500 border border-white/5"
                      placeholder="Short highlight..."
                      value={newReport[reportLang === 'ko' ? 'key_point' : `key_point_${reportLang}`] || ''}
                      onChange={e => setNewReport({ ...newReport, [reportLang === 'ko' ? 'key_point' : `key_point_${reportLang}`]: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-stone-500 text-xs font-bold uppercase mb-2">Summary ({reportLang.toUpperCase()})</label>
                  <textarea
                    className="w-full bg-stone-800 p-4 rounded-xl text-white outline-none focus:border-amber-500 border border-white/5 h-24"
                    placeholder="Brief summary..."
                    value={newReport[reportLang === 'ko' ? 'summary' : `summary_${reportLang}`] || ''}
                    onChange={e => setNewReport({ ...newReport, [reportLang === 'ko' ? 'summary' : `summary_${reportLang}`]: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-stone-500 text-xs font-bold uppercase mb-2">Full Content ({reportLang.toUpperCase()})</label>
                  <textarea
                    className="w-full bg-stone-800 p-4 rounded-xl text-white outline-none focus:border-amber-500 border border-white/5 h-64 font-mono leading-relaxed"
                    placeholder="# Header\n\nBody text..."
                    value={newReport[reportLang === 'ko' ? 'content' : `content_${reportLang}`] || ''}
                    onChange={e => setNewReport({ ...newReport, [reportLang === 'ko' ? 'content' : `content_${reportLang}`]: e.target.value })}
                  />
                </div>
              </div>
              <div className="p-6 border-t border-white/5 bg-stone-900 rounded-b-3xl flex justify-end gap-4">
                <button onClick={() => setIsReportModalOpen(false)} className="px-8 py-3 bg-stone-800 hover:bg-stone-700 text-stone-400 font-bold rounded-lg uppercase">Cancel</button>
                <button onClick={handleCreateReport} className="px-8 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg uppercase shadow-lg">{editingReportId ? 'Update Report' : 'Publish Report'}</button>
              </div>
            </div>
          </div>
        )
      }

      {/* Create Notice Modal */}
      {isNoticeModalOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-stone-900 rounded-3xl w-full max-w-2xl flex flex-col border border-white/10 shadow-2xl relative">
            <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-stone-900 rounded-t-3xl">
              <div>
                <h3 className="text-2xl font-serif font-bold text-white">New Notice</h3>
                <div className="flex gap-2 mt-4">
                  {['ko', 'en', 'zh', 'ja'].map((l) => (
                    <button key={l} onClick={() => setNoticeLang(l as any)} className={`px-3 py-1 text-xs font-bold uppercase rounded-full transition-all ${noticeLang === l ? 'bg-amber-600 text-white' : 'bg-stone-800 text-stone-500 hover:text-stone-300'}`}>
                      {l === 'ko' ? '🇰🇷 Korean' : l === 'en' ? '🇺🇸 English' : l === 'zh' ? '🇨🇳 Chinese' : 'Ja'}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={() => setIsNoticeModalOpen(false)} className="p-2 -mr-2 text-stone-500 hover:text-white"><X size={24} /></button>
            </div>
            <div className="p-8 space-y-6">
              <div>
                <label className="block text-stone-500 text-xs font-bold uppercase mb-2">Title ({noticeLang})</label>
                <input
                  className="w-full bg-stone-800 p-4 rounded-xl text-white outline-none focus:border-amber-500 border border-white/5"
                  placeholder="Notice Title"
                  value={newNotice[noticeLang === 'ko' ? 'title' : `title_${noticeLang}`] || ''}
                  onChange={e => setNewNotice({ ...newNotice, [noticeLang === 'ko' ? 'title' : `title_${noticeLang}`]: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-stone-500 text-xs font-bold uppercase mb-2">Content ({noticeLang})</label>
                <textarea
                  className="w-full bg-stone-800 p-4 rounded-xl text-white outline-none focus:border-amber-500 border border-white/5 h-40"
                  placeholder="Content..."
                  value={newNotice[noticeLang === 'ko' ? 'content' : `content_${noticeLang}`] || ''}
                  onChange={e => setNewNotice({ ...newNotice, [noticeLang === 'ko' ? 'content' : `content_${noticeLang}`]: e.target.value })}
                />


                {/* Notice Type Selector */}
                <div>
                  <label className="block text-stone-500 text-xs font-bold uppercase mb-2">Notice Type</label>
                  <div className="flex gap-4">
                    {['normal', 'banner', 'popup'].map(type => (
                      <button
                        key={type}
                        onClick={() => setNewNotice({ ...newNotice, type })}
                        className={`flex-1 py-3 px-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${newNotice.type === type ? 'bg-amber-600 border-amber-500 text-white' : 'bg-stone-900 border-white/10 text-stone-500 hover:border-white/30'}`}
                      >
                        {type === 'normal' && <MessageCircle size={20} />}
                        {type === 'banner' && <Activity size={20} />}
                        {type === 'popup' && <Zap size={20} />}
                        <span className="text-xs font-bold uppercase">{type.toUpperCase()}</span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>
              <div className="flex justify-end pt-4 gap-4">
                <button
                  onClick={handleTranslateNotice}
                  disabled={isTranslating}
                  className="px-6 py-3 bg-stone-800 border border-amber-500/30 text-amber-500 hover:bg-amber-900/30 hover:text-white font-bold rounded-lg uppercase shadow-lg flex items-center gap-2 transition-all"
                >
                  {isTranslating ? <Loader2 size={18} className="animate-spin" /> : <Languages size={18} />}
                  {isTranslating ? 'Translating...' : 'AI Translate'}
                </button>
                <button onClick={handleCreateNotice} className="px-8 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg uppercase shadow-lg">Post Notice</button>
              </div>
            </div>
          </div>
        </div>
      )
      }

      {/* Global Report Reader Modal */}
      {
        selectedReport && (
          <div className="fixed inset-0 z-[75] bg-stone-950/95 backdrop-blur-3xl animate-in fade-in flex flex-col">
            {/* Sticky Header */}
            <div className="flex-none p-4 flex justify-between items-center bg-stone-900/80 border-b border-white/5 backdrop-blur-md sticky top-0 z-50">
              <span className="text-amber-500 text-xs font-bold uppercase tracking-widest pl-2">Medical Report</span>
              <button
                onClick={() => setSelectedReport(null)}
                className="p-3 bg-stone-800 rounded-full text-stone-300 hover:text-white hover:bg-stone-700 transition-all flex items-center gap-2 pr-4"
              >
                <X size={20} /> <span className="text-xs font-bold uppercase">Close</span>
              </button>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-grow overflow-y-auto custom-scrollbar p-6 md:p-0">
              <div className="max-w-4xl mx-auto bg-stone-900/50 md:my-10 rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl min-h-[50vh]">
                {selectedReport.image_url && (
                  <div className="w-full h-64 md:h-96 relative">
                    <img src={selectedReport.image_url} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent"></div>
                  </div>
                )}

                <div className="p-8 md:p-14">
                  {!selectedReport.image_url && <div className="h-12"></div>}

                  {(() => {
                    const displayTitle = selectedReport[`title_${lang}`] || selectedReport.title;
                    const displayContent = selectedReport[`content_${lang}`] || selectedReport.content;
                    const displayKeyPoint = selectedReport[`key_point_${lang}`] || selectedReport.key_point;

                    return (
                      <>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-8 leading-tight tracking-tight">{displayTitle}</h2>

                        {displayKeyPoint && (
                          <div className="mb-10 pl-6 border-l-2 border-amber-500 py-2">
                            <p className="text-xl md:text-2xl font-serif text-amber-500 italic leading-relaxed">"{displayKeyPoint}"</p>
                          </div>
                        )}

                        {/* Content - Explicitly styled for visibility */}
                        <div className="text-stone-200 text-lg md:text-xl leading-8 font-light whitespace-pre-wrap min-h-[100px] font-sans max-w-3xl">
                          {displayContent}
                        </div>
                      </>
                    );
                  })()}

                  <div className="mt-16 pt-10 border-t border-white/5 text-center flex flex-col items-center gap-4">
                    <p className="text-stone-500 text-sm">Vital Core Premium Lab</p>
                    <button onClick={() => setSelectedReport(null)} className="px-10 py-4 bg-stone-800 hover:bg-stone-700 text-white font-bold rounded-full uppercase tracking-widest text-xs transition-all">Close Article</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }

      {/* Mobile Developer Credit */}
      <div className="fixed bottom-6 left-0 w-full text-center z-40 pointer-events-none md:hidden">
        <p className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em] drop-shadow-md">Web Developer: KwangYoon Bae</p>
      </div>

      {/* Product Image Lightbox */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-300"
          onClick={() => setSelectedProduct(null)}
        >
          <button
            onClick={() => setSelectedProduct(null)}
            className="absolute top-6 right-6 p-4 text-stone-500 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all z-50 cursor-pointer"
          >
            <X size={32} />
          </button>

          <div className="relative max-w-[95vw] max-h-[90vh] w-full h-full flex items-center justify-center pointer-events-none md:pointer-events-auto">
            <img
              src={selectedProduct.img}
              alt={selectedProduct.name}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl pointer-events-auto cursor-zoom-out"
              onClick={() => setSelectedProduct(null)}
            />
            {selectedProduct.name && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
                <p className="text-white font-serif font-bold text-lg">{selectedProduct.name}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Popup Notice Modal */}
      {activePopup && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-in fade-in zoom-in duration-300">
          <div className="bg-stone-900 border border-amber-500/30 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden relative flex flex-col">
            <div className="bg-amber-600 px-6 py-4 flex justify-between items-center">
              <h3 className="text-white font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                <Info size={18} /> Important Notice
              </h3>
              <button onClick={() => handleClosePopup(false)} className="text-white/70 hover:text-white"><X size={20} /></button>
            </div>
            <div className="p-8">
              <h2 className="text-xl md:text-2xl font-serif font-bold text-white mb-4">
                {activePopup[`title_${lang}`] || activePopup.title}
              </h2>
              <p className="text-stone-300 leading-relaxed font-light whitespace-pre-wrap">
                {activePopup[`content_${lang}`] || activePopup.content}
              </p>
            </div>
            <div className="bg-stone-950 p-4 border-t border-white/5 flex items-center justify-between">
              <button
                onClick={() => handleClosePopup(true)}
                className="text-xs text-stone-500 hover:text-white flex items-center gap-2 transition-colors"
              >
                <CheckCircle2 size={14} /> Don't show again today
              </button>
              <button onClick={() => handleClosePopup(false)} className="px-6 py-2 bg-stone-800 hover:bg-stone-700 text-white text-xs font-bold uppercase rounded-lg">Close</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export const HealthReportModal: React.FC<{ report: any; onClose: () => void }> = ({ report, onClose }) => {
  if (!report) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full h-full md:max-w-4xl md:h-[90vh] bg-stone-900 md:rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col relative">

        {/* Sticky Header */}
        <div className="sticky top-0 bg-stone-900/95 backdrop-blur z-20 px-6 py-4 border-b border-white/5 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <span className="px-2 py-1 bg-amber-600/20 text-amber-500 text-[10px] font-bold uppercase tracking-wider rounded border border-amber-500/20">
              Health Report
            </span>
            <span className="text-stone-500 text-xs font-mono">{new Date(report.created_at).toLocaleDateString()}</span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-stone-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          <h2 className="text-2xl md:text-4xl font-serif font-bold text-white mb-8 leading-tight">{report.title}</h2>
          {report.image_url && (
            <div className="mb-8 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img src={report.image_url} alt={report.title} className="w-full h-auto max-h-[500px] object-cover" />
            </div>
          )}
          <div className="prose prose-invert prose-amber max-w-none">
            <div className="text-stone-300 leading-loose text-base md:text-lg whitespace-pre-wrap font-light">
              {report.content}
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 flex items-center gap-4 text-stone-500 text-sm">
            <div className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center">
              <User size={16} />
            </div>
            <div>
              <p className="text-white font-bold">Vital Core Research Team</p>
              <p className="text-xs">Medical Evidence Based Analysis</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MobileModal: React.FC<{ isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-stone-950 flex flex-col animate-in slide-in-from-bottom duration-300 md:hidden">
      {/* Sticky Header */}
      <div className="px-6 py-4 bg-stone-900/95 backdrop-blur border-b border-white/5 flex justify-between items-center shrink-0 safe-top">
        <h3 className="text-lg font-bold text-white truncate max-w-[80%]">{title}</h3>
        <button onClick={onClose} className="p-2 -mr-2 text-stone-400 hover:text-white">
          <X size={24} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 safe-bottom">
        {children}
      </div>
    </div>
  );
};

export default App;
