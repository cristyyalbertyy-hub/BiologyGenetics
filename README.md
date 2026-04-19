# Biology and Genetics (Studio9)

App web React (Vite + TypeScript) para navegar por capítulos e subcapítulos de *Biology and Genetics*, com login por email/palavra-passe e ecrã de média (vídeo, áudio, podcast).

## Como correr

```bash
npm install
npm run dev
```

Abre o URL indicado no terminal (por exemplo `http://localhost:5173/`). Com o **HashRouter**, o endereço inclui `#` (ex.: `http://localhost:5173/#/login`) — é normal.

O fluxo é: **login → capítulo → tema → subtópico → vídeo / áudio / podcast** (estrutura em `src/data/curriculum.ts`).

### Página em branco?

1. **Não abras** `index.html` ou `dist/index.html` com duplo clique no Explorador: os scripts não carregam bem assim. Usa sempre `npm run dev` ou, após `npm run build`, `npm run preview`.
2. Se vires só o texto “A carregar a aplicação…”, o JavaScript não arrancou; confirma a consola (F12 → Consola) e que estás no URL do Vite.
3. Após `build`, os ficheiros em `dist/` usam caminhos relativos; o `preview` do Vite é a forma correcta de testar a produção.

## Credenciais de demonstração

Definidas em `src/auth.ts` (valores por omissão):

- **Email:** `student@biology.genetics`
- **Palavra-passe:** `genetics2026`

Opcionalmente, podes criar um ficheiro `.env` na raiz:

```env
VITE_AUTH_EMAIL=o@teu.email
VITE_AUTH_PASSWORD=palavra
```

## Onde editar conteúdo

| Ficheiro | Conteúdo |
|----------|----------|
| `src/data/curriculum.ts` | Títulos dos capítulos/subcapítulos e URLs de demonstração (`DEMO_MEDIA`) |
| `src/auth.ts` | Credenciais e sessão |

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção para `dist/` |
| `npm run preview` | Servir o `dist/` localmente |
| `npm run lint` | ESLint |

---

Este projeto foi criado com [Vite](https://vite.dev/) e o template React + TypeScript. Para configuração avançada do ESLint e opções do template, vê a [documentação do Vite](https://vite.dev/guide/).
