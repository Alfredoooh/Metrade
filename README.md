# Deriv Pro Trading - Mobile App

## 📱 Aplicação Mobile Profissional de Trading

Uma aplicação web progressiva (PWA) completa para trading na plataforma Deriv, com design Material Design 3, suporte multilíngue e recursos avançados.

## ✨ Características

### 🎨 Design & Interface
- **Material Design 3** com componentes Expressive
- **Material Symbols Rounded** (sem emojis)
- **Tema Claro/Escuro** com suporte automático
- **Responsive Design** - Mobile-first approach
- **Bottom Navigation** nativa do Android
- **Navigation Drawer** Material Design
- **Animações Fluidas** com transições suaves

### 🔐 Autenticação & Segurança
- **OAuth 2.0** integração com Deriv
- **Token Authentication** via API
- **Criptografia** de dados locais (Base64/AES)
- **Session Management** com expiração automática
- **Secure Storage** para dados sensíveis

### 📊 Funcionalidades de Trading
- **30+ Mercados** disponíveis
  - Forex (EUR/USD, GBP/USD, etc.)
  - Criptomoedas (BTC, ETH, etc.)
  - Índices de Volatilidade (R_10, R_25, etc.)
  - Commodities (Ouro, Prata, Petróleo)
  - Índices Sintéticos (BOOM, CRASH)
- **Gráficos em Tempo Real** com Chart.js
- **Múltiplos Tipos de Contratos**
  - Rise/Fall
  - Even/Odd
  - Over/Under
  - Match/Differ
- **Histórico Completo** de trades
- **Estatísticas Detalhadas**
  - Win Rate
  - Lucro Total
  - Total de Trades
  - Engajamento

### 🌍 Internacionalização
- **10+ Idiomas** suportados
  - Português (pt)
  - English (en)
  - Español (es)
  - Français (fr)
  - Deutsch (de)
  - Italiano (it)
  - Русский (ru)
  - 中文 (zh)
  - 日本語 (ja)
  - العربية (ar)
- **Formatação Automática** de moeda, data e números
- **Tradução Dinâmica** sem reload

### 🔔 Notificações & Alertas
- **Snackbar Material** para mensagens
- **Alertas de Trade** em tempo real
- **Notificações Push** (preparado para PWA)

## 📂 Estrutura de Arquivos

```
deriv-pro-trading/
│
├── index.html              # Página principal
├── auth-callback.html      # OAuth callback
├── styles.css              # Estilos completos MD3
├── config.js               # Configurações & Segurança
├── i18n.js                 # Sistema de tradução
├── auth.js                 # Autenticação OAuth/Token
├── api.js                  # Integração Deriv API
├── markets.js              # Gerenciamento de mercados
├── chart.js                # Componente de gráfico
├── app.js                  # Lógica principal da aplicação
└── README.md               # Esta documentação
```

## 🚀 Instalação & Deploy

### GitHub Pages

1. **Crie um repositório no GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/deriv-pro-trading.git
   git push -u origin main
   ```

2. **Configure GitHub Pages**
   - Vá em Settings > Pages
   - Source: Deploy from branch
   - Branch: main / root
   - Clique em Save

3. **Atualize o config.js**
   ```javascript
   authRedirectUrl: 'https://SEU-USUARIO.github.io/deriv-pro-trading/auth-callback.html'
   ```

### Netlify (Recomendado)

1. **Deploy via Git**
   ```bash
   # Instale Netlify CLI
   npm install -g netlify-cli
   
   # Login
   netlify login
   
   # Deploy
   netlify deploy --prod
   ```

2. **Atualize o config.js**
   ```javascript
   authRedirectUrl: 'https://SEU-SITE.netlify.app/auth-callback.html'
   ```

### Vercel

1. **Deploy via CLI**
   ```bash
   # Instale Vercel CLI
   npm install -g vercel
   
   # Deploy
   vercel --prod
   ```

## 🔧 Configuração

### 1. App ID Deriv

Obtenha seu App ID em: https://app.deriv.com/account/api-token

```javascript
// config.js
const APP_CONFIG = {
  appId: 'SEU_APP_ID_BASE64',
  // ou direto
  decodedAppId: 'SEU_APP_ID'
}
```

### 2. OAuth Redirect URL

No painel Deriv, configure:
- **Redirect URL**: `https://seu-dominio.com/auth-callback.html`
- **Scopes**: `read`, `trade`, `trading_information`

### 3. Customização

```javascript
// config.js
const APP_CONFIG = {
  appName: 'Seu App Name',
  defaultLanguage: 'pt',
  limits: {
    minStake: 0.35,
    maxStake: 50000
  }
}
```

## 📱 Uso da Aplicação

### Login

**Opção 1: OAuth (Recomendado)**
1. Clique em "Entrar com Deriv OAuth"
2. Autorize o aplicativo
3. Você será redirecionado automaticamente

**Opção 2: Token API**
1. Obtenha seu token em Deriv
2. Cole no campo "Token da API"
3. Clique em "Conectar com Token"

### Navegação

- **Home**: Dashboard com portfólio e estatísticas
- **Mercados**: Lista de todos os mercados disponíveis
- **Negociar**: Execução de trades
- **Histórico**: Visualização de trades anteriores
- **Configurações**: Personalização do app

### Executar Trade

1. Vá para "Mercados" ou "Negociar"
2. Selecione o ativo
3. Escolha o tipo de contrato (Rise/Fall)
4. Defina valor e duração
5. Clique em "Executar Trade"

## 🔒 Segurança

- **Criptografia Local**: Dados sensíveis são criptografados
- **Session Timeout**: 24 horas de inatividade
- **Secure WebSocket**: Conexão SSL/TLS
- **No Backend Required**: Sem servidor intermediário
- **Token Never Stored Plaintext**: Sempre codificado

## 🎨 Personalização de Tema

```javascript
// Programaticamente
document.documentElement.setAttribute('data-theme', 'dark');

// Via interface
Settings > Theme > Toggle switch
```

## 🌐 Adicionando Novos Idiomas

```javascript
// i18n.js
translations.pt_BR = {
  'nav.home': 'Início',
  'nav.markets': 'Mercados',
  // ... mais traduções
}
```

## 📊 Estrutura de Dados

### Trade Object
```javascript
{
  id: 'contract_id',
  type: 'CALL',
  amount: 10.00,
  symbol: 'R_100',
  duration: 5,
  durationUnit: 't',
  status: 'win', // 'win', 'loss', 'pending'
  profit: 9.50,
  time: 1234567890
}
```

### Market Object
```javascript
{
  symbol: 'R_100',
  displayName: 'Volatility 100 Index',
  market: 'synthetic_index',
  category: 'volatility',
  isTrading: true,
  pip: 0.01
}
```

## 🐛 Troubleshooting

### WebSocket não conecta
- Verifique o App ID
- Confirme que está usando HTTPS (não HTTP)
- Verifique firewall/proxy

### OAuth não funciona
- Confirme o Redirect URL no Deriv
- Use HTTPS obrigatoriamente
- Verifique se o App ID está correto

### Gráfico não carrega
- Verifique se Chart.js está carregado
- Confirme conexão WebSocket ativa
- Limpe cache do navegador

## 📝 Changelog

### v1.0.0 (2025-01-XX)
- ✅ Lançamento inicial
- ✅ Material Design 3 completo
- ✅ 30+ mercados
- ✅ 10+ idiomas
- ✅ OAuth + Token authentication
- ✅ Charts em tempo real
- ✅ Histórico completo
- ✅ Tema claro/escuro

## 📄 Licença

MIT License - Use livremente, modifique e distribua.

## 🤝 Contribuindo

Contribuições são bem-vindas!

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📧 Suporte

Para questões sobre a API Deriv: https://api.deriv.com/
Para issues do app: Abra uma issue no GitHub

## ⚠️ Disclaimer

Este aplicativo é para fins educacionais. Trading envolve riscos financeiros. Use por sua conta e risco.

---

**Desenvolvido com ❤️ usando Material Design 3**