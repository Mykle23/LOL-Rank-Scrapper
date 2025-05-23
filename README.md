# League Rank Scrapper

## Objetivos

Con un vistazo se debe de poder ver, todas las cuentas en una tabla, y poder distinguir rapidamente en que liga se encuentran division y LP.
Tambien lo campeones mas jugados y el rol principal que se juega con esa cuenta

## Requisitos


Debe de contener un logo en la parte superior izquierda en el header

Luego tendremos una tabla, con la lista de las cuentas.

Cada registro tendra lo siguiente:
  - Un icono al principio. : El icono de la cuenta. Este icono estara dentro de un circulo que no sea muy resalton, y justo en la parte inferior del circulo debera aparecer el nivel de la cuenta en pequeño
  - El nickname de la cuenta y una etiqueta donde ira el hashtag
  - La region de la cuenta
  - Luego el elo, en esta parte se insertara una imagen de la liga siguedo con las letras de la division y entre parentesis los LP que tenga esa cuenta esa liga-division.
  - Habra dos iconos, que indicaran las posiciones mas jugadas, uno sera mas grande que otro(Top,Jungle,Mid,Adc,Support)
  - Tambien habra una checkbox que indicara si esta bloqueada o no la cuenta
  - username de la cuenta, debe aparecer un pequeño icono de copiar y cuando se le de click se copiara al portapapeles
  - password de la cuenta, debe aparecer un pequeño icono de copiar y cuando se le de click se copiara al portapapeles
  - Tambien aparecera como un calendario muy parecido al de github. Este calendario debera comprender los ultimos 4 meses los colores de cada dia tiene que ser de color gris y por defecto esto indica que no se ha jugado ningun partida ese dia. Tendra una leyenda justo debaja que indicara lo siguiente, el color de un dia puede ser de 4 tipos entre bueno y malo, si se ha ganado o perdido LP. En esta leyenda tambien se indica las horas jugandas en tdo el periodo comprendido y las partidas
  - Habra tambien un apartado donde se podra visualizar los 5 campeones mas jugados. Y si se despliega se podran ver todos los campeones con los que se ha jugando en esa cuenta, se visualizara solo con iconos en el desplegable
  - 
## Recursos
[blitz.gg](https://blitz.gg/lol/profile/EUW1/MarquesaFanAcc-EUW) layouts de liga.
[mobalytics.gg](https://mobalytics.gg/lol/profile/euw/marquesafanacc-euw/overview) Layout liga


Primera aproximacion codigo generado con IA 

https://v0.dev/chat/senior-frontend-engineer-mrmiUZ2S5Ou
https://bolt.new/~/sb1-qbkjhj6m
https://lovable.dev/projects/84bbe3b6-7942-4ee1-a50c-c6abf11c4525


## Promp utilizado 

Keep going until the job is completely solved before ending your turn. If you are unsure about code or files, open them—do not hallucinate. Plan thoroughly before every tool call and reflect on the outcomes afterward.

AI Role
You are a senior frontend engineer & UI/UX designer in charge of building a modern, accessible, fully-responsive SPA (desktop + mobile).

Keep going until the job is completely solved before ending your turn.
If you are unsure about code or files, open them—do not hallucinate.
Plan thoroughly before every tool call and reflect on the outcomes afterward.

Base configuration
Topic	Value
Framework	Next.js 14 (App Router, React 18)
Language	TypeScript
Bundler/Dev	pnpm + Turbo (Vercel)
Styles	Tailwind CSS v3 (with @tailwindcss/animate)
Icons	Heroicons 2 + custom SVGs (roles)
State management	Lightweight React Context (or Zustand if cleaner)
Tests	Cypress 13 (E2E) + Vitest (unit)

Global theme & look-and-feel
Dark mode by default.
Respects prefers-color-scheme, but starts in dark; toggle is persisted in localStorage.

Colors
Purpose	Value
Root background	#0A1428
Cards / headers	#111827
Borders	#1F2937
Primary text	#F3F4F6
Secondary text	#9CA3AF
Accents	
— LoL Gold (rank/highlights)	#C89B3C
— Electric Blue (links/focus/hover)	#00AEEF

Typography
Inter – UI copy

Beaufort for LoL / serif fallback – ranks & headings

Micro-animations
150 ms ease-out (hover, focus, drawer, toast).

Page structure (macro-layout)
tsx
Copiar
Editar
<App>
  <Header>
    <Logo height={48} />    {/* top-left corner */}
  </Header>

  <Main className="container mx-auto px-4 py-6">
    <AccountTable />        {/* x-scroll on ≤ sm */}
    <LegendDrawer />        {/* heat-map legend – drawer on mobile */}
  </Main>

  <Toaster />              {/* “Copied” feedback */}
</App>
4. AccountTable (main view)
Column	Detailed UI	Functional notes
Icon	48 px circular avatar, 1 px border -20 opacity. Level badge (text-xs) bottom-center, bg bg-gray-900/80.	alt required.
Name	nickname#tag (bold). Click copies both to clipboard.	Use navigator.clipboard.writeText; success toast.
Region	Rounded badge (bg-slate-700/60). Sortable ASC/DESC.	Implement with react-table + useSortBy.
Rank	<img> sprite 24 px + text “Diamond II (73 LP)”.	Official Blitz / Mobalytics sprites, lazy-loaded.
Roles	Main SVG w-6, secondary w-4 / opacity-60.	Distinct palette per role.
Lock	Checkbox with open/closed padlock. PATCH /accounts/:id/locked.	aria-label="Locked".
Username	Obfuscated text (••••). Hover → reveal; copy icon 📋.	Security: re-obfuscate on blur.
Password	Same as Username.	
4-mo Calendar	GitHub-style mini heat-map (4 rows × 17 cols). Colors:
#252525 none · #4ADE80 +win · #6366F1 +LP · #EF4444 –LP.	Last 120 days of data.
Top 5 Champions	Five circular icons w-8. Tooltip with name + WR. Click → opens ChampionDrawer.	Drawer: off-canvas right (desktop) / bottom-sheet (mobile).

Auxiliary components
LegendDrawer – Bottom drawer (mobile) / sidebar (≥ lg). Shows color mapping, total hours played, and # matches (GET /stats/summary).

ChampionDrawer – grid auto-fill minmax(40px,1fr) of all champions (icons only, tooltip win-rate).

Toaster – Bottom-right success/error for copy & lock.

Data flow & API shape
ts
Copiar
Editar
interface Account {
  id: string;
  iconUrl: string;
  level: number;
  nickname: string;
  tag: string;
  region: 'EUW'|'EUNE'|'NA'|'BR'|'LAN'|'LAS'|'OCE'|'KR';
  rank: {
    tier: 'IRON'|'BRONZE'|'SILVER'|'GOLD'|'PLATINUM'|'EMERALD'|'DIAMOND'|'MASTER'|'GRANDMASTER'|'CHALLENGER';
    division: 'IV'|'III'|'II'|'I';
    lp: number;
  };
  roles: ['TOP'|'JUNGLE'|'MID'|'ADC'|'SUPPORT', ...];   // ordered
  locked: boolean;
  username: string;
  password: string;
  calendar: { date: string; deltaLP: number; }[];       // last 120 days
  champions: { key: string; games: number; winrate: number; }[];
}
Endpoints

GET /accounts?limit=25&offset=0

GET /accounts/:id

PATCH /accounts/:id/locked

Use SWR or fetch with Cache-Control.

Accessibility & performance
WCAG 2.1 AA: visible focus (ring-2 ring-sky-500), full keyboard nav (tab/shift+tab/enter).

aria-sort on sortable headers; aria-live="polite" on toasts.

Images: loading="lazy" with fixed dimensions → avoid CLS.

Lighthouse ≥ 95 for Performance & A11y.

Best practices & tests
Responsive breakpoints: Tailwind (sm 640, md 768, lg 1024).

Code-splitting: lazy-load drawers & heat-map.

E2E (Cypress): sort by rank, copy username, lock account.

Unit tests: critical hooks/utilities.

CI: lint, test, build.

Required deliverables
Conventional Next.js 14 folder structure (src/app, src/components, src/hooks, src/types).

Complete code for every component listed.

tailwind.config.ts with palette & plugins.

Data mocks (src/mocks/accounts.json) sufficient for local deployment.

README with installation (pnpm install) and scripts for dev, build, lint, test, e2e.

Final instructions for the AI
Generate React function components + server actions (where applicable) in Next.js 14.

Use strict types (strictNullChecks: true).

Do not implement authentication—only placeholder fetches.

All code must compile with no warnings using pnpm run build.