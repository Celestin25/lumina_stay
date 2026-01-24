
import Link from "next/link";
import PropertyMap from "@/components/Map";
import { ArrowRightIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden pt-14">
        <img
          src="https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=2600&auto=format&fit=crop"
          alt="Morocco Architecture"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-80"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-900/60 to-slate-900/90" />

        <div className="mx-auto max-w-7xl px-6 py-32 sm:py-48 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-7xl font-sans">
              Discover the Soul of <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Morocco</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Experience luxury living with our AI-powered real estate platform. Find the perfect Riad, Villa, or Apartment with precise price predictions and premium data analytics.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/dashboard"
                className="rounded-full bg-emerald-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-all transform hover:scale-105"
              >
                Start Your Journey
              </Link>
              <Link href="/about" className="text-sm font-semibold leading-6 text-white hover:text-emerald-400 flex items-center gap-2">
                Learn more <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12 sm:py-16 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
            {[
                { id: 1, name: 'Verified Properties', value: '2,500+' },
                { id: 2, name: 'AI Price Accuracy', value: '98%' },
                { id: 3, name: 'Happy Residents', value: '15k+' },
            ].map((stat) => (
                <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-base leading-7 text-gray-600">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                    {stat.value}
                </dd>
                </div>
            ))}
            </dl>
        </div>
      </div>

      {/* Map Section */}
      <div className="overflow-hidden bg-slate-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center">
            <div className="lg:pr-8 lg:pt-4">
              <div className="lg:max-w-lg">
                <h2 className="text-base font-semibold leading-7 text-emerald-600">Explore Locations</h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Find your home across the Kingdom</p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  From the bustling streets of Casablanca to the serene Riads of Marrakech, browse available properties directly on our interactive map.
                </p>
                <div className="mt-8">
                    <Link href="/predict" className="text-emerald-600 font-semibold hover:text-emerald-500">
                        Try AI Price Prediction &rarr;
                    </Link>
                </div>
              </div>
            </div>
            <div className="w-full">
                <PropertyMap />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-slate-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-emerald-400">Deploy Faster</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Everything you need to find a home
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              We combine traditional real estate with cutting-edge AI to give you the most accurate price estimates and seamless booking experience.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3">
              {[
                {
                  name: 'AI-Powered Predictions',
                  description:
                    'Our proprietary ML model analyzes thousands of data points to predict fair market prices for any property in Morocco.',
                  icon: CheckCircleIcon,
                },
                {
                  name: 'Secure Payments',
                  description:
                    'Integrated payment gateways ensure your deposits and rent payments are safe, traceable, and secure.',
                  icon: CheckCircleIcon,
                },
                {
                  name: 'Verified Listings',
                  description:
                    'Every listing is verified by our team to ensure it exists and matches the description. No more scams.',
                  icon: CheckCircleIcon,
                },
              ].map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-white">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500">
                      <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-400">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
