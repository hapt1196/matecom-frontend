<template>
  <div class="settings-tab">
    <div class="settings-header">
      <h1 class="settings-title">Settings</h1>
      <p class="settings-subtitle">Cài đặt hệ thống</p>
    </div>
    
    <div class="settings-content">
      <p>Settings content will be implemented here...</p>
    </div>
  </div>
</template>

<script setup>
// Settings logic will be implemented here
</script>

<style scoped>
.settings-tab {
  height: 100%;
  overflow-y: auto;
}

.settings-header {
  margin-bottom: 32px;
}

.settings-title {
  font-size: 32px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 8px 0;
}

.settings-subtitle {
  font-size: 16px;
  color: #64748b;
  margin: 0;
}

.settings-content {
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
}
</style>
