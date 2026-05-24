import React, { useState } from 'react';

const CATEGORY_COLORS = {
  'Kuliah': '#7c6aff',
  'Tugas': '#ff6a9e',
  'Organisasi': '#6affda',
  'Olahraga': '#ffb86a',
  'Belajar': '#6aaeff',
  'Lainnya': '#c86aff',
};

function ActivityItem({ activity, onDelete, onToggle }) {
  const [hovered, setHovered] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const color = CATEGORY_COLORS[activity.category] || '#7c6aff';

  const handleDelete = () => {
    setDeleting(true);
    setTimeout(() => onDelete(activity.id), 320);
  };

  return (
    <div
      className={`activity-item${activity.done ? ' done' : ''}${deleting ? ' deleting' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ '--item-color': color }}
    >
      <div className="item-left">
        <button
          className={`check-btn${activity.done ? ' checked' : ''}`}
          onClick={() => onToggle(activity.id)}
          title={activity.done ? 'Tandai belum selesai' : 'Tandai selesai'}
        >
          {activity.done && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
        <div className="item-content">
          <span className="item-name">{activity.name}</span>
          <div className="item-meta">
            <span className="category-badge" style={{ background: color + '22', color }}>
              {activity.category}
            </span>
            <span className="item-date">{activity.date}</span>
          </div>
        </div>
      </div>
      <button
        className={`delete-btn${hovered ? ' visible' : ''}`}
        onClick={handleDelete}
        title="Hapus aktivitas"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  );
}

export default ActivityItem;
