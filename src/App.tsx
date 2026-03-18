import { useLotteryStore } from './hooks/useLotteryStore';
import { ParticipantManager } from './components/ParticipantManager';
import { WinnerBoard } from './components/WinnerBoard';
import { LotteryMachine } from './components/LotteryMachine';
import { Sparkles, Gift } from 'lucide-react';

function App() {
  const store = useLotteryStore();

  return (
    <div className="min-h-screen bg-bg-base font-body text-text-main pb-20">
      <header className="bg-white border-b border-primary-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-center gap-3">
          <Gift className="w-8 h-8 text-cta" />
          <h1 className="text-3xl font-heading text-primary-600 font-bold tracking-wide">
            歡樂尾牙抽獎系統
          </h1>
          <Sparkles className="w-8 h-8 text-yellow-500" />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Top Section: The drawing machine */}
        <section className="w-full max-w-4xl mx-auto">
          <LotteryMachine 
            pool={store.getAvailablePool()} 
            drawWinner={store.drawWinner} 
            allowRepeats={store.allowRepeats}
            setAllowRepeats={store.setAllowRepeats}
            latestWinner={store.winners[0] || null}
          />
        </section>

        {/* Bottom Section: Management */}
        <section className="grid md:grid-cols-2 gap-8 items-start">
          <ParticipantManager 
            participants={store.participants}
            addParticipant={store.addParticipant}
            removeParticipant={store.removeParticipant}
            clearParticipants={store.clearParticipants}
            generateTestData={store.generateTestData}
            importCSV={store.importCSV}
          />
          
          <WinnerBoard 
            winners={store.winners}
            exportWinnersCSV={store.exportWinnersCSV}
            clearWinners={store.clearWinners}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
