export default function Loading() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-12 animate-pulse">
      <div className="w-12 h-12 bg-slate-200 rounded-full mb-6"></div>
      
      <div className="h-10 bg-slate-200 w-1/3 rounded-md mb-4 bg-gradient-to-r from-slate-200 to-slate-100"></div>
      <div className="h-6 bg-slate-200 w-1/2 rounded-md mb-10"></div>
      
      {/* Insight Box Skeleton */}
      <div className="h-24 bg-teal-50/50 border border-teal-50 rounded-xl mb-12"></div>
      
      {/* Recommendation Header Skeleton */}
      <div className="h-8 bg-slate-200 w-1/4 rounded-md mb-6"></div>
      <div className="flex gap-4 overflow-hidden mb-12">
        <div className="min-w-[280px] h-48 bg-slate-100 rounded-xl"></div>
        <div className="min-w-[280px] h-48 bg-slate-100 rounded-xl"></div>
        <div className="min-w-[280px] h-48 bg-slate-100 rounded-xl"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-80 bg-slate-100 rounded-xl border border-slate-50 flex flex-col">
            <div className="h-48 bg-slate-200 w-full mb-4"></div>
            <div className="px-4 pb-4">
              <div className="h-4 bg-slate-200 w-full rounded mb-2"></div>
              <div className="h-4 bg-slate-200 w-2/3 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
