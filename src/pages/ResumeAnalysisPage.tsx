import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface AnalysisData {
  score_overall: number;
  score_format: number;
  score_skills: number;
  score_experience: number;
  strengths: string;
  weaknesses: string;
  suggestions: string;
}

const ResumeAnalysisPage: React.FC = () => {
  const navigate = useNavigate();
  const { resumeId } = useParams<{ resumeId: string }>();
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  useEffect(() => {
    if (resumeId) {
      analyzeResume();
    }
  }, [resumeId]);

  const analyzeResume = async () => {
    try {
      const response = await fetch(`/api/ai/resumes/${resumeId}/analyze`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setAnalysisData(data.analysis);
      } else {
        throw new Error('Analysis failed');
      }
    } catch (error) {
      console.error('Analysis error:', error);
      alert('Failed to analyze resume. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleContinue = () => {
    navigate('/onboarding/pricing');
  };

  const handleSeeFullReport = () => {
    // Could open a detailed modal or navigate to a full report page
    alert('Full report feature coming soon!');
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Analyzing your resume...</p>
        </div>
      </div>
    );
  }

  if (!analysisData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Failed to analyze resume</p>
          <button
            onClick={() => navigate('/onboarding/upload')}
            className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🐥</span>
              </div>
              <span className="text-xl font-bold text-gray-900">JOBHATCH</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              <span className="font-medium">Mia Yue</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-center space-x-8">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="ml-2 text-green-600 font-medium">Resume/CV</span>
            </div>
            <div className="w-16 h-0.5 bg-orange-500"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">2</span>
              </div>
              <span className="ml-2 text-orange-500 font-medium">Analyze</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-sm font-semibold">3</span>
              </div>
              <span className="ml-2 text-gray-400 font-medium">Profile</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-sm font-semibold">4</span>
              </div>
              <span className="ml-2 text-gray-400 font-medium">Preferences</span>
            </div>
            <div className="w-16 h-0.5 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-500 text-sm font-semibold">5</span>
              </div>
              <span className="ml-2 text-gray-400 font-medium">Done</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your Resume/CV Analyze Result
          </h1>
          <p className="text-gray-600">
            We have generated content from your resume and analyze report!
          </p>
        </div>

        {/* Analysis Report */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Your Job Hatch Analyze Report</h2>
              <p className="text-sm text-gray-600">Hi Mia,</p>
              <p className="text-sm text-gray-600 mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In porta ac molestias 
                sed lorem urna. Nam placerat lacus cursus. Donec feugiat molestie erat in 
                turpis feugiat.
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-blue-600 mb-1">
                {Math.round(analysisData.score_overall * 10)}
              </div>
              <div className="text-sm text-gray-500">/ 100</div>
            </div>
          </div>

          {/* Analysis Chart Placeholder */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600">Skills</span>
              <span className="text-sm font-semibold">{Math.round(analysisData.score_skills * 10)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${analysisData.score_skills * 10}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600">Experience</span>
              <span className="text-sm font-semibold">{Math.round(analysisData.score_experience * 10)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div 
                className="bg-blue-500 h-2 rounded-full" 
                style={{ width: `${analysisData.score_experience * 10}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600">Format</span>
              <span className="text-sm font-semibold">{Math.round(analysisData.score_format * 10)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-yellow-500 h-2 rounded-full" 
                style={{ width: `${analysisData.score_format * 10}%` }}
              ></div>
            </div>
          </div>

          {/* Detailed Analysis Cards */}
          <div className="space-y-4">
            {/* Strengths Card */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">Strengths</h3>
                <span className="text-2xl font-bold text-green-600">
                  {Math.round(analysisData.score_skills * 10)}%
                </span>
              </div>
              <p className="text-sm text-gray-600">{analysisData.strengths}</p>
            </div>

            {/* Experience Card */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">Experience</h3>
                <span className="text-2xl font-bold text-blue-600">
                  {Math.round(analysisData.score_experience * 10)}%
                </span>
              </div>
              <p className="text-sm text-gray-600">Professional experience analysis based on your resume content.</p>
            </div>

            {/* Weaknesses Card */}
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">Areas for Improvement</h3>
                <span className="text-2xl font-bold text-yellow-600">
                  {Math.round(analysisData.score_format * 10)}%
                </span>
              </div>
              <p className="text-sm text-gray-600">{analysisData.weaknesses}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleContinue}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Continue
          </button>
          <button
            onClick={handleSeeFullReport}
            className="border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Upload to see entire Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeAnalysisPage; 