'use client';

import { useState } from 'react';

type SkillCardProps = {
  title: string;
  description: string;
  skillId: string;
  onDelete: (id: string) => void;
  onEdit: (id: string, updates: { title: string; desc: string }) => Promise<void>;
  canEdit: boolean;                    // ← НОВОЕ
};

export default function SkillCard({ title, description, skillId, onDelete, onEdit, canEdit }: SkillCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDesc, setEditDesc] = useState(description);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onEdit(skillId, { title: editTitle, desc: editDesc });
      setIsEditing(false);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(title);
    setEditDesc(description);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="skill-card editing">
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="edit-input"
        />
        <input
          type="text"
          value={editDesc}
          onChange={(e) => setEditDesc(e.target.value)}
          className="edit-input"
        />
        <div className="edit-actions">
          <button className="save-btn" onClick={handleSave} disabled={saving}>
            {saving ? '...' : '✓'}
          </button>
          <button className="cancel-btn" onClick={handleCancel}>✕</button>
        </div>
      </div>
    );
  }

  return (
    <div className="skill-card">
      <h3>{title}</h3>
      <p>{description}</p>
      {canEdit && (
        <>
          <button className="edit-btn" onClick={() => setIsEditing(true)}>✏️</button>
          <button className="delete-btn" onClick={() => onDelete(skillId)}>✕</button>
        </>
      )}
    </div>
  );
}