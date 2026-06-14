
import React from 'react';
import { Translation } from './types';

// Local Image Imports
import usage_step_01 from './img/usage_step_01.jpg';
import usage_step_02 from './img/usage_step_02.jpg';
import usage_step_03 from './img/usage_step_03.webp';
import usage_step_04 from './img/usage_step_04.webp';
import linteus0 from './img/linteus0.webp';
import linteus1 from './img/linteus1_new.webp';
import linteus2 from './img/linteus2.jpg';
import linteus3 from './img/linteus3.jpg';
import linteus4 from './img/linteus4.webp';
import linteus5 from './img/linteus5.jpg';

export const IMAGES = {
  hero_forest: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop",
  about_bg: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2070&auto=format&fit=crop",
  research_bg: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=2070&auto=format&fit=crop",
  search_bg: "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?q=80&w=2070&auto=format&fit=crop",
  benefits_bg: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2070&auto=format&fit=crop",
  usage_bg: "https://images.unsplash.com/photo-1470114716159-e389f8712ad4?q=80&w=2070&auto=format&fit=crop",
  health_bg: "https://images.unsplash.com/photo-1511497584788-8767fe771721?q=80&w=2560&auto=format&fit=crop",
  faq_bg: "https://images.unsplash.com/photo-1501183007986-d0d080b147f9?q=80&w=2070&auto=format&fit=crop",
  footer_bg: "https://images.unsplash.com/photo-1506318137071-a8bcbf67cc77?q=80&w=2070&auto=format&fit=crop",
  phellinus_detail: "https://images.unsplash.com/photo-1594200843957-c340c436b772?q=80&w=2070&auto=format&fit=crop",
  tea_ritual: "https://images.unsplash.com/photo-1571217622692-5af5f49a2179?q=80&w=2070&auto=format&fit=crop"
};

const researchPapersKo = {
  summary: { title: "NK세포 활성 및 생존율 증가", journal: "CONSORT Clinical Trial", impact: "Clinical Study", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9410671/", summary: "임상시험에서 위약 대비 NK세포 활성 유의하게 증가 (P < 0.05). 98명 대상 이중맹검 임상시험 결과 확인." },
  cancer: { title: "대장암세포 사멸 및 AKT/mTOR 차단", journal: "Int. J. Mol. Sci.", impact: "Mechanism Analysis", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8880221/", summary: "대장암세포(SW480) 사멸 유도 및 AKT/mTOR 경로 차단. 암세포의 생존 신호를 억제함." },
  lung: { title: "폐암세포 이동 억제 및 폐 보호", journal: "PMC (NIH)", impact: "In Vitro/Vivo", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10694423/", summary: "폐암세포(A549) 이동 억제 및 급성 폐 손상 보호. 미세먼지로 인한 염증 완화." },
  liver: { title: "간암 억제 및 지방간 개선", journal: "ResearchGate", impact: "Animal Study", url: "https://scholar.google.com/scholar?q=Phellinus+linteus+liver+cancer+fatty+liver", summary: "간암(Hep3B) 억제 및 비알코올성 지방간 개선. (유료 논문: 클릭하여 제목 검색)" },
  prostate: { title: "전립선암세포 사멸 유도", journal: "ResearchGate", impact: "Oncology", url: "https://scholar.google.com/scholar?q=Hispidin+prostate+cancer+STAT3", summary: "히스피딘(Hispidin)의 STAT3 차단을 통한 암세포 사멸. (유료 논문: 클릭하여 제목 검색)" },
  diabetes: { title: "장내 미생물 개선 및 혈당 조절", journal: "Frontiers in Microbiology", impact: "Microbiome", url: "https://www.frontiersin.org/journals/nutrition/articles/10.3389/fnut.2022.1013466/full", summary: "장내 미생물 개선 및 부티르산 723% 증가. 인슐린 저항성 개선 효과." },
  brain: { title: "베타아밀로이드 억제 및 뇌 보호", journal: "PMC (NIH)", impact: "Neuroprotection", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8143579/", summary: "베타아밀로이드 생성 효소 BACE1 억제. 알츠하이머 원인 물질 차단." },
  skin: { title: "아토피 억제 및 수명 연장", journal: "PMC (NIH)", impact: "Dermatology/Aging", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10159060/", summary: "아토피 IgE 억제 및 수명 26.41% 연장. 항노화 및 피부 진정 효과." },
  joint: { title: "통풍 요산 억제 및 관절염", journal: "ResearchGate", impact: "Rheumatology", url: "https://www.frontiersin.org/journals/pharmacology/articles/10.3389/fphar.2021.801910/full", summary: "통풍 요산 생성 효소(XOD) 억제. 류마티스 관절염 염증 완화." }
};

const researchPapersEn = {
  summary: { title: "Enhanced NK Cell Activity & Survival", journal: "CONSORT Clinical Trial", impact: "Clinical Study", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9410671/", summary: "Significantly increased NK cell activity vs placebo in clinical trials (P < 0.05). Verified in double-blind study (n=98)." },
  cancer: { title: "Colorectal Cancer Inhibition", journal: "Int. J. Mol. Sci.", impact: "Mechanism Analysis", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8880221/", summary: "Induction of colorectal cancer cell (SW480) apoptosis and blockage of AKT/mTOR pathway." },
  lung: { title: "Lung Protection & Metastasis Block", journal: "PMC (NIH)", impact: "In Vitro/Vivo", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10694423/", summary: "Inhibition of lung cancer cell (A549) migration and protection against acute lung injury." },
  liver: { title: "Liver Cancer & Fatty Liver Care", journal: "ResearchGate", impact: "Animal Study", url: "https://scholar.google.com/scholar?q=Phellinus+linteus+liver+cancer+fatty+liver", summary: "Inhibition of liver cancer (Hep3B) and improvement of non-alcoholic fatty liver. (Paid paper; click to search)" },
  prostate: { title: "Prostate Cancer Apoptosis", journal: "ResearchGate", impact: "Oncology", url: "https://scholar.google.com/scholar?q=Hispidin+prostate+cancer+STAT3", summary: "Induction of cancer cell apoptosis via STAT3 blockage by Hispidin. (Paid paper; click to search)" },
  diabetes: { title: "Microbiome & Blood Sugar Control", journal: "Frontiers in Microbiology", impact: "Microbiome", url: "https://www.frontiersin.org/journals/nutrition/articles/10.3389/fnut.2022.1013466/full", summary: "Improvement of gut microbiome and 723% increase in butyrate production." },
  brain: { title: "Neuroprotection & BACE1 Inhibition", journal: "PMC (NIH)", impact: "Neuroprotection", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8143579/", summary: "Inhibition of beta-amyloid generating enzyme BACE1, preventing Alzheimer's causes." },
  skin: { title: "Atopy Relief & Anti-Aging", journal: "PMC (NIH)", impact: "Dermatology/Aging", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10159060/", summary: "Inhibition of Atopy IgE and lifespan extension by 26.41%." },
  joint: { title: "Gout & Arthritis Relief", journal: "ResearchGate", impact: "Rheumatology", url: "https://www.frontiersin.org/journals/pharmacology/articles/10.3389/fphar.2021.801910/full", summary: "Inhibition of Gout uric acid generating enzyme (XOD) and rheumatoid arthritis factors." }
};

const researchPapersZh = {
  summary: { title: "NK细胞活性与生存率", journal: "CONSORT Clinical Trial", impact: "Clinical Study", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9410671/", summary: "临床试验显示 NK 细胞活性较安慰剂显著增加 (P < 0.05)。" },
  cancer: { title: "抑制结直肠癌", journal: "Int. J. Mol. Sci.", impact: "Mechanism Analysis", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8880221/", summary: "诱导大肠癌细胞 (SW480) 凋亡并阻断 AKT/mTOR 通路。" },
  lung: { title: "肺部保护与转移阻断", journal: "PMC (NIH)", impact: "In Vitro/Vivo", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10694423/", summary: "抑制肺癌细胞 (A549) 迁移及保护急性肺损伤。" },
  liver: { title: "肝癌抑制及脂肪肝改善", journal: "ResearchGate", impact: "Animal Study", url: "https://scholar.google.com/scholar?q=Phellinus+linteus+liver+cancer+fatty+liver", summary: "抑制肝癌(Hep3B)及改善非酒精性脂肪肝。(付费论文：点击搜索标题)" },
  prostate: { title: "诱导前列腺癌细胞凋亡", journal: "ResearchGate", impact: "Oncology", url: "https://scholar.google.com/scholar?q=Hispidin+prostate+cancer+STAT3", summary: "通过Hispidin阻断STAT3诱导癌细胞凋亡。(付费论文：点击搜索标题)" },
  diabetes: { title: "肠道菌群与血糖控制", journal: "Frontiers in Microbiology", impact: "Microbiome", url: "https://www.frontiersin.org/journals/nutrition/articles/10.3389/fnut.2022.1013466/full", summary: "改善肠道微生物群及丁酸增加 723%。" },
  brain: { title: "预防痴呆与脑细胞保护", journal: "PMC (NIH)", impact: "Neuroprotection", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8143579/", summary: "抑制 β-淀粉样蛋白生成酶 BACE1。" },
  skin: { title: "改善特应性皮炎与抗衰老", journal: "PMC (NIH)", impact: "Dermatology/Aging", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10159060/", summary: "抑制特应性 IgE 及寿命延长 26.41%。" },
  joint: { title: "痛风尿酸抑制与关节保护", journal: "ResearchGate", impact: "Rheumatology", url: "https://www.frontiersin.org/journals/pharmacology/articles/10.3389/fphar.2021.801910/full", summary: "抑制痛风尿酸生成酶 (XOD)。" }
};

const researchPapersJa = {
  summary: { title: "NK細胞活性と生存率", journal: "CONSORT Clinical Trial", impact: "Clinical Study", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9410671/", summary: "臨床試験においてプラセボ対比NK細胞活性が有意に増加 (P < 0.05)。" },
  cancer: { title: "大腸がん抑制と転移遮断", journal: "Int. J. Mol. Sci.", impact: "Mechanism Analysis", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8880221/", summary: "大腸がん細胞(SW480)のアポトーシス誘導およびAKT/mTOR経路の遮断。" },
  lung: { title: "肺保護とがん細胞移動遮断", journal: "PMC (NIH)", impact: "In Vitro/Vivo", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10694423/", summary: "肺がん細胞(A549)の移動抑制および急性肺損傷の保護。" },
  liver: { title: "肝臓がん抑制および脂肪肝改善", journal: "ResearchGate", impact: "Animal Study", url: "https://scholar.google.com/scholar?q=Phellinus+linteus+liver+cancer+fatty+liver", summary: "肝臓がん(Hep3B)の抑制および非アルコール性脂肪肝の改善。(有料論文：クリックしてタイトル検索)" },
  prostate: { title: "前立腺がん細胞のアポトーシス誘導", journal: "ResearchGate", impact: "Oncology", url: "https://scholar.google.com/scholar?q=Hispidin+prostate+cancer+STAT3", summary: "HispidinによるSTAT3遮断を通じたがん細胞の死滅。(有料論文：クリックしてタイトル検索)" },
  diabetes: { title: "腸内細菌改善と血糖調節", journal: "Frontiers in Microbiology", impact: "Microbiome", url: "https://www.frontiersin.org/journals/nutrition/articles/10.3389/fnut.2022.1013466/full", summary: "腸内微生物の改善および酪酸の723%増加。" },
  brain: { title: "認知症予防と脳細胞保護", journal: "PMC (NIH)", impact: "Neuroprotection", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8143579/", summary: "ベータアミロイド生成酵素BACE1の抑制。" },
  skin: { title: "アトピー改善と寿命延長", journal: "PMC (NIH)", impact: "Dermatology/Aging", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10159060/", summary: "アトピーIgEの抑制および寿命26.41%延長。" },
  joint: { title: "痛風尿酸抑制と関節炎緩和", journal: "ResearchGate", impact: "Rheumatology", url: "https://www.frontiersin.org/journals/pharmacology/articles/10.3389/fphar.2021.801910/full", summary: "痛風尿酸生成酵素(XOD)の抑制。" }
};

export const TRANSLATIONS: Record<string, any> = {
  ko: {
    nav: { about: "상황버섯 정보", research: "임상 연구", benefits: "핵심 효능", usage: "복용법", health: "웰니스 저널", faq: "질문답변/공지사항" },
    hero: {
      badge: "Vital Core Premium",
      title_top: "대자연이 선사한",
      title_highlight: "가장 고귀한 생명력",
      desc: "전문가 검증을 거친 국제 과학 저널 게재 논문에 근거한\n상황버섯(Phellinus linteus) 건강 정보 공유 플랫폼입니다.",
      btn_research: "연구 결과 자세히 보기",
      scroll_text: "우리는 태어날 때부터 자연치유력을 지니고 있습니다. 이는 곰팡이, 바이러스, 각종 환경 요인 등 복잡하고 위험한 세상 속에서 우리의 생명을 스스로 보호하기 위해 몸 안에 내재된 본래의 방어 시스템입니다. 이 자연치유력을 우리는 흔히 면역력, 또는 면역 시스템(Immune System)이라 부릅니다. 우리 몸의 이 면역 시스템은 단순한 방어 기능을 넘어, 손상된 세포와 균형이 무너진 상태를 스스로 회복하고 다시 재생하려는 능력을 갖추고 있습니다. 우리는 이 근본적인 생명 시스템을 바이탈 코어(Vital Core)라고 부릅니다. 바이탈 코어의 원리를 정확히 이해하고 핵심을 잘 다룬다면, 인체는 언제든지 스스로 균형을 되찾고 회복하려는 방향으로 작동한다는 사실을 알 수 있습니다. 이 사이트는 이러한 자연치유력과 바이탈 코어의 본질을 현대인의 삶에 실질적으로 접목하기 위해 만들어졌습니다."
    },
    common: { view_paper: "논문 확인", login: "로그인/회원가입" },
    about: {
      title: "Phellinus Linteus (Sanghwang)",
      tabs: { intro: "기본 정보", compounds: "핵심 성분", mechanism: "항암 기전", evidence: "학술 증거", recommended: "참고 자료 (예시)" },
      cards: [
        { title: "의학적 정의 및 희소성", desc: "미국 국립의학도서관(NLM)의 MeSH 데이터베이스(ID: 1000048)는 상황버섯(Phellinus linteus)을 단순한 식품이 아닌 '항암제(Antineoplastic Agents)' 및 '면역 인자(Immunologic Factors)'로 규정하고 있습니다. 소나무비늘버섯과(Hymenochaetaceae)에 속하는 이 희귀 균류는 동아시아 고산 지대에서 수십 년간 자란 고목의 수액을 섭취하며 성장합니다. 인공 재배가 극히 까다롭고 자연산의 약성이 압도적으로 우수하여, 예로부터 '신이 내린 약재'로 불려왔습니다." },
        { title: "독보적인 유효 성분", desc: "핵심 성분인 '베타글루칸(Beta-glucan 1-3/1-6)'은 인체의 면역 스위치를 켜는 기폭제 역할을 합니다. 상황버섯은 현존하는 버섯 중 베타글루칸 함유량이 가장 높습니다. 또한 강력한 항산화 물질인 'hispidin'과 'styrylpyrone' 계열 폴리페놀이 세포의 산화적 손상을 막고 DNA 변이를 억제합니다. 특유의 쓴맛을 내는 트리테르펜(Triterpenoids)은 간 해독과 혈류 개선에 탁월한 효능을 보입니다." },
        { title: "항암 및 면역 기전", desc: "상황버섯은 암세포를 직접 공격하는 기존 항암제와 달리, 우리 몸의 1차 방어군인 NK세포(자연살해세포)와 대식세포를 활성화하여 암세포를 스스로 사멸(Apoptosis)시키도록 유도합니다. 특히 암세포가 생존을 위해 만드는 신생 혈관 생성을 억제(Anti-angiogenesis)하여 암의 성장과 전이를 근본적으로 차단합니다. 항암 치료 시 발생하는 백혈구 감소증을 예방하고 구토, 탈모 등 부작용을 완화하는 '최고의 보조 치료제'로 인정받고 있습니다." },
        { title: "전문 학술 증거", desc: "상황버섯의 효능은 전 세계 3,000여 편 이상의 SCI급 논문으로 입증되었습니다. 단순한 경험 의학을 넘어, 현대 의학의 임상 데이터가 그 가치를 증명합니다. 하단의 '학술 증거' 탭에서 실제 임상 연구 결과와 미국 국립보건원(NIH) 데이터를 직접 확인하실 수 있습니다." }
      ],
      linteus_note: "아래 사진이 Linteus (린테우스) 입니다.",
      introDetails: [
        {
          title: "1. 이름의 유래와 의미",
          content: "한국어로는 '목질 진흙버섯'이라 불리며, 나무처럼 단단한 질감과 진흙색을 띤다는 의미를 담고 있습니다. 한자어 '상황(桑黃)'은 뽕나무(桑)에서 자라는 노란(黃) 버섯이라는 뜻에서 유래했으나, 실제로는 뽕나무 외에도 다양한 활엽수에서 자생하며 모두 단단한 목질로 이루어져 있습니다."
        },
        {
          title: "2. 식물인가? 동물인가?",
          content: "상황버섯은 식물이 아닌 '균류(Fungi)', 즉 곰팡이과(진균)에 속합니다. 식물처럼 토양에 뿌리를 내리는 것이 아니므로 산지(신토불이)보다는 어떤 '종균'인지가 효능의 핵심입니다. 전체 220여 종의 진균 중 한국 식약청이 약용으로 인정하는 것은 단 2종류뿐입니다."
        },
        {
          title: "3. 선택의 기준과 종류",
          content: "식약청 인정 2대 종균:\n• Phellinus Linteus (린테우스): 자연산과 동일한 종균. 성장 속도가 매우 느려(10년 이상) 희소하지만, 항암 및 면역 효능이 가장 뛰어납니다.\n• Phellinus Baumi (바우미): 농가에서 재배하기 쉬운 노란색 개량종으로, 성장이 빠르고 보편적입니다."
        }
      ],
      evidence: [
        { title: "췌장암 환자 생존율 1년 연장", journal: "Severance Hospital Clinical Study", pmid: "40590265", summary: "수술 후 항암 치료 환자 대상 추적 관찰 결과, 상황버섯 병행군의 평균 생존 기간이 47.0개월로 대조군(35.0개월)보다 12개월 연장됨. (유료 논문: 클릭하여 제목 검색)", url: "https://scholar.google.com/scholar?q=Phellinus+linteus+pancreatic+cancer+survival" },
        { title: "대장암 및 장내 미생물 개선", journal: "Gut Microbiome Journal", pmid: "40752028", summary: "항암제(5-FU) 부작용을 줄이고 암 치료 효율을 1.5배 높임. 차세대 유익균인 아커만시아(Akkermansia) 증식을 통한 장 환경 개선. (유료 논문: 클릭하여 제목 검색)", url: "https://scholar.google.com/scholar?q=Phellinus+linteus+gut+microbiome+colorectal+cancer" },
        { title: "치매 원인 베타아밀로이드 억제", journal: "Neuroscience Research", pmid: "40234762", summary: "알츠하이머 원인 물질인 베타아밀로이드 독성을 차단하고 해마 세포를 보호하여 기억력과 인지 기능을 획기적으로 개선. (유료 논문: 클릭하여 제목 검색)", url: "https://scholar.google.com/scholar?q=Phellinus+linteus+beta+amyloid+alzheimer" },
        { title: "피부 광노화 억제 및 미백", journal: "Dermatological Science", pmid: "40497052", summary: "자외선으로 인한 콜라겐 파괴 효소(MMP-1)를 억제하고 멜라닌 생성을 막아 주름 방지 및 미백(알부틴 동등 효과) 효과 입증. (유료 논문: 클릭하여 제목 검색)", url: "https://scholar.google.com/scholar?q=Phellinus+linteus+skin+photoaging+remedy" },
        { title: "간 섬유화 억제 및 숙취 해소", journal: "Liver International", pmid: "40228217", summary: "간이 딱딱해지는 섬유화 과정을 차단하고 알코올 분해를 촉진. 지방간 및 간 수치(GOT/GPT)의 빠른 정상화 유도. (유료 논문: 클릭하여 제목 검색)", url: "https://scholar.google.com/scholar?q=Phellinus+linteus+liver+fibrosis+hepatoprotective" },
        { title: "관절염 통증 완화 및 연골 보호", journal: "Rheumatology International", pmid: "40094337", summary: "천연 COX-2 억제제로 작용하여 관절 통증과 부종을 완화. 연골 파괴 효소를 막아 퇴행성 및 류마티스 관절염 동시 케어. (유료 논문: 클릭하여 제목 검색)", url: "https://scholar.google.com/scholar?q=Phellinus+linteus+anti-inflammatory+arthritis" },
        { title: "전립선 비대증 및 암 예방", journal: "Urology Journal", pmid: "39806945", summary: "남성 호르몬 변형(DHT)을 억제하여 전립선 비대를 막고 야간뇨 개선. 전립선암 세포 증식 억제 효과 동시 확인. (유료 논문: 클릭하여 제목 검색)", url: "https://scholar.google.com/scholar?q=Phellinus+linteus+prostate+cancer+BPH" },
        { title: "미세먼지/흡연 폐 손상 방어", journal: "Pulmonary Pharmacology", pmid: "39758739", summary: "미세먼지와 흡연으로 인한 폐포 염증 및 폐섬유화를 억제. 호흡기 점막 면역(IgA)을 강화하여 바이러스 방어력 증진. (유료 논문: 클릭하여 제목 검색)", url: "https://scholar.google.com/scholar?q=Phellinus+linteus+lung+protection+air+pollution" },
        { title: "당뇨 혈당 조절 및 다이어트", journal: "Diabetes & Metabolism", pmid: "39692936", summary: "식후 혈당 스파이크를 막고 인슐린 저항성을 개선. 내장 지방 세포 분화를 억제하여 체중 감소 효과 입증. (유료 논문: 클릭하여 제목 검색)", url: "https://scholar.google.com/scholar?q=Phellinus+linteus+diabetes+insulin+resistance" }
      ],
      products: [
        { name: "프리미엄 자연산 상황버섯", tag: "참고 예시", img: linteus0, desc: "수십 년간 원시림의 정기를 머금은 최상급 자연산 상황버섯. (정보 제공 목적의 예시 이미지)" },
        { name: "고농축 상황버섯 추출액", tag: "참고 예시", img: linteus1, desc: "캄보디아 원시림 상황버섯은 이런 모양과 비슷하게 붙어서 자생합니다." },
        { name: "건조 상황버섯 슬라이스", tag: "참고 예시", img: linteus2, desc: "이런 모양의 Phellinus Linteus 초기에 따오는 모양입니다. 시간이 지나면 초록색등은 없어지겠죠. 목질 진흙버섯 입니다." },
        { name: "상황버섯 선물 세트", tag: "참고 예시", img: linteus3, desc: "한국에서 유통되는 상황버섯 제품의 참고 예시입니다. 본 사이트에서 판매하지 않습니다." },
        { name: "상황버섯 분말 파우더", tag: "참고 예시", img: linteus4, desc: "한국에서 유통되는 상황버섯 제품의 참고 예시입니다. 본 사이트에서 판매하지 않습니다." },
        { name: "바이탈코어 시그니처 에디션", tag: "참고 예시", img: linteus5, desc: "한국에서 유통되는 상황버섯 제품의 참고 예시입니다. 본 사이트에서 판매하지 않습니다." }
      ]
    },
    research: {
      title: "검증된 과학적 데이터",
      tabs: { summary: '면역/생존', cancer: '소화기 암', lung: '폐 건강', liver: '간 건강', prostate: '전립선', diabetes: '당뇨/대사', brain: '뇌 건강', skin: '피부/노화', joint: '관절/통풍' },
      papers: researchPapersKo
    },
    benefits: {
      title: "5대 신체 활성 효능",
      desc: "전신을 감싸는 자연의 방어막",
      items: ["면역 체계 강화", "혈관 및 당뇨 케어", "간 기능 회복", "피부 항노화", "인지 기능 향상"],
      details: [
        {
          title: "1. 면역 체계 강화",
          scientificTerm: "Immune System Reinforcement",
          summary: "내 몸의 최전방 수비수, NK세포를 깨우다",
          content: "상황버섯의 핵심 성분인 베타글루칸은 우리 몸의 면역 사령관인 'NK세포(자연살해세포)'를 강력하게 활성화합니다. 바이러스나 비정상 세포가 침입했을 때 가장 먼저 대응하는 선천 면역력을 높여, 외부 공격으로부터 신체를 든든하게 보호합니다. 특히 호흡기 건강과 전신 방어력을 동시에 챙길 수 있는 탁월한 면역 증강 소재입니다.",
          evidence: "상황버섯 추출물은 인플루엔자 바이러스(H1N1) 감염 모델에서 생존율을 유의미하게 높이고(대조군 25% vs 투여군 60%), 면역 세포의 수를 회복시키는 강력한 항바이러스 및 면역 조절 효과가 입증되었습니다.",
          link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12692646/",
          mechanism: []
        },
        {
          title: "2. 혈관 및 당뇨 케어",
          scientificTerm: "Vascular & Diabetes Care",
          summary: "혈당 스파이크를 잡고, 혈관을 맑게",
          content: "식후 치솟는 혈당과 탁해진 혈액이 걱정되시나요? 상황버섯은 인슐린 저항성을 개선하여 혈당 조절을 돕고, 혈액 내 나쁜 콜레스테롤(LDL)과 중성지방 수치를 낮추는 데 도움을 줍니다. 또한, 유익한 장내 미생물을 늘려 대사 시스템을 근본적으로 건강하게 만드는 '장-혈관 축' 케어를 실현합니다.",
          evidence: "제2형 당뇨 모델에서 상황버섯 다당체(SVP) 섭취는 공복 혈당을 낮추고, 인슐린 저항성을 개선하며, 혈중 지질 프로파일(고지혈증)을 정상 수준으로 회복시키는 유의한 결과가 확인되었습니다.",
          link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9632624/",
          mechanism: []
        },
        {
          title: "3. 간 기능 회복",
          scientificTerm: "Liver Function Recovery",
          summary: "지친 간을 위한 해독 솔루션",
          content: "'상황(桑黃)'이라는 이름처럼 간과 밀접한 이 버섯은 강력한 항산화 작용으로 간세포를 보호합니다. 음주, 스트레스, 독소로 인해 손상된 간세포의 재생을 돕고, 지방간 억제 및 염증 수치 감소를 통해 침묵하는 장기인 간에 활력을 불어넣습니다.",
          evidence: "상황버섯 균사체는 아세트아미노펜 등으로 유발된 급성 간 손상 모델에서 간 수치(AST, ALT)를 유의미하게 낮추고(P<0.001), 항산화 효소 시스템(Nrf2 경로)을 활성화하여 간세포 괴사를 막는 탁월한 간 보호 효과를 보였습니다.",
          link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8226512/",
          mechanism: []
        },
        {
          title: "4. 피부 항노화",
          scientificTerm: "Anti-Aging & Skin Health",
          summary: "속부터 차오르는 탄력, 세월을 막는 항산화",
          content: "상황버섯의 폴리페놀 성분은 피부 노화의 주범인 활성산소를 제거하고, 콜라겐을 파괴하는 효소를 억제합니다. 자외선으로 인한 피부 손상을 막아주고, 피부 본연의 방어력을 높여 맑고 탄력 있는 피부를 유지하는 데 기여합니다.",
          evidence: "인체 적용 시험 및 세포 연구에서 상황버섯 유래 물질(엑소좀 등)은 자외선(UV)에 의한 피부 노화를 억제하고, 콜라겐 분해 효소(MMP1)를 감소시키며 콜라겐 생성(COL1A2)을 촉진하여 주름 및 피부 톤을 개선하는 효과가 입증되었습니다.",
          link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10159060/",
          mechanism: []
        },
        {
          title: "5. 인지 기능 향상",
          scientificTerm: "Cognitive Function Enhancement",
          summary: "기억력을 지키는 스마트한 습관",
          content: "나이 들수록 걱정되는 깜빡임, 상황버섯의 특유 성분인 '히스피딘(Hispidin)'이 뇌세포를 보호합니다. 신경세포를 공격하는 산화 스트레스를 막아주고, 치매 유발 물질의 생성을 억제하여 맑고 건강한 두뇌 활동을 유지하도록 돕습니다.",
          evidence: "상황버섯의 핵심 성분인 히스피딘은 알츠하이머병과 관련된 효소(BACE1)를 억제하고, 산화 스트레스로부터 신경세포를 보호하여 신경 퇴행성 질환 예방에 잠재력이 있음이 다수의 연구로 밝혀졌습니다.",
          link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8143579/",
          mechanism: []
        }
      ],
      conclusion: "Phellinus linteus는 균류인 상황버섯을 가까이 지내면 면역력이 많이 좋아진다는 점을 과학적으로 증명하고 있습니다."
    },
    usage: {
      title: "올바른 상황버섯 복용법",
      desc: "약성을 온전히 섭취하는 지혜",
      steps: [
        { step: "01", text: "상황버섯 약 50g(사진 사이즈 2-3개 내외)을 흐르는 물에 가볍게 씻어냅니다.", image: usage_step_01 },
        { step: "02", text: "생수 1L에서 1.5L 정도를 붓고 두번 정도 최대 끊이고 드시면 됩니다. 물론 4,5번 계속 물을 넣고 끊여드시면 됩니다.", image: usage_step_02 },
        { step: "03", text: "직접 끓인 린테우스 버섯의 색상입니다. 따뜻하게 하루 3회 이상 드시고, 수시로 더 섭취하셔도 좋습니다.", image: usage_step_03 },
        { step: "04", text: "내가 사용하는 버섯사진입니다. 위치에따라서 나무에 따라서 크기는 조금씩 다르지만 모두 펠리누스 린테우스입니다.", image: usage_step_04 }
      ],
      sub1: "1. 달이는 방법",
      sub2: "2. 권장 섭취",
      safetyStudies: [
        {
          title: "1. 인체 적용 시험: 장기간 섭취 시 안전성 및 면역 증진 입증",
          subtitle: "Effects of Phellinus linteus extract on immunity improvement",
          journal: "Medicine (Baltimore), 2022 Aug 26; 101(34)",
          result: "성인 대상 8주간 섭취 시 면역 수치 향상 및 간/신장 독성 없음 확인 (PMC9410671).",
          link: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9410671/"
        },
        {
          title: "2. 간 세포 보호 효과: '독성'이 아니라 오히려 '해독'을 돕다",
          subtitle: "Mycelial culture of Phellinus linteus protects primary cultured rat hepatocytes against hepatotoxins",
          journal: "Journal of Ethnopharmacology (2004)",
          result: "독성 물질(CCl4)로부터 간세포 파괴 방지. (유료 논문: 클릭하여 제목 검색)",
          link: "https://scholar.google.com/scholar?q=Mycelial+culture+of+Phellinus+linteus+protects+primary+cultured+rat+hepatocytes+against+hepatotoxins"
        },
        {
          title: "3. 급성/아급성 독성 시험: 고용량 섭취 안전성 입증",
          subtitle: "In vivo Antitumor Activity and Acute, Sub-acute Toxicity of Keumsa (Phellinus linteus) Extracts",
          journal: "Journal of Life Science (한국생명과학회)",
          result: "고용량(2,000mg/kg) 투여 시 사망 없음. (유료 논문: 클릭하여 제목 검색)",
          link: "https://scholar.google.com/scholar?q=In+vivo+Antitumor+Activity+and+Acute,+Sub-acute+Toxicity+of+Keumsa+(Phellinus+linteus)+Extracts"
        }
      ]
    },
    footer: {
      copy: "© 2026 Vital Core. All rights reserved.",
      contact: {
        label: "관리자 연락처",
        telegram: "@cambodiabae",
        secret: "게시판 비밀글 문의 가능"
      },
      privacy_link: "개인정보처리방침",
      terms_link: "이용약관",
      disclaimer_link: "의료 면책조항"
    },
    legal: {
      updated: "최종 수정일: 2026년 6월 13일",
      privacy_title: "개인정보처리방침",
      privacy_sections: [
        { title: "1. 수집하는 개인정보", body: "회원가입 시 이름, 이메일 주소, 전화번호, 거주 국가를 수집합니다. 또한 사이트 이용 과정에서 쿠키, IP 주소, 브라우저 유형, 방문 페이지, 접속 시각 등의 정보가 자동으로 수집될 수 있습니다." },
        { title: "2. 수집 및 이용 목적", body: "수집된 정보는 회원 인증 및 계정 관리, 문의사항 응대, 서비스 개선, 그리고 관계 법령에 따른 의무 이행에만 사용됩니다. 수집 목적 외의 용도로는 사용하지 않습니다." },
        { title: "3. 보관 기간", body: "개인정보는 회원 탈퇴 시 또는 수집 목적 달성 후 지체 없이 파기합니다. 단, 관계 법령에 따라 일정 기간 보관이 필요한 정보는 해당 기간 동안 안전하게 보관됩니다." },
        { title: "4. 제3자 광고 서비스 (Google AdSense)", body: "본 사이트는 Google Inc.의 광고 서비스인 Google AdSense를 사용합니다. 구글을 포함한 제3자 광고 공급업체는 쿠키(DART 쿠키 포함)를 이용해 사용자의 이전 방문 기록을 바탕으로 맞춤 광고를 게재합니다.\n\n• 맞춤 광고 비활성화: https://www.google.com/settings/ads\n• 제3자 쿠키 옵트아웃: https://www.aboutads.info" },
        { title: "5. 쿠키(Cookie) 사용", body: "쿠키는 로그인 세션 유지, 언어 설정 저장, 서비스 품질 개선을 위해 사용됩니다. 브라우저 설정에서 쿠키를 거부하거나 삭제할 수 있으나, 일부 기능이 제한될 수 있습니다." },
        { title: "6. GDPR(EU) 및 CCPA(캘리포니아) 이용자 권리", body: "EU 거주 이용자는 개인정보 열람, 수정, 삭제, 처리 제한, 이동을 요청할 권리가 있습니다. 캘리포니아 거주 이용자는 CCPA에 따라 개인정보 공개 현황 조회 및 판매 거부 권리를 가집니다. 권리 행사는 아래 연락처를 이용하세요." },
        { title: "7. 아동 개인정보 보호", body: "본 사이트는 만 13세 미만 아동으로부터 의도적으로 개인정보를 수집하지 않습니다. 해당 사실을 인지하는 경우 즉시 삭제합니다." },
        { title: "8. 정보 보안", body: "수집된 개인정보는 암호화 및 접근 통제 등 기술적·관리적 보호 조치를 통해 안전하게 관리됩니다. 다만 인터넷 전송 방식의 특성상 100% 보안은 보장되지 않습니다." },
        { title: "9. 방침 변경", body: "본 방침은 법령 변경 또는 서비스 개선에 따라 수정될 수 있으며, 변경 시 사이트 내 공지를 통해 안내해 드립니다." },
        { title: "10. 문의처", body: "이메일: cambodia.bae@gmail.com" }
      ],
      terms_title: "이용약관",
      terms_sections: [
        { title: "1. 서비스 소개", body: "Vital Core Premium(www.linteus.com)은 상황버섯(Phellinus linteus)의 과학적 연구와 효능에 관한 정보를 제공하는 헬스 정보 포털입니다." },
        { title: "2. 이용 자격 및 계정", body: "만 13세 이상이라면 누구나 회원가입을 할 수 있습니다. 회원은 자신의 계정 정보를 안전하게 관리할 책임이 있으며, 타인과 계정을 공유해서는 안 됩니다. 허위 정보로 가입한 경우 서비스 이용이 제한될 수 있습니다." },
        { title: "3. 콘텐츠의 목적 및 한계", body: "본 사이트의 모든 콘텐츠는 일반적인 정보 제공을 목적으로 하며, 의학적 진단·치료·처방을 대체하지 않습니다. 건강 관련 사항은 반드시 자격을 갖춘 의료 전문가와 상담하시기 바랍니다." },
        { title: "4. 지식재산권", body: "사이트의 모든 콘텐츠(텍스트, 이미지, 그래픽, 로고 등)는 저작권법의 보호를 받습니다. 사전 서면 동의 없이 복제, 배포, 수정하는 행위를 금합니다." },
        { title: "5. 광고 및 외부 링크", body: "본 사이트는 제3자 광고를 게재할 수 있습니다. 광고 내용 및 외부 링크 사이트에 대한 책임은 해당 광고주에게 있으며, 본 사이트는 이에 대해 책임을 지지 않습니다." },
        { title: "6. 책임 제한", body: "본 사이트는 콘텐츠의 정확성·완전성에 대해 명시적·묵시적 보증을 하지 않으며, 사이트 이용으로 인한 직·간접적 손해에 대한 책임을 법률이 허용하는 최대 범위 내에서 제한합니다." },
        { title: "7. 서비스 변경 및 중단", body: "운영자는 사전 고지 없이 서비스의 일부 또는 전부를 변경하거나 중단할 수 있습니다." },
        { title: "8. 준거법", body: "본 약관은 대한민국 법률에 따라 해석 및 적용됩니다." },
        { title: "9. 약관 변경", body: "약관은 필요 시 변경될 수 있으며, 변경 내용은 사이트를 통해 안내됩니다. 변경 후 서비스를 계속 이용하면 변경된 약관에 동의한 것으로 간주합니다." },
        { title: "10. 문의처", body: "이메일: cambodia.bae@gmail.com" }
      ],
      disclaimer_title: "의료 면책조항",
      disclaimer_sections: [
        { title: "정보 제공 목적", body: "본 사이트의 모든 콘텐츠는 상황버섯(Phellinus linteus) 및 관련 건강기능식품에 관한 일반적인 정보 제공만을 목적으로 합니다. 본 사이트의 어떠한 정보도 의학적 진단, 치료, 처방 또는 의료적 조언을 구성하지 않습니다." },
        { title: "의료 전문가 상담 필수", body: "건강 상태, 질병, 치료 또는 건강기능식품 복용에 관한 결정을 내리기 전에 반드시 자격을 갖춘 의사 또는 의료 전문가와 상담하시기 바랍니다. 본 사이트의 정보를 근거로 한 모든 결정은 전적으로 이용자 본인의 책임입니다." },
        { title: "제품 정보 한계", body: "본 사이트에서 소개하는 제품은 건강기능식품으로, 질병의 예방·진단·치료를 목적으로 하는 의약품이 아닙니다. 효과는 개인의 건강 상태와 체질에 따라 다를 수 있습니다." },
        { title: "연구 자료 인용", body: "본 사이트에 인용된 학술 연구 결과는 해당 연구자들의 견해를 반영하는 것으로, 운영자의 공식 의학적 의견이 아닙니다. 연구 결과가 모든 개인에게 동일하게 적용되지 않을 수 있습니다." }
      ]
    },
    board: {
      ask_btn: "질문하기",
      no_questions: "등록된 질문이 없습니다. 첫 번째 질문을 남겨보세요!",
      secret_icon: "비밀글",
      admin_answer: "관리자 답변",
      admin_reply_placeholder: "답변을 입력하세요...",
      reply_btn: "답변 등록",
      edit_title: "질문 수정",
      create_title: "새 질문 작성",
      label_title: "제목",
      label_content: "내용",
      label_type: "질문 유형",
      type_public: "일반 질문 (공개)",
      type_secret: "비밀 질문 (비공개)",
      placeholder_title: "궁금하신 내용을 입력해주세요",
      placeholder_content: "상황버섯 효능, 복용법, 제품 문의 등 자유롭게 질문해주세요.",
      submit_btn: "질문 등록",
      update_btn: "수정 완료",
      edit_btn: "수정",
      delete_btn: "삭제",
      tab_notice: "📢 공지사항",
      tab_qna: "❓ 질문목록"
    },
    admin: {
      tab_resets: "비밀번호 초기화",
      pw_reset_title: "비밀번호 초기화 요청",
      col_id: "요청 ID",
      col_user: "사용자",
      col_email: "이메일",
      col_status: "상태",
      col_action: "작업",
      status_pending: "대기중",
      btn_reset: "초기화 (vital1234)",
      empty_requests: "대기중인 요청이 없습니다",
      reset_confirm: "사용자의 비밀번호를 'vital1234'로 초기화하시겠습니까?",
      reset_success: "비밀번호가 'vital1234'로 초기화되었습니다.",
      reset_fail: "초기화 실패: "
    },
    auth: {
      forgot_pw: "비밀번호를 잊으셨나요?",
      email_reset_guide: "가입하신 이메일 주소를 입력해주세요. 해당 이메일로 비밀번호 재설정 링크를 발송해 드립니다.",
      send_link: "재설정 링크 발송",
      back_login: "로그인으로 돌아가기",
      reset_pw_title: "새 비밀번호 설정",
      new_pw: "새 비밀번호",
      confirm_pw: "비밀번호 확인",
      reset_btn: "비밀번호 변경하기",
      link_sent: "이메일로 재설정 링크가 발송되었습니다.",
      reset_complete: "비밀번호가 변경되었습니다. 새 비밀번호로 로그인해주세요.",
      tab_login: "로그인",
      tab_signup: "회원가입",
      tab_reset: "비번 찾기(설정)",
      btn_login: "로그인",
      btn_signup: "계정 생성",
      btn_cancel: "취소"
    }
  },
  en: {
    nav: { about: "About Phellinus", research: "Research", benefits: "Benefits", usage: "Usage", health: "Wellness Journal", faq: "Q&A / Notices" },
    hero: {
      badge: "Vital Core Premium",
      title_top: "Nature's",
      title_highlight: "Most Powerful Gift",
      desc: "A peer-reviewed research-based health information platform.\nSharing scientific knowledge on Phellinus linteus — not a shop.",
      btn_research: "View Research",
      scroll_text: "We possess innate natural healing power from birth. This is an inherent defense system designed to protect our lives from complex environmental dangers such as fungi and viruses. We often call this 'Immunity' or the 'Immune System'. Beyond simple defense, this system has the ability to recover and regenerate damaged cells and restore balance. We call this fundamental life system 'Vital Core'. If we correctly understand the principles of Vital Core, we see that the human body always operates to regain balance and recover. This site is created to bridge the essence of this natural healing power and Vital Core into modern life."
    },
    common: { view_paper: "View Paper", login: "Login" },
    about: {
      title: "Phellinus Linteus",
      tabs: { intro: "Overview", compounds: "Compounds", mechanism: "Mechanism", evidence: "Evidence", recommended: "References (Info Only)" },
      cards: [
        { title: "Habitat & Rarity", desc: "Phellinus linteus is an extremely rare medicinal fungus that grows for decades in primeval forests. It is dubbed 'The Mushroom from God' due to the difficulty of cultivation. Wild mushrooms from Cambodia and Korea hold overwhelming value in terms of potency. Our priority is to preserve and deliver this primordial energy." },
        { title: "Active Compounds", desc: "The core component is Beta-Glucan (1-3, 1-6), which fundamentally re-engineers the body's immune system. Rich in polyphenols, it provides powerful antioxidant effects, preventing cellular mutation. Triterpenoids aid in liver detoxification and help regulate blood pressure. We insist on pure ingredients verified by analysis." },
        { title: "Mechanism", desc: "Phellinus doesn't directly strike cancer cells but maximizes innate immunity. It activates NK cells and blocks the formation of new blood vessels that cancer cells need to survive. It regulates cytokine secretion, preventing excessive inflammation and maintaining a balanced immune state." },
        { title: "Academic Foundations", desc: "Proven through thousands of international papers. In PubMed, research on anti-tumor and anti-diabetic effects is updated annually. Japanese research revealed a 96.7% tumor inhibition rate for its polysaccharides. We provide reliable info based on cutting-edge science." }
      ],
      linteus_note: "The photo below is Phellinus Linteus.",
      introDetails: [
        {
          title: "1. Origin of Name",
          content: "In Korean, it is called 'Woody Mud Mushroom', referring to its hard texture and mud-like color. The name 'Sanghwang' comes from Chinese characters meaning Yellow (Hwang) on Mulberry (Sang), but it actually grows on various hardwood trees."
        },
        {
          title: "2. Plant or Fungus?",
          content: "Phellinus is a 'Fungus', not a plant. Unlike plants that rely on soil (terroir), the quality of the 'spawn' is what matters most for fungi. Among 220 species, only 2 are recognized for medicinal use."
        },
        {
          title: "3. Selection & Species",
          content: "Two Recognized Species:\n• Phellinus Linteus: The authentic natural species. Grows very slowly (10+ years) and is rare, but offers the highest potency.\n• Phellinus Baumi: A farm-grown yellow variety. Common and fast-growing."
        }
      ],
      products: [
        { name: "Wild Phellinus 374g", tag: "Reference Only", img: linteus0, desc: "Premium wild Phellinus that has absorbed the energy of primeval forests for decades. (Reference example — not for sale here)" },
        { name: "Wild Phellinus 926g", tag: "Reference Only", img: linteus1, desc: "Phellinus in Cambodian primeval forests grows naturally attached in shapes like this." },
        { name: "Wild Phellinus 980g", tag: "Reference Only", img: linteus2, desc: "This shows the shape of Phellinus Linteus harvested in its early stage. The green hues fade over time." },
        { name: "Phellinus Gift Set", tag: "Reference Only", img: linteus3, desc: "Reference example of Phellinus products available in Korea. This site does not sell products." },
        { name: "Phellinus Powder", tag: "Reference Only", img: linteus4, desc: "Reference example of Phellinus products available in Korea. This site does not sell products." },
        { name: "Vital Core Signature", tag: "Reference Only", img: linteus5, desc: "Reference example of Phellinus products available in Korea. This site does not sell products." }
      ],
      evidence: [
        { title: "Pancreatic Cancer Survival +1 Year", journal: "Severance Hospital Clinical Study", pmid: "40590265", summary: "In post-op chemotherapy patients, Phellinus group showed average survival of 47.0 months vs 35.0 months in control group. (Paid paper; click to search)", url: "https://scholar.google.com/scholar?q=Phellinus+linteus+pancreatic+cancer+survival" },
        { title: "Colorectal Cancer & Microbiome", journal: "Gut Microbiome Journal", pmid: "40752028", summary: "Reduces chemotherapy (5-FU) side effects and increases treatment efficiency by 1.5x. Improves gut environment via Akkermansia proliferation. (Paid paper; click to search)", url: "https://scholar.google.com/scholar?q=Phellinus+linteus+gut+microbiome+colorectal+cancer" },
        { title: "Dementia: Beta-Amyloid Inhibition", journal: "Neuroscience Research", pmid: "40234762", summary: "Blocks beta-amyloid toxicity (cause of Alzheimer's) and protects hippocampal cells, significantly improving memory and cognition. (Paid paper; click to search)", url: "https://scholar.google.com/scholar?q=Phellinus+linteus+beta+amyloid+alzheimer" },
        { title: "Skin Photoaging & Whitening", journal: "Dermatological Science", pmid: "40497052", summary: "Inhibits MMP-1 (collagen destruction) caused by UV, preventing wrinkles. Proved whitening effect equal to Arbutin. (Paid paper; click to search)", url: "https://scholar.google.com/scholar?q=Phellinus+linteus+skin+photoaging+remedy" },
        { title: "Liver Fibrosis & Hangover Relief", journal: "Liver International", pmid: "40228217", summary: "Blocks liver fibrosis and promotes alcohol breakdown. Induces rapid normalization of fatty liver and GOT/GPT levels. (Paid paper; click to search)", url: "https://scholar.google.com/scholar?q=Phellinus+linteus+liver+fibrosis+hepatoprotective" },
        { title: "Arthritis & Joint Protection", journal: "Rheumatology International", pmid: "40094337", summary: "Acts as natural COX-2 inhibitor relieving pain and edema. Prevents cartilage destruction, caring for both degenerative and rheumatoid arthritis. (Paid paper; click to search)", url: "https://scholar.google.com/scholar?q=Phellinus+linteus+anti-inflammatory+arthritis" },
        { title: "Prostate Health & Cancer Prevention", journal: "Urology Journal", pmid: "39806945", summary: "Inhibits DHT transformation preventing BPH and improving nocturia. Simultaneous inhibition of prostate cancer cell proliferation. (Paid paper; click to search)", url: "https://scholar.google.com/scholar?q=Phellinus+linteus+prostate+cancer+BPH" },
        { title: "Lung Defense: Dust & Smoking", journal: "Pulmonary Pharmacology", pmid: "39758739", summary: "Inhibits alveolar inflammation and fibrosis caused by fine dust and smoking. Enhances respiratory mucosal immunity (IgA). (Paid paper; click to search)", url: "https://scholar.google.com/scholar?q=Phellinus+linteus+lung+protection+air+pollution" },
        { title: "Diabetes & Weight Management", journal: "Diabetes & Metabolism", pmid: "39692936", summary: "Prevents post-meal glucose spikes and improves insulin resistance. Proved weight loss effect by inhibiting visceral fat differentiation. (Paid paper; click to search)", url: "https://scholar.google.com/scholar?q=Phellinus+linteus+diabetes+insulin+resistance" }
      ],
    },
    research: {
      title: "Scientific Verification",
      tabs: { summary: 'Immunity', cancer: 'Digestive Cancer', lung: 'Lung Health', liver: 'Liver Health', prostate: 'Prostate', diabetes: 'Diabetes', brain: 'Brain Health', skin: 'Skin/Aging', joint: 'Joint/Gout' },
      papers: researchPapersEn
    },
    benefits: {
      title: "Core Benefits",
      desc: "Full Body Shield",
      items: ["Immunity", "Blood Sugar", "Liver", "Anti-Aging", "Brain"],
      details: [
        {
          title: "1. Immune System Reinforcement",
          scientificTerm: "Immune System Reinforcement",
          summary: "Awaken your body's frontline defense, NK cells.",
          content: "Beta-glucan, the core component of Phellinus linteus, powerfully activates NK cells (Natural Killer Cells), the commanders of our immune system. It enhances innate immunity to respond first to invading viruses or abnormal cells, robustly protecting the body from external attacks.",
          evidence: "Phellinus linteus extract significantly increased survival rates in H1N1 influenza virus infection models (Control 25% vs Treated 60%) and demonstrated potent antiviral and immunomodulatory effects by recovering immune cell counts.",
          link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12692646/",
          mechanism: []
        },
        {
          title: "2. Vascular & Diabetes Care",
          scientificTerm: "Vascular & Diabetes Care",
          summary: "Control blood sugar spikes and clear your blood vessels.",
          content: "Phellinus linteus improves insulin resistance to help regulate blood sugar and lowers bad cholesterol (LDL) and triglycerides in the blood. It also promotes a healthy 'Gut-Vascular Axis' by increasing beneficial gut microbes, fundamentally improving the metabolic system.",
          evidence: "In type 2 diabetes models, Phellinus polysaccharide (SVP) intake significantly lowered fasting blood glucose, improved insulin resistance, and restored blood lipid profiles (hyperlipidemia) to normal levels.",
          link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9632624/",
          mechanism: []
        },
        {
          title: "3. Liver Function Recovery",
          scientificTerm: "Liver Function Recovery",
          summary: "Detox solution for your exhausted liver.",
          content: "Phellinus linteus protects liver cells with strong antioxidant action. It aids in the regeneration of liver cells damaged by alcohol, stress, and toxins, inhibits fatty liver, and reduces inflammation, revitalizing the liver.",
          evidence: "Phellinus mycelia significantly lowered liver enzymes (AST, ALT) in acute liver injury models induced by acetaminophen (P<0.001) and activated the antioxidant enzyme system (Nrf2 pathway) to prevent liver cell necrosis.",
          link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8226512/",
          mechanism: []
        },
        {
          title: "4. Anti-Aging & Skin Health",
          scientificTerm: "Anti-Aging & Skin Health",
          summary: "Elasticity from within, antioxidant protection against time.",
          content: "Polyphenols in Phellinus linteus remove free radicals, the main culprit of aging, and inhibit enzymes that destroy collagen. They prevent skin damage from UV rays and enhance the skin's natural defense.",
          evidence: "Human application tests and cell studies proved that Phellinus-derived substances (exosomes, etc.) inhibit UV-induced skin aging, decrease collagen-degrading enzymes (MMP1), and promote collagen production (COL1A2).",
          link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10159060/",
          mechanism: []
        },
        {
          title: "5. Cognitive Function Enhancement",
          scientificTerm: "Cognitive Function Enhancement",
          summary: "Smart habits to protect your memory.",
          content: "Hispidin, a unique component of Phellinus linteus, protects brain cells. It prevents oxidative stress that attacks nerve cells and inhibits the production of dementia-causing substances.",
          evidence: "Hispidin inhibits BACE1, an enzyme related to Alzheimer's disease, and protects nerve cells from oxidative stress, showing potential for preventing neurodegenerative diseases in multiple studies.",
          link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8143579/",
          mechanism: []
        }
      ],
      conclusion: "Science highlights that Phellinus significantly enhances your immunity."
    },
    usage: {
      title: "Usage",
      desc: "Wisdom to consume the full medicinal benefits",
      steps: [
        { step: "01", text: "Wash approx. 50g (about 2-3 pieces of this size) lightly under running water.", image: usage_step_01 },
        { step: "02", text: "Pour 1L~1.5L of water, boil fully twice, and drink. You can add water and re-boil 4~5 times.", image: usage_step_02 },
        { step: "03", text: "This is the golden color of authentic Phellinus tea. Drink it warm at least 3 times a day; enjoying more frequently is even better.", image: usage_step_03 },
        { step: "04", text: "This is a photo of the mushrooms I actually use. Sizes vary slightly by location and tree, but they are all authentic Phellinus linteus.", image: usage_step_04 }
      ],
      sub1: "Boiling Method",
      sub2: "Intake",
      safetyStudies: [
        {
          title: "1. Human Clinical Trial: Safety & Immunity",
          subtitle: "Effects of Phellinus linteus extract on immunity improvement",
          journal: "Medicine (Baltimore), 2022 Aug 26; 101(34)",
          result: "Enhanced immunity after 8 weeks of intake in adults. No toxicity or side effects (PMC9410671).",
          link: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9410671/"
        },
        {
          title: "2. Hepatoprotection: Detoxing, not Toxic",
          subtitle: "Mycelial culture of Phellinus linteus protects primary cultured rat hepatocytes against hepatotoxins",
          journal: "Journal of Ethnopharmacology (2004)",
          result: "Prevents hepatocyte destruction from toxins. (Paid paper; click to search title)",
          link: "https://scholar.google.com/scholar?q=Mycelial+culture+of+Phellinus+linteus+protects+primary+cultured+rat+hepatocytes+against+hepatotoxins"
        },
        {
          title: "3. Acute/Subacute Toxicity Test: Proven Safety",
          subtitle: "In vivo Antitumor Activity and Acute, Sub-acute Toxicity of Keumsa (Phellinus linteus) Extracts",
          journal: "Journal of Life Science",
          result: "No mortality at high doses (2,000mg/kg). (Paid paper; click to search title)",
          link: "https://scholar.google.com/scholar?q=In+vivo+Antitumor+Activity+and+Acute,+Sub-acute+Toxicity+of+Keumsa+(Phellinus+linteus)+Extracts"
        }
      ]
    },
    footer: {
      copy: "© 2026 Vital Core. All rights reserved.",
      contact: {
        label: "Admin Contact",
        telegram: "@cambodiabae",
        secret: "Private posts available on Q&A"
      },
      privacy_link: "Privacy Policy",
      terms_link: "Terms of Service",
      disclaimer_link: "Medical Disclaimer"
    },
    legal: {
      updated: "Last updated: June 13, 2026",
      privacy_title: "Privacy Policy",
      privacy_sections: [
        { title: "1. Information We Collect", body: "When you register, we collect your name, email address, phone number, and country of residence. We may also automatically collect information such as cookies, IP addresses, browser type, pages visited, and access timestamps during your use of the site." },
        { title: "2. How We Use Your Information", body: "Your information is used solely for member authentication and account management, responding to inquiries, improving our services, and fulfilling legal obligations. We do not use your information for any other purposes." },
        { title: "3. Data Retention", body: "Personal data is deleted promptly upon account deletion or once the purpose of collection has been fulfilled. Where applicable law requires retention for a specific period, data will be stored securely for that duration." },
        { title: "4. Third-Party Advertising (Google AdSense)", body: "This site uses Google AdSense, an advertising service provided by Google Inc. Third-party vendors, including Google, use cookies (including the DART cookie) to serve ads based on your prior visits to this site and other websites.\n\n• Opt out of personalized ads: https://www.google.com/settings/ads\n• Opt out of third-party cookies: https://www.aboutads.info" },
        { title: "5. Cookies", body: "We use cookies to maintain your login session, save language preferences, and improve service quality. You may disable or delete cookies through your browser settings; however, some features may not function correctly as a result." },
        { title: "6. Your Rights (GDPR & CCPA)", body: "EU residents have the right to access, correct, delete, restrict processing, and port their personal data. California residents have rights under the CCPA, including the right to know what personal information is collected and to opt out of its sale. To exercise these rights, please contact us at the address below." },
        { title: "7. Children's Privacy", body: "We do not knowingly collect personal information from children under the age of 13. If we become aware that such data has been collected, we will delete it immediately." },
        { title: "8. Data Security", body: "Collected personal data is protected through encryption and access control measures. Please note that no method of internet transmission is 100% secure." },
        { title: "9. Changes to This Policy", body: "This policy may be updated in response to legal changes or service improvements. We will notify users of any changes via a notice on this site." },
        { title: "10. Contact Us", body: "Email: cambodia.bae@gmail.com" }
      ],
      terms_title: "Terms of Service",
      terms_sections: [
        { title: "1. About the Service", body: "Vital Core Premium (www.linteus.com) is a health information portal providing scientific research and information about Phellinus linteus (Sanghwang Mushroom)." },
        { title: "2. Eligibility & Accounts", body: "You must be at least 13 years old to register. You are responsible for maintaining the security of your account credentials and must not share your account with others. Providing false information may result in termination of your account." },
        { title: "3. Content Purpose & Limitations", body: "All content on this site is provided for general informational purposes only and does not constitute medical diagnosis, treatment, prescription, or advice. Always consult a qualified healthcare professional for health-related decisions." },
        { title: "4. Intellectual Property", body: "All content on this site — including text, images, graphics, and logos — is protected by copyright law. Reproduction, distribution, or modification without prior written consent is prohibited." },
        { title: "5. Advertising & External Links", body: "This site may display third-party advertisements. We are not responsible for the content of advertisements or the practices of any external websites linked from this site." },
        { title: "6. Limitation of Liability", body: "We make no warranties regarding the accuracy or completeness of the content on this site. Our liability for any damages arising from your use of this site is limited to the maximum extent permitted by law." },
        { title: "7. Service Changes & Interruptions", body: "We reserve the right to modify or discontinue any part of the service at any time without prior notice." },
        { title: "8. Governing Law", body: "These Terms shall be governed by and interpreted in accordance with the laws of the Republic of Korea." },
        { title: "9. Changes to These Terms", body: "These Terms may be updated from time to time. Continued use of the service after changes are posted constitutes acceptance of the revised Terms." },
        { title: "10. Contact Us", body: "Email: cambodia.bae@gmail.com" }
      ],
      disclaimer_title: "Medical Disclaimer",
      disclaimer_sections: [
        { title: "For Informational Purposes Only", body: "All content published on this site (www.linteus.com) is intended solely for general information about Phellinus linteus and related health supplements. Nothing on this site constitutes medical diagnosis, treatment, prescription, or professional medical advice." },
        { title: "Consult a Healthcare Professional", body: "Before making any decisions regarding your health, medical conditions, treatments, or supplement use, always consult a qualified physician or licensed healthcare provider. Any action you take based on information from this site is entirely at your own risk." },
        { title: "Supplement — Not Medicine", body: "The products featured on this site are dietary supplements, not medicines. They are not intended to diagnose, treat, cure, or prevent any disease. Individual results may vary based on personal health conditions." },
        { title: "Citation of Research", body: "Academic research cited on this site reflects the findings and opinions of the respective researchers, not official medical positions of the site operator. Research results may not apply equally to all individuals." }
      ]
    },
    board: {
      ask_btn: "Ask Question",
      no_questions: "No questions yet. Be the first to ask!",
      secret_icon: "Secret",
      admin_answer: "Admin Answer",
      admin_reply_placeholder: "Write answer...",
      reply_btn: "Reply",
      edit_title: "Edit Question",
      create_title: "Ask Question",
      label_title: "Title",
      label_content: "Content",
      label_type: "Question Type",
      type_public: "General (Public)",
      type_secret: "Secret (Private)",
      placeholder_title: "Question Title",
      placeholder_content: "Ask anything about Phellinus Linteus...",
      submit_btn: "Submit Question",
      update_btn: "Update Question",
      edit_btn: "Edit",
      delete_btn: "Delete",
      tab_notice: "📢 Notices",
      tab_qna: "❓ Q&A"
    },
    admin: {
      tab_resets: "Password Resets",
      pw_reset_title: "Password Reset Requests",
      col_id: "Request ID",
      col_user: "User",
      col_email: "Email",
      col_status: "Status",
      col_action: "Action",
      status_pending: "Pending",
      btn_reset: "Reset to 'vital1234'",
      empty_requests: "No pending requests",
      reset_confirm: "This will reset the user's password to 'vital1234'. Continue?",
      reset_success: "Password reset successful. Temporary password is 'vital1234'.",
      reset_fail: "Failed to approve reset: "
    },
    auth: {
      forgot_pw: "Forgot Password?",
      email_reset_guide: "Enter your email to receive a reset link.",
      send_link: "Send Reset Link",
      back_login: "Back to Login",
      reset_pw_title: "Set New Password",
      new_pw: "New Password",
      confirm_pw: "Confirm Password",
      reset_btn: "Reset Password",
      link_sent: "Reset link sent to your email.",
      reset_complete: "Password reset successful. Please login with new password.",
      tab_login: "Login",
      tab_signup: "Sign Up",
      tab_reset: "Reset Password",
      btn_login: "Login",
      btn_signup: "Create Account",
      btn_cancel: "Cancel"
    }
  },
  zh: {
    nav: { about: "关于桑黄", research: "临床研究", benefits: "核心功效", usage: "服用方法", health: "健康日志", faq: "问答 / 公告" },
    hero: {
      badge: "Vital Core Premium",
      title_top: "大自然赐予的",
      title_highlight: "尊贵生命力",
      desc: "基于国际权威科学期刊同行评审学术论文\n桑黄(Phellinus linteus)健康信息共享平台（非销售网站）。",
      btn_research: "查看研究",
      scroll_text: "We possess innate natural healing power from birth. This is an inherent defense system designed to protect our lives from complex environmental dangers such as fungi and viruses. We often call this 'Immunity' or the 'Immune System'. Beyond simple defense, this system has the ability to recover and regenerate damaged cells and restore balance. We call this fundamental life system 'Vital Core'. If we correctly understand the principles of Vital Core, we see that the human body always operates to regain balance and recover. This site is created to bridge the essence of this natural healing power and Vital Core into modern life."
    },
    common: { view_paper: "查看论文", login: "登录" },
    about: {
      title: "桑黄 (Phellinus)",
      tabs: { intro: "基本信息", compounds: "核心成分", mechanism: "抗癌机理", evidence: "学术证据", recommended: "参考资料 (示例)" },
      cards: [
        { title: "环境与稀缺性", desc: "桑黄生长在海拔1000米以上的原始森林中，是一种极其罕见的药用菌类。由于人工栽培难度极大，被誉为“森林黄金”。柬埔寨和韩国产的自然桑黄在浓度和药性上具有压倒性的价值。我们致力于完整地保存并传递这种原始能量。" },
        { title: "核心成分", desc: "核心成分是高分子多糖体β-葡聚糖。它能从根本上重新设计人体的免疫系统。丰富的多酚和鞣花酸具有强效抗氧化作用，防止细胞变异。三萜类成分有助于肝脏解毒和调节血压。我们坚持使用通过科学分析验证的纯净成分。" },
        { title: "抗癌机理", desc: "桑黄并不直接攻击癌细胞，而是通过最大化人体的先天免疫力使癌细胞自愈。它激活NK细胞（自然杀伤细胞）以强化体内监视系统，并阻断癌细胞生存所需的血管生成。此外，它还调节细胞因子的分泌，抑制过度炎症反应。" },
        { title: "学术依据", desc: "桑黄的功效已通过数千篇国际学术论文得到证实。PubMed中每年都会更新关于其抗肿瘤和调节免疫的研究。日本国立癌症中心的研究显示，桑黄多糖的肿瘤抑制率达到96.7%。我们基于这些最新成就提供最可靠的信息。" }
      ],
      linteus_note: "下图是林特乌斯 (Phellinus Linteus)。",
      introDetails: [
        {
          title: "1. 名字的由来与含义",
          content: "韩语称为‘木质泥菇’，寓意其质地坚硬如木，色泽如泥。汉字‘桑黄’源自生长在桑树上的黄色蘑菇，但实际上它寄生在多种阔叶树上，质地皆为坚硬木质。"
        },
        {
          title: "2. 是植物还是动物?",
          content: "桑黄不属于植物，而是‘真菌(Fungi)’，即霉菌科。它不像植物那样扎根于土壤，因此‘菌种’比产地更关键。在220多种真菌中，韩国食药厅仅认可2种作为药用。"
        },
        {
          title: "3. 选择标准与种类",
          content: "食药厅认可的2大菌种：\n• Phellinus Linteus (林特乌斯)：自然产同源菌种。生长极慢（10年以上），极稀有，但抗癌及免疫功效最卓越。\n• Phellinus Baumi (鲍米)：由于易于农家栽培，是常见的黄色改良种，生长快且普遍。"
        }
      ],
      products: [
        { name: "自然桑黄 374g", tag: "参考示例", img: linteus0, desc: "吸收了原始森林数十年精气的顶级野生桑黄。（仅供参考，本站不销售）" },
        { name: "自然桑黄 926g", tag: "参考示例", img: linteus1, desc: "柬埔寨原始森林的桑黄通常以类似这种形状附着生长。" },
        { name: "自然桑黄 980g", tag: "参考示例", img: linteus2, desc: "这是Phellinus Linteus早期采摘时的形态。随着时间推移，绿色会消失。这是真正的木质泥菇。" },
        { name: "桑黄礼盒套装", tag: "参考示例", img: linteus3, desc: "韩国流通的桑黄产品参考示例。本网站不销售任何产品。" },
        { name: "桑黄粉末", tag: "参考示例", img: linteus4, desc: "韩国流通的桑黄产品参考示例。本网站不销售任何产品。" },
        { name: "Vital Core 签名版", tag: "参考示例", img: linteus5, desc: "韩国流通的桑黄产品参考示例。本网站不销售任何产品。" }
      ],
      evidence: [
        { title: "胰腺癌患者生存期延长1年", journal: "Severance Hospital Clinical Study", pmid: "40590265", summary: "术后化疗患者追踪观察结果显示，桑黄并用组平均生存期为47.0个月，比对照组（35.0个月）延长12个月。(付费论文：点击搜索标题)", url: "https://scholar.google.com/scholar?q=Phellinus+linteus+pancreatic+cancer+survival" },
        { title: "改善大肠癌及肠道微生物", journal: "Gut Microbiome Journal", pmid: "40752028", summary: "减少化疗（5-FU）副作用，提高治疗效率1.5倍。通过增殖次世代有益菌Akkermansia改善肠道环境。(付费论文：点击搜索标题)", url: "https://scholar.google.com/scholar?q=Phellinus+linteus+gut+microbiome+colorectal+cancer" },
        { title: "抑制痴呆原因Beta-淀粉样蛋白", journal: "Neuroscience Research", pmid: "40234762", summary: "阻断阿尔茨海默病致病物质Beta-淀粉样蛋白毒性，保护海马体细胞，显著改善记忆力和认知功能。(付费论文：点击搜索标题)", url: "https://scholar.google.com/scholar?q=Phellinus+linteus+beta+amyloid+alzheimer" },
        { title: "抑制皮肤光老化及美白", journal: "Dermatological Science", pmid: "40497052", summary: "抑制紫外线引起的胶原蛋白破坏酶（MMP-1），防止黑色素生成，证实有防皱及美白（同等熊果苷）效果。(付费论文：点击搜索标题)", url: "https://scholar.google.com/scholar?q=Phellinus+linteus+skin+photoaging+remedy" },
        { title: "抑制肝纤维化及解酒", journal: "Liver International", pmid: "40228217", summary: "阻断肝脏变硬的纤维化过程，促进酒精分解。诱导脂肪肝及肝指数（GOT/GPT）快速正常化。(付费论文：点击搜索标题)", url: "https://scholar.google.com/scholar?q=Phellinus+linteus+liver+fibrosis+hepatoprotective" },
        { title: "缓解关节炎疼痛及保护软骨", journal: "Rheumatology International", pmid: "40094337", summary: "作为天然COX-2抑制剂缓解关节疼痛和水肿。阻止软骨破坏酶，同时护理退行性和类风湿性关节炎。(付费论文：点击搜索标题)", url: "https://scholar.google.com/scholar?q=Phellinus+linteus+anti-inflammatory+arthritis" },
        { title: "前列腺肥大及癌症预防", journal: "Urology Journal", pmid: "39806945", summary: "抑制男性荷尔蒙变形（DHT），防止前列腺肥大，改善夜尿。同时确认抑制前列腺癌细胞增殖效果。(付费论文：点击搜索标题)", url: "https://scholar.google.com/scholar?q=Phellinus+linteus+prostate+cancer+BPH" },
        { title: "雾霾/吸烟肺损伤防御", journal: "Pulmonary Pharmacology", pmid: "39758739", summary: "抑制因雾霾和吸烟引起的肺泡炎症及肺纤维化。强化呼吸道黏膜免疫（IgA），增进病毒防御力。(付费论文：点击搜索标题)", url: "https://scholar.google.com/scholar?q=Phellinus+linteus+lung+protection+air+pollution" },
        { title: "糖尿病血糖调节及减肥", journal: "Diabetes & Metabolism", pmid: "39692936", summary: "防止餐后血糖飙升，改善胰岛素抵抗。证实抑制内脏脂肪细胞分化带来的体重减轻效果。(付费论文：点击搜索标题)", url: "https://scholar.google.com/scholar?q=Phellinus+linteus+diabetes+insulin+resistance" }
      ],
    },
    research: {
      title: "经验证的数据",
      tabs: { summary: '免疫/生存', cancer: '消化道癌', lung: '肺部健康', liver: '肝脏健康', prostate: '前立腺', diabetes: '糖尿/代谢', brain: '脑部健康', skin: '皮肤/抗衰', joint: '关节/痛风' },
      papers: researchPapersZh
    },
    benefits: {
      title: "5大核心功效",
      desc: "全身防护罩",
      items: ["免疫增强", "血糖护理", "肝脏恢复", "美肤抗衰", "认知提升"],
      details: [
        {
          title: "1. 免疫增强 (Immune System Reinforcement)",
          scientificTerm: "Immune System Reinforcement",
          summary: "唤醒体内的前线卫士——NK细胞",
          content: "桑黄的核心成分β-葡聚糖能强力激活人体免疫司令官“NK细胞（自然杀伤细胞）”。当病毒或异常细胞入侵时，提升最先应对的先天免疫力，从外部攻击中坚实地保护身体。",
          evidence: "桑黄提取物在H1N1流感病毒感染模型中显著提高了生存率（对照组25% vs 给药组60%），并证实了恢复免疫细胞数量的强效抗病毒及免疫调节效果。",
          link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12692646/",
          mechanism: []
        },
        {
          title: "2. 血糖及血管护理 (Vascular & Diabetes Care)",
          scientificTerm: "Vascular & Diabetes Care",
          summary: "控制血糖峰值，净化血管",
          content: "桑黄改善胰岛素抵抗，帮助调节血糖，并降低血液中的坏胆固醇（LDL）和中性脂肪数值。此外，通过增加有益肠道微生物，从根本上打造健康代谢系统，实现“肠-血管轴”护理。",
          evidence: "在2型糖尿病模型中，摄入桑黄多糖（SVP）显著降低了空腹血糖，改善了胰岛素抵抗，并将血脂谱（高脂血症）恢复至正常水平。",
          link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9632624/",
          mechanism: []
        },
        {
          title: "3. 肝功能恢复 (Liver Function Recovery)",
          scientificTerm: "Liver Function Recovery",
          summary: "疲惫肝脏的解毒方案",
          content: "如其名“桑黄”，这种与肝脏密切相关的蘑菇具有强大的抗氧化作用，保护肝细胞。它帮助因饮酒、压力、毒素受损的肝细胞再生，通过抑制脂肪肝及降低炎症数值，为沉默的器官——肝脏注入活力。",
          evidence: "桑黄菌丝体在对乙酰氨基酚等诱导的急性肝损伤模型中，显著降低了肝功能指标（AST, ALT）（P<0.001），并激活抗氧化酶系统（Nrf2通路），防止肝细胞坏死。",
          link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8226512/",
          mechanism: []
        },
        {
          title: "4. 皮肤抗衰老 (Anti-Aging & Skin Health)",
          scientificTerm: "Anti-Aging & Skin Health",
          summary: "源自深层的弹性，抵御岁月的抗氧化",
          content: "桑黄的多酚成分去除皮肤老化的主犯——活性氧，并抑制破坏胶原蛋白的酶。它能防止紫外线造成的皮肤损伤，提升皮肤本源防御力，有助于维持清透有弹性的皮肤。",
          evidence: "人体应用试验及细胞研究证明，桑黄来源物质（外泌体等）能抑制紫外线（UV）引起的皮肤老化，减少胶原蛋白分解酶（MMP1），促进胶原蛋白生成（COL1A2），从而改善皱纹及肤色。",
          link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10159060/",
          mechanism: []
        },
        {
          title: "5. 认知功能提升 (Cognitive Function Enhancement)",
          scientificTerm: "Cognitive Function Enhancement",
          summary: "守护记忆力的智慧习惯",
          content: "随着年龄增长而担心的健忘，桑黄特有成分“Hispidin”保护脑细胞。它阻断攻击神经细胞的氧化应激，抑制痴呆诱发物质的生成，帮助维持清晰健康的脑部活动。",
          evidence: "桑黄的核心成分Hispidin抑制与阿尔茨海默病相关的酶（BACE1），并保护神经细胞免受氧化应激，多项研究表明其在预防神经退行性疾病方面具有潜力。",
          link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8143579/",
          mechanism: []
        }
      ],
      conclusion: "科学研究证明长期服用桑黄能显著提高免疫力。"
    },
    usage: {
      title: "服用方法",
      desc: "完整摄取药性的智慧",
      steps: [
        { step: "01", text: "将约50g桑黄（约2-3块图片大小）在流水下轻轻洗净。", image: usage_step_01 },
        { step: "02", text: "倒入1L~1.5L水，煮沸两次即可饮用。也可反复加水煮4~5次。", image: usage_step_02 },
        { step: "03", text: "这是正宗桑黄煮出的金黄色泽。建议每天温热饮用至少3次，随时增加饮用量效果更佳。", image: usage_step_03 },
        { step: "04", text: "这是我实际使用的桑黄照片。虽然大小因生长位置和树木而异，但全都是正宗的桑黄(Phellinus linteus)。", image: usage_step_04 }
      ],
      sub1: "煎煮方法",
      sub2: "建议摄入",
      safetyStudies: [
        {
          title: "1. 人体临床试验：证实长期服用的安全性及免疫增强",
          subtitle: "Effects of Phellinus linteus extract on immunity improvement",
          journal: "Medicine (Baltimore), 2022 Aug 26; 101(34)",
          result: "成人服用8周后，免疫数值提升，且未发现肝/肾功能有任何毒性 (PMC9410671)。",
          link: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9410671/"
        },
        {
          title: "2. 肝细胞保护效果：非但无毒，反而助‘排毒’",
          subtitle: "Mycelial culture of Phellinus linteus protects primary cultured rat hepatocytes against hepatotoxins",
          journal: "Journal of Ethnopharmacology (2004)",
          result: "防止毒性物质破坏肝细胞。(付费论文：点击搜索标题)",
          link: "https://scholar.google.com/scholar?q=Mycelial+culture+of+Phellinus+linteus+protects+primary+cultured+rat+hepatocytes+against+hepatotoxins"
        },
        {
          title: "3. 急性/亚急性毒性测试：高剂量服用安全性证实",
          subtitle: "In vivo Antitumor Activity and Acute, Sub-acute Toxicity of Keumsa (Phellinus linteus) Extracts",
          journal: "Journal of Life Science",
          result: "高剂量(2,000mg/kg)给药无死亡。(付费论文：点击搜索标题)",
          link: "https://scholar.google.com/scholar?q=In+vivo+Antitumor+Activity+and+Acute,+Sub-acute+Toxicity+of+Keumsa+(Phellinus+linteus)+Extracts"
        }
      ]
    },
    footer: {
      copy: "© 2026 Vital Core. All rights reserved.",
      contact: {
        label: "管理员联系方式",
        telegram: "@cambodiabae",
        secret: "可在留言板发布秘密咨询"
      },
      privacy_link: "隐私政策",
      terms_link: "服务条款",
      disclaimer_link: "医疗免责声明"
    },
    legal: {
      updated: "最后更新日期：2026年6月13日",
      privacy_title: "隐私政策",
      privacy_sections: [
        { title: "1. 我们收集的信息", body: "注册时，我们会收集您的姓名、电子邮件地址、电话号码及居住国家。在您使用本网站的过程中，我们可能自动收集Cookie、IP地址、浏览器类型、访问页面及访问时间等信息。" },
        { title: "2. 信息使用目的", body: "所收集的信息仅用于会员认证与账户管理、回复咨询、改善服务以及履行法律义务。我们不会将您的信息用于其他任何目的。" },
        { title: "3. 数据保留期限", body: "账户注销或收集目的达成后，个人数据将立即删除。如适用法律要求在特定期限内保留，数据将在该期限内安全保存。" },
        { title: "4. 第三方广告服务（Google AdSense）", body: "本网站使用Google Inc.提供的广告服务Google AdSense。包括Google在内的第三方广告商会使用Cookie（包括DART Cookie），根据您过去对本网站及其他网站的访问记录投放个性化广告。\n\n• 关闭个性化广告：https://www.google.com/settings/ads\n• 第三方Cookie退出：https://www.aboutads.info" },
        { title: "5. Cookie使用", body: "我们使用Cookie来维持登录状态、保存语言偏好设置并改善服务质量。您可以通过浏览器设置拒绝或删除Cookie，但部分功能可能因此受限。" },
        { title: "6. 您的权利（GDPR与CCPA）", body: "欧盟用户有权访问、更正、删除其个人数据，并有权限制处理或请求数据可携带。加利福尼亚州用户依据CCPA享有知情权及拒绝出售个人数据的权利。如需行使上述权利，请通过以下联系方式与我们联系。" },
        { title: "7. 儿童隐私保护", body: "我们不会故意收集13岁以下儿童的个人信息。一经发现，将立即予以删除。" },
        { title: "8. 数据安全", body: "我们通过加密及访问控制等技术与管理措施保护您的个人数据。请注意，互联网传输方式无法保证100%的安全性。" },
        { title: "9. 政策变更", body: "本政策可能因法律变化或服务改进而更新。如有变更，我们将通过网站公告通知用户。" },
        { title: "10. 联系我们", body: "电子邮件：cambodia.bae@gmail.com" }
      ],
      terms_title: "服务条款",
      terms_sections: [
        { title: "1. 服务介绍", body: "Vital Core Premium（www.linteus.com）是一个提供桑黄菌（Phellinus linteus）科学研究与功效信息的健康信息门户。" },
        { title: "2. 注册资格与账户", body: "13岁及以上用户均可注册。您有责任妥善保管账户信息，不得与他人共享账户。提供虚假信息可能导致账户被限制或注销。" },
        { title: "3. 内容目的与局限性", body: "本网站所有内容仅供一般参考，不构成医学诊断、治疗、处方或医疗建议。健康相关决策前，请务必咨询具备资质的医疗专业人员。" },
        { title: "4. 知识产权", body: "本网站所有内容（包括文字、图片、图形、标志等）受版权法保护。未经事先书面许可，禁止复制、分发或修改。" },
        { title: "5. 广告与外部链接", body: "本网站可能展示第三方广告。广告内容及外部链接网站的责任由相应广告主承担，本网站不对此负责。" },
        { title: "6. 责任限制", body: "本网站不对内容的准确性或完整性作出任何明示或暗示的保证。因使用本网站而产生的任何损失，本网站的责任以法律允许的最大范围为限。" },
        { title: "7. 服务变更与中断", body: "运营者有权在不事先通知的情况下变更或中断部分或全部服务。" },
        { title: "8. 适用法律", body: "本条款依据大韩民国法律解释与适用。" },
        { title: "9. 条款变更", body: "本条款可能不时更新。更新后继续使用服务，即视为接受修订后的条款。" },
        { title: "10. 联系我们", body: "电子邮件：cambodia.bae@gmail.com" }
      ],
      disclaimer_title: "医疗免责声明",
      disclaimer_sections: [
        { title: "仅供参考", body: "本网站（www.linteus.com）发布的所有内容，仅供提供有关桑黄菌（Phellinus linteus）及相关健康食品的一般信息。本网站任何信息均不构成医学诊断、治疗、处方或专业医疗建议。" },
        { title: "请咨询医疗专业人员", body: "在就健康状况、疾病、治疗方案或健康食品使用作出任何决定之前，请务必咨询具备资质的医生或持证医疗提供者。依据本网站信息所采取的任何行动，风险由您本人承担。" },
        { title: "保健品，非药品", body: "本网站介绍的产品为保健食品，非药品，不以诊断、治疗、治愈或预防任何疾病为目的。个人效果因健康状况而异。" },
        { title: "研究资料引用说明", body: "本网站引用的学术研究结果反映相关研究人员的观点，并非本网站运营者的官方医学立场。研究结果不一定适用于所有个体。" }
      ]
    },
    board: {
      ask_btn: "提问",
      no_questions: "暂无提问。成为第一个提问者吧！",
      secret_icon: "秘密",
      admin_answer: "管理员回复",
      admin_reply_placeholder: "输入回复...",
      reply_btn: "回复",
      edit_title: "编辑提问",
      create_title: "撰写新提问",
      label_title: "标题",
      label_content: "内容",
      label_type: "提问类型",
      type_public: "普通提问 (公开)",
      type_secret: "秘密提问 (不公开)",
      placeholder_title: "请输入标题",
      placeholder_content: "请随意咨询关于桑黄的功效、服用方法、产品等问题。",
      submit_btn: "提交提问",
      update_btn: "完成修改",
      edit_btn: "编辑",
      delete_btn: "删除",
      tab_notice: "📢 公告",
      tab_qna: "❓ 问答"
    },
    admin: {
      tab_resets: "密码重置",
      pw_reset_title: "密码重置请求",
      col_id: "请求 ID",
      col_user: "用户",
      col_email: "电子邮箱",
      col_status: "状态",
      col_action: "操作",
      status_pending: "待处理",
      btn_reset: "重置为 'vital1234'",
      empty_requests: "暂无待处理请求",
      reset_confirm: "确定将用户密码重置为 'vital1234' 吗？",
      reset_success: "密码已重置为 'vital1234'。",
      reset_fail: "重置失败: "
    },
    auth: {
      forgot_pw: "忘记密码?",
      email_reset_guide: "请输入您的注册邮箱，我们将发送重置链接。",
      send_link: "发送重置链接",
      back_login: "返回登录",
      reset_pw_title: "设置新密码",
      new_pw: "新密码",
      confirm_pw: "确认密码",
      reset_btn: "重置密码",
      link_sent: "重置链接已发送至您的邮箱。",
      reset_complete: "密码重置成功。请使用新密码登录。",
      tab_login: "登录",
      tab_signup: "注册",
      tab_reset: "找回/设置密码",
      btn_login: "登录",
      btn_signup: "创建账户",
      btn_cancel: "取消"
    }
  },
  ja: {
    nav: { about: "メシマコブ情報", research: "臨床研究", benefits: "主な効能", usage: "服用方法", health: "ウェルネスジャーナル", faq: "Q&A / お知らせ" },
    hero: {
      badge: "Vital Core Premium",
      title_top: "大自然が贈る",
      title_highlight: "気高い生命力",
      desc: "国際科学誌に掲載されたピアレビュー済み論文に基づく\nメシマコブ(Phellinus linteus)健康情報共有プラットフォームです（販売サイトではありません）。",
      btn_research: "研究を見る",
      scroll_text: "We possess innate natural healing power from birth. This is an inherent defense system designed to protect our lives from complex environmental dangers such as fungi and viruses. We often call this 'Immunity' or the 'Immune System'. Beyond simple defense, this system has the ability to recover and regenerate damaged cells and restore balance. We call this fundamental life system 'Vital Core'. If we correctly understand the principles of Vital Core, we see that the human body always operates to regain balance and recover. This site is created to bridge the essence of this natural healing power and Vital Core into modern life."
    },
    common: { view_paper: "論文確認", login: "ログイン" },
    about: {
      title: "メシマコブ (Phellinus)",
      tabs: { intro: "基本情報", compounds: "主要成分", mechanism: "作用機序", evidence: "学術根拠", recommended: "参考情報 (例示)" },
      cards: [
        { title: "環境と希少性", desc: "標高1000m以上の原生林で数十年間成長した最高品質のメシマコブのみを使用しています。人工栽培が非常に困難なため「神から授かったキノコ」と呼ばれています。原生林のエネルギーをそのままお届けすることを最優先事項としています。" },
        { title: "主要成分", desc: "最も核心的な成分はベータグルカン(1-3, 1-6)です。他のキノコ類と比較して圧倒的に高い含有量を誇り、免疫体系を根本から再設計します。ポリフェノールも豊富で、細胞の老化と変異を防ぎます。科学的に検証された純粋な成分のみにこだわっています。" },
        { title: "作用機序", desc: "癌細胞を直接攻撃するのではなく、体内の先天的な免疫力を極大化させます。NK細胞を活性化させて監視システムを強化し、癌細胞が必要とする新生血管の形成を遮断します。また、炎症反応を抑制し、バランスの取れた免疫状態を維持させます。" },
        { title: "学術的根拠", desc: "数千の学術論文を通じてその価値が立証されています。PubMedには抗腫瘍や免疫調節に関する研究結果が毎年更新されています。日本の国立がんセンターの研究では、腫瘍阻止率が96.7%に達するという結果が発表されました。信頼できる情報を提供します。" }
      ],
      linteus_note: "下の写真は Phellinus Linteus (リンテウス) です。",
      introDetails: [
        {
          title: "1. 名前の由来と意味",
          content: "韓国語では「木質泥キノコ」と呼ばれ、木のように硬い質感と泥のような色を帯びているという意味が込められています。漢字語の「桑黄」は桑の木で育つ黄色いキノコという意味に由来しますが、実際には桑の木以外にも様々な広葉樹に自生し、すべて硬い木質で構成されています。"
        },
        {
          title: "2. 植物か？動物か？",
          content: "メシマコブは植物ではなく「菌類(Fungi)」、つまりカビ科(真菌)に属します。植物のように土壌に根を下ろすわけではないため、産地(身土不二)よりもどのような「種菌」であるかが効能の核心です。全220種余りの真菌のうち、韓国食品医薬品安全庁が薬用として認めているのはわずか2種類だけです。"
        },
        {
          title: "3. 選択の基準と種類",
          content: "食品医薬品安全庁認定の2大種菌：\n• Phellinus Linteus (リンテウス)：自然産と同一の種菌。成長速度が非常に遅く（10年以上）、希少ですが、抗がんおよび免疫効能が最も優れています。\n• Phellinus Baumi (バウミ)：農家で栽培しやすい黄色い改良種で、成長が早く一般的です。"
        }
      ],
      products: [
        { name: "自然産メシマコブ 374g", tag: "参考例示", img: linteus0, desc: "数十年間、原生林の精気を浴びた最高級の自然産メシマコブです。（参考例示のみ・非売品）" },
        { name: "自然産メシマコブ 926g", tag: "参考例示", img: linteus1, desc: "カンボジア原生林のメシマコブは、このような形で自生しています。" },
        { name: "自然産メシマコブ 980g", tag: "参考例示", img: linteus2, desc: "初期のPhellinus Linteus（メシマコブ）の形状です。時間が経つにつれて緑色は消えていきます。まさに木質泥キノコです。" },
        { name: "メシマコブギフトセット", tag: "参考例示", img: linteus3, desc: "韓国で流通しているメシマコブ製品の参考例示です。本サイトでは販売しておりません。" },
        { name: "メシマコブ粉末", tag: "参考例示", img: linteus4, desc: "韓国で流通しているメシマコブ製品の参考例示です。本サイトでは販売しておりません。" },
        { name: "Vital Core シグネチャー", tag: "参考例示", img: linteus5, desc: "韓国で流通しているメシマコブ製品の参考例示です。本サイトでは販売しておりません。" }
      ],
      evidence: [
        { title: "膵臓がん患者の生存率1年延長", journal: "Severance Hospital Clinical Study", pmid: "40590265", summary: "術後抗がん治療患者の追跡観察の結果、メシマコブ併用群の平均生存期間が47.0ヶ月で、対照群（35.0ヶ月）より12ヶ月延長。(有料論文：クリックしてタイトル検索)", url: "https://scholar.google.com/scholar?q=Phellinus+linteus+pancreatic+cancer+survival" },
        { title: "大腸がんおよび腸内微生物改善", journal: "Gut Microbiome Journal", pmid: "40752028", summary: "抗がん剤（5-FU）の副作用を減らし、治療効率を1.5倍向上。次世代有益菌アッカーマンシアの増殖による腸内環境改善。(有料論文：クリックしてタイトル検索)", url: "https://scholar.google.com/scholar?q=Phellinus+linteus+gut+microbiome+colorectal+cancer" },
        { title: "認知症原因ベータアミロイド抑制", journal: "Neuroscience Research", pmid: "40234762", summary: "アルツハイマーの原因物質であるベータアミロイド毒性を遮断し、海馬細胞を保護して記憶力と認知機能を画期的に改善。(有料論文：クリックしてタイトル検索)", url: "https://scholar.google.com/scholar?q=Phellinus+linteus+beta+amyloid+alzheimer" },
        { title: "皮膚光老化抑制および美白", journal: "Dermatological Science", pmid: "40497052", summary: "紫外線によるコラーゲン破壊酵素（MMP-1）を抑制し、メラニン生成を防いでシワ防止および美白（アルブチン同等）効果を立証。(有料論文：クリックしてタイトル検索)", url: "https://scholar.google.com/scholar?q=Phellinus+linteus+skin+photoaging+remedy" },
        { title: "肝線維化抑制および二日酔い解消", journal: "Liver International", pmid: "40228217", summary: "肝臓が硬くなる線維化過程を遮断し、アルコール分解を促進。脂肪肝および肝数値（GOT/GPT）の急速な正常化を誘導。(有料論文：クリックしてタイトル検索)", url: "https://scholar.google.com/scholar?q=Phellinus+linteus+liver+fibrosis+hepatoprotective" },
        { title: "関節炎の痛み緩和および軟骨保護", journal: "Rheumatology International", pmid: "40094337", summary: "天然COX-2阻害剤として作用し、関節の痛みとむくみを緩和。軟骨破壊酵素を防ぎ、変形性および関節リウマチを同時ケア。(有料論文：クリックしてタイトル検索)", url: "https://scholar.google.com/scholar?q=Phellinus+linteus+anti-inflammatory+arthritis" },
        { title: "前立腺肥大症およびがん予防", journal: "Urology Journal", pmid: "39806945", summary: "男性ホルモンの変形（DHT）を抑制して前立腺肥大を防ぎ、夜間頻尿を改善。前立腺がん細胞の増殖抑制効果も同時に確認。(有料論文：クリックしてタイトル検索)", url: "https://scholar.google.com/scholar?q=Phellinus+linteus+prostate+cancer+BPH" },
        { title: "PM2.5/喫煙による肺損傷防御", journal: "Pulmonary Pharmacology", pmid: "39758739", summary: "PM2.5と喫煙による肺胞炎症および肺線維化を抑制。呼吸器粘膜免疫（IgA）を強化し、ウイルス防御力を増進。(有料論文：クリックしてタイトル検索)", url: "https://scholar.google.com/scholar?q=Phellinus+linteus+lung+protection+air+pollution" },
        { title: "糖尿病血糖調節およびダイエット", journal: "Diabetes & Metabolism", pmid: "39692936", summary: "食後の血糖値スパイクを防ぎ、インスリン抵抗性を改善。内臓脂肪細胞の分化を抑制することによる体重減少効果を立証。(有料論文：クリックしてタイトル検索)", url: "https://scholar.google.com/scholar?q=Phellinus+linteus+diabetes+insulin+resistance" }
      ],
    },
    research: {
      title: "検証されたデータ",
      tabs: { summary: '免疫/生存', cancer: '消化器がん', lung: '肺の健康', liver: '肝臓の健康', prostate: '前立腺', diabetes: '糖尿/代謝', brain: '脳の健康', skin: '皮膚/老化', joint: '関節/痛風' },
      papers: researchPapersJa
    },
    benefits: {
      title: "5大効能",
      desc: "全身防御膜",
      items: ["免疫強化", "血糖ケア", "肝機能回復", "美肌抗老化", "認知向上"],
      details: [
        {
          title: "1. 免疫システム強化 (Immune System Reinforcement)",
          scientificTerm: "Immune System Reinforcement",
          summary: "私の体の最前線の守備手、NK細胞を目覚めさせる",
          content: "メシマコブの核心成分であるベータグルカンは、私たち体の免疫司令官である「NK細胞（ナチュラルキラー細胞）」を強力に活性化します。ウイルスや異常細胞が侵入した際に真っ先に対応する自然免疫力を高め、外部の攻撃から身体をしっかりと保護します。",
          evidence: "メシマコブ抽出物は、インフルエンザウイルス（H1N1）感染モデルにおいて生存率を有意に高め（対照群25％対投与群60％）、免疫細胞の数を回復させる強力な抗ウイルスおよび免疫調節効果が立証されました。",
          link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC12692646/",
          mechanism: []
        },
        {
          title: "2. 血管および糖尿ケア (Vascular & Diabetes Care)",
          scientificTerm: "Vascular & Diabetes Care",
          summary: "血糖スパイクを抑え、血管をきれいに",
          content: "食後に急上昇する血糖と濁った血液が心配ですか？メシマコブはインスリン抵抗性を改善して血糖調節を助け、血中の悪玉コレステロール（LDL）と中性脂肪値を下げるのに役立ちます。また、有益な腸内微生物を増やし、代謝システムを根本的に健康にする「腸-血管軸」ケアを実現します。",
          evidence: "2型糖尿病モデルにおいて、メシマコブ多糖体（SVP）摂取は空腹時血糖を下げ、インスリン抵抗性を改善し、血中脂質プロファイル（高脂血症）を正常レベルに回復させる有意な結果が確認されました。",
          link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9632624/",
          mechanism: []
        },
        {
          title: "3. 肝機能回復 (Liver Function Recovery)",
          scientificTerm: "Liver Function Recovery",
          summary: "疲れた肝臓のための解毒ソリューション",
          content: "「桑黄」という名前のように肝臓と密接なこのキノコは、強力な抗酸化作用で肝細胞を保護します。飲酒、ストレス、毒素によって損傷した肝細胞の再生を助け、脂肪肝の抑制および炎症数値の減少を通じて、沈黙の臓器である肝臓に活力を吹き込みます。",
          evidence: "メシマコブ菌糸体は、アセトアミノフェンなどで誘発された急性肝損傷モデルにおいて肝数値（AST、ALT）を有意に下げ（P<0.001）、抗酸化酵素システム（Nrf2経路）を活性化して肝細胞壊死を防ぐ卓越した肝保護効果を示しました。",
          link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8226512/",
          mechanism: []
        },
        {
          title: "4. 肌の抗老化 (Anti-Aging & Skin Health)",
          scientificTerm: "Anti-Aging & Skin Health",
          summary: "内側から満ちる弾力、歳月を防ぐ抗酸化",
          content: "メシマコブのポリフェノール成分は、肌老化の主犯である活性酸素を除去し、コラーゲンを破壊する酵素を抑制します。紫外線による皮膚損傷を防ぎ、肌本来の防御力を高め、透明で弾力のある肌を維持するのに寄与します。",
          evidence: "人体適用試験および細胞研究において、メシマコブ由来物質（エクソソームなど）は紫外線（UV）による肌老化を抑制し、コラーゲン分解酵素（MMP1）を減少させ、コラーゲン生成（COL1A2）を促進してシワおよび肌のトーンを改善する効果が立証されました。",
          link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10159060/",
          mechanism: []
        },
        {
          title: "5. 認知機能向上 (Cognitive Function Enhancement)",
          scientificTerm: "Cognitive Function Enhancement",
          summary: "記憶力を守るスマートな習慣",
          content: "年齢とともに心配になる物忘れ、メシマコブ特有の成分である「ヒスピジン（Hispidin）」が脳細胞を保護します。神経細胞を攻撃する酸化ストレスを防ぎ、認知症誘発物質の生成を抑制して、明晰で健康な脳活動を維持するのを助けます。",
          evidence: "メシマコブの核心成分であるヒスピジンは、アルツハイマー病に関連する酵素（BACE1）を抑制し、酸化ストレスから神経細胞を保護し、神経変性疾患の予防に潜在力があることが多数の研究で明らかになりました。",
          link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8143579/",
          mechanism: []
        }
      ],
      conclusion: "メシマコブを継続的に服用することで免疫力が向上することが証明されています。"
    },
    usage: {
      title: "服用方法",
      desc: "薬効を完全に摂取する知恵",
      steps: [
        { step: "01", text: "メシマコブ約50g（写真のサイズで2〜3個程度）を流水で軽く洗います。", image: usage_step_01 },
        { step: "02", text: "水1L〜1.5Lを注ぎ、2回ほど沸騰させて飲みます。水を足して4〜5回再沸騰させても良いです。", image: usage_step_02 },
        { step: "03", text: "これは本物のメシマコブを煎じた黄金色です。温かい状態で1日3回以上飲み、合間にさらに飲んでも構いません。", image: usage_step_03 },
        { step: "04", text: "私が実際に使用しているキノコの写真です。場所や木によって大きさは少し異なりますが、すべて本物のメシマコブ（Phellinus linteus）です。", image: usage_step_04 }
      ],
      sub1: "煎じ方",
      sub2: "推奨摂取",
      safetyStudies: [
        {
          title: "1. 人体適用試験：長期摂取時の安全性および免疫増進の立証",
          subtitle: "Effects of Phellinus linteus extract on immunity improvement",
          journal: "Medicine (Baltimore), 2022 Aug 26; 101(34)",
          result: "成人対象の8週間摂取で免疫数値が向上し、毒性なし (PMC9410671)。",
          link: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9410671/"
        },
        {
          title: "2. 肝細胞保護効果：「毒」ではなくむしろ「解毒」を助ける",
          subtitle: "Mycelial culture of Phellinus linteus protects primary cultured rat hepatocytes against hepatotoxins",
          journal: "Journal of Ethnopharmacology (2004)",
          result: "毒性物質による肝細胞破壊を防止。(有料論文：クリックしてタイトル検索)",
          link: "https://scholar.google.com/scholar?q=Mycelial+culture+of+Phellinus+linteus+protects+primary+cultured+rat+hepatocytes+against+hepatotoxins"
        },
        {
          title: "3. 急性/亜急性毒性試験：高用量摂取の安全性立証",
          subtitle: "In vivo Antitumor Activity and Acute, Sub-acute Toxicity of Keumsa (Phellinus linteus) Extracts",
          journal: "Journal of Life Science",
          result: "高用量(2,000mg/kg)投与でも死亡なし。(有料論文：クリックしてタイトル検索)",
          link: "https://scholar.google.com/scholar?q=In+vivo+Antitumor+Activity+and+Acute,+Sub-acute+Toxicity+of+Keumsa+(Phellinus+linteus)+Extracts"
        }
      ]
    },
    footer: {
      copy: "© 2026 Vital Core. All rights reserved.",
      contact: {
        label: "管理者連絡先",
        telegram: "@cambodiabae",
        secret: "掲示板での秘密投稿が可能"
      },
      privacy_link: "プライバシーポリシー",
      terms_link: "利用規約",
      disclaimer_link: "医療免責事項"
    },
    legal: {
      updated: "最終更新日：2026年6月13日",
      privacy_title: "プライバシーポリシー",
      privacy_sections: [
        { title: "1. 収集する情報", body: "会員登録時にお名前、メールアドレス、電話番号、お住まいの国を収集します。また、サイト利用中にCookie、IPアドレス、ブラウザの種類、閲覧ページ、アクセス時刻などの情報が自動的に収集される場合があります。" },
        { title: "2. 情報の利用目的", body: "収集した情報は、会員認証とアカウント管理、お問い合わせへの対応、サービスの改善、および法的義務の履行にのみ使用します。収集目的以外には使用いたしません。" },
        { title: "3. 保管期間", body: "個人情報は、退会時または収集目的の達成後に速やかに削除します。法令により一定期間の保管が義務付けられている場合は、当該期間中安全に保管します。" },
        { title: "4. 第三者広告サービス（Google AdSense）", body: "当サイトはGoogle Inc.の広告サービスであるGoogle AdSenseを利用します。Googleを含む第三者広告配信事業者は、Cookie（DARTクッキーを含む）を使用して、ユーザーの当サイトおよび他サイトへの過去のアクセス情報を基に広告を配信します。\n\n• パーソナライズ広告の無効化：https://www.google.com/settings/ads\n• 第三者Cookieのオプトアウト：https://www.aboutads.info" },
        { title: "5. Cookieの使用", body: "ログインセッションの維持、言語設定の保存、サービス品質の向上のためにCookieを使用します。ブラウザの設定からCookieを拒否・削除することができますが、一部の機能が制限される場合があります。" },
        { title: "6. お客様の権利（GDPRおよびCCPA）", body: "EU在住の方は、個人情報へのアクセス、訂正、削除、処理の制限、データポータビリティを求める権利があります。カリフォルニア州在住の方は、CCPAに基づき、個人情報の収集状況の確認および個人情報の販売拒否の権利を有します。権利の行使は下記連絡先へお問い合わせください。" },
        { title: "7. 子どものプライバシー保護", body: "当サイトは13歳未満の子どもから意図的に個人情報を収集することはありません。該当する情報の収集が判明した場合は、直ちに削除いたします。" },
        { title: "8. 情報セキュリティ", body: "収集した個人情報は、暗号化およびアクセス制御などの技術的・管理的措置により安全に管理されます。ただし、インターネットを介した送信は100%の安全性を保証するものではありません。" },
        { title: "9. ポリシーの変更", body: "本ポリシーは法令の改正やサービスの改善に伴い変更される場合があります。変更の際はサイト上でお知らせします。" },
        { title: "10. お問い合わせ", body: "メールアドレス：cambodia.bae@gmail.com" }
      ],
      terms_title: "利用規約",
      terms_sections: [
        { title: "1. サービスのご紹介", body: "Vital Core Premium（www.linteus.com）は、メシマコブ（Phellinus linteus）に関する科学的研究と効能情報を提供するヘルス情報ポータルです。" },
        { title: "2. 利用資格とアカウント", body: "13歳以上の方であれば会員登録いただけます。アカウント情報の安全な管理はお客様の責任です。アカウントを他者と共有することは禁止されています。虚偽情報でのご登録は利用停止の対象となります。" },
        { title: "3. コンテンツの目的と限界", body: "当サイトのすべてのコンテンツは一般的な情報提供を目的としており、医学的診断・治療・処方・医療上のアドバイスを代替するものではありません。健康に関わる判断は必ず資格を持つ医療専門家にご相談ください。" },
        { title: "4. 知的財産権", body: "当サイトのすべてのコンテンツ（テキスト、画像、グラフィック、ロゴ等）は著作権法により保護されています。事前の書面による許可なく、複製・配布・改変することを禁じます。" },
        { title: "5. 広告および外部リンク", body: "当サイトには第三者広告が掲載される場合があります。広告内容および外部リンク先サイトについての責任は各広告主に帰属し、当サイトは責任を負いません。" },
        { title: "6. 免責事項", body: "当サイトはコンテンツの正確性・完全性について明示・黙示を問わず保証しません。当サイトの利用に起因するいかなる損害についても、法律の許容する最大限の範囲で責任を制限します。" },
        { title: "7. サービスの変更・中断", body: "運営者は予告なくサービスの一部または全部を変更・中断する権利を有します。" },
        { title: "8. 準拠法", body: "本規約は大韓民国の法律に従って解釈・適用されます。" },
        { title: "9. 規約の変更", body: "本規約は随時更新される場合があります。変更後もサービスを継続してご利用いただくことで、改定後の規約に同意したものとみなします。" },
        { title: "10. お問い合わせ", body: "メールアドレス：cambodia.bae@gmail.com" }
      ],
      disclaimer_title: "医療免責事項",
      disclaimer_sections: [
        { title: "情報提供目的", body: "当サイト（www.linteus.com）に掲載されているすべてのコンテンツは、メシマコブ（Phellinus linteus）および関連する健康食品に関する一般的な情報提供のみを目的としています。当サイトのいかなる情報も、医学的診断・治療・処方または医療上のアドバイスを構成するものではありません。" },
        { title: "医療専門家への相談を推奨", body: "健康状態、疾患、治療法または健康食品の使用に関するいかなる判断においても、必ず資格を有する医師または医療従事者にご相談ください。当サイトの情報を基にした行動はすべてご自身の責任となります。" },
        { title: "健康食品であり医薬品ではありません", body: "当サイトで紹介する製品は健康食品であり、疾病の診断・治療・治癒・予防を目的とする医薬品ではありません。効果には個人差があります。" },
        { title: "研究資料の引用について", body: "当サイトに引用されている学術研究の結果は、各研究者の見解を反映したものであり、運営者の公式な医学的見解ではありません。研究結果はすべての個人に同様に適用されるものではありません。" }
      ]
    },
    board: {
      ask_btn: "質問する",
      no_questions: "登録された質問がありません。最初の質問を投稿してみましょう！",
      secret_icon: "秘密",
      admin_answer: "管理者回答",
      admin_reply_placeholder: "回答を入力...",
      reply_btn: "回答登録",
      edit_title: "質問修正",
      create_title: "新しい質問を作成",
      label_title: "タイトル",
      label_content: "内容",
      label_type: "質問タイプ",
      type_public: "一般質問 (公開)",
      type_secret: "秘密質問 (非公開)",
      placeholder_title: "タイトルを入力してください",
      placeholder_content: "メシマコブの効能、服用方法、製品のお問い合わせなど、お気軽にご質問ください。",
      submit_btn: "質問登録",
      update_btn: "修正完了",
      edit_btn: "修正",
      delete_btn: "削除",
      tab_notice: "📢 お知らせ",
      tab_qna: "❓ Q&A"
    },
    admin: {
      tab_resets: "PWリセット",
      pw_reset_title: "パスワードリセット要請",
      col_id: "要請ID",
      col_user: "ユーザー",
      col_email: "メール",
      col_status: "状態",
      col_action: "操作",
      status_pending: "待機中",
      btn_reset: "初期化 (vital1234)",
      empty_requests: "待機中の要請はありません",
      reset_confirm: "ユーザーのパスワードを 'vital1234' に初期化しますか？",
      reset_success: "パスワードが 'vital1234' に初期化されました。",
      reset_fail: "初期化失敗: "
    },
    auth: {
      forgot_pw: "パスワードをお忘れですか？",
      email_reset_guide: "登録したメールアドレスを入力してください。リセットリンクを送信します。",
      send_link: "リセットリンクを送信",
      back_login: "ログインに戻る",
      reset_pw_title: "新しいパスワードの設定",
      new_pw: "新しいパスワード",
      confirm_pw: "パスワード確認",
      reset_btn: "パスワード変更",
      link_sent: "リセットリンクがメールで送信されました。",
      reset_complete: "パスワードが変更されました。新しいパスワードでログインしてください。",
      tab_login: "ログイン",
      tab_signup: "登録",
      tab_reset: "パスワード再設定",
      btn_login: "ログイン",
      btn_signup: "アカウント作成",
      btn_cancel: "キャンセル"
    }
  }

};

export const VitalCoreLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 200 200" className={`${className} group cursor-pointer overflow-visible`} xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    {/* 고정된 금색 외곽 원 */}
    <circle
      cx="100"
      cy="100"
      r="90"
      fill="none"
      stroke="#D97706"
      strokeWidth="4"
    >
      <animate
        attributeName="stroke-opacity"
        values="0.3; 1; 0.5; 1; 0.3"
        dur="1.8s"
        repeatCount="indefinite"
        keyTimes="0; 0.15; 0.3; 0.45; 1"
        calcMode="spline"
        keySplines="0.4, 0, 0.2, 1; 0.4, 0, 0.2, 1; 0.4, 0, 0.2, 1; 0.4, 0, 0.2, 1"
      />
      <animate
        attributeName="stroke-width"
        values="4; 8; 5; 8; 4"
        dur="1.8s"
        repeatCount="indefinite"
        keyTimes="0; 0.15; 0.3; 0.45; 1"
      />
    </circle>

    {/* 심박 파형 (EKG Graph) */}
    <path
      d="M20,100 L60,100 L70,80 L80,120 L90,40 L110,160 L120,100 L140,100 L150,90 L160,110 L180,100"
      fill="none"
      stroke="#F59E0B"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
      filter="url(#goldGlow)"
      strokeDasharray="600"
      strokeDashoffset="600"
    >
      <animate
        attributeName="stroke-dashoffset"
        values="600;0"
        dur="1.8s"
        repeatCount="indefinite"
        calcMode="spline"
        keySplines="0.4, 0, 0.2, 1"
      />
      <animate
        attributeName="stroke-opacity"
        values="0.2; 1; 0.4; 1; 0.2"
        dur="1.8s"
        repeatCount="indefinite"
        keyTimes="0; 0.15; 0.3; 0.45; 1"
      />
    </path>
  </svg>
);
