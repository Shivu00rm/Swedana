import { useState, useEffect } from 'react';
import { 
  getAllSubmissions, 
  getSubmissionStats, 
  updateSubmissionStatus, 
  deleteSubmission,
  exportSubmissionsCSV,
  type FormSubmission 
} from '../utils/formStorage';
import { 
  Mail, 
  Phone, 
  User, 
  CheckCircle, 
  Eye, 
  Trash2, 
  Download,
  Filter,
  Search,
  RefreshCw,
  BarChart3,
  Package,
  MessageSquare,
  Users
} from 'lucide-react';

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    viewed: 0,
    responded: 0,
    orders: 0,
    contacts: 0,
    consultations: 0,
  });
  const [filter, setFilter] = useState<'all' | 'order' | 'contact' | 'consultation'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'viewed' | 'responded'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setSubmissions(getAllSubmissions());
    setStats(getSubmissionStats());
  };

  const handleStatusChange = (id: string, status: FormSubmission['status']) => {
    updateSubmissionStatus(id, status);
    loadData();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this submission?')) {
      deleteSubmission(id);
      loadData();
      if (selectedSubmission?.id === id) {
        setSelectedSubmission(null);
      }
    }
  };

  const handleExport = () => {
    const csv = exportSubmissionsCSV();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `swedana-submissions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredSubmissions = submissions.filter(s => {
    const matchesType = filter === 'all' || s.type === filter;
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    const matchesSearch = searchTerm === '' || 
      Object.values(s.data).some(v => 
        v.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesType && matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-red-500/20 text-red-400';
      case 'viewed': return 'bg-yellow-500/20 text-yellow-400';
      case 'responded': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'order': return Package;
      case 'contact': return MessageSquare;
      case 'consultation': return Users;
      default: return Mail;
    }
  };

  return (
    <div className="min-h-screen bg-zenith-black text-zenith-white">
      {/* Header */}
      <header className="bg-zenith-charcoal border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/favicon.png" alt="SWEDANA" className="w-10 h-10" />
            <div>
              <h1 className="font-display font-bold text-xl">SWEDANA Admin</h1>
              <p className="text-zenith-gray text-xs">Form Submissions Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-zenith-gold text-zenith-black rounded-lg font-medium text-sm hover:bg-zenith-gold/90 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
            <button 
              onClick={loadData}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg text-sm hover:bg-white/20 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-zenith-gray text-sm">Total</span>
              <BarChart3 className="w-5 h-5 text-zenith-gold" />
            </div>
            <p className="text-3xl font-bold">{stats.total}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-zenith-gray text-sm">New</span>
              <div className="w-2 h-2 rounded-full bg-red-500" />
            </div>
            <p className="text-3xl font-bold text-red-400">{stats.new}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-zenith-gray text-sm">Orders</span>
              <Package className="w-5 h-5 text-zenith-gold" />
            </div>
            <p className="text-3xl font-bold">{stats.orders}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-zenith-gray text-sm">Consultations</span>
              <Users className="w-5 h-5 text-zenith-gold" />
            </div>
            <p className="text-3xl font-bold">{stats.consultations}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2">
            <Filter className="w-4 h-4 text-zenith-gray" />
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value as any)}
              className="bg-transparent text-sm focus:outline-none"
            >
              <option value="all" className="bg-zenith-charcoal">All Types</option>
              <option value="order" className="bg-zenith-charcoal">Orders</option>
              <option value="contact" className="bg-zenith-charcoal">Contacts</option>
              <option value="consultation" className="bg-zenith-charcoal">Consultations</option>
            </select>
          </div>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2">
            <CheckCircle className="w-4 h-4 text-zenith-gray" />
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-transparent text-sm focus:outline-none"
            >
              <option value="all" className="bg-zenith-charcoal">All Status</option>
              <option value="new" className="bg-zenith-charcoal">New</option>
              <option value="viewed" className="bg-zenith-charcoal">Viewed</option>
              <option value="responded" className="bg-zenith-charcoal">Responded</option>
            </select>
          </div>
          <div className="flex-1 flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2">
            <Search className="w-4 h-4 text-zenith-gray" />
            <input
              type="text"
              placeholder="Search submissions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent text-sm w-full focus:outline-none"
            />
          </div>
        </div>

        {/* Submissions List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* List */}
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {filteredSubmissions.length === 0 ? (
              <div className="text-center py-12 text-zenith-gray">
                <Mail className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>No submissions found</p>
              </div>
            ) : (
              filteredSubmissions.map((submission) => {
                const TypeIcon = getTypeIcon(submission.type);
                return (
                  <div
                    key={submission.id}
                    onClick={() => {
                      setSelectedSubmission(submission);
                      if (submission.status === 'new') {
                        handleStatusChange(submission.id, 'viewed');
                      }
                    }}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      selectedSubmission?.id === submission.id
                        ? 'bg-zenith-gold/10 border-zenith-gold'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-zenith-gold/10 flex items-center justify-center">
                          <TypeIcon className="w-5 h-5 text-zenith-gold" />
                        </div>
                        <div>
                          <p className="font-medium capitalize">{submission.type}</p>
                          <p className="text-zenith-gray text-xs">
                            {new Date(submission.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs capitalize ${getStatusColor(submission.status)}`}>
                        {submission.status}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center gap-4 text-sm text-zenith-gray">
                      {submission.data.name && (
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {submission.data.name}
                        </span>
                      )}
                      {submission.data.email && (
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {submission.data.email}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Detail View */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            {selectedSubmission ? (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const TypeIcon = getTypeIcon(selectedSubmission.type);
                      return (
                        <div className="w-12 h-12 rounded-full bg-zenith-gold/10 flex items-center justify-center">
                          <TypeIcon className="w-6 h-6 text-zenith-gold" />
                        </div>
                      );
                    })()}
                    <div>
                      <p className="font-display font-bold text-lg capitalize">{selectedSubmission.type}</p>
                      <p className="text-zenith-gray text-sm">
                        {new Date(selectedSubmission.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={selectedSubmission.status}
                      onChange={(e) => handleStatusChange(selectedSubmission.id, e.target.value as any)}
                      className={`px-3 py-1 rounded-full text-xs capitalize border-0 ${getStatusColor(selectedSubmission.status)}`}
                    >
                      <option value="new" className="bg-zenith-charcoal text-white">New</option>
                      <option value="viewed" className="bg-zenith-charcoal text-white">Viewed</option>
                      <option value="responded" className="bg-zenith-charcoal text-white">Responded</option>
                    </select>
                    <button
                      onClick={() => handleDelete(selectedSubmission.id)}
                      className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {Object.entries(selectedSubmission.data).map(([key, value]) => (
                    <div key={key} className="border-b border-white/5 pb-3">
                      <p className="text-micro mb-1">{key.replace(/_/g, ' ').toUpperCase()}</p>
                      <p className="text-zenith-white">
                        {key === 'email' ? (
                          <a href={`mailto:${value}`} className="text-zenith-gold hover:underline">
                            {value}
                          </a>
                        ) : key === 'phone' ? (
                          <a href={`tel:${value}`} className="text-zenith-gold hover:underline">
                            {value}
                          </a>
                        ) : (
                          value
                        )}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  <p className="text-micro mb-2">QUICK ACTIONS</p>
                  <div className="flex gap-2">
                    {selectedSubmission.data.email && (
                      <a
                        href={`mailto:${selectedSubmission.data.email}`}
                        className="flex items-center gap-2 px-4 py-2 bg-zenith-gold text-zenith-black rounded-lg text-sm font-medium hover:bg-zenith-gold/90 transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        Reply via Email
                      </a>
                    )}
                    {selectedSubmission.data.phone && (
                      <a
                        href={`tel:${selectedSubmission.data.phone}`}
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg text-sm hover:bg-white/20 transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        Call
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-zenith-gray">
                <Eye className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p>Select a submission to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
