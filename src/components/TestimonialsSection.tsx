import React from 'react';

interface Testimonial {
  id: number;
  rating: number;
  quote: string;
  quoteTranslation?: string;
  author: {
    name: string;
    title: string;
    avatar: string;
  };
}

const TestimonialsSection = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      rating: 5,
      quote: "My dream job-seeking product would be called CareerCraft—a platform that goes far beyond the traditional keyword-based job board. It would use AI to recommend jobs based not only on your resume, but also your values, skills, ideal work environment, and long-term career goals.",
      author: {
        name: "Job Seeker",
        title: "Recent Graduate",
        avatar: "/images/avatar-1.svg"
      }
    },
    {
      id: 2,
      rating: 5,
      quote: "Would be great to see a job search engine with the ability to handle highly specific requests/filters. One of the most time consuming and frustrating parts of the job app process is finding applicable jobs in the first place. Being able to avoid browsing through hundreds of irrelevant postings would be huge.",
      author: {
        name: "Experienced Professional",
        title: "Tech Industry",
        avatar: "/images/avatar-2.svg"
      }
    },
    {
      id: 3,
      rating: 5,
      quote: "Automatic application generation, connection with LinkedIn and other platforms to give me potential networking contacts and automatic email generation. Outreach tracker as well, and a brief pre-coffee chat to save research time. A guide with next steps to optimize my time.",
      author: {
        name: "Sarah",
        title: "Career Switcher",
        avatar: "/images/avatar-3.svg"
      }
    },
    {
      id: 4,
      rating: 5,
      quote: "自从修改简历，根据每个职位来优化简历，帮忙投递简历，针对性地提供面试辅导",
      quoteTranslation: "Help with resume optimization for each position, automated application submission, and targeted interview coaching.",
      author: {
        name: "International User",
        title: "Job Seeker",
        avatar: "/images/avatar-4.svg"
      }
    },
    {
      id: 5,
      rating: 5,
      quote: "主要是能督促学习吧，帮助持续学习下去。基本都是最后落到没有时间而不继续。",
      quoteTranslation: "A platform that can 'supervise' learning, helping users to continue learning consistently. Most people eventually stop because they 'don't have time'.",
      author: {
        name: "Li Wei",
        title: "Student",
        avatar: "/images/avatar-4.svg"
      }
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <i 
        key={index}
        className={`fas fa-star ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>Success Stories & User Feedback</h2>
          <p className="text-lg text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
            Hear what job seekers are saying about their dream job-seeking platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <i key={i} className="fas fa-star text-yellow-400"></i>
                ))}
              </div>

              {/* Quote */}
              <div className="mb-6">
                <p className="text-gray-700 leading-relaxed text-justify italic mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                {testimonial.quoteTranslation && (
                  <p className="text-gray-600 text-sm leading-relaxed text-justify" style={{ fontFamily: 'Inter, sans-serif' }}>
                    &ldquo;{testimonial.quoteTranslation}&rdquo;
                  </p>
                )}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src={testimonial.author.avatar}
                    alt={testimonial.author.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900" style={{ fontFamily: 'Inter, sans-serif' }}>{testimonial.author.name}</h4>
                  <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>{testimonial.author.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 