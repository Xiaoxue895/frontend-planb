import React from 'react';
import ShowJobList from '../features/ShowJob/components/ShowJobList';

const JobsPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6">Job Opportunities</h1>
      <ShowJobList />
    </div>
  );
};

export default JobsPage;