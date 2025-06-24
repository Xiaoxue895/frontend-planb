
// import React, { useEffect } from 'react';
// import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
// import { thunkFetchJobs } from '../showjobSlice';
// import { Link } from 'react-router-dom';

// const ShowJobList: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const jobs = useAppSelector((state) => state.jobs.jobs);
//   const status = useAppSelector((state) => state.jobs.status);

//   useEffect(() => {
//     dispatch(thunkFetchJobs());
//   }, [dispatch]);

//   if (status === 'loading') return <p>Loading jobs...</p>;
//   if (jobs.length === 0) return <p>No jobs available.</p>;

//   return (
//     <div className="p-6 space-y-4">
//       <h2 className="text-2xl font-bold">Job Listings</h2>
//       <ul className="space-y-2">
//         {jobs.map((job) => (
//           <li key={job.id} className="border p-4 rounded hover:shadow-md">
//             <Link to={`/jobs/${job.id}`} className="text-xl font-semibold text-blue-600 hover:underline">
//               {job.title}
//             </Link>
//             <p className="text-sm text-gray-600">{job.location} · {job.job_type}</p>
//             <p className="mt-1 text-gray-800">{job.description.slice(0, 100)}...</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ShowJobList;


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
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Our Popular Jobs</h2>
      <ul className="space-y-4">
        {jobs.map((job) => (
          <li
            key={job.id}
            className="flex justify-between items-start border rounded-lg p-4 shadow-sm hover:shadow-md bg-white"
          >
            <div className="flex flex-col items-center w-[120px]">
              <img
                src={job.companyLogo || '/placeholder-logo.png'}
                alt="Company Logo"
                className="w-12 h-12 object-contain mb-2"
              />
              <span className="text-sm font-medium text-gray-800 text-center">
                {job.companyName || 'Company Name'}
              </span>
            </div>

            <div className="flex-1 px-4 space-y-1">
              <div className="flex space-x-2 text-xs font-medium">
                <span
                  className={`px-2 py-0.5 rounded text-white ${
                    job.is_remote ? 'bg-green-500' : 'bg-gray-500'
                  }`}
                >
                  {job.is_remote ? 'Remote' : 'Onsite'}
                </span>

                <span
                  className={`px-2 py-0.5 rounded text-white ${
                    job.offer_visa_sponsorship ? 'bg-purple-500' : 'bg-yellow-500'
                  }`}
                >
                  {job.offer_visa_sponsorship ? 'Visa Sponsorship' : 'No Sponsorship'}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-blue-700">
                {job.title || 'Product Designer'}
              </h3>
              <p className="text-sm text-gray-600">
                {job.description?.slice(0, 100) || 'One sentence pitch of the opportunity.'}
              </p>

              <p className="text-sm text-gray-700">
                {job.location || 'Remote'} · {job.job_type || 'Full-time'} ·{' '}
                {`$${job.salary_min}/yr - $${job.salary_max}/yr`}
              </p>
              <p className="text-sm text-gray-500">
                {job.skills || 'Architecture • E-Commerce • Late Stage'}
              </p>
            </div>

            <div className="flex space-x-6 min-w-[260px] pl-2">
              <div className="flex flex-col items-center space-y-2">
                <div className="text-xs font-semibold text-orange-500">STRONG MATCH</div>
                <div className="text-xs text-gray-400">4 of 5 Resume Utility</div>
                <button className="bg-orange-500 text-white text-sm px-4 py-1 rounded hover:bg-orange-600">
                  APPLY NOW
                </button>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <div className="w-10 h-10 bg-blue-200 rounded-full" />
                <div className="text-sm font-semibold text-gray-700">Funder Name</div>
                <div className="text-xs text-gray-400 text-center px-1">
                  Description of Funder
                </div>
                <button className="bg-blue-500 text-white text-sm px-4 py-1 rounded hover:bg-blue-600">
                  LET'S CHAT
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowJobList;


