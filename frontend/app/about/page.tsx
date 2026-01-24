export default function About() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-emerald-600">About LuminaStay</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Revolutionizing Moroccan Real Estate with AI
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Founded in 2024, our mission is to bring transparency, accuracy, and luxury to the property market in Morocco. We use advanced machine learning algorithms to analyze market trends and provide instant, accurate valuations.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl shadow-sm">
                    <img className="h-24 w-24 rounded-full object-cover mb-4" src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" alt="CEO" />
                    <h3 className="text-lg font-bold text-gray-900">Ahmed Benali</h3>
                    <p className="text-sm text-emerald-600">CEO & Founder</p>
                    <p className="mt-2 text-gray-600">Visionary leader with 15 years in PropTech.</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl shadow-sm">
                    <img className="h-24 w-24 rounded-full object-cover mb-4" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop" alt="CTO" />
                    <h3 className="text-lg font-bold text-gray-900">Layla Idrissi</h3>
                    <p className="text-sm text-emerald-600">Head of A.I.</p>
                    <p className="mt-2 text-gray-600">Machine Learning expert specializing in predictive models.</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl shadow-sm">
                    <img className="h-24 w-24 rounded-full object-cover mb-4" src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop" alt="COO" />
                    <h3 className="text-lg font-bold text-gray-900">Omar Tazi</h3>
                    <p className="text-sm text-emerald-600">Operations Director</p>
                    <p className="mt-2 text-gray-600">Ensuring seamless experiences for thousands of users.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
