
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { thunkFetchJobs } from '../showjobSlice';
import { Link } from 'react-router-dom';

const ShowJobList: React.FC = () => {
  const dispatch = useAppDispatch();
  const jobs = useAppSelector((state) => state.jobs.jobs);
  const status = useAppSelector((state) => state.jobs.status);

  useEffect(() => {
    dispatch(thunkFetchJobs());
  }, [dispatch]);

  if (status === 'loading') return <p>Loading jobs...</p>;
  if (jobs.length === 0) return <p>No jobs available.</p>;

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Job Listings</h2>
      <ul className="space-y-2">
        {jobs.map((job) => (
          <li key={job.id} className="border p-4 rounded hover:shadow-md">
            <Link to={`/jobs/${job.id}`} className="text-xl font-semibold text-blue-600 hover:underline">
              {job.title}
            </Link>
            <p className="text-sm text-gray-600">{job.location} · {job.job_type}</p>
            <p className="mt-1 text-gray-800">{job.description.slice(0, 100)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowJobList;
