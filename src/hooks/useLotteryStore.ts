import { useState, useEffect } from 'react';

export interface Participant {
  id: string;
  name: string;
}

export interface Winner extends Participant {
  drawnAt: number;
}

export function useLotteryStore() {
  const [participants, setParticipants] = useState<Participant[]>(() => {
    const saved = localStorage.getItem('lottery_participants');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [winners, setWinners] = useState<Winner[]>(() => {
    const saved = localStorage.getItem('lottery_winners');
    return saved ? JSON.parse(saved) : [];
  });

  const [allowRepeats, setAllowRepeats] = useState<boolean>(() => {
    const saved = localStorage.getItem('lottery_allowRepeats');
    return saved ? JSON.parse(saved) : false;
  });

  // 同步狀態至 localStorage
  useEffect(() => {
    localStorage.setItem('lottery_participants', JSON.stringify(participants));
  }, [participants]);

  useEffect(() => {
    localStorage.setItem('lottery_winners', JSON.stringify(winners));
  }, [winners]);

  useEffect(() => {
    localStorage.setItem('lottery_allowRepeats', JSON.stringify(allowRepeats));
  }, [allowRepeats]);

  const addParticipant = (name: string) => {
    if (!name.trim()) return false;
    // 使用 uuid 來確保即便姓名重複也可以個別刪除
    const newParticipant = { id: crypto.randomUUID(), name: name.trim() };
    setParticipants(prev => [...prev, newParticipant]);
    return true;
  };

  const removeParticipant = (id: string) => {
    setParticipants(prev => prev.filter(p => p.id !== id));
  };
  
  const clearParticipants = () => {
    if(confirm('確定要清空所有抽獎名單嗎？')) {
      setParticipants([]);
    }
  };
  
  const clearWinners = () => {
    if(confirm('確定要清空中獎紀錄嗎？')) {
      setWinners([]);
    }
  };

  const generateTestData = () => {
    const names = ['王大明', '李小華', '林依依', '張志明', '陳春嬌', '黃偉哲', '周文華', '吳珊珊', '徐太宇', '趙敏'];
    const newParticipants = names.map(name => ({ id: crypto.randomUUID(), name }));
    setParticipants(prev => [...prev, ...newParticipants]);
  };

  const importCSV = (csvContent: string) => {
    // 支援簡易換行或逗號分隔，去掉空白及空字串
    const names = csvContent.split(/\r?\n/).map(row => row.split(',')).flat().map(n => n.trim().replace(/^"|"$/g, '')).filter(Boolean);
    const newParticipants = names.map(name => ({ id: crypto.randomUUID(), name }));
    setParticipants(prev => [...prev, ...newParticipants]);
  };

  const exportWinnersCSV = () => {
    if (winners.length === 0) return;
    
    // 加上 BOM，確保 Excel 開啟不會亂碼
    let csvContent = "\uFEFF姓名,中獎時間\n";
    winners.forEach(w => {
        const date = new Date(w.drawnAt).toLocaleString();
        csvContent += `"${w.name}","${date}"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `中獎名單_${new Date().setSeconds(0)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 取得還可以被抽的名單
  const getAvailablePool = () => {
    if (allowRepeats) {
      return participants;
    }
    const winnerIds = new Set(winners.map(w => w.id));
    return participants.filter(p => !winnerIds.has(p.id));
  };

  const drawWinner = (): Winner | null => {
    const pool = getAvailablePool();
    if (pool.length === 0) return null;
    
    // 隨機選出一位
    const randomIndex = Math.floor(Math.random() * pool.length);
    const selected = pool[randomIndex];
    
    const winner: Winner = { ...selected, drawnAt: Date.now() };
    setWinners(prev => [winner, ...prev]);
    return winner;
  };

  return {
    participants,
    winners,
    allowRepeats,
    setAllowRepeats,
    addParticipant,
    removeParticipant,
    clearParticipants,
    clearWinners,
    generateTestData,
    importCSV,
    exportWinnersCSV,
    getAvailablePool,
    drawWinner
  };
}
