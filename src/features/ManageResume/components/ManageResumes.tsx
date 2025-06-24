import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import {
  fetchUserResumes,
  uploadResume,
  updateResume,
  deleteResume,
  Resume
} from '../resumeSlice';

const ManageResumes = () => {
  const dispatch = useAppDispatch();
  const { resumes, loading, error } = useAppSelector((state) => state.resumes);

  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchUserResumes());
  }, [dispatch]);

  const resetForm = () => {
    setTitle('');
    setFile(null);
    setEditingId(null);
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);

    try {
      await dispatch(uploadResume(formData)).unwrap();
      resetForm();
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;

    if (!file && title.trim() === '') {
      alert('Please update the title or select a new file.');
      return;
    }

    const formData = new FormData();
    if (file) formData.append('file', file);
    formData.append('title', title);

    try {
      await dispatch(updateResume({ resumeId: editingId, formData })).unwrap();
      resetForm();
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    if (editingId) {
      handleUpdate(e);
    } else {
      handleUpload(e);
    }
  };

  const handleDelete = (id: number) => {
    dispatch(deleteResume(id));
  };

  const handleEdit = (resume: Resume) => {
    setTitle(resume.title || '');
    setEditingId(resume.id);
    setFile(null);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Manage Your Resumes</h2>

      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Title (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="file"
          accept=".pdf,.png,.jpg,.jpeg,.gif"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {editingId ? 'Update Resume' : 'Upload Resume'}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={resetForm}
            className="ml-2 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        )}
      </form>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <ul className="space-y-4">
        {resumes.map((resume) => (
          <li
            key={resume.id}
            className="p-4 border rounded flex items-center justify-between"
          >
            <div>
              <p className="font-medium">{resume.title || 'Untitled Resume'}</p>
              <a
                href={resume.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View File
              </a>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(resume)}
                className="px-3 py-1 bg-yellow-400 rounded text-white hover:bg-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(resume.id)}
                className="px-3 py-1 bg-red-500 rounded text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageResumes;
