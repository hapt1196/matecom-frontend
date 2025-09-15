<template>
  <div class="leads-tab">
    <!-- Leads Header -->
    <div class="leads-header">
      <div class="header-left">
        <h1 class="leads-title">Leads Management</h1>
        <p class="leads-subtitle">Quản lý khách hàng tiềm năng</p>
      </div>
      <div class="header-right">
        <button class="add-lead-btn" @click="showAddLeadModal = true">
          <Plus class="w-5 h-5" />
          Add Lead
        </button>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="filters-section">
      <div class="search-box">
        <Search class="w-5 h-5 text-gray-400" />
        <input 
          v-model="searchTerm" 
          type="text" 
          placeholder="Search leads..." 
          class="search-input"
        />
      </div>
      
      <div class="filter-buttons">
        <button 
          v-for="status in leadStatuses" 
          :key="status.value"
          @click="selectedStatus = status.value"
          :class="['filter-btn', { active: selectedStatus === status.value }]"
        >
          {{ status.label }}
        </button>
      </div>
    </div>

    <!-- Leads Table -->
    <div class="leads-table-container">
      <div class="table-wrapper">
        <table class="leads-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Source</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="lead in filteredLeads" :key="lead.id">
              <td>
                <div class="lead-cell">
                  <div class="lead-avatar">{{ lead.name.charAt(0) }}</div>
                  <div class="lead-info">
                    <div class="lead-name">{{ lead.name }}</div>
                    <div class="lead-company">{{ lead.company }}</div>
                  </div>
                </div>
              </td>
              <td>{{ lead.email }}</td>
              <td>{{ lead.phone }}</td>
              <td>
                <span class="source-badge">{{ lead.source }}</span>
              </td>
              <td>
                <select 
                  :value="lead.status" 
                  @change="updateLeadStatus(lead.id, $event.target.value)"
                  class="status-select"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Won">Won</option>
                  <option value="Lost">Lost</option>
                </select>
              </td>
              <td>{{ formatDate(lead.createdAt) }}</td>
              <td>
                <div class="action-buttons">
                  <button class="action-btn edit" @click="editLead(lead)">
                    <Edit class="w-4 h-4" />
                  </button>
                  <button class="action-btn delete" @click="deleteLead(lead.id)">
                    <Trash2 class="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add Lead Modal -->
    <div v-if="showAddLeadModal" class="modal-overlay" @click="showAddLeadModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3 class="modal-title">Add New Lead</h3>
          <button class="modal-close" @click="showAddLeadModal = false">
            <X class="w-6 h-6" />
          </button>
        </div>
        
        <form @submit.prevent="addLead" class="modal-form">
          <div class="form-group">
            <label class="form-label">Name *</label>
            <input v-model="newLead.name" type="text" class="form-input" required />
          </div>
          
          <div class="form-group">
            <label class="form-label">Email *</label>
            <input v-model="newLead.email" type="email" class="form-input" required />
          </div>
          
          <div class="form-group">
            <label class="form-label">Phone</label>
            <input v-model="newLead.phone" type="tel" class="form-input" />
          </div>
          
          <div class="form-group">
            <label class="form-label">Company</label>
            <input v-model="newLead.company" type="text" class="form-input" />
          </div>
          
          <div class="form-group">
            <label class="form-label">Source</label>
            <select v-model="newLead.source" class="form-input">
              <option value="Website">Website</option>
              <option value="Social Media">Social Media</option>
              <option value="Referral">Referral</option>
              <option value="Cold Call">Cold Call</option>
              <option value="Email">Email</option>
            </select>
          </div>
          
          <div class="form-group">
            <label class="form-label">Notes</label>
            <textarea v-model="newLead.notes" class="form-input" rows="3"></textarea>
          </div>
          
          <div class="modal-actions">
            <button type="button" class="btn-secondary" @click="showAddLeadModal = false">
              Cancel
            </button>
            <button type="submit" class="btn-primary">
              Add Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  X 
} from 'lucide-vue-next'

const searchTerm = ref('')
const selectedStatus = ref('All')
const showAddLeadModal = ref(false)

const newLead = ref({
  name: '',
  email: '',
  phone: '',
  company: '',
  source: 'Website',
  notes: ''
})

const leadStatuses = [
  { value: 'All', label: 'All Leads' },
  { value: 'New', label: 'New' },
  { value: 'Contacted', label: 'Contacted' },
  { value: 'Qualified', label: 'Qualified' },
  { value: 'Won', label: 'Won' },
  { value: 'Lost', label: 'Lost' }
]

const leads = ref([
  {
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@email.com',
    phone: '0123456789',
    company: 'ABC Company',
    source: 'Website',
    status: 'New',
    notes: 'Interested in digital marketing services',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    name: 'Trần Thị B',
    email: 'tranthib@email.com',
    phone: '0987654321',
    company: 'XYZ Corp',
    source: 'Social Media',
    status: 'Contacted',
    notes: 'Follow up next week',
    createdAt: '2024-01-14T14:20:00Z'
  },
  {
    id: 3,
    name: 'Lê Văn C',
    email: 'levanc@email.com',
    phone: '0369852147',
    company: 'DEF Ltd',
    source: 'Referral',
    status: 'Qualified',
    notes: 'High potential client',
    createdAt: '2024-01-13T09:15:00Z'
  },
  {
    id: 4,
    name: 'Phạm Thị D',
    email: 'phamthid@email.com',
    phone: '0741258963',
    company: 'GHI Inc',
    source: 'Email',
    status: 'Won',
    notes: 'Contract signed',
    createdAt: '2024-01-12T16:45:00Z'
  },
  {
    id: 5,
    name: 'Hoàng Văn E',
    email: 'hoangvane@email.com',
    phone: '0852369741',
    company: 'JKL Co',
    source: 'Cold Call',
    status: 'Lost',
    notes: 'Not interested',
    createdAt: '2024-01-11T11:30:00Z'
  }
])

const filteredLeads = computed(() => {
  let filtered = leads.value

  // Filter by search term
  if (searchTerm.value) {
    const search = searchTerm.value.toLowerCase()
    filtered = filtered.filter(lead => 
      lead.name.toLowerCase().includes(search) ||
      lead.email.toLowerCase().includes(search) ||
      lead.company.toLowerCase().includes(search)
    )
  }

  // Filter by status
  if (selectedStatus.value !== 'All') {
    filtered = filtered.filter(lead => lead.status === selectedStatus.value)
  }

  return filtered
})

const addLead = () => {
  const lead = {
    id: Date.now(),
    ...newLead.value,
    status: 'New',
    createdAt: new Date().toISOString()
  }
  
  leads.value.unshift(lead)
  newLead.value = {
    name: '',
    email: '',
    phone: '',
    company: '',
    source: 'Website',
    notes: ''
  }
  showAddLeadModal.value = false
}

const updateLeadStatus = (leadId, newStatus) => {
  const lead = leads.value.find(l => l.id === leadId)
  if (lead) {
    lead.status = newStatus
  }
}

const editLead = (lead) => {
  // TODO: Implement edit functionality
  console.log('Edit lead:', lead)
}

const deleteLead = (leadId) => {
  if (confirm('Are you sure you want to delete this lead?')) {
    leads.value = leads.value.filter(l => l.id !== leadId)
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('vi-VN')
}
</script>

<style scoped>
.leads-tab {
  height: 100%;
  overflow-y: auto;
}

.leads-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
}

.header-left {
  flex: 1;
}

.leads-title {
  font-size: 32px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 8px 0;
}

.leads-subtitle {
  font-size: 16px;
  color: #64748b;
  margin: 0;
}

.add-lead-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #1e3a8a;
  color: #ffffff;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-lead-btn:hover {
  background: #1e40af;
  transform: translateY(-1px);
}

.filters-section {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 24px;
  padding: 20px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
}

.search-box {
  position: relative;
  flex: 1;
  max-width: 400px;
}

.search-box .search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
}

.search-input {
  width: 100%;
  padding: 12px 12px 12px 40px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 14px;
  background: #f8fafc;
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: #1e3a8a;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1);
}

.filter-buttons {
  display: flex;
  gap: 8px;
}

.filter-btn {
  padding: 8px 16px;
  border: 1px solid #e2e8f0;
  background: #ffffff;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #64748b;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-btn:hover {
  background: #f1f5f9;
  color: #475569;
}

.filter-btn.active {
  background: #1e3a8a;
  color: #ffffff;
  border-color: #1e3a8a;
}

.leads-table-container {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  overflow: hidden;
}

.table-wrapper {
  overflow-x: auto;
}

.leads-table {
  width: 100%;
  border-collapse: collapse;
}

.leads-table th {
  background: #f8fafc;
  padding: 16px;
  text-align: left;
  font-size: 14px;
  font-weight: 600;
  color: #64748b;
  border-bottom: 1px solid #e2e8f0;
}

.leads-table td {
  padding: 16px;
  border-bottom: 1px solid #f1f5f9;
  font-size: 14px;
  color: #475569;
}

.leads-table tr:hover {
  background: #f8fafc;
}

.lead-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.lead-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #1e3a8a;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  flex-shrink: 0;
}

.lead-info {
  display: flex;
  flex-direction: column;
}

.lead-name {
  font-weight: 600;
  color: #1e293b;
}

.lead-company {
  font-size: 12px;
  color: #64748b;
}

.source-badge {
  padding: 4px 8px;
  background: #f1f5f9;
  color: #475569;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
}

.status-select {
  padding: 6px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  background: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;
}

.status-select:focus {
  outline: none;
  border-color: #1e3a8a;
  box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1);
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.action-btn {
  width: 32px;
  height: 32px;
  border: 1px solid #e2e8f0;
  background: #ffffff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: #f1f5f9;
}

.action-btn.edit:hover {
  color: #1e3a8a;
  border-color: #1e3a8a;
}

.action-btn.delete:hover {
  color: #dc2626;
  border-color: #dc2626;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #ffffff;
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 24px 0 24px;
}

.modal-title {
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
}

.modal-close {
  width: 32px;
  height: 32px;
  border: none;
  background: #f1f5f9;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #64748b;
  transition: all 0.2s ease;
}

.modal-close:hover {
  background: #e2e8f0;
  color: #475569;
}

.modal-form {
  padding: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  background: #ffffff;
  transition: all 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: #1e3a8a;
  box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1);
}

.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 24px;
}

.btn-secondary {
  padding: 12px 24px;
  border: 1px solid #e2e8f0;
  background: #ffffff;
  color: #64748b;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: #f1f5f9;
  color: #475569;
}

.btn-primary {
  padding: 12px 24px;
  border: none;
  background: #1e3a8a;
  color: #ffffff;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary:hover {
  background: #1e40af;
}

/* Responsive Design */
@media (max-width: 768px) {
  .leads-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .filters-section {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }
  
  .filter-buttons {
    flex-wrap: wrap;
  }
  
  .leads-table {
    font-size: 12px;
  }
  
  .leads-table th,
  .leads-table td {
    padding: 12px 8px;
  }
}
</style>
