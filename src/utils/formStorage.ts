// Form Submission Storage System
// Stores all form submissions in localStorage for admin viewing

export interface FormSubmission {
  id: string;
  type: 'order' | 'contact' | 'consultation';
  timestamp: number;
  data: Record<string, string>;
  status: 'new' | 'viewed' | 'responded';
}

const STORAGE_KEY = 'swedana_form_submissions';

// Save a new form submission
export const saveSubmission = (type: FormSubmission['type'], data: Record<string, string>): FormSubmission => {
  const submission: FormSubmission = {
    id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type,
    timestamp: Date.now(),
    data,
    status: 'new',
  };

  const existing = getAllSubmissions();
  existing.unshift(submission); // Add to beginning
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (e) {
    console.error('Failed to save submission:', e);
  }

  return submission;
};

// Get all submissions
export const getAllSubmissions = (): FormSubmission[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error('Failed to get submissions:', e);
    return [];
  }
};

// Get submissions by type
export const getSubmissionsByType = (type: FormSubmission['type']): FormSubmission[] => {
  return getAllSubmissions().filter(s => s.type === type);
};

// Update submission status
export const updateSubmissionStatus = (id: string, status: FormSubmission['status']): boolean => {
  const submissions = getAllSubmissions();
  const index = submissions.findIndex(s => s.id === id);
  
  if (index !== -1) {
    submissions[index].status = status;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
      return true;
    } catch (e) {
      console.error('Failed to update submission:', e);
    }
  }
  
  return false;
};

// Delete a submission
export const deleteSubmission = (id: string): boolean => {
  const submissions = getAllSubmissions();
  const filtered = submissions.filter(s => s.id !== id);
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (e) {
    console.error('Failed to delete submission:', e);
    return false;
  }
};

// Get submission statistics
export const getSubmissionStats = () => {
  const all = getAllSubmissions();
  
  return {
    total: all.length,
    new: all.filter(s => s.status === 'new').length,
    viewed: all.filter(s => s.status === 'viewed').length,
    responded: all.filter(s => s.status === 'responded').length,
    orders: all.filter(s => s.type === 'order').length,
    contacts: all.filter(s => s.type === 'contact').length,
    consultations: all.filter(s => s.type === 'consultation').length,
  };
};

// Export submissions as CSV
export const exportSubmissionsCSV = (): string => {
  const submissions = getAllSubmissions();
  
  if (submissions.length === 0) {
    return 'No submissions found';
  }

  // Get all unique keys from all submissions
  const allKeys = new Set<string>();
  submissions.forEach(s => Object.keys(s.data).forEach(k => allKeys.add(k)));
  const headers = ['ID', 'Type', 'Date', 'Status', ...Array.from(allKeys)];
  
  const rows = submissions.map(s => [
    s.id,
    s.type,
    new Date(s.timestamp).toLocaleString(),
    s.status,
    ...Array.from(allKeys).map(k => s.data[k] || ''),
  ]);
  
  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
};

// Clear all submissions (use with caution!)
export const clearAllSubmissions = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear submissions:', e);
  }
};

export default {
  saveSubmission,
  getAllSubmissions,
  getSubmissionsByType,
  updateSubmissionStatus,
  deleteSubmission,
  getSubmissionStats,
  exportSubmissionsCSV,
  clearAllSubmissions,
};
