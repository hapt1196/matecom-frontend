// Context về công ty MATECOM để AI trả lời chính xác
export const COMPANY_CONTEXT = {
  // Thông tin công ty
  companyName: "MATECOM",
  companyFullName: "Công ty TNHH MATECOM",
  website: "https://matecom.vn",

  // Mô tả công ty
  description: "MATECOM là công ty chuyên cung cấp và triển khai các giải pháp Marketing toàn diện, giúp doanh nghiệp xây dựng chiến lược marketing hiệu quả và tăng trưởng bền vững.",

  // Sản phẩm và dịch vụ chính
  products: {
    marketingStrategy: {
      name: "Marketing Strategy",
      description: "Xây dựng chiến lược marketing toàn diện từ phân tích thị trường đến triển khai thực tế",
      features: [
        "Phân tích thị trường và đối thủ cạnh tranh",
        "Xây dựng ICP/Persona và Customer Journey",
        "Định vị thương hiệu và xây dựng thông điệp",
        "Chiến lược truyền thông tích hợp (IMC)",
        "Digital Performance Marketing",
        "Brand Marketing và Product Marketing",
        "Tracking, Analytics và tối ưu hóa"
      ]
    },

    marketResearch: {
      name: "Nghiên cứu Thị trường",
      description: "Phân tích sâu về thị trường, khách hàng và đối thủ cạnh tranh",
      features: [
        "TAM-SAM-SOM Analysis",
        "PESTEL Analysis",
        "Five Forces Analysis",
        "SWOT Analysis",
        "3Cs Analysis",
        "Desk Research và Field Research",
        "Data Analysis từ GA4, CRM, Ads"
      ]
    },

    brandPositioning: {
      name: "Định vị Thương hiệu",
      description: "Xây dựng định vị thương hiệu mạnh mẽ và khác biệt",
      features: [
        "STP (Segmentation, Targeting, Positioning)",
        "Perceptual Map",
        "Messaging House",
        "Brand Architecture",
        "Value Proposition Design",
        "Go-to-Market Strategy",
        "Brand Guidelines"
      ]
    },

    digitalMarketing: {
      name: "Digital Marketing",
      description: "Triển khai các chiến dịch digital marketing hiệu quả",
      features: [
        "SEO/SEM Strategy",
        "Paid Media (Google Ads, Facebook Ads)",
        "Content Marketing và Funnel",
        "Social Media Marketing",
        "Email Marketing",
        "PR và Thought Leadership",
        "Community Building"
      ]
    }
  },

  // Các gói dịch vụ Marketing Strategy
  packages: {
    basic: {
      name: "Tư vấn & Xây dựng Chiến lược Marketing (Strategic Consulting) - Basic",
      price: "50.000.000 VNĐ",
      description: "Gói nền tảng, phù hợp với khách hàng mới muốn có chiến lược rõ ràng, tiết kiệm chi phí và ít rủi ro",
      coreValue: "Khách hàng nhận được bộ chiến lược phù hợp với tình hình công ty và có thể sử dụng luôn",
      features: [
        "Phân tích thị trường, đối thủ, khách hàng (Market & Customer Insights)",
        "Phân khúc thị trường (TAM-SAM-SOM), PESTEL, Five Forces, 3Cs, SWOT",
        "Hồ sơ ICP/Persona theo vai trò (economic buyer, user, champion) & Job-To-Be-Done",
        "Bản đồ hành trình khách hàng (Awareness → Consideration → Trial → Purchase → Expansion)",
        "Định vị thương hiệu (Perceptual Map, Messaging House, Brand Architecture)",
        "Xác định chiến lược trọng tâm (Focus/Differentiation/Cost Leadership, Ansoff Matrix, Go-to-Market)",
        "Chiến lược truyền thông tích hợp (IMC)",
        "Kết quả: Marketing Strategy Blueprint (tài liệu chiến lược hoàn chỉnh)"
      ],
      suitableFor: [
        "Doanh nghiệp mới bắt đầu",
        "Khách hàng cần chiến lược rõ ràng",
        "Muốn tiết kiệm chi phí và ít rủi ro",
        "Cần định hướng marketing cơ bản"
      ]
    },

    advanced: {
      name: "Marketing Tích hợp (Integrated Marketing Solution) - Advanced",
      price: "90.000.000 VNĐ",
      description: "Gói cân bằng giữa chiến lược và triển khai, dành cho doanh nghiệp đang trong giai đoạn tăng trưởng",
      coreValue: "Khách hàng nhận được kế hoạch IMC hoàn hảo và được thực hiện với đội ngũ của MATECOM. Kết quả chiến lược đạt được objectives 3 cấp độ ban đầu đã đặt ra",
      features: [
        "Lên kế hoạch và triển khai kế hoạch marketing/IMC plan dựa trên data từ doanh nghiệp và Matecom",
        "Hồ sơ ICP/Persona theo vai trò & Job-To-Be-Done",
        "Bản đồ hành trình khách hàng (Awareness → Consideration → Trial → Purchase → Expansion)",
        "Key message và big idea phù hợp với tình hình doanh nghiệp",
        "Digital Performance (Ads, SEO, SEM, Content Funnel)",
        "Brand Marketing (PR, Thought Leadership, Community Building)",
        "Product Marketing (Go-to-Market, Feature Launch Campaigns)",
        "Giải pháp nền tảng: Social & Creator program, ABM, Category design & PR, Product storytelling, Brand system refresh, SEO compounding, Performance + Guardrails, CRO & self-serve growth, Go-to-Market cho thị trường mới, Localization, Marketing automation, CRM tích hợp",
        "Kết quả: Kế hoạch triển khai chi tiết (Execution Roadmap)",
        "Đo lường: Reach, engagement, traffic, doanh thu, view"
      ],
      suitableFor: [
        "Doanh nghiệp đang tăng trưởng",
        "Cần cân bằng chiến lược và triển khai",
        "Muốn tối ưu hiệu suất marketing",
        "Cần giải pháp chuyên sâu"
      ]
    },

    premium: {
      name: "Marketing Strategy & Execution Plan - Premium",
      price: "120.000.000 VNĐ",
      description: "Gói toàn diện, cung cấp giải pháp đầy đủ cùng các công cụ quản trị và quản lý rủi ro, phù hợp với doanh nghiệp lớn",
      coreValue: "Tư vấn, hoạch định chiến lược và xây dựng Marketing Plan 4-12 tháng với mục tiêu SMART, ngân sách, KPI, lịch triển khai và cơ chế đo lường rõ ràng. Doanh nghiệp có bộ chiến lược & kế hoạch hành động có thể dùng ngay, kèm dashboard theo dõi và quy trình triển khai theo sprint. Đạt mục tiêu 3 cấp độ - doanh thu mà khách hàng đặt ra",
      features: [
        "Set up mục tiêu 3 cấp độ cho doanh nghiệp",
        "Thu thập dữ liệu: GA4/GTM, CRM, ad accounts, pipeline, tệp khách hàng, báo cáo trước đây",
        "Thống nhất North-star metric (MRR, WAU/MAU hoạt động, demo booked)",
        "Phân tích thị trường, cạnh tranh: PESTEL, 3Cs, 5 force, TAM-SAM-SOM",
        "SWOT/Capability review cho doanh nghiệp",
        "Nghiên cứu định tính (phỏng vấn khách hàng/bên mua - 6-10 mẫu) + desk research",
        "Xây dựng ICP/Persona theo vai trò & Jobs-to-be-done",
        "Customer Journey Map: Awareness → Consideration → Trial/Demo → Purchase → Onboarding → Expansion",
        "Positioning Statement & Value Proposition theo use case/segment",
        "Chọn mô hình GTM: PLG/Sales-led/Partner-led (hoặc hybrid)",
        "Channel Strategy: SEO/Content, Paid, Social/Community, PR/Events, Email/Lifecycle, Affiliate/Partnership",
        "Brief IMC plan => chốt kế hoạch và thực hiện",
        "Risk & Mitigation: rủi ro pháp lý, tracking, ngân sách, năng lực nội bộ",
        "Thiết kế KPI theo mô hình AARRR (Awareness → Acquisition → Activation → Retention → Revenue)",
        "Lập ngân sách marketing (Budget Allocation)",
        "Hỗ trợ vận hành cùng team in-house (Agile Marketing Sprint)",
        "Kết quả: Bộ KPI Dashboard + Plan Execution Report"
      ],
      deliverables: [
        "Marketing Strategy Blueprint (PDF/Slides): thị trường, ICP/JTBD, định vị, messaging, GTM, channel strategy",
        "12-month Marketing Plan (Excel/Sheets): mục tiêu SMART, lịch chiến dịch, ngân sách, KPI",
        "Execution Roadmap (kanban/backlog + Gantt): sprint plan, test plan, checklist launch",
        "Tracking & Analytics Pack: tracking plan, UTM convention, event map, dashboard URL/mẫu báo cáo",
        "Asset Plan: danh sách landing pages, nội dung SEO, case study, creative spec & số lượng đề xuất",
        "Sales-Marketing SLA & Lead Scoring (nếu B2B)",
        "Risk Register & Mitigation Guide"
      ],
      suitableFor: [
        "Doanh nghiệp lớn",
        "Cần giải pháp toàn diện",
        "Muốn quản lý rủi ro tốt",
        "Cần roadmap dài hạn 6-12 tháng"
      ]
    }
  },

  // Thông tin liên hệ
  contact: {
    phone: "0339265203",
    email: "info@matecom.vn",
    address: "283 Khuất Duy Tiến, Hanoi, Vietnam",
    workingHours: "Thứ 2 - Thứ 6: 8:00 - 17:30",
    support: "Hỗ trợ 24/7 qua hotline và email"
  },

  // Đối tác và chứng nhận
  partners: [
    "Google Partner",
    "Meta Business Partner",
    "TikTok Business Partner",
    "Zalo Business Partner",
    "Zoho Partner",
    "Bing Ads Partner"
  ],

  // Ưu điểm cạnh tranh
  competitiveAdvantages: [
    "Đội ngũ kỹ thuật giàu kinh nghiệm",
    "Công nghệ hiện đại, cập nhật liên tục",
    "Giá cả cạnh tranh, minh bạch",
    "Hỗ trợ khách hàng tận tình",
    "Bảo hành dài hạn",
    "Nhiều gói dịch vụ linh hoạt"
  ],

  // Các chiến lược cốt lõi
  coreStrategies: {
    endToEndMarketing: {
      name: "End-to-End Marketing Thinking",
      description: "Không giới hạn ở việc 'chạy quảng cáo', agency cần đồng hành cùng doanh nghiệp từ đầu đến cuối chuỗi giá trị marketing. Đây là cách tiếp cận IMC – Integrated Marketing Communications, đảm bảo mọi kênh, hoạt động và thông điệp đều thống nhất, bổ trợ lẫn nhau",
      approaches: [
        "Phân tích thị trường & đối thủ: áp dụng mô hình PESTEL, 5 Forces, SWOT",
        "Định vị thương hiệu: dựa vào STP (Segmentation – Targeting – Positioning)",
        "Xây dựng chiến lược: theo SMART Objectives & KPIs",
        "Triển khai đa kênh: Digital Ads, PR, Social, OOH, KOL/Influencer, Activation",
        "Đo lường & tối ưu: theo mô hình Marketing Funnel (AIDA, See-Think-Do-Care)"
      ]
    },

    customerCentric: {
      name: "Customer-Centric (Khách hàng là trung tâm)",
      description: "Marketing hiệu quả phải bắt nguồn từ customer insight và gắn liền với customer journey. Cách tiếp cận này phù hợp với lý thuyết CX (Customer Experience Management) và Jobs To Be Done (JTBD)",
      approaches: [
        "Khảo sát, phỏng vấn, phân tích dữ liệu hành vi",
        "Xây dựng Persona & Customer Journey Map",
        "Tạo touchpoint chiến lược trên từng giai đoạn: Awareness → Consideration → Conversion → Loyalty → Advocacy",
        "Ứng dụng personalization (cá nhân hóa content & offer)"
      ]
    },

    balanceBrandGrowth: {
      name: "Balance of Brand & Growth (Cân bằng thương hiệu và tăng trưởng)",
      description: "Vừa xây dựng thương hiệu dài hạn (PR, Community, Thought Leadership), vừa mang lại tăng trưởng ngắn hạn (Ads, SEO, Activation)",
      approaches: [
        "Dựa trên The Long & Short of It (Binet & Field)",
        "Brand Building → dài hạn, tạo emotional connection",
        "Sales Activation → ngắn hạn, tạo immediate growth",
        "Brand: PR, storytelling, KOL, content hub, community building",
        "Performance: Paid Ads, SEO, CRO, Remarketing, Affiliate",
        "Xây dựng Brand Funnel song song với Performance Funnel để bổ trợ lẫn nhau"
      ]
    },

    dataDrivenTech: {
      name: "Data-Driven + Tech-enabled (Ứng dụng công nghệ và dữ liệu)",
      description: "Tận dụng martech, tracking, dashboard KPI để đo lường chính xác và tối ưu theo thời gian thực. Dữ liệu là 'nhiên liệu' của marketing hiện đại. Công nghệ martech giúp tracking, automation, real-time optimization. Đây là cơ sở của Growth Marketing",
      approaches: [
        "Hệ thống MarTech Stack: CRM, CDP, Automation, AdTech, BI dashboard",
        "Data Tracking: GA4, Pixel, Heatmap, Attribution Model",
        "Phân tích dữ liệu: Cohort analysis, CLV (Customer Lifetime Value), CAC (Customer Acquisition Cost)",
        "AI & Machine Learning: Chatbot, Recommendation engine, Predictive Analytics"
      ]
    },

    agileSustainable: {
      name: "Agile & Sustainable Growth (Tính linh hoạt và tăng trưởng bền vững)",
      description: "Trong bối cảnh thị trường thay đổi nhanh, cần một mô hình marketing Agile: thử nghiệm nhanh, đo lường, cải tiến liên tục. Đồng thời, vẫn duy trì chiến lược dài hạn bền vững",
      approaches: [
        "Triển khai theo Agile Sprint Marketing (2–4 tuần/chu kỳ)",
        "Test & Learn: A/B test, multivariate test, MVP campaign",
        "Tư duy 'in-house partner': agency làm việc như một bộ phận mở rộng của doanh nghiệp",
        "Hướng tới sustainable growth: sử dụng khoản budget hiệu quả vào các chiến lược marketing, không chỉ tốt mà còn xây dựng owned media, organic growth, community"
      ]
    }
  },

  // Dịch vụ add-on
  addOnServices: [
    "CMO-as-a-Service",
    "ABM/Outbound B2B (danh sách tài khoản, sequence đa kênh)",
    "Localization & Market Entry (khi mở thị trường mới)",
    "Training in-house (SEO, GA4, Performance, CRM)"
  ],

  // Hạng mục ngoài phạm vi
  outOfScope: [
    "Chi phí media, phí nền tảng quảng cáo (TVC, PR, TV), phí công cụ MarTech bản trả phí",
    "Sản xuất TVC/3D/complex motion, sự kiện lớn (Talkshow, diễn đàn) (có thể add-on)",
    "Phát triển chức năng sản phẩm/ứng dụng (trừ phần tracking embed/landing)"
  ]
}

// Hàm tạo system prompt cho AI
export const getSystemPrompt = () => {
  return `Bạn là trợ lý AI của ${COMPANY_CONTEXT.companyName} (${COMPANY_CONTEXT.companyFullName}). 

THÔNG TIN CÔNG TY:
- Tên: ${COMPANY_CONTEXT.companyName}
- Website: ${COMPANY_CONTEXT.website}
- Mô tả: ${COMPANY_CONTEXT.description}
- Địa chỉ: ${COMPANY_CONTEXT.contact.address}
- Hotline: ${COMPANY_CONTEXT.contact.phone}
- Email: ${COMPANY_CONTEXT.contact.email}

SẢN PHẨM VÀ DỊCH VỤ:
${Object.values(COMPANY_CONTEXT.products).map(product =>
    `- ${product.name}: ${product.description}`
  ).join('\n')}

CÁC GÓI DỊCH VỤ MARKETING STRATEGY:
${Object.values(COMPANY_CONTEXT.packages).map(pkg =>
    `- ${pkg.name} (${pkg.price}): ${pkg.description}`
  ).join('\n')}

CHI TIẾT CÁC GÓI:
- Gói Basic (50 triệu): Tư vấn & Xây dựng Chiến lược Marketing - Phân tích thị trường & đối thủ, ICP/Persona, Định vị thương hiệu, Chiến lược trọng tâm, IMC, Marketing Strategy Blueprint
- Gói Advanced (90 triệu): Marketing Tích hợp - Lên kế hoạch và triển khai IMC plan, Digital Performance, Brand Marketing, Product Marketing, Giải pháp nền tảng, Execution Roadmap
- Gói Premium (120 triệu): Marketing Strategy & Execution Plan - Mục tiêu 3 cấp độ, Thu thập & phân tích dữ liệu, ICP/Persona & Customer Journey, Định vị & GTM Strategy, Channel Strategy & IMC Plan, Execution Roadmap 6-12 tháng, Tracking & Analytics, Risk & Mitigation

CÁC CHIẾN LƯỢC CỐT LÕI:
1. End-to-End Marketing Thinking: IMC, đa kênh, đo lường theo Marketing Funnel
2. Customer-Centric: CX, JTBD, Persona & Customer Journey Map, Personalization
3. Balance of Brand & Growth: Brand Building + Sales Activation, Brand Funnel + Performance Funnel
4. Data-Driven + Tech-enabled: MarTech Stack, Data Tracking, AI & Machine Learning
5. Agile & Sustainable Growth: Agile Sprint Marketing, Test & Learn, Sustainable growth

DỊCH VỤ ADD-ON:
- CMO-as-a-Service
- ABM/Outbound B2B
- Localization & Market Entry
- Training in-house (SEO, GA4, Performance, CRM)

HẠNG MỤC NGOÀI PHẠM VI:
- Chi phí media, phí nền tảng quảng cáo
- Sản xuất TVC/3D/complex motion, sự kiện lớn
- Phát triển chức năng sản phẩm/ứng dụng

ĐỐI TÁC: ${COMPANY_CONTEXT.partners.join(', ')}

NHIỆM VỤ CỦA BẠN:
1. Trả lời câu hỏi về các gói Marketing Strategy của ${COMPANY_CONTEXT.companyName}
2. Tư vấn gói phù hợp dựa trên quy mô và nhu cầu doanh nghiệp
3. Giải thích chi tiết các hạng mục công việc trong từng gói
4. Cung cấp thông tin về các chiến lược cốt lõi và dịch vụ add-on
5. Cung cấp thông tin liên hệ và hỗ trợ
6. Hướng dẫn khách hàng về quy trình làm việc
7. Luôn thân thiện, chuyên nghiệp và hữu ích

LƯU Ý:
- Chỉ trả lời về dịch vụ Marketing Strategy của ${COMPANY_CONTEXT.companyName}
- Nếu câu hỏi không liên quan, hãy hướng dẫn khách hàng về dịch vụ phù hợp
- Luôn sử dụng tiếng Việt
- Trả lời chi tiết, rõ ràng và dễ hiểu
- Nhấn mạnh giá trị và lợi ích của từng gói dịch vụ
- Giải thích các thuật ngữ chuyên môn khi cần thiết
- Không trả lời giá dịch vụ trong bất kỳ câu hỏi nào, nếu hỏi thì báo gửi thông tin liên hệ để tư vấn, gửi thông tin liên hệ ở địa chỉ facebook, số điện thoại, email hoặc https://matecom.vn/contact
- Tư vấn sử dụng gói nào phù hợp nhất có thể dựa thêm vào thông tin khách hàng, ngân sách của KH gần với dữ liệu các gói hiện tại.
`
}
