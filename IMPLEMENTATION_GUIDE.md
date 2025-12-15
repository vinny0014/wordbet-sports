# WordBet AI - Guia de Implementação das Novas Funcionalidades

## Resumo das Mudanças

Este guia descreve as novas funcionalidades adicionadas ao repositório wordbet-sports:

1. ✅ **Sistema de Banco de Dados** (Drizzle ORM + MySQL)
2. ✅ **API de Automação de Publicação** (Cron Job a cada 4 horas)
3. ✅ **Sistema de Votação** (Anti-fraude com IP Hash)
4. ✅ **SEO e Google AdSense** (robots.txt, sitemap, schema)

## Arquivos Adicionados

### Backend (API)

```
api/
├── db/
│   ├── schema.ts          # Definição das tabelas Drizzle
│   └── index.ts           # Configuração do banco de dados
├── cron.ts                # Cron job para automação de publicação
└── votes.ts               # API de votação com anti-fraude
```

### Configuração

```
├── .env.example           # Variáveis de ambiente necessárias
├── vercel.json            # Configuração atualizada com cron job
└── IMPLEMENTATION_GUIDE.md # Este arquivo
```

### SEO

```
public/
└── robots.txt             # Arquivo robots.txt para SEO
```

## Passo a Passo de Implementação

### 1. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
DATABASE_URL=mysql://user:password@host:3306/wordbet
GEMINI_API_KEY=your_gemini_api_key
CRON_SECRET=your_cron_secret
VITE_GA_ID=G-XXXXXXXXXX
VITE_ADSENSE_ID=ca-pub-xxxxxxxxxxxxxxxx
VITE_APP_TITLE=WordBet AI - Notícias Esportivas Autônomas
VITE_APP_URL=https://wordbet.com.br
```

### 2. Criar Banco de Dados

Execute as migrations do Drizzle para criar as tabelas:

```bash
# Instalar drizzle-kit
npm install -D drizzle-kit

# Gerar migrations
npx drizzle-kit generate

# Executar migrations
npx drizzle-kit migrate
```

### 3. Instalar Dependências

```bash
npm install drizzle-orm mysql2 express cors dotenv zod @types/express
```

### 4. Configurar Variáveis no Vercel

Acesse o painel Vercel e adicione as variáveis de ambiente:

- `DATABASE_URL` - String de conexão MySQL
- `CRON_SECRET` - Token secreto para validar requisições de cron
- `GEMINI_API_KEY` - Chave da API Gemini
- `VITE_GA_ID` - ID do Google Analytics 4
- `VITE_ADSENSE_ID` - ID do Google AdSense

### 5. Deploy

```bash
# Fazer commit das mudanças
git add .
git commit -m "feat: adicionar automação, votação e SEO"

# Push para GitHub
git push origin main

# Vercel fará deploy automaticamente
```

## Estrutura do Banco de Dados

### Tabela: articles

Armazena artigos gerados por IA.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | INT | ID único |
| title | VARCHAR(255) | Título do artigo |
| content | TEXT | Conteúdo em markdown |
| category | ENUM | Categoria (CHAMPIONS, BRASILEIRAO, MERCADO, TECH, MASCOTES) |
| author | VARCHAR(100) | Autor IA |
| precision | INT | Precisão (70-99) |
| slug | VARCHAR(255) | URL slug único |
| imageUrl | VARCHAR(500) | URL da imagem |
| mascotId | INT | ID do mascote (opcional) |
| timestamp | TIMESTAMP | Data/hora do artigo |
| createdAt | TIMESTAMP | Data de criação |
| updatedAt | TIMESTAMP | Data de atualização |

### Tabela: mascots

Galeria de mascotes.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | INT | ID único |
| name | VARCHAR(100) | Nome do mascote |
| team | VARCHAR(100) | Time associado |
| imageUrl | VARCHAR(500) | URL da imagem |
| personality | TEXT | Descrição da personalidade |
| catchphrase | VARCHAR(255) | Bordão característico |
| archetype | VARCHAR(50) | Arquétipo (herói, vilão, etc.) |
| createdAt | TIMESTAMP | Data de criação |
| updatedAt | TIMESTAMP | Data de atualização |

### Tabela: votes

Sistema de votação com anti-fraude.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | INT | ID único |
| articleId | INT | ID do artigo |
| weekId | VARCHAR(20) | Semana ISO (YYYY-WXX) |
| ipHash | VARCHAR(64) | Hash SHA256 do IP |
| voteCount | INT | Número de votos |
| createdAt | TIMESTAMP | Data de criação |
| updatedAt | TIMESTAMP | Data de atualização |

### Tabela: publication_logs

Log de publicações automáticas.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | INT | ID único |
| status | ENUM | Status (SUCCESS, ERROR, PENDING) |
| articlesPublished | INT | Número de artigos publicados |
| errorMessage | TEXT | Mensagem de erro (se houver) |
| createdAt | TIMESTAMP | Data de criação |
| updatedAt | TIMESTAMP | Data de atualização |

### Tabela: zoeira_comments

Comentários humorísticos de agentes IA.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | INT | ID único |
| agent | VARCHAR(100) | Nome do agente IA |
| comment | TEXT | Comentário |
| likes | INT | Número de curtidas |
| timestamp | TIMESTAMP | Data/hora do comentário |
| createdAt | TIMESTAMP | Data de criação |
| updatedAt | TIMESTAMP | Data de atualização |

## APIs Disponíveis

### POST /api/cron

Executa o pipeline de automação de publicação (chamado automaticamente a cada 4 horas).

**Headers:**
```
Authorization: Bearer {CRON_SECRET}
```

**Response:**
```json
{
  "success": true,
  "articlesPublished": 3,
  "timestamp": "2025-12-15T12:00:00Z"
}
```

### POST /api/votes

Registra um voto em um artigo.

**Body:**
```json
{
  "articleId": 1
}
```

**Response:**
```json
{
  "success": true,
  "message": "Voto registrado com sucesso"
}
```

### GET /api/votes

Obtém os 10 artigos mais votados da semana.

**Response:**
```json
{
  "success": true,
  "topArticles": [
    {
      "articleId": 1,
      "totalVotes": 450
    }
  ]
}
```

## SEO e Google AdSense

### robots.txt

O arquivo `public/robots.txt` foi criado para indicar aos motores de busca quais páginas indexar.

### sitemap.xml

Configure um endpoint `/api/sitemap` para gerar sitemap dinâmico com todos os artigos.

### Schema Article (JSON-LD)

Adicione schema Article em cada página de artigo para melhor indexação:

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "Título do Artigo",
  "description": "Descrição breve",
  "image": "https://exemplo.com/imagem.jpg",
  "datePublished": "2025-12-15T12:00:00Z",
  "author": {
    "@type": "Person",
    "name": "IA Tática v2.1"
  }
}
</script>
```

### Google Analytics 4

Adicione o código GA4 no arquivo `index.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Google AdSense

1. Acesse adsense.google.com
2. Adicione o site wordbet.com.br
3. Adicione o código AdSense no `index.html`:

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-xxxxxxxxxxxxxxxx"
     crossorigin="anonymous"></script>
```

4. Adicione disclaimer de conteúdo gerado por IA em todas as páginas

## Monitoramento

### Logs de Publicação

Acesse a tabela `publication_logs` para visualizar:
- Horário de execução do cron
- Status (sucesso/erro)
- Número de artigos publicados
- Mensagens de erro

### Métricas de Engajamento

- Votação por artigo (semanalmente)
- Comentários Zoeira mais populares
- Taxa de clique por categoria
- Tempo de leitura médio

## Troubleshooting

### Cron job não executando

1. Verificar se `vercel.json` está correto
2. Verificar logs no painel Vercel
3. Testar endpoint manualmente: `curl -H "Authorization: Bearer {CRON_SECRET}" https://wordbet.com.br/api/cron`

### Artigos não sendo publicados

1. Verificar `DATABASE_URL`
2. Verificar logs em `publication_logs`
3. Verificar se LLM API está acessível
4. Verificar quota de requisições da API

### Votação não funcionando

1. Verificar se anti-fraude está ativo (ipHash)
2. Verificar se weekId está sendo gerado corretamente
3. Limpar cache do navegador

## Próximos Passos

1. **Integrar com APIs de Futebol Reais:** ESPN, Sofascore, Flash Score
2. **Implementar Notificações Push:** Alertar usuários sobre novas notícias
3. **Adicionar Sistema de Comentários:** Permitir que usuários comentem artigos
4. **Implementar Ranking de Agentes IA:** Mostrar qual agente gerou melhor conteúdo
5. **Adicionar Seção Premium:** Paywall para conteúdo exclusivo

## Suporte

Para dúvidas ou problemas, abra uma issue no repositório GitHub.

---

**Versão:** 1.0.0
**Data:** 15/12/2025
**Autor:** Manus AI
