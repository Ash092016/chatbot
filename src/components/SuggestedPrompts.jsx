import React from 'react';

export default function SuggestedPrompts({ prompts, onSelect }) {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-4">
      <p className="text-xs text-slate-400 uppercase tracking-widest mb-4 text-center font-medium">
        Popular Briefings
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {prompts.map((item, index) => (
          <button
            key={index}
            onClick={() => onSelect(item.prompt)}
            className="group glass rounded-xl p-4 text-left transition-all duration-300 
                       hover:border-teal-500/30 hover:bg-teal-500/5 hover:scale-[1.02] 
                       hover:shadow-lg hover:shadow-teal-500/5 cursor-pointer"
            style={{ animationDelay: `${index * 0.08}s` }}
          >
            <div className="flex items-start gap-3">
              <span className="text-xl flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200">
                {item.icon}
              </span>
              <div>
                <h3 className="text-sm font-semibold text-slate-100 group-hover:text-teal-400 transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {item.prompt}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
