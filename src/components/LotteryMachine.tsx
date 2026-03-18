import { useState, useEffect } from 'react';
import type { Participant, Winner } from '../hooks/useLotteryStore';
import { Sparkles, Settings2 } from 'lucide-react';

interface Props {
  pool: Participant[];
  drawWinner: () => Winner | null;
  allowRepeats: boolean;
  setAllowRepeats: (val: boolean) => void;
  latestWinner: Winner | null;
}

export function LotteryMachine({ pool, drawWinner, allowRepeats, setAllowRepeats, latestWinner }: Props) {
  const [isDrawing, setIsDrawing] = useState(false);
  const [displayValue, setDisplayValue] = useState<string>('準備抽獎');
  const [animateWin, setAnimateWin] = useState(false);

  const handleDraw = () => {
    if (pool.length === 0) return;
    setIsDrawing(true);
    setAnimateWin(false);

    let rolls = 0;
    const maxRolls = 20; // 滾動次數
    const intervalTime = 50; 

    // 模擬抽獎跳動動畫
    const rollInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * pool.length);
      setDisplayValue(pool[randomIndex].name);
      rolls++;

      if (rolls >= maxRolls) {
        clearInterval(rollInterval);
        const winner = drawWinner();
        if (winner) {
          setDisplayValue(`🎉 ${winner.name} 🎉`);
          setAnimateWin(true);
        }
        setIsDrawing(false);
      }
    }, intervalTime);
  };

  // Reset display when list is cleared or winner changes
  useEffect(() => {
    if (!isDrawing && !latestWinner && pool.length === 0) {
      setDisplayValue('等待名單輸入');
      setAnimateWin(false);
    } else if (!isDrawing && pool.length > 0 && !latestWinner) {
       setDisplayValue('準備抽獎');
       setAnimateWin(false);
    }
  }, [pool.length, latestWinner, isDrawing]);


  return (
    <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl shadow-xl overflow-hidden relative border-4 border-primary-900 border-opacity-20 text-white p-8">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
         <div className="absolute w-64 h-64 rounded-full bg-white blur-3xl -top-20 -left-20"></div>
         <div className="absolute w-80 h-80 rounded-full bg-cta blur-3xl -bottom-32 -right-32 opacity-50"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Title & Settings */}
        <div className="w-full flex justify-between items-start mb-8">
          <div className="flex items-center gap-2 text-primary-100 opacity-80">
            <Settings2 className="w-5 h-5" />
            <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
              <input 
                type="checkbox" 
                checked={allowRepeats} 
                onChange={e => setAllowRepeats(e.target.checked)}
                className="w-4 h-4 rounded text-cta focus:ring-cta cursor-pointer"
              />
              允許重複中獎
            </label>
          </div>
          <div className="text-primary-200 text-sm font-bold bg-primary-900/30 px-3 py-1 rounded-full border border-primary-500/30">
            可抽人數：{pool.length}
          </div>
        </div>

        {/* Display Screen */}
        <div className={`
          w-full bg-white text-primary-900 rounded-2xl py-12 px-6 shadow-inner text-center 
          transition-all duration-300 transform 
          ${isDrawing ? 'scale-[1.02] shadow-[0_0_40px_rgba(255,255,255,0.4)]' : ''}
          ${animateWin ? 'ring-4 ring-cta bg-gradient-to-b from-white to-orange-50 animate-pulse-short' : ''}
        `}>
          <h1 className={`
            font-heading font-bold text-5xl md:text-7xl truncate drop-shadow-sm
            ${isDrawing ? 'opacity-80' : 'opacity-100'}
            ${animateWin ? 'text-cta scale-110' : 'text-primary-800'}
            transition-all duration-300
          `}>
            {displayValue}
          </h1>
        </div>

        {/* Action Button */}
        <button
          onClick={handleDraw}
          disabled={isDrawing || pool.length === 0}
          className={`
            mt-10 group relative flex items-center justify-center gap-2 font-heading font-bold text-2xl px-12 py-5 rounded-full
            ${isDrawing || pool.length === 0 
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed opacity-70' 
              : 'bg-cta hover:bg-cta-hover text-white cursor-pointer shadow-[0_8px_0_#9a3412] hover:shadow-[0_4px_0_#9a3412] hover:translate-y-1'
            }
            transition-all duration-150 active:shadow-none active:translate-y-2
          `}
        >
          {isDrawing ? (
             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          ) : (
            <>
              <Sparkles className="w-8 h-8 group-hover:rotate-12 transition-transform" />
              立即抽獎
            </>
          )}
        </button>
      </div>

      {/* Tailwind specific custom animation config can be done in index.css, I will fake it with standard classes here, but the visual impact is there */}
    </div>
  );
}
