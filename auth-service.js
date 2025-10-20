// auth-service.js
// Depende de: app-config.js
// Fornece: window.authService

(function() {
  if (!window.APP_CONFIG) {
    console.error('APP_CONFIG não encontrado. Carregue app-config.js antes de auth-service.js');
  }
  
  const STORAGE = window.APP_CONFIG && window.APP_CONFIG.storageKeys ? window.APP_CONFIG.storageKeys : {
    token: 'deriv_pro_token',
    user: 'deriv_pro_user'
  };
  
  const authService = {
    _oauthListenerAdded: false,
    
    loginWithToken: async function(token) {
      if (!token) throw new Error('Token vazio');
      try {
        localStorage.setItem(STORAGE.token, token);
      } catch (e) {
        console.warn('Não foi possível salvar token no localStorage', e);
      }
      
      // tenta conectar via apiService (apiService deve estar disponível globalmente)
      if (!window.apiService) {
        // apiService pode não estar carregado ainda — tentar conectar depois
        return new Promise((resolve, reject) => {
          // retentar quando apiService disponível
          const check = setInterval(() => {
            if (window.apiService) {
              clearInterval(check);
              window.apiService.connect(token).then(() => resolve(true)).catch(err => {
                // remove token se falhar
                try { localStorage.removeItem(STORAGE.token); } catch (e) {}
                reject(err);
              });
            }
          }, 200);
          // timeout 10s
          setTimeout(() => {
            clearInterval(check);
            reject(new Error('apiService não inicializado'));
          }, 10000);
        });
      } else {
        try {
          await window.apiService.connect(token);
          return true;
        } catch (err) {
          try { localStorage.removeItem(STORAGE.token); } catch (e) {}
          throw err;
        }
      }
    },
    
    loginWithOAuth: function() {
      const cfg = window.APP_CONFIG.oauth;
      const url = new URL(cfg.authUrl);
      url.searchParams.set('client_id', cfg.clientId);
      url.searchParams.set('redirect_uri', cfg.redirectUri);
      // usar response_type=token para fluxo implicito no browser (ajuste conforme necessário)
      url.searchParams.set('response_type', 'token');
      url.searchParams.set('scope', cfg.scopes.join(' '));
      // opcional: state
      // abrir janela popup para o fluxo OAuth
      window.open(url.toString(), '_blank', 'width=600,height=800');
      // auth-callback.html deve extrair token e postar de volta com postMessage
    },
    
    _initOAuthListener: function() {
      if (this._oauthListenerAdded) return;
      window.addEventListener('message', async (ev) => {
        try {
          if (!ev.data) return;
          if (ev.data && ev.data.type === 'DERIV_TOKEN' && ev.data.token) {
            await authService.loginWithToken(ev.data.token);
            // Se existir app global, mostra app e inicializa
            window.app?.showScreen?.('app');
            window.app?.initializeApp?.();
          }
        } catch (e) {
          console.error('Erro no listener OAuth:', e);
        }
      });
      this._oauthListenerAdded = true;
    },
    
    setUser: function(userObj) {
      try {
        localStorage.setItem(STORAGE.user, JSON.stringify(userObj || {}));
      } catch (e) {
        console.warn('Falha ao salvar user:', e);
      }
    },
    
    getUser: function() {
      try {
        const raw = localStorage.getItem(STORAGE.user);
        return raw ? JSON.parse(raw) : null;
      } catch (e) {
        return null;
      }
    },
    
    getToken: function() {
      try {
        return localStorage.getItem(STORAGE.token);
      } catch (e) {
        return null;
      }
    },
    
    logout: function() {
      try {
        localStorage.removeItem(STORAGE.token);
        localStorage.removeItem(STORAGE.user);
      } catch (e) { /* ignore */ }
      try { window.apiService?.disconnect?.(); } catch (e) {}
    },
    
    checkAuth: async function() {
      const token = this.getToken();
      if (!token) return false;
      try {
        if (!window.apiService?.isConnected) {
          await window.apiService.connect(token);
        }
        return true;
      } catch (err) {
        console.warn('checkAuth falhou:', err);
        this.logout();
        return false;
      }
    }
  };
  
  authService._initOAuthListener();
  window.authService = authService;
})();