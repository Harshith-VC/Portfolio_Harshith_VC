/* ============================================================
   DATA · Harshith V C Netflix-style portfolio
   ============================================================ */

const LINKS = {
  resume: "https://files.codebasics.io/uploads/learner-portfolio/resumes/214929/686223b2dfb80/0d5d11f290.pdf",
  linkedin: "https://www.linkedin.com/in/harshith-v-c/",
  github: "https://github.com/Harshith-VC",
  linktree: "https://linktr.ee/Harshith_VC",
  email: "mailto:harshithacharya6@gmail.com",
  phone: "tel:+916362632584",
  bi360Live: "https://app.powerbi.com/view?r=eyJrIjoiYWU1YjVjZmYtMGQ2OC00MzU4LWEyZWUtYTJjYjNkMDVhY2I3IiwidCI6ImM2ZTU0OWIzLTVmNDUtNDAzMi1hYWU5LWQ0MjQ0ZGM1YjJjNCJ9",
  spotifyLive: "https://app.powerbi.com/view?r=eyJrIjoiODk1ZmE0NzQtMzU3Ny00NjQ5LWFlZWMtNTUyYTQ0OTQ3ZmUyIiwidCI6ImM2ZTU0OWIzLTVmNDUtNDAzMi1hYWU5LWQ0MjQ0ZGM1YjJjNCJ9",
  iplLive: "https://app.powerbi.com/view?r=eyJrIjoiMTRjOWFiZjQtMzI4Ny00NzdlLWI2NjUtMjgyNmY1YWRlMzAyIiwidCI6ImM2ZTU0OWIzLTVmNDUtNDAzMi1hYWU5LWQ0MjQ0ZGM1YjJjNCJ9"
};

const IMG = "https://images.codebasics.io/filters:format(webp)/fit-in/650x650/uploads/learner-portfolio/projects/screenshot/214929/";
const SHOTS = {
  bi360a: IMG + "663a59f3aa5de/9800e28f38.jpg",
  bi360b: IMG + "663a59f3cd0a4/a1b80e3cde.jpg",
  salesfin: IMG + "6639282a1a3c5/010d828079.jpeg",
  salesfinB: IMG + "6639282a32b25/0a1cc8d994.jpeg",
  hr: IMG + "663a63fe61a5f/d8452afccc.png",
  spotify: IMG + "663a66cf010e8/88574ff50e.jpg",
  ipl: IMG + "663a6ae97e541/ed77410f6b.jpg",
  iplB: IMG + "663a6ae9877d4/2ae3c77432.jpg",
  pizza: IMG + "663a71b25f46e/ec2965eb85.png"
};

/* ---------- profiles (6 lenses) ---------- */
const PROFILES = {
  recruiter:  { name:"Recruiter",  tagline:"Show me the impact",   color:"#21c7ee", color2:"#0e8fb0",
    stats:[["92","Hiring score"],["6+","Projects shipped"],["10+","Certifications"]] },
  developer:  { name:"Developer",  tagline:"Show me the build",    color:"#9aa3ad", color2:"#5c646d",
    stats:[["88","Tech credibility"],["10+","Tables, biggest model"],["6","Public repos"]] },
  sales:      { name:"Sales",      tagline:"Show me the opening",  color:"#22c55e", color2:"#14532d",
    stats:[["81","Receptivity index"],["15+","Tools in active use"],["3","Outreach windows"]] },
  founder:    { name:"Founder",    tagline:"Show me the upside",   color:"#ffb020", color2:"#92580a",
    stats:[["87","Builder quotient"],["0→1","Solo products shipped"],["2","Market domains"]] },
  researcher: { name:"Researcher", tagline:"Show me the method",   color:"#8b5cf6", color2:"#3b0764",
    stats:[["85","Rigor index"],["5","Knowledge domains"],["12+","Public artifacts"]] },
  stalker:    { name:"Stalker",    tagline:"Show me everything",   color:"#e50914", color2:"#8f0a10",
    stats:[["TOP 15%","Peer-market position"],["+94","Growth velocity"],["4","Threat indicators"]] }
};
const PROFILE_ORDER = ["recruiter","developer","sales","founder","researcher","stalker"];

/* fuzzy Netflix-ish avatar as inline SVG */
function avatarSVG(c1, c2, id) {
  const uid = "f" + Math.random().toString(36).slice(2, 8);
  return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="g${uid}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/>
    </linearGradient>
    <filter id="fur${uid}">
      <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="3" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .55 0"/>
      <feComposite operator="in" in2="SourceGraphic"/>
    </filter>
  </defs>
  <rect width="120" height="120" rx="10" fill="url(#g${uid})"/>
  <rect width="120" height="120" rx="10" fill="#000" opacity=".18" filter="url(#fur${uid})"/>
  <circle cx="42" cy="46" r="10" fill="#0b0b0b"/><circle cx="45.5" cy="42.5" r="3" fill="#fff"/>
  <circle cx="38" cy="50" r="1.4" fill="#fff" opacity=".85"/><circle cx="42" cy="53" r="1.1" fill="#fff" opacity=".7"/>
  <circle cx="80" cy="46" r="10" fill="#0b0b0b"/><circle cx="83.5" cy="42.5" r="3" fill="#fff"/>
  <circle cx="76" cy="50" r="1.4" fill="#fff" opacity=".85"/><circle cx="80" cy="53" r="1.1" fill="#fff" opacity=".7"/>
  <path d="M38 76 Q60 92 84 74" fill="none" stroke="#0b0b0b" stroke-width="6" stroke-linecap="round"/>
</svg>`;
}

/* ============================================================
   CONTENT ITEMS
   type: project | page | link
   ============================================================ */
const ITEMS = {

  /* ---------- analytics projects ---------- */
  bi360: {
    type:"project", tag:"POWER BI", live:LINKS.bi360Live, match:98, year:"S1 · 4 stakeholder teams",
    title:"Business Insights 360", img:SHOTS.bi360a, img2:SHOTS.bi360b,
    sub:"One governed source of truth across finance, sales, marketing & supply chain",
    lead:"AtliQ Hardwares was losing to data-driven rivals because reporting lived in scattered Excel files. This Power BI platform gave four stakeholder groups one drillable source of truth.",
    problem:"Leadership had no unified view of the business. Every team argued from its own spreadsheet.",
    approach:["Robust star-schema data model spanning 10+ tables","Basic and advanced Power Query transformations","Complex DAX for P&L, forecast accuracy, and market share","Bookmarks, drill-downs, and stakeholder feedback loops","Deployed via Power BI Service"],
    findings:["Unified P&L exposed margin pressure invisible in siloed reports","Forecast accuracy views flagged where demand planning was failing","Sales, finance, and supply chain finally argued from the same numbers"],
    impact:"Cut reporting fragmentation and enabled faster, evidence-based decisions across all four functions.",
    kpis:"Net Sales · GM % · Forecast Accuracy · Market Share",
    tools:["Power BI","Power Query","DAX","Data Modeling","Power BI Service"],
    github:"https://github.com/Harshith-VC/Business-Insights-360-Power-BI",
    video:"https://www.youtube.com/watch?v=Q5oGtQgHtw8"
  },
  salesfin: {
    type:"project", tag:"EXCEL", match:95, year:"S1 · Sales & Finance",
    title:"Sales & Finance Analytics", img:SHOTS.salesfin, img2:SHOTS.salesfinB,
    sub:"Excel ETL + data model powering discount and expansion decisions",
    lead:"A refreshable Excel reporting suite that turned raw transactions into customer performance, market versus target, and P&L views for AtliQ Hardwares.",
    problem:"The business needed evidence to set customer discounts, negotiate, and pick expansion markets, but had no structured sales reporting.",
    approach:["ETL integration with Power Query","Data model via Power Pivot with DAX basics","Pivot-driven customer and market performance reports","Conditional formatting and report design for readability"],
    findings:["Customer-level views made discount effectiveness visible and negotiable","Market vs target analysis surfaced high-potential countries","The refreshable model killed repetitive manual report assembly"],
    impact:"Equipped the business to optimize sales strategy and negotiate discounts with evidence.",
    kpis:"Net Sales · Performance vs Target · Customer Discounts",
    tools:["Excel","Power Query","Power Pivot","Pivot Tables","DAX"],
    github:"https://github.com/Harshith-VC/Excel_Reports_Insights_AtliQ_Hardwares"
  },
  hr: {
    type:"project", tag:"EXCEL", match:93, year:"S1 · HR Analytics",
    title:"HR Attrition Dashboard", img:SHOTS.hr,
    sub:"Why employees leave, segmented and made obvious",
    lead:"An interactive Excel dashboard that converts attrition from an unexplained cost into a segmented, addressable problem for HR leadership.",
    problem:"HR could see people leaving but not who, where, or why. Retention strategy was reactive guesswork.",
    approach:["Cleaned and structured the HR dataset","Interactive dashboard with pivot tables and slicers","Segmentation by department, role, education, gender, age, and travel"],
    findings:["Sales leads attrition at 15.8% vs ~9.6% for HR and R&D","Bachelor's degree holders highest at 8.3%","Ages 26 to 35 highest at 7.9%; frequent travelers elevated at 7.5%"],
    impact:"Gave HR clear intervention targets: Sales department, key roles, the 26 to 35 cohort, and travel policy.",
    kpis:"Attrition Rate · Attrition by Role · Attrition by Age",
    tools:["Excel","Advanced Excel","Pivot Tables","Dashboard Design"],
    github:"https://lnkd.in/g_S3hd4U",
    video:"https://www.youtube.com/watch?v=1brzKqVhrHI"
  },
  ipl: {
    type:"project", tag:"POWER BI", live:LINKS.iplLive, match:91, year:"S3 · 3 IPL seasons",
    title:"IPL 2024 Magazine", img:SHOTS.ipl, img2:SHOTS.iplB,
    sub:"Three seasons of cricket data as a magazine-grade report",
    lead:"A magazine-style Power BI report distilling three IPL seasons into player and team performance stories, built to drive fan engagement and web traffic for Sports Basics.",
    problem:"The outlet wanted traffic from an IPL special edition but needed data-backed stories, not opinion.",
    approach:["Multi-season data model for comparative analysis","Batting, bowling, and team performance views","Magazine-style visual identity inside Power BI"],
    findings:["Consistency rankings separated sustained performers from one-season wonders","Team trends revealed momentum shifts across tournaments"],
    impact:"Publish-ready cricket insight designed to boost engagement and traffic.",
    kpis:"Batting & Bowling Stats · Team Trends · Engagement",
    tools:["Power BI","DAX","Data Modeling","Sports Analytics"],
    github:"https://lnkd.in/gX4EmjZd",
    video:"https://www.youtube.com/watch?v=HR44OoALUOQ"
  },
  pizza: {
    type:"project", tag:"SQL", match:90, year:"S1 · Operations",
    title:"Pizza Sales Analysis", img:SHOTS.pizza,
    sub:"Pure SQL turning transactions into an operations playbook",
    lead:"Analytical SQL across orders, products, and categories to sharpen promotions, optimize the menu, and align staffing with real demand.",
    problem:"Promotions, menu, and staffing ran on intuition, wasting labor in lulls and losing revenue at peaks.",
    approach:["Joins and CTEs across the normalized sales schema","Revenue and volume by item, category, size, and hour","Window functions ranking peak demand windows"],
    findings:["Clear peak ordering hours where staffing must concentrate","A small set of items drives a disproportionate revenue share","Identifiable underperformers fit for promotion or removal"],
    impact:"A query-backed playbook for promotion precision, menu optimization, and staffing efficiency.",
    kpis:"Revenue by Hour · Best & Worst Sellers · Peak Times",
    tools:["SQL","MySQL","CTEs","Window Functions","Aggregation"],
    github:"https://lnkd.in/gpCReN5h",
    video:"https://www.youtube.com/watch?v=Y_UixTVbFu4"
  },

  /* ---------- AI & ML ---------- */
  spotify: {
    type:"project", tag:"POWER BI + AI", live:LINKS.spotifyLive, match:97, year:"S2 · GenAI assisted",
    title:"Spotify Songs Analysis", img:SHOTS.spotify,
    sub:"LLM-enriched data meets DENEB visuals and glass morphism",
    lead:"A global music analytics dashboard where AI-assisted data enrichment (ChatGPT + Python) feeds a decision-grade, design-forward Power BI product.",
    problem:"Music industry decisions need a clear read on behavior, genres, and regions, but raw streaming data is noisy and incomplete.",
    approach:["Dataset enrichment via ChatGPT and Python, an applied LLM workflow","Analytical model and measures in Power BI","DENEB custom visuals, glass morphism design, HTML cover art"],
    findings:["Top-streamed songs worldwide and their trajectories","Distinct market-level genre preferences by region","Sustained hitmakers separated from viral spikes"],
    impact:"Demonstrated an AI-augmented analytics workflow end to end.",
    kpis:"Top Streams · Regional Preferences · Artist Rankings",
    tools:["Power BI","DENEB","Python","ChatGPT","DAX","HTML/CSS"],
    github:"https://github.com/Harshith-VC/Spotify-Songs-Analysis",
    video:"https://www.youtube.com/watch?v=FmrB61zxwAg"
  },
  promptpro: {
    type:"project", tag:"GENAI APP", match:99, year:"S1 · AI Day event", icon:"🤖", tileColors:["#16a34a","#065f46"],
    title:"Prompt Like A PRO",
    sub:"Six games. One rubric. LLM-judged prompt engineering.",
    lead:"A gamified prompt engineering platform: six skill-building games ordered by difficulty, real-time LLM-as-judge scoring against a 6-block rubric with evidence quotes, and a live event leaderboard.",
    problem:"Slides do not teach prompting. People learn by prompting, getting judged, and improving, which needs an interactive system.",
    approach:["6-block rubric: Role, Task, Context, Audience, Format, Constraints","Six games: Persona Roulette, Prompt Detective, Beat the Bot, Draw With Words, Crack the Vault, The Mind Reader","LLM-as-judge scoring via the Anthropic Claude API with per-block grades","Python + SQLite backend with one-game-per-login integrity","Separate live leaderboard display polling results in real time"],
    findings:["Structured rubrics make prompt quality teachable and measurable","Evidence-quoted AI feedback earns player trust","Game mechanics massively outperform lecture formats for engagement"],
    impact:"An end-to-end GenAI product: UX, backend, LLM integration, and evaluation design.",
    kpis:"Rubric Score / 6 · Games Completed · Leaderboard Rank",
    tools:["Python","SQLite","Claude API","LLM-as-Judge","Prompt Engineering","HTML/CSS/JS"]
  },
  mlwork: {
    type:"project", tag:"MACHINE LEARNING", match:94, year:"S2 · Applied ML", icon:"📐", tileColors:["#7c3aed","#312e81"],
    title:"Applied ML in Business Analytics",
    sub:"Segmentation, forecasting, and experimentation that earn their keep",
    lead:"Machine learning applied where it changes decisions: customer segmentation, demand forecasting, and A/B experiment design woven into everyday analytics.",
    problem:"Who will churn, what demand comes next, which variant wins: questions descriptive reporting cannot answer.",
    approach:["Clustering and cohort analysis segmenting customers by value and behavior","Time-series forecasting of order volumes across cities","A/B experiment design: hypotheses, success metrics, interpretation"],
    findings:["Behavioral segments predicted churn in high-value customers weeks ahead","City-level forecasts improved inventory positioning","Experiment rigor prevented shipping features based on noise"],
    impact:"~12% retention lift in high-value segments, fewer stockouts, and statistically defensible product calls.",
    kpis:"Retention Lift · Forecast Error · Test Significance",
    tools:["Python","Clustering","Forecasting","A/B Testing","Statistics"]
  },

  /* ---------- category pages ---------- */
  about:          { type:"page", page:"about",          title:"About Me",           icon:"🧭", tileColors:["#0ea5e9","#0c4a6e"], sub:"Who is Harshith V C?" },
  skills:         { type:"page", page:"skills",         title:"Skills",             icon:"🧠", tileColors:["#f59e0b","#7c2d12"], sub:"The full toolkit, six categories deep" },
  experience:     { type:"page", page:"experience",     title:"Experience",         icon:"📈", tileColors:["#10b981","#064e3b"], sub:"Ten areas of hands-on analytics work" },
  certifications: { type:"page", page:"certifications", title:"Certifications",     icon:"🎓", tileColors:["#8b5cf6","#3b0764"], sub:"10+ verified credentials" },
  contact:        { type:"page", page:"contact",        title:"Contact Me",         icon:"✉️", tileColors:["#ef4444","#7f1d1d"], sub:"Email, LinkedIn, GitHub, phone" },
  dashboards:     { type:"page", page:"dashboards",     title:"Live Dashboards",    icon:"📊", tileColors:["#06b6d4","#164e63"], sub:"Fully interactive Power BI, no login" },

  /* ---------- links ---------- */
  resume:   { type:"link", href:LINKS.resume,   title:"Resume",        icon:"📄", tileColors:["#e50914","#5c060b"], sub:"Download the PDF" },
  github:   { type:"link", href:LINKS.github,   title:"GitHub",        icon:"💻", tileColors:["#374151","#0b0f19"], sub:"github.com/Harshith-VC" },
  linkedin: { type:"link", href:LINKS.linkedin, title:"LinkedIn",      icon:"💼", tileColors:["#0a66c2","#0a3866"], sub:"/in/harshith-v-c" },
  linktree: { type:"link", href:LINKS.linktree, title:"All My Links",  icon:"🌳", tileColors:["#16a34a","#052e16"], sub:"linktr.ee/Harshith_VC" }
};

/* ============================================================
   ROWS PER PROFILE
   ============================================================ */
const ROWS = {
  recruiter: [
    { id:"toppicks",     title:"Today's Top Picks for Recruiter",   items:["resume","experience","skills","certifications","bi360","contact"] },
    { id:"continue",     title:"Continue Watching for Recruiter",   items:["salesfin","hr","about","dashboards","linkedin"] },
    { id:"row-analytics",title:"Analytics Projects",                items:["bi360","salesfin","hr","ipl","pizza","spotify"] },
    { id:"row-ai",       title:"AI & Machine Learning",             items:["promptpro","spotify","mlwork"] },
    { id:"row-skills",   title:"Top 10 Skills Today",               numbered:true },
    { id:"row-more",     title:"More Ways to Evaluate Me",          items:["certifications","github","dashboards","contact","linktree"] }
  ],
  developer: [
    { id:"toppicks",     title:"Today's Top Picks for Developer",   items:["github","promptpro","bi360","pizza","skills","mlwork"] },
    { id:"row-ai",       title:"Because You Like Building Things",  items:["promptpro","spotify","mlwork","dashboards"] },
    { id:"row-analytics",title:"Analytics Projects",                items:["bi360","salesfin","hr","ipl","pizza","spotify"] },
    { id:"row-skills",   title:"Top 10 Skills Today",               numbered:true },
    { id:"continue",     title:"Continue Watching for Developer",   items:["experience","certifications","about","contact"] }
  ],
  sales: [
    { id:"toppicks",     title:"Today's Top Picks for Sales",       items:["contact","linkedin","promptpro","about","linktree","resume"] },
    { id:"continue",     title:"Where He Shows Up",                 items:["github","dashboards","certifications","experience"] },
    { id:"row-ai",       title:"Tools He Actually Uses",            items:["promptpro","spotify","mlwork"] },
    { id:"row-analytics",title:"Proof of Work",                     items:["bi360","salesfin","hr","ipl","pizza"] },
    { id:"row-skills",   title:"Top 10 Skills Today",               numbered:true }
  ],
  founder: [
    { id:"toppicks",     title:"Today's Top Picks for Founder",     items:["promptpro","mlwork","bi360","about","github","resume"] },
    { id:"row-ai",       title:"0 to 1 Evidence",                   items:["promptpro","spotify","mlwork"] },
    { id:"row-analytics",title:"Execution Track Record",            items:["bi360","salesfin","hr","ipl","pizza"] },
    { id:"row-skills",   title:"Top 10 Skills Today",               numbered:true },
    { id:"continue",     title:"Due Diligence Corner",              items:["experience","certifications","contact","linkedin"] }
  ],
  researcher: [
    { id:"toppicks",     title:"Today's Top Picks for Researcher",  items:["mlwork","promptpro","certifications","skills","about","github"] },
    { id:"continue",     title:"Methods in the Wild",               items:["hr","pizza","spotify","experience"] },
    { id:"row-analytics",title:"Analytics Projects",                items:["bi360","salesfin","hr","ipl","pizza","spotify"] },
    { id:"row-ai",       title:"AI & Evaluation Work",              items:["promptpro","mlwork","spotify"] },
    { id:"row-skills",   title:"Top 10 Skills Today",               numbered:true }
  ],
  stalker: [
    { id:"toppicks",     title:"Today's Top Picks for Stalker",     items:["contact","linkedin","github","linktree","about","resume"] },
    { id:"continue",     title:"Keep Digging",                      items:["experience","certifications","skills","dashboards"] },
    { id:"row-analytics",title:"Analytics Projects",                items:["bi360","salesfin","hr","ipl","pizza","spotify"] },
    { id:"row-ai",       title:"AI & Machine Learning",             items:["promptpro","spotify","mlwork"] },
    { id:"row-skills",   title:"Top 10 Skills Today",               numbered:true }
  ]
};

/* Top 10 numbered skills */
const TOP_SKILLS = [
  { name:"SQL",                   note:"Advanced querying",       colors:["#0ea5e9","#0c4a6e"], icon:"🗄️" },
  { name:"Power BI",              note:"DAX · modeling · design", colors:["#f59e0b","#78350f"], icon:"📊" },
  { name:"Excel",                 note:"Power Query · Pivot",     colors:["#10b981","#064e3b"], icon:"📈" },
  { name:"Python",                note:"Data analysis · ML",      colors:["#6366f1","#1e1b4b"], icon:"🐍" },
  { name:"Data Storytelling",     note:"Insight → decision",      colors:["#ef4444","#7f1d1d"], icon:"📖" },
  { name:"Prompt Engineering",    note:"GenAI · LLM apps",        colors:["#16a34a","#052e16"], icon:"🤖" },
  { name:"Business Analysis",     note:"Requirements → value",    colors:["#8b5cf6","#3b0764"], icon:"🧭" },
  { name:"Statistics",            note:"A/B tests · inference",   colors:["#06b6d4","#164e63"], icon:"📐" },
  { name:"Data Modeling",         note:"Star schemas · ETL",      colors:["#f97316","#7c2d12"], icon:"🧩" },
  { name:"Tableau",               note:"Visual analytics",        colors:["#64748b","#1e293b"], icon:"📉" }
];

/* Skills page content */
const SKILL_GROUPS = [
  { h:"Data Analytics", items:["SQL","Advanced SQL","Python","Excel","Power Query","Power Pivot","Power BI","DAX","Tableau","Data Visualization","Statistics","KPI Development","Data Storytelling","Dashboard Design","A/B Testing"] },
  { h:"Business Analysis", items:["Requirement Gathering","Stakeholder Management","Business Process Analysis","Process Improvement","Documentation","Root Cause Analysis","Business Case Development","Agile","Scrum","Product Analytics"] },
  { h:"Data Engineering", items:["ETL","ELT","Data Warehousing","Data Modeling","Star Schema Design","Data Pipelines","Data Governance","Azure Data Factory","Databricks","Synapse Analytics"] },
  { h:"AI & Machine Learning", items:["Machine Learning","Predictive Analytics","Regression","Classification","Clustering","NLP","Generative AI","LLM Applications","Prompt Engineering","AI Automation","AI Agents","Recommendation Systems","Forecasting","Feature Engineering","Model Evaluation"] },
  { h:"Cloud & Platforms", items:["Microsoft Azure","Azure AI Services","Azure OpenAI","Microsoft Fabric","Snowflake","Databricks","Power BI Service","GitHub"] },
  { h:"AI & Productivity Tools", items:["ChatGPT","Claude","Microsoft Copilot","GitHub Copilot","Gemini","NotebookLM","Perplexity","Cursor AI","Windsurf","Lovable","Bolt.new","Replit AI","Power Automate","Make.com","Zapier","LangChain","LangGraph","OpenAI APIs","Anthropic API"] }
];

/* Experience page content */
const EXPERIENCE = [
  { h:"Funnel Conversion Analysis", p:"Investigated user journeys to identify drop-off points in checkout and onboarding flows; findings led to a redesigned funnel.", imp:"▲ ~10 to 15% conversion increase" },
  { h:"Pricing & Revenue Optimization", p:"Analyzed transaction data to uncover pricing gaps across regions; recommendations improved order value while staying competitive.", imp:"▲ Improved average order value" },
  { h:"Customer Segmentation Strategy", p:"Applied clustering and cohort analysis to segment customers by value and behavior, powering targeted campaigns.", imp:"▲ ~12% retention lift, high-value users" },
  { h:"Forecasting & Demand Planning", p:"Built time-series models predicting order volumes across cities, enabling better inventory planning.", imp:"▼ Reduced stockouts and excess inventory" },
  { h:"A/B Test Design & Interpretation", p:"Designed experiments with product teams, defined success metrics, and interpreted results with statistical rigor.", imp:"✓ Statistically backed feature decisions" },
  { h:"BI Dashboard Development", p:"Delivered interactive Tableau and Power BI dashboards for sales and operations, focused on essential KPIs.", imp:"▼ Reduced manual reporting hours" },
  { h:"Data Quality & Pipeline Collaboration", p:"Defined data requirements with engineering and validated pipeline outputs, improving core dataset reliability.", imp:"▼ ~30% less manual cleaning effort" },
  { h:"Process Automation & Efficiency", p:"Rebuilt repetitive reporting workflows with automated solutions, cutting processing time and errors.", imp:"▼ ~40% faster processing" },
  { h:"Ad Hoc Problem-Solving Analysis", p:"Led fast-turnaround investigations into sudden metric changes using first-principles reasoning for leadership.", imp:"✓ Rapid answers for urgent questions" },
  { h:"Stakeholder Communication", p:"Presented findings to senior leadership and cross-functional teams in clear, actionable language.", imp:"✓ Insight adoption across teams" }
];

/* Certifications page content */
const CERTS = [
  { i:"🎓", h:"Google Advanced Data Analytics", p:"Coursera Specialization · Google", link:"https://www.coursera.org/account/accomplishments/specialization/X4LQRMQAOBUE" },
  { i:"🚀", h:"Data Analytics Bootcamp 5.0", p:"Job Placement Support + AI Automation & Data Engineering Basics · Codebasics" },
  { i:"📊", h:"Power BI Data Analytics for All Levels 3.0", p:"Get Job Ready · Codebasics" },
  { i:"🗄️", h:"SQL Beginner to Advanced", p:"For Data Professionals · Codebasics" },
  { i:"🐍", h:"Python Beginner to Advanced", p:"For Data Professionals · Codebasics" },
  { i:"📈", h:"Excel: Mother of Business Intelligence", p:"Advanced Excel & BI foundations · Codebasics" },
  { i:"📉", h:"Tableau Mini", p:"Visual analytics with Tableau · Codebasics" },
  { i:"🏆", h:"Codebasics Resume Project Challenge", p:"Competitive analytics project challenge" },
  { i:"💼", h:"Virtual Internship", p:"Applied analytics internship experience · Codebasics" },
  { i:"🗣️", h:"Communication Masterclass", p:"Stakeholder communication & presentation" }
];

/* ============================================================
   AI ORIGINAL BRIEFINGS · hero per profile
   ============================================================ */
const BRIEFINGS = {
  recruiter: {
    title:"The Strong Hire", featured:"bi360",
    meta:{ match:"98% Match for Recruiters", season:"S1 · Talent Dossier", tag:"HIRING INTEL" },
    synopsis:"AI synthesis: a high-trajectory data and analytics professional with a complete delivery loop. He gathers the business question, models the data, builds the BI product, and presents the recommendation himself. Strongest fit: Data Analyst, BI Developer, or Analytics Consultant roles where storytelling matters as much as execution.",
    play:{ label:"▶  Open Featured Dashboard", href:LINKS.bi360Live }
  },
  developer: {
    title:"Full-Stack Builder", featured:"promptpro",
    meta:{ match:"96% Match for Developers", season:"S1 · Technical Review", tag:"ENGINEERING INTEL" },
    synopsis:"AI synthesis: not a tutorial-follower profile. Star schemas across 10+ tables, defense-in-depth integrity enforcement, LLM-as-judge evaluation design, and Python backends. Architecture choices show independent engineering judgment from the data layer to the decision layer.",
    play:{ label:"▶  Open GitHub", href:LINKS.github }
  },
  sales: {
    title:"The Warm Prospect", featured:"spotify",
    meta:{ match:"81% Receptivity Index", season:"S1 · Engagement Dossier", tag:"SALES INTEL" },
    synopsis:"AI synthesis: treat him as a practitioner-influencer, not a transactional buyer. He adopts tools hands-on, stress-tests them in real projects, and shares outcomes publicly: the classic bottom-up champion profile. Lead with a sandbox, a demo, or a co-built artifact. He evaluates by building.",
    play:{ label:"▶  Open Live Dashboard", href:LINKS.spotifyLive }
  },
  founder: {
    title:"Zero to One", featured:"promptpro",
    meta:{ match:"87 Builder Quotient", season:"S1 · Venture Readout", tag:"FOUNDER INTEL" },
    synopsis:"AI synthesis: repeatedly converts an idea into a working product alone: scoping, building, integrating AI, and shipping to real users on a hard deadline. Fits the technical-domain-founder archetype, with a latent SaaS wedge in AI-evaluated skills training.",
    play:{ label:"▶  See the Evidence", href:LINKS.github }
  },
  researcher: {
    title:"The Method", featured:"mlwork",
    meta:{ match:"85 Rigor Index", season:"S1 · Methods Audit", tag:"RESEARCH INTEL" },
    synopsis:"AI synthesis: hypothesis-driven habits throughout. Success metrics defined before experiments, structured rubrics before judging, validation before delivery. Rare bridge: classical statistics discipline applied to generative AI evaluation.",
    play:{ label:"▶  Verify Credentials", href:"https://www.coursera.org/account/accomplishments/specialization/X4LQRMQAOBUE" }
  },
  stalker: {
    title:"The Complete Dossier", featured:"bi360",
    meta:{ match:"TOP 15% Peer Position", season:"S1 · Everything File", tag:"FULL SURVEILLANCE" },
    synopsis:"AI synthesis: you want everything, so here it is. Strengths, weaknesses, market position, growth velocity, every link, and exactly why he is a competitive threat to rival candidates. Nothing redacted.",
    play:{ label:"▶  All His Links", href:LINKS.linktree }
  }
};

/* ============================================================
   INTELLIGENCE REPORT · unique modules per profile
   module types: gauge, summary, insights, bars, stats, timeline,
   list, graph, radar, scatter, spark
   ============================================================ */
const INTEL = {

recruiter: [
  { type:"gauge", span:"s4", title:"Hiring Recommendation", value:92,
    verdict:"<em>Strong Hire</em> · Analytics IC track",
    sub:"High signal-to-noise candidate. Ships complete work, documents it, and communicates it to leadership without translation loss.",
    conf:"CONFIDENCE HIGH · BASIS: PUBLIC PORTFOLIO + CREDENTIALS" },
  { type:"timeline", span:"s4", title:"Career Progression", items:[
    { d:"FOUNDATION", t:"Analytics core built", p:"SQL, Python, Excel, Power BI certified beginner to advanced." },
    { d:"DELIVERY", t:"Six engagements shipped", p:"Executive BI, sales & finance, HR attrition, SQL ops, sports analytics." },
    { d:"VALIDATION", t:"Google Advanced Data Analytics", p:"Plus a competitive resume project challenge." },
    { d:"EXPANSION", t:"GenAI product delivery", p:"LLM-judged prompt platform: rubric, Claude API, backend, live leaderboard." },
    { d:"NOW", t:"Open to opportunities", p:"Data analyst, BI developer, analytics consultant scope." }
  ]},
  { type:"bars", span:"s4", title:"Skill Maturity", items:[
    { l:"SQL & Querying", v:92, n:"Window functions, CTEs" },
    { l:"Power BI & DAX", v:90, n:"10+ table models, service deployment" },
    { l:"Excel · Power Query", v:90, n:"ETL, executive reports" },
    { l:"Python", v:85, n:"Analysis, enrichment, backends" },
    { l:"Storytelling", v:88, n:"Leadership-facing delivery" },
    { l:"GenAI & Prompting", v:86, n:"LLM apps, evaluation rubrics" }
  ]},
  { type:"list", span:"s4", title:"Interview Focus Areas", items:[
    { i:"🧱", t:"Data modeling depth", p:"Walk through the Business Insights 360 star schema; probe trade-offs." },
    { i:"🧪", t:"Experiment thinking", p:"Have him design an A/B test and defend the success metric." },
    { i:"📉", t:"Insight under pressure", p:"Give a sudden metric drop; watch the decomposition." },
    { i:"🤖", t:"AI judgment", p:"Ask where GenAI should NOT be used in analytics." }
  ]},
  { type:"stats", span:"s4", title:"Promotion Readiness", items:[
    { v:84, suf:"%", s:"Senior-scope readiness index" },
    { v:12, suf:"mo", s:"Projected window to senior scope" },
    { v:3, suf:"x", s:"Stack breadth vs typical junior" },
    { v:40, suf:"%", s:"Reporting time cut via his automation" }
  ]},
  { type:"insights", span:"s4", title:"Risk Assessment", items:[
    { k:"strength", t:"Low ramp-up risk", p:"Self-directed learner with documented delivery habits." },
    { k:"risk", t:"Enterprise tenure is early", p:"Mitigation: pair with a senior stakeholder for the first quarter." },
    { k:"opportunity", t:"Undervalued GenAI capability", p:"Usable immediately for AI adoption programs." },
    { k:"signal", t:"Retention outlook positive", p:"Stays where learning velocity is high." }
  ]}
],

developer: [
  { type:"gauge", span:"s4", title:"Technical Credibility", value:88,
    verdict:"<em>Credible Builder</em> · Data engineering leaning",
    sub:"Architecture choices, integrity enforcement, and evaluation design show independent engineering judgment.",
    conf:"CONFIDENCE HIGH · BASIS: REPOSITORY + PRODUCT ARTIFACTS" },
  { type:"graph", span:"s8", title:"Technical Knowledge Graph", hint:"Hover a node to trace its connections.",
    center:{ label:"Harshith", info:"Full-stack analytics builder: data layer to decision layer." },
    clusters:[
      { label:"SQL", info:"Advanced querying and analytical schemas.", items:[
        { label:"Window Fns", info:"RANK, running aggregates for demand analysis" },
        { label:"CTEs", info:"Readable multi-stage analytical queries" },
        { label:"MySQL", info:"Normalized sales schema analysis" } ]},
      { label:"Power BI", info:"Executive BI platforms on Power BI Service.", items:[
        { label:"DAX", info:"Complex measures: P&L, forecast accuracy" },
        { label:"Star Schema", info:"10+ table dimensional models" },
        { label:"DENEB", info:"Custom Vega-Lite visuals" } ]},
      { label:"Python", info:"Data prep, enrichment, app backends.", items:[
        { label:"SQLite", info:"Event platform persistence layer" },
        { label:"Enrichment", info:"LLM-assisted dataset augmentation" } ]},
      { label:"GenAI", info:"LLM application engineering and evaluation.", items:[
        { label:"Claude API", info:"LLM-as-judge scoring integration" },
        { label:"Rubric Eval", info:"6-block structured evaluation" },
        { label:"Prompt Eng", info:"Role/Task/Context/Audience/Format/Constraints" } ]},
      { label:"Excel", info:"Power Query ETL and modeled reporting.", items:[
        { label:"Power Query", info:"Repeatable ETL transformations" },
        { label:"Power Pivot", info:"In-workbook data models" } ]}
    ]},
  { type:"insights", span:"s4", title:"Problem-Solving Patterns", items:[
    { k:"signal", t:"First-principles decomposition", p:"Investigates metric changes from causes, not dashboards backward." },
    { k:"strength", t:"Defense in depth", p:"One-game-per-login enforced at server, client, and demo layers." },
    { k:"strength", t:"Evaluation mindset", p:"Rubric-based LLM scoring with evidence quotes." },
    { k:"opportunity", t:"Next frontier", p:"Cloud warehouse deployment would complete the stack story." }
  ]},
  { type:"spark", span:"s4", title:"Skill Acquisition Velocity",
    points:[18,26,33,41,52,58,66,74,79,86,90,94],
    note:"Cumulative capability index, last 12 milestones. GenAI added without plateauing the BI core." },
  { type:"stats", span:"s4", title:"Open Source Footprint", items:[
    { v:6, suf:"+", s:"Public repos with documented analysis" },
    { v:3, suf:"", s:"Live deployed Power BI products" },
    { v:5, suf:"+", s:"Languages and dialects in use" },
    { v:100, suf:"%", s:"Projects shipped with docs" }
  ]}
],

sales: [
  { type:"gauge", span:"s4", title:"Engagement Receptivity", value:81,
    verdict:"<em>Warm Prospect</em> · Practitioner-influencer",
    sub:"Early adopter who publicly documents what he uses. Reachable through craft, not cold pitches.",
    conf:"CONFIDENCE MEDIUM-HIGH · BASIS: TOOL ADOPTION + CONTENT ACTIVITY" },
  { type:"graph", span:"s8", title:"Influence Network Map", hint:"Hover to trace relationship paths.",
    center:{ label:"Harshith", info:"Node strength: practitioner credibility + content output." },
    clusters:[
      { label:"Codebasics", info:"Bootcamp alumni network and challenges.", items:[
        { label:"Alumni", info:"Peer analysts across the data hiring market" },
        { label:"Challenges", info:"Public competitive project showcases" } ]},
      { label:"LinkedIn", info:"Primary publishing surface.", items:[
        { label:"Analytics Feed", info:"Project posts with community engagement" },
        { label:"Recruiters", info:"Inbound talent-market visibility" } ]},
      { label:"AI Events", info:"Organizer-level AI literacy presence.", items:[
        { label:"AI Day Booth", info:"Gamified prompt engineering experience" },
        { label:"Attendees", info:"Direct educational influence" } ]},
      { label:"GitHub", info:"Technical credibility surface.", items:[
        { label:"Repo Visitors", info:"Analysts referencing his builds" } ]}
    ]},
  { type:"insights", span:"s4", title:"Buying Signals Detected", items:[
    { k:"signal", t:"Early AI tool adoption", p:"Claude, Copilot, Cursor, NotebookLM, automation platforms." },
    { k:"signal", t:"Education spend pattern", p:"Pays for structured capability gains repeatedly." },
    { k:"opportunity", t:"Consolidation moment", p:"Multi-tool workflow: open to unifying platforms." },
    { k:"risk", t:"Value skepticism", p:"Claims without a sandbox get discounted. He evaluates by building." }
  ]},
  { type:"list", span:"s4", title:"Engagement Playbook", items:[
    { i:"🧪", t:"Sandbox-first outreach", p:"API credits or a workspace; let the build do the selling." },
    { i:"🎤", t:"Community co-creation", p:"Sponsor or feature his AI literacy content." },
    { i:"📊", t:"Case study exchange", p:"He documents thoroughly; a public case study converts." },
    { i:"🎓", t:"Certification bundles", p:"Credential-motivated buyer." }
  ]},
  { type:"stats", span:"s4", title:"Decision-Making Power", items:[
    { v:"IC", suf:"", s:"Formal purchasing authority today" },
    { v:"HIGH", suf:"", s:"Bottom-up tool advocacy influence" },
    { v:"1-2", suf:"yr", s:"Horizon to team-level tooling decisions" },
    { v:"B2B", suf:"", s:"Analytics + AI platform relevance zone" }
  ]}
],

founder: [
  { type:"gauge", span:"s4", title:"Builder Quotient", value:87,
    verdict:"<em>0→1 Capable</em> · Technical domain founder archetype",
    sub:"Repeatedly converts an idea into a working product alone, on a deadline, with real users.",
    conf:"CONFIDENCE HIGH · BASIS: SHIPPED-PRODUCT EVIDENCE" },
  { type:"radar", span:"s4", title:"Founder Capability Radar",
    axes:["Execution","Speed","Technical","Storytelling","Resourceful","Vision"],
    values:[92,88,85,88,90,78],
    note:"Execution and resourcefulness lead. Vision grows with market exposure: typical for builder-first founders." },
  { type:"insights", span:"s4", title:"Innovation Signals", items:[
    { k:"signal", t:"AI-native product instinct", p:"LLM-as-judge with structured rubrics before it was mainstream in education products." },
    { k:"signal", t:"Gamification of learning", p:"Turned AI literacy training into a competitive, measurable game." },
    { k:"strength", t:"Full-loop shipping", p:"Design, backend, LLM integration, event ops: solo, no slipped launch." },
    { k:"opportunity", t:"Productizable asset", p:"The rubric + judge engine generalizes to corporate AI training." }
  ]},
  { type:"timeline", span:"s6", title:"Execution Evidence", items:[
    { d:"PROOF 01", t:"Enterprise-grade BI platform, solo", p:"Four-audience analytics product with a governed data model." },
    { d:"PROOF 02", t:"AI product under deadline", p:"Six-game LLM-judged platform built, tested, and operated live." },
    { d:"PROOF 03", t:"Automation leverage", p:"Cut reporting processing ~40%: builds systems instead of doing work twice." },
    { d:"PROOF 04", t:"Compounding stack", p:"Each project adds one new capability layer: the pattern investors look for." }
  ]},
  { type:"insights", span:"s6", title:"Investment Potential Readout", items:[
    { k:"strength", t:"Backable trajectory", p:"Deep workflow knowledge in retail analytics plus the ability to build the product himself." },
    { k:"opportunity", t:"Wedge thesis", p:"AI-evaluated skills training for enterprises: v0 of the engine already validated with live users." },
    { k:"risk", t:"Pre-network stage", p:"Strongest today as technical co-founder or early builder-hire." },
    { k:"signal", t:"Watch trigger", p:"If he ships a self-serve version of the training engine, move to engage." }
  ]}
],

researcher: [
  { type:"gauge", span:"s4", title:"Methodological Rigor", value:85,
    verdict:"<em>Applied Researcher</em> · Evaluation-design strength",
    sub:"Success metrics before experiments, structured rubrics before judging, validation before delivery.",
    conf:"CONFIDENCE MEDIUM-HIGH · BASIS: METHOD TRACES IN PUBLIC WORK" },
  { type:"graph", span:"s8", title:"Knowledge Domain Constellation", hint:"Hover to isolate a domain.",
    center:{ label:"Harshith", info:"Applied analytics researcher profile." },
    clusters:[
      { label:"Statistics", info:"Inference applied to business decisions.", items:[
        { label:"A/B Testing", info:"Experiment design and interpretation" },
        { label:"Cohorts", info:"Behavioral cohort comparison" } ]},
      { label:"ML Methods", info:"Classical ML where it changes decisions.", items:[
        { label:"Clustering", info:"Value/behavior segmentation" },
        { label:"Forecasting", info:"Time-series demand prediction" } ]},
      { label:"LLM Eval", info:"Structured evaluation of generative output.", items:[
        { label:"Rubric Design", info:"6-block scoring construct" },
        { label:"LLM-as-Judge", info:"Evidence-quoted automated grading" } ]},
      { label:"Data Quality", info:"Reliability engineering for datasets.", items:[
        { label:"Validation", info:"Pipeline output verification" } ]},
      { label:"Visualization", info:"Perception-aware communication.", items:[
        { label:"Vega-Lite", info:"DENEB grammar-of-graphics work" } ]}
    ]},
  { type:"list", span:"s4", title:"Publications & Patents (Honest Index)", items:[
    { i:"📄", t:"Formal publications: none yet", p:"No peer-reviewed papers or patents. Early-career applied profile." },
    { i:"📝", t:"Public artifacts: 12+", p:"Documented write-ups, methodology walkthroughs, analysis narratives." },
    { i:"🎓", t:"Credentialed foundations", p:"Google Advanced Data Analytics: statistics, regression, ML." },
    { i:"🧪", t:"Novel applied artifact", p:"Rubric-based LLM evaluation system: publishable case study." }
  ]},
  { type:"bars", span:"s4", title:"Research Impact (Applied)", items:[
    { l:"Decision influence", v:84, n:"Changed funnels, pricing, retention plays" },
    { l:"Reproducibility", v:80, n:"Formula-driven, documented, versioned" },
    { l:"Method novelty", v:72, n:"LLM evaluation ahead of practitioner norm" },
    { l:"Knowledge diffusion", v:70, n:"Public teaching artifacts, event education" }
  ]},
  { type:"stats", span:"s4", title:"Innovation Score", items:[
    { v:78, suf:"/100", s:"Composite: novelty × execution × diffusion" },
    { v:5, suf:"", s:"Knowledge domains actively bridged" },
    { v:2, suf:"", s:"Methods applied before mainstream" },
    { v:1, suf:"", s:"Latent publishable case study" }
  ]}
],

stalker: [
  { type:"gauge", span:"s4", title:"Market Standing", value:85,
    verdict:"<em>Top-Quartile</em> · Early-career analytics segment",
    sub:"Breadth, documentation quality, and the GenAI layer place him well above the peer cohort median.",
    conf:"CONFIDENCE MEDIUM · BASIS: PEER PORTFOLIO BENCHMARKING" },
  { type:"scatter", span:"s8", title:"Competitive Positioning Map", hint:"Hover any point. He is the red one, obviously.",
    xLabel:"SKILL BREADTH →", yLabel:"DELIVERY DEPTH →",
    points:[
      { x:78, y:82, label:"Harshith V C", me:true, info:"Hybrid-analyst breadth with BI-developer depth, plus a GenAI layer." },
      { x:42, y:55, label:"Typical Jr Analyst", info:"Excel + one BI tool, guided projects" },
      { x:38, y:74, label:"BI Developer", info:"Deep on one platform, narrow beyond it" },
      { x:66, y:48, label:"Generalist BA", info:"Broad process skills, lighter build" },
      { x:58, y:68, label:"Data Scientist (entry)", info:"Model depth, weaker BI storytelling" }
    ]},
  { type:"insights", span:"s6", title:"Strengths vs Weaknesses (Nothing Redacted)", items:[
    { k:"strength", t:"Full-loop delivery", p:"Question → model → dashboard → recommendation, one person." },
    { k:"strength", t:"GenAI differentiation", p:"Working LLM application experience vs prompt-consumer peers." },
    { k:"risk", t:"Enterprise tenure gap", p:"Limited formal large-org years vs experienced hires. His clearest weakness." },
    { k:"risk", t:"Single-cloud surface", p:"Microsoft-stack centered today. AWS/GCP would widen the market." }
  ]},
  { type:"insights", span:"s6", title:"Threat Indicators (If You Compete With Him)", items:[
    { k:"signal", t:"Speed threat", p:"Above-benchmark output quality per hour in take-homes and case rounds." },
    { k:"signal", t:"Narrative threat", p:"Tells the business story, which wins stakeholder rooms." },
    { k:"signal", t:"Stack-convergence threat", p:"Analytics + BI + GenAI compresses two hires into one." },
    { k:"opportunity", t:"Where rivals can win today", p:"Enterprise tenure, multi-cloud credentials, formal publications." }
  ]},
  { type:"bars", span:"s6", title:"Growth Velocity", items:[
    { l:"GenAI capability growth", v:94, n:"Fastest-moving layer in his stack" },
    { l:"BI platform depth", v:88, n:"Compounding through repeated delivery" },
    { l:"Public visibility", v:71, n:"Content cadence trending up" },
    { l:"Credential accumulation", v:90, n:"10+ certifications and counting" }
  ]},
  { type:"stats", span:"s6", title:"The Everything File", items:[
    { v:6, suf:"+", s:"Projects, all documented" },
    { v:10, suf:"+", s:"Certifications, all listed" },
    { v:4, suf:"", s:"Public channels: LinkedIn, GitHub, Linktree, portfolio" },
    { v:0, suf:"", s:"Things hidden from this dossier" }
  ]}
]
};
