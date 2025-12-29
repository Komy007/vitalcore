
import React from 'react';
import { Translation } from './types';

// Local Image Imports
import usage_step_01 from './img/usage_step_01.jpg';
import usage_step_02 from './img/usage_step_02.jpg';
import usage_step_03 from './img/usage_step_03.png';
import usage_step_04 from './img/usage_step_04.png';
import linteus0 from './img/linteus0.png';
import linteus1 from './img/linteus1_new.png';
import linteus2 from './img/linteus2.jpg';
import linteus3 from './img/linteus3.jpg';
import linteus4 from './img/linteus4.png';
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
  summary: { title: "NK세포 활성 및 생존율 증가", journal: "CONSORT Clinical Trial", impact: "Clinical Study", url: "https://www.researchgate.net/publication/363118716_Effects_of_Phellinus_linteus_extract_on_immunity_improvement_A_CONSORT-randomized_double-blinded_placebo-controlled_trial", summary: "임상시험에서 위약 대비 NK세포 활성 유의하게 증가 (P < 0.05). 98명 대상 이중맹검 임상시험 결과 확인." },
  cancer: { title: "대장암세포 사멸 및 AKT/mTOR 차단", journal: "Int. J. Mol. Sci.", impact: "Mechanism Analysis", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8880221/", summary: "대장암세포(SW480) 사멸 유도 및 AKT/mTOR 경로 차단. 암세포의 생존 신호를 억제함." },
  lung: { title: "폐암세포 이동 억제 및 폐 보호", journal: "PMC (NIH)", impact: "In Vitro/Vivo", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10694423/", summary: "폐암세포(A549) 이동 억제 및 급성 폐 손상 보호. 미세먼지로 인한 염증 완화." },
  liver: { title: "간암 억제 및 지방간 개선", journal: "ResearchGate", impact: "Animal Study", url: "https://www.researchgate.net/publication/47449095_Orally_administered_mycelial_culture_of_Phellinus_linteus_exhibits_antitumor_effects_in_hepatoma_cell-bearing_mice", summary: "간암(Hep3B) 억제 및 비알코올성 지방간 개선. 간 독성 해독 효과 입증." },
  prostate: { title: "전립선암세포 사멸 유도", journal: "ResearchGate", impact: "Oncology", url: "https://www.researchgate.net/publication/5319139_A_Medicinal_Mushroom_Phellinus_Linteus", summary: "히스피딘(Hispidin)의 STAT3 차단을 통한 암세포 사멸. 호르몬 저항성 암세포에 효과." },
  diabetes: { title: "장내 미생물 개선 및 혈당 조절", journal: "Frontiers in Microbiology", impact: "Microbiome", url: "https://www.frontiersin.org/journals/nutrition/articles/10.3389/fnut.2022.1013466/full", summary: "장내 미생물 개선 및 부티르산 723% 증가. 인슐린 저항성 개선 효과." },
  brain: { title: "베타아밀로이드 억제 및 뇌 보호", journal: "PMC (NIH)", impact: "Neuroprotection", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8143579/", summary: "베타아밀로이드 생성 효소 BACE1 억제. 알츠하이머 원인 물질 차단." },
  skin: { title: "아토피 억제 및 수명 연장", journal: "PMC (NIH)", impact: "Dermatology/Aging", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10159060/", summary: "아토피 IgE 억제 및 수명 26.41% 연장. 항노화 및 피부 진정 효과." },
  joint: { title: "통풍 요산 억제 및 관절염", journal: "ResearchGate", impact: "Rheumatology", url: "https://www.researchgate.net/publication/357779793_Anti-Gout_Effects_of_the_Medicinal_Fungus_Phellinus_igniarius_in_Hyperuricaemia_and_Acute_Gouty_Arthritis_Rat_Models", summary: "통풍 요산 생성 효소(XOD) 억제. 류마티스 관절염 염증 완화." }
};

const researchPapersEn = {
  summary: { title: "Enhanced NK Cell Activity & Survival", journal: "CONSORT Clinical Trial", impact: "Clinical Study", url: "https://www.researchgate.net/publication/363118716_Effects_of_Phellinus_linteus_extract_on_immunity_improvement_A_CONSORT-randomized_double-blinded_placebo-controlled_trial", summary: "Significantly increased NK cell activity vs placebo in clinical trials (P < 0.05). Verified in double-blind study (n=98)." },
  cancer: { title: "Colorectal Cancer Inhibition", journal: "Int. J. Mol. Sci.", impact: "Mechanism Analysis", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8880221/", summary: "Induction of colorectal cancer cell (SW480) apoptosis and blockage of AKT/mTOR pathway." },
  lung: { title: "Lung Protection & Metastasis Block", journal: "PMC (NIH)", impact: "In Vitro/Vivo", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10694423/", summary: "Inhibition of lung cancer cell (A549) migration and protection against acute lung injury." },
  liver: { title: "Liver Cancer & Fatty Liver Care", journal: "ResearchGate", impact: "Animal Study", url: "https://www.researchgate.net/publication/47449095_Orally_administered_mycelial_culture_of_Phellinus_linteus_exhibits_antitumor_effects_in_hepatoma_cell-bearing_mice", summary: "Inhibition of liver cancer (Hep3B) and improvement of non-alcoholic fatty liver." },
  prostate: { title: "Prostate Cancer Apoptosis", journal: "ResearchGate", impact: "Oncology", url: "https://www.researchgate.net/publication/5319139_A_Medicinal_Mushroom_Phellinus_Linteus", summary: "Induction of cancer cell apoptosis via STAT3 blockage by Hispidin." },
  diabetes: { title: "Microbiome & Blood Sugar Control", journal: "Frontiers in Microbiology", impact: "Microbiome", url: "https://www.frontiersin.org/journals/nutrition/articles/10.3389/fnut.2022.1013466/full", summary: "Improvement of gut microbiome and 723% increase in butyrate production." },
  brain: { title: "Neuroprotection & BACE1 Inhibition", journal: "PMC (NIH)", impact: "Neuroprotection", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8143579/", summary: "Inhibition of beta-amyloid generating enzyme BACE1, preventing Alzheimer's causes." },
  skin: { title: "Atopy Relief & Anti-Aging", journal: "PMC (NIH)", impact: "Dermatology/Aging", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10159060/", summary: "Inhibition of Atopy IgE and lifespan extension by 26.41%." },
  joint: { title: "Gout & Arthritis Relief", journal: "ResearchGate", impact: "Rheumatology", url: "https://www.researchgate.net/publication/357779793_Anti-Gout_Effects_of_the_Medicinal_Fungus_Phellinus_igniarius_in_Hyperuricaemia_and_Acute_Gouty_Arthritis_Rat_Models", summary: "Inhibition of Gout uric acid generating enzyme (XOD) and rheumatoid arthritis factors." }
};

const researchPapersZh = {
  summary: { title: "NK细胞活性与生存率", journal: "CONSORT Clinical Trial", impact: "Clinical Study", url: "https://www.researchgate.net/publication/363118716_Effects_of_Phellinus_linteus_extract_on_immunity_improvement_A_CONSORT-randomized_double-blinded_placebo-controlled_trial", summary: "临床试验显示 NK 细胞活性较安慰剂显著增加 (P < 0.05)。" },
  cancer: { title: "抑制结直肠癌", journal: "Int. J. Mol. Sci.", impact: "Mechanism Analysis", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8880221/", summary: "诱导大肠癌细胞 (SW480) 凋亡并阻断 AKT/mTOR 通路。" },
  lung: { title: "肺部保护与转移阻断", journal: "PMC (NIH)", impact: "In Vitro/Vivo", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10694423/", summary: "抑制肺癌细胞 (A549) 迁移及保护急性肺损伤。" },
  liver: { title: "肝癌抑制与脂肪肝改善", journal: "ResearchGate", impact: "Animal Study", url: "https://www.researchgate.net/publication/47449095_Orally_administered_mycelial_culture_of_Phellinus_linteus_exhibits_antitumor_effects_in_hepatoma_cell-bearing_mice", summary: "抑制肝癌 (Hep3B) 及改善非酒精性脂肪肝。" },
  prostate: { title: "诱导前列腺癌细胞凋亡", journal: "ResearchGate", impact: "Oncology", url: "https://www.researchgate.net/publication/5319139_A_Medicinal_Mushroom_Phellinus_Linteus", summary: "通过 Hispidin 阻断 STAT3 诱导癌细胞凋亡。" },
  diabetes: { title: "肠道菌群与血糖控制", journal: "Frontiers in Microbiology", impact: "Microbiome", url: "https://www.frontiersin.org/journals/nutrition/articles/10.3389/fnut.2022.1013466/full", summary: "改善肠道微生物群及丁酸增加 723%。" },
  brain: { title: "预防痴呆与脑细胞保护", journal: "PMC (NIH)", impact: "Neuroprotection", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8143579/", summary: "抑制 β-淀粉样蛋白生成酶 BACE1。" },
  skin: { title: "改善特应性皮炎与抗衰老", journal: "PMC (NIH)", impact: "Dermatology/Aging", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10159060/", summary: "抑制特应性 IgE 及寿命延长 26.41%。" },
  joint: { title: "痛风尿酸抑制与关节保护", journal: "ResearchGate", impact: "Rheumatology", url: "https://www.researchgate.net/publication/357779793_Anti-Gout_Effects_of_the_Medicinal_Fungus_Phellinus_igniarius_in_Hyperuricaemia_and_Acute_Gouty_Arthritis_Rat_Models", summary: "抑制痛风尿酸生成酶 (XOD)。" }
};

const researchPapersJa = {
  summary: { title: "NK細胞活性と生存率", journal: "CONSORT Clinical Trial", impact: "Clinical Study", url: "https://www.researchgate.net/publication/363118716_Effects_of_Phellinus_linteus_extract_on_immunity_improvement_A_CONSORT-randomized_double-blinded_placebo-controlled_trial", summary: "臨床試験においてプラセボ対比NK細胞活性が有意に増加 (P < 0.05)。" },
  cancer: { title: "大腸がん抑制と転移遮断", journal: "Int. J. Mol. Sci.", impact: "Mechanism Analysis", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8880221/", summary: "大腸がん細胞(SW480)のアポトーシス誘導およびAKT/mTOR経路の遮断。" },
  lung: { title: "肺保護とがん細胞移動遮断", journal: "PMC (NIH)", impact: "In Vitro/Vivo", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10694423/", summary: "肺がん細胞(A549)の移動抑制および急性肺損傷の保護。" },
  liver: { title: "肝臓がん抑制と脂肪肝改善", journal: "ResearchGate", impact: "Animal Study", url: "https://www.researchgate.net/publication/47449095_Orally_administered_mycelial_culture_of_Phellinus_linteus_exhibits_antitumor_effects_in_hepatoma_cell-bearing_mice", summary: "肝臓がん(Hep3B)の抑制および非アルコール性脂肪肝の改善。" },
  prostate: { title: "前立腺がん細胞のアポトーシス", journal: "ResearchGate", impact: "Oncology", url: "https://www.researchgate.net/publication/5319139_A_Medicinal_Mushroom_Phellinus_Linteus", summary: "HispidinによるSTAT3遮断を通じたがん細胞のアポトーシス誘導。" },
  diabetes: { title: "腸内細菌改善と血糖調節", journal: "Frontiers in Microbiology", impact: "Microbiome", url: "https://www.frontiersin.org/journals/nutrition/articles/10.3389/fnut.2022.1013466/full", summary: "腸内微生物の改善および酪酸の723%増加。" },
  brain: { title: "認知症予防と脳細胞保護", journal: "PMC (NIH)", impact: "Neuroprotection", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8143579/", summary: "ベータアミロイド生成酵素BACE1の抑制。" },
  skin: { title: "アトピー改善と寿命延長", journal: "PMC (NIH)", impact: "Dermatology/Aging", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10159060/", summary: "アトピーIgEの抑制および寿命26.41%延長。" },
  joint: { title: "痛風尿酸抑制と関節炎緩和", journal: "ResearchGate", impact: "Rheumatology", url: "https://www.researchgate.net/publication/357779793_Anti-Gout_Effects_of_the_Medicinal_Fungus_Phellinus_igniarius_in_Hyperuricaemia_and_Acute_Gouty_Arthritis_Rat_Models", summary: "痛風尿酸生成酵素(XOD)の抑制。" }
};

export const TRANSLATIONS: Record<string, any> = {
  ko: {
    nav: { about: "상황버섯 정보", research: "임상 연구", benefits: "핵심 효능", usage: "복용법", health: "건강 리포트", faq: "질문답변/공지사항" },
    hero: {
      badge: "Vital Core Premium",
      title_top: "대자연이 선사한",
      title_highlight: "가장 고귀한 생명력",
      desc: "캄보디아 원시림에서 찾은 신비의 버섯.\n과학으로 증명된 상황버섯의 항암 기적을 경험하세요.",
      btn_research: "연구 결과 자세히 보기",
      scroll_text: "우리는 태어날 때부터 자연치유력을 지니고 있습니다. 이는 곰팡이, 바이러스, 각종 환경 요인 등 복잡하고 위험한 세상 속에서 우리의 생명을 스스로 보호하기 위해 몸 안에 내재된 본래의 방어 시스템입니다. 이 자연치유력을 우리는 흔히 면역력, 또는 면역 시스템(Immune System)이라 부릅니다. 우리 몸의 이 면역 시스템은 단순한 방어 기능을 넘어, 손상된 세포와 균형이 무너진 상태를 스스로 회복하고 다시 재생하려는 능력을 갖추고 있습니다. 우리는 이 근본적인 생명 시스템을 바이탈 코어(Vital Core)라고 부릅니다. 바이탈 코어의 원리를 정확히 이해하고 핵심을 잘 다룬다면, 인체는 언제든지 스스로 균형을 되찾고 회복하려는 방향으로 작동한다는 사실을 알 수 있습니다. 이 사이트는 이러한 자연치유력과 바이탈 코어의 본질을 현대인의 삶에 실질적으로 접목하기 위해 만들어졌습니다."
    },
    common: { view_paper: "논문 확인", login: "로그인/회원가입" },
    about: {
      title: "Phellinus Linteus (Sanghwang)",
      tabs: { intro: "기본 정보", compounds: "핵심 성분", mechanism: "항암 기전", evidence: "학술 증거", recommended: "좋은제품" },
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
        { title: "췌장암 환자 생존율 1년 연장", journal: "Severance Hospital Clinical Study", pmid: "40590265", summary: "수술 후 항암 치료 환자 대상 추적 관찰 결과, 상황버섯 병행군의 평균 생존 기간이 47.0개월로 대조군(35.0개월)보다 12개월 연장됨.", url: "https://pubmed.ncbi.nlm.nih.gov/40590265/" },
        { title: "대장암 및 장내 미생물 개선", journal: "Gut Microbiome Journal", pmid: "40752028", summary: "항암제(5-FU) 부작용을 줄이고 암 치료 효율을 1.5배 높임. 차세대 유익균인 아커만시아(Akkermansia) 증식을 통한 장 환경 개선.", url: "https://pubmed.ncbi.nlm.nih.gov/40752028/" },
        { title: "치매 원인 베타아밀로이드 억제", journal: "Neuroscience Research", pmid: "40234762", summary: "알츠하이머 원인 물질인 베타아밀로이드 독성을 차단하고 해마 세포를 보호하여 기억력과 인지 기능을 획기적으로 개선.", url: "https://pubmed.ncbi.nlm.nih.gov/40234762/" },
        { title: "피부 광노화 억제 및 미백", journal: "Dermatological Science", pmid: "40497052", summary: "자외선으로 인한 콜라겐 파괴 효소(MMP-1)를 억제하고 멜라닌 생성을 막아 주름 방지 및 미백(알부틴 동등 효과) 효과 입증.", url: "https://pubmed.ncbi.nlm.nih.gov/40497052/" },
        { title: "간 섬유화 억제 및 숙취 해소", journal: "Liver International", pmid: "40228217", summary: "간이 딱딱해지는 섬유화 과정을 차단하고 알코올 분해를 촉진. 지방간 및 간 수치(GOT/GPT)의 빠른 정상화 유도.", url: "https://pubmed.ncbi.nlm.nih.gov/40228217/" },
        { title: "관절염 통증 완화 및 연골 보호", journal: "Rheumatology International", pmid: "40094337", summary: "천연 COX-2 억제제로 작용하여 관절 통증과 부종을 완화. 연골 파괴 효소를 막아 퇴행성 및 류마티스 관절염 동시 케어.", url: "https://pubmed.ncbi.nlm.nih.gov/40094337/" },
        { title: "전립선 비대증 및 암 예방", journal: "Urology Journal", pmid: "39806945", summary: "남성 호르몬 변형(DHT)을 억제하여 전립선 비대를 막고 야간뇨 개선. 전립선암 세포 증식 억제 효과 동시 확인.", url: "https://pubmed.ncbi.nlm.nih.gov/39806945/" },
        { title: "미세먼지/흡연 폐 손상 방어", journal: "Pulmonary Pharmacology", pmid: "39758739", summary: "미세먼지와 흡연으로 인한 폐포 염증 및 폐섬유화를 억제. 호흡기 점막 면역(IgA)을 강화하여 바이러스 방어력 증진.", url: "https://pubmed.ncbi.nlm.nih.gov/39758739/" },
        { title: "당뇨 혈당 조절 및 다이어트", journal: "Diabetes & Metabolism", pmid: "39692936", summary: "식후 혈당 스파이크를 막고 인슐린 저항성을 개선. 내장 지방 세포 분화를 억제하여 체중 감소 효과 입증.", url: "https://pubmed.ncbi.nlm.nih.gov/39692936/" }
      ],
      products: [
        { name: "프리미엄 자연산 상황버섯", price: "2,300,000원", originalPrice: "2,500,000원", discount: "8%", tag: "특상품", img: linteus0, desc: "수십 년간 원시림의 정기를 머금은 최상급 자연산 상황버섯입니다." },
        { name: "고농축 상황버섯 추출액", price: "550,000원", originalPrice: "600,000원", discount: "10%", tag: "액상형", img: linteus1, desc: "캄보디아 원시림 상황버섯은 이런 모양과 비슷하게 붙어서 자생합니다." },
        { name: "건조 상황버섯 슬라이스", price: "850,000원", originalPrice: "950,000원", discount: "11%", tag: "실속형", img: linteus2, desc: "이런 모양의 Phellinus Linteus 초기에 따오는 모양입니다. 시간이 지나면 초록색등은 없어지겠죠. 목질 진흙버섯 입니다." },
        { name: "상황버섯 선물 세트", price: "1,200,000원", originalPrice: "1,400,000원", discount: "14%", tag: "선물용", img: linteus3, desc: "한국에서 판매하는 좋은 제품의 예시입니다." },
        { name: "상황버섯 분말 파우더", price: "450,000원", originalPrice: "500,000원", discount: "10%", tag: "요리/첨가", img: linteus4, desc: "한국에서 판매하는 좋은 제품의 예시입니다." },
        { name: "바이탈코어 시그니처 에디션", price: "5,500,000원", originalPrice: "6,000,000원", discount: "8%", tag: "한정판", img: linteus5, desc: "한국에서 판매하는 좋은 제품의 예시입니다." }
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
          link: "https://pubmed.ncbi.nlm.nih.gov/",
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
          subtitle: "동물 실험이 아닌 사람을 대상으로 한 연구",
          journal: "Journal of Medicinal Food (2011)",
          result: "성인 대상 8주간 섭취 시 면역 수치 향상 및 간/신장 독성 없음 확인.",
          link: "https://pubmed.ncbi.nlm.nih.gov/"
        },
        {
          title: "2. 간 세포 보호 효과: '독성'이 아니라 오히려 '해독'을 돕다",
          subtitle: "간독성 물질에 대한 간세포 보호 효과",
          journal: "Journal of Ethnopharmacology (2004)",
          result: "독성 물질(CCl4)로부터 간세포 파괴 방지 및 항산화 효소(글루타치온) 유지.",
          link: "https://www.sciencedirect.com/"
        },
        {
          title: "3. 급성/아급성 독성 테스트: 고용량 섭취 안전성",
          subtitle: "실질적 무독성(practically non-toxic) 분류",
          journal: "Journal of Ethnopharmacology",
          result: "고용량(2,000mg/kg) 투여 시에도 사망이나 장기 손상 없음.",
          link: "https://pubmed.ncbi.nlm.nih.gov/"
        }
      ]
    },
    footer: {
      copy: "© 2025 Vital Core. All rights reserved.",
      contact: {
        label: "관리자 연락처",
        telegram: "@cambodiabae",
        secret: "게시판 비밀글 문의 가능"
      }
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
      reset_complete: "비밀번호가 변경되었습니다. 새 비밀번호로 로그인해주세요."
    }
  },
  en: {
    nav: { about: "About Phellinus", research: "Research", benefits: "Benefits", usage: "Usage", health: "Health Report", faq: "Q&A / Notices" },
    hero: {
      badge: "Vital Core Premium",
      title_top: "Nature's",
      title_highlight: "Most Powerful Gift",
      desc: "Vitality from Cambodian forests.\nExperience the miracle proven by science.",
      btn_research: "View Research",
      scroll_text: "We possess innate natural healing power from birth. This is an inherent defense system designed to protect our lives from complex environmental dangers such as fungi and viruses. We often call this 'Immunity' or the 'Immune System'. Beyond simple defense, this system has the ability to recover and regenerate damaged cells and restore balance. We call this fundamental life system 'Vital Core'. If we correctly understand the principles of Vital Core, we see that the human body always operates to regain balance and recover. This site is created to bridge the essence of this natural healing power and Vital Core into modern life."
    },
    common: { view_paper: "View Paper", login: "Login" },
    about: {
      title: "Phellinus Linteus",
      tabs: { intro: "Overview", compounds: "Compounds", mechanism: "Mechanism", evidence: "Evidence", recommended: "Products" },
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
        { name: "Wild Phellinus 374g", price: "₩1,900,000", originalPrice: "₩2,300,000", discount: "17%", tag: "Wild, Dried", img: linteus0 },
        { name: "Wild Phellinus 926g", price: "₩4,700,000", originalPrice: "₩5,000,000", discount: "6%", tag: "Wild, Dried", img: linteus1 },
        { name: "Wild Phellinus 980g", price: "₩4,300,000", originalPrice: "₩5,000,000", discount: "14%", tag: "Whole Dried", img: linteus2 },
        { name: "Phellinus Gift Set", price: "₩1,200,000", originalPrice: "₩1,400,000", discount: "14%", tag: "Gift Set", img: linteus3 },
        { name: "Phellinus Powder", price: "₩450,000", originalPrice: "₩500,000", discount: "10%", tag: "Powder", img: linteus4 },
        { name: "Vital Core Signature", price: "₩5,500,000", originalPrice: "₩6,000,000", discount: "8%", tag: "Limited", img: linteus5 }
      ],
      evidence: [
        { title: "Pancreatic Cancer Survival +1 Year", journal: "Severance Hospital Clinical Study", pmid: "40590265", summary: "In post-op chemotherapy patients, Phellinus group showed average survival of 47.0 months vs 35.0 months in control group.", url: "https://pubmed.ncbi.nlm.nih.gov/40590265/" },
        { title: "Colorectal Cancer & Microbiome", journal: "Gut Microbiome Journal", pmid: "40752028", summary: "Reduces chemotherapy (5-FU) side effects and increases treatment efficiency by 1.5x. Improves gut environment via Akkermansia proliferation.", url: "https://pubmed.ncbi.nlm.nih.gov/40752028/" },
        { title: "Dementia: Beta-Amyloid Inhibition", journal: "Neuroscience Research", pmid: "40234762", summary: "Blocks beta-amyloid toxicity (cause of Alzheimer's) and protects hippocampal cells, significantly improving memory and cognition.", url: "https://pubmed.ncbi.nlm.nih.gov/40234762/" },
        { title: "Skin Photoaging & Whitening", journal: "Dermatological Science", pmid: "40497052", summary: "Inhibits MMP-1 (collagen destruction) caused by UV, preventing wrinkles. Proved whitening effect equal to Arbutin.", url: "https://pubmed.ncbi.nlm.nih.gov/40497052/" },
        { title: "Liver Fibrosis & Hangover Relief", journal: "Liver International", pmid: "40228217", summary: "Blocks liver fibrosis and promotes alcohol breakdown. Induces rapid normalization of fatty liver and GOT/GPT levels.", url: "https://pubmed.ncbi.nlm.nih.gov/40228217/" },
        { title: "Arthritis & Joint Protection", journal: "Rheumatology International", pmid: "40094337", summary: "Acts as natural COX-2 inhibitor relieving pain and edema. Prevents cartilage destruction, caring for both degenerative and rheumatoid arthritis.", url: "https://pubmed.ncbi.nlm.nih.gov/40094337/" },
        { title: "Prostate Health & Cancer Prevention", journal: "Urology Journal", pmid: "39806945", summary: "Inhibits DHT transformation preventing BPH and improving nocturia. Simultaneous inhibition of prostate cancer cell proliferation.", url: "https://pubmed.ncbi.nlm.nih.gov/39806945/" },
        { title: "Lung Defense: Dust & Smoking", journal: "Pulmonary Pharmacology", pmid: "39758739", summary: "Inhibits alveolar inflammation and fibrosis caused by fine dust and smoking. Enhances respiratory mucosal immunity (IgA).", url: "https://pubmed.ncbi.nlm.nih.gov/39758739/" },
        { title: "Diabetes & Weight Management", journal: "Diabetes & Metabolism", pmid: "39692936", summary: "Prevents post-meal glucose spikes and improves insulin resistance. Proved weight loss effect by inhibiting visceral fat differentiation.", url: "https://pubmed.ncbi.nlm.nih.gov/39692936/" }
      ]
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
          link: "https://pubmed.ncbi.nlm.nih.gov/",
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
          subtitle: "Research on humans, not just animals",
          journal: "Journal of Medicinal Food (2011)",
          result: "Enhanced immunity after 8 weeks of intake in adults. No toxicity or side effects in liver/kidney functions.",
          link: "https://pubmed.ncbi.nlm.nih.gov/"
        },
        {
          title: "2. Hepatoprotection: Detoxing, not Toxic",
          subtitle: "Protection against hepatotoxins",
          journal: "Journal of Ethnopharmacology (2004)",
          result: "Prevents hepatocyte destruction from toxins (CCl4) and maintains antioxidant enzymes (Glutathione).",
          link: "https://www.sciencedirect.com/"
        },
        {
          title: "3. Acute Toxicity Test: Safe at High Doses",
          subtitle: "Classified as 'Practically Non-toxic'",
          journal: "Journal of Ethnopharmacology",
          result: "No mortality or organ damage observed even at high doses (over 2,000mg/kg).",
          link: "https://pubmed.ncbi.nlm.nih.gov/"
        }
      ]
    },
    footer: {
      copy: "© 2025 Vital Core. All rights reserved.",
      contact: {
        label: "Admin Contact",
        telegram: "@cambodiabae",
        secret: "Private posts available on Q&A"
      }
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
      reset_complete: "Password reset successful. Please login with new password."
    }
  },
  zh: {
    nav: { about: "关于桑黄", research: "临床研究", benefits: "核心功效", usage: "服用方法", health: "健康报告", faq: "问答 / 公告" },
    hero: {
      badge: "Vital Core Premium",
      title_top: "大自然赐予的",
      title_highlight: "尊贵生命力",
      desc: "来自柬埔寨原始森林的神秘蘑菇。\n体验科学证明的抗癌奇迹。",
      btn_research: "查看研究",
      scroll_text: "We possess innate natural healing power from birth. This is an inherent defense system designed to protect our lives from complex environmental dangers such as fungi and viruses. We often call this 'Immunity' or the 'Immune System'. Beyond simple defense, this system has the ability to recover and regenerate damaged cells and restore balance. We call this fundamental life system 'Vital Core'. If we correctly understand the principles of Vital Core, we see that the human body always operates to regain balance and recover. This site is created to bridge the essence of this natural healing power and Vital Core into modern life."
    },
    common: { view_paper: "查看论文", login: "登录" },
    about: {
      title: "桑黄 (Phellinus)",
      tabs: { intro: "基本信息", compounds: "核心成分", mechanism: "抗癌机理", evidence: "学术证据", recommended: "推荐产品" },
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
        { name: "自然桑黄 374g", price: "₩1,900,000", originalPrice: "₩2,300,000", discount: "17%", tag: "自然, 干燥", img: linteus0 },
        { name: "自然桑黄 926g", price: "₩4,700,000", originalPrice: "₩5,000,000", discount: "6%", tag: "自然, 干燥", img: linteus1 },
        { name: "自然桑黄 980g", price: "₩4,300,000", originalPrice: "₩5,000,000", discount: "14%", tag: "全干", img: linteus2 },
        { name: "桑黄礼盒套装", price: "₩1,200,000", originalPrice: "₩1,400,000", discount: "14%", tag: "礼品", img: linteus3 },
        { name: "桑黄粉末", price: "₩450,000", originalPrice: "₩500,000", discount: "10%", tag: "粉末", img: linteus4 },
        { name: "Vital Core 签名版", price: "₩5,500,000", originalPrice: "₩6,000,000", discount: "8%", tag: "限量版", img: linteus5 }
      ],
      evidence: [
        { title: "胰腺癌患者生存期延长1年", journal: "Severance Hospital Clinical Study", pmid: "40590265", summary: "术后化疗患者追踪观察结果显示，桑黄并用组平均生存期为47.0个月，比对照组（35.0个月）延长12个月。", url: "https://pubmed.ncbi.nlm.nih.gov/40590265/" },
        { title: "改善大肠癌及肠道微生物", journal: "Gut Microbiome Journal", pmid: "40752028", summary: "减少化疗（5-FU）副作用，提高治疗效率1.5倍。通过增殖次世代有益菌Akkermansia改善肠道环境。", url: "https://pubmed.ncbi.nlm.nih.gov/40752028/" },
        { title: "抑制痴呆原因Beta-淀粉样蛋白", journal: "Neuroscience Research", pmid: "40234762", summary: "阻断阿尔茨海默病致病物质Beta-淀粉样蛋白毒性，保护海马体细胞，显著改善记忆力和认知功能。", url: "https://pubmed.ncbi.nlm.nih.gov/40234762/" },
        { title: "抑制皮肤光老化及美白", journal: "Dermatological Science", pmid: "40497052", summary: "抑制紫外线引起的胶原蛋白破坏酶（MMP-1），防止黑色素生成，证实有防皱及美白（同等熊果苷）效果。", url: "https://pubmed.ncbi.nlm.nih.gov/40497052/" },
        { title: "抑制肝纤维化及解酒", journal: "Liver International", pmid: "40228217", summary: "阻断肝脏变硬的纤维化过程，促进酒精分解。诱导脂肪肝及肝指数（GOT/GPT）快速正常化。", url: "https://pubmed.ncbi.nlm.nih.gov/40228217/" },
        { title: "缓解关节炎疼痛及保护软骨", journal: "Rheumatology International", pmid: "40094337", summary: "作为天然COX-2抑制剂缓解关节疼痛和水肿。阻止软骨破坏酶，同时护理退行性和类风湿性关节炎。", url: "https://pubmed.ncbi.nlm.nih.gov/40094337/" },
        { title: "前列腺肥大及癌症预防", journal: "Urology Journal", pmid: "39806945", summary: "抑制男性荷尔蒙变形（DHT），防止前列腺肥大，改善夜尿。同时确认抑制前列腺癌细胞增殖效果。", url: "https://pubmed.ncbi.nlm.nih.gov/39806945/" },
        { title: "雾霾/吸烟肺损伤防御", journal: "Pulmonary Pharmacology", pmid: "39758739", summary: "抑制因雾霾和吸烟引起的肺泡炎症及肺纤维化。强化呼吸道黏膜免疫（IgA），增进病毒防御力。", url: "https://pubmed.ncbi.nlm.nih.gov/39758739/" },
        { title: "糖尿病血糖调节及减肥", journal: "Diabetes & Metabolism", pmid: "39692936", summary: "防止餐后血糖飙升，改善胰岛素抵抗。证实抑制内脏脂肪细胞分化带来的体重减轻效果。", url: "https://pubmed.ncbi.nlm.nih.gov/39692936/" }
      ]
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
          link: "https://pubmed.ncbi.nlm.nih.gov/",
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
          subtitle: "针对人体的研究，而非动物实验",
          journal: "Journal of Medicinal Food (2011)",
          result: "成人服用8周后，免疫数值提升，且未发现肝/肾功能有任何毒性或副作用。",
          link: "https://pubmed.ncbi.nlm.nih.gov/"
        },
        {
          title: "2. 肝细胞保护效果：非但无毒，反而助‘排毒’",
          subtitle: "针对肝毒性物质的保护效果",
          journal: "Journal of Ethnopharmacology (2004)",
          result: "防止毒性物质(CCl4)破坏肝细胞，并帮助维持抗氧化酶(谷胱甘肽)水平。",
          link: "https://www.sciencedirect.com/"
        },
        {
          title: "3. 急性/亚急性毒性测试：高剂量服用安全",
          subtitle: "归类为‘实质无毒 (practically non-toxic)’",
          journal: "Journal of Ethnopharmacology",
          result: "即便高剂量(2,000mg/kg以上)服用，也未引发死亡或器官损伤。",
          link: "https://pubmed.ncbi.nlm.nih.gov/"
        }
      ]
    },
    footer: {
      copy: "© 2025 Vital Core. All rights reserved.",
      contact: {
        label: "管理员联系方式",
        telegram: "@cambodiabae",
        secret: "可在留言板发布秘密咨询"
      }
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
      reset_complete: "密码重置成功。请使用新密码登录。"
    }
  },
  ja: {
    nav: { about: "メシマコブについて", research: "臨床研究", benefits: "主な効能", usage: "服用方法", health: "健康レポート", faq: "Q&A / お知らせ" },
    hero: {
      badge: "Vital Core Premium",
      title_top: "大自然が贈る",
      title_highlight: "気高い生命力",
      desc: "カンボジアの原生林で見つけた神秘のキノコ。\n科学で証明された奇跡を体験してください。",
      btn_research: "研究を見る",
      scroll_text: "We possess innate natural healing power from birth. This is an inherent defense system designed to protect our lives from complex environmental dangers such as fungi and viruses. We often call this 'Immunity' or the 'Immune System'. Beyond simple defense, this system has the ability to recover and regenerate damaged cells and restore balance. We call this fundamental life system 'Vital Core'. If we correctly understand the principles of Vital Core, we see that the human body always operates to regain balance and recover. This site is created to bridge the essence of this natural healing power and Vital Core into modern life."
    },
    common: { view_paper: "論文確認", login: "ログイン" },
    about: {
      title: "メシマコブ (Phellinus)",
      tabs: { intro: "基本情報", compounds: "主要成分", mechanism: "作用機序", evidence: "学術根拠", recommended: "おすすめ製品" },
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
        { name: "自然産メシマコブ 374g", price: "₩1,900,000", originalPrice: "₩2,300,000", discount: "17%", tag: "自然産, 乾燥", img: linteus0 },
        { name: "自然産メシマコブ 926g", price: "₩4,700,000", originalPrice: "₩5,000,000", discount: "6%", tag: "自然産, 乾燥", img: linteus1 },
        { name: "自然産メシマコブ 980g", price: "₩4,300,000", originalPrice: "₩5,000,000", discount: "14%", tag: "丸ごと乾燥", img: linteus2 },
        { name: "メシマコブギフトセット", price: "₩1,200,000", originalPrice: "₩1,400,000", discount: "14%", tag: "ギフト", img: linteus3 },
        { name: "メシマコブ粉末", price: "₩450,000", originalPrice: "₩500,000", discount: "10%", tag: "粉末", img: linteus4 },
        { name: "Vital Core シグネチャー", price: "₩5,500,000", originalPrice: "₩6,000,000", discount: "8%", tag: "限定版", img: linteus5 }
      ],
      evidence: [
        { title: "膵臓がん患者の生存率1年延長", journal: "Severance Hospital Clinical Study", pmid: "40590265", summary: "術後抗がん治療患者の追跡観察の結果、メシマコブ併用群の平均生存期間が47.0ヶ月で、対照群（35.0ヶ月）より12ヶ月延長。", url: "https://pubmed.ncbi.nlm.nih.gov/40590265/" },
        { title: "大腸がんおよび腸内微生物改善", journal: "Gut Microbiome Journal", pmid: "40752028", summary: "抗がん剤（5-FU）の副作用を減らし、治療効率を1.5倍向上。次世代有益菌アッカーマンシアの増殖による腸内環境改善。", url: "https://pubmed.ncbi.nlm.nih.gov/40752028/" },
        { title: "認知症原因ベータアミロイド抑制", journal: "Neuroscience Research", pmid: "40234762", summary: "アルツハイマーの原因物質であるベータアミロイド毒性を遮断し、海馬細胞を保護して記憶力と認知機能を画期的に改善。", url: "https://pubmed.ncbi.nlm.nih.gov/40234762/" },
        { title: "皮膚光老化抑制および美白", journal: "Dermatological Science", pmid: "40497052", summary: "紫外線によるコラーゲン破壊酵素（MMP-1）を抑制し、メラニン生成を防いでシワ防止および美白（アルブチン同等）効果を立証。", url: "https://pubmed.ncbi.nlm.nih.gov/40497052/" },
        { title: "肝線維化抑制および二日酔い解消", journal: "Liver International", pmid: "40228217", summary: "肝臓が硬くなる線維化過程を遮断し、アルコール分解を促進。脂肪肝および肝数値（GOT/GPT）の急速な正常化を誘導。", url: "https://pubmed.ncbi.nlm.nih.gov/40228217/" },
        { title: "関節炎の痛み緩和および軟骨保護", journal: "Rheumatology International", pmid: "40094337", summary: "天然COX-2阻害剤として作用し、関節の痛みとむくみを緩和。軟骨破壊酵素を防ぎ、変形性および関節リウマチを同時ケア。", url: "https://pubmed.ncbi.nlm.nih.gov/40094337/" },
        { title: "前立腺肥大症およびがん予防", journal: "Urology Journal", pmid: "39806945", summary: "男性ホルモンの変形（DHT）を抑制して前立腺肥大を防ぎ、夜間頻尿を改善。前立腺がん細胞の増殖抑制効果も同時に確認。", url: "https://pubmed.ncbi.nlm.nih.gov/39806945/" },
        { title: "PM2.5/喫煙による肺損傷防御", journal: "Pulmonary Pharmacology", pmid: "39758739", summary: "PM2.5と喫煙による肺胞炎症および肺線維化を抑制。呼吸器粘膜免疫（IgA）を強化し、ウイルス防御力を増進。", url: "https://pubmed.ncbi.nlm.nih.gov/39758739/" },
        { title: "糖尿病血糖調節およびダイエット", journal: "Diabetes & Metabolism", pmid: "39692936", summary: "食後の血糖値スパイクを防ぎ、インスリン抵抗性を改善。内臓脂肪細胞の分化を抑制することによる体重減少効果を立証。", url: "https://pubmed.ncbi.nlm.nih.gov/39692936/" }
      ]
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
          link: "https://pubmed.ncbi.nlm.nih.gov/",
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
          title: "1. 人体適用試験：長期摂取時の安全性および免疫増進",
          subtitle: "動物実験ではなく人を対象とした研究",
          journal: "Journal of Medicinal Food (2011)",
          result: "成人対象の8週間摂取で免疫数値が向上し、肝/腎機能などに毒性や副作用がないことを確認。",
          link: "https://pubmed.ncbi.nlm.nih.gov/"
        },
        {
          title: "2. 肝細胞保護効果：「毒」ではなくむしろ「解毒」を助ける",
          subtitle: "肝毒性物質に対する保護効果",
          journal: "Journal of Ethnopharmacology (2004)",
          result: "毒性物質(CCl4)による肝細胞破壊を防ぎ、抗酸化酵素(グルタチオン)の維持を助けます。",
          link: "https://www.sciencedirect.com/"
        },
        {
          title: "3. 急性/亜急性毒性テスト：高用量摂取の安全性",
          subtitle: "「実質的無毒 (practically non-toxic)」に分類",
          journal: "Journal of Ethnopharmacology",
          result: "高用量(2,000mg/kg以上)投与時でも、死亡や臓器損傷が見られないことを確認。",
          link: "https://pubmed.ncbi.nlm.nih.gov/"
        }
      ]
    },
    footer: {
      copy: "© 2025 Vital Core. All rights reserved.",
      contact: {
        label: "管理者連絡先",
        telegram: "@cambodiabae",
        secret: "掲示板での秘密投稿が可能"
      }
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
      reset_complete: "パスワードが変更されました。新しいパスワードでログインしてください。"
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
