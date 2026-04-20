import React from "react";
import { ArrowRight, Phone, ShieldCheck, Sparkles, Clock3, MapPin, Star, Droplets, Home, Wind, Waves, ChevronRight, CheckCircle2 } from "lucide-react";

const services = [
  {
    title: "Roof Soft Wash",
    desc: "Safe soft washing to remove moss, algae, and black streaks while protecting your roof.",
    icon: ShieldCheck,
  },
  {
    title: "Gutter Cleaning",
    desc: "Remove leaves and debris before overflow causes fascia, siding, or foundation issues.",
    icon: Droplets,
  },
  {
    title: "House Washing",
    desc: "Wash away dirt, algae, and buildup from siding, trim, soffits, and entry areas.",
    icon: Home,
  },
  {
    title: "Pressure Washing",
    desc: "Restore driveways, patios, walkways, stairs, and concrete surfaces with high-impact cleaning.",
    icon: Waves,
  },
  {
    title: "Window Cleaning",
    desc: "Brighten the whole property with streak-free exterior window cleaning.",
    icon: Sparkles,
  },
  {
    title: "Exterior Maintenance Plans",
    desc: "Seasonal maintenance plans for homeowners, strata, and repeat exterior care.",
    icon: Wind,
  },
];

const stats = [
  { value: "24hr", label: "Fast quote response" },
  { value: "5★", label: "Top-rated local service" },
  { value: "Lower Mainland", label: "Local coverage area" },
  { value: "100%", label: "Satisfaction focused" },
];

const quickActions = [
  "Get a Free Quote",
  "See Service Areas",
  "Book Gutter Cleaning",
  "Request Roof Wash",
];

const coverage = [
  "Vancouver",
  "Burnaby",
  "Richmond",
  "Surrey",
  "Langley",
  "Coquitlam",
  "New Westminster",
  "North Vancouver",
];

function Button({ children, className = "" }) {
  return (
    <button className={`inline-flex items-center justify-center rounded-2xl px-5 py-3 font-medium transition ${className}`}>
      {children}
    </button>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-3xl border border-white/10 ${className}`}>
      {children}
    </div>
  );
}

function Input({ placeholder, className = "" }) {
  return (
    <input
      placeholder={placeholder}
      className={`w-full rounded-2xl border border-white/10 px-4 py-3 outline-none ${className}`}
    />
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.18),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.16),transparent_24%),linear-gradient(to_bottom,#0a0a0a,#111111,#0a0a0a)]" />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-400/30 bg-white/5 shadow-[0_0_30px_rgba(251,191,36,0.12)]">
              <Sparkles className="h-5 w-5 text-amber-300" />
            </div>
            <div>
              <p className="text-lg font-semibold tracking-wide">Keystoners Exterior Cleaning</p>
              <p className="text-xs text-white/60">Exterior Cleaning Across the Lower Mainland</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-white/80 md:flex">
            <a href="#services" className="transition hover:text-white">Services</a>
            <a href="#why-us" className="transition hover:text-white">Why Us</a>
            <a href="#coverage" className="transition hover:text-white">Service Area</a>
            <a href="#reviews" className="transition hover:text-white">Reviews</a>
            <a href="#contact" className="transition hover:text-white">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            <Button className="hidden border border-white/15 bg-white/5 text-white hover:bg-white/10 md:inline-flex">
              <Phone className="mr-2 h-4 w-4" />
              Call +1 250-317-1366
            </Button>
            <Button className="bg-amber-400 text-black hover:bg-amber-300">
              Get Free Quote
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-28">
            <div className="flex flex-col justify-center">
              <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-sm text-amber-200">
                <Star className="h-4 w-4" />
                Trusted exterior cleaning for Lower Mainland homeowners
              </div>

              <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
                Protect your home and make it
                <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-200 bg-clip-text text-transparent"> look spotless again</span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-white/70 md:text-lg">
                Keystoners Exterior Cleaning helps homeowners across the Lower Mainland with roof moss removal, gutter cleaning, house washing, pressure washing, and window cleaning. Fast quotes, reliable scheduling, and clean results without the hassle.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button className="bg-amber-400 px-7 text-black hover:bg-amber-300">
                  Get My Free Quote Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button className="border border-white/15 bg-white/5 text-white hover:bg-white/10">
                  See All Services
                </Button>
              </div>

              <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur-md">
                <div className="flex flex-col gap-3 md:flex-row">
                  <Input
                    placeholder="What do you need help with? Roof moss removal, gutter cleaning, siding wash..."
                    className="bg-black/20 text-white placeholder:text-white/35"
                  />
                  <Button className="bg-white text-black hover:bg-white/90">Search Services</Button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {quickActions.map((item) => (
                    <button
                      key={item}
                      className="rounded-full border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/75 transition hover:border-amber-300/30 hover:text-white"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-4">
                {stats.map((stat) => (
                  <Card key={stat.label} className="bg-white/5 text-white shadow-xl backdrop-blur-sm">
                    <div className="p-5">
                      <p className="text-2xl font-semibold text-amber-300">{stat.value}</p>
                      <p className="mt-1 text-sm text-white/60">{stat.label}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-sm">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
                    alt="Modern clean home exterior"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  <Card className="absolute bottom-4 left-4 right-4 bg-neutral-950/70 text-white backdrop-blur-lg">
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm text-white/60">Most requested service combo</p>
                          <p className="mt-1 text-xl font-semibold">Roof Moss Removal + Gutter Cleaning</p>
                        </div>
                        <div className="rounded-2xl bg-amber-400 px-3 py-1.5 text-sm font-medium text-black">
                          Popular
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-white/75">
                        <div className="rounded-2xl bg-white/5 p-3">Protects roof and drainage</div>
                        <div className="rounded-2xl bg-white/5 p-3">Helps prevent costly buildup</div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              <div className="absolute -left-5 top-8 hidden rounded-3xl border border-white/10 bg-white/10 p-4 shadow-xl backdrop-blur-md md:block">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-emerald-400/20 p-2 text-emerald-300">
                    <Clock3 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Average response time</p>
                    <p className="font-medium text-white">Same day to 24 hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:px-8 lg:py-20">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-amber-300">Core Services</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                Exterior cleaning services homeowners actually need
              </h2>
            </div>
            <p className="max-w-2xl text-white/65">
              Built to help homeowners choose the right service fast, understand the benefit, and request a quote without digging through clutter.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Card
                  key={service.title}
                  className="group bg-white/5 text-white transition duration-300 hover:-translate-y-1 hover:border-amber-300/30 hover:bg-white/[0.07]"
                >
                  <div className="p-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-black/20 text-amber-300">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold">{service.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/65">{service.desc}</p>
                    <div className="mt-6 flex items-center text-sm font-medium text-amber-300">
                      Learn more
                      <ChevronRight className="ml-1 h-4 w-4 transition group-hover:translate-x-1" />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        <section id="why-us" className="border-y border-white/10 bg-white/[0.03]">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-20">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-amber-300">Why Keystoners</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                Professional service. Clear process. Better first impression.
              </h2>
              <p className="mt-4 max-w-xl text-white/65">
                Keystoners is positioned as a premium but approachable exterior cleaning brand. Homeowners immediately see the services, trust factors, areas served, and how to request a quote.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                "Free quote CTA visible immediately",
                "Mobile-first design for local leads",
                "Services explained in seconds",
                "Trust signals and social proof",
                "Premium look without clutter",
                "Built for Google Ads and SEO",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-3xl border border-white/10 bg-black/20 p-5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-amber-300" />
                  <p className="text-white/80">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="coverage" className="mx-auto max-w-7xl px-4 py-14 md:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
            <Card className="bg-white/5 text-white">
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-amber-300/10 p-3 text-amber-300">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Service Area</p>
                    <h3 className="text-2xl font-semibold">Serving Vancouver & Lower Mainland</h3>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {coverage.map((city) => (
                    <div key={city} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80">
                      {city}
                    </div>
                  ))}
                </div>
                <Button className="mt-6 bg-white text-black hover:bg-white/90">Check My Area</Button>
              </div>
            </Card>

            <Card id="reviews" className="bg-[linear-gradient(180deg,rgba(251,191,36,0.08),rgba(255,255,255,0.03))] text-white">
              <div className="p-6 md:p-8">
                <p className="text-sm uppercase tracking-[0.18em] text-amber-300">Real Customer Reviews</p>
                <h3 className="mt-3 text-2xl font-semibold">Why Vancouver homeowners choose Keystoners</h3>
                <div className="mt-6 space-y-4">
                  {[
                    "Absolutely amazing service in Vancouver. Gutters were completely cleared and the house looks fresh again. Highly recommend.",
                    "Quick response, on time, and the house wash made a massive difference. Looks like a new home.",
                    "Honest advice, no upselling, and very clean work. Super professional team.",
                  ].map((quote, i) => (
                    <div key={i} className="rounded-3xl border border-white/10 bg-black/20 p-5 text-white/80">
                      <div className="mb-3 flex text-amber-300">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star key={idx} className="mr-1 h-4 w-4 fill-current" />
                        ))}
                      </div>
                      <p className="leading-6">“{quote}”</p>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-7xl px-4 pb-16 md:px-6 lg:px-8 lg:pb-24">
          <Card className="overflow-hidden bg-white/5 text-white">
            <div className="grid gap-8 p-6 md:p-8 lg:grid-cols-[1fr_0.9fr] lg:p-10">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-amber-300">Ready to clean up your exterior?</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                  Request your free quote from Keystoners
                </h2>
                <p className="mt-4 max-w-xl text-white/65">
                  Tell us what you need and where you’re located. We’ll help you choose the right service and get you a quote fast.
                </p>
              </div>

              <div className="space-y-3 rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
                <Input placeholder="Full Name" className="bg-white/5 text-white placeholder:text-white/35" />
                <Input placeholder="Phone Number" className="bg-white/5 text-white placeholder:text-white/35" />
                <Input placeholder="Service Needed (Roof, Gutters, Pressure Wash etc.)" className="bg-white/5 text-white placeholder:text-white/35" />
                <Input placeholder="City (Vancouver, Surrey etc.)" className="bg-white/5 text-white placeholder:text-white/35" />
                <Button className="w-full bg-amber-400 text-black hover:bg-amber-300">
                  Get My Free Quote Now
                </Button>
              </div>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}