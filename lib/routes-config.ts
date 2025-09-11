export type EachRoute = {
  title: string;
  href: string;
  noLink?: true; // noLink will create a route segment (section) but cannot be navigated
  items?: EachRoute[];
  tag?: string;
};

export const ROUTES: EachRoute[] = [
  {
    title: "Getting Started",
    href: "/getting-started",
    // items: [
    //   { title: "Introduction", href: "/introduction" },
    //   { title: "Installation", href: "/installation" },
    //   { title: "Usage", href: "/usage" },
    //   { title: "Contributing", href: "/contributing" },
    // ],
  },
  {
    title: "Fundamentals",
    href: "/fundamentals",
    noLink: true,
    items: [
      {
        title: "Python, C++ or Java?",
        href: "/dsa-python-cpp-or-java",
      },
      {
        title: "Mathematics for DSA",
        href: "/mathematics-for-dsa",
      },
      { title: "Arrays", href: "/arrays" },
      { title: "Strings", href: "/strings" },
      // { title: "Hashing", href: "/hashing" },
    ],
  },
  {
    title: "Data Structures",
    href: "/data-structures",
    tag: "New",
    items: [
      { title: "Linked Lists", href: "/linked-lists" },
      { title: "Stacks", href: "/stacks" },
      { title: "Queues", href: "/queues" },
      { title: "Trees", href: "/trees" },
      { title: "Heaps", href: "/heaps" },
      { title: "Tries", href: "/tries" },
      { title: "Graphs", href: "/graphs" },
    ],
  },
  {
    title: "Algorithms",
    href: "/algorithms",
    noLink: true,
    items: [
      { title: "Searching", href: "/searching" },
      { title: "Recursion", href: "/recursion" },
      { title: "Backtracking", href: "/backtracking" },
      { title: "Sorting", href: "/sorting" },
      { title: "Dynamic Programming", href: "/dynamic-programming" },
      { title: "Greedy Algorithms", href: "/greedy-algorithms" },
      { title: "Bit Manipulation", href: "/bit-manipulation" },
    ],
  },
  {
    title: "System Design",
    href: "/system-design",
    noLink: true,
    items: [
      {
        title: "Introduction to System Design",
        href: "/introduction-to-system-design",
      },
      { title: "Scalability", href: "/scalability" },
      { title: "Load Balancing", href: "/load-balancing" },
      { title: "Caching", href: "/caching" },
      { title: "Database Design", href: "/database-design" },
      { title: "Microservices", href: "/microservices" },
      { title: "APIs", href: "/apis" },
      { title: "Monitoring & Logging", href: "/monitoring-logging" },
      { title: "Security", href: "/security" },
    ],
  },
  {
    title: "Cheatsheets",
    href: "/cheatsheets",
    noLink: true,
    items: [
      { title: "Mathematics Cheatsheet", href: "/mathematics-cheatsheet" },
      {
        title: "Data Structures Cheatsheet",
        href: "/data-structures-cheatsheet",
      },
      { title: "Algorithms Cheatsheet", href: "/algorithms-cheatsheet" },
      { title: "System Design Cheatsheet", href: "/system-design-cheatsheet" },
    ],
  },
];

type Page = { title: string; href: string };

function getRecurrsiveAllLinks(node: EachRoute) {
  const ans: Page[] = [];
  if (!node.noLink) {
    ans.push({ title: node.title, href: node.href });
  }
  node.items?.forEach((subNode) => {
    const temp = { ...subNode, href: `${node.href}${subNode.href}` };
    ans.push(...getRecurrsiveAllLinks(temp));
  });
  return ans;
}

export const page_routes = ROUTES.map((it) => getRecurrsiveAllLinks(it)).flat();
