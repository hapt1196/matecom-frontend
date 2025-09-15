# CMS Phase 1 Implementation Guide

## 🎯 Mục tiêu Phase 1
Triển khai hệ thống CMS cơ bản cho MATECOM với khả năng quản lý nội dung động cho website frontend.

## 📋 Yêu cầu chức năng
- [ ] Quản lý CMS Pages (trang)
- [ ] Quản lý CMS Blocks (khối nội dung)
- [ ] Quản lý CMS Media (hình ảnh, file)
- [ ] API endpoints cơ bản
- [ ] File upload system
- [ ] Database schema hoàn chỉnh

## 🗄️ Database Schema

### 1. Tạo bảng cms_pages
```sql
CREATE TABLE cms_pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL,
    title TEXT NOT NULL,
    meta_title TEXT,
    meta_description TEXT,
    meta_keywords TEXT,
    content TEXT,
    template TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Draft',
    lang TEXT NOT NULL DEFAULT 'vi',
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,
    created_by UUID REFERENCES users(id),
    updated_by UUID REFERENCES users(id)
);

-- Indexes
CREATE INDEX idx_cms_pages_slug_lang ON cms_pages(slug, lang);
CREATE INDEX idx_cms_pages_template ON cms_pages(template);
CREATE INDEX idx_cms_pages_status ON cms_pages(status);
CREATE INDEX idx_cms_pages_is_active ON cms_pages(is_active);
CREATE UNIQUE INDEX idx_cms_pages_slug_lang_unique ON cms_pages(slug, lang) WHERE deleted_at IS NULL;
```

### 2. Tạo bảng cms_blocks
```sql
CREATE TABLE cms_blocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_id UUID NOT NULL REFERENCES cms_pages(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    title TEXT,
    description TEXT,
    image_url TEXT,
    link_url TEXT,
    sort_order INTEGER DEFAULT 0,
    meta_json JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_cms_blocks_page_id ON cms_blocks(page_id);
CREATE INDEX idx_cms_blocks_type ON cms_blocks(type);
CREATE INDEX idx_cms_blocks_sort_order ON cms_blocks(sort_order);
```

### 3. Tạo bảng cms_media
```sql
CREATE TABLE cms_media (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    file_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    alt_text TEXT,
    caption TEXT,
    type TEXT NOT NULL,
    thumbnail_path TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES users(id)
);

-- Indexes
CREATE INDEX idx_cms_media_type ON cms_media(type);
CREATE INDEX idx_cms_media_file_type ON cms_media(file_type);
CREATE INDEX idx_cms_media_created_by ON cms_media(created_by);
```

### 4. Migration Script
Tạo file: `Database/migrations/002_cms_schema.sql`

## 🏗️ Domain Layer

### 1. Enums
```csharp
// ContentStatus.cs (đã có)
public enum ContentStatus
{
    Draft,
    Published,
    Archived
}

// Thêm mới: MediaType.cs
public enum MediaType
{
    Image,
    Video,
    Document,
    Audio
}

// Thêm mới: PageTemplate.cs
public enum PageTemplate
{
    Home,
    About,
    Services,
    Partners,
    Blog,
    Contact
}
```

### 2. Entities
```csharp
// CmsPage.cs
public class CmsPage : BaseEntity
{
    public string Slug { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string? MetaTitle { get; set; }
    public string? MetaDescription { get; set; }
    public string? MetaKeywords { get; set; }
    public string? Content { get; set; }
    public string Template { get; set; } = string.Empty;
    public ContentStatus Status { get; set; }
    public string Lang { get; set; } = "vi";
    public int SortOrder { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime? PublishedAt { get; set; }
    public Guid? CreatedBy { get; set; }
    public Guid? UpdatedBy { get; set; }
    
    // Navigation properties
    public List<CmsBlock> Blocks { get; set; } = new();
}

// CmsBlock.cs
public class CmsBlock : BaseEntity
{
    public Guid PageId { get; set; }
    public string Type { get; set; } = string.Empty;
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? ImageUrl { get; set; }
    public string? LinkUrl { get; set; }
    public int SortOrder { get; set; }
    public string? MetaJson { get; set; }
}

// CmsMedia.cs
public class CmsMedia : BaseEntity
{
    public string FileName { get; set; } = string.Empty;
    public string FilePath { get; set; } = string.Empty;
    public string FileType { get; set; } = string.Empty;
    public long FileSize { get; set; }
    public string? AltText { get; set; }
    public string? Caption { get; set; }
    public MediaType Type { get; set; }
    public string? ThumbnailPath { get; set; }
    public Guid? CreatedBy { get; set; }
}
```

### 3. DTOs
```csharp
// CmsPageDto.cs
public class CmsPageDto
{
    public Guid Id { get; set; }
    public string Slug { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string? MetaTitle { get; set; }
    public string? MetaDescription { get; set; }
    public string? MetaKeywords { get; set; }
    public string? Content { get; set; }
    public string Template { get; set; } = string.Empty;
    public ContentStatus Status { get; set; }
    public string Lang { get; set; } = string.Empty;
    public int SortOrder { get; set; }
    public bool IsActive { get; set; }
    public DateTime? PublishedAt { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public List<CmsBlockDto> Blocks { get; set; } = new();
}

// CmsBlockDto.cs
public class CmsBlockDto
{
    public Guid Id { get; set; }
    public Guid PageId { get; set; }
    public string Type { get; set; } = string.Empty;
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? ImageUrl { get; set; }
    public string? LinkUrl { get; set; }
    public int SortOrder { get; set; }
    public string? MetaJson { get; set; }
}

// CmsMediaDto.cs
public class CmsMediaDto
{
    public Guid Id { get; set; }
    public string FileName { get; set; } = string.Empty;
    public string FilePath { get; set; } = string.Empty;
    public string FileType { get; set; } = string.Empty;
    public long FileSize { get; set; }
    public string? AltText { get; set; }
    public string? Caption { get; set; }
    public MediaType Type { get; set; }
    public string? ThumbnailPath { get; set; }
    public DateTime CreatedAt { get; set; }
}

// Request DTOs
public class CreateCmsPageDto
{
    public string Slug { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string? MetaTitle { get; set; }
    public string? MetaDescription { get; set; }
    public string? MetaKeywords { get; set; }
    public string? Content { get; set; }
    public string Template { get; set; } = string.Empty;
    public string Lang { get; set; } = "vi";
    public int SortOrder { get; set; }
    public List<CreateCmsBlockDto> Blocks { get; set; } = new();
}

public class UpdateCmsPageDto
{
    public string Title { get; set; } = string.Empty;
    public string? MetaTitle { get; set; }
    public string? MetaDescription { get; set; }
    public string? MetaKeywords { get; set; }
    public string? Content { get; set; }
    public string Template { get; set; } = string.Empty;
    public string Lang { get; set; } = "vi";
    public int SortOrder { get; set; }
    public bool IsActive { get; set; }
    public List<UpdateCmsBlockDto> Blocks { get; set; } = new();
}

public class CreateCmsBlockDto
{
    public string Type { get; set; } = string.Empty;
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? ImageUrl { get; set; }
    public string? LinkUrl { get; set; }
    public int SortOrder { get; set; }
    public string? MetaJson { get; set; }
}

public class UpdateCmsBlockDto
{
    public Guid Id { get; set; }
    public string Type { get; set; } = string.Empty;
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? ImageUrl { get; set; }
    public string? LinkUrl { get; set; }
    public int SortOrder { get; set; }
    public string? MetaJson { get; set; }
}

// Filter DTOs
public class CmsPageFilter
{
    public string? SearchTerm { get; set; }
    public string? Template { get; set; }
    public ContentStatus? Status { get; set; }
    public string? Lang { get; set; }
    public bool? IsActive { get; set; }
    public int Page { get; set; } = 1;
    public int Size { get; set; } = 20;
}

public class MediaFilter
{
    public string? SearchTerm { get; set; }
    public MediaType? Type { get; set; }
    public string? FileType { get; set; }
    public int Page { get; set; } = 1;
    public int Size { get; set; } = 20;
}
```

## 🔧 Repository Layer

### 1. Interfaces
```csharp
// ICmsRepo.cs
public interface ICmsRepo
{
    Task<CmsPage?> GetPageByIdAsync(Guid id);
    Task<CmsPage?> GetPageBySlugAsync(string slug, string lang);
    Task<PagedResult<CmsPage>> GetPagesAsync(CmsPageFilter filter);
    Task<Guid> CreatePageAsync(CmsPage page);
    Task<bool> UpdatePageAsync(CmsPage page);
    Task<bool> DeletePageAsync(Guid id);
    Task<List<CmsBlock>> GetPageBlocksAsync(Guid pageId);
    Task<bool> UpdatePageBlocksAsync(Guid pageId, List<CmsBlock> blocks);
    Task<bool> DeletePageBlocksAsync(Guid pageId);
}

// ICmsMediaRepo.cs
public interface ICmsMediaRepo
{
    Task<CmsMedia?> GetMediaByIdAsync(Guid id);
    Task<PagedResult<CmsMedia>> GetMediaAsync(MediaFilter filter);
    Task<Guid> CreateMediaAsync(CmsMedia media);
    Task<bool> DeleteMediaAsync(Guid id);
    Task<List<CmsMedia>> SearchMediaAsync(string searchTerm);
}
```

### 2. Implementations
```csharp
// CmsRepo.cs
public class CmsRepo : ICmsRepo
{
    private readonly IDbConnectionFactory _connectionFactory;
    
    public CmsRepo(IDbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }
    
    public async Task<CmsPage?> GetPageBySlugAsync(string slug, string lang)
    {
        const string sql = @"
            SELECT p.*, 
                   json_agg(
                       CASE WHEN b.id IS NOT NULL THEN
                           json_build_object(
                               'id', b.id,
                               'pageId', b.page_id,
                               'type', b.type,
                               'title', b.title,
                               'description', b.description,
                               'imageUrl', b.image_url,
                               'linkUrl', b.link_url,
                               'sortOrder', b.sort_order,
                               'metaJson', b.meta_json,
                               'createdAt', b.created_at,
                               'updatedAt', b.updated_at
                           )
                       END
                   ) FILTER (WHERE b.id IS NOT NULL) as blocks
            FROM cms_pages p
            LEFT JOIN cms_blocks b ON p.id = b.page_id
            WHERE p.slug = @slug AND p.lang = @lang AND p.is_active = true AND p.deleted_at IS NULL
            GROUP BY p.id";
            
        using var conn = await _connectionFactory.CreateConnectionAsync();
        var result = await conn.QueryFirstOrDefaultAsync<dynamic>(sql, new { slug, lang });
        
        if (result == null) return null;
        
        var page = new CmsPage
        {
            Id = result.id,
            Slug = result.slug,
            Title = result.title,
            MetaTitle = result.meta_title,
            MetaDescription = result.meta_description,
            MetaKeywords = result.meta_keywords,
            Content = result.content,
            Template = result.template,
            Status = Enum.Parse<ContentStatus>(result.status),
            Lang = result.lang,
            SortOrder = result.sort_order,
            IsActive = result.is_active,
            PublishedAt = result.published_at,
            CreatedAt = result.created_at,
            UpdatedAt = result.updated_at,
            CreatedBy = result.created_by,
            UpdatedBy = result.updated_by
        };
        
        if (result.blocks != null)
        {
            var blocks = JsonSerializer.Deserialize<List<CmsBlock>>(result.blocks.ToString());
            page.Blocks = blocks ?? new List<CmsBlock>();
        }
        
        return page;
    }
    
    public async Task<PagedResult<CmsPage>> GetPagesAsync(CmsPageFilter filter)
    {
        var whereConditions = new List<string> { "p.deleted_at IS NULL" };
        var parameters = new DynamicParameters();
        
        if (!string.IsNullOrEmpty(filter.SearchTerm))
        {
            whereConditions.Add("(p.title ILIKE @searchTerm OR p.slug ILIKE @searchTerm)");
            parameters.Add("@searchTerm", $"%{filter.SearchTerm}%");
        }
        
        if (!string.IsNullOrEmpty(filter.Template))
        {
            whereConditions.Add("p.template = @template");
            parameters.Add("@template", filter.Template);
        }
        
        if (filter.Status.HasValue)
        {
            whereConditions.Add("p.status = @status");
            parameters.Add("@status", filter.Status.Value.ToString());
        }
        
        if (!string.IsNullOrEmpty(filter.Lang))
        {
            whereConditions.Add("p.lang = @lang");
            parameters.Add("@lang", filter.Lang);
        }
        
        if (filter.IsActive.HasValue)
        {
            whereConditions.Add("p.is_active = @isActive");
            parameters.Add("@isActive", filter.IsActive.Value);
        }
        
        var whereClause = string.Join(" AND ", whereConditions);
        
        const string countSql = @"
            SELECT COUNT(*) FROM cms_pages p WHERE " + whereClause;
            
        const string dataSql = @"
            SELECT p.* FROM cms_pages p 
            WHERE " + whereClause + @"
            ORDER BY p.sort_order, p.created_at DESC
            LIMIT @size OFFSET @offset";
            
        parameters.Add("@size", filter.Size);
        parameters.Add("@offset", (filter.Page - 1) * filter.Size);
        
        using var conn = await _connectionFactory.CreateConnectionAsync();
        
        var totalCount = await conn.ExecuteScalarAsync<int>(countSql, parameters);
        var pages = await conn.QueryAsync<CmsPage>(dataSql, parameters);
        
        return new PagedResult<CmsPage>
        {
            Data = pages.ToList(),
            TotalCount = totalCount,
            Page = filter.Page,
            Size = filter.Size,
            TotalPages = (int)Math.Ceiling((double)totalCount / filter.Size)
        };
    }
    
    public async Task<Guid> CreatePageAsync(CmsPage page)
    {
        const string sql = @"
            INSERT INTO cms_pages (slug, title, meta_title, meta_description, meta_keywords, 
                                 content, template, status, lang, sort_order, is_active, 
                                 created_by, updated_by)
            VALUES (@slug, @title, @metaTitle, @metaDescription, @metaKeywords,
                   @content, @template, @status, @lang, @sortOrder, @isActive,
                   @createdBy, @updatedBy)
            RETURNING id";
            
        using var conn = await _connectionFactory.CreateConnectionAsync();
        return await conn.ExecuteScalarAsync<Guid>(sql, new
        {
            page.Slug,
            page.Title,
            metaTitle = page.MetaTitle,
            metaDescription = page.MetaDescription,
            metaKeywords = page.MetaKeywords,
            page.Content,
            page.Template,
            page.Status,
            page.Lang,
            sortOrder = page.SortOrder,
            isActive = page.IsActive,
            createdBy = page.CreatedBy,
            updatedBy = page.UpdatedBy
        });
    }
    
    // Implement các method còn lại...
}
```

## 🚀 Business Layer

### 1. Interfaces
```csharp
// ICmsService.cs
public interface ICmsService
{
    Task<CmsPageDto?> GetPageBySlugAsync(string slug, string lang);
    Task<PagedResult<CmsPageDto>> GetPagesAsync(CmsPageFilter filter);
    Task<CmsPageDto> CreatePageAsync(CreateCmsPageDto dto, Guid userId);
    Task<CmsPageDto> UpdatePageAsync(Guid id, UpdateCmsPageDto dto, Guid userId);
    Task<bool> DeletePageAsync(Guid id);
    Task<bool> PublishPageAsync(Guid id, Guid userId);
    Task<bool> ArchivePageAsync(Guid id, Guid userId);
}

// ICmsMediaService.cs
public interface ICmsMediaService
{
    Task<CmsMediaDto> UploadMediaAsync(IFormFile file, Guid userId);
    Task<bool> DeleteMediaAsync(Guid id);
    Task<PagedResult<CmsMediaDto>> GetMediaAsync(MediaFilter filter);
    Task<List<CmsMediaDto>> SearchMediaAsync(string searchTerm);
}
```

### 2. Implementations
```csharp
// CmsService.cs
public class CmsService : ICmsService
{
    private readonly ICmsRepo _cmsRepo;
    private readonly ILogger<CmsService> _logger;
    
    public CmsService(ICmsRepo cmsRepo, ILogger<CmsService> logger)
    {
        _cmsRepo = cmsRepo;
        _logger = logger;
    }
    
    public async Task<CmsPageDto?> GetPageBySlugAsync(string slug, string lang)
    {
        try
        {
            var page = await _cmsRepo.GetPageBySlugAsync(slug, lang);
            if (page == null) return null;
            
            return MapToDto(page);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting page by slug: {Slug}, lang: {Lang}", slug, lang);
            throw;
        }
    }
    
    public async Task<CmsPageDto> CreatePageAsync(CreateCmsPageDto dto, Guid userId)
    {
        try
        {
            // Validation
            if (string.IsNullOrEmpty(dto.Slug))
                throw new ArgumentException("Slug is required");
                
            if (string.IsNullOrEmpty(dto.Title))
                throw new ArgumentException("Title is required");
                
            if (string.IsNullOrEmpty(dto.Template))
                throw new ArgumentException("Template is required");
            
            // Check if slug already exists
            var existingPage = await _cmsRepo.GetPageBySlugAsync(dto.Slug, dto.Lang);
            if (existingPage != null)
                throw new InvalidOperationException($"Page with slug '{dto.Slug}' already exists");
            
            var page = new CmsPage
            {
                Slug = dto.Slug,
                Title = dto.Title,
                MetaTitle = dto.MetaTitle,
                MetaDescription = dto.MetaDescription,
                MetaKeywords = dto.MetaKeywords,
                Content = dto.Content,
                Template = dto.Template,
                Status = ContentStatus.Draft,
                Lang = dto.Lang,
                SortOrder = dto.SortOrder,
                IsActive = true,
                CreatedBy = userId,
                UpdatedBy = userId
            };
            
            var pageId = await _cmsRepo.CreatePageAsync(page);
            
            // Create blocks if any
            if (dto.Blocks.Any())
            {
                var blocks = dto.Blocks.Select(b => new CmsBlock
                {
                    PageId = pageId,
                    Type = b.Type,
                    Title = b.Title,
                    Description = b.Description,
                    ImageUrl = b.ImageUrl,
                    LinkUrl = b.LinkUrl,
                    SortOrder = b.SortOrder,
                    MetaJson = b.MetaJson
                }).ToList();
                
                await _cmsRepo.UpdatePageBlocksAsync(pageId, blocks);
            }
            
            return await GetPageBySlugAsync(page.Slug, page.Lang);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating page: {Slug}", dto.Slug);
            throw;
        }
    }
    
    private CmsPageDto MapToDto(CmsPage page)
    {
        return new CmsPageDto
        {
            Id = page.Id,
            Slug = page.Slug,
            Title = page.Title,
            MetaTitle = page.MetaTitle,
            MetaDescription = page.MetaDescription,
            MetaKeywords = page.MetaKeywords,
            Content = page.Content,
            Template = page.Template,
            Status = page.Status,
            Lang = page.Lang,
            SortOrder = page.SortOrder,
            IsActive = page.IsActive,
            PublishedAt = page.PublishedAt,
            CreatedAt = page.CreatedAt,
            UpdatedAt = page.UpdatedAt,
            Blocks = page.Blocks.Select(b => new CmsBlockDto
            {
                Id = b.Id,
                PageId = b.PageId,
                Type = b.Type,
                Title = b.Title,
                Description = b.Description,
                ImageUrl = b.ImageUrl,
                LinkUrl = b.LinkUrl,
                SortOrder = b.SortOrder,
                MetaJson = b.MetaJson
            }).ToList()
        };
    }
}
```

## 🌐 API Controllers

### 1. Public CMS API
```csharp
[ApiController]
[Route("api/cms")]
public class CmsController : ControllerBase
{
    private readonly ICmsService _cmsService;
    private readonly ILogger<CmsController> _logger;
    
    public CmsController(ICmsService cmsService, ILogger<CmsController> logger)
    {
        _cmsService = cmsService;
        _logger = logger;
    }
    
    [HttpGet("pages/{slug}")]
    public async Task<ActionResult<CmsPageDto>> GetPage(string slug, [FromQuery] string lang = "vi")
    {
        try
        {
            var page = await _cmsService.GetPageBySlugAsync(slug, lang);
            if (page == null)
                return NotFound();
                
            return Ok(page);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting page: {Slug}", slug);
            return StatusCode(500, "Internal server error");
        }
    }
    
    [HttpGet("pages")]
    public async Task<ActionResult<PagedResult<CmsPageDto>>> GetPages([FromQuery] CmsPageFilter filter)
    {
        try
        {
            var pages = await _cmsService.GetPagesAsync(filter);
            return Ok(pages);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting pages");
            return StatusCode(500, "Internal server error");
        }
    }
    
    [HttpGet("pages/home")]
    public async Task<ActionResult<CmsPageDto>> GetHomePage([FromQuery] string lang = "vi")
    {
        try
        {
            var page = await _cmsService.GetPageBySlugAsync("home", lang);
            if (page == null)
                return NotFound();
                
            return Ok(page);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting home page");
            return StatusCode(500, "Internal server error");
        }
    }
}
```

### 2. Admin CMS API
```csharp
[ApiController]
[Route("api/admin/cms")]
[Authorize(Roles = "Admin,Editor")]
public class AdminCmsController : ControllerBase
{
    private readonly ICmsService _cmsService;
    private readonly ILogger<AdminCmsController> _logger;
    
    public AdminCmsController(ICmsService cmsService, ILogger<AdminCmsController> logger)
    {
        _cmsService = cmsService;
        _logger = logger;
    }
    
    [HttpPost("pages")]
    public async Task<ActionResult<CmsPageDto>> CreatePage(CreateCmsPageDto dto)
    {
        try
        {
            var userId = GetCurrentUserId();
            var page = await _cmsService.CreatePageAsync(dto, userId);
            return CreatedAtAction(nameof(GetPage), new { id = page.Id }, page);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(ex.Message);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating page");
            return StatusCode(500, "Internal server error");
        }
    }
    
    [HttpPut("pages/{id}")]
    public async Task<ActionResult<CmsPageDto>> UpdatePage(Guid id, UpdateCmsPageDto dto)
    {
        try
        {
            var userId = GetCurrentUserId();
            var page = await _cmsService.UpdatePageAsync(id, dto, userId);
            return Ok(page);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating page: {Id}", id);
            return StatusCode(500, "Internal server error");
        }
    }
    
    [HttpDelete("pages/{id}")]
    public async Task<ActionResult> DeletePage(Guid id)
    {
        try
        {
            var success = await _cmsService.DeletePageAsync(id);
            if (!success)
                return NotFound();
                
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting page: {Id}", id);
            return StatusCode(500, "Internal server error");
        }
    }
    
    [HttpPost("pages/{id}/publish")]
    public async Task<ActionResult> PublishPage(Guid id)
    {
        try
        {
            var userId = GetCurrentUserId();
            var success = await _cmsService.PublishPageAsync(id, userId);
            if (!success)
                return NotFound();
                
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error publishing page: {Id}", id);
            return StatusCode(500, "Internal server error");
        }
    }
    
    private Guid GetCurrentUserId()
    {
        // Implement based on your authentication system
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !Guid.TryParse(userIdClaim.Value, out var userId))
            throw new UnauthorizedAccessException("Invalid user");
            
        return userId;
    }
}
```

## 📁 File Upload System

### 1. Media Controller
```csharp
[ApiController]
[Route("api/admin/cms")]
[Authorize(Roles = "Admin,Editor")]
public class CmsMediaController : ControllerBase
{
    private readonly ICmsMediaService _mediaService;
    private readonly ILogger<CmsMediaController> _logger;
    
    public CmsMediaController(ICmsMediaService mediaService, ILogger<CmsMediaController> logger)
    {
        _mediaService = mediaService;
        _logger = logger;
    }
    
    [HttpPost("media/upload")]
    public async Task<ActionResult<CmsMediaDto>> UploadMedia(IFormFile file)
    {
        try
        {
            if (file == null || file.Length == 0)
                return BadRequest("No file provided");
                
            if (file.Length > 10 * 1024 * 1024) // 10MB limit
                return BadRequest("File size too large. Maximum size is 10MB");
                
            var allowedTypes = new[] { ".jpg", ".jpeg", ".png", ".gif", ".pdf", ".doc", ".docx" };
            var fileExtension = Path.GetExtension(file.FileName).ToLowerInvariant();
            
            if (!allowedTypes.Contains(fileExtension))
                return BadRequest("File type not allowed");
                
            var userId = GetCurrentUserId();
            var media = await _mediaService.UploadMediaAsync(file, userId);
            
            return Ok(media);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error uploading media");
            return StatusCode(500, "Internal server error");
        }
    }
    
    [HttpGet("media")]
    public async Task<ActionResult<PagedResult<CmsMediaDto>>> GetMedia([FromQuery] MediaFilter filter)
    {
        try
        {
            var media = await _mediaService.GetMediaAsync(filter);
            return Ok(media);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting media");
            return StatusCode(500, "Internal server error");
        }
    }
    
    [HttpDelete("media/{id}")]
    public async Task<ActionResult> DeleteMedia(Guid id)
    {
        try
        {
            var success = await _mediaService.DeleteMediaAsync(id);
            if (!success)
                return NotFound();
                
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting media: {Id}", id);
            return StatusCode(500, "Internal server error");
        }
    }
    
    private Guid GetCurrentUserId()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null || !Guid.TryParse(userIdClaim.Value, out var userId))
            throw new UnauthorizedAccessException("Invalid user");
            
        return userId;
    }
}
```

## ⚙️ Dependency Injection

### 1. Cập nhật Program.cs
```csharp
// Repository Layer
builder.Services.AddScoped<ICmsRepo, CmsRepo>();
builder.Services.AddScoped<ICmsMediaRepo, CmsMediaRepo>();

// Business Layer
builder.Services.AddScoped<ICmsService, CmsService>();
builder.Services.AddScoped<ICmsMediaService, CmsMediaService>();

// File Upload Configuration
builder.Services.Configure<FileUploadOptions>(builder.Configuration.GetSection("FileUpload"));
```

### 2. File Upload Configuration
```json
// appsettings.json
{
  "FileUpload": {
    "MaxFileSize": 10485760,
    "AllowedExtensions": [".jpg", ".jpeg", ".png", ".gif", ".pdf", ".doc", ".docx"],
    "UploadPath": "wwwroot/uploads",
    "ThumbnailPath": "wwwroot/uploads/thumbnails"
  }
}
```

## 🧪 Testing

### 1. Swagger Documentation
Truy cập: `https://localhost:7001/swagger` để test API endpoints

### 2. Sample Requests

#### Tạo trang mới
```bash
curl -X POST "https://localhost:7001/api/admin/cms/pages" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "slug": "home",
    "title": "Trang chủ MATECOM",
    "template": "Home",
    "lang": "vi",
    "blocks": [
      {
        "type": "hero",
        "title": "Chào mừng đến với MATECOM",
        "description": "Giải pháp marketing số toàn diện",
        "sortOrder": 1
      }
    ]
  }'
```

#### Lấy trang theo slug
```bash
curl "https://localhost:7001/api/cms/pages/home?lang=vi"
```

#### Upload file
```bash
curl -X POST "https://localhost:7001/api/admin/cms/media/upload" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "file=@/path/to/image.jpg"
```

## 📋 Checklist hoàn thành

### Database
- [ ] Tạo migration script 002_cms_schema.sql
- [ ] Chạy migration trên database
- [ ] Tạo indexes cho performance

### Domain Layer
- [ ] Tạo enums: MediaType, PageTemplate
- [ ] Tạo entities: CmsPage, CmsBlock, CmsMedia
- [ ] Tạo DTOs cho request/response
- [ ] Tạo filter DTOs

### Repository Layer
- [ ] Tạo interfaces: ICmsRepo, ICmsMediaRepo
- [ ] Implement CmsRepo với Dapper
- [ ] Implement CmsMediaRepo
- [ ] Test database queries

### Business Layer
- [ ] Tạo interfaces: ICmsService, ICmsMediaService
- [ ] Implement CmsService
- [ ] Implement CmsMediaService
- [ ] Add validation logic

### API Controllers
- [ ] Tạo CmsController (public API)
- [ ] Tạo AdminCmsController (admin API)
- [ ] Tạo CmsMediaController (file upload)
- [ ] Add authorization attributes

### File Upload
- [ ] Cấu hình file upload trong appsettings.json
- [ ] Implement file storage logic
- [ ] Add file validation
- [ ] Generate thumbnails cho images

### Testing
- [ ] Test tất cả API endpoints
- [ ] Test file upload
- [ ] Test database operations
- [ ] Update Swagger documentation

## 🚀 Bước tiếp theo sau Phase 1

### Phase 2: Frontend Integration
- Cập nhật frontend để sử dụng CMS data
- Implement dynamic content loading
- Add cache layer

### Phase 3: Admin Panel
- Admin interface cho quản lý content
- Rich text editor
- Media library
- Preview functionality

### Phase 4: Advanced Features
- Versioning và rollback
- SEO optimization
- Multi-language support
- Performance monitoring

---

**Lưu ý:** Đảm bảo backup database trước khi chạy migration và test kỹ tất cả chức năng trước khi deploy production.
