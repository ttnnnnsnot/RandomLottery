import { useRef, useState } from 'react';
import type { Participant } from '../hooks/useLotteryStore';
import { Trash2, Upload, Users, UserPlus } from 'lucide-react';

interface Props {
  participants: Participant[];
  addParticipant: (name: string) => boolean;
  removeParticipant: (id: string) => void;
  clearParticipants: () => void;
  generateTestData: () => void;
  importCSV: (content: string) => void;
}

export function ParticipantManager({
  participants,
  addParticipant,
  removeParticipant,
  clearParticipants,
  generateTestData,
  importCSV
}: Props) {
  const [nameInput, setNameInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (addParticipant(nameInput)) {
      setNameInput('');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        importCSV(text);
      }
      // Reset input block
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsText(file);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-heading text-primary-600 flex items-center gap-2">
          <Users className="w-6 h-6" /> 抽獎名單 ({participants.length})
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1 text-sm font-medium px-3 py-1.5 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors cursor-pointer"
            title="匯入 CSV 檔案"
          >
            <Upload className="w-4 h-4" /> 匯入
          </button>
          <input
            type="file"
            accept=".csv, .txt"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileUpload}
          />
          <button
            onClick={generateTestData}
            className="text-sm font-medium px-3 py-1.5 bg-secondary-50 text-secondary-600 rounded-lg hover:bg-secondary-100 transition-colors cursor-pointer border border-secondary-200"
          >
            +10 測試
          </button>
        </div>
      </div>

      <form onSubmit={handleAdd} className="flex gap-2 mb-6">
        <input
          type="text"
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          placeholder="輸入姓名..."
          className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
        />
        <button
          type="submit"
          disabled={!nameInput.trim()}
          className="bg-primary-500 text-white px-4 py-2 rounded-xl hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1 font-medium cursor-pointer"
        >
          <UserPlus className="w-4 h-4" /> 新增
        </button>
      </form>

      <div className="flex-1 overflow-y-auto min-h-[200px] border border-gray-100 rounded-xl bg-gray-50 p-2">
        {participants.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-400 font-medium">
            目前沒有參與者，請新增或匯入。
          </div>
        ) : (
          <ul className="space-y-1">
            {participants.map((p, index) => (
              <li
                key={p.id}
                className="flex items-center justify-between bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100 hover:border-primary-100 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 font-mono text-xs w-5 text-right">{index + 1}</span>
                  <span className="font-semibold text-gray-700">{p.name}</span>
                </div>
                <button
                  onClick={() => removeParticipant(p.id)}
                  className="text-gray-300 hover:text-red-500 transition-colors p-1 cursor-pointer opacity-0 group-hover:opacity-100"
                  title="刪除"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {participants.length > 0 && (
        <button
          onClick={clearParticipants}
          className="mt-4 text-sm text-red-500 font-medium hover:text-red-600 hover:underline w-full text-center transition-colors cursor-pointer"
        >
          清空所有名單
        </button>
      )}
    </div>
  );
}
