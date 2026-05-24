import { useState, useMemo } from "react";

// ────────────────────────────────────────────────────────────────────────
// Types & Interfaces
// ────────────────────────────────────────────────────────────────────────

type JobCategory = "Cleaning" | "Care" | "Factory";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  category: JobCategory;
  type: string;
  schedule: string;
  posted: string;
  description: string;
}

interface CategoryStyle {
  bg: string;
  fg: string;
  dot: string;
}

interface JobCardProps {
  job: Job;
}

interface JobListProps {
  jobs: Job[];
}

interface SegmentedControlOption {
  value: string;
  label: string;
  count?: number;
}

interface SegmentedControlProps {
  value: string;
  onChange: (value: string) => void;
  options: SegmentedControlOption[];
}

// ────────────────────────────────────────────────────────────────────────
// Data — 12 listings across cleaning, care, and factory work
// ────────────────────────────────────────────────────────────────────────
const jobs: Job[] = [
  {
    id: 1,
    title: "Office Cleaner",
    company: "SparkleCo Facilities",
    location: "Lagos Mainland",
    salary: "₦120,000 / month",
    category: "Cleaning",
    type: "Full-time",
    schedule: "Mon–Fri, 6am–2pm",
    posted: "2 days ago",
    description:
      "Daily cleaning of office floors, restrooms, and shared spaces across two corporate buildings. Uniform, transport stipend, and cleaning supplies provided.",
  },
  {
    id: 2,
    title: "Hotel Housekeeper",
    company: "Eko Hotels & Suites",
    location: "Victoria Island",
    salary: "₦135,000 / month",
    category: "Cleaning",
    type: "Full-time",
    schedule: "Rotating shifts",
    posted: "1 day ago",
    description:
      "Prepare guest rooms to a high standard between check-outs. Includes linen changes, bathroom sanitation, and restocking. Hotel meals and uniforms included.",
  },
  {
    id: 3,
    title: "Industrial Cleaner",
    company: "PureScape Services",
    location: "Apapa",
    salary: "₦150,000 / month",
    category: "Cleaning",
    type: "Full-time",
    schedule: "Night shift",
    posted: "5 days ago",
    description:
      "Heavy-duty cleaning of warehouse floors and machinery using industrial equipment. Safety training provided. Must be comfortable with night work.",
  },
  {
    id: 4,
    title: "Residential Cleaner",
    company: "HomeShine",
    location: "Lekki Phase 1",
    salary: "₦110,000 / month",
    category: "Cleaning",
    type: "Part-time",
    schedule: "Flexible, 4 days/week",
    posted: "Today",
    description:
      "Routine cleaning of private homes for vetted clients. Bookings are scheduled through our app. Choose your hours, get paid weekly.",
  },
  {
    id: 5,
    title: "Home Care Assistant",
    company: "GentleHands Care",
    location: "Ikoyi",
    salary: "₦180,000 / month",
    category: "Care",
    type: "Full-time",
    schedule: "Live-in available",
    posted: "3 days ago",
    description:
      "Support an elderly client with daily living: meals, medication reminders, light mobility assistance, and companionship. Patience and warmth are essential.",
  },
  {
    id: 6,
    title: "Elderly Care Worker",
    company: "Silverline Care",
    location: "Ikeja",
    salary: "₦200,000 / month",
    category: "Care",
    type: "Full-time",
    schedule: "Mon–Sat, day shift",
    posted: "1 week ago",
    description:
      "Residential care for older adults in our Ikeja facility. Help with hygiene, meals, and recreational activities. Prior care experience preferred but not required — full training given.",
  },
  {
    id: 7,
    title: "Childcare Worker",
    company: "Little Stars Crèche",
    location: "Yaba",
    salary: "₦145,000 / month",
    category: "Care",
    type: "Full-time",
    schedule: "Mon–Fri, 7am–5pm",
    posted: "4 days ago",
    description:
      "Care for children aged 1–4: meals, naps, play, and gentle supervision. Quiet patience and a steady temperament matter more than a long CV.",
  },
  {
    id: 8,
    title: "Personal Care Aide",
    company: "WeCare Health",
    location: "Surulere",
    salary: "₦170,000 / month",
    category: "Care",
    type: "Full-time",
    schedule: "Day or night shifts",
    posted: "6 days ago",
    description:
      "In-home support for clients recovering from surgery or managing chronic conditions. Bathing, dressing, meal prep, and light household tasks.",
  },
  {
    id: 9,
    title: "Production Line Operator",
    company: "Dangote Industries",
    location: "Ibeju-Lekki",
    salary: "₦190,000 / month",
    category: "Factory",
    type: "Full-time",
    schedule: "Rotating shifts",
    posted: "Today",
    description:
      "Operate packaging machinery on the production line. Pension, HMO, and daily transport from designated pickup points. Safety boots and gear provided.",
  },
  {
    id: 10,
    title: "Machine Operator",
    company: "Nigerian Bottling Company",
    location: "Ikeja Industrial Estate",
    salary: "₦220,000 / month",
    category: "Factory",
    type: "Full-time",
    schedule: "Mon–Sat, 8-hour shifts",
    posted: "2 days ago",
    description:
      "Run and monitor bottling equipment. Spot issues early, report faults, keep the line moving. Mechanical aptitude helps; we'll train you on the specifics.",
  },
  {
    id: 11,
    title: "Warehouse Picker",
    company: "Jumia Logistics",
    location: "Isolo",
    salary: "₦155,000 / month",
    category: "Factory",
    type: "Full-time",
    schedule: "6 days/week",
    posted: "3 days ago",
    description:
      "Pick and pack customer orders in a fast-paced warehouse. Performance bonuses available. Lifting up to 20kg may be required.",
  },
  {
    id: 12,
    title: "Quality Control Inspector",
    company: "Nestlé Nigeria",
    location: "Agbara",
    salary: "₦240,000 / month",
    category: "Factory",
    type: "Full-time",
    schedule: "Mon–Fri, day shift",
    posted: "1 week ago",
    description:
      "Inspect finished products against quality benchmarks. Document defects, flag patterns, and work with the line supervisors to keep standards high. Attention to detail is everything.",
  },
];

// Category visual tokens — soft Apple-style tinted backgrounds
const CATEGORY_STYLES: Record<JobCategory, CategoryStyle> = {
  Cleaning: { bg: "#E8F2FE", fg: "#0066CC", dot: "#0071E3" },
  Care: { bg: "#FFEDF0", fg: "#C8366B", dot: "#E64980" },
  Factory: { bg: "#FFF1E0", fg: "#995900", dot: "#F2A341" },
};

// ────────────────────────────────────────────────────────────────────────
// JobCard
// ────────────────────────────────────────────────────────────────────────
function JobCard({ job }: JobCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const cat = CATEGORY_STYLES[job.category];

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#FFFFFF",
        borderRadius: "18px",
        padding: "24px 28px",
        boxShadow: hovered
          ? "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)"
          : "0 1px 2px rgba(0,0,0,0.03), 0 2px 8px rgba(0,0,0,0.03)",
        transition: "box-shadow 240ms ease, transform 240ms ease",
        transform: hovered ? "translateY(-1px)" : "translateY(0)",
      }}
    >
      {/* Top row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: "1 1 320px", minWidth: 0 }}>
          {/* Category pill */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: cat.bg,
              color: cat.fg,
              padding: "4px 10px 4px 8px",
              borderRadius: "980px",
              fontSize: "12px",
              fontWeight: 590,
              letterSpacing: "-0.01em",
              marginBottom: "12px",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: cat.dot,
              }}
            />
            {job.category}
          </div>

          {/* Title */}
          <h3
            style={{
              fontSize: "22px",
              fontWeight: 600,
              letterSpacing: "-0.022em",
              lineHeight: 1.15,
              color: "#1D1D1F",
              margin: 0,
            }}
          >
            {job.title}
          </h3>

          {/* Meta */}
          <p
            style={{
              fontSize: "15px",
              color: "#6E6E73",
              marginTop: "6px",
              marginBottom: 0,
              letterSpacing: "-0.01em",
            }}
          >
            {job.company} <span style={{ margin: "0 6px", opacity: 0.5 }}>·</span> {job.location}
          </p>
        </div>

        {/* Salary + button */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            flexShrink: 0,
          }}
        >
          <div style={{ textAlign: "right" }}>
            <div
              style={{
                fontSize: "11px",
                color: "#86868B",
                letterSpacing: "0.02em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              Salary
            </div>
            <div
              style={{
                fontSize: "17px",
                fontWeight: 600,
                color: "#1D1D1F",
                letterSpacing: "-0.015em",
                marginTop: "2px",
              }}
            >
              {job.salary}
            </div>
          </div>

          <button
            onClick={() => setExpanded((v) => !v)}
            style={{
              background: expanded ? "#1D1D1F" : "#F5F5F7",
              color: expanded ? "#FFFFFF" : "#1D1D1F",
              border: "none",
              borderRadius: "980px",
              padding: "10px 18px",
              fontSize: "14px",
              fontWeight: 500,
              letterSpacing: "-0.01em",
              cursor: "pointer",
              transition: "background 180ms ease, color 180ms ease",
              whiteSpace: "nowrap",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            {expanded ? "Hide details" : "Show details"}
            <span
              style={{
                display: "inline-block",
                transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 240ms ease",
                fontSize: "10px",
                marginLeft: "2px",
              }}
            >
              ▾
            </span>
          </button>
        </div>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div
          style={{
            marginTop: "24px",
            paddingTop: "24px",
            borderTop: "1px solid #F5F5F7",
            animation: "fadeUp 280ms cubic-bezier(0.2, 0.8, 0.2, 1)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "20px",
              marginBottom: "20px",
            }}
          >
            {[
              ["Type", job.type],
              ["Schedule", job.schedule],
              ["Location", job.location],
              ["Posted", job.posted],
            ].map(([label, value]) => (
              <div key={label}>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#86868B",
                    letterSpacing: "0.02em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    marginBottom: "6px",
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    fontSize: "15px",
                    color: "#1D1D1F",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>

          <p
            style={{
              fontSize: "17px",
              lineHeight: 1.5,
              color: "#1D1D1F",
              letterSpacing: "-0.015em",
              maxWidth: "640px",
              margin: 0,
            }}
          >
            {job.description}
          </p>

          <div style={{ marginTop: "24px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button
              style={{
                background: "#0071E3",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "980px",
                padding: "12px 22px",
                fontSize: "15px",
                fontWeight: 500,
                letterSpacing: "-0.01em",
                cursor: "pointer",
                transition: "background 180ms ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#0077ED")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#0071E3")}
            >
              Apply now
            </button>
            <button
              style={{
                background: "transparent",
                color: "#0071E3",
                border: "none",
                borderRadius: "980px",
                padding: "12px 18px",
                fontSize: "15px",
                fontWeight: 500,
                letterSpacing: "-0.01em",
                cursor: "pointer",
              }}
            >
              Save for later
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

// ────────────────────────────────────────────────────────────────────────
// JobList — conditional rendering for empty state
// ────────────────────────────────────────────────────────────────────────
function JobList({ jobs }: JobListProps) {
  if (jobs.length === 0) {
    return (
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "18px",
          padding: "80px 32px",
          textAlign: "center",
          boxShadow: "0 1px 2px rgba(0,0,0,0.03), 0 2px 8px rgba(0,0,0,0.03)",
        }}
      >
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: "#F5F5F7",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
            fontSize: "24px",
          }}
        >
          🔍
        </div>
        <h3
          style={{
            fontSize: "22px",
            fontWeight: 600,
            letterSpacing: "-0.022em",
            color: "#1D1D1F",
            margin: 0,
          }}
        >
          No jobs available at the moment.
        </h3>
        <p
          style={{
            fontSize: "15px",
            color: "#6E6E73",
            marginTop: "8px",
            letterSpacing: "-0.01em",
            margin: "8px 0 0",
          }}
        >
          New opportunities are posted daily — check back soon.
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────
// Segmented Filter Control (Apple-style)
// ────────────────────────────────────────────────────────────────────────
function SegmentedControl({ value, onChange, options }: SegmentedControlProps) {
  return (
    <div
      style={{
        display: "inline-flex",
        background: "#F0F0F2",
        borderRadius: "10px",
        padding: "3px",
        gap: "2px",
      }}
    >
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            style={{
              background: active ? "#FFFFFF" : "transparent",
              color: active ? "#1D1D1F" : "#6E6E73",
              border: "none",
              borderRadius: "8px",
              padding: "8px 16px",
              fontSize: "13.5px",
              fontWeight: active ? 590 : 500,
              letterSpacing: "-0.01em",
              cursor: "pointer",
              transition: "background 200ms ease, color 200ms ease",
              boxShadow: active
                ? "0 1px 2px rgba(0,0,0,0.06), 0 2px 6px rgba(0,0,0,0.04)"
                : "none",
            }}
          >
            {opt.label}
            {opt.count !== undefined && (
              <span
                style={{
                  marginLeft: "6px",
                  fontSize: "12px",
                  color: active ? "#86868B" : "#A1A1A6",
                  fontWeight: 500,
                }}
              >
                {opt.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────
// App
// ────────────────────────────────────────────────────────────────────────
export default function App() {
  const [filter, setFilter] = useState("All");

  const filteredJobs = useMemo(
    () => (filter === "All" ? jobs : jobs.filter((j) => j.category === filter)),
    [filter]
  );

  const counts = useMemo(
    () => ({
      All: jobs.length,
      Cleaning: jobs.filter((j) => j.category === "Cleaning").length,
      Care: jobs.filter((j) => j.category === "Care").length,
      Factory: jobs.filter((j) => j.category === "Factory").length,
    }),
    []
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F5F5F7",
        color: "#1D1D1F",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif",
        padding: "56px 24px 80px",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      }}
    >
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/sf-pro-display');
        * { box-sizing: border-box; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        body { margin: 0; }
      `}</style>

      <div style={{ maxWidth: "920px", margin: "0 auto" }}>
        {/* Hero */}
        <header style={{ marginBottom: "40px" }}>
          <p
            style={{
              fontSize: "15px",
              fontWeight: 500,
              color: "#0071E3",
              letterSpacing: "-0.01em",
              margin: "0 0 10px",
            }}
          >
            Open positions
          </p>
          <h1
            style={{
              fontSize: "clamp(40px, 6vw, 56px)",
              fontWeight: 600,
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
              color: "#1D1D1F",
              margin: 0,
              maxWidth: "720px",
            }}
          >
            Job board
          </h1>
          <p
            style={{
              fontSize: "19px",
              color: "#6E6E73",
              letterSpacing: "-0.015em",
              lineHeight: 1.45,
              marginTop: "14px",
              marginBottom: 0,
              maxWidth: "580px",
            }}
          >
            Cleaning, care, and factory roles from trusted employers across Lagos. Real wages,
            real schedules, no agency fees.
          </p>
        </header>

        {/* Filter row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <SegmentedControl
            value={filter}
            onChange={setFilter}
            options={[
              { value: "All", label: "All", count: counts.All },
              { value: "Cleaning", label: "Cleaning", count: counts.Cleaning },
              { value: "Care", label: "Care", count: counts.Care },
              { value: "Factory", label: "Factory", count: counts.Factory },
            ]}
          />
          <p
            style={{
              fontSize: "13.5px",
              color: "#86868B",
              letterSpacing: "-0.01em",
              margin: 0,
            }}
          >
            Showing {filteredJobs.length} of {jobs.length}
          </p>
        </div>

        {/* List */}
        <JobList jobs={filteredJobs} />

        {/* Footer note */}
        <footer
          style={{
            marginTop: "56px",
            textAlign: "center",
            fontSize: "12px",
            color: "#86868B",
            letterSpacing: "-0.005em",
          }}
        >
          All listings verified. Equal opportunity employers.
        </footer>
      </div>
    </div>
  );
}
