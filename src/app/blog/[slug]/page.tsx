import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/sections/Footer";
import { getBlogPost, BLOG_POSTS } from "@/lib/blog-data";
import { BreadcrumbSchema } from "@/components/seo/BreadcrumbSchema";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { BlogEmailCapture } from "@/components/features/blog/BlogEmailCapture";
import { BlogInlineCapture } from "@/components/features/leads/BlogInlineCapture";
import { BlogStickyBanner } from "@/components/features/blog/BlogStickyBanner";
import { IndustryLeadMagnet, type Sector } from "@/components/features/leads/IndustryLeadMagnet";
import { SERVICES_SEO, CITIES } from "@/lib/programmatic-seo-data";

const POST_FAQS: Record<string, { question: string; answer: string }[]> = {
  "quanto-custa-video-institucional-portugal": [
    { question: "Quanto custa um vídeo institucional em Portugal?", answer: "Um vídeo institucional em Portugal custa entre €1.500 e €15.000+, dependendo da complexidade, duração e nível de produção. A maioria das empresas médias investe entre €3.000 e €7.000 para um vídeo de 2 a 3 minutos com qualidade profissional." },
    { question: "O que influencia o preço de um vídeo institucional?", answer: "Os principais factores são: complexidade do guião e narrativa, número de dias de filmagem, dimensão da equipa, extensão da pós-produção (colour grading, motion graphics, sound design) e número de versões entregues para diferentes plataformas." },
    { question: "Qual é o prazo típico para produzir um vídeo institucional?", answer: "O prazo típico é de 3 a 6 semanas: 1-2 semanas de pré-produção (guião, localizações, casting), 1-2 dias de filmagem, e 2-4 semanas de pós-produção. Projectos mais complexos podem levar até 8 semanas." },
    { question: "Vale a pena investir num vídeo institucional?", answer: "Sim. Um vídeo institucional bem feito é um activo de comunicação com vida útil de 2 a 5 anos. Fica no website, nas redes sociais, em apresentações comerciais. O retorno é medível em tempo poupado em reuniões de apresentação e em credibilidade junto de clientes e investidores." },
  ],
  "como-escolher-produtora-audiovisual": [
    { question: "Como escolher a produtora audiovisual certa?", answer: "Avalia o portfolio com espírito crítico (não apenas os trabalhos mais vistosos), verifica se fazem perguntas sobre o teu negócio antes de apresentar soluções, pede referências de clientes anteriores e compara propostas com o mesmo nível de detalhe." },
    { question: "O que devo pedir numa proposta de produção audiovisual?", answer: "Pede: tratamento criativo detalhado, cronograma de produção, equipa envolvida, número de revisões incluídas, formatos de entrega e condições de pagamento. Propostas genéricas sem detalhe criativo são sinal de alerta." },
    { question: "Qual a diferença entre uma produtora cara e uma barata?", answer: "A diferença raramente está apenas na qualidade da imagem. Está na profundidade estratégica, no processo de aprovação, na qualidade da pós-produção (colour grading, sound design) e no compromisso com o resultado final — não apenas com a entrega técnica." },
  ],
  "porque-empresa-precisa-video-2026": [
    { question: "Porquê é que as empresas precisam de vídeo em 2026?", answer: "O vídeo é actualmente o formato com maior alcance orgânico nas redes sociais, o conteúdo mais consumido em dispositivos móveis e o principal elemento de confiança em websites B2B. Empresas sem estratégia de vídeo perdem visibilidade para concorrentes que a têm." },
    { question: "Quanto custa começar a fazer vídeo para uma empresa?", answer: "Depende do nível de produção pretendido. Um vídeo institucional de entrada custa a partir de €1.500; um pacote de conteúdo mensal para redes sociais começa nos €800 mensais. O custo de não ter vídeo — em leads perdidos e menor confiança — é tipicamente superior." },
    { question: "Qual o tipo de vídeo com melhor retorno para empresas?", answer: "Os vídeos de testemunho de clientes e os filmes institucionais têm consistentemente o melhor retorno: aumentam a taxa de conversão em websites e reduzem o ciclo de venda ao responder antecipadamente às objecções mais comuns." },
    { question: "Como medir o retorno de vídeo para uma empresa?", answer: "Os indicadores mais relevantes são: tempo de permanência no website, taxa de cliques em anúncios com vídeo vs. imagem, leads gerados via landing pages com vídeo e feedback qualitativo de clientes sobre como conheceram a empresa." },
  ],
  "video-institucional-vs-filme-comercial": [
    { question: "Qual a diferença entre vídeo institucional e filme comercial?", answer: "Um vídeo institucional apresenta a empresa, os seus valores e a sua equipa — é para ganhar confiança. Um filme comercial promove um produto ou serviço específico com o objectivo directo de gerar vendas ou reconhecimento de marca. Os dois complementam-se mas têm objectivos distintos." },
    { question: "Quanto custa um filme comercial em Portugal?", answer: "Um filme comercial profissional em Portugal começa nos €3.000 para produções simples e pode chegar a €30.000 ou mais em produções com elenco, localizações múltiplas e efeitos de pós-produção avançados. A maioria das PMEs investe entre €5.000 e €12.000." },
    { question: "Qual devo escolher: vídeo institucional ou filme comercial?", answer: "Se a tua empresa está a construir presença de mercado ou a fazer pitch para parceiros e investidores, começa pelo vídeo institucional. Se já tens notoriedade e queres converter audiência em clientes para uma oferta específica, o filme comercial é mais eficaz." },
    { question: "Pode um vídeo servir os dois propósitos?", answer: "É possível criar um vídeo híbrido que apresenta a empresa e promove simultaneamente um serviço, mas o resultado tende a ser menos eficaz nos dois objectivos. Para campanhas com orçamento definido, é preferível criar peças separadas e bem focadas." },
  ],
  "como-preparar-empresa-filmagem": [
    { question: "Como preparar a minha empresa para um dia de filmagem?", answer: "Define com antecedência: espaços a filmar (limpos e organizados), pessoas envolvidas e os seus horários, mensagens-chave a transmitir e quem aprova o resultado final. Comunica a toda a equipa para evitar interrupções e garante que os espaços representam a imagem que queres projectar." },
    { question: "Quanto tempo dura normalmente um dia de filmagem?", answer: "Um dia de filmagem profissional dura entre 8 e 10 horas. Inclui montagem de equipamento, filmagem propriamente dita e desmontagem. Localizações múltiplas ou entrevistas com vários colaboradores podem exigir dois dias de rodagem." },
    { question: "O que devo preparar para as entrevistas em vídeo?", answer: "Prepara os pontos principais que cada pessoa deve abordar — não um guião decorado, mas tópicos concretos. Escolhe vestuário sólido (evita padrões e branco puro), e opta por localizações com iluminação natural lateral ou fundos que reflictam a identidade da empresa." },
    { question: "Preciso de contratar actores ou pode ser a equipa interna?", answer: "Para vídeos institucionais, a equipa interna é frequentemente a melhor opção: transmite autenticidade e reforça a identidade da empresa. Para filmes comerciais com narrativa mais elaborada, pode ser vantajoso complementar com actores ou modelos profissionais." },
  ],
  "storytelling-visual-marca": [
    { question: "O que é storytelling visual e porque é importante para uma marca?", answer: "Storytelling visual é a capacidade de comunicar a identidade, os valores e o propósito de uma marca através de imagens, vídeo e composição visual — sem depender apenas de texto. Marcas com storytelling visual consistente são reconhecidas mais rapidamente e retidas na memória por mais tempo." },
    { question: "Como aplicar storytelling visual numa empresa pequena?", answer: "Começa por definir três elementos: a origem da empresa (porquê existe), o cliente que serve (quem é e qual o seu desafio) e a transformação que proporciona. Com esses três elementos tens a estrutura de qualquer peça visual eficaz — desde um vídeo institucional a uma publicação nas redes sociais." },
    { question: "Qual a diferença entre identidade visual e storytelling visual?", answer: "Identidade visual é o sistema de elementos gráficos (logótipo, cores, tipografia). Storytelling visual é a forma como esses elementos são usados para contar uma história. Uma marca pode ter uma identidade visual forte e ainda assim falhar na comunicação se não tiver uma narrativa coerente." },
  ],
  "erros-comuns-primeiro-video-empresa": [
    { question: "Quais são os erros mais comuns no primeiro vídeo de uma empresa?", answer: "Os cinco erros mais frequentes são: tentar dizer tudo num único vídeo, não definir um público-alvo específico, neglicenciar o áudio em favor da imagem, não ter um apelo à acção claro e escolher a produtora com base apenas no preço mais baixo." },
    { question: "Como evitar que o vídeo da empresa pareça amador?", answer: "Três elementos fazem a maior diferença: áudio limpo (microfone dedicado, não o interno da câmara), iluminação adequada (luz natural bem posicionada ou iluminação artificial profissional) e uma narrativa clara com início, desenvolvimento e conclusão." },
    { question: "Devo filmar o primeiro vídeo internamente ou contratar uma produtora?", answer: "Para vídeos que vão representar a empresa em contextos comerciais — website, apresentações, LinkedIn — uma produtora profissional é o investimento certo. Produção interna é adequada para conteúdo diário de redes sociais com menor exigência técnica." },
  ],
  "cobertura-eventos-conteudo": [
    { question: "Quanto custa a cobertura vídeo de um evento empresarial?", answer: "A cobertura vídeo de um evento em Portugal custa geralmente entre €800 e €4.000, dependendo da duração do evento, número de câmaras, cobertura de palco e entrevistas incluídas. Entregas simples (highlight de 2 minutos) são mais acessíveis que pacotes multi-formato." },
    { question: "Que conteúdo consigo criar a partir de uma cobertura de evento?", answer: "Um dia de evento bem coberto produz: um filme principal de 2-5 minutos, 10 a 20 clips curtos para redes sociais, fotografias de arquivo, entrevistas individuais com oradores, e conteúdo para newsletter. É um dos investimentos com maior rendimento de conteúdo por euro gasto." },
    { question: "Com que antecedência devo contratar a produtora para um evento?", answer: "O ideal é contratar com 3 a 6 semanas de antecedência. Isso permite planear a cobertura, conhecer o espaço, coordenar com a organização do evento e garantir que a equipa está alinhada com os momentos-chave a não perder." },
    { question: "Preciso de autorização dos participantes para publicar o vídeo do evento?", answer: "Sim, especialmente para eventos com participantes externos ou quando os rostos são claramente identificáveis. A forma mais prática é incluir uma cláusula de consentimento no registo do evento ou ter sinalética visível à entrada a informar da captação de imagens." },
  ],
  "video-linkedin-leads-b2b": [
    { question: "Que tipo de vídeo funciona melhor no LinkedIn para gerar leads B2B?", answer: "No LinkedIn, os vídeos que melhor convertem são: testemunhos de clientes (prova social), vídeos de founders a partilhar perspectiva sobre o sector (autoridade) e demonstrações de produto ou serviço com caso de uso real. Duração ideal: 60 a 90 segundos." },
    { question: "Como optimizar vídeos para o algoritmo do LinkedIn?", answer: "Carrega o vídeo nativamente (não partilhes link do YouTube), adiciona legendas (85% dos vídeos são vistos sem som), começa com o gancho nos primeiros 3 segundos e inclui uma chamada à acção no texto da publicação — não no vídeo em si." },
    { question: "Quanto custa produzir conteúdo de vídeo regular para LinkedIn?", answer: "Um pacote de conteúdo mensal para LinkedIn com 4 a 8 vídeos curtos custa tipicamente entre €800 e €2.500, dependendo do nível de produção e do volume de entrevistas ou filmagens no terreno. Muitas empresas optam por um retainer mensal para consistência." },
  ],
  "video-restaurante-portugal": [
    { question: "Porquê investir em vídeo para um restaurante em Portugal?", answer: "O vídeo é o formato que melhor transmite a atmosfera, a qualidade do produto e a experiência do cliente num restaurante. Restaurantes com vídeo profissional no Instagram e Google Business registam em média mais reservas online e maior taxa de regresso de clientes." },
    { question: "Que tipo de conteúdo de vídeo funciona para restaurantes?", answer: "Os formatos com melhor desempenho são: processo de cozinha (autenticidade), apresentação de pratos (qualidade visual), vídeos de ambiente ao jantar (experiência) e histórias do chef ou da equipa (conexão emocional). Reels curtos de 15 a 30 segundos têm o maior alcance orgânico." },
    { question: "Quanto custa um vídeo profissional para um restaurante?", answer: "Um vídeo de apresentação de restaurante com meia jornada de filmagem começa nos €1.200. Pacotes completos com vídeo de marca, clips para redes sociais e fotografias ficam tipicamente entre €2.500 e €5.000." },
  ],
  "video-imobiliario-vender-rapido": [
    { question: "Como o vídeo ajuda a vender imóveis mais depressa?", answer: "Propriedades com vídeo profissional recebem em média 4 vezes mais visitas online e vendem-se até 30% mais rápido do que propriedades apenas com fotografias. O vídeo permite ao comprador qualificar-se antes da visita presencial, o que aumenta a qualidade dos contactos." },
    { question: "Qual a diferença entre drone e vídeo de interior para imóveis?", answer: "O drone captura a localização, os acessos e o contexto envolvente — essencial para moradia e terrenos. O vídeo de interior transmite a escala, a luz natural e o fluxo dos espaços. Para resultados óptimos, ambos devem ser combinados numa peça coerente." },
    { question: "Quanto custa um vídeo imobiliário profissional?", answer: "Um vídeo imobiliário para apartamento ou moradia custa entre €500 e €2.000, dependendo da dimensão do imóvel, inclusão de drone e extensão da pós-produção. Agências com volume elevado de propriedades beneficiam de acordos de retainer com preço por unidade." },
    { question: "Vale a pena fazer vídeo para imóveis de gama intermédia?", answer: "Sim. O retorno não depende apenas do valor do imóvel — depende da velocidade de venda e do número de visitas qualificadas. Um vídeo profissional num imóvel de €250.000 pode representar semanas de tempo poupado e evitar reduções de preço por falta de interesse." },
  ],
  "primeira-vez-produtora": [
    { question: "O que acontece quando contrato uma produtora pela primeira vez?", answer: "O processo típico tem quatro fases: reunião de briefing para entender objectivos e contexto, pré-produção (guião, localizações, plano de rodagem), dia(s) de filmagem e pós-produção com entregas e revisões. Uma boa produtora guia-te em cada etapa sem pressupor que já sabes o que pedir." },
    { question: "Que informação devo ter preparada antes de contactar uma produtora?", answer: "Quanto mais claro estiveres nestes pontos, melhor a proposta: objectivo do vídeo (o que queres que o espectador faça ou sinta), público-alvo, onde vai ser usado (website, redes sociais, eventos), prazo de entrega e orçamento disponível — mesmo que seja uma estimativa." },
    { question: "Quantas revisões são normais incluir num projecto?", answer: "O padrão da indústria são 2 rondas de revisão após a primeira montagem. Revisões adicionais são normalmente facturadas à parte. É importante clarificar isto na proposta para evitar expectativas desalinhadas no final do projecto." },
  ],
  "formatos-video-redes-sociais-2026": [
    { question: "Quais são os formatos de vídeo para cada rede social em 2026?", answer: "Instagram Reels e TikTok: vertical 9:16, até 90 segundos. LinkedIn: horizontal 16:9 ou quadrado 1:1, 60 a 120 segundos. YouTube: horizontal 16:9 para vídeos longos, vertical para Shorts. Facebook: aceita todos os formatos, mas quadrado e vertical têm maior alcance no feed mobile." },
    { question: "Preciso de filmar versões diferentes para cada plataforma?", answer: "Não necessariamente. Com planeamento, podes filmar uma vez e adaptar na pós-produção para os diferentes formatos. A chave é garantir que o sujeito principal está centrado no plano para que as versões recortadas para diferentes rácios continuem a funcionar visualmente." },
    { question: "Qual a duração ideal para vídeos nas redes sociais?", answer: "Para conteúdo orgânico: Instagram Reels 15-30 segundos, TikTok 30-60 segundos, LinkedIn 60-90 segundos. Para anúncios pagos, os primeiros 3 segundos são decisivos — a maior parte do orçamento é gasto em utilizadores que não passam desse ponto sem um gancho forte." },
    { question: "As legendas são obrigatórias nos vídeos para redes sociais?", answer: "Não são obrigatórias tecnicamente, mas são essenciais na prática: entre 70% a 85% dos vídeos nas redes sociais são vistos sem som. Vídeos com legendas têm taxas de conclusão significativamente mais altas e são mais acessíveis a utilizadores com dificuldades auditivas." },
  ],
  "colour-grading-video-profissional": [
    { question: "O que é colour grading e porque importa num vídeo profissional?", answer: "Colour grading é o processo de ajuste artístico de cor, contraste e tonalidade de um vídeo em pós-produção. Vai além da correcção técnica (colour correction) para criar uma atmosfera visual consistente que reforça a identidade de marca e a emoção pretendida." },
    { question: "Qual a diferença entre colour correction e colour grading?", answer: "Colour correction é técnica: equilibra a exposição, brancos e balanço de cor para que a imagem pareça natural e consistente entre planos. Colour grading é artístico: aplica uma paleta de cor intencional que define o 'look' do vídeo — mais quente, mais frio, mais cinematográfico." },
    { question: "O colour grading está sempre incluído no preço de produção?", answer: "Depende da produtora. Algumas incluem colour correction básica e cobram grading avançado à parte. Ao pedir proposta, clarifica se o preço inclui apenas correcção técnica ou um grading personalizado com LUT desenvolvido para a tua marca." },
  ],
  "briefing-eficaz-produtora-video": [
    { question: "O que deve conter um briefing para uma produtora de vídeo?", answer: "Um bom briefing inclui: objectivo do vídeo, público-alvo, mensagem central (uma única frase), onde vai ser distribuído, prazo de entrega, orçamento disponível, referências visuais de estilo, e quem são os intervenientes no processo de aprovação." },
    { question: "O que acontece se der um briefing incompleto à produtora?", answer: "Uma produtora experiente irá fazer as perguntas em falta antes de avançar. Se não o fizer e apresentar uma proposta sem ter feito perguntas, é sinal de que a proposta será genérica. Um briefing incompleto conduz quase sempre a revisões excessivas e prazo alargado." },
    { question: "Preciso de saber exactamente o que quero antes de contactar uma produtora?", answer: "Não. Saberes o objectivo de negócio é suficiente para começar — a produtora deve ajudar-te a transformar esse objectivo numa solução criativa. O que é importante é teres clareza sobre o resultado pretendido, não sobre a execução técnica." },
  ],
  "brand-film-vs-video-institucional": [
    { question: "Qual a diferença entre brand film e vídeo institucional?", answer: "Um vídeo institucional apresenta a empresa de forma directa: quem é, o que faz, como trabalha. Um brand film é uma peça cinematográfica que transmite os valores e o propósito da marca através de uma narrativa emocional — muitas vezes sem mencionar explicitamente produtos ou serviços." },
    { question: "Quanto custa um brand film em Portugal?", answer: "Brand films têm um nível de produção mais elevado e custam tipicamente entre €8.000 e €40.000, dependendo da narrativa, localizações, elenco e extensão da pós-produção. São investimentos de longo prazo pensados para campanhas de marca com alcance alargado." },
    { question: "Quando faz sentido investir num brand film?", answer: "Quando a empresa tem notoriedade suficiente para beneficiar de comunicação de valores — e não apenas de apresentação de serviços. Brand films funcionam bem em contextos de rebranding, expansão para novos mercados ou campanhas de recrutamento de talento." },
    { question: "Um brand film substitui o vídeo institucional?", answer: "Não. Servem propósitos diferentes em momentos diferentes da jornada do cliente. O vídeo institucional é o ponto de entrada — explica o que a empresa faz. O brand film cria ligação emocional em audiências que já têm algum conhecimento da marca." },
  ],
  "conteudo-redes-sociais-video-ou-fotografia": [
    { question: "Para redes sociais, é melhor investir em vídeo ou fotografia?", answer: "Depende do objectivo e da plataforma. Vídeo tem maior alcance orgânico no Instagram, TikTok e LinkedIn. Fotografia profissional é mais eficaz para feeds curados, e-commerce e editorial. A estratégia mais eficaz combina os dois formatos com papéis distintos na comunicação da marca." },
    { question: "Qual o custo de um pacote de conteúdo mensal para redes sociais?", answer: "Um pacote mensal com fotografia e vídeo para redes sociais custa em Portugal entre €600 e €2.500, dependendo do volume de conteúdo, frequência de filmagem e nível de pós-produção. Empresas com necessidades regulares beneficiam de retainers com preço fixo mensal." },
    { question: "Com que frequência devo publicar vídeo nas redes sociais?", answer: "Para resultados consistentes, o mínimo recomendado é 2 a 3 vídeos curtos por semana. A consistência é mais importante do que a frequência: é preferível 2 publicações de qualidade por semana a 5 publicações apressadas que não representam a marca adequadamente." },
  ],
  "hotelaria-video-hoteis-portugueses-conteudo-visual": [
    { question: "Como o vídeo ajuda hotéis portugueses a vender mais?", answer: "Hotéis com vídeo profissional no website e nas redes sociais registam taxas de reserva directa mais elevadas, reduzindo a dependência de plataformas como Booking.com e OTA. O vídeo transmite a atmosfera e a experiência de forma que fotografias estáticas não conseguem replicar." },
    { question: "Que tipo de conteúdo vídeo deve um hotel ter?", answer: "O mínimo essencial é: um vídeo de apresentação do hotel (2-3 minutos para o website), clips curtos de cada categoria de quarto e das áreas comuns, e conteúdo sazonal para redes sociais. Hotéis com restaurante beneficiam de conteúdo adicional focado na experiência gastronómica." },
    { question: "Quanto custa produzir conteúdo vídeo para um hotel?", answer: "Um projecto completo de conteúdo visual para um hotel (vídeo institucional + clips para redes sociais + fotografia) custa entre €3.500 e €12.000, dependendo da dimensão do hotel, número de categorias de quarto e volume de conteúdo pretendido." },
    { question: "Quando é o melhor momento para filmar um hotel?", answer: "O ideal é filmar durante a época alta ou num período de alta ocupação para captar o hotel com vida e hóspedes. Alternativamente, pode filmar-se fora de época se o hotel tiver áreas exteriores com boa luz natural — idealmente durante a chamada hora dourada ao amanhecer ou ao entardecer." },
  ],
  "pacote-conteudo-mensal-vs-projetos-pontuais": [
    { question: "Qual a vantagem de um pacote de conteúdo mensal versus projectos pontuais?", answer: "Um pacote mensal garante consistência de publicação, preço fixo previsível e uma equipa que conhece profundamente a marca ao longo do tempo. Projectos pontuais são adequados para marcos específicos — lançamentos, eventos — mas não substituem a presença regular que o algoritmo exige." },
    { question: "Quanto custa um pacote de conteúdo mensal para empresa?", answer: "Pacotes mensais de conteúdo audiovisual em Portugal custam tipicamente entre €800 e €3.500 por mês, dependendo do volume de conteúdo, frequência de filmagem e plataformas cobertas. O custo por peça é normalmente inferior ao de projectos pontuais equivalentes." },
    { question: "Como funciona um retainer de conteúdo com uma produtora?", answer: "Tipicamente envolve um briefing inicial de 1 a 2 horas para definir a estratégia e o calendário editorial, seguido de uma ou duas sessões de filmagem mensais e entrega regular de conteúdo editado. O relacionamento mensal permite à produtora aprender a voz da marca e produzir conteúdo mais eficaz ao longo do tempo." },
  ],
  "video-conversao-website": [
    { question: "Qual o impacto do vídeo na taxa de conversão de um website?", answer: "Websites com vídeo na página principal registam em média um aumento de 80% na taxa de conversão face a páginas apenas com texto e imagem. Um vídeo explicativo numa página de serviços ou produto pode reduzir o tempo de decisão do visitante e aumentar a taxa de contacto." },
    { question: "Onde devo colocar vídeo no meu website?", answer: "As posições com maior impacto são: acima da dobra na página principal (hero), nas páginas de serviços individuais para explicar cada oferta, na página Sobre para apresentar a equipa, e nas páginas de casos de estudo para mostrar resultados concretos." },
    { question: "Vídeo no website prejudica o tempo de carregamento?", answer: "Apenas se for mal implementado. A prática correcta é usar um serviço de hospedagem de vídeo como Vimeo ou YouTube (embed) em vez de hospedar o ficheiro directamente no servidor, e considerar o carregamento diferido (lazy load) para vídeos abaixo da dobra." },
  ],
  "showreel-empresa-como-usar": [
    { question: "O que é um showreel e para que serve numa empresa?", answer: "Um showreel é uma compilação dos melhores trabalhos ou momentos de uma empresa em formato vídeo de 1 a 2 minutos. Serve como cartão de visita audiovisual em reuniões comerciais, no website, em feiras e em apresentações a potenciais clientes ou investidores." },
    { question: "Quanto tempo deve ter um showreel de empresa?", answer: "Entre 60 e 90 segundos é o intervalo ideal. Longo o suficiente para mostrar diversidade de trabalho, curto o suficiente para manter a atenção. Um showreel que passa dos 2 minutos perde audiência e dilui o impacto das peças mais fortes." },
    { question: "Com que frequência devo actualizar o showreel da empresa?", answer: "Idealmente a cada 12 a 18 meses, ou sempre que a empresa tiver trabalhos novos suficientemente fortes para substituir os anteriores. Um showreel desactualizado pode transmitir uma imagem que já não reflecte o nível actual da empresa." },
  ],
  "o-que-publicar-redes-sociais-empresa": [
    { question: "O que deve uma empresa publicar nas redes sociais?", answer: "Um mix equilibrado inclui: conteúdo educativo do sector (40%), conteúdo de bastidores e equipa (25%), casos de sucesso e testemunhos (20%) e promoção directa de serviços (15%). Empresas que publicam apenas promoção directa têm alcance orgânico significativamente inferior." },
    { question: "Com que frequência deve uma empresa publicar nas redes sociais?", answer: "Para manter relevância no algoritmo sem sacrificar qualidade: 3 a 5 vezes por semana no Instagram, 2 a 3 vezes no LinkedIn e 1 vez por semana no Facebook como mínimo. A consistência ao longo de meses é mais determinante do que a frequência numa semana específica." },
    { question: "Preciso de um gestor de redes sociais ou posso gerir internamente?", answer: "Depende dos recursos disponíveis. Gestão interna funciona bem quando há uma pessoa dedicada com sentido estético e tempo suficiente. Uma produtora ou agência externa faz sentido quando a empresa quer conteúdo de qualidade consistente sem sobrecarregar a equipa com mais uma responsabilidade." },
    { question: "Quais os formatos de publicação com mais alcance orgânico em 2026?", answer: "Reels e vídeos curtos continuam a ter o maior alcance orgânico no Instagram e Facebook. No LinkedIn, os carrosséis e vídeos nativos superam os posts de texto simples. Em qualquer plataforma, conteúdo que gera comentários (não apenas likes) é premiado pelo algoritmo." },
  ],
  "video-hotelaria-portugal": [
    { question: "Como um vídeo de 60 segundos pode ajudar o meu hotel?", answer: "Um vídeo de 60 segundos bem construído pode substituir centenas de palavras de descrição na página de reserva, reduzir a taxa de abandono antes de completar a reserva e ser reutilizado como anúncio pago no Instagram e Facebook com custo por clique mais baixo do que formatos estáticos." },
    { question: "Quanto custa um vídeo para um hotel ou unidade de alojamento?", answer: "Um vídeo de apresentação de 60 a 90 segundos para um hotel ou turismo rural custa entre €1.500 e €4.000, dependendo da dimensão da propriedade, inclusão de drone e número de localizações filmadas. Pacotes com conteúdo adicional para redes sociais têm preços superiores." },
    { question: "O vídeo ajuda a aumentar reservas directas e reduzir comissões de OTA?", answer: "Sim. Um website com vídeo profissional converte melhor, o que justifica investimento em tráfego directo e reduz a dependência de plataformas como Booking.com que cobram comissões entre 15% e 25%. O retorno do vídeo pode pagar-se em poucos reservas directas adicionais." },
  ],
  "processo-producao-filme-comercial": [
    { question: "Quanto tempo demora a produção de um filme comercial?", answer: "A maioria dos filmes comerciais demora entre 4 a 8 semanas desde o briefing até à entrega final, dependendo da complexidade do projecto. Produções com elenco, localizações especiais ou efeitos avançados de pós-produção podem exigir 10 a 12 semanas." },
    { question: "Quais são as fases de produção de um filme comercial?", answer: "As três fases são: pré-produção (guião, storyboard, casting, localizações, plano de rodagem), produção (dias de filmagem com toda a equipa técnica e artística) e pós-produção (montagem, colour grading, sound design, motion graphics e entregas finais)." },
    { question: "Quanto custa um filme comercial profissional em Portugal?", answer: "Filmes comerciais profissionais em Portugal custam entre €5.000 e €50.000+. A maioria das produções para PMEs e marcas regionais situa-se entre €8.000 e €20.000. O orçamento é determinado pelo número de dias de rodagem, dimensão da equipa, elenco e extensão da pós-produção." },
    { question: "O que distingue um filme comercial de um vídeo institucional em termos de produção?", answer: "Um filme comercial tem tipicamente um guião mais elaborado, pode incluir elenco profissional, usa técnicas cinematográficas mais avançadas e tem uma pós-produção mais densa. Um vídeo institucional é geralmente mais directo e documental, com menor complexidade de produção." },
  ],
  "fotografia-corporativa-guia": [
    { question: "O que inclui uma sessão de fotografia corporativa?", answer: "Uma sessão corporativa típica inclui: retratos profissionais individuais de cada colaborador, fotografias de equipa em contexto de trabalho, imagens dos espaços da empresa e, quando relevante, fotografias de produto ou de serviço em acção. A entrega inclui ficheiros tratados em alta resolução." },
    { question: "Quanto custa fotografia corporativa em Portugal?", answer: "Uma sessão de fotografia corporativa custa entre €500 e €2.500, dependendo do número de colaboradores, espaços a fotografar, duração da sessão e número de imagens entregues. Empresas com equipas grandes ou múltiplas localizações beneficiam de orçamentos personalizados." },
    { question: "Como preparar a equipa para uma sessão de fotografia corporativa?", answer: "Comunica com antecedência o vestuário recomendado (cores sólidas alinhadas com a identidade da marca, evitar padrões complexos), escolhe um horário com boa luz natural, e selecciona espaços que representem genuinamente a cultura e o ambiente de trabalho da empresa." },
    { question: "Com que frequência deve uma empresa actualizar as fotografias corporativas?", answer: "Idealmente a cada 2 a 3 anos, ou sempre que houver mudanças significativas na equipa, nos espaços ou no posicionamento da marca. Fotografias desactualizadas num website criam uma dissonância com a realidade actual da empresa que os clientes percebem." },
  ],
  "tendencias-video-marketing-2026": [
    { question: "Quais são as principais tendências de vídeo marketing para 2026?", answer: "As tendências com maior impacto são: vídeo curto vertical como formato dominante, conteúdo gerado com IA como suporte à produção (não substituição), autenticidade de bastidores a superar publicidade polida, e personalização de vídeo em escala para comunicação B2B." },
    { question: "O vídeo curto vai substituir os vídeos longos?", answer: "Não — os dois formatos têm papéis complementares. Vídeo curto (15-90 segundos) domina na descoberta e no topo de funil. Vídeo longo (5-20 minutos) é mais eficaz em consideração e conversão para produtos e serviços de maior complexidade ou valor." },
    { question: "A inteligência artificial vai substituir equipas de produção de vídeo?", answer: "A IA está a transformar partes do processo — guionismo, legendagem, edição básica, geração de imagens de stock — mas não substitui a direcção criativa, a captação de imagem real e a relação com o cliente. Produtoras que integram IA no workflow têm vantagem competitiva em velocidade e custo." },
  ],
  "roi-video-marketing-dados": [
    { question: "Qual é o ROI médio de vídeo marketing?", answer: "Estudos indicam que empresas que investem em vídeo marketing obtêm um retorno médio de 87% superior em leads comparado com outros formatos de conteúdo. Páginas de destino com vídeo convertem até 80% mais do que páginas sem vídeo." },
    { question: "Como calcular o retorno de um investimento em vídeo?", answer: "Compara o custo do vídeo com o valor gerado: aumento de leads qualificados, redução do ciclo de venda, diminuição do custo por aquisição em campanhas pagas e tempo poupado em reuniões de apresentação. Um vídeo com vida útil de 3 anos amortiza-se por um custo diário muito baixo." },
    { question: "Quanto tempo demora a ver resultados de vídeo marketing?", answer: "Depende do uso. Vídeo em anúncios pagos produz resultados em dias. Vídeo orgânico em redes sociais e SEO em website tem impacto crescente ao longo de semanas a meses. O maior retorno vem de vídeos que servem múltiplos propósitos: website, vendas, redes sociais e apresentações." },
    { question: "Existe algum estudo sobre o impacto do vídeo na decisão de compra B2B?", answer: "Sim. Segundo dados da Wyzowl, 89% dos compradores afirmam que ver um vídeo de um produto ou serviço foi determinante na sua decisão de compra. Em contexto B2B, 70% dos compradores assistem a vídeos durante o processo de pesquisa antes de contactar um fornecedor." },
  ],
  "departamento-criativo-externo": [
    { question: "O que é um departamento criativo externo?", answer: "Um departamento criativo externo é uma equipa de produção e estratégia de conteúdo que funciona como extensão interna da empresa — com conhecimento profundo da marca, acesso contínuo e responsabilidade pelos resultados — mas sem os custos fixos de uma equipa a tempo inteiro." },
    { question: "Qual a diferença entre contratar uma agência e ter um departamento criativo externo?", answer: "Uma agência trabalha por projecto, com equipa rotativa e processo estandardizado. Um departamento criativo externo funciona em regime de retainer contínuo, com uma equipa dedicada que aprende a marca ao longo do tempo e produz conteúdo cada vez mais alinhado com a sua voz." },
    { question: "Quanto custa ter um departamento criativo externo?", answer: "Um retainer de departamento criativo externo custa tipicamente entre €1.500 e €5.000 por mês, dependendo do volume de produção, variedade de formatos e nível de envolvimento estratégico. O custo é significativamente inferior a ter uma equipa criativa interna equivalente." },
    { question: "Que empresas beneficiam mais de um departamento criativo externo?", answer: "Empresas com necessidade regular de conteúdo mas sem volume suficiente para justificar equipa interna: PMEs em crescimento, empresas a lançar nova linha de negócio, grupos com várias marcas e empresas que querem escalar comunicação sem escalar estrutura." },
  ],
  "portal-cliente-beyond-focus-producao-audiovisual": [
    { question: "O que é o Portal do Cliente da Beyond Focus?", answer: "O Portal do Cliente é uma plataforma digital que centraliza toda a comunicação, aprovações e entregas de cada projecto de produção audiovisual. Permite ao cliente acompanhar o estado do projecto em tempo real, rever e aprovar conteúdos e aceder ao historial completo de cada trabalho." },
    { question: "Como funciona o processo de aprovação de vídeos no portal?", answer: "Quando um vídeo está pronto para revisão, o cliente recebe uma notificação com link directo para o portal. Pode ver o vídeo, deixar comentários com marcação de tempo exacto e aprovar ou pedir revisão — tudo num único lugar, sem emails dispersos ou versões confusas." },
    { question: "Preciso de instalar algum software para usar o Portal do Cliente?", answer: "Não. O portal funciona inteiramente no browser, sem instalação de software. É acessível em computador, tablet e telemóvel, o que facilita revisões e aprovações mesmo quando o cliente está em mobilidade." },
  ],
  "portal-cliente-o-que-e-porque-muda-tudo-producao-audiovisual": [
    { question: "Como um portal de cliente muda a experiência de produção audiovisual?", answer: "Elimina os principais pontos de fricção: emails com versões de vídeo em anexo, confusão sobre qual é a versão mais recente, aprovações perdidas e falta de visibilidade sobre o estado do projecto. Um portal centraliza tudo e torna o processo transparente para ambas as partes." },
    { question: "Qual o impacto de um portal de cliente na velocidade de produção?", answer: "Projectos com portal de aprovação digital fecham tipicamente 30% a 40% mais depressa do que projectos geridos por email. A razão é simples: o cliente revê e aprova mais depressa quando o processo é fácil e imediato, sem necessidade de descarregar ficheiros ou coordenar via email." },
    { question: "Todas as produtoras têm portal de cliente?", answer: "Não — a maioria das produtoras ainda gere projectos por email e partilha de ficheiros via WeTransfer ou Dropbox. Um portal dedicado é um indicador de maturidade de processo e de compromisso com a experiência do cliente, não apenas com a entrega técnica." },
    { question: "O portal do cliente substitui a comunicação directa com a produtora?", answer: "Não substitui — complementa. O portal organiza o processo documental e de aprovações, mas a relação com o director criativo e as conversas estratégicas continuam a acontecer por chamada ou reunião. O objectivo é libertar o tempo de comunicação para o que realmente importa." },
  ],
};


/** Render inline markdown: **bold**, [link](url) */
function renderInline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-petrol font-semibold">$1</strong>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-orange underline underline-offset-2 hover:text-orange/80">$1</a>');
}

function getSectorForSlug(slug: string): Sector {
  if (/hotel|hotelaria/.test(slug)) return "hotelaria";
  if (/restaura/.test(slug)) return "restauracao";
  if (/imobili/.test(slug)) return "imobiliario";
  if (/corporate|institucional|empresa/.test(slug)) return "corporate";
  if (/evento/.test(slug)) return "eventos";
  return "generic";
}

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Artigo não encontrado" };
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    keywords: post.keywords,
    openGraph: {
      title: `${post.metaTitle || post.title} — Beyond Focus`,
      description: post.metaDescription || post.excerpt,
      url: `https://beyondfocus.pt/blog/${slug}`,
      images: [{ url: post.thumbnail.startsWith("/") ? `https://beyondfocus.pt${post.thumbnail}` : post.thumbnail, width: 1200, height: 630, alt: post.title }],
      type: "article",
    },
    alternates: {
      canonical: `https://beyondfocus.pt/blog/${slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const sector = getSectorForSlug(slug);

  const sameCategory = BLOG_POSTS.filter((p) => p.slug !== slug && p.category === post.category);
  const otherCategory = BLOG_POSTS.filter((p) => p.slug !== slug && p.category !== post.category);
  const otherPosts = [...sameCategory, ...otherCategory].slice(0, 2);

  const publishedDate = (() => {
    const months: Record<string, string> = { Jan: "Jan", Fev: "Feb", Mar: "Mar", Abr: "Apr", Mai: "May", Jun: "Jun", Jul: "Jul", Ago: "Aug", Set: "Sep", Out: "Oct", Nov: "Nov", Dez: "Dec" };
    const [d, m, y] = post.date.split(" ");
    return new Date(`${d} ${months[m] || m} ${y}`).toISOString();
  })();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    image: `https://beyondfocus.pt${post.thumbnail}`,
    datePublished: publishedDate,
    dateModified: publishedDate,
    author: { "@type": "Person", name: "Daniel Lopes", url: "https://beyondfocus.pt/sobre/daniel-lopes" },
    publisher: { "@type": "Organization", name: "Beyond Focus", url: "https://beyondfocus.pt", logo: { "@type": "ImageObject", url: "https://beyondfocus.pt/images/logo-symbol.png" } },
    mainEntityOfPage: `https://beyondfocus.pt/blog/${slug}`,
    inLanguage: "pt-PT",
  };

  const postFaqs = POST_FAQS[slug];

  return (
    <>
      <BlogStickyBanner />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {postFaqs && <FAQSchema items={postFaqs} />}
      <BreadcrumbSchema
        items={[
          { name: "Inicio", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: post.title, href: `/blog/${slug}` },
        ]}
      />
      <Navbar variant="light" />
      <main className="bg-bg-light">
        {/* Hero */}
        <section className="mx-auto max-w-[900px] px-6 pt-[200px] text-center md:px-10">
          <div className="flex items-center justify-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[2px] text-orange">{post.category}</span>
            <span className="text-[11px] text-petrol/25">·</span>
            <span className="text-[11px] text-petrol/30">{post.date}</span>
            <span className="text-[11px] text-petrol/25">·</span>
            <span className="text-[11px] text-petrol/30">{post.readTime} de leitura</span>
          </div>
          <h1 className="mt-4 text-[clamp(28px,3.5vw,44px)] font-bold leading-[1.15] tracking-tight text-petrol">
            {post.title}
          </h1>
          <p className="mt-3 text-[12px] text-petrol/40">
            Por{" "}
            <Link href="/sobre/daniel-lopes" className="underline underline-offset-2 hover:text-petrol/70 transition-colors">
              Daniel Lopes
            </Link>
          </p>
        </section>

        {/* Image */}
        <div className="mx-auto mt-10 max-w-[1200px] px-6 md:px-10">
          <div className="relative overflow-hidden rounded-xl" style={{ aspectRatio: "16/9" }}>
            <Image src={post.thumbnail} alt={post.title} fill className="object-cover" sizes="100vw" priority />
          </div>
        </div>

        {/* Content */}
        <article className="prose-bf mx-auto max-w-[720px] px-6 py-16 md:px-10">
          {(() => {
            const blocks = post.content.split("\n\n");
            const injectAt = Math.max(1, Math.floor(blocks.length * 0.3));
            const rendered: React.ReactNode[] = [];
            blocks.forEach((block, i) => {
              if (i === injectAt) {
                rendered.push(
                  <IndustryLeadMagnet key="industry-magnet" sector={sector} source={`blog-inline-${slug}`} />
                );
              }
              if (block.startsWith("## ")) {
                rendered.push(
                  <h2 key={i} className="mb-4 mt-12 text-[clamp(22px,2.5vw,28px)] font-bold leading-tight text-petrol">
                    {block.replace("## ", "")}
                  </h2>
                );
              } else if (block.startsWith("- ")) {
                rendered.push(
                  <ul key={i} className="mb-5 space-y-2 pl-5">
                    {block.split("\n").filter(l => l.startsWith("- ")).map((li, j) => (
                      <li key={j} className="text-[17px] leading-[1.8] text-petrol/70 list-disc" dangerouslySetInnerHTML={{ __html: renderInline(li.replace("- ", "")) }} />
                    ))}
                  </ul>
                );
              } else {
                rendered.push(
                  <p key={i} className="mb-5 text-[18px] leading-[1.8] text-petrol/70" dangerouslySetInnerHTML={{ __html: renderInline(block) }} />
                );
              }
            });
            return rendered;
          })()}
        </article>

        {/* Related programmatic service pages */}
        {(() => {
          const relatedServices = SERVICES_SEO.slice(0, 3);
          const featuredCities = CITIES.slice(0, 3);
          return (
            <section className="mx-auto max-w-[720px] px-6 pb-10 md:px-10">
              <h2 className="mb-5 text-lg font-bold text-petrol">Serviços relacionados</h2>
              <div className="grid gap-3 sm:grid-cols-3">
                {relatedServices.map((service) => (
                  <div key={service.slug} className="rounded-xl border border-petrol/10 bg-white p-4">
                    <p className="mb-2 text-[12px] font-semibold uppercase tracking-wider text-orange">
                      {service.name}
                    </p>
                    <div className="space-y-1">
                      {featuredCities.map((city) => (
                        <Link
                          key={city.slug}
                          href={`/servicos/pseo/${service.slug}/${city.slug}`}
                          className="block text-[13px] text-petrol/60 hover:text-petrol transition-colors"
                        >
                          {service.shortName.charAt(0).toUpperCase() + service.shortName.slice(1)} em {city.name} →
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })()}

        {/* Email capture */}
        <div className="mx-auto max-w-[720px] px-6 md:px-10">
          <BlogEmailCapture
            variant="banner"
            source={`blog-${slug}`}
            magnet="guia-precos-video"
          />
        </div>

        {/* Related posts */}
        {otherPosts.length > 0 && (
          <section className="mx-auto max-w-[1200px] px-6 py-16 md:px-10">
            <h2 className="mb-8 text-xl font-bold text-petrol">Artigos relacionados</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {otherPosts.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="group block transition-all duration-300 hover:-translate-y-1 hover:shadow-lg rounded-xl" data-cursor="hover-link">
                  <div className="relative overflow-hidden rounded-xl" style={{ aspectRatio: "16/9" }}>
                    <Image src={p.thumbnail} alt={p.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="50vw" />
                  </div>
                  <div className="mt-3">
                    <span className="font-mono text-[10px] uppercase tracking-[2px] text-orange">{p.category}</span>
                    <h3 className="mt-1 text-base font-semibold text-petrol group-hover:text-orange transition-colors">{p.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Inline email capture */}
        <div className="mx-auto max-w-[720px] px-6 md:px-10">
          <BlogInlineCapture source={`blog-cta-${slug}`} />
        </div>

        {/* CTA */}
        <section className="mx-auto max-w-[720px] px-6 pb-24 md:px-10">
          <div className="mt-8 rounded-2xl bg-[#0E3A45] p-8 text-center text-white">
            <h3 className="mb-4 font-serif text-2xl">Tens um projecto em mente?</h3>
            <p className="mb-6 text-white/80">A primeira conversa é por nossa conta. Sem compromisso.</p>
            <Link
              href="/contacto"
              className="inline-block rounded-full bg-[#FA8334] px-8 py-3 font-medium text-white transition-colors hover:bg-[#e5732e]"
            >
              Falar com a Beyond Focus
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
