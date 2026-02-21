import { useState } from "react";

const SEGMENTS = {
  sellers: [
    {
      id: "downsizers",
      name: "Empty Nesters & Downsizers",
      age: "55–75",
      interests: "Retirement planning, travel, grandchildren, gardening",
      pain: "Home is too large, high maintenance costs, want to unlock equity",
      hook: '"Your home has gained $X in value since you bought it — see what it\'s worth today."',
      platforms: ["Facebook"],
      adType: "Lead Form + Video Walkthrough",
      budget: "$15–25/day",
      cta: "Get Your Free Home Valuation",
    },
    {
      id: "relocators",
      name: "Job Relocators",
      age: "28–50",
      interests: "Career, corporate jobs, LinkedIn, moving services",
      pain: "Need to sell fast due to job transfer, unfamiliar with local market",
      hook: '"Relocating? Sell your home in 30 days or less — guaranteed."',
      platforms: ["Facebook", "Instagram"],
      adType: "Carousel + Testimonials",
      budget: "$20–35/day",
      cta: "Get a Fast-Sale Strategy",
    },
    {
      id: "upgraders",
      name: "Upgrade Sellers",
      age: "32–48",
      interests: "Home improvement, interior design, family activities",
      pain: "Outgrowing current home, need more space, worried about timing",
      hook: '"Sell high & buy smart — here\'s how families are upgrading without the stress."',
      platforms: ["Instagram", "Facebook"],
      adType: "Before/After Reels + Stories",
      budget: "$20–30/day",
      cta: "Plan Your Upgrade Move",
    },
    {
      id: "investors-sell",
      name: "Tired Landlords / Investors Exiting",
      age: "35–65",
      interests: "Real estate investing, passive income, financial freedom",
      pain: "Tenant issues, market peak anxiety, want to cash out",
      hook: '"The market is peaking — is it time to cash out your investment property?"',
      platforms: ["Facebook"],
      adType: "Data-Driven Static + Lead Form",
      budget: "$10–20/day",
      cta: "Get Your Property's ROI Report",
    },
  ],
  buyers: [
    {
      id: "fthb",
      name: "First-Time Home Buyers",
      age: "25–38",
      interests: "Apartment living, budgeting, wedding planning, personal finance",
      pain: "Overwhelmed by process, saving for down payment, fear of overpaying",
      hook: '"Stop renting. First-time buyers are getting into homes for less than you think."',
      platforms: ["Instagram", "Facebook"],
      adType: "Reels + Story Ads + Carousel",
      budget: "$15–30/day",
      cta: "See Homes in Your Budget",
    },
    {
      id: "move-up",
      name: "Move-Up Buyers",
      age: "32–50",
      interests: "School districts, family, SUVs, home renovation",
      pain: "Need more space, worried about selling and buying simultaneously",
      hook: '"Growing family? Find the space you need in the neighborhood you love."',
      platforms: ["Facebook", "Instagram"],
      adType: "Video Tours + Carousel of Listings",
      budget: "$20–35/day",
      cta: "Browse Larger Homes",
    },
    {
      id: "investors-buy",
      name: "Real Estate Investors",
      age: "30–60",
      interests: "Investing, wealth building, rental income, financial podcasts",
      pain: "Finding deals, cap rate analysis, competition from other investors",
      hook: '"Off-market deals with 8%+ cap rates — before they hit the MLS."',
      platforms: ["Facebook"],
      adType: "Data Cards + Lead Magnets",
      budget: "$15–25/day",
      cta: "Get Off-Market Alerts",
    },
    {
      id: "luxury",
      name: "Luxury Buyers",
      age: "35–65",
      interests: "Travel, fine dining, golf, luxury brands, architecture",
      pain: "Privacy, exclusivity, finding unique properties",
      hook: '"Exclusive listings you won\'t find online — curated for discerning buyers."',
      platforms: ["Instagram"],
      adType: "Cinematic Reels + Story Highlights",
      budget: "$30–60/day",
      cta: "View Private Listings",
    },
    {
      id: "renters",
      name: "Renters Ready to Buy",
      age: "26–40",
      interests: "Apartment hunting, credit building, adulting, financial literacy",
      pain: "Rent keeps increasing, feeling stuck, unsure if they qualify",
      hook: '"Your rent just went up again. Your mortgage payment could be lower."',
      platforms: ["Instagram", "Facebook"],
      adType: "Rent vs. Buy Calculator + Reels",
      budget: "$12–22/day",
      cta: "See If You Qualify",
    },
  ],
};

const AD_FORMATS = [
  {
    name: "Reels / Short Video",
    platform: "Instagram & Facebook",
    best: "Awareness, engagement, viral reach",
    specs: "9:16, 15–60s, captions required",
    tip: "Hook in first 2 seconds. Use text overlays — 85% watch without sound.",
    icon: "🎬",
  },
  {
    name: "Carousel Ads",
    platform: "Instagram & Facebook",
    best: "Showcasing listings, before/after, step-by-step",
    specs: "1:1 or 4:5, 2–10 cards",
    tip: "First card = scroll-stopper. Last card = strong CTA. Tell a visual story across cards.",
    icon: "🎠",
  },
  {
    name: "Story Ads",
    platform: "Instagram & Facebook",
    best: "Urgency, limited-time offers, swipe-up CTAs",
    specs: "9:16, 5–15s per frame",
    tip: "Use native-looking content — overly polished ads get skipped in stories.",
    icon: "📱",
  },
  {
    name: "Lead Form Ads",
    platform: "Facebook",
    best: "Capturing seller leads, home valuations, buyer registrations",
    specs: "Image or video + form",
    tip: "Keep form to 3–4 fields max. Auto-fill increases completion by 50%+.",
    icon: "📋",
  },
  {
    name: "Static Image Ads",
    platform: "Instagram & Facebook",
    best: "Just-listed, just-sold, market stats, testimonials",
    specs: "1:1 or 4:5, high-res",
    tip: "Bold headline + one clear CTA. Less text = more reach (Facebook penalizes text-heavy images).",
    icon: "🖼️",
  },
  {
    name: "Video Ads (In-Feed)",
    platform: "Facebook",
    best: "Agent branding, listing tours, market updates",
    specs: "1:1 or 16:9, 30s–3min",
    tip: "Put the value proposition in the first 5 seconds. Add subtitles always.",
    icon: "📹",
  },
];

const CAMPAIGN_STRUCTURE = [
  {
    phase: "TOFU",
    label: "Top of Funnel",
    objective: "Awareness / Reach",
    goal: "Get in front of cold audiences",
    content: "Market updates, neighborhood guides, myth-busting reels, lifestyle content",
    audiences: "Broad interest targeting, lookalikes, geo-targeted locals",
    budget: "40% of total",
    kpi: "CPM, Reach, Video Views, Engagement Rate",
    color: "#E0E0E0",
  },
  {
    phase: "MOFU",
    label: "Middle of Funnel",
    objective: "Consideration / Engagement",
    goal: "Nurture warm audiences into leads",
    content: "Home valuation offers, buyer guides, listing carousels, testimonials",
    audiences: "Video viewers, page engagers, website visitors, IG engagers",
    budget: "35% of total",
    kpi: "CTR, CPC, Landing Page Views, Lead Form Opens",
    color: "#A0A0A0",
  },
  {
    phase: "BOFU",
    label: "Bottom of Funnel",
    objective: "Conversion / Leads",
    goal: "Convert warm leads into appointments",
    content: "Free CMA offers, exclusive listings, urgency-driven CTAs, direct booking",
    audiences: "Lead form openers, website visitors (retarget), email list matches",
    budget: "25% of total",
    kpi: "CPL, Conversion Rate, Cost Per Appointment, ROAS",
    color: "#606060",
  },
];

const COPY_FORMULAS = [
  {
    name: "PAS",
    full: "Problem → Agitate → Solve",
    example:
      "Tired of your home sitting on the market? Every day it doesn't sell costs you money. Our 21-day selling system gets results — request your custom plan today.",
  },
  {
    name: "AIDA",
    full: "Attention → Interest → Desire → Action",
    example:
      "🏡 Just listed in [Neighborhood]! 4BR/3BA with a stunning backyard oasis. This won't last — homes here sell in 6 days avg. Schedule your private showing now.",
  },
  {
    name: "BAB",
    full: "Before → After → Bridge",
    example:
      "Before: Scrolling Zillow every night, losing out on every offer. After: Keys in hand, moving into your dream home. Bridge: Our buyer advantage program makes it happen.",
  },
  {
    name: "4U",
    full: "Useful → Urgent → Unique → Ultra-Specific",
    example:
      "3 homes under $350K in [ZIP] just hit the market today. First-time buyers: rates just dipped to 6.2%. These won't last the weekend. DM us for early access.",
  },
];

function App() {
  const [activeTab, setActiveTab] = useState("overview");
  const [audienceType, setAudienceType] = useState("sellers");
  const [expandedSegment, setExpandedSegment] = useState(null);

  const tabs = [
    { id: "overview", label: "Strategy Overview" },
    { id: "segments", label: "Audience Segments" },
    { id: "formats", label: "Ad Formats" },
    { id: "funnel", label: "Funnel Structure" },
    { id: "copy", label: "Copy Formulas" },
    { id: "checklist", label: "Launch Checklist" },
  ];

  return (
    <div style={styles.app}>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Hero */}
      <header style={styles.hero}>
        <div style={styles.heroOverlay} />
        <div style={styles.heroContent}>
          <span style={styles.heroTag}>THE COMPLETE PLAYBOOK</span>
          <h1 style={styles.heroTitle}>
            Real Estate Ads
            <br />
            <span style={styles.heroAccent}>That Actually Convert</span>
          </h1>
          <p style={styles.heroSub}>
            Instagram & Facebook ad strategies for attracting serious buyers and
            motivated sellers in your market.
          </p>
        </div>
        <div style={styles.heroDeco} />
      </header>

      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={styles.navInner}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                ...styles.navBtn,
                ...(activeTab === tab.id ? styles.navBtnActive : {}),
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <main style={styles.main}>
        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Why Facebook & Instagram for Real Estate?</h2>
            <div style={styles.statsGrid}>
              {[
                { stat: "97%", desc: "of home buyers use the internet in their search" },
                { stat: "77%", desc: "of realtors actively use social media for leads" },
                { stat: "$2–8", desc: "average cost per lead with optimized campaigns" },
                { stat: "3.5×", desc: "higher engagement with video vs. static posts" },
              ].map((s, i) => (
                <div key={i} style={{ ...styles.statCard, animationDelay: `${i * 0.1}s` }}>
                  <div style={styles.statNum}>{s.stat}</div>
                  <div style={styles.statDesc}>{s.desc}</div>
                </div>
              ))}
            </div>

            <div style={styles.overviewGrid}>
              <div style={styles.overviewCard}>
                <div style={styles.overviewIcon}>📍</div>
                <h3 style={styles.overviewCardTitle}>Hyper-Local Targeting</h3>
                <p style={styles.overviewCardText}>
                  Target by zip code, neighborhood, school district, and even life
                  events like "recently moved" or "newly engaged." No other platform
                  lets you get this granular with local audiences.
                </p>
              </div>
              <div style={styles.overviewCard}>
                <div style={styles.overviewIcon}>🔄</div>
                <h3 style={styles.overviewCardTitle}>Full-Funnel Retargeting</h3>
                <p style={styles.overviewCardText}>
                  Build custom audiences from video viewers, website visitors, and
                  page engagers. Retarget warm leads with increasingly specific
                  offers as they move down the funnel.
                </p>
              </div>
              <div style={styles.overviewCard}>
                <div style={styles.overviewIcon}>💰</div>
                <h3 style={styles.overviewCardTitle}>Cost-Effective Leads</h3>
                <p style={styles.overviewCardText}>
                  Facebook lead forms with auto-fill generate high-volume leads at
                  $2–12 each — significantly cheaper than Google Ads or Zillow
                  Premier Agent for most markets.
                </p>
              </div>
              <div style={styles.overviewCard}>
                <div style={styles.overviewIcon}>🎯</div>
                <h3 style={styles.overviewCardTitle}>Dual Platform Power</h3>
                <p style={styles.overviewCardText}>
                  Run unified campaigns across Facebook (older demographics,
                  sellers, investors) and Instagram (younger buyers, luxury market,
                  visual storytelling) from one Ads Manager.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* SEGMENTS */}
        {activeTab === "segments" && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Audience Segments</h2>
            <p style={styles.sectionSub}>
              Detailed targeting breakdowns for each buyer and seller persona in
              your market. Click any segment to expand the full ad strategy.
            </p>

            <div style={styles.toggleRow}>
              {["sellers", "buyers"].map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setAudienceType(type);
                    setExpandedSegment(null);
                  }}
                  style={{
                    ...styles.toggleBtn,
                    ...(audienceType === type ? styles.toggleBtnActive : {}),
                  }}
                >
                  {type === "sellers" ? "🏠 Sellers" : "🔑 Buyers"}
                </button>
              ))}
            </div>

            <div style={styles.segmentList}>
              {SEGMENTS[audienceType].map((seg) => (
                <div
                  key={seg.id}
                  style={{
                    ...styles.segmentCard,
                    ...(expandedSegment === seg.id ? styles.segmentCardExpanded : {}),
                  }}
                >
                  <div
                    style={styles.segmentHeader}
                    onClick={() =>
                      setExpandedSegment(expandedSegment === seg.id ? null : seg.id)
                    }
                  >
                    <div>
                      <h3 style={styles.segmentName}>{seg.name}</h3>
                      <span style={styles.segmentAge}>Age: {seg.age}</span>
                    </div>
                    <span style={styles.expandIcon}>
                      {expandedSegment === seg.id ? "−" : "+"}
                    </span>
                  </div>

                  {expandedSegment === seg.id && (
                    <div style={styles.segmentBody}>
                      <div style={styles.segmentGrid}>
                        <div style={styles.segmentField}>
                          <span style={styles.fieldLabel}>Interests & Behaviors</span>
                          <span style={styles.fieldValue}>{seg.interests}</span>
                        </div>
                        <div style={styles.segmentField}>
                          <span style={styles.fieldLabel}>Pain Point</span>
                          <span style={styles.fieldValue}>{seg.pain}</span>
                        </div>
                        <div style={styles.segmentField}>
                          <span style={styles.fieldLabel}>Sample Hook</span>
                          <span style={{ ...styles.fieldValue, fontStyle: "italic", color: "#555555" }}>
                            {seg.hook}
                          </span>
                        </div>
                        <div style={styles.segmentField}>
                          <span style={styles.fieldLabel}>Best Platforms</span>
                          <div style={styles.tagRow}>
                            {seg.platforms.map((p) => (
                              <span key={p} style={styles.platformTag}>{p}</span>
                            ))}
                          </div>
                        </div>
                        <div style={styles.segmentField}>
                          <span style={styles.fieldLabel}>Recommended Ad Type</span>
                          <span style={styles.fieldValue}>{seg.adType}</span>
                        </div>
                        <div style={styles.segmentField}>
                          <span style={styles.fieldLabel}>Daily Budget Range</span>
                          <span style={{ ...styles.fieldValue, fontWeight: 600, color: "#333333" }}>
                            {seg.budget}
                          </span>
                        </div>
                        <div style={{ ...styles.segmentField, gridColumn: "1 / -1" }}>
                          <span style={styles.fieldLabel}>Call to Action</span>
                          <span style={styles.ctaBadge}>{seg.cta}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* AD FORMATS */}
        {activeTab === "formats" && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Ad Formats & Specs</h2>
            <p style={styles.sectionSub}>
              Each format has unique strengths. Match the format to your objective
              and audience segment for maximum ROI.
            </p>
            <div style={styles.formatGrid}>
              {AD_FORMATS.map((fmt, i) => (
                <div key={i} style={styles.formatCard}>
                  <div style={styles.formatIcon}>{fmt.icon}</div>
                  <h3 style={styles.formatName}>{fmt.name}</h3>
                  <span style={styles.formatPlatform}>{fmt.platform}</span>
                  <div style={styles.formatDivider} />
                  <div style={styles.formatDetail}>
                    <span style={styles.formatLabel}>Best For</span>
                    <span style={styles.formatValue}>{fmt.best}</span>
                  </div>
                  <div style={styles.formatDetail}>
                    <span style={styles.formatLabel}>Specs</span>
                    <span style={styles.formatValue}>{fmt.specs}</span>
                  </div>
                  <div style={{ ...styles.formatDetail, background: "#f5f5f5", borderRadius: 8, padding: 12 }}>
                    <span style={styles.formatLabel}>💡 Pro Tip</span>
                    <span style={styles.formatValue}>{fmt.tip}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FUNNEL */}
        {activeTab === "funnel" && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Campaign Funnel Structure</h2>
            <p style={styles.sectionSub}>
              Structure your campaigns in three tiers. Each tier has a distinct
              objective, audience temperature, and set of KPIs.
            </p>
            <div style={styles.funnelStack}>
              {CAMPAIGN_STRUCTURE.map((tier, i) => (
                <div
                  key={i}
                  style={{
                    ...styles.funnelCard,
                    borderLeft: `5px solid ${tier.color}`,
                  }}
                >
                  <div style={styles.funnelTop}>
                    <span style={{ ...styles.funnelPhase, background: tier.color }}>
                      {tier.phase}
                    </span>
                    <span style={styles.funnelLabel}>{tier.label}</span>
                  </div>
                  <div style={styles.funnelObjective}>{tier.objective}</div>
                  <p style={styles.funnelGoal}>{tier.goal}</p>
                  <div style={styles.funnelGrid}>
                    <div style={styles.funnelField}>
                      <span style={styles.funnelFieldLabel}>Content Types</span>
                      <span style={styles.funnelFieldValue}>{tier.content}</span>
                    </div>
                    <div style={styles.funnelField}>
                      <span style={styles.funnelFieldLabel}>Target Audiences</span>
                      <span style={styles.funnelFieldValue}>{tier.audiences}</span>
                    </div>
                    <div style={styles.funnelField}>
                      <span style={styles.funnelFieldLabel}>Budget Allocation</span>
                      <span style={{ ...styles.funnelFieldValue, fontWeight: 700, fontSize: 18 }}>
                        {tier.budget}
                      </span>
                    </div>
                    <div style={styles.funnelField}>
                      <span style={styles.funnelFieldLabel}>KPIs to Track</span>
                      <span style={styles.funnelFieldValue}>{tier.kpi}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* COPY FORMULAS */}
        {activeTab === "copy" && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Ad Copy Formulas</h2>
            <p style={styles.sectionSub}>
              Proven copywriting frameworks adapted for real estate ads. Swap in
              your local details and listing info.
            </p>
            <div style={styles.copyGrid}>
              {COPY_FORMULAS.map((f, i) => (
                <div key={i} style={styles.copyCard}>
                  <div style={styles.copyHeader}>
                    <span style={styles.copyName}>{f.name}</span>
                    <span style={styles.copyFull}>{f.full}</span>
                  </div>
                  <div style={styles.copyExample}>
                    <span style={styles.copyExLabel}>Example Ad Copy:</span>
                    <p style={styles.copyExText}>"{f.example}"</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={styles.tipsBox}>
              <h3 style={styles.tipsTitle}>Universal Copy Rules</h3>
              <div style={styles.tipsList}>
                {[
                  "Lead with a number or specific result — '14 offers in 3 days' beats 'we sell homes fast'",
                  "Use [Neighborhood] and [ZIP] placeholders — localized copy outperforms generic by 2–3×",
                  "Keep primary text under 125 characters for mobile — save the details for the landing page",
                  "Always include ONE clear CTA — don't give them 3 things to do, give them 1",
                  "Use social proof early — '200+ families helped this year' builds instant trust",
                  "Write like you talk — conversational copy outperforms corporate speak on social media",
                ].map((tip, i) => (
                  <div key={i} style={styles.tipItem}>
                    <span style={styles.tipNum}>{String(i + 1).padStart(2, "0")}</span>
                    <span style={styles.tipText}>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CHECKLIST */}
        {activeTab === "checklist" && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>Launch Checklist</h2>
            <p style={styles.sectionSub}>
              Everything you need before going live. Work through each section
              systematically.
            </p>

            {[
              {
                title: "🔧 Technical Setup",
                items: [
                  "Facebook Business Manager configured with ad account",
                  "Meta Pixel installed on website with standard events (Lead, ViewContent, Contact)",
                  "Conversions API set up for server-side tracking",
                  "Custom audiences created: website visitors, video viewers, page engagers",
                  "Lookalike audiences built from past client list (1%, 3%, 5%)",
                  "Facebook Lead Form templates created with CRM integration",
                ],
              },
              {
                title: "🎨 Creative Assets",
                items: [
                  "3–5 video hooks filmed (15–30s each) for Reels/Stories",
                  "Professional listing photos edited for ad specs (1:1, 4:5, 9:16)",
                  "Carousel templates designed for listings and market updates",
                  "Testimonial graphics with client photos and quotes",
                  "Brand-consistent ad templates (colors, fonts, logo placement)",
                ],
              },
              {
                title: "📝 Campaign Structure",
                items: [
                  "TOFU campaign: awareness/reach objective, broad + lookalike audiences",
                  "MOFU campaign: engagement/traffic objective, warm retargeting audiences",
                  "BOFU campaign: lead gen objective, hot retargeting + email matches",
                  "Ad sets organized by audience segment (1 segment per ad set)",
                  "A/B tests planned: 2–3 creatives per ad set minimum",
                  "Budget allocated: 40% TOFU / 35% MOFU / 25% BOFU",
                ],
              },
              {
                title: "📊 Tracking & Follow-Up",
                items: [
                  "UTM parameters on all ad links for Google Analytics tracking",
                  "CRM lead routing configured (speed to lead matters — aim for < 5 min)",
                  "Automated text/email follow-up sequences set up for new leads",
                  "Weekly reporting dashboard created: CPL, CTR, ROAS, appointments booked",
                  "Retargeting rules established: 7-day, 14-day, 30-day windows",
                ],
              },
            ].map((group, gi) => (
              <div key={gi} style={styles.checkGroup}>
                <h3 style={styles.checkGroupTitle}>{group.title}</h3>
                {group.items.map((item, ii) => (
                  <label key={ii} style={styles.checkItem}>
                    <input type="checkbox" style={styles.checkbox} />
                    <span style={styles.checkText}>{item}</span>
                  </label>
                ))}
              </div>
            ))}
          </section>
        )}
      </main>

      <footer style={styles.footer}>
        <p style={styles.footerText}>
          Real Estate Social Ads Playbook — Customize segments, budgets, and copy
          for your local market.
        </p>
      </footer>
    </div>
  );
}

const styles = {
  app: {
    fontFamily: "'DM Sans', sans-serif",
    background: "#ffffff",
    color: "#111111",
    minHeight: "100vh",
  },
  hero: {
    position: "relative",
    background: "linear-gradient(135deg, #000000 0%, #1a1a1a 40%, #2a2a2a 100%)",
    padding: "80px 32px 60px",
    overflow: "hidden",
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.04) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(255,255,255,0.02) 0%, transparent 50%)",
  },
  heroContent: {
    position: "relative",
    zIndex: 2,
    maxWidth: 760,
    margin: "0 auto",
    textAlign: "center",
  },
  heroTag: {
    display: "inline-block",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 3,
    color: "#ffffff",
    background: "rgba(255,255,255,0.1)",
    padding: "6px 18px",
    borderRadius: 100,
    marginBottom: 20,
  },
  heroTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(32px, 6vw, 56px)",
    fontWeight: 800,
    color: "#ffffff",
    lineHeight: 1.1,
    margin: "0 0 16px",
  },
  heroAccent: {
    color: "#999999",
  },
  heroSub: {
    fontSize: 17,
    color: "rgba(255,255,255,0.55)",
    maxWidth: 540,
    margin: "0 auto",
    lineHeight: 1.6,
    fontWeight: 300,
  },
  heroDeco: {
    position: "absolute",
    top: -60,
    right: -60,
    width: 200,
    height: 200,
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.08)",
  },
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    background: "rgba(255,255,255,0.95)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(0,0,0,0.08)",
    padding: "0 16px",
  },
  navInner: {
    display: "flex",
    gap: 4,
    maxWidth: 900,
    margin: "0 auto",
    overflowX: "auto",
    padding: "8px 0",
  },
  navBtn: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 13,
    fontWeight: 500,
    color: "#888888",
    background: "transparent",
    border: "none",
    padding: "10px 16px",
    borderRadius: 8,
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "all 0.2s",
  },
  navBtnActive: {
    background: "#111111",
    color: "#ffffff",
    fontWeight: 600,
  },
  main: {
    maxWidth: 960,
    margin: "0 auto",
    padding: "0 24px",
  },
  section: {
    padding: "48px 0",
  },
  sectionTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 32,
    fontWeight: 700,
    color: "#111111",
    marginBottom: 8,
  },
  sectionSub: {
    fontSize: 15,
    color: "#777777",
    marginBottom: 32,
    lineHeight: 1.6,
    maxWidth: 600,
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 16,
    marginBottom: 40,
  },
  statCard: {
    background: "#fafafa",
    borderRadius: 12,
    padding: 24,
    textAlign: "center",
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
    border: "1px solid rgba(0,0,0,0.06)",
  },
  statNum: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 36,
    fontWeight: 800,
    color: "#111111",
    marginBottom: 8,
  },
  statDesc: {
    fontSize: 13,
    color: "#888888",
    lineHeight: 1.5,
  },
  overviewGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: 20,
  },
  overviewCard: {
    background: "#fafafa",
    borderRadius: 14,
    padding: 28,
    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
    border: "1px solid rgba(0,0,0,0.06)",
  },
  overviewIcon: {
    fontSize: 28,
    marginBottom: 12,
  },
  overviewCardTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 8,
    color: "#111111",
  },
  overviewCardText: {
    fontSize: 14,
    color: "#555555",
    lineHeight: 1.65,
  },
  toggleRow: {
    display: "flex",
    gap: 8,
    marginBottom: 24,
  },
  toggleBtn: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: 14,
    fontWeight: 600,
    padding: "10px 24px",
    borderRadius: 100,
    border: "2px solid #111111",
    background: "transparent",
    color: "#111111",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  toggleBtnActive: {
    background: "#111111",
    color: "#ffffff",
  },
  segmentList: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  segmentCard: {
    background: "#fafafa",
    borderRadius: 14,
    border: "1px solid rgba(0,0,0,0.08)",
    overflow: "hidden",
    transition: "box-shadow 0.2s",
  },
  segmentCardExpanded: {
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  },
  segmentHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 24px",
    cursor: "pointer",
  },
  segmentName: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 18,
    fontWeight: 700,
    margin: 0,
    color: "#111111",
  },
  segmentAge: {
    fontSize: 13,
    color: "#999999",
    marginTop: 2,
    display: "block",
  },
  expandIcon: {
    fontSize: 24,
    fontWeight: 300,
    color: "#555555",
    width: 36,
    height: 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    background: "rgba(0,0,0,0.05)",
  },
  segmentBody: {
    padding: "0 24px 24px",
    borderTop: "1px solid rgba(0,0,0,0.06)",
    paddingTop: 20,
  },
  segmentGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 16,
  },
  segmentField: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "#999999",
  },
  fieldValue: {
    fontSize: 14,
    color: "#333333",
    lineHeight: 1.5,
  },
  tagRow: {
    display: "flex",
    gap: 6,
    flexWrap: "wrap",
  },
  platformTag: {
    fontSize: 12,
    fontWeight: 600,
    padding: "4px 12px",
    borderRadius: 100,
    background: "rgba(0,0,0,0.06)",
    color: "#333333",
  },
  ctaBadge: {
    display: "inline-block",
    fontSize: 14,
    fontWeight: 600,
    padding: "8px 20px",
    borderRadius: 8,
    background: "#111111",
    color: "#fff",
    marginTop: 4,
  },
  formatGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 20,
  },
  formatCard: {
    background: "#fafafa",
    borderRadius: 14,
    padding: 28,
    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
    border: "1px solid rgba(0,0,0,0.06)",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  formatIcon: {
    fontSize: 32,
  },
  formatName: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 20,
    fontWeight: 700,
    margin: 0,
    color: "#111111",
  },
  formatPlatform: {
    fontSize: 12,
    fontWeight: 600,
    color: "#777777",
    letterSpacing: 0.5,
  },
  formatDivider: {
    height: 1,
    background: "rgba(0,0,0,0.08)",
    margin: "4px 0",
  },
  formatDetail: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
  },
  formatLabel: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "#999999",
  },
  formatValue: {
    fontSize: 14,
    color: "#333333",
    lineHeight: 1.5,
  },
  funnelStack: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  funnelCard: {
    background: "#fafafa",
    borderRadius: 14,
    padding: 28,
    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
  },
  funnelTop: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
  },
  funnelPhase: {
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: 1.5,
    padding: "4px 14px",
    borderRadius: 6,
    color: "#111111",
  },
  funnelLabel: {
    fontSize: 14,
    fontWeight: 500,
    color: "#777777",
  },
  funnelObjective: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 22,
    fontWeight: 700,
    color: "#111111",
    marginBottom: 4,
  },
  funnelGoal: {
    fontSize: 14,
    color: "#777777",
    marginBottom: 20,
  },
  funnelGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 16,
  },
  funnelField: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  funnelFieldLabel: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "#999999",
  },
  funnelFieldValue: {
    fontSize: 14,
    color: "#333333",
    lineHeight: 1.5,
  },
  copyGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 20,
    marginBottom: 40,
  },
  copyCard: {
    background: "#fafafa",
    borderRadius: 14,
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
    border: "1px solid rgba(0,0,0,0.06)",
  },
  copyHeader: {
    padding: "20px 24px 16px",
    borderBottom: "1px solid rgba(0,0,0,0.06)",
  },
  copyName: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 28,
    fontWeight: 800,
    color: "#111111",
    display: "block",
  },
  copyFull: {
    fontSize: 13,
    color: "#777777",
    fontWeight: 500,
  },
  copyExample: {
    padding: "16px 24px 24px",
  },
  copyExLabel: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: "#999999",
    display: "block",
    marginBottom: 8,
  },
  copyExText: {
    fontSize: 14,
    color: "#333333",
    lineHeight: 1.65,
    fontStyle: "italic",
    margin: 0,
  },
  tipsBox: {
    background: "#111111",
    borderRadius: 16,
    padding: 32,
  },
  tipsTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 22,
    fontWeight: 700,
    color: "#ffffff",
    marginBottom: 20,
    marginTop: 0,
  },
  tipsList: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  tipItem: {
    display: "flex",
    gap: 14,
    alignItems: "flex-start",
  },
  tipNum: {
    fontSize: 12,
    fontWeight: 700,
    color: "#888888",
    fontFamily: "'DM Sans', sans-serif",
    minWidth: 24,
    paddingTop: 2,
  },
  tipText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
    lineHeight: 1.55,
  },
  checkGroup: {
    background: "#fafafa",
    borderRadius: 14,
    padding: 28,
    marginBottom: 16,
    boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
    border: "1px solid rgba(0,0,0,0.06)",
  },
  checkGroupTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 20,
    fontWeight: 700,
    color: "#111111",
    marginTop: 0,
    marginBottom: 16,
  },
  checkItem: {
    display: "flex",
    gap: 12,
    alignItems: "flex-start",
    padding: "8px 0",
    cursor: "pointer",
    borderBottom: "1px solid rgba(0,0,0,0.04)",
  },
  checkbox: {
    width: 18,
    height: 18,
    accentColor: "#111111",
    marginTop: 1,
    flexShrink: 0,
  },
  checkText: {
    fontSize: 14,
    color: "#333333",
    lineHeight: 1.5,
  },
  footer: {
    textAlign: "center",
    padding: "40px 24px",
    borderTop: "1px solid rgba(0,0,0,0.08)",
  },
  footerText: {
    fontSize: 13,
    color: "#999999",
  },
};

export default App;
