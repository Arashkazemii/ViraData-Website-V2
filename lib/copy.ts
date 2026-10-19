import type { Locale, PageKey } from "./config";

const copy = {
  fa: {
    nav: ["خانه", "راهکارها", "دموها", "درباره ما", "تماس"],
    common: {
      skip: "رفتن به محتوای اصلی",
      talk: "گفت‌وگو درباره پروژه",
      explore: "بیشتر بدانید",
      back: "بازگشت به خانه",
      missing: "این صفحه پیدا نشد.",
      menu: "فهرست",
      close: "بستن فهرست",
      pause: "توقف حرکت",
      play: "ادامه حرکت",
      footer:
        "ویرا دیتا؛ طراحی و اجرای راهکارهای داده و هوش مصنوعی برای مسئله‌های واقعی کسب‌وکار.",
      contactSoon: "راه ارتباط ایمیلی به‌زودی در این صفحه فعال می‌شود.",
      sample: "تصویر مفهومی با داده ساختگی",
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
      familiesLabel: "حوزه‌های کار",
      families: [
        {
          title: "دستیارهای هوشمند سازمانی",
          body: "دسترسی سریع‌تر به دانش و پاسخ‌های قابل پیگیری، در محدوده منابع و دسترسی‌های مجاز.",
          cta: "آشنایی با دستیارها",
        },
        {
          title: "تحلیل داده و داشبورد مدیریتی",
          body: "شاخص‌های تعریف‌شده، گزارش‌های قابل بررسی و مسیری روشن از عدد تا جزئیات آن.",
          cta: "آشنایی با تحلیل داده",
        },
        {
          title: "راهکارهای تصمیم و خودکارسازی",
          body: "تحلیل، پیش‌بینی یا ساده‌سازی کارهای تکراری، زمانی که داده و مسئله برای آن مناسب باشد.",
          cta: "دیدن راهکارها",
        },
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
      demosBody:
        "نمونه‌های نمایشی کمک می‌کنند شکل تعامل با داده و راهکار را ببینید. داده‌ها ساختگی‌اند و دموها جایگزین بررسی مسئله و داده‌های سازمان شما نیستند.",
      demosCta: "دموها را ببینید",
      closeTitle: "مسئله شما از کجا شروع می‌شود؟",
      closeBody:
        "لازم نیست از ابتدا راهکار را انتخاب کرده باشید. درباره کار، داده‌ها و نتیجه‌ای که می‌خواهید به آن برسید گفت‌وگو می‌کنیم.",
      closeCta: "شروع گفت‌وگو",
    },
    solutions: {
      title: "راهکار متناسب با مسئله، داده و شیوه کار شما.",
      lead: "ویرا دیتا یک محصول ثابت را برای همه سازمان‌ها تجویز نمی‌کند. بسته به نیاز، یک راهکار می‌تواند از تحلیل داده، دستیار هوشمند، مدل تصمیم یا خودکارسازی تشکیل شود. محدوده و روش اجرا پس از شناخت مسئله تعیین می‌شود.",
      labels: ["نمونه کاربردها", "برای شروع نیاز داریم", "خروجی قابل بررسی"],
      items: [
        {
          id: "assistants",
          title: "دستیارهای هوشمند سازمانی",
          intro:
            "وقتی پاسخ یک پرسش میان سندها و سیستم‌ها پراکنده است، دستیار می‌تواند جست‌وجو و استفاده از دانش را ساده‌تر کند. پاسخ باید به منبع مرتبط وصل باشد و اگر شواهد کافی نیست، این محدودیت را روشن بگوید.",
          examples:
            "جست‌وجو در دستورالعمل‌ها و قراردادهای مجاز؛ راهنمایی کارکنان در فرایندها؛ پرسش درباره شاخص‌های تعریف‌شده.",
          inputs:
            "منابع قابل استفاده، سطح دسترسی، نمونه پرسش و معیار ارزیابی پاسخ.",
          output:
            "سناریوهای مجاز، رابط دستیار، ارجاع به منبع و گزارش آزمون پاسخ.",
          cta: "درباره دستیار سازمانی صحبت کنیم.",
        },
        {
          id: "analytics",
          title: "تحلیل داده و داشبورد",
          intro:
            "یک گزارش خوب فقط نمودار زیبا نیست. باید معلوم باشد شاخص چه معنایی دارد، از کدام داده حساب شده و وقتی تغییری دیده می‌شود چگونه می‌توان به جزئیات رسید.",
          examples:
            "گزارش فروش و خرید؛ پایش هزینه و سودآوری؛ تحلیل مشتری و عملکرد؛ بررسی تغییر یک شاخص در زمان یا بین گروه‌ها.",
          inputs:
            "داده‌های مبنا، تعریف شاخص‌ها، بازه و سطح جزئیات، کاربران و تصمیم‌هایی که گزارش پشتیبانی می‌کند.",
          output:
            "تعریف شاخص، گزارش تعاملی، مسیر ورود به جزئیات و آزمون تطبیق اعداد.",
          cta: "درباره داشبورد صحبت کنیم.",
        },
        {
          id: "decisions",
          title: "تصمیم‌یار و خودکارسازی",
          intro:
            "بعضی تصمیم‌ها به بررسی سناریو، پیش‌بینی یا اولویت‌بندی نیاز دارند. بعضی کارها هم با حذف ورودهای تکراری و گردش دستی ساده‌تر می‌شوند. روش مناسب به داده، هزینه خطا و نحوه استفاده افراد بستگی دارد.",
          examples:
            "پیش‌بینی تقاضا در صورت وجود تاریخچه مناسب؛ مقایسه سناریوهای خرید و تأمین؛ هشدار درباره تغییرات مهم؛ خودکارسازی مرحله‌های مشخص در یک فرایند.",
          inputs:
            "داده تاریخی و کیفیت آن، قواعد کسب‌وکار، محدودیت‌های تصمیم و خط مبنای قابل مقایسه.",
          output:
            "مدل یا قاعده آزموده‌شده، نمایش فرض‌ها و محدودیت‌ها، سناریوی کاربری و روش پایش نتیجه.",
          cta: "مسئله تصمیم‌گیری را مطرح کنیم.",
        },
      ],
      closing:
        "استقرار روی زیرساخت مشتری یا استفاده از سرویس بیرونی، با توجه به نیاز، امکانات و رضایت او بررسی می‌شود. هزینه سرویس، محرمانگی و سطح دسترسی در محدوده هر پروژه مشخص خواهد شد.",
    },
    demos: {
      title: "نمونه‌هایی برای دیدن شیوه کار راهکار.",
      lead: "این دموها از داده و منابع ساختگی استفاده می‌کنند. عملکردشان فقط همان سناریوی نمایش‌داده‌شده را نشان می‌دهد؛ نتیجه واقعی هر پروژه پس از شناخت داده و فرایند مشتری قابل ارزیابی است.",
      promptLabel: "درخواست نمونه",
      limitation: "وضعیت و محدوده",
      dashboard: {
        title: "داشبورد هوشمند",
        summary:
          "یک درخواست فارسی مانند «گزارش خرید سه ماه اخیر را با تفکیک منطقه نشان بده» به گزارش ساخت‌یافته تبدیل می‌شود. کاربر می‌تواند فیلترها، شاخص‌ها، نمودار و ردیف‌های سازنده عددها را بررسی کند. نمونه‌های مالی، فروش و خرید از یک مجموعه داده سازگار می‌آیند. بینش‌ها همراه مبنای محاسبه نمایش داده می‌شوند.",
        prompts: [
          "گزارش فروش ماه جاری را به تفکیک محصول بده",
          "هزینه‌های خرید را با دوره قبل مقایسه کن",
          "درآمد، هزینه و سود را نشان بده و تغییرات مهم را مشخص کن",
        ],
        limits:
          "این پیش‌نمایش با دادهٔ ساختگی و حالت‌های از پیش تعریف‌شده کار می‌کند. تفسیر آزاد درخواست، اتصال AI یا پایگاه داده ندارد؛ دموی اصلی در حال آماده‌سازی است.",
      },
      assistant: {
        title: "دستیار هوش مصنوعی",
        summary:
          "نمونه‌ای از پرسش و پاسخ درباره منابع مجاز سازمانی؛ مسیر هدف شامل نمایش منبع، امکان پیگیری سؤال و اعلام روشن پاسخ نامعلوم است. اجرای زنده فقط پس از آماده‌سازی و آزمون آن فعال می‌شود.",
        prompts: ["مراحل تأیید درخواست خرید چیست و این پاسخ از کدام سند آمده؟"],
        limits: "این سناریو هنوز به منابع سازمانی واقعی متصل نیست.",
      },
      note: "داده‌ها و منابع هر دمو ساختگی‌اند. برچسب نمونه‌بودن داده باید در خود دموی آینده نیز نمایش داده شود.",
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
      team: "ویرا دیتا با مدل مشاوره اجرایی فعالیت می‌کند. آرش کاظمی مسئول فنی و آرمین فرهادی مسئول مالی و تجاری همکاری هستند.",
      cta: "مسئله‌تان را با ما در میان بگذارید.",
    },
    contact: {
      title: "بیایید از مسئله شما شروع کنیم.",
      lead: "چند خط درباره کسب‌وکار، چالش فعلی و نتیجه‌ای که می‌خواهید بنویسید. اگر هنوز راهکار مشخص نیست، همان مسئله نقطه شروع خوبی است.",
      unavailable:
        "راه ارتباط ایمیلی به‌زودی در این صفحه فعال می‌شود. تا تأیید مسیر دریافت، درخواست شما اینجا ثبت یا ارسال نمی‌شود.",
      labels: {
        name: "نام و نام خانوادگی",
        email: "ایمیل",
        organization: "نام سازمان یا کسب‌وکار",
        area: "موضوع گفت‌وگو",
        message: "مسئله یا ایده‌تان را شرح دهید",
      },
      options: [
        "دستیار هوش مصنوعی",
        "تحلیل داده و داشبورد",
        "تصمیم‌یار و خودکارسازی",
        "هنوز مطمئن نیستم",
      ],
      privacy:
        "برای شروع، اطلاعات محرمانه یا داده شخصی حساس را در این فرم ننویسید.",
      validation: {
        name: "نام و نام خانوادگی را وارد کنید.",
        nameLength: "نام باید دست‌کم دو نویسه باشد.",
        email: "ایمیل معتبر وارد کنید.",
        message: "مسئله یا ایده‌تان را شرح دهید.",
        messageLength: "پیام باید دست‌کم دوازده نویسه باشد.",
      },
      prepare: "آماده‌کردن ایمیل",
      emailHint:
        "این دکمه برنامه ایمیل شما را باز می‌کند؛ ارسال نهایی را در آن برنامه انجام دهید.",
    },
    metadata: {
      "": [
        "ویرا دیتا",
        "راهکارهای داده، هوش مصنوعی و خودکارسازی برای مسئله‌های واقعی کسب‌وکار؛ از شناخت مسئله تا اجرای قابل بررسی.",
      ],
      solutions: [
        "راهکارهای داده و هوش مصنوعی | ویرا دیتا",
        "دستیار سازمانی، تحلیل داده و داشبورد، تصمیم‌یار و خودکارسازی متناسب با نیاز و داده سازمان.",
      ],
      demos: [
        "دموهای ویرا دیتا",
        "نمونه‌های نمایشی داشبورد هوشمند و دستیار هوش مصنوعی با داده ساختگی و وضعیت اجرای مشخص.",
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
      back: "Back to home",
      missing: "We couldn't find that page.",
      menu: "Open menu",
      close: "Close menu",
      pause: "Pause motion",
      play: "Resume motion",
      footer:
        "ViraData designs and builds data and AI solutions for real business problems.",
      contactSoon: "Email contact will be available here soon.",
      sample: "Conceptual visual with synthetic data",
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
      familiesLabel: "What we build",
      families: [
        {
          title: "Enterprise AI assistants",
          body: "Find and use organizational knowledge with traceable answers and appropriate access controls.",
          cta: "Explore assistants",
        },
        {
          title: "Analytics and management dashboards",
          body: "Defined metrics, inspectable reports, and a clear path from each number to its detail.",
          cta: "Explore analytics",
        },
        {
          title: "Decision support and automation",
          body: "Analysis, forecasting, or simpler repetitive workflows where the problem and data make them useful.",
          cta: "Explore solutions",
        },
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
      demosBody:
        "These demonstrations show how people can work with data and AI. They use synthetic data and do not replace an assessment of your organization.",
      demosCta: "Explore demos",
      closeTitle: "Where does your challenge begin?",
      closeBody:
        "You don't need to choose a technology first. Tell us about the work, the information available, and the outcome you're aiming for.",
      closeCta: "Start a conversation",
    },
    solutions: {
      title: "Solutions shaped by your problem, data, and workflow.",
      lead: "ViraData does not prescribe one product for every organization. A solution may combine analytics, an AI assistant, decision support, or automation. We define the scope after understanding the problem.",
      labels: ["Example uses", "What we need to begin", "Reviewable output"],
      items: [
        {
          id: "assistants",
          title: "Enterprise AI assistants",
          intro:
            "When answers are scattered across documents and systems, an assistant can make knowledge easier to find and use. Answers should point to relevant sources and acknowledge when the evidence is insufficient.",
          examples:
            "Searching permitted procedures and contracts; guiding staff through workflows; asking about defined metrics.",
          inputs:
            "Approved sources, access levels, example questions, and evaluation criteria.",
          output:
            "Allowed scenarios, an assistant interface, source references, and an answer evaluation report.",
          cta: "Discuss an enterprise assistant.",
        },
        {
          id: "analytics",
          title: "Analytics and dashboards",
          intro:
            "A useful report is more than an attractive chart. People need to know what a metric means, where its numbers come from, and how to investigate a change.",
          examples:
            "Sales and procurement reporting; cost and profitability tracking; customer and performance analysis; comparisons across periods or groups.",
          inputs:
            "Source data, metric definitions, periods and detail levels, users, and the decisions the report supports.",
          output:
            "Metric definitions, an interactive report, drill-down paths, and reconciled calculations.",
          cta: "Discuss a dashboard.",
        },
        {
          id: "decisions",
          title: "Decision support and automation",
          intro:
            "Some decisions benefit from scenarios, forecasts, or prioritization. Other workflows improve when repeated entry and manual handoffs are reduced. The right approach depends on data, the cost of errors, and how people will use it.",
          examples:
            "Demand forecasting when suitable history exists; procurement and supply scenarios; alerts for meaningful changes; automation of well-defined workflow steps.",
          inputs:
            "Historical data and quality, business rules, decision constraints, and a baseline for comparison.",
          output:
            "A tested model or rule, explicit assumptions and limits, a user workflow, and a way to monitor outcomes.",
          cta: "Discuss a decision challenge.",
        },
      ],
      closing:
        "Deployment on customer infrastructure or use of an external service is assessed for each project with the customer's agreement. Service costs, confidentiality, and access are defined in the project scope.",
    },
    demos: {
      title: "Demonstrations of how a solution could work.",
      lead: "These demos use synthetic data and sample sources. They illustrate the scenarios shown here; results for a real project depend on the customer's data and workflow.",
      promptLabel: "Sample request",
      limitation: "Status and scope",
      dashboard: {
        title: "Intelligent dashboard",
        summary:
          "A request such as “Show procurement for the last three months by region” becomes a structured report. Users can inspect filters, metrics, charts, and the rows behind each figure. Finance, sales, and procurement views come from a coherent sample dataset, with calculations behind each insight.",
        prompts: [
          "Show this month's sales by product",
          "Compare procurement costs with the previous period",
          "Show revenue, cost, and profit, and highlight important changes",
        ],
        limits:
          "This preview uses synthetic data and predefined views. It has no free-text interpretation, AI, or database connection; the full demo is in preparation.",
      },
      assistant: {
        title: "AI assistant",
        summary:
          "An example of question answering over approved organizational sources. The intended interaction includes source references, follow-up questions, and a clear response when the answer is unknown. Enable a live launch only after the demo has been built and tested.",
        prompts: [
          "What are the purchase request approval steps, and which document supports the answer?",
        ],
        limits:
          "This scenario is not connected to real organizational sources yet.",
      },
      note: "Demo data and sources are synthetic. The future demos must also show the sample-data label inside the experience.",
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
      team: "ViraData operates as an executive consulting practice. Arash Kazemi leads the technical work, and Armin Farhadi handles the financial and commercial side.",
      cta: "Tell us about your challenge.",
    },
    contact: {
      title: "Let's start with your challenge.",
      lead: "Tell us about your business, current challenge, and the outcome you want. If you have not chosen a solution, describing the problem is a good start.",
      unavailable:
        "Email contact will be available here soon. Until delivery is verified, requests are not stored or sent from this page.",
      labels: {
        name: "Full name",
        email: "Email",
        organization: "Organization or business",
        area: "Area of interest",
        message: "Describe your challenge or idea",
      },
      options: [
        "AI assistant",
        "Analytics and dashboards",
        "Decision support and automation",
        "I'm not sure yet",
      ],
      privacy:
        "Please do not include confidential information or sensitive personal data in this initial message.",
      validation: {
        name: "Enter your full name.",
        nameLength: "Use at least two characters for your name.",
        email: "Enter a valid email address.",
        message: "Describe your challenge or idea.",
        messageLength: "Use at least twelve characters for your message.",
      },
      prepare: "Prepare email",
      emailHint: "This opens your email app; complete the send there.",
    },
    metadata: {
      "": [
        "ViraData",
        "Data, AI, and automation solutions for real business problems, from discovery to reviewable delivery.",
      ],
      solutions: [
        "Data & AI Solutions | ViraData",
        "Explore enterprise assistants, analytics, decision support, and automation tailored to your organization.",
      ],
      demos: [
        "ViraData Demos",
        "Explore sample-data demonstrations of an intelligent dashboard and AI assistant, with clear availability status.",
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
