<template>
  <div class="projects-tab">
    <div class="projects-header">
      <h1 class="projects-title">Projects Management</h1>
      <p class="projects-subtitle">Quản lý dự án</p>
    </div>
    
    <div class="projects-content">
      <p>Projects content will be implemented here...</p>
    </div>
  </div>
</template>

<script setup>
// Projects logic will be implemented here
</script>

<style scoped>
.projects-tab {
  height: 100%;
  overflow-y: auto;
}

.projects-header {
  margin-bottom: 32px;
}

.projects-title {
  font-size: 32px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 8px 0;
}

.projects-subtitle {
  font-size: 16px;
  color: #64748b;
  margin: 0;
}

.projects-content {
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
}
</style>
