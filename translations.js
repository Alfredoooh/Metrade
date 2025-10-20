// Complete Translation System (7 Languages)
const TRANSLATIONS = {
  pt: {
    app: { title: 'Deriv Pro', subtitle: 'Plataforma de Trading Avançada' },
    login: { token: 'Token', oauth: 'Deriv Auth', enterToken: 'Cole seu token de API', loginToken: 'Entrar com Token', loginDeriv: 'Entrar com Deriv' },
    nav: { home: 'Início', market: 'Mercado', trade: 'Negociar', history: 'Histórico', bot: 'Bot', calculator: 'Calculadora', notes: 'Anotações', strategy: 'Estratégias', settings: 'Configurações', logout: 'Sair' },
    disclaimer: { title: 'Aviso de Risco', message: 'A Deriv oferece produtos complexos que podem não ser adequados para todos. Certifique-se de que compreende totalmente os riscos envolvidos antes de negociar.', understand: 'Ok, Entendi', learnMore: 'Saber Mais' },
    home: { overview: 'Visão Geral', balance: 'Saldo Total', profit: 'Lucro', trades: 'Trades', winRate: 'Taxa de Acerto' },
    market: { title: 'Mercado', search: 'Buscar mercados...', categories: 'Categorias', all: 'Todos' },
    trade: { title: 'Negociar', select: 'Selecione um ativo', rise: 'Rise', fall: 'Fall', stake: 'Valor', duration: 'Duração', execute: 'Executar', analysis: 'Análise', prediction: 'Previsão', confidence: 'Confiança' },
    bot: { title: 'Bot de Trading', start: 'Iniciar Bot', stop: 'Parar Bot', strategy: 'Estratégia', config: 'Configuração', stats: 'Estatísticas', running: 'Em Execução' },
    history: { title: 'Histórico', trades: 'Trades', pending: 'Pendentes', clear: 'Limpar' },
    calculator: { title: 'Calculadora', nextTrade: 'Próxima Entrada', calculate: 'Calcular' },
    notes: { title: 'Anotações', add: 'Adicionar Nota', save: 'Salvar', delete: 'Excluir' },
    strategy: { title: 'Construtor de Estratégias', create: 'Criar Nova', edit: 'Editar', delete: 'Excluir', save: 'Salvar' },
    settings: { title: 'Configurações', theme: 'Tema', language: 'Idioma', notifications: 'Notificações', vibration: 'Vibração', analysis: 'Análise Automática' },
    themes: { light: 'Claro', dark: 'Escuro', darkDeep: 'Escuro Profundo', auto: 'Automático' }
  },
  en: {
    app: { title: 'Deriv Pro', subtitle: 'Advanced Trading Platform' },
    login: { token: 'Token', oauth: 'Deriv Auth', enterToken: 'Paste your API token', loginToken: 'Login with Token', loginDeriv: 'Login with Deriv' },
    nav: { home: 'Home', market: 'Market', trade: 'Trade', history: 'History', bot: 'Bot', calculator: 'Calculator', notes: 'Notes', strategy: 'Strategies', settings: 'Settings', logout: 'Logout' },
    disclaimer: { title: 'Risk Warning', message: 'Deriv offers complex products that may not be suitable for everyone. Make sure you fully understand the risks involved before trading.', understand: 'Ok, I Understand', learnMore: 'Learn More' },
    home: { overview: 'Overview', balance: 'Total Balance', profit: 'Profit', trades: 'Trades', winRate: 'Win Rate' },
    market: { title: 'Market', search: 'Search markets...', categories: 'Categories', all: 'All' },
    trade: { title: 'Trade', select: 'Select an asset', rise: 'Rise', fall: 'Fall', stake: 'Stake', duration: 'Duration', execute: 'Execute', analysis: 'Analysis', prediction: 'Prediction', confidence: 'Confidence' },
    bot: { title: 'Trading Bot', start: 'Start Bot', stop: 'Stop Bot', strategy: 'Strategy', config: 'Configuration', stats: 'Statistics', running: 'Running' },
    history: { title: 'History', trades: 'Trades', pending: 'Pending', clear: 'Clear' },
    calculator: { title: 'Calculator', nextTrade: 'Next Entry', calculate: 'Calculate' },
    notes: { title: 'Notes', add: 'Add Note', save: 'Save', delete: 'Delete' },
    strategy: { title: 'Strategy Builder', create: 'Create New', edit: 'Edit', delete: 'Delete', save: 'Save' },
    settings: { title: 'Settings', theme: 'Theme', language: 'Language', notifications: 'Notifications', vibration: 'Vibration', analysis: 'Auto Analysis' },
    themes: { light: 'Light', dark: 'Dark', darkDeep: 'Dark Deep', auto: 'Auto' }
  },
  es: {
    app: { title: 'Deriv Pro', subtitle: 'Plataforma de Trading Avanzada' },
    login: { token: 'Token', oauth: 'Deriv Auth', enterToken: 'Pegue su token API', loginToken: 'Iniciar con Token', loginDeriv: 'Iniciar con Deriv' },
    nav: { home: 'Inicio', market: 'Mercado', trade: 'Operar', history: 'Historial', bot: 'Bot', calculator: 'Calculadora', notes: 'Notas', strategy: 'Estrategias', settings: 'Ajustes', logout: 'Salir' },
    disclaimer: { title: 'Advertencia de Riesgo', message: 'Deriv ofrece productos complejos que pueden no ser adecuados para todos. Asegúrese de comprender completamente los riesgos antes de operar.', understand: 'Ok, Entiendo', learnMore: 'Saber Más' },
    home: { overview: 'Resumen', balance: 'Saldo Total', profit: 'Ganancia', trades: 'Operaciones', winRate: 'Tasa de Éxito' },
    market: { title: 'Mercado', search: 'Buscar mercados...', categories: 'Categorías', all: 'Todos' },
    trade: { title: 'Operar', select: 'Seleccione un activo', rise: 'Subir', fall: 'Bajar', stake: 'Monto', duration: 'Duración', execute: 'Ejecutar', analysis: 'Análisis', prediction: 'Predicción', confidence: 'Confianza' },
    bot: { title: 'Bot de Trading', start: 'Iniciar Bot', stop: 'Detener Bot', strategy: 'Estrategia', config: 'Configuración', stats: 'Estadísticas', running: 'Ejecutando' },
    history: { title: 'Historial', trades: 'Operaciones', pending: 'Pendientes', clear: 'Limpiar' },
    calculator: { title: 'Calculadora', nextTrade: 'Próxima Entrada', calculate: 'Calcular' },
    notes: { title: 'Notas', add: 'Agregar Nota', save: 'Guardar', delete: 'Eliminar' },
    strategy: { title: 'Constructor de Estrategias', create: 'Crear Nueva', edit: 'Editar', delete: 'Eliminar', save: 'Guardar' },
    settings: { title: 'Ajustes', theme: 'Tema', language: 'Idioma', notifications: 'Notificaciones', vibration: 'Vibración', analysis: 'Análisis Automático' },
    themes: { light: 'Claro', dark: 'Oscuro', darkDeep: 'Oscuro Profundo', auto: 'Automático' }
  },
  fr: {
    app: { title: 'Deriv Pro', subtitle: 'Plateforme de Trading Avancée' },
    login: { token: 'Token', oauth: 'Deriv Auth', enterToken: 'Collez votre token API', loginToken: 'Connexion Token', loginDeriv: 'Connexion Deriv' },
    nav: { home: 'Accueil', market: 'Marché', trade: 'Trader', history: 'Historique', bot: 'Bot', calculator: 'Calculatrice', notes: 'Notes', strategy: 'Stratégies', settings: 'Paramètres', logout: 'Déconnexion' },
    disclaimer: { title: 'Avertissement de Risque', message: 'Deriv propose des produits complexes qui peuvent ne pas convenir à tout le monde. Assurez-vous de bien comprendre les risques avant de trader.', understand: 'Ok, Je Comprends', learnMore: 'En Savoir Plus' },
    home: { overview: 'Aperçu', balance: 'Solde Total', profit: 'Profit', trades: 'Trades', winRate: 'Taux de Réussite' },
    market: { title: 'Marché', search: 'Rechercher...', categories: 'Catégories', all: 'Tous' },
    trade: { title: 'Trader', select: 'Sélectionner un actif', rise: 'Hausse', fall: 'Baisse', stake: 'Mise', duration: 'Durée', execute: 'Exécuter', analysis: 'Analyse', prediction: 'Prédiction', confidence: 'Confiance' },
    bot: { title: 'Bot de Trading', start: 'Démarrer Bot', stop: 'Arrêter Bot', strategy: 'Stratégie', config: 'Configuration', stats: 'Statistiques', running: 'En Cours' },
    history: { title: 'Historique', trades: 'Trades', pending: 'En Attente', clear: 'Effacer' },
    calculator: { title: 'Calculatrice', nextTrade: 'Prochaine Entrée', calculate: 'Calculer' },
    notes: { title: 'Notes', add: 'Ajouter Note', save: 'Sauvegarder', delete: 'Supprimer' },
    strategy: { title: 'Constructeur Stratégie', create: 'Créer Nouveau', edit: 'Modifier', delete: 'Supprimer', save: 'Sauvegarder' },
    settings: { title: 'Paramètres', theme: 'Thème', language: 'Langue', notifications: 'Notifications', vibration: 'Vibration', analysis: 'Analyse Auto' },
    themes: { light: 'Clair', dark: 'Sombre', darkDeep: 'Sombre Profond', auto: 'Auto' }
  },
  de: {
    app: { title: 'Deriv Pro', subtitle: 'Fortgeschrittene Trading-Plattform' },
    login: { token: 'Token', oauth: 'Deriv Auth', enterToken: 'API-Token einfügen', loginToken: 'Mit Token anmelden', loginDeriv: 'Mit Deriv anmelden' },
    nav: { home: 'Startseite', market: 'Markt', trade: 'Handeln', history: 'Verlauf', bot: 'Bot', calculator: 'Rechner', notes: 'Notizen', strategy: 'Strategien', settings: 'Einstellungen', logout: 'Abmelden' },
    disclaimer: { title: 'Risikowarnung', message: 'Deriv bietet komplexe Produkte an, die möglicherweise nicht für jeden geeignet sind. Stellen Sie sicher, dass Sie die Risiken vollständig verstehen.', understand: 'Ok, Verstanden', learnMore: 'Mehr Erfahren' },
    home: { overview: 'Übersicht', balance: 'Gesamtsaldo', profit: 'Gewinn', trades: 'Trades', winRate: 'Gewinnrate' },
    market: { title: 'Markt', search: 'Märkte suchen...', categories: 'Kategorien', all: 'Alle' },
    trade: { title: 'Handeln', select: 'Asset auswählen', rise: 'Steigen', fall: 'Fallen', stake: 'Einsatz', duration: 'Dauer', execute: 'Ausführen', analysis: 'Analyse', prediction: 'Vorhersage', confidence: 'Vertrauen' },
    bot: { title: 'Trading Bot', start: 'Bot Starten', stop: 'Bot Stoppen', strategy: 'Strategie', config: 'Konfiguration', stats: 'Statistiken', running: 'Läuft' },
    history: { title: 'Verlauf', trades: 'Trades', pending: 'Ausstehend', clear: 'Löschen' },
    calculator: { title: 'Rechner', nextTrade: 'Nächster Eintrag', calculate: 'Berechnen' },
    notes: { title: 'Notizen', add: 'Notiz Hinzufügen', save: 'Speichern', delete: 'Löschen' },
    strategy: { title: 'Strategie-Builder', create: 'Neu Erstellen', edit: 'Bearbeiten', delete: 'Löschen', save: 'Speichern' },
    settings: { title: 'Einstellungen', theme: 'Thema', language: 'Sprache', notifications: 'Benachrichtigungen', vibration: 'Vibration', analysis: 'Auto-Analyse' },
    themes: { light: 'Hell', dark: 'Dunkel', darkDeep: 'Tief Dunkel', auto: 'Automatisch' }
  },
  it: {
    app: { title: 'Deriv Pro', subtitle: 'Piattaforma di Trading Avanzata' },
    login: { token: 'Token', oauth: 'Deriv Auth', enterToken: 'Incolla il tuo token API', loginToken: 'Accedi con Token', loginDeriv: 'Accedi con Deriv' },
    nav: { home: 'Home', market: 'Mercato', trade: 'Negozia', history: 'Cronologia', bot: 'Bot', calculator: 'Calcolatrice', notes: 'Note', strategy: 'Strategie', settings: 'Impostazioni', logout: 'Esci' },
    disclaimer: { title: 'Avviso di Rischio', message: 'Deriv offre prodotti complessi che potrebbero non essere adatti a tutti. Assicurati di comprendere appieno i rischi prima di negoziare.', understand: 'Ok, Ho Capito', learnMore: 'Saperne di Più' },
    home: { overview: 'Panoramica', balance: 'Saldo Totale', profit: 'Profitto', trades: 'Operazioni', winRate: 'Tasso di Vincita' },
    market: { title: 'Mercato', search: 'Cerca mercati...', categories: 'Categorie', all: 'Tutti' },
    trade: { title: 'Negozia', select: 'Seleziona un asset', rise: 'Rialzo', fall: 'Ribasso', stake: 'Importo', duration: 'Durata', execute: 'Esegui', analysis: 'Analisi', prediction: 'Previsione', confidence: 'Confidenza' },
    bot: { title: 'Bot di Trading', start: 'Avvia Bot', stop: 'Ferma Bot', strategy: 'Strategia', config: 'Configurazione', stats: 'Statistiche', running: 'In Esecuzione' },
    history: { title: 'Cronologia', trades: 'Operazioni', pending: 'In Attesa', clear: 'Cancella' },
    calculator: { title: 'Calcolatrice', nextTrade: 'Prossima Entrata', calculate: 'Calcola' },
    notes: { title: 'Note', add: 'Aggiungi Nota', save: 'Salva', delete: 'Elimina' },
    strategy: { title: 'Costruttore Strategie', create: 'Crea Nuova', edit: 'Modifica', delete: 'Elimina', save: 'Salva' },
    settings: { title: 'Impostazioni', theme: 'Tema', language: 'Lingua', notifications: 'Notifiche', vibration: 'Vibrazione', analysis: 'Analisi Automatica' },
    themes: { light: 'Chiaro', dark: 'Scuro', darkDeep: 'Scuro Profondo', auto: 'Automatico' }
  },
  ar: {
    app: { title: 'Deriv Pro', subtitle: 'منصة تداول متقدمة' },
    login: { token: 'رمز', oauth: 'Deriv Auth', enterToken: 'الصق رمز API الخاص بك', loginToken: 'تسجيل الدخول بالرمز', loginDeriv: 'تسجيل الدخول بـ Deriv' },
    nav: { home: 'الرئيسية', market: 'السوق', trade: 'تداول', history: 'السجل', bot: 'بوت', calculator: 'حاسبة', notes: 'ملاحظات', strategy: 'استراتيجيات', settings: 'الإعدادات', logout: 'تسجيل خروج' },
    disclaimer: { title: 'تحذير من المخاطر', message: 'تقدم Deriv منتجات معقدة قد لا تكون مناسبة للجميع. تأكد من فهمك الكامل للمخاطر قبل التداول.', understand: 'حسنًا، فهمت', learnMore: 'معرفة المزيد' },
    home: { overview: 'نظرة عامة', balance: 'الرصيد الإجمالي', profit: 'الربح', trades: 'الصفقات', winRate: 'معدل الفوز' },
    market: { title: 'السوق', search: 'بحث في الأسواق...', categories: 'الفئات', all: 'الكل' },
    trade: { title: 'تداول', select: 'اختر أصل', rise: 'صعود', fall: 'هبوط', stake: 'المبلغ', duration: 'المدة', execute: 'تنفيذ', analysis: 'تحليل', prediction: 'توقع', confidence: 'الثقة' },
    bot: { title: 'بوت التداول', start: 'تشغيل البوت', stop: 'إيقاف البوت', strategy: 'الاستراتيجية', config: 'الإعدادات', stats: 'الإحصائيات', running: 'قيد التشغيل' },
    history: { title: 'السجل', trades: 'الصفقات', pending: 'قيد الانتظار', clear: 'مسح' },
    calculator: { title: 'الحاسبة', nextTrade: 'الدخول التالي', calculate: 'احسب' },
    notes: { title: 'ملاحظات', add: 'إضافة ملاحظة', save: 'حفظ', delete: 'حذف' },
    strategy: { title: 'منشئ الاستراتيجيات', create: 'إنشاء جديد', edit: 'تعديل', delete: 'حذف', save: 'حفظ' },
    settings: { title: 'الإعدادات', theme: 'المظهر', language: 'اللغة', notifications: 'الإشعارات', vibration: 'الاهتزاز', analysis: 'التحليل التلقائي' },
    themes: { light: 'فاتح', dark: 'داكن', darkDeep: 'داكن عميق', auto: 'تلقائي' }
  }
};

class TranslationService {
  constructor() {
    this.currentLanguage = localStorage.getItem(APP_CONFIG.storageKeys.language) || APP_CONFIG.settings.defaultLanguage;
    this.translations = TRANSLATIONS;
  }
  
  setLanguage(lang) {
    if (this.translations[lang]) {
      this.currentLanguage = lang;
      localStorage.setItem(APP_CONFIG.storageKeys.language, lang);
      this.updateUI();
      window.dispatchEvent(new CustomEvent('language_changed', { detail: lang }));
    }
  }
  
  get(key) {
    const keys = key.split('.');
    let value = this.translations[this.currentLanguage];
    
    for (const k of keys) {
      value = value?.[k];
      if (!value) break;
    }
    
    return value || key;
  }
  
  updateUI() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = this.get(key);
    });
  }
  
  getCurrentLanguage() {
    return this.currentLanguage;
  }
  
  getLanguages() {
    return APP_CONFIG.languages;
  }
}

const i18n = new TranslationService();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TranslationService, i18n, TRANSLATIONS };
}