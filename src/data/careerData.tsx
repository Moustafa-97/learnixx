import { Career } from "@/types/career"

export const careerData: Career[] = [
  {
    id: 1,
    label: {
      en: "Web Development",
      ar: "تطوير الويب",
    },
    icon: "🌐",
    content: [
      {
        id: 1,
        title: {
          en: "Full Stack Web Development with React & Node.js",
          ar: "تطوير الويب الكامل باستخدام React و Node.js",
        },
        description: {
          en: "Master modern web development by building full-stack applications using React, Node.js, Express, and MongoDB",
          ar: "أتقن تطوير الويب الحديث من خلال بناء تطبيقات كاملة باستخدام React و Node.js و Express و MongoDB",
        },
        icon: "⚛️",
        tags: {
          en: ["React", "Node.js", "MongoDB", "Express", "Full Stack"],
          ar: ["React", "Node.js", "MongoDB", "Express", "تطوير شامل"],
        },
        brouchureLink: "/brochures/fullstack-react-node.pdf",
        whyAttend: [
          {
            id: 1,
            title: {
              en: "High Demand Skills",
              ar: "مهارات عالية الطلب",
            },
            description: {
              en: "React and Node.js are among the most sought-after technologies in the job market",
              ar: "React و Node.js من أكثر التقنيات المطلوبة في سوق العمل",
            },
          },
          {
            id: 2,
            title: {
              en: "Complete Project Portfolio",
              ar: "محفظة مشاريع كاملة",
            },
            description: {
              en: "Build 5+ production-ready projects for your portfolio",
              ar: "قم ببناء أكثر من 5 مشاريع جاهزة للإنتاج لمحفظتك",
            },
          },
          {
            id: 3,
            title: {
              en: "Industry Best Practices",
              ar: "أفضل الممارسات الصناعية",
            },
            description: {
              en: "Learn testing, CI/CD, and deployment strategies used by top companies",
              ar: "تعلم استراتيجيات الاختبار والنشر المستمر المستخدمة في كبرى الشركات",
            },
          },
        ],
        trainers: [
          {
            id: 1,
            name: {
              en: "Sarah Chen",
              ar: "سارة تشين",
            },
            title: {
              en: "Senior Full Stack Developer",
              ar: "مطور متكامل أول",
            },
            image: "/images/trainers/sarah-chen.jpg",
            description: {
              en: "10+ years experience at Facebook and Airbnb",
              ar: "خبرة أكثر من 10 سنوات في فيسبوك و Airbnb",
            },
            socialLinks: {
              linkedin: "linkedin.com/in/sarahchen",
              twitter: "@sarahchen_dev",
              github: "github.com/sarahchen",
            },
          },
        ],
        courseContent: [
          {
            id: 1,
            unit: 1,
            title: {
              en: "React Fundamentals",
              ar: "أساسيات React",
            },
            description: {
              en: "Components, Props, State, Hooks, and React Router",
              ar: "المكونات والخصائص والحالة والخطافات وموجه React",
            },
          },
          {
            id: 2,
            unit: 2,
            title: {
              en: "Advanced React Patterns",
              ar: "أنماط React المتقدمة",
            },
            description: {
              en: "Context API, Custom Hooks, Performance Optimization",
              ar: "واجهة برمجة السياق والخطافات المخصصة وتحسين الأداء",
            },
          },
          {
            id: 3,
            unit: 3,
            title: {
              en: "Node.js & Express Backend",
              ar: "الواجهة الخلفية Node.js و Express",
            },
            description: {
              en: "RESTful APIs, Middleware, Authentication & Authorization",
              ar: "واجهات برمجة REST والبرمجيات الوسطى والمصادقة والتخويل",
            },
          },
          {
            id: 4,
            unit: 4,
            title: {
              en: "Database Design with MongoDB",
              ar: "تصميم قواعد البيانات مع MongoDB",
            },
            description: {
              en: "Schema design, Mongoose ODM, Aggregation pipelines",
              ar: "تصميم المخطط و Mongoose ODM وخطوط التجميع",
            },
          },
        ],
      },
      {
        id: 2,
        title: {
          en: "Modern Frontend Development with Vue.js",
          ar: "تطوير الواجهات الأمامية الحديثة مع Vue.js",
        },
        description: {
          en: "Build reactive web applications with Vue.js 3, Vuex, and the Composition API",
          ar: "بناء تطبيقات ويب تفاعلية باستخدام Vue.js 3 و Vuex و Composition API",
        },
        icon: "💚",
        tags: {
          en: ["Vue.js", "JavaScript", "Vuex", "Composition API"],
          ar: ["Vue.js", "جافاسكريبت", "Vuex", "Composition API"],
        },
        brouchureLink: "/brochures/vue-frontend.pdf",
        whyAttend: [
          {
            id: 1,
            title: {
              en: "Gentle Learning Curve",
              ar: "منحنى تعلم سلس",
            },
            description: {
              en: "Vue.js is known for being beginner-friendly while powerful",
              ar: "Vue.js معروف بكونه سهل للمبتدئين وقوي في نفس الوقت",
            },
          },
          {
            id: 2,
            title: {
              en: "Growing Ecosystem",
              ar: "نظام بيئي متنامي",
            },
            description: {
              en: "Join the rapidly expanding Vue.js community and job market",
              ar: "انضم إلى مجتمع Vue.js المتنامي بسرعة وسوق العمل",
            },
          },
        ],
        trainers: [
          {
            id: 2,
            name: {
              en: "Lucas Martinez",
              ar: "لوكاس مارتينيز",
            },
            title: {
              en: "Vue.js Core Team Member",
              ar: "عضو الفريق الأساسي لـ Vue.js",
            },
            image: "/images/trainers/lucas-martinez.jpg",
            description: {
              en: "Contributing to Vue.js since v2.0",
              ar: "مساهم في Vue.js منذ الإصدار 2.0",
            },
            socialLinks: {
              github: "github.com/lucasmartinez",
              twitter: "@lucas_vue",
            },
          },
        ],
        courseContent: [
          {
            id: 1,
            unit: 1,
            title: {
              en: "Vue.js Basics",
              ar: "أساسيات Vue.js",
            },
            description: {
              en: "Template syntax, Reactivity, Components",
              ar: "صيغة القوالب والتفاعلية والمكونات",
            },
          },
          {
            id: 2,
            unit: 2,
            title: {
              en: "Composition API Deep Dive",
              ar: "التعمق في Composition API",
            },
            description: {
              en: "Setup function, Composables, TypeScript integration",
              ar: "وظيفة الإعداد والمكونات القابلة للتركيب وتكامل TypeScript",
            },
          },
          {
            id: 3,
            unit: 3,
            title: {
              en: "State Management",
              ar: "إدارة الحالة",
            },
            description: {
              en: "Vuex patterns, Pinia, Global state handling",
              ar: "أنماط Vuex و Pinia وإدارة الحالة العامة",
            },
          },
        ],
      },
      {
        id: 3,
        title: {
          en: "JAMstack Development",
          ar: "تطوير JAMstack",
        },
        description: {
          en: "Build blazing-fast websites with JavaScript, APIs, and Markup using Next.js and Gatsby",
          ar: "بناء مواقع ويب فائقة السرعة باستخدام JavaScript وواجهات برمجة التطبيقات والترميز مع Next.js و Gatsby",
        },
        icon: "⚡",
        tags: {
          en: ["JAMstack", "Next.js", "Gatsby", "Static Sites", "Headless CMS"],
          ar: [
            "JAMstack",
            "Next.js",
            "Gatsby",
            "مواقع ثابتة",
            "نظام إدارة محتوى مقطوع الرأس",
          ],
        },
        brouchureLink: "/brochures/jamstack.pdf",
        whyAttend: [
          {
            id: 1,
            title: {
              en: "Performance First",
              ar: "الأداء أولاً",
            },
            description: {
              en: "Create websites that load instantly and rank high on Google",
              ar: "إنشاء مواقع تحمل فوراً وتحتل مرتبة عالية على Google",
            },
          },
          {
            id: 2,
            title: {
              en: "Modern Architecture",
              ar: "هندسة حديثة",
            },
            description: {
              en: "Learn the architecture powering sites like Netflix and Hulu",
              ar: "تعلم الهندسة التي تشغل مواقع مثل Netflix و Hulu",
            },
          },
        ],
        trainers: [
          {
            id: 3,
            name: {
              en: "Emily Thompson",
              ar: "إميلي طومسون",
            },
            title: {
              en: "JAMstack Architect",
              ar: "مهندس JAMstack",
            },
            image: "/images/trainers/emily-thompson.jpg",
            description: {
              en: "Built JAMstack solutions for major e-commerce brands",
              ar: "بنت حلول JAMstack لعلامات التجارة الإلكترونية الكبرى",
            },
          },
        ],
        courseContent: [
          {
            id: 1,
            unit: 1,
            title: {
              en: "JAMstack Fundamentals",
              ar: "أساسيات JAMstack",
            },
            description: {
              en: "Static site generation, CDN deployment, API integration",
              ar: "توليد المواقع الثابتة ونشر CDN وتكامل API",
            },
          },
          {
            id: 2,
            unit: 2,
            title: {
              en: "Next.js Mastery",
              ar: "إتقان Next.js",
            },
            description: {
              en: "SSG, SSR, ISR, API routes, Image optimization",
              ar: "SSG و SSR و ISR ومسارات API وتحسين الصور",
            },
          },
          {
            id: 3,
            unit: 3,
            title: {
              en: "Headless CMS Integration",
              ar: "تكامل نظام إدارة المحتوى مقطوع الرأس",
            },
            description: {
              en: "Contentful, Strapi, Sanity implementation",
              ar: "تنفيذ Contentful و Strapi و Sanity",
            },
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: {
      en: "Mobile Development",
      ar: "تطوير تطبيقات الجوال",
    },
    icon: "📱",
    content: [
      {
        id: 4,
        title: {
          en: "React Native Cross-Platform Development",
          ar: "تطوير متعدد المنصات باستخدام React Native",
        },
        description: {
          en: "Build native mobile apps for iOS and Android using React Native and Expo",
          ar: "بناء تطبيقات جوال أصلية لنظامي iOS و Android باستخدام React Native و Expo",
        },
        icon: "📲",
        tags: {
          en: ["React Native", "Mobile", "iOS", "Android", "Expo"],
          ar: ["React Native", "موبايل", "iOS", "Android", "Expo"],
        },
        brouchureLink: "/brochures/react-native.pdf",
        whyAttend: [
          {
            id: 1,
            title: {
              en: "Write Once, Deploy Everywhere",
              ar: "اكتب مرة واحدة، انشر في كل مكان",
            },
            description: {
              en: "Single codebase for both iOS and Android platforms",
              ar: "قاعدة كود واحدة لمنصتي iOS و Android",
            },
          },
          {
            id: 2,
            title: {
              en: "Native Performance",
              ar: "أداء أصلي",
            },
            description: {
              en: "Build apps that feel truly native with platform-specific UI",
              ar: "بناء تطبيقات تبدو أصلية حقاً مع واجهة مستخدم خاصة بكل منصة",
            },
          },
          {
            id: 3,
            title: {
              en: "Hot Reload Development",
              ar: "تطوير بإعادة التحميل الساخن",
            },
            description: {
              en: "See changes instantly without rebuilding the entire app",
              ar: "شاهد التغييرات فوراً دون إعادة بناء التطبيق بالكامل",
            },
          },
        ],
        trainers: [
          {
            id: 4,
            name: {
              en: "Alex Kumar",
              ar: "أليكس كومار",
            },
            title: {
              en: "Senior Mobile Developer",
              ar: "مطور تطبيقات جوال أول",
            },
            image: "/images/trainers/alex-kumar.jpg",
            description: {
              en: "Published 20+ apps on App Store and Google Play",
              ar: "نشر أكثر من 20 تطبيقاً على متجر التطبيقات و Google Play",
            },
            socialLinks: {
              linkedin: "linkedin.com/in/alexkumar",
              github: "github.com/alexkumar",
            },
          },
        ],
        courseContent: [
          {
            id: 1,
            unit: 1,
            title: {
              en: "React Native Fundamentals",
              ar: "أساسيات React Native",
            },
            description: {
              en: "Components, Styling, Navigation, Platform-specific code",
              ar: "المكونات والتنسيق والتنقل والكود الخاص بالمنصة",
            },
          },
          {
            id: 2,
            unit: 2,
            title: {
              en: "Native Features Integration",
              ar: "تكامل الميزات الأصلية",
            },
            description: {
              en: "Camera, GPS, Push notifications, Device storage",
              ar: "الكاميرا و GPS والإشعارات الفورية وتخزين الجهاز",
            },
          },
          {
            id: 3,
            unit: 3,
            title: {
              en: "App Deployment",
              ar: "نشر التطبيق",
            },
            description: {
              en: "App Store submission, Google Play publishing, OTA updates",
              ar: "إرسال لمتجر التطبيقات ونشر Google Play وتحديثات OTA",
            },
          },
          {
            id: 4,
            unit: 4,
            title: {
              en: "Performance Optimization",
              ar: "تحسين الأداء",
            },
            description: {
              en: "Memory management, Bundle size reduction, Native modules",
              ar: "إدارة الذاكرة وتقليل حجم الحزمة والوحدات الأصلية",
            },
          },
        ],
      },
      {
        id: 5,
        title: {
          en: "Flutter for Enterprise Apps",
          ar: "Flutter لتطبيقات المؤسسات",
        },
        description: {
          en: "Master Google's Flutter framework to build beautiful, natively compiled applications",
          ar: "أتقن إطار عمل Flutter من Google لبناء تطبيقات جميلة ومجمعة أصلياً",
        },
        icon: "🦋",
        tags: {
          en: ["Flutter", "Dart", "Material Design", "Cross-platform"],
          ar: ["Flutter", "Dart", "تصميم متيريال", "متعدد المنصات"],
        },
        brouchureLink: "/brochures/flutter-enterprise.pdf",
        whyAttend: [
          {
            id: 1,
            title: {
              en: "Single Codebase, Multiple Platforms",
              ar: "قاعدة كود واحدة، منصات متعددة",
            },
            description: {
              en: "Deploy to iOS, Android, Web, and Desktop from one codebase",
              ar: "انشر على iOS و Android والويب وسطح المكتب من قاعدة كود واحدة",
            },
          },
          {
            id: 2,
            title: {
              en: "Beautiful UI Out of the Box",
              ar: "واجهة مستخدم جميلة جاهزة",
            },
            description: {
              en: "Rich set of customizable widgets following Material Design",
              ar: "مجموعة غنية من الأدوات القابلة للتخصيص تتبع تصميم المواد",
            },
          },
        ],
        trainers: [
          {
            id: 5,
            name: {
              en: "Priya Patel",
              ar: "بريا باتيل",
            },
            title: {
              en: "Flutter GDE (Google Developer Expert)",
              ar: "خبير مطوري Google في Flutter",
            },
            image: "/images/trainers/priya-patel.jpg",
            description: {
              en: "Flutter trainer and conference speaker",
              ar: "مدربة Flutter ومتحدثة في المؤتمرات",
            },
            socialLinks: {
              twitter: "@priya_flutter",
              linkedin: "linkedin.com/in/priyapatel",
            },
          },
        ],
        courseContent: [
          {
            id: 1,
            unit: 1,
            title: {
              en: "Dart Programming & Flutter Basics",
              ar: "برمجة Dart وأساسيات Flutter",
            },
            description: {
              en: "Dart fundamentals, Widget tree, State management basics",
              ar: "أساسيات Dart وشجرة الأدوات وأساسيات إدارة الحالة",
            },
          },
          {
            id: 2,
            unit: 2,
            title: {
              en: "Advanced State Management",
              ar: "إدارة الحالة المتقدمة",
            },
            description: {
              en: "Provider, Riverpod, BLoC pattern implementation",
              ar: "تنفيذ Provider و Riverpod ونمط BLoC",
            },
          },
          {
            id: 3,
            unit: 3,
            title: {
              en: "Enterprise Features",
              ar: "ميزات المؤسسات",
            },
            description: {
              en: "Authentication, Real-time sync, Offline storage",
              ar: "المصادقة والمزامنة في الوقت الفعلي والتخزين دون اتصال",
            },
          },
        ],
      },
    ],
  },
  {
    id: 3,
    label: {
      en: "Cloud & DevOps",
      ar: "السحابة و DevOps",
    },
    icon: "☁️",
    content: [
      {
        id: 6,
        title: {
          en: "AWS Solutions Architect Professional",
          ar: "مهندس حلول AWS المحترف",
        },
        description: {
          en: "Design and deploy scalable, highly available systems on AWS cloud",
          ar: "تصميم ونشر أنظمة قابلة للتوسع وعالية التوفر على سحابة AWS",
        },
        icon: "🏗️",
        tags: {
          en: [
            "AWS",
            "Cloud Architecture",
            "Solutions Design",
            "Certification",
          ],
          ar: ["AWS", "هندسة السحابة", "تصميم الحلول", "الشهادة"],
        },
        brouchureLink: "/brochures/aws-architect.pdf",
        whyAttend: [
          {
            id: 1,
            title: {
              en: "Industry-Recognized Certification",
              ar: "شهادة معترف بها في الصناعة",
            },
            description: {
              en: "Prepare for AWS Solutions Architect certification exam",
              ar: "الاستعداد لامتحان شهادة مهندس حلول AWS",
            },
          },
          {
            id: 2,
            title: {
              en: "Hands-on Labs",
              ar: "مختبرات عملية",
            },
            description: {
              en: "Practice with real AWS environments and enterprise scenarios",
              ar: "الممارسة مع بيئات AWS الحقيقية وسيناريوهات المؤسسات",
            },
          },
        ],
        trainers: [
          {
            id: 6,
            name: {
              en: "Michael Chen",
              ar: "مايكل تشين",
            },
            title: {
              en: "AWS Principal Solutions Architect",
              ar: "مهندس حلول AWS الرئيسي",
            },
            image: "/images/trainers/michael-chen.jpg",
            description: {
              en: "15 years experience designing cloud solutions",
              ar: "15 عاماً من الخبرة في تصميم الحلول السحابية",
            },
            socialLinks: {
              linkedin: "linkedin.com/in/michaelchen-aws",
            },
          },
        ],
        courseContent: [
          {
            id: 1,
            unit: 1,
            title: {
              en: "AWS Core Services",
              ar: "خدمات AWS الأساسية",
            },
            description: {
              en: "EC2, S3, VPC, RDS, Lambda fundamentals",
              ar: "أساسيات EC2 و S3 و VPC و RDS و Lambda",
            },
          },
          {
            id: 2,
            unit: 2,
            title: {
              en: "High Availability & Scalability",
              ar: "التوفر العالي والقابلية للتوسع",
            },
            description: {
              en: "Load balancing, Auto-scaling, Multi-region deployments",
              ar: "موازنة الحمل والتوسع التلقائي والنشر متعدد المناطق",
            },
          },
          {
            id: 3,
            unit: 3,
            title: {
              en: "Security & Compliance",
              ar: "الأمان والامتثال",
            },
            description: {
              en: "IAM, KMS, Security best practices, Compliance frameworks",
              ar: "IAM و KMS وأفضل ممارسات الأمان وأطر الامتثال",
            },
          },
          {
            id: 4,
            unit: 4,
            title: {
              en: "Cost Optimization",
              ar: "تحسين التكاليف",
            },
            description: {
              en: "Reserved instances, Spot instances, Cost monitoring",
              ar: "المثيلات المحجوزة والمثيلات الفورية ومراقبة التكاليف",
            },
          },
        ],
      },
      {
        id: 7,
        title: {
          en: "Kubernetes for Production",
          ar: "Kubernetes للإنتاج",
        },
        description: {
          en: "Master container orchestration with Kubernetes for enterprise deployments",
          ar: "أتقن تنسيق الحاويات مع Kubernetes للنشر المؤسسي",
        },
        icon: "🎯",
        tags: {
          en: ["Kubernetes", "Docker", "Container Orchestration", "DevOps"],
          ar: ["Kubernetes", "Docker", "تنسيق الحاويات", "DevOps"],
        },
        brouchureLink: "/brochures/kubernetes-production.pdf",
        whyAttend: [
          {
            id: 1,
            title: {
              en: "Industry Standard",
              ar: "معيار الصناعة",
            },
            description: {
              en: "Kubernetes powers 90% of cloud-native applications",
              ar: "Kubernetes يشغل 90% من التطبيقات السحابية الأصلية",
            },
          },
          {
            id: 2,
            title: {
              en: "Career Advancement",
              ar: "التقدم الوظيفي",
            },
            description: {
              en: "K8s skills command premium salaries in DevOps roles",
              ar: "مهارات K8s تحقق رواتب ممتازة في أدوار DevOps",
            },
          },
        ],
        trainers: [
          {
            id: 7,
            name: {
              en: "David Rodriguez",
              ar: "ديفيد رودريغيز",
            },
            title: {
              en: "CNCF Ambassador",
              ar: "سفير CNCF",
            },
            image: "/images/trainers/david-rodriguez.jpg",
            description: {
              en: "Kubernetes contributor and certified trainer",
              ar: "مساهم في Kubernetes ومدرب معتمد",
            },
            socialLinks: {
              github: "github.com/drodriguez",
              twitter: "@drodriguez_k8s",
            },
          },
        ],
        courseContent: [
          {
            id: 1,
            unit: 1,
            title: {
              en: "Kubernetes Architecture",
              ar: "هندسة Kubernetes",
            },
            description: {
              en: "Pods, Services, Deployments, ConfigMaps, Secrets",
              ar: "Pods والخدمات والنشر و ConfigMaps والأسرار",
            },
          },
          {
            id: 2,
            unit: 2,
            title: {
              en: "Advanced Workloads",
              ar: "أحمال العمل المتقدمة",
            },
            description: {
              en: "StatefulSets, DaemonSets, Jobs, CronJobs",
              ar: "StatefulSets و DaemonSets والوظائف و CronJobs",
            },
          },
          {
            id: 3,
            unit: 3,
            title: {
              en: "Production Best Practices",
              ar: "أفضل ممارسات الإنتاج",
            },
            description: {
              en: "Monitoring, Logging, Security, RBAC, Network policies",
              ar: "المراقبة والتسجيل والأمان و RBAC وسياسات الشبكة",
            },
          },
        ],
      },
      {
        id: 8,
        title: {
          en: "CI/CD Pipeline Mastery",
          ar: "إتقان خطوط CI/CD",
        },
        description: {
          en: "Build automated deployment pipelines with Jenkins, GitLab CI, and GitHub Actions",
          ar: "بناء خطوط نشر آلية باستخدام Jenkins و GitLab CI و GitHub Actions",
        },
        icon: "🔄",
        tags: {
          en: ["CI/CD", "Jenkins", "GitLab", "GitHub Actions", "Automation"],
          ar: ["CI/CD", "Jenkins", "GitLab", "GitHub Actions", "الأتمتة"],
        },
        brouchureLink: "/brochures/cicd-mastery.pdf",
        whyAttend: [
          {
            id: 1,
            title: {
              en: "Accelerate Delivery",
              ar: "تسريع التسليم",
            },
            description: {
              en: "Deploy code changes safely and quickly to production",
              ar: "نشر تغييرات الكود بأمان وسرعة إلى الإنتاج",
            },
          },
          {
            id: 2,
            title: {
              en: "DevOps Culture",
              ar: "ثقافة DevOps",
            },
            description: {
              en: "Bridge the gap between development and operations teams",
              ar: "سد الفجوة بين فرق التطوير والعمليات",
            },
          },
        ],
        trainers: [
          {
            id: 8,
            name: {
              en: "Jennifer Park",
              ar: "جينيفر بارك",
            },
            title: {
              en: "DevOps Engineer Lead",
              ar: "قائد مهندسي DevOps",
            },
            image: "/images/trainers/jennifer-park.jpg",
            description: {
              en: "Implemented CI/CD at scale for Fortune 500 companies",
              ar: "نفذت CI/CD على نطاق واسع لشركات Fortune 500",
            },
            socialLinks: {
              linkedin: "linkedin.com/in/jenniferpark",
            },
          },
        ],
        courseContent: [
          {
            id: 1,
            unit: 1,
            title: {
              en: "CI/CD Fundamentals",
              ar: "أساسيات CI/CD",
            },
            description: {
              en: "Version control, Build automation, Testing strategies",
              ar: "التحكم في الإصدار وأتمتة البناء واستراتيجيات الاختبار",
            },
          },
          {
            id: 2,
            unit: 2,
            title: {
              en: "Pipeline as Code",
              ar: "خط الأنابيب كرمز",
            },
            description: {
              en: "Jenkinsfile, GitLab CI YAML, GitHub Actions workflows",
              ar: "Jenkinsfile و GitLab CI YAML وسير عمل GitHub Actions",
            },
          },
          {
            id: 3,
            unit: 3,
            title: {
              en: "Advanced Deployment Strategies",
              ar: "استراتيجيات النشر المتقدمة",
            },
            description: {
              en: "Blue-Green, Canary, Feature flags, Rollback mechanisms",
              ar: "Blue-Green و Canary وعلامات الميزات وآليات التراجع",
            },
          },
        ],
      },
    ],
  },
  {
    id: 4,
    label: {
      en: "Data Science & AI",
      ar: "علم البيانات والذكاء الاصطناعي",
    },
    icon: "🤖",
    content: [
      {
        id: 9,
        title: {
          en: "Machine Learning Engineering",
          ar: "هندسة التعلم الآلي",
        },
        description: {
          en: "Build and deploy production-ready ML models from scratch to scale",
          ar: "بناء ونشر نماذج التعلم الآلي الجاهزة للإنتاج من الصفر إلى النطاق",
        },
        icon: "🧠",
        tags: {
          en: ["Python", "TensorFlow", "Scikit-learn", "MLOps"],
          ar: ["Python", "TensorFlow", "Scikit-learn", "MLOps"],
        },
        brouchureLink: "/brochures/ml-engineering.pdf",
        whyAttend: [
          {
            id: 1,
            title: {
              en: "High-Demand Skills",
              ar: "مهارات عالية الطلب",
            },
            description: {
              en: "ML Engineers are among the highest paid tech professionals",
              ar: "مهندسو التعلم الآلي من بين أعلى المحترفين التقنيين أجراً",
            },
          },
          {
            id: 2,
            title: {
              en: "End-to-End Pipeline",
              ar: "خط أنابيب شامل",
            },
            description: {
              en: "Learn the complete ML lifecycle from data to deployment",
              ar: "تعلم دورة حياة التعلم الآلي الكاملة من البيانات إلى النشر",
            },
          },
          {
            id: 3,
            title: {
              en: "Real-World Projects",
              ar: "مشاريع واقعية",
            },
            description: {
              en: "Work with actual datasets from industry partners",
              ar: "العمل مع مجموعات بيانات فعلية من شركاء الصناعة",
            },
          },
        ],
        trainers: [
          {
            id: 9,
            name: {
              en: "Dr. Rachel Green",
              ar: "د. راشيل جرين",
            },
            title: {
              en: "ML Research Scientist",
              ar: "عالمة أبحاث التعلم الآلي",
            },
            image: "/images/trainers/rachel-green.jpg",
            description: {
              en: "PhD from MIT, Published 30+ ML papers",
              ar: "دكتوراه من MIT، نشرت أكثر من 30 ورقة في التعلم الآلي",
            },
            socialLinks: {
              linkedin: "linkedin.com/in/rachelgreen-ml",
              github: "github.com/rgreen-ml",
            },
          },
        ],
        courseContent: [
          {
            id: 1,
            unit: 1,
            title: {
              en: "ML Fundamentals",
              ar: "أساسيات التعلم الآلي",
            },
            description: {
              en: "Supervised/Unsupervised learning, Feature engineering",
              ar: "التعلم المراقب/غير المراقب، هندسة الميزات",
            },
          },
          {
            id: 2,
            unit: 2,
            title: {
              en: "Deep Learning",
              ar: "التعلم العميق",
            },
            description: {
              en: "Neural networks, CNNs, RNNs, Transformers",
              ar: "الشبكات العصبية و CNNs و RNNs و Transformers",
            },
          },
          {
            id: 3,
            unit: 3,
            title: {
              en: "MLOps & Deployment",
              ar: "MLOps والنشر",
            },
            description: {
              en: "Model versioning, A/B testing, Monitoring, Cloud deployment",
              ar: "إصدار النماذج واختبار A/B والمراقبة والنشر السحابي",
            },
          },
          {
            id: 4,
            unit: 4,
            title: {
              en: "Specialized Domains",
              ar: "المجالات المتخصصة",
            },
            description: {
              en: "NLP, Computer Vision, Time series forecasting",
              ar: "معالجة اللغة الطبيعية والرؤية الحاسوبية والتنبؤ بالسلاسل الزمنية",
            },
          },
        ],
      },
      {
        id: 10,
        title: {
          en: "Data Engineering with Big Data",
          ar: "هندسة البيانات مع البيانات الضخمة",
        },
        description: {
          en: "Design and build scalable data pipelines using Apache Spark, Kafka, and cloud platforms",
          ar: "تصميم وبناء خطوط بيانات قابلة للتوسع باستخدام Apache Spark و Kafka والمنصات السحابية",
        },
        icon: "📊",
        tags: {
          en: ["Apache Spark", "Kafka", "Airflow", "Data Pipelines", "ETL"],
          ar: ["Apache Spark", "Kafka", "Airflow", "خطوط البيانات", "ETL"],
        },
        brouchureLink: "/brochures/data-engineering.pdf",
        whyAttend: [
          {
            id: 1,
            title: {
              en: "Foundation for AI/ML",
              ar: "الأساس للذكاء الاصطناعي/التعلم الآلي",
            },
            description: {
              en: "Data engineering is crucial for successful AI implementations",
              ar: "هندسة البيانات ضرورية لتطبيقات الذكاء الاصطناعي الناجحة",
            },
          },
          {
            id: 2,
            title: {
              en: "Handle Big Data",
              ar: "التعامل مع البيانات الضخمة",
            },
            description: {
              en: "Process terabytes of data efficiently with distributed systems",
              ar: "معالجة تيرابايتات من البيانات بكفاءة مع الأنظمة الموزعة",
            },
          },
        ],
        trainers: [
          {
            id: 10,
            name: {
              en: "Samuel Jackson",
              ar: "صامويل جاكسون",
            },
            title: {
              en: "Principal Data Engineer",
              ar: "مهندس بيانات رئيسي",
            },
            image: "/images/trainers/samuel-jackson.jpg",
            description: {
              en: "Built data platforms at Netflix and Uber",
              ar: "بنى منصات البيانات في Netflix و Uber",
            },
            socialLinks: {
              linkedin: "linkedin.com/in/sjackson-data",
            },
          },
        ],
        courseContent: [
          {
            id: 1,
            unit: 1,
            title: {
              en: "Data Pipeline Architecture",
              ar: "هندسة خطوط البيانات",
            },
            description: {
              en: "Batch vs Stream processing, Lambda architecture",
              ar: "معالجة الدفعات مقابل التدفق، هندسة Lambda",
            },
          },
          {
            id: 2,
            unit: 2,
            title: {
              en: "Apache Spark Mastery",
              ar: "إتقان Apache Spark",
            },
            description: {
              en: "RDDs, DataFrames, Spark SQL, Performance tuning",
              ar: "RDDs و DataFrames و Spark SQL وضبط الأداء",
            },
          },
          {
            id: 3,
            unit: 3,
            title: {
              en: "Real-time Processing",
              ar: "المعالجة في الوقت الفعلي",
            },
            description: {
              en: "Kafka streams, Event sourcing, CQRS patterns",
              ar: "تدفقات Kafka ومصادر الأحداث وأنماط CQRS",
            },
          },
        ],
      },
    ],
  },
  {
    id: 5,
    label: {
      en: "Cybersecurity",
      ar: "الأمن السيبراني",
    },
    icon: "🔒",
    content: [
      {
        id: 11,
        title: {
          en: "Ethical Hacking & Penetration Testing",
          ar: "القرصنة الأخلاقية واختبار الاختراق",
        },
        description: {
          en: "Learn offensive security techniques to identify and fix vulnerabilities",
          ar: "تعلم تقنيات الأمن الهجومي لتحديد وإصلاح الثغرات",
        },
        icon: "🛡️",
        tags: {
          en: ["Penetration Testing", "Kali Linux", "OWASP", "Security"],
          ar: ["اختبار الاختراق", "Kali Linux", "OWASP", "الأمان"],
        },
        brouchureLink: "/brochures/ethical-hacking.pdf",
        whyAttend: [
          {
            id: 1,
            title: {
              en: "Growing Security Threats",
              ar: "تهديدات أمنية متزايدة",
            },
            description: {
              en: "Cybersecurity incidents increase 50% year-over-year",
              ar: "حوادث الأمن السيبراني تزداد 50% سنوياً",
            },
          },
          {
            id: 2,
            title: {
              en: "Certification Prep",
              ar: "الإعداد للشهادة",
            },
            description: {
              en: "Prepare for CEH and OSCP certifications",
              ar: "الاستعداد لشهادات CEH و OSCP",
            },
          },
          {
            id: 3,
            title: {
              en: "Legal Hacking",
              ar: "القرصنة القانونية",
            },
            description: {
              en: "Learn to hack ethically within legal boundaries",
              ar: "تعلم القرصنة الأخلاقية ضمن الحدود القانونية",
            },
          },
        ],
        trainers: [
          {
            id: 11,
            name: {
              en: "Marcus Wilson",
              ar: "ماركوس ويلسون",
            },
            title: {
              en: "Senior Security Researcher",
              ar: "باحث أمني أول",
            },
            image: "/images/trainers/marcus-wilson.jpg",
            description: {
              en: "Bug bounty hunter with $500k+ in rewards",
              ar: "صائد مكافآت الأخطاء مع أكثر من 500 ألف دولار في المكافآت",
            },
            socialLinks: {
              twitter: "@marcus_sec",
              github: "github.com/mwilson-security",
            },
          },
        ],
        courseContent: [
          {
            id: 1,
            unit: 1,
            title: {
              en: "Security Fundamentals",
              ar: "أساسيات الأمان",
            },
            description: {
              en: "Network security, Cryptography, Security protocols",
              ar: "أمن الشبكات والتشفير وبروتوكولات الأمان",
            },
          },
          {
            id: 2,
            unit: 2,
            title: {
              en: "Web Application Security",
              ar: "أمان تطبيقات الويب",
            },
            description: {
              en: "OWASP Top 10, SQL injection, XSS, CSRF attacks",
              ar: "OWASP Top 10 وحقن SQL و XSS وهجمات CSRF",
            },
          },
          {
            id: 3,
            unit: 3,
            title: {
              en: "Network Penetration Testing",
              ar: "اختبار اختراق الشبكة",
            },
            description: {
              en: "Nmap, Metasploit, Wireshark, Exploitation techniques",
              ar: "Nmap و Metasploit و Wireshark وتقنيات الاستغلال",
            },
          },
          {
            id: 4,
            unit: 4,
            title: {
              en: "Report Writing & Remediation",
              ar: "كتابة التقارير والإصلاح",
            },
            description: {
              en: "Professional reporting, Risk assessment, Mitigation strategies",
              ar: "كتابة التقارير المهنية وتقييم المخاطر واستراتيجيات التخفيف",
            },
          },
        ],
      },
      {
        id: 12,
        title: {
          en: "Cloud Security Architecture",
          ar: "هندسة أمان السحابة",
        },
        description: {
          en: "Secure cloud infrastructures and implement zero-trust architectures",
          ar: "تأمين البنى التحتية السحابية وتنفيذ هندسات الثقة الصفرية",
        },
        icon: "☁️🔐",
        tags: {
          en: ["Cloud Security", "Zero Trust", "IAM", "Compliance"],
          ar: ["أمان السحابة", "الثقة الصفرية", "IAM", "الامتثال"],
        },
        brouchureLink: "/brochures/cloud-security.pdf",
        whyAttend: [
          {
            id: 1,
            title: {
              en: "Cloud-First World",
              ar: "عالم السحابة أولاً",
            },
            description: {
              en: "95% of enterprises use cloud services requiring security",
              ar: "95% من المؤسسات تستخدم خدمات سحابية تتطلب الأمان",
            },
          },
          {
            id: 2,
            title: {
              en: "Compliance Requirements",
              ar: "متطلبات الامتثال",
            },
            description: {
              en: "Meet GDPR, HIPAA, SOC2 compliance standards",
              ar: "تلبية معايير الامتثال GDPR و HIPAA و SOC2",
            },
          },
        ],
        trainers: [
          {
            id: 12,
            name: {
              en: "Dr. Lisa Chang",
              ar: "د. ليزا تشانغ",
            },
            title: {
              en: "Cloud Security Architect",
              ar: "مهندسة أمان السحابة",
            },
            image: "/images/trainers/lisa-chang.jpg",
            description: {
              en: "Former AWS Security team lead",
              ar: "قائدة فريق أمان AWS السابقة",
            },
            socialLinks: {
              linkedin: "linkedin.com/in/lisachang-security",
            },
          },
        ],
        courseContent: [
          {
            id: 1,
            unit: 1,
            title: {
              en: "Cloud Security Fundamentals",
              ar: "أساسيات أمان السحابة",
            },
            description: {
              en: "Shared responsibility model, Identity management",
              ar: "نموذج المسؤولية المشتركة وإدارة الهوية",
            },
          },
          {
            id: 2,
            unit: 2,
            title: {
              en: "Zero Trust Implementation",
              ar: "تطبيق الثقة الصفرية",
            },
            description: {
              en: "Microsegmentation, Least privilege, MFA everywhere",
              ar: "التجزئة الدقيقة وأقل الامتيازات والمصادقة متعددة العوامل في كل مكان",
            },
          },
          {
            id: 3,
            unit: 3,
            title: {
              en: "Compliance & Governance",
              ar: "الامتثال والحوكمة",
            },
            description: {
              en: "Audit trails, Data residency, Encryption strategies",
              ar: "مسارات التدقيق وإقامة البيانات واستراتيجيات التشفير",
            },
          },
        ],
      },
    ],
  },
  {
    id: 6,
    label: {
      en: "Blockchain & Web3",
      ar: "البلوك تشين و Web3",
    },
    icon: "⛓️",
    content: [
      {
        id: 13,
        title: {
          en: "Smart Contract Development",
          ar: "تطوير العقود الذكية",
        },
        description: {
          en: "Build decentralized applications on Ethereum using Solidity and Web3.js",
          ar: "بناء تطبيقات لامركزية على Ethereum باستخدام Solidity و Web3.js",
        },
        icon: "📜",
        tags: {
          en: ["Solidity", "Ethereum", "DeFi", "Smart Contracts", "Web3"],
          ar: ["Solidity", "Ethereum", "DeFi", "العقود الذكية", "Web3"],
        },
        brouchureLink: "/brochures/smart-contracts.pdf",
        whyAttend: [
          {
            id: 1,
            title: {
              en: "Future of Finance",
              ar: "مستقبل التمويل",
            },
            description: {
              en: "DeFi is revolutionizing traditional financial systems",
              ar: "DeFi تحدث ثورة في الأنظمة المالية التقليدية",
            },
          },
          {
            id: 2,
            title: {
              en: "High-Paying Niche",
              ar: "تخصص عالي الأجر",
            },
            description: {
              en: "Blockchain developers command premium salaries",
              ar: "مطورو البلوك تشين يحصلون على رواتب ممتازة",
            },
          },
          {
            id: 3,
            title: {
              en: "Early Adoption Advantage",
              ar: "ميزة التبني المبكر",
            },
            description: {
              en: "Get ahead in the emerging Web3 ecosystem",
              ar: "تقدم في نظام Web3 البيئي الناشئ",
            },
          },
        ],
        trainers: [
          {
            id: 13,
            name: {
              en: "Tom Anderson",
              ar: "توم أندرسون",
            },
            title: {
              en: "Blockchain Engineer",
              ar: "مهندس بلوك تشين",
            },
            image: "/images/trainers/tom-anderson.jpg",
            description: {
              en: "Core contributor to major DeFi protocols",
              ar: "مساهم أساسي في بروتوكولات DeFi الرئيسية",
            },
            socialLinks: {
              github: "github.com/tomanderson-eth",
              twitter: "@tom_web3",
            },
          },
        ],
        courseContent: [
          {
            id: 1,
            unit: 1,
            title: {
              en: "Blockchain Fundamentals",
              ar: "أساسيات البلوك تشين",
            },
            description: {
              en: "Consensus mechanisms, Cryptography, Ethereum basics",
              ar: "آليات الإجماع والتشفير وأساسيات Ethereum",
            },
          },
          {
            id: 2,
            unit: 2,
            title: {
              en: "Solidity Programming",
              ar: "برمجة Solidity",
            },
            description: {
              en: "Smart contract development, Testing, Gas optimization",
              ar: "تطوير العقود الذكية والاختبار وتحسين الغاز",
            },
          },
          {
            id: 3,
            unit: 3,
            title: {
              en: "DeFi Protocol Development",
              ar: "تطوير بروتوكولات DeFi",
            },
            description: {
              en: "DEX, Lending protocols, Yield farming contracts",
              ar: "DEX وبروتوكولات الإقراض وعقود زراعة العائد",
            },
          },
          {
            id: 4,
            unit: 4,
            title: {
              en: "Security & Auditing",
              ar: "الأمان والتدقيق",
            },
            description: {
              en: "Common vulnerabilities, Audit techniques, Best practices",
              ar: "الثغرات الشائعة وتقنيات التدقيق وأفضل الممارسات",
            },
          },
        ],
      },
    ],
  },
  {
    id: 7,
    label: {
      en: "Game Development",
      ar: "تطوير الألعاب",
    },
    icon: "🎮",
    content: [
      {
        id: 14,
        title: {
          en: "Unity 3D Game Development",
          ar: "تطوير الألعاب ثلاثية الأبعاد باستخدام Unity",
        },
        description: {
          en: "Create professional games for PC, mobile, and consoles using Unity engine",
          ar: "إنشاء ألعاب احترافية للكمبيوتر والجوال ووحدات التحكم باستخدام محرك Unity",
        },
        icon: "🎯",
        tags: {
          en: ["Unity", "C#", "Game Design", "3D Graphics", "Mobile Games"],
          ar: [
            "Unity",
            "C#",
            "تصميم الألعاب",
            "رسومات ثلاثية الأبعاد",
            "ألعاب الجوال",
          ],
        },
        brouchureLink: "/brochures/unity-game-dev.pdf",
        whyAttend: [
          {
            id: 1,
            title: {
              en: "Massive Gaming Industry",
              ar: "صناعة ألعاب ضخمة",
            },
            description: {
              en: "Gaming industry is larger than movies and music combined",
              ar: "صناعة الألعاب أكبر من صناعتي الأفلام والموسيقى مجتمعتين",
            },
          },
          {
            id: 2,
            title: {
              en: "Creative Expression",
              ar: "التعبير الإبداعي",
            },
            description: {
              en: "Combine technical skills with artistic creativity",
              ar: "الجمع بين المهارات التقنية والإبداع الفني",
            },
          },
          {
            id: 3,
            title: {
              en: "Multiple Revenue Streams",
              ar: "مصادر دخل متعددة",
            },
            description: {
              en: "Monetize through ads, IAP, and game sales",
              ar: "تحقيق الدخل من خلال الإعلانات والمشتريات داخل التطبيق ومبيعات الألعاب",
            },
          },
        ],
        trainers: [
          {
            id: 14,
            name: {
              en: "Carlos Rodriguez",
              ar: "كارلوس رودريغيز",
            },
            title: {
              en: "Senior Game Developer",
              ar: "مطور ألعاب أول",
            },
            image: "/images/trainers/carlos-rodriguez.jpg",
            description: {
              en: "Shipped 10+ games with millions of downloads",
              ar: "أطلق أكثر من 10 ألعاب مع ملايين التنزيلات",
            },
            socialLinks: {
              linkedin: "linkedin.com/in/carlosrodriguez-gamedev",
              twitter: "@carlos_gamedev",
            },
          },
        ],
        courseContent: [
          {
            id: 1,
            unit: 1,
            title: {
              en: "Unity Fundamentals",
              ar: "أساسيات Unity",
            },
            description: {
              en: "GameObject system, Physics, Input handling",
              ar: "نظام GameObject والفيزياء ومعالجة المدخلات",
            },
          },
          {
            id: 2,
            unit: 2,
            title: {
              en: "Game Programming Patterns",
              ar: "أنماط برمجة الألعاب",
            },
            description: {
              en: "State machines, Object pooling, Event systems",
              ar: "آلات الحالة وتجميع الكائنات وأنظمة الأحداث",
            },
          },
          {
            id: 3,
            unit: 3,
            title: {
              en: "3D Graphics & Animation",
              ar: "الرسومات ثلاثية الأبعاد والرسوم المتحركة",
            },
            description: {
              en: "Shaders, Lighting, Character animation",
              ar: "التظليل والإضاءة وحركة الشخصيات",
            },
          },
          {
            id: 4,
            unit: 4,
            title: {
              en: "Multiplayer & Monetization",
              ar: "اللعب الجماعي وتحقيق الدخل",
            },
            description: {
              en: "Networking, Ads integration, Publishing process",
              ar: "الشبكات وتكامل الإعلانات وعملية النشر",
            },
          },
        ],
      },
      {
        id: 15,
        title: {
          en: "Unreal Engine 5 for AAA Games",
          ar: "Unreal Engine 5 لألعاب AAA",
        },
        description: {
          en: "Master next-gen game development with Unreal Engine 5's cutting-edge features",
          ar: "أتقن تطوير ألعاب الجيل القادم مع ميزات Unreal Engine 5 المتطورة",
        },
        icon: "🚀",
        tags: {
          en: ["Unreal Engine", "C++", "Blueprints", "AAA Games", "VR/AR"],
          ar: ["Unreal Engine", "C++", "Blueprints", "ألعاب AAA", "VR/AR"],
        },
        brouchureLink: "/brochures/unreal-engine5.pdf",
        whyAttend: [
          {
            id: 1,
            title: {
              en: "Industry Standard",
              ar: "معيار الصناعة",
            },
            description: {
              en: "Used by top AAA studios for blockbuster games",
              ar: "تستخدمه أفضل استوديوهات AAA للألعاب الرائجة",
            },
          },
          {
            id: 2,
            title: {
              en: "Next-Gen Graphics",
              ar: "رسومات الجيل القادم",
            },
            description: {
              en: "Learn Nanite, Lumen, and other UE5 innovations",
              ar: "تعلم Nanite و Lumen وابتكارات UE5 الأخرى",
            },
          },
        ],
        trainers: [
          {
            id: 15,
            name: {
              en: "Nina Petrova",
              ar: "نينا بتروفا",
            },
            title: {
              en: "Lead Technical Artist",
              ar: "فنانة تقنية رئيسية",
            },
            image: "/images/trainers/nina-petrova.jpg",
            description: {
              en: "Worked on multiple AAA titles at Epic Games",
              ar: "عملت على عدة ألعاب AAA في Epic Games",
            },
            socialLinks: {
              linkedin: "linkedin.com/in/ninapetrova-ue5",
            },
          },
        ],
        courseContent: [
          {
            id: 1,
            unit: 1,
            title: {
              en: "UE5 Fundamentals",
              ar: "أساسيات UE5",
            },
            description: {
              en: "Editor basics, Blueprints visual scripting, Level design",
              ar: "أساسيات المحرر والبرمجة المرئية Blueprints وتصميم المستويات",
            },
          },
          {
            id: 2,
            unit: 2,
            title: {
              en: "C++ Game Programming",
              ar: "برمجة الألعاب بـ C++",
            },
            description: {
              en: "UE5 C++ API, Performance optimization, Custom tools",
              ar: "واجهة برمجة UE5 C++ وتحسين الأداء والأدوات المخصصة",
            },
          },
          {
            id: 3,
            unit: 3,
            title: {
              en: "Advanced Graphics",
              ar: "الرسومات المتقدمة",
            },
            description: {
              en: "Nanite virtualized geometry, Lumen global illumination, Niagara VFX",
              ar: "هندسة Nanite الافتراضية وإضاءة Lumen العالمية ومؤثرات Niagara",
            },
          },
          {
            id: 4,
            unit: 4,
            title: {
              en: "VR/AR Development",
              ar: "تطوير VR/AR",
            },
            description: {
              en: "OpenXR integration, Motion controllers, Optimization for VR",
              ar: "تكامل OpenXR وأجهزة التحكم بالحركة والتحسين لـ VR",
            },
          },
        ],
      },
    ],
  },
]
