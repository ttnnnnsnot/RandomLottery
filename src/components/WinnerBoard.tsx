import type { Winner } from '../hooks/useLotteryStore';
import { Trophy, Download } from 'lucide-react';

interface Props {
  winners: Winner[];
  exportWinnersCSV: () => void;
  clearWinners: () => void;
}

export function WinnerBoard({ winners, exportWinnersCSV, clearWinners }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col h-full bg-gradient-to-b from-orange-50/30 to-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-heading text-cta flex items-center gap-2">
          <Trophy className="w-6 h-6 text-cta" /> 中獎名單 ({winners.length})
        </h2>
        
        {winners.length > 0 && (
          <button
            onClick={exportWinnersCSV}
            className="flex items-center gap-1 text-sm font-medium px-3 py-1.5 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors cursor-pointer border border-orange-200"
            title="匯出中獎名單 (CSV)"
          >
            <Download className="w-4 h-4" /> 匯出
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto min-h-[200px] border border-orange-100 rounded-xl bg-orange-50/50 p-2 relative">
        {winners.length === 0 ? (
          <div className="h-full flex items-center justify-center text-orange-300 font-medium">
            還沒有幸運兒誕生！
          </div>
        ) : (
          <ul className="space-y-2">
            {winners.map((w, index) => (
              <li
                key={w.id}
                className="flex items-center justify-between bg-white px-4 py-3 rounded-lg shadow-sm border border-orange-100 transform transition-transform hover:scale-[1.02]"
              >
                <div className="flex items-center gap-3">
                  <div className={`
                    w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs
                    ${index === 0 ? 'bg-yellow-400 text-yellow-900 border border-yellow-500 shadow-sm' : 'bg-gray-100 text-gray-500'}
                  `}>
                    {winners.length - index}
                  </div>
                  <span className="font-bold text-lg text-gray-800">{w.name}</span>
                </div>
                <span className="text-xs text-gray-400 font-mono">
                  {new Date(w.drawnAt).toLocaleTimeString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {winners.length > 0 && (
        <button
          onClick={clearWinners}
          className="mt-4 text-sm text-gray-400 hover:text-red-500 hover:underline w-full text-center transition-colors cursor-pointer"
        >
          清空紀錄
        </button>
      )}
    </div>
  );
}
