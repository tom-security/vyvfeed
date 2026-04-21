export type CategorySlug = "tech" | "ia" | "cyber";

export type RssSource = {
  name: string;
  url: string;
  category: CategorySlug;
};

export const RSS_SOURCES: RssSource[] = [
  { name: "Hacker News",           url: "https://hnrss.org/frontpage",                          category: "tech"  },
  { name: "The Verge",             url: "https://www.theverge.com/rss/index.xml",               category: "tech"  },
  { name: "Wired",                 url: "https://www.wired.com/feed/rss",                       category: "tech"  },
  { name: "MIT Technology Review", url: "https://www.technologyreview.com/feed/",               category: "ia"    },
  { name: "Bleeping Computer",     url: "https://www.bleepingcomputer.com/feed/",               category: "cyber" },
  { name: "Krebs on Security",     url: "https://krebsonsecurity.com/feed/",                    category: "cyber" },
  { name: "The Hacker News",       url: "https://feeds.feedburner.com/TheHackersNews",          category: "cyber" },
  { name: "Le Monde Informatique", url: "https://www.lemondeinformatique.fr/rss.xml",           category: "tech"  },
  { name: "01net",                 url: "https://www.01net.com/feed/",                          category: "tech"  },
  { name: "Ars Technica",          url: "https://feeds.arstechnica.com/arstechnica/index",      category: "cyber" },
];

export const CATEGORIES: {
  slug: CategorySlug;
  label: string;
  color: string;
}[] = [
  { slug: "tech",  label: "Tech",  color: "#0EA5E9" },
  { slug: "ia",    label: "IA",    color: "#8B5CF6" },
  { slug: "cyber", label: "Cyber", color: "#EF4444" },
];

export const SUMMARY_CACHE_TTL_SECONDS = 60 * 60 * 24;
export const DIGEST_ITEM_COUNT = 10;
export const SITE_URL = "https://vyvfeed.vyvox.fr";
