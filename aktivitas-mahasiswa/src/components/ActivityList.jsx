import React from 'react';
import ActivityItem from './ActivityItem';

function ActivityList({ activities, onDelete, onToggle }) {
  
  if (activities.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
            <circle cx="28" cy="28" r="27" stroke="#2a2a3d" strokeWidth="2"/>
            <path d="M18 22h20M18 28h14M18 34h10" stroke="#3a3a5a" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="38" cy="35" r="7" fill="#1a1a26" stroke="#7c6aff" strokeWidth="1.5"/>
            <path d="M38 32v3.5l2 1.5" stroke="#7c6aff" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <p className="empty-title">Belum ada aktivitas</p>
        <p className="empty-sub">Tambahkan aktivitas pertamamu di atas ↑</p>
      </div>
    );
  }

  const done = activities.filter(a => a.done).length;
  const total = activities.length;

  return (
    <div className="activity-list">
      <div className="list-header">
        <span className="list-count">{total} Aktivitas</span>
        <span className="list-progress">{done}/{total} selesai</span>
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: total > 0 ? `${(done / total) * 100}%` : '0%' }}
        />
      </div>
      <div className="items-wrapper">
        {activities.map(activity => (
          <ActivityItem
            key={activity.id}
            activity={activity}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  );
}

export default ActivityList;
