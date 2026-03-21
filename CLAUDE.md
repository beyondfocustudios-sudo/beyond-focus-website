@AGENTS.md

# Beyond Focus Website

## Sobre
Website oficial da Beyond Focus, produtora audiovisual baseada em Setúbal, Portugal.
Posicionamento: "O teu Departamento Criativo Externo"
Motto: "Vamos além do expectável."

## Stack
- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion (animações)
- Remotion (video rendering para loading animation)
- Vercel (deploy)

## Brand Colors
| Nome | Hex | Uso |
|---|---|---|
| Cream | #FAF9F7 | Background principal, loading screen |
| Background Light | #F5F5F5 | Secções light alternativas |
| Background Alt | #eceef4 | Variante |
| Petrol Dark | #0E3A45 | Cor primária, texto, elementos |
| Petrol Deep | #070f13 | Secções dark (hero, testimonials, CTA) |
| Orange Accent | #FA8334 | CTAs, destaques, hover states |

IMPORTANTE: Não usar cores fora da marca. #1A8FA3 (teal) NÃO é cor da marca.

## Tipografia
- DM Serif Display — títulos e headings
- DM Sans — corpo e UI
- JetBrains Mono — metadata, labels técnicos

## Design Patterns
- Espaçamento: grid 8px
- Bordas: 8-12px (cards 18-24px)
- Transições: 200-300ms ease
- Animações: max 400ms, spring para interações
- Tom visual: predominantemente claro com secções escuras pontuais

## Páginas
- / (Home)
- /portfolio + /portfolio/[slug]
- /servicos
- /portal-cliente
- /sobre
- /blog + /blog/[slug]
- /contacto
- /privacidade
- /termos

## Navegação
Início · Portfolio · Serviços · Portal · Sobre · Blog · Contacto · [CTA: Fala Connosco]

## Remotion
A pasta /remotion contém o projecto de rendering da animação de loading.
Para preview: npx remotion studio remotion/index.ts
Para render: npx remotion render remotion/index.ts BeyondFocusLoading public/videos/loading.mp4

## Convenções
- Server Components por defeito
- Client Components só quando necessário (interactividade, motion)
- Commits descritivos em inglês
- Branches: feat/[nome-da-feature]
- UI em Português Europeu
