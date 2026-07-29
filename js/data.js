/* CampusConnect — mock data layer.
   In the real MERN build this is replaced by API calls (Axios -> Express -> MongoDB). */

const CC_DATA = {

  seniors: [
    { id:"sr1", name:"Ananya Krishnan", branch:"CSE", batch:"2025", cgpa:"9.12", company:"Amazon", role:"SDE-1", type:"Placement", package:"₹28 LPA", photo:"AK", tags:["DSA","System Design","React"],
      linkedin:"#", github:"#", leetcode:"#", portfolio:"#",
      strategy:"Started DSA in 3rd semester, 400+ LeetCode problems, mock interviews every weekend for 2 months before placement season.",
      resources:["Striver's SDE Sheet","CS50","NeetCode 150"],
      tips:"Consistency beats intensity — 2 problems a day for a year outperforms 20 problems the week before an interview." },
    { id:"sr2", name:"Rohit Bansal", branch:"IT", batch:"2025", cgpa:"8.76", company:"Microsoft", role:"SDE Intern", type:"Internship", package:"₹1.1L/month", photo:"RB", tags:["C++","OS","Networks"],
      linkedin:"#", github:"#", leetcode:"#", portfolio:"#",
      strategy:"Focused heavily on OS and CN fundamentals since Microsoft interviews probe deep on core CS. Built two systems projects to talk about.",
      resources:["CS50","Operating Systems Three Easy Pieces","Grokking the Coding Interview"],
      tips:"Be ready to defend every line on your resume — they will dig into your projects more than LeetCode." },
    { id:"sr3", name:"Divya Suresh", branch:"ECE", batch:"2024", cgpa:"9.4", company:"Goldman Sachs", role:"Analyst", type:"Placement", package:"₹24 LPA", photo:"DS", tags:["Java","SQL","Aptitude"],
      linkedin:"#", github:"#", leetcode:"#", portfolio:"#",
      strategy:"Non-CS branch, so doubled down on core Java + SQL + quantitative aptitude since Goldman's process weighs that heavily.",
      resources:["HackerRank SQL","Java Complete Reference","IndiaBix Aptitude"],
      tips:"Branch doesn't matter as much as people think — the right prep for the right company matters more." },
    { id:"sr4", name:"Karthik Iyer", branch:"CSE", batch:"2025", cgpa:"8.9", company:"Flipkart", role:"SDE-1", type:"Placement", package:"₹22 LPA", photo:"KI", tags:["DSA","Node.js","System Design"],
      linkedin:"#", github:"#", leetcode:"#", portfolio:"#",
      strategy:"Built two full-stack projects deployed live, contributed to one open-source repo, kept LeetCode consistent at medium level.",
      resources:["Striver's SDE Sheet","Design Gurus HLD/LLD","freeCodeCamp"],
      tips:"A deployed project with real users beats five half-finished ones in a GitHub repo." },
    { id:"sr5", name:"Meera Pillai", branch:"CSE", batch:"2024", cgpa:"9.6", company:"Google", role:"SWE Intern", type:"Internship", package:"₹1.8L/month", photo:"MP", tags:["DSA","Algorithms","Python"],
      linkedin:"#", github:"#", leetcode:"#", portfolio:"#",
      strategy:"Applied to Google's STEP and internship pipeline early, practiced algorithmic problem solving daily, did 3 mock interviews with alumni.",
      resources:["NeetCode 150","CLRS selected chapters","Pramp mock interviews"],
      tips:"Alumni referrals matter — reach out on LinkedIn early, most seniors are happy to refer if you show real prep." },
    { id:"sr6", name:"Aditya Verma", branch:"MECH", batch:"2024", cgpa:"8.3", company:"Deloitte", role:"Analyst", type:"Placement", package:"₹9.5 LPA", photo:"AV", tags:["Excel","Case Study","Communication"],
      linkedin:"#", github:"#", leetcode:"#", portfolio:"#",
      strategy:"Focused on case interview practice and business communication since core branch placements lean consulting/analyst.",
      resources:["Case in Point","Victor Cheng's LOMS","Toastmasters practice"],
      tips:"Practise structuring your answers out loud — clarity under pressure is what gets remembered." },
    { id:"sr7", name:"Priya Nair", branch:"CSE", batch:"2025", cgpa:"9.0", company:"Adobe", role:"SDE-1", type:"Placement", package:"₹22 LPA", photo:"PN", tags:["DSA","Frontend","System Design"],
      linkedin:"#", github:"#", leetcode:"#", portfolio:"#",
      strategy:"Built a strong frontend portfolio alongside DSA prep — Adobe interviews included a practical UI round.",
      resources:["Frontend Masters","Striver's SDE Sheet","Figma to code practice"],
      tips:"If a company makes creative tools, expect a hands-on round — practice building UI under time pressure." },
    { id:"sr8", name:"Sanjay Rao", branch:"IT", batch:"2024", cgpa:"8.5", company:"Amazon", role:"SDE-1", type:"Placement", package:"₹26 LPA", photo:"SR", tags:["DSA","AWS","Java"],
      linkedin:"#", github:"#", leetcode:"#", portfolio:"#",
      strategy:"Leadership Principles prep was as important as DSA for Amazon — prepared 2 STAR stories per principle.",
      resources:["Striver's SDE Sheet","Amazon LP guide","AWS free tier projects"],
      tips:"Don't skip the behavioral round prep — it eliminates more Amazon candidates than the coding rounds." }
  ],

  companies: [
    { id:"amazon", name:"Amazon", students:2, difficulty:"Hard", rounds:4, timeline:"OA → 2 Technical → Bar Raiser", focus:"DSA + Leadership Principles" },
    { id:"microsoft", name:"Microsoft", students:1, difficulty:"Hard", rounds:4, timeline:"OA → 3 Technical (incl. system design)", focus:"CS Fundamentals + DSA" },
    { id:"goldman-sachs", name:"Goldman Sachs", students:1, difficulty:"Medium", rounds:3, timeline:"OA (SQL+Aptitude) → 2 Interviews", focus:"SQL + Java + Aptitude" },
    { id:"flipkart", name:"Flipkart", students:1, difficulty:"Hard", rounds:4, timeline:"OA → 2 Technical → Hiring Manager", focus:"DSA + System Design" },
    { id:"google", name:"Google", students:1, difficulty:"Very Hard", rounds:5, timeline:"OA → 2 Technical → Googleyness → Team Match", focus:"Algorithms + Problem Solving" },
    { id:"deloitte", name:"Deloitte", students:1, difficulty:"Medium", rounds:3, timeline:"Group Discussion → Case → HR", focus:"Case Study + Communication" },
    { id:"adobe", name:"Adobe", students:1, difficulty:"Hard", rounds:4, timeline:"OA → Technical → UI Round → Hiring Manager", focus:"DSA + Frontend Practical" }
  ],

  experiences: [
    { id:"ex1", seniorId:"sr1", company:"Amazon", role:"SDE-1", difficulty:"Hard", timeline:"5 weeks", oa:"2 coding problems on arrays and graphs, 90 minutes.", technical:"Two rounds — one pure DSA (trees, DP), one LLD on designing a parking lot system.", hr:"Bar raiser round covering all 14 Leadership Principles with STAR-format answers expected.", tips:"Prepare Leadership Principle stories before anything else — it's where most candidates lose points." },
    { id:"ex2", seniorId:"sr2", company:"Microsoft", role:"SDE Intern", difficulty:"Hard", timeline:"3 weeks", oa:"1 coding problem plus 20 CS fundamentals MCQs.", technical:"Deep dive into OS concepts (paging, deadlocks) plus a coding problem on linked lists.", hr:"Casual chat about projects and why Microsoft.", tips:"They care more about how you think through a problem out loud than whether you get the optimal solution first try." },
    { id:"ex3", seniorId:"sr5", company:"Google", role:"SWE Intern", difficulty:"Very Hard", timeline:"6 weeks", oa:"2 problems, medium-hard, strict time limit.", technical:"Three rounds of pure algorithmic problem solving, plus one Googleyness and Leadership round.", hr:"Behavioral round focused on collaboration and ambiguity handling.", tips:"Talk through edge cases before you start coding — interviewers actively watch for that habit." },
    { id:"ex4", seniorId:"sr4", company:"Flipkart", role:"SDE-1", difficulty:"Hard", timeline:"4 weeks", oa:"3 coding problems covering arrays, strings, and graphs.", technical:"One DSA round, one system design round on designing a URL shortener.", hr:"Hiring manager round focused on past projects and ownership.", tips:"Be ready to justify every design trade-off in the system design round, not just draw boxes." },
    { id:"ex5", seniorId:"sr3", company:"Goldman Sachs", role:"Analyst", difficulty:"Medium", timeline:"3 weeks", oa:"SQL queries plus quantitative aptitude test.", technical:"Java fundamentals and a couple of easy-medium coding problems.", hr:"Fit interview about working in finance and long hours.", tips:"Sharpen SQL joins and window functions specifically — they show up in almost every finance-adjacent OA." },
    { id:"ex6", seniorId:"sr7", company:"Adobe", role:"SDE-1", difficulty:"Hard", timeline:"4 weeks", oa:"2 DSA problems, medium difficulty.", technical:"One DSA round, one live UI-building round in the browser.", hr:"Portfolio walkthrough and design sensibility discussion.", tips:"Practice building a small UI component from scratch under a 30-minute clock before the interview." }
  ],

  resources: [
    { id:"r1", title:"Striver's SDE Sheet", type:"Roadmap", company:"General", link:"#", by:"sr1" },
    { id:"r2", title:"NeetCode 150", type:"Roadmap", company:"General", link:"#", by:"sr5" },
    { id:"r3", title:"Amazon Leadership Principles Guide", type:"PDF", company:"Amazon", link:"#", by:"sr8" },
    { id:"r4", title:"Operating Systems — Three Easy Pieces", type:"Book", company:"Microsoft", link:"#", by:"sr2" },
    { id:"r5", title:"Case in Point", type:"Book", company:"Deloitte", link:"#", by:"sr6" },
    { id:"r6", title:"HackerRank SQL Practice", type:"Article", company:"Goldman Sachs", link:"#", by:"sr3" },
    { id:"r7", title:"Design Gurus HLD/LLD Notes", type:"Notes", company:"Flipkart", link:"#", by:"sr4" },
    { id:"r8", title:"Frontend Practical Prep Playlist", type:"YouTube", company:"Adobe", link:"#", by:"sr7" }
  ],

  stats: { placed: 214, companies: 38, avgPackage: "₹14.2 LPA", topPackage: "₹28 LPA" }
};
