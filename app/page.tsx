"use client"

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  ChevronRight,
  CircuitBoard,
  Contact,
  Cpu,
  Layers3,
  Radar,
  Server,
  ShieldCheck,
  Wrench,
  Workflow,
} from "lucide-react";

/**
 * Canvas-friendly single-file version of the multi-page J.K. Robotics website.
 *
 * Fixes applied:
 * - Added the missing RouteRenderer component.
 * - Added the missing Footer component.
 * - Replaced external UI imports with local Card/Button primitives so the file is self-contained.
 * - Added small runtime self-tests in development to catch route/config mismatches early.
 */

type RouteKey = "home" | "services" | "about" | "contact";

type NavItem = {
  key: RouteKey;
  label: string;
};

type IconType = React.ComponentType<{ className?: string }>;

const LOGO_SRC = "/logo.png";

const NAV_ITEMS: NavItem[] = [
  { key: "home", label: "Home" },
  { key: "services", label: "Services" },
  { key: "about", label: "About" },
  // { key: "projects", label: "Projects" },
  { key: "contact", label: "Contact" },
];

const SERVICES: Array<{ icon: IconType; title: string; text: string }> = [
  {
    icon: Layers3,
    title: "Robotics System Architecture",
    text: "End-to-end engineering for robotic platforms, from concept definition to deployable system design.",
  },
  {
    icon: CircuitBoard,
    title: "Embedded Electronics & Custom Hardware",
    text: "Custom PCB design, power systems, hardware bring-up, validation, and industrial-grade electronics development.",
  },
  {
    icon: Bot,
    title: "Autonomous Robotics Software",
    text: "Middleware, navigation, distributed robotics architectures, computer vision, and system-level software for autonomous machines.",
  },
  {
    icon: Wrench,
    title: "Rapid Prototyping & Production",
    text: "Fast iteration, engineering validation, and prototype-to-production transition support.",
  },
];

const ELECTRONICS: string[] = [
  "Custom PCB design from raw microprocessors and SoCs",
  "Robotics electronics architecture and power systems",
  "High-speed digital and mixed-signal circuit design",
  "Motor control systems: BLDC, DC, Servo, Stepper",
  "Sensor integration: IMU, LiDAR, Camera, GNSS, Radar",
  "Embedded firmware and real-time systems",
  "Hardware bring-up, validation, and debugging",
  "EMI/EMC-conscious industrial electronics design",
];

const SOFTWARE: string[] = [
  "Custom operating system development for robotics",
  "Kernel-level software and driver development",
  "Embedded Linux customization and BSP development",
  "Real-time systems and low-latency communication",
  "Robotics middleware and distributed architectures",
  "Computer vision and autonomous navigation systems",
  "Networking, telemetry, and secure communication",
  "High-performance C/C++ and system-level programming",
];

const ENGAGEMENT: string[] = [
  "End-to-end product development",
  "Contract engineering and technical consulting",
  "Prototype-to-production transition support",
  "R&D collaboration with industry partners",
];

// const PROJECTS: Array<{ title: string; text: string }> = [
//   {
//     title: "Industrial Mobile Robotics",
//     text: "Custom robotic platform engineering for manufacturers that need reliable hardware, controls, and deployment-ready system architecture.",
//   },
//   {
//     title: "Embedded Autonomy Stack",
//     text: "System software, middleware, telemetry, and perception pipelines designed for low-latency robotic operation in field conditions.",
//   },
//   {
//     title: "Prototype-to-Production Programs",
//     text: "Engineering partnerships that bridge proof-of-concept prototypes into scalable, supportable robotic products.",
//   },
// ];

const ROUTE_TESTS: RouteKey[] = ["home", "services", "about", "contact"];

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

function CardContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

function Button({
  children,
  className = "",
  variant = "default",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "outline" }) {
  const variantClass =
    variant === "outline"
      ? "border border-white/20 bg-white/5 text-white hover:bg-white/10"
      : "bg-white text-black hover:bg-white/90";

  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-white/30 disabled:pointer-events-none disabled:opacity-50",
        variantClass,
        className
      )}
    >
      {children}
    </button>
  );
}

function BackgroundGlow() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {
    setMouse({
      x: e.clientX,
      y: e.clientY,
    });
  };

  window.addEventListener("mousemove", handleMouseMove);
  return () => window.removeEventListener("mousemove", handleMouseMove);
}, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[#020807]">

      {/* PCB grid */}
      <div
        className="absolute inset-0 opacity-20
        [background-image:
          linear-gradient(rgba(0,80,40,0.2)_1px,transparent_1px),
          linear-gradient(90deg,rgba(0,80,40,0.2)_1px,transparent_1px)
        ]
        [background-size:56px_56px]"
      />

      {/* 🟢 MOUSE FOLLOW GLOW */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          left: mouse.x - 200,
          top: mouse.y - 200,
          background: "radial-gradient(circle, rgba(34,197,94,0.25) 0%, rgba(34,197,94,0.15) 30%, transparent 70%)",
          filter: "blur(120px)",
          transition: "left 0.08s linear, top 0.08s linear",
        }}
      />

      {/* secondary ambient glow (optional depth) */}
      <div className="absolute right-10 top-1/3 h-80 w-80 rounded-full bg-green-400/10 blur-[120px]" />

      {/* scanlines */}
      <div
        className="absolute inset-0 opacity-5
        [background-image:linear-gradient(to_bottom,transparent_95%,rgba(34,197,94,0.25)_100%)]
        [background-size:100%_6px]"
      />
    </div>
  );
}

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="max-w-3xl">
      <div className="mb-3 inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.24em] text-white/60">
        {eyebrow}
      </div>
      <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">{title}</h2>
      {text ? <p className="mt-4 text-base leading-7 text-white/70 md:text-lg">{text}</p> : null}
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
      <div className="text-4xl font-semibold text-white md:text-5xl">{value}</div>
      <div className="mt-2 text-sm uppercase tracking-[0.2em] text-white/50">{label}</div>
    </div>
  );
}

function ServiceCard({ icon: Icon, title, text }: { icon: IconType; title: string; text: string }) {
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25 }}>
      <Card className="h-full rounded-[28px] border border-white/10 bg-white/[0.04] shadow-xl shadow-black/20 backdrop-blur-sm">
        <CardContent className="p-7">
          <div className="mb-5 inline-flex rounded-2xl border border-white/10 bg-white/10 p-3 text-white">
            <Icon className="h-6 w-6" />
          </div>
          <h3 className="text-2xl font-semibold text-white">{title}</h3>
          <p className="mt-4 text-base leading-7 text-white/68">{text}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ExpertiseColumn({ icon: Icon, title, items }: { icon: IconType; title: string; items: string[] }) {
  return (
    <Card className="rounded-[28px] border border-white/10 bg-white/5 shadow-2xl shadow-black/20 backdrop-blur-md">
      <CardContent className="p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/10 p-3 text-white">
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
        </div>
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/8 bg-black/20 px-4 py-3">
              <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-white/70" />
              <p className="text-sm leading-6 text-white/75">{item}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function PageShell({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-7xl px-6 py-16 md:px-8 lg:px-12">{children}</div>;
}

function HomePage({ onNavigate }: { onNavigate: (route: RouteKey) => void }) {
  const CAPABILITIES = [
    [
      "Hardware",
      "Application-driven electronics engineered from first principles — semiconductor selection, power architecture, and custom embedded hardware designed for performance and reliability",
    ],
    [
      "Software",
      "Full-stack embedded systems development — from low-level firmware and kernel to high-performance application and interface layers, built specifically for the target system",
    ],
    [
      "Autonomy",
      "Autonomy systems tailored to mission requirements — perception, planning, and distributed control engineered to match the required level of intelligence and operational complexity",
    ],
    [
      "Deployment",
      "End-to-end system realization — from rapid prototyping to production-grade hardware and software, optimized for scalability, robustness, and real-world operation",
    ],
  ];

  return (
    <div>
      <section className="relative overflow-hidden border-b border-white/10">
        <BackgroundGlow />

        <PageShell>
          <div className="relative z-10 grid min-h-[70vh] items-start gap-20 pt-6 pb-10 lg:grid-cols-[1.2fr_1.2fr]">
            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-1.5 text-xs uppercase tracking-[0.24em] text-white/65">
                <Cpu className="h-3.5 w-3.5" /> Production-ready robotic systems
              </div>

              <h1 className="max-w-4xl text-3xl font-semibold leading-[0.95] tracking-tight text-white md:text-xl lg:text-[5rem]">
                Building complete robotic systems from silicon to autonomy.
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-white/72 md:text-lg">
                J.K. Robotics Pvt. Ltd. partners with manufacturers, startups, and research organizations to design,
                prototype, and deploy robust robotic platforms across electronics hardware, embedded systems, operating systems,
                middleware, and autonomous software.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button className="rounded-full px-6 py-3" onClick={() => onNavigate("contact")}>
                  Start a Project <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  className="rounded-full px-6 py-3"
                  onClick={() => onNavigate("services")}
                >
                  Explore Capabilities
                </Button>
              </div>
            </motion.div>

            {/* RIGHT (WIDER CARD) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative"
            >
              <div className="absolute -inset-6 rounded-[36px] bg-white/10 blur-3xl" />

              <Card className="relative overflow-hidden rounded-[32px] border border-white/12 bg-white/8 shadow-2xl shadow-black/30 backdrop-blur-xl">
                <CardContent className="p-6 md:p-8">

                  {/* HEADER */}
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <div className="text-xs uppercase tracking-[0.25em] text-white/45">
                        Company Overview
                      </div>
                      <div className="mt-1 text-2xl font-semibold text-white">
                        Full-stack robotics engineering
                      </div>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
                      <Server className="h-8 w-8 text-white" />
                    </div>
                  </div>

                  {/* CAPABILITIES (2 COL ONLY WHEN WIDE) */}
                  <div className="grid gap-4 lg:grid-cols-2">
                    {CAPABILITIES.map(([title, text]) => (
                      <div
                        key={title}
                        className="rounded-3xl border border-white/10 bg-black/20 p-5"
                      >
                        <div className="text-sm font-semibold text-white tracking-wide">
                          {title}
                        </div>
                        <div className="mt-2 text-sm leading-6 text-white/65">
                          {text}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* MISSION */}
                  <div className="mt-5 rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-5">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="h-5 w-5 text-white/80" />
                      <div className="text-sm uppercase tracking-[0.22em] text-white/50">
                        Mission
                      </div>
                    </div>

                    <p className="mt-3 text-sm leading-7 text-white/72">
                      To enable companies to rapidly build reliable, scalable, and production-grade robotic systems
                      through deep engineering expertise across hardware and software domains.
                    </p>
                  </div>

                </CardContent>
              </Card>
            </motion.div>

          </div>
        </PageShell>
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-8 lg:px-12">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <StatCard value="5+" label="Core Service Areas" />
          <StatCard value="8+" label="Electronics Capabilities" />
          <StatCard value="8+" label="Software Capabilities" />
          <StatCard value="4+" label="Engagement Models" />
        </div>
      </section>
    </div>
  );
}


function ServicesPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* 🌌 BACKGROUND (behind everything) */}
      <BackgroundGlow />

      {/* 🧱 FOREGROUND CONTENT */}
      <div className="relative z-10">
        <PageShell>
          <SectionHeading
            eyebrow="Core Services"
            title="Engineering partnerships for ambitious robotic products"
            text="From architecture and custom electronics to autonomy software and industrial deployment, the company supports complete robotic product realization."
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {SERVICES.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </PageShell>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* 🌌 BACKGROUND GLOW */}
      <BackgroundGlow />

      {/* 🧱 CONTENT */}
      <div className="relative z-10">
        <PageShell>
          <SectionHeading
            eyebrow="About"
            title="A deep-tech robotics engineering partner"
            text="J.K. Robotics Pvt. Ltd. is positioned as an engineering-focused robotics consulting firm specializing in end-to-end robotic system development for manufacturers, startups, and research organizations."
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            <ExpertiseColumn icon={Radar} title="Electronics Expertise" items={ELECTRONICS} />
            <ExpertiseColumn icon={Cpu} title="Software & Systems Expertise" items={SOFTWARE} />
          </div>
        </PageShell>
      </div>
    </div>
  );
}

function ContactPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* 🌌 BACKGROUND GLOW */}
      <BackgroundGlow />

      {/* 🧱 CONTENT */}
      <div className="relative z-10">
        <PageShell>
          <SectionHeading
            eyebrow="Contact"
            title="Ready to engineer your next robotic system?"
            text="Ideal for startups, manufacturers, and research organizations seeking robotics architecture, electronics, embedded systems, autonomy, and production engineering support."
          />

          <div className="mt-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <Card className="rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-md">
              <CardContent className="p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/10 p-3">
                    <Contact className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white">Direct Contact</h3>
                </div>
                <div className="space-y-3 text-white/75">
                  <p>info@jkrobotics.tech</p>
                  <p>+91 98259 83456</p>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[30px] border border-white/10 bg-gradient-to-br from-white/10 via-white/[0.03] to-transparent backdrop-blur-md">
              <CardContent className="p-8">
                <div className="text-xs uppercase tracking-[0.24em] text-white/45">
                  Engagement Model
                </div>
                <div className="mt-6 space-y-4">
                  {ENGAGEMENT.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/8 bg-black/20 px-4 py-4 text-white/75"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </PageShell>
      </div>
    </div>
  );
}

function Header({ route, onNavigate }: { route: RouteKey; onNavigate: (route: RouteKey) => void }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-[#06070a]/50 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8 lg:px-12">

        <button onClick={() => onNavigate("home")} className="flex items-center gap-3 text-left">
          <div>
            <div className="text-xl font-bold uppercase tracking-[0.2em] text-white/90">
              J.K. Robotics
            </div>
            <div className="text-sm font-semibold text-white/40">
              Advanced Robotics Engineering
            </div>
          </div>
        </button>

        <nav className="hidden items-center gap-2 md:flex">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className={cn(
                "rounded-full px-4 py-2 text-sm transition",
                route === item.key
                  ? "bg-white text-black"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>

      </div>
    </header>
  );
}

function Footer({ onNavigate }: { onNavigate: (route: RouteKey) => void }) {
  return (
    <footer className="border-t border-white/10 bg-white/[0.03]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between md:px-8 lg:px-12">
        <div>
          <div className="text-sm uppercase tracking-[0.3em] text-white/55">J.K. Robotics Pvt. Ltd.</div>
          <div className="mt-2 text-sm text-white/55">Building complete robotic systems.</div>
        </div>
        <div className="flex flex-wrap gap-3">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white"
            >
              {item.label} <ChevronRight className="h-3.5 w-3.5" />
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}

function RouteRenderer({ route, onNavigate }: { route: RouteKey; onNavigate: (route: RouteKey) => void }) {
  switch (route) {
    case "home":
      return <HomePage onNavigate={onNavigate} />;
    case "services":
      return <ServicesPage />;
    case "about":
      return <AboutPage />;
    // case "projects":
    //   return <ProjectsPage />;
    case "contact":
      return <ContactPage />;
    default:
      return <HomePage onNavigate={onNavigate} />;
  }
}

function runDevSelfTests() {
  const navKeys = NAV_ITEMS.map((item) => item.key);

  console.assert(NAV_ITEMS.length === 5, "Expected 5 nav items.");
  console.assert(new Set(navKeys).size === NAV_ITEMS.length, "Nav item keys must be unique.");
  console.assert(ROUTE_TESTS.every((route) => navKeys.includes(route)), "Every route test must exist in nav items.");
  console.assert(typeof RouteRenderer === "function", "RouteRenderer must be defined.");
  console.assert(typeof Footer === "function", "Footer must be defined.");
}

export default function JkRoboticsPortfolioSite() {
  const [route, setRoute] = useState<RouteKey>("home");

  const routeValidation = useMemo(() => {
    return ROUTE_TESTS.every((routeName) => NAV_ITEMS.some((item) => item.key === routeName));
  }, []);

  useEffect(() => {
    runDevSelfTests();
  }, []);

  return (
    <div className="min-h-screen bg-[#06070a] text-white">
      <Header route={route} onNavigate={setRoute} />

      {!routeValidation ? (
        <div className="mx-auto max-w-7xl px-6 py-10 text-red-300">Route configuration error.</div>
      ) : null}

      <AnimatePresence mode="wait">
        <motion.main
          key={route}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35 }}
        >
          <RouteRenderer route={route} onNavigate={setRoute} />
        </motion.main>
      </AnimatePresence>

      <Footer onNavigate={setRoute} />
    </div>
  );
}
