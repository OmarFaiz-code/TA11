import React, { useState } from 'react';
import ActivityList from './components/ActivityList';
import './App.css';

const CATEGORIES = ['Kuliah', 'Tugas', 'Organisasi', 'Olahraga', 'Belajar', 'Lainnya'];

const INITIAL_ACTIVITIES = [
  { id: 1, name: 'Kuliah Pemrograman Web', category: 'Kuliah', date: 'Senin, 26 Mei', done: true },
  { id: 2, name: 'Kumpul Laporan Praktikum', category: 'Tugas', date: 'Selasa, 27 Mei', done: false },
  { id: 3, name: 'Rapat BEM Divisi Akademik', category: 'Organisasi', date: 'Rabu, 28 Mei', done: false },
];


function App() {
  
  const [activities, setActivities] = useState(INITIAL_ACTIVITIES);

 
  const [inputName, setInputName] = useState('');
  const [inputCategory, setInputCategory] = useState('Kuliah');
  const [inputDate, setInputDate] = useState('');
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('Semua');

  const handleAdd = () => {
    if (!inputName.trim()) {
      setError('Nama aktivitas tidak boleh kosong!');
      return;
    }
    setError('');

    const today = new Date();
    const dateStr = inputDate
      ? new Date(inputDate).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })
      : today.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' });

    const newActivity = {
      id: Date.now(),
      name: inputName.trim(),
      category: inputCategory,
      date: dateStr,
      done: false,
    };

    setActivities(prev => [newActivity, ...prev]);
    setInputName('');
    setInputDate('');
  };

  const handleDelete = (id) => {
    setActivities(prev => prev.filter(a => a.id !== id));
  };

  const handleToggle = (id) => {
    setActivities(prev =>
      prev.map(a => a.id === id ? { ...a, done: !a.done } : a)
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd();
  };

  const filteredActivities = filter === 'Semua'
    ? activities
    : filter === 'Selesai'
      ? activities.filter(a => a.done)
      : filter === 'Belum'
        ? activities.filter(a => !a.done)
        : activities.filter(a => a.category === filter);

  const doneCount = activities.filter(a => a.done).length;

  return (
    <div className="app">
      {/* Background decoration */}
      <div className="bg-orb orb-1" />
      <div className="bg-orb orb-2" />
      <div className="bg-orb orb-3" />

      <div className="container">
        {/* Header */}
        <header className="app-header">
          <div className="header-tag">🎓 Manajemen Studi</div>
          <h1 className="app-title">Aktivitas<br /><span>Mahasiswa</span></h1>
          <p className="app-subtitle">
            Kelola jadwal & kegiatanmu dengan rapi
          </p>
          <div className="stats-row">
            <div className="stat">
              <span className="stat-num">{activities.length}</span>
              <span className="stat-label">Total</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num" style={{ color: 'var(--success)' }}>{doneCount}</span>
              <span className="stat-label">Selesai</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num" style={{ color: 'var(--accent-2)' }}>{activities.length - doneCount}</span>
              <span className="stat-label">Pending</span>
            </div>
          </div>
        </header>

        {/* Add Form */}
        <div className="form-card">
          <h2 className="form-title">+ Tambah Aktivitas</h2>
          <div className="form-row">
            <input
              className={`form-input${error ? ' input-error' : ''}`}
              type="text"
              placeholder="Nama aktivitas..."
              value={inputName}
              onChange={e => { setInputName(e.target.value); setError(''); }}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="form-row form-row-2">
            <select
              className="form-select"
              value={inputCategory}
              onChange={e => setInputCategory(e.target.value)}
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <input
              className="form-input"
              type="date"
              value={inputDate}
              onChange={e => setInputDate(e.target.value)}
            />
          </div>
          {error && <p className="error-msg">⚠ {error}</p>}
          <button className="add-btn" onClick={handleAdd}>
            <span>Tambahkan</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Filter Bar */}
        <div className="filter-bar">
          {['Semua', 'Belum', 'Selesai', ...CATEGORIES].map(f => (
            <button
              key={f}
              className={`filter-btn${filter === f ? ' active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Activity List — Child Component menerima data via props */}
        <ActivityList
          activities={filteredActivities}
          onDelete={handleDelete}
          onToggle={handleToggle}
        />
      </div>
    </div>
  );
}

export default App;
