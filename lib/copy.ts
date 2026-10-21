import type { Locale, PageKey } from "./config";

const copy = {
  fa: {
    nav: ["خانه", "راهکارها", "دموها", "درباره ما", "تماس"],
    common: {
      skip: "رفتن به محتوای اصلی",
      talk: "گفت‌وگو درباره پروژه",
      explore: "بیشتر بدانید",
      back: "بازگشت به بالای صفحه",
      missing: "این صفحه پیدا نشد.",
      menu: "فهرست",
      close: "بستن فهرست",
      footer:
        "ویرا دیتا؛ طراحی و اجرای راهکارهای داده و هوش مصنوعی برای مسئله‌های واقعی کسب‌وکار.",
      status: {
        planned: "در حال آماده‌سازی",
        preview: "پیش‌نمایش با داده نمونه",
        live: "دموی قابل اجرا با داده نمونه",
      },
      demoCta: {
        planned: "درباره این سناریو گفت‌وگو کنیم",
        preview: "دیدن پیش‌نمایش",
        live: "اجرای دمو",
      },
    },
    home: {
      eyebrow: "داده، هوش مصنوعی، تصمیم",
      title: "از داده‌های پیچیده، به تصمیم‌های روشن.",
      lead: "ویرا دیتا مسئله‌های عملیاتی و مدیریتی را می‌شناسد و با تحلیل داده، هوش مصنوعی و خودکارسازی برای آن‌ها راهکار قابل اجرا طراحی می‌کند.",
      primary: "راهکارها را ببینید",
      secondary: "درباره پروژه‌تان صحبت کنیم",
      graphic: "از داده تا بینش، از بینش تا اقدام",
      problemTitle: "مسئله را روشن می‌کنیم؛ بعد راهکار را می‌سازیم.",
      problemBody:
        "گزارش‌هایی که دیر آماده می‌شوند، اطلاعات پراکنده، کارهای تکراری یا پرسش‌هایی که پاسخشان در اسناد و سیستم‌ها گم شده است، هرکدام راه‌حل متفاوتی دارند. ابتدا وضعیت فعلی، داده‌های در دسترس و نتیجه مورد انتظار را بررسی می‌کنیم؛ سپس مسیر مناسب را پیشنهاد می‌دهیم.",
      problemTags: [
        "گزارش‌های دیرهنگام",
        "اطلاعات پراکنده",
        "کارهای تکراری",
        "پاسخ‌های پنهان در اسناد",
      ],
      familiesLabel: "حوزه‌های راهکار",
      families: [
        { title: "مالی", body: "از تطبیق اعداد تا دیدن دقیق‌تر هزینه و سودآوری.", cta: "راهکارهای مالی" },
        { title: "هوشمندسازی", body: "دسترسی بهتر به دانش سازمانی و ساده‌سازی کارهای تکراری.", cta: "راهکارهای هوشمندسازی" },
        { title: "تولیدی و صنعتی", body: "شناخت گلوگاه تولید، توقف‌ها و تغییرات کیفیت.", cta: "راهکارهای صنعتی" },
        { title: "بازرگانی", body: "دید روشن‌تر از خرید، تأمین و موجودی.", cta: "راهکارهای بازرگانی" },
        { title: "فروش", body: "شناخت رفتار مشتری، روند فروش و عملکرد کانال‌ها.", cta: "راهکارهای فروش" },
        { title: "سلامت و درمان", body: "کمک به برنامه‌ریزی ظرفیت و جریان خدمت در مراکز درمانی.", cta: "راهکارهای سلامت" },
      ],
      stepsTitle: "از گفت‌وگوی اول تا نتیجه قابل بررسی.",
      steps: [
        [
          "شناخت",
          "مسئله، کاربران، فرایند موجود و نتیجه مورد انتظار را روشن می‌کنیم.",
        ],
        [
          "بررسی داده و امکان اجرا",
          "کیفیت داده، دسترسی، محدودیت‌ها و گزینه‌های راهکار را می‌سنجیم.",
        ],
        [
          "ساخت مرحله‌ای",
          "محدوده و معیار بررسی را مشخص می‌کنیم و یک مسیر قابل آزمون می‌سازیم.",
        ],
        [
          "ارزیابی و بهبود",
          "خروجی را با شواهد و سناریوهای واقعی کار می‌سنجیم و اصلاح می‌کنیم.",
        ],
      ],
      demosTitle: "ایده را در عمل ببینید.",
      demosBody: "داشبورد و دستیار هوشمند در حال آماده‌سازی‌اند.",
      demosCta: "دموها را ببینید",
      closeTitle: "مسئله شما از کجا شروع می‌شود؟",
      closeBody:
        "لازم نیست از ابتدا راهکار را انتخاب کرده باشید. درباره کار، داده‌ها و نتیجه‌ای که می‌خواهید به آن برسید گفت‌وگو می‌کنیم.",
      closeCta: "شروع گفت‌وگو",
    },
    solutions: {
      title: "راهکارها برای مسئله‌های واقعی هر صنعت.",
      lead: "از مالی و تولید تا فروش و درمان، مسئله هر سازمان را با داده و فرایند همان سازمان بررسی می‌کنیم. نمونه‌های زیر مسیرهای ممکن‌اند؛ محدوده اجرا پس از شناخت نیاز و داده تعیین می‌شود.",
      items: [
        {
          id: "finance", title: "مالی",
          intro: "برای تصمیم مالی، عددها باید هم‌معنا، به‌روز و قابل پیگیری باشند.",
          cases: [
            ["گزارش سودآوری با تأخیر آماده می‌شود.", "تعریف مشترک درآمد و هزینه، تطبیق داده‌های حسابداری و فروش، و طراحی گزارش دوره‌ای با امکان بررسی ردیف‌های سازنده هر عدد."],
            ["علت افزایش هزینه روشن نیست.", "تفکیک هزینه بر پایه مرکز هزینه، محصول و دوره؛ سپس نمایش تغییرات مهم برای بررسی مدیر مالی."],
            ["جریان نقدی قابل پیش‌بینی نیست.", "کنار هم گذاشتن سررسید دریافت‌ها و پرداخت‌ها و ساخت سناریوهای کوتاه‌مدت با فرض‌های شفاف."],
          ], cta: "درباره مسئله مالی گفت‌وگو کنیم",
        },
        {
          id: "intelligence", title: "هوشمندسازی",
          intro: "وقتی دانش پراکنده و کار تکراری زیاد است، می‌توان مسیر دسترسی و انجام کار را ساده‌تر کرد.",
          cases: [
            ["پاسخ به پرسش‌های داخلی در اسناد پراکنده است.", "سامان‌دهی منابع مجاز و بررسی امکان دستیار جست‌وجو با ارجاع به سند و رعایت سطح دسترسی."],
            ["درخواست‌های مشابه بارها دستی ثبت می‌شوند.", "ترسیم گردش کار، شناسایی مرحله‌های تکراری و طراحی خودکارسازی محدود با امکان تأیید انسانی."],
            ["اولویت رسیدگی به درخواست‌ها مبهم است.", "تعریف معیارهای اولویت و آزمون یک روش دسته‌بندی روی داده‌های گذشته، همراه با امکان بازبینی نتیجه."],
          ], cta: "درباره هوشمندسازی گفت‌وگو کنیم",
        },
        {
          id: "industry", title: "تولیدی و صنعتی",
          intro: "داده خط تولید زمانی ارزش دارد که به کاهش توقف و تصمیم بهتر درباره ظرفیت و کیفیت کمک کند.",
          cases: [
            ["توقف‌های خط تولید علت مشخصی ندارند.", "ثبت یکسان علت توقف و تحلیل زمان، دستگاه و شیفت برای شناسایی گلوگاه‌های پرتکرار."],
            ["ضایعات در بعضی بچ‌ها بیشتر است.", "پیوند داده تولید و کنترل کیفیت برای مقایسه مواد، شرایط فرایند و نرخ ضایعات."],
            ["برنامه تولید با ظرفیت واقعی هماهنگ نیست.", "نمایش ظرفیت، سفارش و موجودی در یک نمای برنامه‌ریزی و بررسی سناریوهای جابه‌جایی سفارش."],
          ], cta: "درباره تولید گفت‌وگو کنیم",
        },
        {
          id: "commerce", title: "بازرگانی",
          intro: "تصمیم خرید و تأمین به دید مشترک از تقاضا، موجودی و عملکرد تأمین‌کننده نیاز دارد.",
          cases: [
            ["موجودی برخی کالاها زیاد و برخی کم است.", "تلفیق فروش، سفارش و موجودی برای مشخص‌کردن اقلام پرریسک و بازنگری نقطه سفارش."],
            ["عملکرد تأمین‌کنندگان به‌سختی مقایسه می‌شود.", "تعریف شاخص‌هایی مانند زمان تحویل، کیفیت و نوسان قیمت و ساخت گزارش مقایسه‌ای."],
            ["تغییر قیمت خرید دیر دیده می‌شود.", "مقایسه قیمت هر قلم در دوره‌ها و قراردادها و علامت‌گذاری تغییرات نیازمند بررسی."],
          ], cta: "درباره بازرگانی گفت‌وگو کنیم",
        },
        {
          id: "sales", title: "فروش",
          intro: "از عدد فروش تا رفتار مشتری، گزارش باید به اقدام تیم فروش کمک کند.",
          cases: [
            ["دلیل افت فروش یک منطقه معلوم نیست.", "بررسی روند فروش به تفکیک منطقه، محصول و کانال و مقایسه آن با دوره مشابه."],
            ["فرصت‌های فروش در پیگیری گم می‌شوند.", "تعریف مراحل فرصت و گزارش زمان ماندن در هر مرحله برای پیدا کردن نقطه‌های ریزش."],
            ["مشتریان قدیمی کمتر خرید می‌کنند.", "تحلیل فاصله و تکرار خرید و تهیه فهرست مشتریانی که نیاز به پیگیری دارند."],
          ], cta: "درباره فروش گفت‌وگو کنیم",
        },
        {
          id: "healthcare", title: "سلامت و درمان",
          intro: "بیمارستان‌ها و مراکز درمانی برای برنامه‌ریزی خدمت به داده دقیق، محرمانگی و نظارت انسانی نیاز دارند.",
          cases: [
            ["زمان انتظار در بعضی بخش‌ها بالاست.", "تحلیل زمان پذیرش، ارجاع و خدمت به‌صورت تجمیعی برای شناخت گلوگاه و تنظیم ظرفیت."],
            ["استفاده از تخت و تجهیزات نوسان دارد.", "نمایش روند اشغال، زمان آزادسازی و برنامه خدمت برای پشتیبانی از برنامه‌ریزی منابع."],
            ["گزارش عملکرد واحدها دیر آماده می‌شود.", "تعریف شاخص‌های مورد توافق و ساخت گزارش دوره‌ای از داده‌های مجاز، با کنترل دسترسی و بدون تصمیم‌گیری خودکار درمانی."],
          ], cta: "درباره نیاز مرکز درمانی گفت‌وگو کنیم",
        },
      ],
      closing: "هر راهکار با توجه به فرایند، داده و محدودیت‌های سازمان شما تعریف و ارزیابی می‌شود.",
    },
    demos: {
      title: "نمونه‌هایی برای دیدن شیوه کار راهکار.",
      lead: "دو ایده برای دیدن مسیر گزارش‌گیری و دسترسی به دانش سازمانی.",
      promptLabel: "درخواست نمونه",
      dashboard: {
        title: "داشبورد هوشمند",
        summary:
          "طرح داشبوردی برای بررسی شاخص‌ها، نمودارها و ردیف‌های سازنده هر عدد؛ با امکان مقایسه مالی، فروش و خرید در یک نمای هماهنگ.",
        prompts: [
          "گزارش فروش ماه جاری را به تفکیک محصول بده",
          "هزینه‌های خرید را با دوره قبل مقایسه کن",
          "درآمد، هزینه و سود را نشان بده و تغییرات مهم را مشخص کن",
        ],
      },
      assistant: {
        title: "دستیار هوش مصنوعی",
        summary:
          "طرح دستیار برای یافتن پاسخ در منابع مجاز سازمانی، همراه با ارجاع به منبع و بیان روشن موارد نامعلوم.",
        prompts: ["مراحل تأیید درخواست خرید چیست و این پاسخ از کدام سند آمده؟"],
      },
    },
    about: {
      title: "فناوری زمانی ارزش دارد که مسئله را بهتر حل کند.",
      lead: "ویرا دیتا برای نزدیک‌کردن توان داده و هوش مصنوعی به کار واقعی سازمان‌ها شکل گرفته است. از گفت‌وگو درباره مسئله شروع می‌کنیم، گزینه‌ها را با شواهد می‌سنجیم و راهکاری می‌سازیم که بتوان آن را استفاده و ارزیابی کرد.",
      howTitle: "شیوه همکاری ما",
      howBody:
        "هدف، تحویل یک فایل یا نمایش چشمگیر به‌تنهایی نیست. مسئله، کاربران، داده، محدودیت اجرا و معیار موفقیت را با هم مشخص می‌کنیم. نتیجه در مراحل قابل بررسی ساخته می‌شود و تعهد هر مرحله بر اساس محدوده و شواهد همان پروژه تعریف خواهد شد.",
      principles: [
        ["وضوح", "ابتدا مسئله و تصمیمی را که باید پشتیبانی شود روشن می‌کنیم."],
        [
          "قابلیت بررسی",
          "برای شاخص، پاسخ یا پیش‌بینی، مبنا و محدودیت را مشخص می‌کنیم.",
        ],
        [
          "تناسب",
          "فناوری و شیوه استقرار را با داده، منابع و شرایط پروژه انتخاب می‌کنیم.",
        ],
        [
          "یادگیری",
          "خروجی را با سناریوهای آزمون می‌سنجیم و بر اساس بازخورد اصلاح می‌کنیم.",
        ],
      ],
      team: "تیم ویرا دیتا متخصصانی در حوزه داده، هوش مصنوعی، طراحی تجربه و اجرای راهکارهای سازمانی را کنار هم می‌آورد. با شناخت فرایندهای هر مجموعه، راهکارهایی طراحی می‌کنیم که برای کاربران روشن و برای سازمان قابل ارزیابی باشند.",
      cta: "مسئله‌تان را با ما در میان بگذارید.",
    },
    contact: {
      title: "بیایید از مسئله شما شروع کنیم.",
      lead: "چند خط درباره کسب‌وکار، چالش فعلی و نتیجه‌ای که می‌خواهید بنویسید. اگر هنوز راهکار مشخص نیست، همان مسئله نقطه شروع خوبی است.",
      labels: {
        name: "نام و نام خانوادگی",
        email: "ایمیل",
        organization: "نام سازمان یا کسب‌وکار",
        message: "مسئله یا ایده‌تان را شرح دهید",
      },
      privacy:
        "برای شروع، اطلاعات محرمانه یا داده شخصی حساس را در این فرم ننویسید.",
      validation: {
        name: "نام و نام خانوادگی را وارد کنید.",
        nameLength: "نام باید دست‌کم دو نویسه باشد.",
        email: "ایمیل معتبر وارد کنید.",
        message: "مسئله یا ایده‌تان را شرح دهید.",
        messageLength: "پیام باید دست‌کم دوازده نویسه باشد.",
      },
    },
    metadata: {
      "": [
        "ویرا دیتا",
        "راهکارهای داده، هوش مصنوعی و خودکارسازی برای مسئله‌های واقعی کسب‌وکار؛ از شناخت مسئله تا اجرای قابل بررسی.",
      ],
      solutions: [
        "راهکارهای داده و هوش مصنوعی | ویرا دیتا",
        "راهکارهای مالی، هوشمندسازی، صنعتی، بازرگانی، فروش و سلامت متناسب با نیاز سازمان.",
      ],
      demos: [
        "دموهای ویرا دیتا",
        "نگاهی به ایده‌های داشبورد هوشمند و دستیار هوش مصنوعی؛ در حال آماده‌سازی.",
      ],
      about: [
        "درباره ویرا دیتا",
        "با رویکرد ویرا دیتا برای شناخت مسئله، طراحی راهکار و ارزیابی نتیجه آشنا شوید.",
      ],
      contact: [
        "تماس با ویرا دیتا",
        "درباره مسئله، داده و نتیجه مورد انتظارتان با ویرا دیتا گفت‌وگو کنید.",
      ],
    },
  },
  en: {
    nav: ["Home", "Solutions", "Demos", "About", "Contact"],
    common: {
      skip: "Skip to main content",
      talk: "Discuss a project",
      explore: "Learn more",
      back: "Back to top",
      missing: "We couldn't find that page.",
      menu: "Open menu",
      close: "Close menu",
      footer:
        "ViraData designs and builds data and AI solutions for real business problems.",
      status: {
        planned: "In preparation",
        preview: "Preview with sample data",
        live: "Interactive demo with sample data",
      },
      demoCta: {
        planned: "Discuss this scenario",
        preview: "View preview",
        live: "Launch demo",
      },
    },
    home: {
      eyebrow: "Data, AI, decisions",
      title: "From complex data to clearer decisions.",
      lead: "ViraData studies operational and management challenges, then designs practical solutions with data analytics, AI, and automation.",
      primary: "Explore solutions",
      secondary: "Let's discuss your project",
      graphic: "From data to insight, from insight to action",
      problemTitle: "Understand the problem. Then build the solution.",
      problemBody:
        "Slow reporting, fragmented information, repetitive work, and answers buried in documents or systems call for different approaches. We examine the current workflow, available data, and desired outcome before recommending a path.",
      problemTags: [
        "Slow reporting",
        "Fragmented information",
        "Repetitive work",
        "Answers buried in systems",
      ],
      familiesLabel: "Solution areas",
      families: [
        { title: "Finance", body: "Reconcile figures and understand costs and profitability.", cta: "Finance solutions" },
        { title: "Intelligent operations", body: "Make organizational knowledge easier to use and simplify repetitive work.", cta: "Intelligent solutions" },
        { title: "Manufacturing & industry", body: "Understand production bottlenecks, downtime, and quality shifts.", cta: "Industrial solutions" },
        { title: "Commerce", body: "See procurement, supply, and inventory more clearly.", cta: "Commerce solutions" },
        { title: "Sales", body: "Understand customers, sales trends, and channel performance.", cta: "Sales solutions" },
        { title: "Healthcare", body: "Support capacity and service planning in care settings.", cta: "Healthcare solutions" },
      ],
      stepsTitle: "From the first conversation to an outcome you can assess.",
      steps: [
        [
          "Discover",
          "Clarify the problem, users, current workflow, and desired outcome.",
        ],
        [
          "Assess",
          "Examine data quality, access, constraints, and viable approaches.",
        ],
        [
          "Build in stages",
          "Define the scope and review criteria, then create something testable.",
        ],
        [
          "Evaluate and improve",
          "Review outcomes against evidence and realistic workflows, then iterate.",
        ],
      ],
      demosTitle: "See the idea in action.",
      demosBody: "The dashboard and AI assistant are in preparation.",
      demosCta: "Explore demos",
      closeTitle: "Where does your challenge begin?",
      closeBody:
        "You don't need to choose a technology first. Tell us about the work, the information available, and the outcome you're aiming for.",
      closeCta: "Start a conversation",
    },
    solutions: {
      title: "Solutions for real challenges across industries.",
      lead: "From finance and manufacturing to sales and healthcare, we examine each organization's workflow and data. These are possible approaches; the scope is defined after understanding your needs.",
      items: [
        {
          id: "finance", title: "Finance",
          intro: "Financial decisions need figures that are consistent, current, and traceable.",
          cases: [
            ["Profitability reports arrive too late.", "Agree on revenue and cost definitions, reconcile accounting and sales data, and design periodic reports with access to underlying figures."],
            ["The cause of rising costs is unclear.", "Break down costs by cost center, product, and period, then highlight changes for finance teams to investigate."],
            ["Cash flow is difficult to plan.", "Bring receivable and payable dates together and compare short-term scenarios with clear assumptions."],
          ], cta: "Discuss a finance challenge",
        },
        {
          id: "intelligence", title: "Intelligent operations",
          intro: "Scattered knowledge and repetitive tasks can slow down everyday work.",
          cases: [
            ["Answers are scattered across internal documents.", "Organize approved sources and assess a searchable assistant that cites documents and respects access levels."],
            ["Similar requests are entered by hand repeatedly.", "Map the workflow, identify repetitive steps, and design limited automation with human approval."],
            ["Request priorities are inconsistent.", "Define prioritization criteria and test a classification approach on past requests, with results open to review."],
          ], cta: "Discuss intelligent operations",
        },
        {
          id: "industry", title: "Manufacturing & industry",
          intro: "Production data should help teams understand downtime, capacity, and quality.",
          cases: [
            ["Production stops have no clear cause.", "Record reasons consistently and analyze downtime by machine, shift, and period to find recurring bottlenecks."],
            ["Scrap is higher in some batches.", "Link production and quality records to compare materials, process conditions, and scrap rates."],
            ["Plans exceed actual capacity.", "Show capacity, orders, and inventory together and compare scheduling options."],
          ], cta: "Discuss production needs",
        },
        {
          id: "commerce", title: "Commerce",
          intro: "Procurement decisions need a shared view of demand, inventory, and supplier performance.",
          cases: [
            ["Some items are overstocked while others run out.", "Combine sales, orders, and inventory to flag at-risk items and review reorder points."],
            ["Suppliers are hard to compare.", "Define measures for delivery time, quality, and price variation, then build a comparison report."],
            ["Purchase price changes surface too late.", "Compare item prices across periods and contracts and flag changes that need review."],
          ], cta: "Discuss commerce needs",
        },
        {
          id: "sales", title: "Sales",
          intro: "Sales reporting should help teams move from a number to a useful action.",
          cases: [
            ["A regional sales decline has no clear cause.", "Compare trends by region, product, and channel against a comparable period."],
            ["Opportunities stall without follow-up.", "Define pipeline stages and report time spent in each stage to find drop-off points."],
            ["Existing customers buy less often.", "Analyze purchase frequency and gaps, then identify accounts that may need follow-up."],
          ], cta: "Discuss sales needs",
        },
        {
          id: "healthcare", title: "Healthcare",
          intro: "Hospitals and care centers need accurate data, privacy, and human oversight for service planning.",
          cases: [
            ["Wait times vary across departments.", "Analyze aggregated admission, referral, and service times to locate bottlenecks and plan capacity."],
            ["Bed and equipment use fluctuates.", "Show occupancy, turnover, and service schedules to support resource planning."],
            ["Department reports take too long to prepare.", "Agree on measures and design periodic reports from approved data with access controls and no automated clinical decisions."],
          ], cta: "Discuss your care setting",
        },
      ],
      closing: "Each solution is defined and assessed around your workflow, data, and organizational constraints.",
    },
    demos: {
      title: "Demonstrations of how a solution could work.",
      lead: "Two concepts for exploring reporting and access to organizational knowledge.",
      promptLabel: "Sample request",
      dashboard: {
        title: "Intelligent dashboard",
        summary:
          "A dashboard concept for exploring metrics, charts, and the figures behind each number, with related finance, sales, and procurement views.",
        prompts: [
          "Show this month's sales by product",
          "Compare procurement costs with the previous period",
          "Show revenue, cost, and profit, and highlight important changes",
        ],
      },
      assistant: {
        title: "AI assistant",
        summary:
          "An assistant concept for finding answers in approved organizational sources, with source references and clear responses when an answer is unknown.",
        prompts: [
          "What are the purchase request approval steps, and which document supports the answer?",
        ],
      },
    },
    about: {
      title: "Technology matters when it solves a real problem.",
      lead: "ViraData brings data and AI closer to the way organizations actually work. We begin with the problem, weigh approaches against evidence, and build solutions people can use and evaluate.",
      howTitle: "How we work",
      howBody:
        "The goal is more than delivering a file or a compelling demonstration. We define the problem, users, data, constraints, and success criteria together. Work progresses through reviewable stages, with commitments based on the evidence and scope of each project.",
      principles: [
        ["Clarity", "Define the problem and the decision to support."],
        [
          "Traceability",
          "Explain the basis and limits of a metric, answer, or forecast.",
        ],
        [
          "Fit",
          "Choose technology and deployment for the data, resources, and context.",
        ],
        ["Learning", "Test realistic scenarios and improve from feedback."],
      ],
      team: "The ViraData team brings together specialists in data, AI, experience design, and enterprise solution delivery. We learn how each organization works, then design solutions that people can use and teams can evaluate.",
      cta: "Tell us about your challenge.",
    },
    contact: {
      title: "Let's start with your challenge.",
      lead: "Tell us about your business, current challenge, and the outcome you want. If you have not chosen a solution, describing the problem is a good start.",
      labels: {
        name: "Full name",
        email: "Email",
        organization: "Organization or business",
        message: "Describe your challenge or idea",
      },
      privacy:
        "Please do not include confidential information or sensitive personal data in this initial message.",
      validation: {
        name: "Enter your full name.",
        nameLength: "Use at least two characters for your name.",
        email: "Enter a valid email address.",
        message: "Describe your challenge or idea.",
        messageLength: "Use at least twelve characters for your message.",
      },
    },
    metadata: {
      "": [
        "ViraData",
        "Data, AI, and automation solutions for real business problems, from discovery to reviewable delivery.",
      ],
      solutions: [
        "Data & AI Solutions | ViraData",
        "Explore finance, intelligent operations, manufacturing, commerce, sales, and healthcare solutions.",
      ],
      demos: [
        "ViraData Demos",
        "Explore dashboard and AI assistant concepts in preparation.",
      ],
      about: [
        "About ViraData",
        "Learn how ViraData discovers problems, designs solutions, and evaluates outcomes.",
      ],
      contact: [
        "Contact ViraData",
        "Start a conversation about your challenge, available data, and desired outcome.",
      ],
    },
  },
} as const;

export const getCopy = (lang: Locale) => copy[lang];
export const getMetadataCopy = (
  lang: Locale,
  page: PageKey,
): readonly [string, string] => copy[lang].metadata[page];
