
"use client";

import Link from "next/link";
import { useState } from "react";


const categories = [
  {
    number: "01",
    icon: "↗",
    title: "Jobs",
    description: "Find roles that match your skills and direction.",
    accent: "sage",
  },
  {
    number: "02",
    icon: "◎",
    title: "Internships",
    description: "Build experience and make your first connections.",
    accent: "gold",
  },
  {
    number: "03",
    icon: "◇",
    title: "Scholarships",
    description: "Explore support for your next stage of learning.",
    accent: "sage",
  },
  {
    number: "04",
    icon: "▱",
    title: "Digital skills",
    description: "Learn practical, in-demand digital skills.",
    accent: "clay",
  },
  {
    number: "05",
    icon: "⌘",
    title: "Remote work",
    description: "Discover flexible ways to earn from anywhere.",
    accent: "sage",
  },
  {
    number: "06",
    icon: "✳",
    title: "Career guidance",
    description: "Prepare stronger applications and career plans.",
    accent: "gold",
  },
];

const steps = [
  {
    number: "01",
    icon: "⌕",
    title: "Discover",
    description:
      "Explore opportunities brought together from relevant sources.",
  },
  {
    number: "02",
    icon: "◎",
    title: "Find your fit",
    description:
      "Focus on options that align with your interests, skills and goals.",
  },
  {
    number: "03",
    icon: "↗",
    title: "Take action",
    description:
      "Save opportunities, prepare applications and move forward.",
  },
];

const benefits = [
  {
    number: "01",
    title: "More opportunities, less searching",
    description:
      "Spend less time jumping between websites and more time exploring what fits.",
  },
  {
    number: "02",
    title: "Guidance for the journey",
    description:
      "Find practical resources to help you prepare, learn and make informed choices.",
  },
  {
    number: "03",
    title: "A path towards earning",
    description:
      "Connect your education and skills to employment and income opportunities.",
  },
];

function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
        light ? "bg-[#f8f4e9] text-[#123f34]" : "bg-[#123f34] text-[#f8f4e9]"
      }`}
    >
      <svg viewBox="0 0 40 40" fill="none" className="h-7 w-7">
        <path d="M20 4 34 12 20 20 6 12 20 4Z" fill="currentColor" opacity=".95" />
        <path d="M7 19 20 27 33 19" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 26 20 34 33 26" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function Eyebrow({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] ${
        light ? "text-[#e9b747]" : "text-[#123f34]"
      }`}
    >
      <span className={`h-px w-8 ${light ? "bg-[#e9b747]" : "bg-[#d7a12d]"}`} />
      {children}
    </div>
  );
}

export default function Home() {

const [menuOpen, setMenuOpen] = useState(false);


  return (
    <main className="overflow-hidden bg-[#f8f4e9] text-[#173b32]">
      {/* Navigation */}
 
<header className="sticky top-0 z-50 border-b border-[#123f34]/10 bg-[#f8f4e9]/95 backdrop-blur-xl">
  <nav
    aria-label="Main navigation"
    className="mx-auto flex w-full max-w-[1320px] items-center justify-between gap-4 px-5 py-4 sm:px-8"
  >
    {/* TON logo */}
    <Link
      href="/"
      onClick={() => setMenuOpen(false)}
      className="flex shrink-0 items-center gap-3"
    >
      <BrandMark />
      <span>
        <span className="block text-xl font-extrabold tracking-tight text-[#123f34]">
          TON
        </span>
        <span className="hidden text-xs text-[#65766e] sm:block">
          Tose Opportunities Network
        </span>
      </span>
    </Link>

    {/* Desktop navigation */}
    <div className="hidden items-center gap-7 lg:flex">
      <a href="#opportunities" className="text-sm text-[#52645d] transition hover:text-[#123f34]">
        Opportunities
      </a>
      <a href="#how-it-works" className="text-sm text-[#52645d] transition hover:text-[#123f34]">
        How it works
      </a>
      <a href="#why-ton" className="text-sm text-[#52645d] transition hover:text-[#123f34]">
        Why TON
      </a>
      <a href="#about" className="text-sm text-[#52645d] transition hover:text-[#123f34]">
        About
      </a>
    </div>

    {/* Desktop actions */}
    <div className="hidden items-center gap-3 lg:flex">
      <Link
        href="/login"
        className="rounded-full px-4 py-2.5 text-sm font-semibold text-[#123f34] transition hover:bg-[#e8f0e8]"
      >
        Log in
      </Link>
      <Link
        href="/signup"
        className="inline-flex items-center gap-2 rounded-full bg-[#123f34] px-5 py-3 text-sm font-semibold !text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#0b3028]"
      >
        Get started <span aria-hidden="true">↗</span>
      </Link>
    </div>

    {/* Mobile/tablet hamburger */}
    <button
      type="button"
      aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
      aria-expanded={menuOpen}
      aria-controls="ton-mobile-menu"
      onClick={() => setMenuOpen((open) => !open)}
      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#d8ddd3] text-[#123f34] transition hover:bg-[#e8f0e8] lg:hidden"
    >
      {menuOpen ? (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </svg>
      )}
    </button>
  </nav>

  {/* Mobile/tablet dropdown — normal document flow */}
  {menuOpen && (
    <div
      id="ton-mobile-menu"
      className="border-t border-[#e4e3d9] bg-white px-4 pb-5 pt-3 shadow-lg lg:hidden"
    >
      <div className="mx-auto flex max-w-[1320px] flex-col">
        <a
          href="#opportunities"
          onClick={() => setMenuOpen(false)}
          className="rounded-xl px-4 py-3.5 text-sm font-medium text-[#263d35] transition hover:bg-[#f3f5ef]"
        >
          Opportunities
        </a>
        <a
          href="#how-it-works"
          onClick={() => setMenuOpen(false)}
          className="rounded-xl px-4 py-3.5 text-sm font-medium text-[#263d35] transition hover:bg-[#f3f5ef]"
        >
          How it works
        </a>
        <a
          href="#why-ton"
          onClick={() => setMenuOpen(false)}
          className="rounded-xl px-4 py-3.5 text-sm font-medium text-[#263d35] transition hover:bg-[#f3f5ef]"
        >
          Why TON
        </a>
        <a
          href="#about"
          onClick={() => setMenuOpen(false)}
          className="rounded-xl px-4 py-3.5 text-sm font-medium text-[#263d35] transition hover:bg-[#f3f5ef]"
        >
          About
        </a>

        <div className="my-2 border-t border-[#e4e3d9]" />

        <Link
          href="/login"
          onClick={() => setMenuOpen(false)}
          className="rounded-xl px-4 py-3.5 text-sm font-medium text-[#263d35] transition hover:bg-[#f3f5ef]"
        >
          Log in
        </Link>
        <Link
          href="/signup"
          onClick={() => setMenuOpen(false)}
          className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#123f34] px-4 py-3.5 text-sm font-bold !text-white transition hover:bg-[#0b3028]"
        >
          Get Started <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </div>
  )}
</header>


      {/* Hero */}
      <section className="relative isolate border-b border-[#123f34]/5">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-28 top-24 h-72 w-72 rounded-full border border-[#d7a12d]/20"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 top-32 h-56 w-56 rounded-full bg-[#e8f0e8]/80"
        />

        <div className="relative mx-auto grid max-w-[1320px] items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[.92fr_1.08fr] lg:gap-10 lg:py-24">
          <div className="relative z-10">
            <Eyebrow>Together, we rise</Eyebrow>

            <h1 className="mt-7 max-w-[650px] text-[clamp(3rem,6.1vw,5.8rem)] font-black leading-[.98] tracking-[-.065em] text-[#123f34]">
              Your potential deserves an{" "}
              <span className="relative inline-block text-[#b98419]">
                opportunity.
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 -z-10 h-3 w-full -rotate-1 bg-[#e9b747]/50"
                />
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-[#65766e] sm:text-lg sm:leading-8">
              Discover opportunities to learn, work and grow. Find jobs,
              internships, scholarships and skills resources in one place,
              and take your next step with confidence.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
             
<Link
  href="/opportunities"
  style={{ backgroundColor: "#123f34", color: "#ffffff" }}
  className="inline-flex min-h-13 items-center justify-center gap-3 rounded-full px-7 py-4 text-sm font-bold transition hover:-translate-y-0.5 hover:opacity-90"
>
  Explore opportunities <span aria-hidden="true">↗</span>
</Link>
  <Link
    href="/signup"
    style={{ backgroundColor: "#fffdf8", color: "#123f34" }}
    className="inline-flex min-h-13 items-center justify-center rounded-xl border border-[#cbd4ca] px-7 py-4 text-sm font-bold transition hover:bg-[#e8f0e8]"
  >

                Get started
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-xs font-medium text-[#65766e]">
              <span className="inline-flex items-center gap-2">
                <span className="text-[#b98419]">✳</span> Opportunities in one place
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="text-[#b98419]">↗</span> Built around your goals
              </span>
            </div>
          </div>

          {/* Original opportunity-preview illustration */}
          <div className="relative mx-auto w-full max-w-[620px] lg:ml-auto">
            <div
              aria-hidden="true"
              className="absolute -right-3 top-2 h-28 w-28 rounded-[2rem] bg-[#e9b747] sm:-right-5 sm:h-36 sm:w-36"
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-5 -left-5 h-28 w-28 rounded-full border border-[#d7a12d]/50 sm:-left-8 sm:h-36 sm:w-36"
            />

            <div className="relative overflow-hidden rounded-[1.7rem] border border-white bg-white shadow-[0_25px_80px_rgba(18,63,52,0.12)] sm:rounded-[2rem]">
              <div className="flex items-center justify-between border-b border-[#e4e3d9] px-5 py-5 sm:px-7">
                <div className="flex items-center gap-3">
                  <BrandMark />
                  <div>
                    <p className="font-extrabold text-[#123f34]">Your next chapter</p>
                    <p className="mt-0.5 text-xs text-[#65766e]">
                      Opportunities worth exploring
                    </p>
                  </div>
                </div>
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#b5cbb9]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#e9b747]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#123f34]" />
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-3 rounded-xl border border-[#e4e3d9] bg-[#faf8f2] px-4 py-3.5">
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5 shrink-0 text-[#123f34]">
                    <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" strokeWidth="1.8" />
                    <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                  <span className="text-sm text-[#65766e]">
                    Imagine your next opportunity...
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
                  <span className="rounded-full bg-[#123f34] px-4 py-2 text-white">Explore all</span>
                  <span className="rounded-full bg-[#e8f0e8] px-4 py-2 text-[#123f34]">Jobs</span>
                  <span className="rounded-full bg-[#e8f0e8] px-4 py-2 text-[#123f34]">Learning</span>
                  <span className="rounded-full bg-[#e8f0e8] px-4 py-2 text-[#123f34]">Funding</span>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="flex min-h-44 flex-col rounded-2xl border border-[#e4e3d9] p-4 sm:p-5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8f0e8] text-xl text-[#123f34]">
                      ◇
                    </span>
                    <p className="mt-5 text-xs font-bold uppercase tracking-wide text-[#b98419]">
                      Learning & funding
                    </p>
                    <h2 className="mt-2 font-bold leading-6 text-[#123f34]">
                      Continue your education
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-[#65766e]">
                      Explore scholarships and practical courses.
                    </p>
                  </div>

                  <div className="flex min-h-44 flex-col rounded-2xl bg-[#123f34] p-4 text-white sm:p-5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-xl text-[#e9b747]">
                      ↗
                    </span>
                    <p className="mt-5 text-xs font-bold uppercase tracking-wide text-[#e9b747]">
                      Skills & careers
                    </p>
                    <h2 className="mt-2 font-bold leading-6">
                      Grow your digital toolkit
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-white/75">
                      Build skills for a changing world of work.
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-4 rounded-xl bg-[#f8f4e9] p-4">
                  <div>
                    <p className="text-sm font-bold text-[#123f34]">
                      A good next step changes things.
                    </p>
                    <p className="mt-1 text-xs leading-5 text-[#65766e]">
                      Discover what could be possible for you.
                    </p>
                  </div>
                  <span aria-hidden="true" className="text-2xl text-[#b98419]">
                    ↗
                  </span>
                </div>
              </div>
            </div>

            <p className="relative mt-5 text-center text-xs text-[#65766e]">
              A place to discover possibilities, one step at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Opportunities */}
      <section id="opportunities" className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-8">
          <div className="grid gap-5 md:grid-cols-[1.2fr_.8fr] md:items-end">
            <div>
              <Eyebrow>Explore what’s possible</Eyebrow>
              <h2 className="mt-5 max-w-2xl text-3xl font-black leading-tight tracking-[-.045em] text-[#123f34] sm:text-5xl">
                Find your next opportunity.
              </h2>
            </div>
            <p className="max-w-xl leading-7 text-[#65766e] md:justify-self-end">
              Whether you are ready to work, learn something new or plan your
              path, TON helps you see the possibilities more clearly.
            </p>
          </div>

          <div className="mt-10 grid gap-0 border-l border-t border-[#e4e3d9] sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.number}
                href="/opportunities"
                className="group flex min-h-64 flex-col border-b border-r border-[#e4e3d9] p-6 transition hover:bg-[#faf8f2] sm:p-8"
              >
                <div className="flex items-start justify-between">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl text-xl text-[#123f34] ${
                      category.accent === "gold"
                        ? "bg-[#fbebc4]"
                        : category.accent === "clay"
                          ? "bg-[#f7e3da]"
                          : "bg-[#e8f0e8]"
                    }`}
                  >
                    {category.icon}
                  </span>
                  <span className="text-xs font-bold tracking-widest text-[#a4b0a8]">
                    {category.number}
                  </span>
                </div>

                <h3 className="mt-7 text-lg font-bold text-[#123f34]">
                  {category.title}
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-6 text-[#65766e]">
                  {category.description}
                </p>
                <span className="mt-auto flex items-center gap-2 pt-5 text-sm font-bold text-[#123f34]">
                  Explore <span className="transition group-hover:translate-x-1">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="relative overflow-hidden bg-[#123f34] py-20 text-white sm:py-24">
        <div aria-hidden="true" className="absolute -left-24 bottom-0 h-72 w-72 rounded-full border border-white/10" />
        <div aria-hidden="true" className="absolute -left-10 bottom-10 h-44 w-44 rounded-full border border-white/10" />

        <div className="relative mx-auto grid max-w-[1320px] gap-12 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <Eyebrow light>How TON works</Eyebrow>
            <h2 className="mt-5 max-w-lg text-3xl font-black leading-tight tracking-[-.045em] sm:text-5xl">
              A simpler path from possibility to progress.
            </h2>
            <p className="mt-5 max-w-md leading-7 text-white/70">
              Turn a world of information into a clear, practical next step.
              Your journey starts wherever you are today.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {steps.map((step) => (
              <article
                key={step.number}
                className="rounded-2xl border border-white/15 bg-white/[0.045] p-5 transition hover:bg-white/[0.08] sm:p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e9b747] text-xl text-[#123f34]">
                    {step.icon}
                  </span>
                  <span className="text-2xl font-black text-white/25">
                    {step.number}
                  </span>
                </div>
                <h3 className="mt-7 text-lg font-bold">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/70">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why TON */}
      <section id="why-ton" className="bg-[#e8f0e8] py-20 sm:py-24">
        <div className="mx-auto grid max-w-[1320px] gap-12 px-5 sm:px-8 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <Eyebrow>Why TON matters</Eyebrow>
            <h2 className="mt-5 max-w-md text-3xl font-black leading-tight tracking-[-.045em] text-[#123f34] sm:text-5xl">
              More possibilities. A clearer way forward.
            </h2>
            <p className="mt-5 max-w-md leading-7 text-[#65766e]">
              Young people deserve to see what is possible, understand how to
              prepare, and move forward with confidence.
            </p>
            <div className="mt-7 inline-flex items-center gap-3 rounded-xl border border-[#123f34]/10 bg-white px-4 py-3 text-sm font-bold text-[#123f34] shadow-sm">
              <span className="text-xl text-[#b98419]">✳</span>
              Built around real next steps
            </div>
          </div>

          <div>
            {benefits.map((benefit) => (
              <article
                key={benefit.number}
                className="grid gap-3 border-t border-[#123f34]/15 py-7 sm:grid-cols-[52px_1fr] sm:gap-5 sm:py-8"
              >
                <span className="text-sm font-black text-[#b98419]">
                  {benefit.number}
                </span>
                <div>
                  <h3 className="text-xl font-bold text-[#123f34]">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 max-w-xl leading-7 text-[#65766e]">
                    {benefit.description}
                  </p>
                </div>
              </article>
            ))}
            <div className="border-t border-[#123f34]/15" />
          </div>
        </div>
      </section>

      {/* About / call to action */}
      <section id="about" className="bg-[#f8f4e9] px-5 py-16 sm:px-8 sm:py-20">
        <div className="relative mx-auto max-w-[1320px] overflow-hidden rounded-[2rem] bg-[#0b3028] px-6 py-14 text-center text-white sm:px-12 sm:py-20">
          <div aria-hidden="true" className="absolute -left-20 -top-24 h-64 w-64 rounded-full border border-white/10" />
          <div aria-hidden="true" className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full border border-[#e9b747]/20" />
          <div className="relative mx-auto max-w-3xl">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e9b747] text-xl text-[#123f34]">
              ↗
            </span>
            <p className="mt-7 text-xs font-bold uppercase tracking-[0.18em] text-[#e9b747]">
              Together, we rise
            </p>
            <h2 className="mt-4 text-3xl font-black leading-tight tracking-[-.04em] sm:text-5xl">
              Your next chapter starts with one opportunity.
            </h2>
            <p className="mx-auto mt-5 max-w-xl leading-7 text-white/70">
              Find the opportunity, resource or next step that can move your
              journey forward.
            </p>
            <Link
              href="/signup"
              className="mt-8 inline-flex items-center justify-center gap-3 rounded-full bg-[#e9b747] px-7 py-4 text-sm font-bold text-[#123f34] transition hover:-translate-y-0.5 hover:bg-[#f1c968]"
            >
              Join TON <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#172b26] text-white">
        <div className="mx-auto grid max-w-[1320px] gap-10 px-5 py-12 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <BrandMark light />
              <span>
                <span className="block text-lg font-extrabold">TON</span>
                <span className="block text-xs text-white/60">
                  Tose Opportunities Network
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/65">
              Helping young people discover opportunities to learn, work and grow.
            </p>
            <p className="mt-4 text-sm font-bold text-[#e9b747]">
              Together, We Rise.
            </p>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-white/45">
              Explore
            </h2>
            <div className="mt-5 flex flex-col items-start gap-3 text-sm text-white/75">
              <Link className="transition hover:text-[#e9b747]" href="/opportunities">Opportunities</Link>
              <a className="transition hover:text-[#e9b747]" href="#how-it-works">How it works</a>
              <a className="transition hover:text-[#e9b747]" href="#why-ton">Why TON</a>
            </div>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-white/45">
              Tose Opportunities Network
            </h2>
            <div className="mt-5 flex flex-col items-start gap-3 text-sm text-white/75">
              <a className="transition hover:text-[#e9b747]" href="#about">About TON</a>
              <Link className="transition hover:text-[#e9b747]" href="/login">Log in</Link>
              <Link className="transition hover:text-[#e9b747]" href="/signup">Get started</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-[1320px] flex-col gap-2 px-5 py-5 text-xs text-white/45 sm:px-8 md:flex-row md:items-center md:justify-between">
            <p>© 2026 Tose Opportunities Network.</p>
            <p>Designed for opportunity, access and progress.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
