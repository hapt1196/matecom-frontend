<template>
  <div class="business-app">
    <!-- Business App Header -->
    <header class="business-header">
      <div class="header-content">
        <div class="header-left">
          <div class="logo-section">
            <img src="@/assets/matecom_logo_transparent.png" alt="MATECOM" class="logo" />
            <span class="app-title">Business CRM</span>
          </div>
        </div>
        
        <div class="header-right">
          <div class="user-section">
            <div class="user-info">
              <span class="user-name">{{ userInfo?.fullName || 'Admin User' }}</span>
              <span class="user-role">{{ userInfo?.role || 'Manager' }}</span>
            </div>
            <div class="user-menu">
              <button class="user-avatar" @click="showUserMenu = !showUserMenu">
                <User class="w-6 h-6" />
              </button>
              <div v-if="showUserMenu" class="user-dropdown">
                <div class="dropdown-item">
                  <span class="dropdown-label">Tài khoản:</span>
                  <span class="dropdown-value">{{ userInfo?.username }}</span>
                </div>
                <div class="dropdown-item">
                  <span class="dropdown-label">Email:</span>
                  <span class="dropdown-value">{{ userInfo?.email }}</span>
                </div>
                <div class="dropdown-divider"></div>
                <button class="dropdown-button" @click="handleLogout">
                  <LogOut class="w-4 h-4" />
                  Đăng xuất
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="business-main">
      <!-- Sidebar Navigation -->
      <aside class="sidebar">
        <nav class="sidebar-nav">
          <button 
            v-for="nav in navigationItems" 
            :key="nav.id"
            @click="activeTab = nav.id"
            :class="['nav-item', { active: activeTab === nav.id }]"
          >
            <component :is="nav.icon" class="nav-icon" />
            <span class="nav-label">{{ nav.label }}</span>
          </button>
        </nav>
      </aside>

      <!-- Content Area -->
      <div class="content-area">
        <div class="content-container">
          <!-- Dashboard Tab -->
          <div v-if="activeTab === 'dashboard'" class="tab-content">
            <DashboardTab />
          </div>
          
          <!-- Leads Tab -->
          <div v-if="activeTab === 'leads'" class="tab-content">
            <LeadsTab />
          </div>
          
          <!-- Contacts Tab -->
          <div v-if="activeTab === 'contacts'" class="tab-content">
            <ContactsTab />
          </div>
          
          <!-- Projects Tab -->
          <div v-if="activeTab === 'projects'" class="tab-content">
            <ProjectsTab />
          </div>
          
          <!-- CMS Pages Tab -->
          <div v-if="activeTab === 'cms-pages'" class="tab-content">
            <CmsPagesTab />
          </div>
          
          <!-- Analytics Tab -->
          <div v-if="activeTab === 'analytics'" class="tab-content">
            <AnalyticsTab />
          </div>
          
          <!-- Settings Tab -->
          <div v-if="activeTab === 'settings'" class="tab-content">
            <SettingsTab />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { 
  User, 
  BarChart3, 
  Users, 
  FolderOpen, 
  TrendingUp, 
  Settings,
  Phone,
  LogOut,
  FileText
} from 'lucide-vue-next'

// Import tab components
import DashboardTab from '@/components/business/DashboardTab.vue'
import LeadsTab from '@/components/business/LeadsTab.vue'
import ProjectsTab from '@/components/business/ProjectsTab.vue'
import AnalyticsTab from '@/components/business/AnalyticsTab.vue'
import SettingsTab from '@/components/business/SettingsTab.vue'
import ContactsTab from '@/components/business/ContactsTab.vue'
import CmsPagesTab from '@/components/business/CmsPagesTab.vue'

// Import auth service
import { getUserInfo, logout } from '@/services/authService'

const activeTab = ref('dashboard')
const showUserMenu = ref(false)
const userInfo = ref(null)

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'leads', label: 'Leads', icon: Users },
  { id: 'contacts', label: 'Khách hàng tiềm năng', icon: Phone },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'cms-pages', label: 'CMS Pages', icon: FileText },
  { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  { id: 'settings', label: 'Settings', icon: Settings }
]

// Đóng dropdown khi click ra ngoài
const handleClickOutside = (event) => {
  if (!event.target.closest('.user-menu')) {
    showUserMenu.value = false
  }
}

const handleLogout = () => {
  logout()
}

onMounted(() => {
  // Lấy thông tin user từ localStorage
  userInfo.value = getUserInfo()
  
  // Thêm event listener để đóng dropdown
  document.addEventListener('click', handleClickOutside)
  
  console.log('Business CRM App initialized')
})

onUnmounted(() => {
  // Xóa event listener
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.business-app {
  min-height: 100vh;
  background: #f8fafc;
  display: flex;
  flex-direction: column;
}

/* Header Styles */
.business-header {
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 100%;
  margin: 0;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-left {
  display: flex;
  align-items: center;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  height: 32px;
  width: auto;
}

.app-title {
  font-family: var(--font-family-heading);
  font-size: 20px;
  font-weight: 700;
  color: #1e3a8a;
}

.header-right {
  display: flex;
  align-items: center;
}

.user-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
}

.user-name {
  font-size: 14px;
  font-weight: 600;
  color: #1e293b;
}

.user-role {
  font-size: 12px;
  color: #64748b;
}

.user-menu {
  position: relative;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #1e3a8a;
  color: #ffffff;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.user-avatar:hover {
  background: #1e40af;
  transform: scale(1.05);
}

.user-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  z-index: 1000;
  animation: slideDown 0.2s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-item {
  padding: 12px 16px;
  border-bottom: 1px solid #f1f5f9;
}

.dropdown-item:last-child {
  border-bottom: none;
}

.dropdown-label {
  display: block;
  font-size: 12px;
  color: #64748b;
  font-weight: 500;
  margin-bottom: 4px;
}

.dropdown-value {
  display: block;
  font-size: 14px;
  color: #1e293b;
  font-weight: 600;
}

.dropdown-divider {
  height: 1px;
  background: #e2e8f0;
  margin: 8px 0;
}

.dropdown-button {
  width: 100%;
  padding: 12px 16px;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #ef4444;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.dropdown-button:hover {
  background: #fef2f2;
}

/* Main Content */
.business-main {
  flex: 1;
  display: flex;
  overflow: hidden;
}

/* Sidebar */
.sidebar {
  width: 280px;
  background: #ffffff;
  border-right: 1px solid #e2e8f0;
  flex-shrink: 0;
  overflow-y: auto;
}

.sidebar-nav {
  padding: 24px 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 24px;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  font-weight: 500;
  color: #64748b;
  text-align: left;
}

.nav-item:hover {
  background: #f8fafc;
  color: #475569;
}

.nav-item.active {
  background: #1e3a8a;
  color: #ffffff;
  border-right: 3px solid #1e40af;
}

.nav-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.nav-label {
  font-weight: 500;
}

/* Content Area */
.content-area {
  flex: 1;
  overflow: hidden;
  background: #f8fafc;
}

.content-container {
  height: 100%;
  overflow-y: auto;
  padding: 24px;
}

.tab-content {
  height: 100%;
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .header-content {
    padding: 0 16px;
  }
  
  .content-container {
    padding: 16px;
  }
  
  .app-title {
    display: none;
  }
  
  .sidebar {
    width: 240px;
  }
}

@media (max-width: 768px) {
  .header-content {
    height: 56px;
    padding: 0 12px;
  }
  
  .sidebar {
    width: 200px;
  }
  
  .nav-item {
    padding: 10px 16px;
    font-size: 13px;
  }
  
  .nav-label {
    font-size: 13px;
  }
  
  .user-info {
    display: none;
  }
  
  .content-container {
    padding: 12px;
  }
}

@media (max-width: 640px) {
  .business-main {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    height: auto;
    border-right: none;
    border-bottom: 1px solid #e2e8f0;
  }
  
  .sidebar-nav {
    display: flex;
    padding: 12px 0;
    overflow-x: auto;
  }
  
  .nav-item {
    flex-shrink: 0;
    padding: 8px 16px;
    white-space: nowrap;
  }
  
  .content-container {
    padding: 8px;
  }
}

@media (max-width: 480px) {
  .header-content {
    padding: 0 8px;
  }
  
  .content-container {
    padding: 8px;
  }
  
  .nav-item {
    padding: 6px 12px;
    font-size: 12px;
  }
}
</style>
