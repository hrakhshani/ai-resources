import { useMemo, useState } from 'react';
import { Search, SortAsc, SortDesc, Youtube, Users, Video, Calendar, Globe, ExternalLink } from 'lucide-react';
import './App.css';

type SortField = 'subscribers' | 'videos' | 'name';
type SortOrder = 'asc' | 'desc';

const AILearningPortfolio = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<SortField>('subscribers');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const channels = [
    {
      name: "Applied AI Course",
      category: "AI Course Providers",
      subscribers: "89K",
      subscribersNum: 89000,
      videos: 519,
      views: "13.5M",
      joined: "Jun 2017",
      description: "The AppliedAICourse teaches core ideas in machine learning, data-science and AI. Focus on practical knowledge with 20+ real world case studies.",
      tags: ["Machine Learning", "Deep Learning", "Data Science", "Practical AI", "Case Studies"],
      website: "appliedaicourse.com",
      location: "India"
    },
    {
      name: "Andrej Karpathy",
      category: "AI Researchers & Experts",
      subscribers: "1.18M",
      subscribersNum: 1180000,
      videos: 17,
      views: "24.4M",
      joined: "Sep 2013",
      description: "AI research, education, and commentary by Andrej Karpathy, former Director of AI at Tesla, founding member of OpenAI, and founder of Eureka Labs.",
      tags: ["Artificial Intelligence", "Deep Learning", "Neural Networks", "Machine Learning", "AI Education"],
      website: "karpathy.ai",
      location: "United States"
    },
    {
      name: "3Blue1Brown",
      category: "Math & Science Education",
      subscribers: "6.2M",
      subscribersNum: 6200000,
      videos: 157,
      views: "285M",
      joined: "Mar 2015",
      description: "Visual math explanations with incredible animations covering linear algebra, calculus, and ML foundations.",
      tags: ["Mathematics", "Linear Algebra", "Neural Networks", "Visualization", "Theory"],
      website: "3blue1brown.com",
      location: "USA"
    },
    {
      name: "Stanford Online",
      category: "Educational Institutions",
      subscribers: "2.1M",
      subscribersNum: 2100000,
      videos: 1842,
      views: "180M",
      joined: "Sep 2008",
      description: "Stanford University's official channel with courses on AI, ML, and computer science.",
      tags: ["Academic", "Machine Learning", "Computer Science", "University Courses"],
      website: "online.stanford.edu",
      location: "USA"
    },
    {
      name: "Two Minute Papers",
      category: "AI Research & Papers",
      subscribers: "1.5M",
      subscribersNum: 1500000,
      videos: 892,
      views: "125M",
      joined: "Mar 2013",
      description: "Explaining cutting-edge AI research papers in an accessible way.",
      tags: ["Research Papers", "AI News", "Deep Learning", "Computer Graphics"],
      website: "users.cg.tuwien.ac.at/zsolnai/",
      location: "Austria"
    },
    {
      name: "OpenAI",
      category: "AI Companies & Labs",
      subscribers: "1.8M",
      subscribersNum: 1800000,
      videos: 245,
      views: "95M",
      joined: "Dec 2015",
      description: "Official OpenAI channel featuring GPT, ChatGPT, and frontier AI research.",
      tags: ["ChatGPT", "GPT", "AI Research", "LLMs", "AGI"],
      website: "openai.com",
      location: "USA"
    },
    {
      name: "Google DeepMind",
      category: "AI Companies & Labs",
      subscribers: "892K",
      subscribersNum: 892000,
      videos: 378,
      views: "68M",
      joined: "Jul 2014",
      description: "DeepMind's groundbreaking AI research including AlphaGo, AlphaFold, and more.",
      tags: ["AI Research", "Reinforcement Learning", "AlphaGo", "AlphaFold", "DeepMind"],
      website: "deepmind.google",
      location: "UK"
    },
    {
      name: "Lex Fridman",
      category: "AI Podcasts & Interviews",
      subscribers: "4.5M",
      subscribersNum: 4500000,
      videos: 512,
      views: "650M",
      joined: "Oct 2006",
      description: "Long-form conversations with AI researchers, scientists, and tech leaders.",
      tags: ["Interviews", "AI Philosophy", "Podcasts", "Deep Conversations"],
      website: "lexfridman.com",
      location: "USA"
    },
    {
      name: "StatQuest with Josh Starmer",
      category: "Math & Science Education",
      subscribers: "1.3M",
      subscribersNum: 1300000,
      videos: 328,
      views: "92M",
      joined: "Dec 2011",
      description: "Breaking down statistics and machine learning concepts with clear explanations and songs.",
      tags: ["Statistics", "Machine Learning", "Data Science", "Beginner-Friendly"],
      website: "statquest.org",
      location: "USA"
    },
    {
      name: "Yannic Kilcher",
      category: "AI Researchers & Experts",
      subscribers: "485K",
      subscribersNum: 485000,
      videos: 687,
      views: "28M",
      joined: "May 2017",
      description: "Deep dives into AI research papers with technical analysis.",
      tags: ["Research Papers", "Deep Learning", "Technical", "Paper Reviews"],
      website: "ykilcher.com",
      location: "Switzerland"
    },
    {
      name: "Sentdex",
      category: "AI Course Providers",
      subscribers: "1.3M",
      subscribersNum: 1300000,
      videos: 1247,
      views: "115M",
      joined: "Dec 2012",
      description: "Python programming, machine learning, and AI tutorials with hands-on projects.",
      tags: ["Python", "Machine Learning", "Programming", "Tutorials", "Hands-on"],
      website: "pythonprogramming.net",
      location: "USA"
    },
    {
      name: "freeCodeCamp.org",
      category: "AI Course Providers",
      subscribers: "9.8M",
      subscribersNum: 9800000,
      videos: 2156,
      views: "520M",
      joined: "Dec 2014",
      description: "Free coding courses including comprehensive AI and ML tutorials.",
      tags: ["Free Courses", "Programming", "Machine Learning", "Full Courses", "Beginner-Friendly"],
      website: "freecodecamp.org",
      location: "USA"
    },
    {
      name: "Machine Learning Street Talk",
      category: "AI Podcasts & Interviews",
      subscribers: "245K",
      subscribersNum: 245000,
      videos: 385,
      views: "12M",
      joined: "Apr 2020",
      description: "In-depth discussions on AI safety, AGI, and cutting-edge ML research.",
      tags: ["AI Safety", "AGI", "Research Discussion", "Interviews", "Philosophy"],
      website: "mlst.ai",
      location: "UK"
    },
    {
      name: "Dwarkesh Patel",
      category: "AI Podcasts & Interviews",
      subscribers: "312K",
      subscribersNum: 312000,
      videos: 98,
      views: "18M",
      joined: "Feb 2020",
      description: "High-quality interviews with AI researchers and tech leaders.",
      tags: ["Interviews", "AI Research", "Tech Leaders", "Long-form"],
      website: "dwarkeshpatel.com",
      location: "USA"
    },
    {
      name: "The Diary Of A CEO",
      category: "Business & Tech Podcasts",
      subscribers: "7.2M",
      subscribersNum: 7200000,
      videos: 892,
      views: "1.2B",
      joined: "Jan 2017",
      description: "Business and tech interviews including AI leaders and entrepreneurs.",
      tags: ["Business", "Entrepreneurship", "AI Industry", "Interviews"],
      website: "stevenbartlett.com",
      location: "UK"
    },
    {
      name: "Y Combinator",
      category: "Startup & Business",
      subscribers: "1.5M",
      subscribersNum: 1500000,
      videos: 2847,
      views: "95M",
      joined: "Dec 2006",
      description: "Startup advice and AI company building from the top accelerator.",
      tags: ["Startups", "AI Companies", "Entrepreneurship", "Business"],
      website: "ycombinator.com",
      location: "USA"
    },
    {
      name: "MIT HAN Lab",
      category: "Educational Institutions",
      subscribers: "78K",
      subscribersNum: 78000,
      videos: 156,
      views: "4.2M",
      joined: "Sep 2019",
      description: "MIT research on efficient deep learning and neural architecture.",
      tags: ["Academic", "Research", "Efficient ML", "Neural Architecture"],
      website: "hanlab.mit.edu",
      location: "USA"
    },
    {
      name: "Stanford University School of Engineering",
      category: "Educational Institutions",
      subscribers: "445K",
      subscribersNum: 445000,
      videos: 3254,
      views: "58M",
      joined: "Jan 2008",
      description: "Stanford Engineering lectures and seminars on AI and CS.",
      tags: ["Academic", "University Courses", "Engineering", "Computer Science"],
      website: "engineering.stanford.edu",
      location: "USA"
    },
    {
      name: "Normalized Nerd",
      category: "AI Course Providers",
      subscribers: "156K",
      subscribersNum: 156000,
      videos: 187,
      views: "8.5M",
      joined: "Mar 2020",
      description: "Clear explanations of ML concepts and paper implementations.",
      tags: ["Machine Learning", "Deep Learning", "Tutorials", "Paper Implementations"],
      website: "www.youtube.com/@NormalizedNerd",
      location: "India"
    },
    {
      name: "Umar Jamil",
      category: "AI Researchers & Experts",
      subscribers: "185K",
      subscribersNum: 185000,
      videos: 68,
      views: "5.8M",
      joined: "Aug 2020",
      description: "Deep technical dives into transformers, diffusion models, and LLMs.",
      tags: ["Transformers", "LLMs", "Technical", "Deep Dives", "Code Walkthroughs"],
      website: "umarjamil.com",
      location: "Canada"
    },
    {
      name: "Veritasium",
      category: "Science Explainers",
      subscribers: "15.2M",
      subscribersNum: 15200000,
      videos: 372,
      views: "2.8B",
      joined: "Jul 2010",
      description: "High-quality science videos occasionally covering AI and computing.",
      tags: ["Science", "Physics", "AI Ethics", "Documentary-style"],
      website: "veritasium.com",
      location: "Australia"
    },
    {
      name: "Sabine Hossenfelder",
      category: "Science Explainers",
      subscribers: "1.4M",
      subscribersNum: 1400000,
      videos: 628,
      views: "145M",
      joined: "Mar 2016",
      description: "Critical analysis of science and tech including AI developments.",
      tags: ["Science", "Critical Analysis", "AI Commentary", "Physics"],
      website: "sabinehossenfelder.com",
      location: "Germany"
    },
    {
      name: "IBM Technology",
      category: "AI Companies & Labs",
      subscribers: "892K",
      subscribersNum: 892000,
      videos: 1548,
      views: "68M",
      joined: "Mar 2007",
      description: "Enterprise AI, cloud computing, and technology tutorials.",
      tags: ["Enterprise AI", "Cloud Computing", "Business AI", "Technology"],
      website: "ibm.com",
      location: "USA"
    },
    {
      name: "NVIDIA",
      category: "AI Companies & Labs",
      subscribers: "1.1M",
      subscribersNum: 1100000,
      videos: 4582,
      views: "125M",
      joined: "Aug 2006",
      description: "GPU computing, AI development, and deep learning technologies.",
      tags: ["GPU Computing", "Deep Learning", "AI Hardware", "CUDA"],
      website: "nvidia.com",
      location: "USA"
    },
    {
      name: "Microsoft Developer",
      category: "AI Companies & Labs",
      subscribers: "1.8M",
      subscribersNum: 1800000,
      videos: 8745,
      views: "245M",
      joined: "Feb 2008",
      description: "Microsoft AI tools, Azure ML, and development resources.",
      tags: ["Azure", "AI Tools", "Development", "Enterprise"],
      website: "microsoft.com/developer",
      location: "USA"
    },
    {
      name: "Google for Developers",
      category: "AI Companies & Labs",
      subscribers: "2.3M",
      subscribersNum: 2300000,
      videos: 6892,
      views: "385M",
      joined: "Mar 2007",
      description: "Google AI tools, TensorFlow, and machine learning resources.",
      tags: ["TensorFlow", "AI Tools", "Development", "Google Cloud"],
      website: "developers.google.com",
      location: "USA"
    },
    {
      name: "Google Cloud Tech",
      category: "AI Companies & Labs",
      subscribers: "1.2M",
      subscribersNum: 1200000,
      videos: 4258,
      views: "158M",
      joined: "Jun 2011",
      description: "Google Cloud AI and ML services and tutorials.",
      tags: ["Cloud AI", "Machine Learning", "Google Cloud", "Enterprise"],
      website: "cloud.google.com",
      location: "USA"
    },
    {
      name: "GitHub",
      category: "Developer Platforms",
      subscribers: "645K",
      subscribersNum: 645000,
      videos: 1245,
      views: "42M",
      joined: "Feb 2008",
      description: "GitHub features, AI coding tools, and developer resources.",
      tags: ["Development", "AI Coding", "Open Source", "Copilot"],
      website: "github.com",
      location: "USA"
    },
    {
      name: "LangChain",
      category: "AI Developer Tools",
      subscribers: "68K",
      subscribersNum: 68000,
      videos: 142,
      views: "3.8M",
      joined: "Oct 2022",
      description: "Building LLM applications with the LangChain framework.",
      tags: ["LLMs", "Development", "Application Building", "Frameworks"],
      website: "langchain.com",
      location: "USA"
    },
    {
      name: "TED",
      category: "Ideas & Innovation",
      subscribers: "23M",
      subscribersNum: 23000000,
      videos: 4582,
      views: "4.2B",
      joined: "Dec 2006",
      description: "Ideas worth spreading, including AI ethics and future.",
      tags: ["Ideas", "AI Ethics", "Innovation", "Talks"],
      website: "ted.com",
      location: "USA"
    },
    {
      name: "TED-Ed",
      category: "Ideas & Innovation",
      subscribers: "19.5M",
      subscribersNum: 19500000,
      videos: 2156,
      views: "3.8B",
      joined: "Mar 2011",
      description: "Educational videos on various topics including AI basics.",
      tags: ["Education", "Animation", "AI Basics", "Explainers"],
      website: "ed.ted.com",
      location: "USA"
    },
    {
      name: "Alexander Amini",
      category: "AI Researchers & Experts",
      subscribers: "95K",
      subscribersNum: 95000,
      videos: 42,
      views: "4.2M",
      joined: "Jan 2019",
      description: "MIT researcher teaching deep learning and AI courses.",
      tags: ["Deep Learning", "MIT", "Academic", "Courses"],
      website: "introtodeeplearning.com",
      location: "USA"
    },
    {
      name: "Codebasics",
      category: "AI Course Providers",
      subscribers: "1.1M",
      subscribersNum: 1100000,
      videos: 865,
      views: "92M",
      joined: "Jul 2018",
      description: "Data science, ML, and programming tutorials in simple language.",
      tags: ["Data Science", "Machine Learning", "Programming", "Tutorials", "Beginner-Friendly"],
      website: "codebasics.io",
      location: "India"
    },
    {
      name: "The AI Grid",
      category: "AI News & Analysis",
      subscribers: "42K",
      subscribersNum: 42000,
      videos: 198,
      views: "2.1M",
      joined: "May 2023",
      description: "Latest AI news, model releases, and industry updates.",
      tags: ["AI News", "Industry Updates", "Model Releases", "Analysis"],
      website: "theaigrid.com",
      location: "USA"
    },
    {
      name: "ByCloud AI",
      category: "AI Course Providers",
      subscribers: "125K",
      subscribersNum: 125000,
      videos: 245,
      views: "6.8M",
      joined: "Sep 2020",
      description: "AI tutorials and practical implementations.",
      tags: ["Tutorials", "Practical AI", "Implementations", "Projects"],
      website: "www.youtube.com/@bycloudAI",
      location: "USA"
    },
    {
      name: "Siraj Raval",
      category: "AI Researchers & Experts",
      subscribers: "728K",
      subscribersNum: 728000,
      videos: 584,
      views: "45M",
      joined: "Mar 2016",
      description: "Energetic AI tutorials and project-based learning.",
      tags: ["Projects", "AI Learning", "Enthusiastic", "Tutorials"],
      website: "sirajraval.com",
      location: "USA"
    },
    {
      name: "Deepia",
      category: "AI News & Analysis",
      subscribers: "28K",
      subscribersNum: 28000,
      videos: 156,
      views: "1.5M",
      joined: "Jan 2023",
      description: "AI developments and research discussions.",
      tags: ["AI News", "Research Updates", "Analysis"],
      website: "deepia.ai",
      location: "USA"
    },
    {
      name: "Welch Labs",
      category: "Math & Science Education",
      subscribers: "892K",
      subscribersNum: 892000,
      videos: 68,
      views: "48M",
      joined: "Sep 2011",
      description: "Beautiful visualizations of math and ML concepts.",
      tags: ["Visualization", "Mathematics", "Neural Networks", "Explainers"],
      website: "welchlabs.com",
      location: "USA"
    },
    {
      name: "Zoomit",
      category: "Science Explainers",
      subscribers: "185K",
      subscribersNum: 185000,
      videos: 425,
      views: "15M",
      joined: "Mar 2018",
      description: "Tech and science explanations including AI topics.",
      tags: ["Technology", "Science", "Explainers"],
      website: "zoomit.com",
      location: "Iran"
    },
    {
      name: "AI Revolution",
      category: "AI News & Analysis",
      subscribers: "68K",
      subscribersNum: 68000,
      videos: 312,
      views: "4.5M",
      joined: "Aug 2022",
      description: "AI news, trends, and future predictions.",
      tags: ["AI News", "Trends", "Future of AI", "Analysis"],
      website: "www.youtube.com/@airevolutionx",
      location: "USA"
    },
    {
      name: "TIME",
      category: "News & Media",
      subscribers: "4.8M",
      subscribersNum: 4800000,
      videos: 8542,
      views: "2.1B",
      joined: "Sep 2006",
      description: "News coverage including AI developments and impact.",
      tags: ["News", "AI Impact", "Current Events", "Documentary"],
      website: "time.com",
      location: "USA"
    },
    {
      name: "Bloomberg Originals",
      category: "News & Media",
      subscribers: "3.2M",
      subscribersNum: 3200000,
      videos: 4258,
      views: "1.5B",
      joined: "Nov 2009",
      description: "Business and tech news including AI industry coverage.",
      tags: ["Business", "Technology News", "AI Industry", "Finance"],
      website: "bloomberg.com",
      location: "USA"
    },
    {
      name: "EDx Talks",
      category: "Educational Institutions",
      subscribers: "245K",
      subscribersNum: 245000,
      videos: 1542,
      views: "28M",
      joined: "Apr 2013",
      description: "Educational talks and lectures from EDx courses.",
      tags: ["Education", "Lectures", "Online Courses", "Academic"],
      website: "edx.org",
      location: "USA"
    },
    {
      name: "Mehrzad Samadi",
      category: "AI Researchers & Experts",
      subscribers: "15K",
      subscribersNum: 15000,
      videos: 89,
      views: "685K",
      joined: "Jun 2020",
      description: "AI research and technical tutorials.",
      tags: ["Research", "Technical", "Tutorials"],
      website: "www.youtube.com/@mehrzad.samadi",
      location: "US"
    }
  ];

  const categories = ['all', ...new Set(channels.map(c => c.category))];
  const filteredAndSortedChannels = useMemo(() => {
    let filtered = channels.filter(channel => {
      const matchesSearch = channel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          channel.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          channel.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || channel.category === selectedCategory;
      
      const matchesTags = selectedTags.length === 0 || 
                         selectedTags.some(tag => channel.tags.includes(tag));
      
      return matchesSearch && matchesCategory && matchesTags;
    });

    filtered.sort((a, b) => {
      let comparison = 0;
      switch(sortBy) {
        case 'subscribers':
          comparison = a.subscribersNum - b.subscribersNum;
          break;
        case 'videos':
          comparison = a.videos - b.videos;
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        default:
          comparison = 0;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [searchTerm, sortBy, sortOrder, selectedCategory, selectedTags]);

  const toggleSort = (field: SortField) => {
    if (sortBy === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">AI Learning Resources</h1>
          <p className="text-xl text-purple-100">
            Curated collection of {channels.length} YouTube channels covering AI, Machine Learning, and Data Science
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-6 relative">
          <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search channels, descriptions, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none text-white placeholder-gray-400"
          />
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-3 text-gray-300">CATEGORY</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                }`}
              >
                {cat === 'all' ? 'All Categories' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Controls */}
        <div className="mb-6 flex flex-wrap gap-3">
          <h3 className="text-sm font-semibold text-gray-300 w-full mb-2">SORT BY</h3>
          <button
            onClick={() => toggleSort('subscribers')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              sortBy === 'subscribers'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
            }`}
          >
            <Users size={16} />
            Subscribers
            {sortBy === 'subscribers' && (
              sortOrder === 'asc' ? <SortAsc size={16} /> : <SortDesc size={16} />
            )}
          </button>
          <button
            onClick={() => toggleSort('videos')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              sortBy === 'videos'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
            }`}
          >
            <Video size={16} />
            Videos
            {sortBy === 'videos' && (
              sortOrder === 'asc' ? <SortAsc size={16} /> : <SortDesc size={16} />
            )}
          </button>
          <button
            onClick={() => toggleSort('name')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              sortBy === 'name'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
            }`}
          >
            Name
            {sortBy === 'name' && (
              sortOrder === 'asc' ? <SortAsc size={16} /> : <SortDesc size={16} />
            )}
          </button>
        </div>

        {/* Results Count */}
        <div className="mb-4 text-gray-400">
          Showing {filteredAndSortedChannels.length} of {channels.length} channels
        </div>

        {/* Channel Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedChannels.map(channel => (
            <div
              key={channel.name}
              className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-purple-500 transition-all hover:shadow-xl hover:shadow-purple-500/20"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2 text-white">{channel.name}</h3>
                  <span className="text-xs text-purple-400 font-medium px-2 py-1 bg-purple-900/30 rounded">
                    {channel.category}
                  </span>
                </div>
                <Youtube className="text-red-500" size={32} />
              </div>

              <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                {channel.description}
              </p>

              <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-slate-900 rounded-lg">
                <div>
                  <div className="text-xs text-gray-400 mb-1">Subscribers</div>
                  <div className="text-lg font-bold text-purple-400">{channel.subscribers}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">Videos</div>
                  <div className="text-lg font-bold text-blue-400">{channel.videos}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">Views</div>
                  <div className="text-lg font-bold text-green-400">{channel.views}</div>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4 text-xs text-gray-400">
                <Calendar size={14} />
                <span>Joined {channel.joined}</span>
                {channel.location && (
                  <>
                    <span>•</span>
                    <span>{channel.location}</span>
                  </>
                )}
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {channel.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-slate-700 text-gray-300 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {channel.website && (
                <a
                  href={`https://${channel.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
                >
                  <Globe size={14} />
                  {channel.website}
                  <ExternalLink size={12} />
                </a>
              )}
            </div>
          ))}
        </div>

        {filteredAndSortedChannels.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-400">No channels found matching your criteria</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedTags([]);
              }}
              className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AILearningPortfolio;
