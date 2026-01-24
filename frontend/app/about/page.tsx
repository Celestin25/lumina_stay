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
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
                <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl shadow-sm">
                    <img className="h-32 w-32 rounded-full object-cover mb-4 ring-4 ring-emerald-500" src="/celestin.png" alt="Celestin" />
                    <h3 className="text-lg font-bold text-gray-900">Celestin</h3>
                    <p className="text-sm text-emerald-600">CEO & Founder</p>
                    <p className="mt-2 text-gray-600">Visionary leader driving the future of PropTech.</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl shadow-sm">
                    <div className="h-24 w-24 rounded-full bg-emerald-100 flex items-center justify-center mb-4 text-emerald-600 font-bold text-xl">D</div>
                    <h3 className="text-lg font-bold text-gray-900">Desange</h3>
                    <p className="text-sm text-emerald-600">Head of A.I.</p>
                    <p className="mt-2 text-gray-600">Leading our machine learning innovations.</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl shadow-sm">
                     <div className="h-24 w-24 rounded-full bg-emerald-100 flex items-center justify-center mb-4 text-emerald-600 font-bold text-xl">R</div>
                    <h3 className="text-lg font-bold text-gray-900">Rim</h3>
                    <p className="text-sm text-emerald-600">Operations Director</p>
                    <p className="mt-2 text-gray-600">Ensuring seamless experiences for our users.</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl shadow-sm">
                     <div className="h-24 w-24 rounded-full bg-emerald-100 flex items-center justify-center mb-4 text-emerald-600 font-bold text-xl">M</div>
                    <h3 className="text-lg font-bold text-gray-900">Meriam</h3>
                    <p className="text-sm text-emerald-600">Chief Marketing Officer</p>
                    <p className="mt-2 text-gray-600">Connecting LuminaStay with the world.</p>
                </div>
                <div className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl shadow-sm">
                     <div className="h-24 w-24 rounded-full bg-emerald-100 flex items-center justify-center mb-4 text-emerald-600 font-bold text-xl">A</div>
                    <h3 className="text-lg font-bold text-gray-900">Atsu</h3>
                    <p className="text-sm text-emerald-600">Chief Technology Officer</p>
                    <p className="mt-2 text-gray-600">Architecting our scalable infrastructure.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
