export interface Headline {
  id: number;
  text: string;
  source_url: string;
  scraped_at: string;
  source_domain: string;
}

export const mockHeadlines: Headline[] = [
  {
    id: 1,
    text: "AI Technology Breakthrough Promises Revolutionary Healthcare Solutions",
    source_url: "https://techcrunch.com/ai-healthcare-breakthrough",
    scraped_at: "2024-01-15T10:30:00Z",
    source_domain: "techcrunch.com"
  },
  {
    id: 2,
    text: "Global Climate Summit Reaches Historic Agreement on Carbon Emissions",
    source_url: "https://reuters.com/climate-summit-agreement",
    scraped_at: "2024-01-15T09:45:00Z",
    source_domain: "reuters.com"
  },
  {
    id: 3,
    text: "Cryptocurrency Market Sees Unprecedented Growth in Digital Assets",
    source_url: "https://bloomberg.com/crypto-market-growth",
    scraped_at: "2024-01-15T08:20:00Z",
    source_domain: "bloomberg.com"
  },
  {
    id: 4,
    text: "Space Exploration Mission Discovers Potential Signs of Water on Mars",
    source_url: "https://nasa.gov/mars-water-discovery",
    scraped_at: "2024-01-15T07:15:00Z",
    source_domain: "nasa.gov"
  },
  {
    id: 5,
    text: "Tech Giants Announce Major Partnership for Sustainable Computing",
    source_url: "https://techcrunch.com/sustainable-computing-partnership",
    scraped_at: "2024-01-15T06:45:00Z",
    source_domain: "techcrunch.com"
  },
  {
    id: 6,
    text: "Economic Indicators Point to Strong Recovery in Manufacturing Sector",
    source_url: "https://wsj.com/manufacturing-recovery-indicators",
    scraped_at: "2024-01-15T05:30:00Z",
    source_domain: "wsj.com"
  },
  {
    id: 7,
    text: "Renewable Energy Investment Reaches All-Time High Globally",
    source_url: "https://reuters.com/renewable-energy-investment",
    scraped_at: "2024-01-15T04:20:00Z",
    source_domain: "reuters.com"
  },
  {
    id: 8,
    text: "Quantum Computing Breakthrough Achieves New Performance Milestone",
    source_url: "https://nature.com/quantum-computing-breakthrough",
    scraped_at: "2024-01-15T03:15:00Z",
    source_domain: "nature.com"
  }
];

export const getRecentHeadlines = (limit: number = 5) => {
  return mockHeadlines.slice(0, limit);
};

export const getHeadlinesBySource = (domain: string) => {
  return mockHeadlines.filter(headline => headline.source_domain === domain);
};

export const getStats = () => {
  const uniqueSources = [...new Set(mockHeadlines.map(h => h.source_domain))].length;
  const totalHeadlines = mockHeadlines.length;
  const recentHeadlines = mockHeadlines.filter(h => {
    const date = new Date(h.scraped_at);
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return date > yesterday;
  }).length;
  
  return {
    totalHeadlines,
    uniqueSources,
    recentHeadlines,
    avgPerHour: Math.round(recentHeadlines / 24 * 10) / 10
  };
};