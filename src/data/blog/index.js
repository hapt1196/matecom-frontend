// Blog data exports
export { teamworkAgencyBlog } from './teamwork-agency.js'
export { marketing2026Blog } from './marketing-2026.js'
export { quocKhanh2_9_2025Blog } from './quoc-khanh-2-9-2025.js'
export { memeMarketing6NguyenTacBlog } from './meme-marketing-6-nguyen-tac.js'
export { googleAiOverviewSeo2025Blog } from './google-ai-overview-seo-2025.js'
export { prSuKienDacBietThuongHieuQuocGiaBlog } from './pr-su-kien-dac-biet-thuong-hieu-quoc-gia.js'
export { namKenhGoiVonStartupBlog } from './5-kenh-goi-von-startup.js'
export { biQuyetTiepCanNhaDauTuBlog } from './bi-quyet-tiep-can-nha-dau-tu.js'
export { mucTieuTangTruongB2bBlog } from './muc-tieu-tang-truong-b2b.js'
export { bayPMarketingNganhDichVuBlog } from './7p-marketing-nganh-dich-vu.js'
export { tiepThiSanPhamCongNghiepBlog } from './tiep-thi-san-pham-cong-nghiep.js'
export { marketing2025ChienLuocBlog } from './marketing-2025-chien-luoc.js'
export { chienDichQuangCaoStartupCongNgheBlog } from './chien-dich-quang-cao-startup-cong-nghe.js'
export { chatgptCongCuAiDuocNguoiVietUaChuong2025Blog } from './chatgpt-cong-cu-ai-duoc-nguoi-viet-ua-chuong-2025.js'
export { tuongLaiAgencySangTaoAi2030Blog } from './tuong-lai-agency-sang-tao-ai-2030.js'
export { matecomHoTroHtiScientificHoiThao2025Blog } from './matecom-ho-tro-hti-scientific-hoi-thao-2025.js'
export { matecomHoTroHtiScientificTrienLam2025Blog } from './matecom-ho-tro-hti-scientific-trien-lam-2025.js'
export { matecomGoiFptersTraLoiCheckin2025Blog } from './matecom-goi-fpters-tra-loi-checkin-2025.js'
export { matecomAgencyHopTacGenzhome2025Blog } from './matecom-agency-hop-tac-genzhome-2025.js'

// Blog data mapping
export const blogDataMap = {
  'lam-viec-nhom-trong-moi-truong-agency-teamwork': () => import('./teamwork-agency.js').then(m => m.teamworkAgencyBlog),
  'marketing-2026-xu-huong-moi-dinh-hinh-tuong-lai-thuong-hieu': () => import('./marketing-2026.js').then(m => m.marketing2026Blog),
  'quoc-khanh-2-9-2025-xu-huong-hot': () => import('./quoc-khanh-2-9-2025.js').then(m => m.quocKhanh2_9_2025Blog),
  'meme-marketing-6-nguyen-tac': () => import('./meme-marketing-6-nguyen-tac.js').then(m => m.memeMarketing6NguyenTacBlog),
  'google-ai-overview-seo-2025': () => import('./google-ai-overview-seo-2025.js').then(m => m.googleAiOverviewSeo2025Blog),
  'pr-su-kien-dac-biet-thuong-hieu-quoc-gia': () => import('./pr-su-kien-dac-biet-thuong-hieu-quoc-gia.js').then(m => m.prSuKienDacBietThuongHieuQuocGiaBlog),
  '5-kenh-goi-von-startup': () => import('./5-kenh-goi-von-startup.js').then(m => m.namKenhGoiVonStartupBlog),
  'bi-quyet-tiep-can-nha-dau-tu': () => import('./bi-quyet-tiep-can-nha-dau-tu.js').then(m => m.biQuyetTiepCanNhaDauTuBlog),
  'muc-tieu-tang-truong-b2b': () => import('./muc-tieu-tang-truong-b2b.js').then(m => m.mucTieuTangTruongB2bBlog),
  '7p-marketing-nganh-dich-vu': () => import('./7p-marketing-nganh-dich-vu.js').then(m => m.bayPMarketingNganhDichVuBlog),
  'tiep-thi-san-pham-cong-nghiep': () => import('./tiep-thi-san-pham-cong-nghiep.js').then(m => m.tiepThiSanPhamCongNghiepBlog),
  'marketing-2025-chien-luoc': () => import('./marketing-2025-chien-luoc.js').then(m => m.marketing2025ChienLuocBlog),
  'chien-dich-quang-cao-startup-cong-nghe': () => import('./chien-dich-quang-cao-startup-cong-nghe.js').then(m => m.chienDichQuangCaoStartupCongNgheBlog),
  'chatgpt-cong-cu-ai-duoc-nguoi-viet-ua-chuong-2025': () => import('./chatgpt-cong-cu-ai-duoc-nguoi-viet-ua-chuong-2025.js').then(m => m.chatgptCongCuAiDuocNguoiVietUaChuong2025Blog),
  'tuong-lai-agency-sang-tao-ai-2030': () => import('./tuong-lai-agency-sang-tao-ai-2030.js').then(m => m.tuongLaiAgencySangTaoAi2030Blog)
  , 'matecom-ho-tro-hti-scientific-hoi-thao-2025': () => import('./matecom-ho-tro-hti-scientific-hoi-thao-2025.js').then(m => m.matecomHoTroHtiScientificHoiThao2025Blog)
  , 'matecom-ho-tro-hti-scientific-trien-lam-2025': () => import('./matecom-ho-tro-hti-scientific-trien-lam-2025.js').then(m => m.matecomHoTroHtiScientificTrienLam2025Blog)
  , 'matecom-goi-fpters-tra-loi-checkin-2025': () => import('./matecom-goi-fpters-tra-loi-checkin-2025.js').then(m => m.matecomGoiFptersTraLoiCheckin2025Blog)
  , 'matecom-agency-hop-tac-genzhome-2025': () => import('./matecom-agency-hop-tac-genzhome-2025.js').then(m => m.matecomAgencyHopTacGenzhome2025Blog)
}

// Helper function to get blog data by slug
export const getBlogData = async (slug) => {
  const loader = blogDataMap[slug]
  if (loader) {
    return await loader()
  }
  return null
}

// All blog posts list for listing pages
export const allBlogPosts = [
  {
    id: 24,
    slug: 'matecom-agency-hop-tac-genzhome-2025',
    publishedAt: new Date('2025-10-16')
  },
  {
    id: 22,
    title: 'MATECOM Agency đồng hành cùng HTI Scientific tại Triển lãm Đổi mới sáng tạo 2025',
    excerpt: 'MATECOM hỗ trợ HTI Scientific truyền thông, tổ chức và vận hành tại triển lãm 2025.',
    slug: 'matecom-ho-tro-hti-scientific-trien-lam-2025',
    featuredImage: '/assets/img/blog/matecom-ho-tro-hti-scientific-trien-lam-2025/image1.png',
    publishedAt: new Date('2025-10-01'),
    readTime: '7 phút đọc'
  },
  {
    id: 23,
    title: 'MATECOM gọi -- FPTers trả lời 2025: Check-in nhận quà, kết nối năng lượng',
    excerpt: 'Sự kiện "MATECOM gọi -- FPTers trả lời 2025" tại sảnh Delta FPT Hà Nội: check-in nhận quà, kết nối cộng đồng sinh viên năng động.',
    slug: 'matecom-goi-fpters-tra-loi-checkin-2025',
    featuredImage: '/assets/img/blog/matecom-goi-fpters-tra-loi-checkin-2025/image1.png',
    publishedAt: new Date('2025-09-23'),
    readTime: '5 phút đọc'
  },
  {
    id: 21,
    title: 'MATECOM Agency đồng hành cùng HTI Scientific trong hội thảo chuyên đề 2025',
    excerpt: 'MATECOM hỗ trợ HTI Scientific truyền thông và tổ chức hội thảo chuyên đề kiểm soát tồn dư kim loại (19/9/2025).',
    slug: 'matecom-ho-tro-hti-scientific-hoi-thao-2025',
    featuredImage: '/assets/img/blog/matecom-ho-tro-hti-scientific-hoi-thao-2025/image1.png',
    publishedAt: new Date('2025-09-19'),
    readTime: '6 phút đọc'
  },
  {
    id: 2,
    title: 'Marketing 2026 – Xu hướng mới định hình tương lai thương hiệu',
    excerpt: 'Khám phá 6 xu hướng Marketing 2026 quan trọng: Hyper-Personalization, AI Content, Video ngắn, Social Commerce và hơn thế nữa.',
    slug: 'marketing-2026-xu-huong-moi-dinh-hinh-tuong-lai-thuong-hieu',
    featuredImage: '/assets/img/c0c4fb70-567c-40ad-8e0f-c1985f66063e/image.png',
    publishedAt: new Date('2025-10-20'),
    readTime: '15 phút đọc'
  },
  {
    id: 8,
    title: 'Quốc khánh 2/9 2025: 3 xu hướng hot từ mạng xã hội đến shopping',
    excerpt: 'Quốc khánh 2/9 2025 bùng nổ với hơn 1,47 triệu thảo luận, shopping yêu nước "cháy hàng". Cùng khám phá 3 xu hướng hot ngay!',
    slug: 'quoc-khanh-2-9-2025-xu-huong-hot',
    featuredImage: '/assets/img/blog/quoc-khanh-2-9-2025/image1.png',
    publishedAt: new Date('2025-09-02'),
    readTime: '8 phút đọc'
  },
  {
    id: 9,
    title: 'Meme Marketing: Cách khai thác khéo léo để tránh phản cảm',
    excerpt: 'Meme Marketing đang trở thành "vũ khí" sáng tạo giúp thương hiệu kết nối với giới trẻ, tăng tương tác tự nhiên. Tuy nhiên, ranh giới giữa sự hài hước và phản cảm lại vô cùng mong manh.',
    slug: 'meme-marketing-6-nguyen-tac',
    featuredImage: '/assets/img/blog/meme-marketing-6-nguyen-tac/image1.png',
    publishedAt: new Date('2025-10-05'),
    readTime: '10 phút đọc'
  },
  {
    id: 1,
    title: 'Làm việc nhóm trong môi trường Agency: Không giỏi teamwork có bị đào thải?',
    excerpt: 'Trong môi trường agency, teamwork không chỉ là kỹ năng mềm mà là điều kiện bắt buộc. Không giỏi teamwork, bạn có nguy cơ tự đào thải chính mình.',
    slug: 'lam-viec-nhom-trong-moi-truong-agency-teamwork',
    featuredImage: '/assets/img/blog/teamwork-agency/image1.png',
    publishedAt: new Date('2025-10-19'),
    readTime: '12 phút đọc'
  },
  {
    id: 10,
    title: 'Google AI Overview: 5 chiến lược SEO sống còn năm 2025',
    excerpt: 'Google AI Overview làm CTR giảm mạnh 32%. Doanh nghiệp cần 5 chiến lược SEO mới để giữ vững traffic và xuất hiện trong AI Overview.',
    slug: 'google-ai-overview-seo-2025',
    featuredImage: '/assets/img/blog/google-ai-overview-seo-2025/image1.jpg',
    publishedAt: new Date('2025-10-10'),
    readTime: '12 phút đọc'
  },
  {
    id: 11,
    title: 'PR sự kiện đặc biệt: Công cụ chiến lược định hình hình ảnh quốc gia',
    excerpt: 'PR sự kiện đặc biệt không chỉ là hoạt động truyền thông xoay quanh những ngày lễ trọng đại, mà còn là công cụ chiến lược giúp quốc gia quảng bá bản sắc, khẳng định vị thế và tạo dựng hình ảnh tích cực trong mắt bạn bè quốc tế.',
    slug: 'pr-su-kien-dac-biet-thuong-hieu-quoc-gia',
    featuredImage: '/assets/img/blog/pr-su-kien-dac-biet-thuong-hieu-quoc-gia/image1.jpg',
    publishedAt: new Date('2025-10-15'),
    readTime: '11 phút đọc'
  },
  {
    id: 12,
    title: '5 kênh gọi vốn giúp startup tăng tốc ngay từ giai đoạn đầu',
    excerpt: 'Gọi vốn là thử thách lớn với startup, đặc biệt trong giai đoạn khởi đầu. Mỗi kênh huy động vốn đều chứa đựng cả cơ hội lẫn rủi ro. Việc hiểu rõ ưu điểm và hạn chế của từng kênh sẽ giúp nhà sáng lập chọn hướng đi đúng đắn.',
    slug: '5-kenh-goi-von-startup',
    featuredImage: '/assets/img/blog/5-kenh-goi-von-startup/image1.png',
    publishedAt: new Date('2025-09-15'),
    readTime: '13 phút đọc'
  },
  {
    id: 13,
    title: '3 bí quyết giúp startup tiếp cận nhà đầu tư thành công',
    excerpt: 'Tiếp cận nhà đầu tư là bước quan trọng trong hành trình gọi vốn. Không chỉ cần ý tưởng hay, startup còn phải chọn đúng chiến lược để gây ấn tượng. Bài viết này chia sẻ 3 bí quyết then chốt giúp bạn chạm đến nhà đầu tư một cách hiệu quả.',
    slug: 'bi-quyet-tiep-can-nha-dau-tu',
    featuredImage: '/assets/img/blog/bi-quyet-tiep-can-nha-dau-tu/image1.png',
    publishedAt: new Date('2025-09-28'),
    readTime: '14 phút đọc'
  },
  {
    id: 14,
    title: 'Doanh nghiệp B2B nên đặt mục tiêu tăng trưởng như thế nào cho hiệu quả?',
    excerpt: 'Tăng trưởng trong doanh nghiệp B2B không thể đến từ may mắn. Việc đặt mục tiêu phải dựa vào dữ liệu, bối cảnh ngành và năng lực nội tại. Bài viết chia sẻ 5 nguyên tắc giúp doanh nghiệp thiết lập mục tiêu tăng trưởng hợp lý và bền vững.',
    slug: 'muc-tieu-tang-truong-b2b',
    featuredImage: '/assets/img/blog/muc-tieu-tang-truong-b2b/image1.png',
    publishedAt: new Date('2025-10-02'),
    readTime: '11 phút đọc'
  },
  {
    id: 15,
    title: 'Khái quát mô hình 7P Marketing ngành dịch vụ và ứng dụng thực tế',
    excerpt: 'Nếu 4P Marketing là nền tảng của chiến lược hàng hóa hữu hình, thì trong ngành dịch vụ, mô hình đã được mở rộng thành 7P. Bài viết này sẽ giúp bạn hiểu chi tiết về 7 yếu tố: Product, Price, Place, Promotion, People, Process và Physical Environment, cùng cách áp dụng để tối ưu trải nghiệm khách hàng và tăng trưởng doanh nghiệp.',
    slug: '7p-marketing-nganh-dich-vu',
    featuredImage: '/assets/img/blog/7p-marketing-nganh-dich-vu/image1.png',
    publishedAt: new Date('2025-09-10'),
    readTime: '13 phút đọc'
  },
  {
    id: 16,
    title: '7 cách để tiếp thị sản phẩm công nghiệp hiệu quả và bền vững',
    excerpt: 'Tiếp thị sản phẩm công nghiệp luôn là bài toán khó cho các doanh nghiệp B2B. Khác với hàng tiêu dùng nhanh, sản phẩm công nghiệp đòi hỏi những kênh tiếp thị riêng để tiếp cận đúng đối tượng mục tiêu. Bài viết này sẽ chia sẻ 7 cách tiếp thị hiệu quả giúp doanh nghiệp bứt phá trong năm 2025.',
    slug: 'tiep-thi-san-pham-cong-nghiep',
    featuredImage: '/assets/img/blog/tiep-thi-san-pham-cong-nghiep/image1.png',
    publishedAt: new Date('2025-10-08'),
    readTime: '12 phút đọc'
  },
  {
    id: 17,
    title: 'Xu hướng Marketing 2025: Doanh nghiệp cần chuẩn bị gì để bứt phá?',
    excerpt: 'Marketing đang bước vào giai đoạn tái cấu trúc toàn diện. Nếu như những năm trước là cuộc đua công nghệ và kênh truyền thông, thì xu hướng Marketing 2025 chứng kiến sự trở lại của những giá trị cốt lõi: trải nghiệm người dùng, sự kết hợp giữa dữ liệu và con người, cùng chiến lược omni-channel tích hợp online lẫn offline.',
    slug: 'marketing-2025-chien-luoc',
    featuredImage: '/assets/img/blog/marketing-2025-chien-luoc/image1.png',
    publishedAt: new Date('2025-09-05'),
    readTime: '9 phút đọc'
  },
  {
    id: 18,
    title: '6 chiến dịch quảng cáo truyền cảm hứng cho các startup công nghệ',
    excerpt: 'Tìm ý tưởng quảng cáo độc đáo luôn là thách thức lớn với các startup công nghệ. Thay vì bắt đầu từ con số 0, bạn có thể học hỏi từ những chiến dịch đã thành công trên thế giới. Dưới đây là 6 ví dụ điển hình về cách các thương hiệu B2B và công nghệ đã tạo ra những quảng cáo vừa sáng tạo, vừa hiệu quả, mang lại nguồn cảm hứng cho các doanh nghiệp khởi nghiệp.',
    slug: 'chien-dich-quang-cao-startup-cong-nghe',
    featuredImage: '/assets/img/blog/chien-dich-quang-cao-startup-cong-nghe/image1.png',
    publishedAt: new Date('2025-10-12'),
    readTime: '10 phút đọc'
  },
  {
    id: 19,
    title: 'ChatGPT – công cụ AI được người Việt ưa chuộng nhất năm 2025',
    excerpt: 'Báo cáo mới từ Decision Lab cho thấy ChatGPT đang là công cụ AI được người Việt sử dụng và hài lòng nhất trong năm 2025. Không chỉ vượt xa các "ông lớn" quốc tế như Gemini hay Meta AI, ChatGPT còn chứng minh vai trò trợ thủ đa năng trong học tập, công việc và đời sống thường ngày.',
    slug: 'chatgpt-cong-cu-ai-duoc-nguoi-viet-ua-chuong-2025',
    featuredImage: '/assets/img/blog/chatgpt-cong-cu-ai-duoc-nguoi-viet-ua-chuong-2025/image1.png',
    publishedAt: new Date('2025-10-18'),
    readTime: '8 phút đọc'
  },
  {
    id: 20,
    title: 'Tương lai của agency sáng tạo 2030: AI là chất xúc tác, con người là nền móng',
    excerpt: 'Cuộc đua AI trong ngành agency sáng tạo đang nóng hơn bao giờ hết. Nhưng theo các chuyên gia, đến năm 2030, AI sẽ chỉ đóng vai trò như chất xúc tác, trong khi con người và văn hoá tổ chức mới là nền móng quyết định sự bền vững.',
    slug: 'tuong-lai-agency-sang-tao-ai-2030',
    featuredImage: '/assets/img/blog/tuong-lai-agency-sang-tao-ai-2030/image1.png',
    publishedAt: new Date('2025-10-21'),
    readTime: '12 phút đọc'
  }
]
