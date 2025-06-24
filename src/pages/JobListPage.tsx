import React from 'react';
import ShowJobList from '../features/ShowJob/components/ShowJobList';

const JobsPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <ShowJobList />
    </div>
  );
};

export default JobsPage;