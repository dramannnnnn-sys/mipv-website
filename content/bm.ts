import type { Dictionary, DomainId, IndustryIcon, ServiceId } from "./types";

/**
 * KANDUNGAN BAHASA MELAYU — sumber tunggal bagi semua teks Bahasa Melayu.
 * Sumber: Profil Syarikat MIPV 2026 (BM) dan taklimat laman web yang diluluskan.
 * Struktur mesti sama dengan content/en.ts (disemak oleh TypeScript).
 */
export const bm: Dictionary = {
  meta: {
    siteName: "MIPV",
    defaultTitle: "MIPV | Firma Perunding Profesional Multidisiplin Bersepadu",
    titleTemplate: "%s | MIPV",
    defaultDescription:
      "MIPV ialah firma perunding profesional multidisiplin yang berpangkalan di Nilai, Negeri Sembilan, menyediakan penyelesaian bersepadu dalam khidmat nasihat, penilaian, penyelidikan, latihan dan penambahbaikan organisasi.",
    pages: {
      home: {
        title: "MIPV | Firma Perunding Profesional Multidisiplin Bersepadu",
        description:
          "Pengurusan. Inovasi. Prestasi. Nilai. MIPV menyediakan penyelesaian bersepadu dalam khidmat nasihat, penilaian, penyelidikan, latihan dan penambahbaikan organisasi untuk institusi dan perniagaan di Malaysia.",
      },
      about: {
        title: "Mengenai MIPV",
        description:
          "MIPV ialah firma perunding profesional multidisiplin bersepadu yang berpandukan prinsip Pengurusan, Inovasi, Prestasi dan Nilai. Ketahui visi, misi dan model operasi kami.",
      },
      expertise: {
        title: "Bidang Kepakaran",
        description:
          "Lima domain keupayaan bersepadu: tadbir urus, risiko, integriti dan pematuhan; kualiti, keselamatan dan kesihatan; psikologi, psikometrik dan modal insan; pengurusan strategik; serta penyelidikan dan penilaian.",
      },
      services: {
        title: "Perkhidmatan Profesional Kami",
        description:
          "Perundingan dan khidmat nasihat, penilaian dan diagnostik, penyelidikan dan penilaian program, latihan dan pembangunan keupayaan, audit dan semakan profesional, serta sokongan pelaksanaan dan penambahbaikan.",
      },
      approach: {
        title: "Pendekatan Bersepadu Kami",
        description:
          "Laluan sistematik lima peringkat — Fahami, Nilai, Reka Bentuk, Laksana, Ukur & Tambah Baik — yang diselaraskan melalui model operasi multidisiplin dalaman MIPV.",
      },
      industries: {
        title: "Industri & Sektor",
        description:
          "Kepakaran multidisiplin yang boleh disesuaikan untuk sektor awam, GLC, syarikat korporat, pembuatan, pembinaan, pendidikan, perkhidmatan profesional dan PKS.",
      },
      contact: {
        title: "Hubungi MIPV",
        description:
          "Hubungi MIPV di Nilai, Negeri Sembilan, Malaysia. E-mel enquiry@mipv.com.my telefon +60 17-444 9446 / +60 18-955 3551, atau WhatsApp +60 17-444 9446.",
      },
      privacy: {
        title: "Dasar Privasi",
        description:
          "Cara MIPV mengumpul, menggunakan dan melindungi data peribadi di bawah Akta Perlindungan Data Peribadi 2010.",
      },
      terms: {
        title: "Terma Laman Web",
        description: "Terma yang mengawal penggunaan laman web MIPV.",
      },
      notFound: {
        title: "Halaman Tidak Ditemui",
        description: "Halaman yang anda cari tidak dapat ditemui.",
      },
    },
  },

  nav: {
    home: "UTAMA",
    about: "MENGENAI",
    expertise: "KEPAKARAN",
    services: "PERKHIDMATAN",
    approach: "PENDEKATAN",
    industries: "INDUSTRI",
    contact: "HUBUNGI",
    cta: "HUBUNGI KAMI",
    openMenu: "Buka menu",
    closeMenu: "Tutup menu",
    mainNavLabel: "Navigasi utama",
    skipToContent: "Langkau ke kandungan utama",
    languageLabel: "Pilih bahasa",
    homeLinkLabel: "MIPV — laman utama",
  },

  common: {
    readMore: "BACA LAGI",
    learnMore: "KETAHUI LEBIH LANJUT",
    exploreDomain: "TEROKAI DOMAIN INI",
    viewAllExpertise: "LIHAT SEMUA KEPAKARAN",
    viewAllServices: "LIHAT SEMUA PERKHIDMATAN",
    discoverApproach: "KETAHUI PENDEKATAN KAMI",
    enquireService: "BUAT PERTANYAAN MENGENAI PERKHIDMATAN INI",
    contactMipv: "HUBUNGI MIPV",
    breadcrumbLabel: "Laluan navigasi",
    home: "Utama",
    focusLabel: "FOKUS KAMI",
    includesLabel: "MERANGKUMI",
    stageLabel: "PERINGKAT",
    onThisPage: "Di halaman ini",
  },

  principles: [
    {
      letter: "M",
      title: "PENGURUSAN",
      subtitle: "Management",
      lead: "Kepimpinan strategik dan keberkesanan organisasi.",
      body: "Memperkukuh hala tuju strategik, tadbir urus dan keberkesanan operasi.",
    },
    {
      letter: "I",
      title: "INOVASI",
      subtitle: "Innovation",
      lead: "Idea, metodologi dan penyelesaian transformatif yang baharu.",
      body: "Meneroka idea serta kaedah baharu bagi mendorong transformasi organisasi.",
    },
    {
      letter: "P",
      title: "PRESTASI",
      subtitle: "Performance",
      lead: "Keupayaan organisasi dan penambahbaikan yang boleh diukur.",
      body: "Meningkatkan sistem, keupayaan insan dan pencapaian yang boleh diukur.",
    },
    {
      letter: "V",
      title: "NILAI",
      subtitle: "Value",
      lead: "Hasil yang mampan dan bermakna.",
      body: "Menghasilkan manfaat organisasi yang bermakna, beretika dan mampan.",
    },
  ],

  home: {
    hero: {
      eyebrow: "FIRMA PERUNDING PROFESIONAL MULTIDISIPLIN BERSEPADU",
      headline: ["PENGURUSAN.", "INOVASI.", "PRESTASI.", "NILAI."],
      tagline: "Kepakaran Bersepadu. Penyelesaian Berasaskan Bukti. Nilai Mampan.",
      paragraph:
        "MIPV ialah firma perunding profesional multidisiplin yang menyediakan penyelesaian bersepadu dalam khidmat nasihat, penilaian, penyelidikan, latihan dan penambahbaikan organisasi bagi menangani cabaran institusi dan perniagaan yang kompleks.",
      primaryCta: "TEROKAI KEPAKARAN KAMI",
      secondaryCta: "HUBUNGI KAMI",
      operatingNote: "Nilai, Negeri Sembilan · Operasi secara jarak jauh",
    },
    whoWeAre: {
      eyebrow: "SIAPA KAMI",
      heading: "SATU ORGANISASI. PELBAGAI KEPAKARAN. MATLAMAT BERSAMA.",
      paragraphs: [
        "MIPV menyepadukan pelbagai disiplin profesional melalui model operasi dalaman yang terselaras. Tadbir urus, modal insan, keselamatan dan prestasi tidak dilihat sebagai isu yang berasingan; sebaliknya, kami meneliti cara setiap aspek saling mempengaruhi dan merangka penyelesaian yang mengambil kira hubungan tersebut.",
        "Keberhasilan organisasi bergantung pada hubungan antara insan, proses, sistem, tadbir urus, keselamatan, risiko, kualiti dan prestasi. Menangani satu aspek secara terpisah jarang menghasilkan penambahbaikan yang berkekalan.",
      ],
      connectionsLabel: "HUBUNG KAIT YANG KAMI TANGANI",
      connections: ["Insan", "Proses", "Sistem", "Tadbir Urus", "Keselamatan", "Risiko", "Kualiti", "Prestasi"],
      pillars: [
        { title: "FOKUS KAMI", text: "Tadbir urus, risiko, integriti, kualiti, keselamatan, modal insan, pengurusan dan prestasi." },
        { title: "PENDEKATAN KAMI", text: "Menggabungkan kepakaran profesional, kaedah analitikal dan pelaksanaan praktikal." },
        {
          title: "MATLAMAT KAMI",
          text: "Membantu organisasi membuat keputusan yang tepat, meningkatkan keupayaan dan mencipta nilai jangka panjang.",
        },
      ],
    },
    principles: {
      eyebrow: "MAKSUD DI SEBALIK MIPV",
      heading: "EMPAT PRINSIP. SATU MATLAMAT.",
      intro: "Empat huruf MIPV mencerminkan prinsip yang membentuk setiap penglibatan kami dan menjadi asas identiti korporat kami.",
    },
    expertise: {
      eyebrow: "BIDANG KEPAKARAN",
      heading: "LIMA DOMAIN KEUPAYAAN BERSEPADU",
      intro: "Disiplin profesional yang saling melengkapi, diselaraskan dalam satu rangka kerja perundingan.",
    },
    services: {
      eyebrow: "PERKHIDMATAN KAMI",
      heading: "PELBAGAI DISIPLIN. ENAM BENTUK PENYAMPAIAN.",
      intro: "Kepakaran kami disampaikan melalui enam model perkhidmatan yang saling melengkapi, sama ada secara berasingan atau gabungan mengikut keperluan setiap organisasi.",
    },
    approach: {
      eyebrow: "PENDEKATAN KAMI",
      heading: "LALUAN SISTEMATIK KE ARAH HASIL YANG MAMPAN",
      intro: "Rangka kerja penyampaian lima peringkat yang berstruktur memastikan setiap penglibatan dilaksanakan secara konsisten dan telus.",
    },
    why: {
      eyebrow: "MENGAPA MIPV",
      heading: "PERSPEKTIF MULTIDISIPLIN TERHADAP KECEMERLANGAN ORGANISASI",
      statements: [
        "Tadbir urus mempengaruhi prestasi.",
        "Kepimpinan membentuk budaya.",
        "Keselamatan mempengaruhi produktiviti.",
        "Integriti membina kepercayaan.",
        "Kualiti menjamin konsistensi.",
      ],
      closing: "Kami melihat hubungan antara insan, sistem, proses, tadbir urus dan prestasi secara menyeluruh.",
      points: [
        {
          title: "Perspektif multidisiplin yang bersepadu",
          text: "Disiplin yang relevan digabungkan untuk meneliti sesuatu isu daripada pelbagai sudut.",
        },
        {
          title: "Penilaian dan nasihat berasaskan bukti",
          text: "Cadangan dibina berdasarkan pengumpulan data yang berstruktur dan analisis yang teliti.",
        },
        {
          title: "Intervensi praktikal mengikut keperluan",
          text: "Setiap penglibatan dirangka berdasarkan konteks, keutamaan dan objektif organisasi.",
        },
        {
          title: "Metodologi profesional berstruktur",
          text: "Kaedah yang konsisten menyokong kejelasan, kebolehbandingan dan akauntabiliti.",
        },
        {
          title: "Model operasi dalaman yang terselaras",
          text: "Setiap penglibatan diselaraskan secara dalaman dengan pemilikan profesional yang jelas.",
        },
        {
          title: "Fokus kepada nilai organisasi yang mampan",
          text: "Penyelesaian dirangka untuk menyokong penambahbaikan yang berkekalan melangkaui tempoh penglibatan.",
        },
      ],
    },
    cta: {
      heading: "BERSAMA MEMBINA ORGANISASI YANG LEBIH KUKUH.",
      text: "Ketahui bagaimana kepakaran profesional bersepadu dapat menyokong cabaran, keutamaan dan peluang organisasi anda.",
      button: "HUBUNGI MIPV",
    },
  },

  about: {
    heading: "MENGENAI MIPV",
    subheading: "SATU ORGANISASI. PELBAGAI KEPAKARAN. MATLAMAT BERSAMA.",
    overviewEyebrow: "GAMBARAN KESELURUHAN KORPORAT",
    overview: [
      "MIPV ialah firma perunding profesional multidisiplin bersepadu yang ditubuhkan untuk menyediakan penyelesaian menyeluruh dalam khidmat nasihat, penilaian, penyelidikan, latihan dan penambahbaikan organisasi merentas pelbagai industri dan sektor.",
      "Berpandukan prinsip Pengurusan, Inovasi, Prestasi dan Nilai, MIPV menghimpunkan pelbagai disiplin profesional dalam satu rangka kerja perundingan yang terselaras bagi menangani cabaran organisasi, operasi dan institusi yang kompleks.",
      "Pendekatan kami menggabungkan analisis strategik, pengetahuan profesional, penilaian berasaskan bukti dan pelaksanaan praktikal bagi menyokong pembuatan keputusan yang berinformasi, keberkesanan organisasi dan pembangunan yang mampan.",
    ],
    factsHeading: "MAKLUMAT KORPORAT",
    facts: [
      { label: "Nama Berdaftar", value: "MIPV Consultancy" },
      { label: "No. Pendaftaran Perniagaan", value: "003830433-K" },
      { label: "Kedudukan Perniagaan", value: "Perunding Profesional Multidisiplin" },
      { label: "Model Operasi", value: "Kepakaran Multidisiplin Dalaman" },
      { label: "Lokasi Perniagaan", value: "Nilai, Negeri Sembilan, Malaysia" },
      { label: "Kaedah Operasi", value: "Operasi Secara Jarak Jauh" },
    ],
    philosophy: {
      eyebrow: "FALSAFAH KORPORAT",
      heading: "MAKSUD DI SEBALIK MIPV",
      intro:
        "MIPV bukan sekadar nama. Setiap huruf mewakili prinsip yang membimbing cara kami berfikir, cara kami bekerja dan cara kami mengukur nilai sumbangan kami.",
    },
    visionMission: {
      heading: "VISI & MISI",
      visionLabel: "VISI KAMI",
      vision:
        "Menjadi firma perunding profesional multidisiplin yang dipercayai dan diiktiraf dalam memacu kecemerlangan organisasi, memperkukuh keupayaan institusi dan menghasilkan nilai mampan melalui kepakaran bersepadu serta penyelesaian yang inovatif.",
      missionLabel: "MISI KAMI",
      mission:
        "Menyediakan penyelesaian profesional yang menyeluruh, berasaskan bukti dan praktikal bagi membolehkan organisasi memperkukuh tadbir urus, mengurus risiko, membangunkan keupayaan insan, meningkatkan prestasi operasi dan mencapai objektif strategik.",
    },
    operatingModel: {
      eyebrow: "MODEL OPERASI",
      heading: "KEPAKARAN MULTIDISIPLIN DALAMAN",
      paragraphs: [
        "MIPV beroperasi melalui model multidisiplin dalaman. Kompetensi khusus diselaraskan dalam satu rangka kerja perundingan, dengan metodologi yang konsisten dan pemilikan yang jelas bagi setiap penglibatan.",
        "Operasi dijalankan secara jarak jauh dari Nilai, Negeri Sembilan. Urusan di lokasi pelanggan boleh diatur mengikut keperluan tugasan.",
      ],
      link: "LIHAT CARA KAMI BEKERJA",
    },
    commitment: {
      eyebrow: "KOMITMEN PROFESIONAL",
      heading: "AMALAN BERTANGGUNGJAWAB DAN BERASASKAN BUKTI",
      items: [
        {
          title: "Integriti dan objektiviti",
          text: "Setiap penglibatan dilaksanakan dengan jujur, objektif dan menghormati organisasi serta individu yang terlibat.",
        },
        {
          title: "Skop profesional yang bersesuaian",
          text: "Perkhidmatan yang dikawal selia dan khusus, termasuk kerja psikometrik, psikologi dan audit, hanya disampaikan dalam lingkungan kelayakan, kebenaran dan skop yang bersesuaian.",
        },
        {
          title: "Kerahsiaan",
          text: "Maklumat pelanggan dikendalikan secara bertanggungjawab dan hanya digunakan bagi tujuan penglibatan.",
        },
        {
          title: "Bukti dan ketelusan",
          text: "Dapatan dan cadangan berasaskan bukti yang kukuh dan disampaikan dengan jelas.",
        },
      ],
    },
  },

  domains: [
    {
      id: "governance" as DomainId,
      number: "01",
      title: "TADBIR URUS, RISIKO, INTEGRITI & PEMATUHAN",
      short: "Tadbir urus berkesan, pengurusan risiko, etika dan kawalan.",
      tagline: "Memperkukuh Tadbir Urus. Mengurus Risiko. Membina Kepercayaan.",
      intro:
        "Menyokong organisasi yang beretika, bertanggungjawab dan berdaya tahan melalui khidmat nasihat, penilaian dan pembangunan keupayaan yang berstruktur.",
      context:
        "Kami membantu organisasi menjelaskan akauntabiliti, memahami pendedahan kepada risiko serta memperkukuh dasar, kawalan dan langkah integriti yang menjadi asas kepercayaan institusi.",
      items: [
        "Tadbir Urus Korporat",
        "Pengurusan Risiko Perusahaan",
        "Integriti dan Antirasuah",
        "Sistem Pengurusan Antirasuah",
        "Pematuhan Organisasi",
        "Penilaian Etika dan Integriti",
        "Kawalan Dalaman",
        "Pembangunan Dasar dan Prosedur",
        "Penilaian Tahap Kematangan Tadbir Urus dan Risiko",
      ],
      focus: "Keputusan bertanggungjawab dan kepercayaan institusi",
      scopeNote: "",
    },
    {
      id: "quality-safety" as DomainId,
      number: "02",
      title: "KUALITI, KESELAMATAN, KESIHATAN & KECEMERLANGAN ORGANISASI",
      short: "Sistem pengurusan, keselamatan tempat kerja dan penambahbaikan berterusan.",
      tagline: "Sistem Lebih Baik. Tempat Kerja Lebih Selamat. Prestasi Lebih Kukuh.",
      intro:
        "Memperkukuh sistem pengurusan, amalan di tempat kerja dan penambahbaikan operasi melalui panduan profesional serta penilaian.",
      context:
        "Kerja kami dalam domain ini menyokong organisasi untuk mewujudkan sistem pengurusan yang boleh diharap, mengenal pasti risiko di tempat kerja dan membina budaya penambahbaikan berterusan.",
      items: [
        "Sistem Pengurusan Kualiti",
        "Keselamatan dan Kesihatan Pekerjaan",
        "Khidmat Nasihat Alam Sekitar, Kesihatan dan Keselamatan (HSE)",
        "Penilaian Risiko Tempat Kerja",
        "Audit Dalaman Sistem Pengurusan",
        "Penilaian Budaya Keselamatan",
        "Penambahbaikan Proses",
        "Kecemerlangan Operasi",
        "Kesediaan Sistem Pengurusan",
        "Penambahbaikan Berterusan",
      ],
      focus: "Operasi lebih selamat dan prestasi yang konsisten",
      scopeNote: "",
    },
    {
      id: "human-capital" as DomainId,
      number: "03",
      title: "PSIKOLOGI, PSIKOMETRIK & MODAL INSAN",
      short: "Penilaian individu, pembangunan keupayaan dan budaya organisasi.",
      tagline: "Memahami Insan. Mengembangkan Potensi.",
      intro:
        "Menggunakan perspektif tingkah laku dan modal insan bagi menyokong keputusan organisasi serta pembangunan profesional.",
      context:
        "Penilaian dan kajian dalam domain ini membantu organisasi memahami keupayaan, tingkah laku dan iklim tempat kerja, serta merancang pembangunan warga kerja dengan lebih yakin.",
      items: [
        "Penilaian Psikometrik",
        "Pemprofilan Tingkah Laku",
        "Penilaian Psikologi, tertakluk kepada kebenaran profesional",
        "Penilaian Kepimpinan",
        "Penilaian Kompetensi",
        "Kajian Iklim Organisasi",
        "Penilaian Penglibatan Pekerja",
        "Analisis Keperluan Latihan",
        "Pembangunan Bakat",
        "Pembangunan Modal Insan",
      ],
      focus: "Keputusan berkaitan insan yang berasaskan bukti",
      scopeNote:
        "Penilaian psikologi dan aktiviti lain yang dikawal selia hanya dilaksanakan apabila mendapat kebenaran profesional dan dalam lingkungan skop amalan yang bersesuaian.",
    },
    {
      id: "strategy-performance" as DomainId,
      number: "04",
      title: "PENGURUSAN STRATEGIK & PRESTASI ORGANISASI",
      short: "Strategi organisasi, penambahbaikan perniagaan dan keberkesanan.",
      tagline: "Menterjemah Strategi kepada Hasil Organisasi.",
      intro:
        "Menyokong perancangan strategik yang mantap, keberkesanan organisasi dan pelaksanaan keutamaan penambahbaikan secara praktikal.",
      context:
        "Kami menyokong pasukan kepimpinan dalam menetapkan hala tuju yang jelas, menyelaraskan struktur dan proses, serta mengurus perubahan agar hasrat organisasi diterjemahkan kepada kemajuan yang boleh diukur.",
      items: [
        "Strategi Korporat",
        "Perancangan Strategik",
        "Pembangunan Organisasi",
        "Khidmat Nasihat Perniagaan",
        "Pengurusan Prestasi",
        "Pengoptimuman Proses",
        "Pengurusan Perubahan",
        "Pembangunan Pengurusan",
        "Keberkesanan Organisasi",
        "Transformasi Perniagaan",
      ],
      focus: "Hala tuju yang selaras dan penambahbaikan yang terukur",
      scopeNote: "",
    },
    {
      id: "research-innovation" as DomainId,
      number: "05",
      title: "PENYELIDIKAN, PENILAIAN, INOVASI & PENYELESAIAN KHUSUS",
      short: "Penjanaan bukti, penilaian dan penyelesaian yang disesuaikan.",
      tagline: "Bukti. Kefahaman. Penambahbaikan.",
      intro:
        "Menghasilkan dapatan yang boleh dipercayai dan penilaian berstruktur bagi menyokong pembelajaran organisasi dan pembuatan keputusan yang berinformasi.",
      context:
        "Kaedah penyelidikan dan penilaian yang rapi menyediakan asas bukti bagi keputusan dasar, program dan organisasi, manakala penyelesaian khusus menangani keperluan yang merentasi beberapa disiplin.",
      items: [
        "Penyelidikan Gunaan",
        "Kajian Kuantitatif dan Kualitatif",
        "Penilaian Program",
        "Penilaian Dasar",
        "Penilaian Impak",
        "Diagnostik Organisasi",
        "Tinjauan Pihak Berkepentingan",
        "Kajian Asas (Baseline)",
        "Khidmat Nasihat Inovasi",
        "Penyelesaian Multidisiplin yang Disesuaikan",
      ],
      focus: "Dapatan yang membawa kepada keputusan yang lebih baik",
      scopeNote: "",
    },
  ],

  expertisePage: {
    heading: "BIDANG KEPAKARAN",
    subheading: "KOMPETENSI BERSEPADU. PERSPEKTIF MENYELURUH.",
    intro:
      "MIPV menyusun kepakaran profesionalnya kepada lima domain utama. Setiap domain boleh berdiri sendiri, namun nilai terbesar sering terhasil apabila domain-domain ini digabungkan — kerana tadbir urus, modal insan, keselamatan, kualiti dan prestasi jarang terpisah dalam amalan sebenar.",
    integrated: {
      eyebrow: "PENYELESAIAN PROFESIONAL BERSEPADU",
      heading: "MELANGKAUI SEMPADAN BIDANG KEPAKARAN.",
      intro:
        "Cabaran organisasi lazimnya melibatkan lebih daripada satu disiplin. MIPV menyepadukan keupayaan dalaman yang relevan melalui pendekatan perundingan yang terselaras.",
      items: [
        { title: "PENILAIAN RENTAS FUNGSI", text: "Pelbagai dimensi dinilai melalui satu rangka kerja yang menyeluruh." },
        { title: "PROGRAM KHUSUS", text: "Penglibatan yang dirangka berdasarkan objektif organisasi." },
        { title: "SISTEM BERSEPADU", text: "Penyelesaian yang menghubungkan tadbir urus, insan, kualiti, risiko dan prestasi." },
        { title: "PROJEK KHUSUS", text: "Perkhidmatan profesional khusus projek dalam lingkungan kompetensi yang disahkan." },
      ],
    },
  },

  services: [
    {
      id: "consultancy-advisory" as ServiceId,
      number: "01",
      title: "PERUNDINGAN & KHIDMAT NASIHAT",
      description:
        "Khidmat nasihat strategik, teknikal dan profesional bagi menyokong pembuatan keputusan dan penambahbaikan organisasi.",
      includes: [
        "Khidmat nasihat strategik dan pengurusan",
        "Panduan tadbir urus, risiko dan pematuhan",
        "Khidmat nasihat teknikal sistem pengurusan",
        "Sokongan pembangunan dasar dan rangka kerja",
      ],
    },
    {
      id: "assessment-diagnostics" as ServiceId,
      number: "02",
      title: "PENILAIAN & DIAGNOSTIK",
      description:
        "Penilaian berstruktur, penilaian psikometrik, semakan tahap kematangan, penilaian keupayaan dan diagnostik organisasi.",
      includes: [
        "Penilaian psikometrik dan kompetensi",
        "Semakan tahap kematangan tadbir urus, risiko dan integriti",
        "Diagnostik iklim dan budaya organisasi",
        "Penilaian budaya keselamatan dan keupayaan",
      ],
    },
    {
      id: "research-evaluation" as ServiceId,
      number: "03",
      title: "PENYELIDIKAN & PENILAIAN PROGRAM",
      description: "Penyelidikan gunaan, tinjauan, kajian analitikal, penilaian program dan penilaian impak.",
      includes: [
        "Penyelidikan gunaan dan kajian diagnostik",
        "Tinjauan pihak berkepentingan dan pekerja",
        "Penilaian program dan dasar",
        "Kajian asas, impak dan keberkesanan",
      ],
    },
    {
      id: "training-capacity" as ServiceId,
      number: "04",
      title: "LATIHAN & PEMBANGUNAN KEUPAYAAN",
      description:
        "Program pembangunan profesional, bengkel, inisiatif kesedaran dan aktiviti peningkatan kompetensi.",
      includes: [
        "Program pembangunan profesional",
        "Bengkel dan sesi kesedaran",
        "Pembangunan kepimpinan dan kompetensi",
        "Analisis keperluan latihan",
      ],
    },
    {
      id: "audit-review" as ServiceId,
      number: "05",
      title: "AUDIT & SEMAKAN PROFESIONAL",
      description:
        "Audit dalaman, semakan pematuhan, penilaian sistem pengurusan dan penilaian profesional dalam lingkungan kelayakan dan kebenaran yang berkaitan.",
      includes: [
        "Audit dalaman sistem pengurusan",
        "Semakan pematuhan dan kawalan dalaman",
        "Semakan dasar dan prosedur",
        "Penilaian kesediaan dan analisis jurang",
      ],
    },
    {
      id: "implementation-improvement" as ServiceId,
      number: "06",
      title: "SOKONGAN PELAKSANAAN & PENAMBAHBAIKAN",
      description:
        "Pembangunan, pelaksanaan, pemantauan dan penambahbaikan berterusan sistem, strategi dan program organisasi.",
      includes: [
        "Pembangunan rangka kerja dan sistem",
        "Perancangan dan penyelarasan pelaksanaan",
        "Pemantauan dan semakan kemajuan",
        "Sokongan penambahbaikan berterusan",
      ],
    },
  ],

  servicesPage: {
    heading: "PERKHIDMATAN PROFESIONAL KAMI",
    subheading: "PELBAGAI DISIPLIN. PENYAMPAIAN BERSEPADU.",
    intro:
      "MIPV menyampaikan kepakaran multidisiplinnya melalui enam bentuk penyampaian yang saling melengkapi. Sesuatu penglibatan boleh menggunakan satu bentuk penyampaian atau menggabungkan beberapa bentuk, bergantung pada objektif organisasi dan skop kerja.",
    scope: {
      heading: "SKOP PROFESIONAL",
      text: "Perkhidmatan psikometrik, psikologi, audit dan perkhidmatan lain yang dikawal selia atau khusus disampaikan secara bertanggungjawab dan hanya dalam lingkungan kelayakan, kebenaran dan skop profesional yang bersesuaian. Sebarang keperluan sedemikian akan dijelaskan pada peringkat awal penglibatan.",
    },
  },

  approach: [
    {
      number: "01",
      title: "FAHAMI",
      short: "Kenal pasti keperluan, cabaran dan objektif.",
      description: "Memahami konteks, objektif, cabaran dan pihak berkepentingan organisasi.",
      activities: ["Perbincangan awal dan penentuan skop", "Pemetaan konteks dan pihak berkepentingan", "Persetujuan objektif dan hasil kerja"],
    },
    {
      number: "02",
      title: "NILAI",
      short: "Semak keadaan semasa dan analisis bukti.",
      description: "Melaksanakan semakan profesional, diagnostik organisasi dan penilaian berasaskan bukti.",
      activities: ["Semakan dokumen dan data", "Tinjauan, temu bual dan penilaian", "Analisis dapatan dan bukti"],
    },
    {
      number: "03",
      title: "REKA BENTUK",
      short: "Bangunkan strategi dan intervensi yang bersesuaian.",
      description: "Membangunkan strategi, rangka kerja dan penyelesaian yang bersesuaian.",
      activities: ["Pembangunan penyelesaian dan rangka kerja", "Cadangan mengikut keutamaan", "Perancangan pelaksanaan dan penilaian"],
    },
    {
      number: "04",
      title: "LAKSANA",
      short: "Sokong pelaksanaan dan pembangunan secara bersepadu.",
      description: "Menyokong pelaksanaan, pembangunan profesional dan intervensi yang terselaras.",
      activities: ["Intervensi yang terselaras", "Latihan dan pembangunan keupayaan", "Khidmat nasihat berterusan"],
    },
    {
      number: "05",
      title: "UKUR & TAMBAH BAIK",
      short: "Nilai hasil dan peluang penambahbaikan.",
      description: "Menyemak keberkesanan, menilai hasil dan mengenal pasti peluang penambahbaikan berterusan.",
      activities: ["Semakan hasil dan keberkesanan", "Pelaporan dapatan", "Cadangan penambahbaikan berterusan"],
    },
  ],

  approachPage: {
    heading: "PENDEKATAN BERSEPADU KAMI",
    subheading: "LALUAN SISTEMATIK KE ARAH HASIL YANG MAMPAN.",
    intro:
      "Setiap penglibatan mengikut rangka kerja penyampaian yang berstruktur. Lima peringkat ini memastikan konsistensi dan ketelusan, di samping membolehkan kedalaman dan turutan kerja disesuaikan dengan keperluan setiap organisasi.",
    frameworkEyebrow: "RANGKA KERJA PENYAMPAIAN BERSEPADU",
    frameworkHeading: "LIMA PERINGKAT. SATU PENGLIBATAN YANG KOHEREN.",
    cycleNote:
      "Penilaian menjadi input kepada kitaran penambahbaikan seterusnya, supaya rangka kerja ini menyokong kemajuan berterusan dan bukan sekadar intervensi sekali sahaja.",
    model: {
      eyebrow: "MODEL OPERASI",
      heading: "KEPAKARAN DALAMAN. PENYAMPAIAN BERSEPADU. AKAUNTABILITI PROFESIONAL.",
      paragraphs: [
        "Model multidisiplin dalaman MIPV direka untuk menyelaraskan kompetensi khusus, mengekalkan metodologi yang konsisten dan menetapkan pemilikan penglibatan yang jelas.",
        "Skop setiap penglibatan ditentukan berdasarkan objektif organisasi, dan disiplin yang relevan dikenal pasti sejak awal. Input daripada pelbagai bidang kepakaran kemudiannya diselaraskan dalam satu rangka kerja penglibatan, supaya dapatan dan cadangan yang dihasilkan adalah koheren dan tidak berpecah-pecah.",
      ],
      attributes: [
        { title: "PEMILIKAN PROFESIONAL", text: "Tanggungjawab penglibatan yang ditetapkan." },
        { title: "KERJASAMA BERSEPADU", text: "Input merentas disiplin yang terselaras." },
        { title: "KOMPETENSI TEKNIKAL", text: "Kepakaran yang bersesuaian dengan skop." },
        { title: "JAMINAN KUALITI", text: "Semakan profesional yang berstruktur." },
        { title: "KERAHSIAAN PELANGGAN", text: "Pengendalian maklumat secara bertanggungjawab." },
        { title: "PENAMBAHBAIKAN BERTERUSAN", text: "Pemurnian proses dan metodologi." },
      ],
      note: "Operasi dijalankan secara jarak jauh dari Nilai, Negeri Sembilan. Urusan di lokasi pelanggan boleh diatur mengikut keperluan tugasan.",
    },
  },

  industries: [
    {
      icon: "landmark" as IndustryIcon,
      name: "Kerajaan & Sektor Awam",
      text: "Tadbir urus, integriti, penilaian program dan dasar, serta pembangunan keupayaan untuk institusi awam.",
    },
    {
      icon: "building" as IndustryIcon,
      name: "Syarikat Berkaitan Kerajaan (GLC)",
      text: "Rangka kerja tadbir urus, risiko, pematuhan dan prestasi untuk organisasi yang mempunyai akauntabiliti awam.",
    },
    {
      icon: "briefcase" as IndustryIcon,
      name: "Syarikat Korporat & Swasta",
      text: "Strategi, pembangunan organisasi, penilaian insan dan sokongan sistem pengurusan.",
    },
    {
      icon: "factory" as IndustryIcon,
      name: "Pembuatan & Perindustrian",
      text: "Pengurusan kualiti, keselamatan dan kesihatan pekerjaan, penambahbaikan proses dan kecemerlangan operasi.",
    },
    {
      icon: "hardhat" as IndustryIcon,
      name: "Pembinaan & Infrastruktur",
      text: "Penilaian risiko tempat kerja, budaya keselamatan, pematuhan dan kesediaan sistem pengurusan.",
    },
    {
      icon: "graduation" as IndustryIcon,
      name: "Pendidikan & Institusi",
      text: "Penyelidikan gunaan, penilaian, kajian iklim organisasi dan pembangunan keupayaan.",
    },
    {
      icon: "users" as IndustryIcon,
      name: "Modal Insan & Perkhidmatan Profesional",
      text: "Penilaian psikometrik, penilaian kompetensi, analisis keperluan latihan dan pembangunan bakat.",
    },
    {
      icon: "store" as IndustryIcon,
      name: "Perusahaan Kecil dan Sederhana (PKS)",
      text: "Sokongan praktikal yang bersesuaian dengan saiz organisasi bagi tadbir urus, sistem pengurusan, perancangan dan pertumbuhan.",
    },
  ],

  industriesPage: {
    heading: "INDUSTRI & SEKTOR",
    subheading: "KEPAKARAN YANG BOLEH DISESUAIKAN UNTUK PELBAGAI ORGANISASI.",
    intro:
      "Keupayaan multidisiplin MIPV bertujuan menyokong organisasi yang mempunyai keperluan institusi, operasi, tadbir urus dan prestasi yang berbeza. Sektor di bawah menggambarkan bidang yang boleh dimanfaatkan daripada kepakaran kami.",
    listHeading: "BIDANG SOKONGAN YANG BERPOTENSI",
    note: "Perkhidmatan disesuaikan dengan konteks, keperluan dan pertimbangan profesional setiap organisasi.",
  },

  contact: {
    heading: "HUBUNGI MIPV",
    subheading: "MARI BINCANG KEPERLUAN ORGANISASI ANDA.",
    intro:
      "Kongsikan cabaran, keutamaan atau sokongan yang sedang dipertimbangkan oleh organisasi anda, dan kami akan menghubungi anda untuk membincangkan cara MIPV dapat membantu.",
    detailsHeading: "MAKLUMAT PERHUBUNGAN KORPORAT",
    labels: {
      registration: "No. Pendaftaran Perniagaan",
      location: "Lokasi",
      operations: "Kaedah Operasi",
      email: "E-mel",
      phone: "Telefon",
      whatsapp: "WhatsApp",
      website: "Laman Web",
      registeredName: "Nama Berdaftar",
    },
    locationValue: "Nilai, Negeri Sembilan, Malaysia",
    operationsValue: "Operasi Secara Jarak Jauh",
    whatsappAction: "Hantar mesej melalui WhatsApp",
    onsiteNote: "Urusan di lokasi pelanggan boleh diatur mengikut keperluan tugasan.",
    form: {
      heading: "BORANG PERTANYAAN",
      requiredNote: "Ruangan bertanda * wajib diisi.",
      fullName: "Nama Penuh",
      organisation: "Organisasi",
      email: "E-mel",
      phone: "No. Telefon",
      optional: "(pilihan)",
      service: "Perkhidmatan yang Diminati",
      servicePlaceholder: "Pilih perkhidmatan",
      generalEnquiry: "Pertanyaan umum",
      subject: "Perkara",
      message: "Mesej",
      messageHint: "Terangkan secara ringkas mengenai organisasi anda, keperluan anda dan tempoh masa yang berkaitan.",
      consent:
        "Saya bersetuju MIPV mengumpul dan menggunakan data peribadi yang saya berikan bagi menjawab pertanyaan saya, selaras dengan",
      consentLink: "Dasar Privasi",
      submit: "HANTAR PERTANYAAN",
      submitting: "SEDANG DIHANTAR…",
      successHeading: "TERIMA KASIH. PERTANYAAN ANDA TELAH DIHANTAR.",
      successText: "Kami telah menerima mesej anda dan akan membalas ke alamat e-mel yang anda berikan.",
      sendAnother: "Hantar pertanyaan lain",
      errorSummary: "Sila betulkan ruangan yang ditandakan.",
      errors: {
        fullName: "Sila masukkan nama penuh anda.",
        organisation: "Sila masukkan nama organisasi anda.",
        email: "Sila masukkan alamat e-mel yang sah.",
        phone: "Sila masukkan nombor telefon yang sah.",
        service: "Sila pilih perkhidmatan yang diminati.",
        subject: "Sila masukkan perkara.",
        message: "Sila masukkan mesej sekurang-kurangnya 20 aksara.",
        consent: "Sila sahkan persetujuan anda supaya kami dapat menjawab pertanyaan anda.",
        tooLong: "Maklumat yang dimasukkan terlalu panjang.",
        captcha: "Sila lengkapkan semakan keselamatan.",
      },
      server: {
        notConfigured:
          "Borang pertanyaan dalam talian belum tersedia. Mesej anda belum dihantar. Sila hubungi kami terus melalui e-mel, telefon atau WhatsApp.",
        rateLimited: "Terlalu banyak penghantaran diterima daripada sambungan anda. Sila tunggu beberapa minit dan cuba lagi.",
        rejected: "Pertanyaan anda tidak dapat disahkan. Sila cuba lagi atau hubungi kami secara terus.",
        failed: "Pertanyaan anda tidak dapat dihantar kerana masalah teknikal. Sila cuba sebentar lagi atau hubungi kami secara terus.",
        network: "Pelayan tidak dapat dihubungi. Sila semak sambungan anda dan cuba lagi.",
      },
    },
  },

  footer: {
    tagline: "Kepakaran Bersepadu. Penyelesaian Berasaskan Bukti. Nilai Mampan.",
    description: "Firma perunding profesional multidisiplin bersepadu.",
    quickLinks: "PAUTAN PANTAS",
    servicesHeading: "PERKHIDMATAN",
    contactHeading: "HUBUNGI",
    privacy: "Dasar Privasi",
    terms: "Terma Laman Web",
    contact: "Hubungi",
    copyright: "© 2026 MIPV. HAK CIPTA TERPELIHARA.",
    registration: "MIPV Consultancy · No. Pendaftaran Perniagaan 003830433-K",
    location: "Nilai, Negeri Sembilan, Malaysia · Operasi Secara Jarak Jauh",
    visitorsToday: "Pelawat hari ini",
    visitorsMonth: "Pelawat bulan ini",
    visitorsTotal: "Jumlah pelawat",
  },

  legal: {
    lastUpdatedLabel: "Kemas kini terakhir",
    lastUpdated: "Oktober 2026",
    privacy: {
      heading: "DASAR PRIVASI",
      subheading: "CARA KAMI MENGENDALIKAN DATA PERIBADI.",
      sections: [
        {
          title: "1. Pengenalan",
          body: [
            "Dasar Privasi ini menerangkan cara MIPV Consultancy (No. Pendaftaran Perniagaan 003830433-K) (\"MIPV\", \"kami\") mengumpul, menggunakan, mendedahkan dan melindungi data peribadi yang diberikan melalui laman web ini, selaras dengan Akta Perlindungan Data Peribadi 2010 (PDPA).",
          ],
        },
        {
          title: "2. Data peribadi yang dikumpul",
          body: [
            "Apabila anda menghantar borang pertanyaan, kami mengumpul maklumat yang anda berikan, iaitu nama penuh, organisasi, alamat e-mel, nombor telefon (jika diberikan), perkhidmatan yang diminati, perkara dan mesej.",
            "Apabila anda melayari laman web ini, penyedia hos kami mungkin memproses maklumat teknikal yang terhad seperti alamat IP, jenis pelayar dan masa akses, bagi tujuan keselamatan dan operasi.",
          ],
        },
        {
          title: "3. Cara data peribadi digunakan",
          body: [
            "Kami menggunakan data peribadi untuk menjawab pertanyaan anda, berhubung dengan anda mengenai perkhidmatan yang ditanya, menyimpan rekod surat-menyurat, serta melindungi keselamatan laman web dan mencegah penyalahgunaan borang pertanyaan.",
            "Kami tidak menggunakan data peribadi anda untuk pemasaran yang tidak diminta, dan kami tidak menjual data peribadi.",
          ],
        },
        {
          title: "4. Pendedahan",
          body: [
            "Data peribadi mungkin diproses oleh penyedia perkhidmatan yang mengehos laman web ini atau menghantar e-mel bagi pihak kami, semata-mata untuk tujuan tersebut. Kami juga boleh mendedahkan data peribadi sekiranya dikehendaki oleh undang-undang atau pihak berkuasa yang berkenaan.",
          ],
        },
        {
          title: "5. Tempoh penyimpanan",
          body: [
            "Kami menyimpan data peribadi hanya selama yang diperlukan untuk memenuhi tujuan data tersebut dikumpul, atau sebagaimana yang dikehendaki oleh undang-undang yang terpakai.",
          ],
        },
        {
          title: "6. Keselamatan",
          body: [
            "Kami mengambil langkah teknikal dan organisasi yang munasabah untuk melindungi data peribadi, termasuk penghantaran yang disulitkan (HTTPS). Tiada kaedah penghantaran melalui internet yang selamat sepenuhnya, dan kami tidak dapat menjamin keselamatan mutlak.",
          ],
        },
        {
          title: "7. Kuki dan perlindungan spam",
          body: [
            "Laman web ini tidak menggunakan kuki pengiklanan atau analitik. Sekiranya perkhidmatan perlindungan spam diaktifkan pada borang pertanyaan, perkhidmatan tersebut mungkin memproses maklumat teknikal yang terhad bagi membezakan pelawat sebenar daripada penghantaran automatik. Kiraan pelawat yang dipaparkan di bahagian bawah setiap halaman adalah tanpa nama: pelayar anda hanya menyimpan tarikh lawatan terakhir supaya anda dikira sekali sehari, dan tiada maklumat peribadi dikumpul.",
          ],
        },
        {
          title: "8. Hak anda",
          body: [
            "Tertakluk kepada PDPA, anda boleh meminta akses kepada atau pembetulan data peribadi anda, dan anda boleh menarik balik persetujuan bagi pemprosesannya. Untuk berbuat demikian, sila hubungi kami di enquiry@mipv.com.my.",
          ],
        },
        {
          title: "9. Perubahan kepada dasar ini",
          body: [
            "Kami boleh mengemas kini Dasar Privasi ini dari semasa ke semasa. Versi terkini akan sentiasa diterbitkan di halaman ini bersama tarikh kemas kini terakhir.",
          ],
        },
        {
          title: "10. Hubungi kami",
          body: [
            "Bagi sebarang pertanyaan mengenai Dasar Privasi ini, sila hubungi MIPV di enquiry@mipv.com.my, +60 17-444 9446 atau +60 18-955 3551.",
          ],
        },
      ],
    },
    terms: {
      heading: "TERMA LAMAN WEB",
      subheading: "TERMA PENGGUNAAN LAMAN WEB INI.",
      sections: [
        {
          title: "1. Penerimaan",
          body: [
            "Laman web ini dikendalikan oleh MIPV Consultancy (No. Pendaftaran Perniagaan 003830433-K) (\"MIPV\"). Dengan mengakses atau menggunakan laman web ini, anda bersetuju dengan Terma Laman Web ini.",
          ],
        },
        {
          title: "2. Maklumat umum sahaja",
          body: [
            "Kandungan laman web ini disediakan sebagai maklumat umum mengenai MIPV dan perkhidmatannya. Kandungan ini bukan nasihat profesional dan tidak boleh dijadikan pengganti kepada nasihat yang khusus untuk keadaan anda.",
            "Penghantaran pertanyaan tidak mewujudkan hubungan pelanggan atau hubungan profesional. Sebarang penglibatan tertakluk kepada perjanjian bertulis yang berasingan yang menetapkan skop, terma dan hasil kerjanya.",
          ],
        },
        {
          title: "3. Skop profesional",
          body: [
            "Keterangan perkhidmatan di laman web ini menunjukkan bidang keupayaan. Perkhidmatan yang dikawal selia atau khusus, termasuk perkhidmatan psikometrik, psikologi dan audit, hanya disediakan dalam lingkungan kelayakan, kebenaran dan skop profesional yang bersesuaian.",
          ],
        },
        {
          title: "4. Harta intelek",
          body: [
            "Nama MIPV, logo, kandungan dan reka bentuk laman web ini adalah hak milik MIPV melainkan dinyatakan sebaliknya. Bahan-bahan ini tidak boleh diterbitkan semula, diubah suai atau digunakan untuk tujuan komersial tanpa kebenaran bertulis terlebih dahulu.",
          ],
        },
        {
          title: "5. Penggunaan yang dibenarkan",
          body: [
            "Anda bersetuju untuk tidak menyalahgunakan laman web ini, termasuk dengan menghantar maklumat palsu atau mengelirukan, cuba mendapatkan akses tanpa kebenaran, atau mengganggu operasi atau keselamatannya.",
          ],
        },
        {
          title: "6. Pautan luar",
          body: [
            "Pautan ke laman web luar disediakan untuk kemudahan. MIPV tidak bertanggungjawab terhadap kandungan, ketersediaan atau amalan privasi laman web luar.",
          ],
        },
        {
          title: "7. Had liabiliti",
          body: [
            "Walaupun kami berusaha memastikan maklumat di laman web ini tepat dan terkini, maklumat tersebut disediakan \"sebagaimana adanya\". Setakat yang dibenarkan oleh undang-undang, MIPV tidak bertanggungjawab ke atas sebarang kerugian yang timbul daripada penggunaan atau kebergantungan pada laman web ini.",
          ],
        },
        {
          title: "8. Undang-undang yang terpakai",
          body: ["Terma Laman Web ini ditadbir oleh undang-undang Malaysia."],
        },
        {
          title: "9. Perubahan",
          body: [
            "Kami boleh meminda Terma Laman Web ini pada bila-bila masa dengan mengemas kini halaman ini. Penggunaan berterusan laman web selepas sebarang perubahan dianggap sebagai penerimaan terma yang dipinda.",
          ],
        },
      ],
    },
  },

  notFound: {
    heading: "HALAMAN TIDAK DITEMUI",
    text: "Halaman yang anda cari mungkin telah dipindahkan atau tidak lagi wujud.",
    button: "KEMBALI KE LAMAN UTAMA",
  },
};
