import { motion } from 'framer-motion';
import { Cat, Sparkles, Palette, Zap, Crown, Check, User, Info, ChevronUp } from 'lucide-react';
import { useUserStore } from '../store/userStore';
import { useState } from 'react';

interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: React.ReactNode;
  color: string;
  owned: boolean;
}

// Profile picture shop items
const AVATAR_SHOP_ITEMS = [
  { id: 'avatar-1', image: '/images/profile pictures/1.png', name: 'Avatar 1', cost: 50 },
  { id: 'avatar-2', image: '/images/profile pictures/2.png', name: 'Avatar 2', cost: 50 },
  { id: 'avatar-3', image: '/images/profile pictures/3.png', name: 'Avatar 3', cost: 50 },
  { id: 'avatar-4', image: '/images/profile pictures/4.png', name: 'Avatar 4', cost: 50 },
  { id: 'avatar-5', image: '/images/profile pictures/5.png', name: 'Avatar 5', cost: 50 },
  { id: 'avatar-6', image: '/images/profile pictures/6.png', name: 'Avatar 6', cost: 100 },
  { id: 'avatar-7', image: '/images/profile pictures/7.png', name: 'Avatar 7', cost: 100 },
  { id: 'avatar-8', image: '/images/profile pictures/8.png', name: 'Avatar 8', cost: 150 },
  { id: 'avatar-9', image: '/images/profile pictures/9.png', name: 'Avatar 9', cost: 150 },
];

export default function Shop() {
  const { catFood, coins, spendCoins, purchaseAvatar, purchasedAvatars } = useUserStore();
  const [purchasedId, setPurchasedId] = useState<string | null>(null);
  const [showHowToEarn, setShowHowToEarn] = useState(false);

  // Demo items that users can buy with coins
  const [items, setItems] = useState<ShopItem[]>([
    {
      id: 'theme-dark',
      name: 'Dark Theme',
      description: 'Unlock dark mode for your app',
      price: 50,
      icon: <Palette className="w-6 h-6" />,
      color: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      owned: false,
    },
    {
      id: 'streak-freeze',
      name: 'Streak Freeze',
      description: 'Protect your streak for 1 day',
      price: 30,
      icon: <Zap className="w-6 h-6" />,
      color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      owned: false,
    },
    {
      id: 'xp-boost',
      name: '2x XP Boost',
      description: 'Double XP for 24 hours',
      price: 100,
      icon: <Sparkles className="w-6 h-6" />,
      color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      owned: false,
    },
    {
      id: 'premium-badge',
      name: 'Premium Badge',
      description: 'Show off your premium status',
      price: 200,
      icon: <Crown className="w-6 h-6" />,
      color: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      owned: false,
    },
  ]);

  const handlePurchase = (item: ShopItem) => {
    if (item.owned) return;
    
    const success = spendCoins(item.price);
    if (success) {
      setItems(items.map(i => i.id === item.id ? { ...i, owned: true } : i));
      setPurchasedId(item.id);
      setTimeout(() => setPurchasedId(null), 2000);
    } else {
      alert('Not enough coins! Complete lessons to earn more.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] px-4 py-6 pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h1 className="text-2xl font-bold text-white mb-2">Shop</h1>
        <p className="text-gray-400">Spend your coins on exclusive items!</p>
      </motion.div>

      {/* Balances */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-4 mb-8"
      >
        {/* Cat Food Balance */}
        <div className="flex-1 bg-[#1A1A1A] border border-white/10 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full flex items-center justify-center border border-amber-500/30">
            <Cat className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Cat Food</p>
            <p className="text-xl font-bold text-amber-400">{catFood}</p>
          </div>
        </div>

        {/* Coins Balance */}
        <div className="flex-1 bg-[#1A1A1A] border border-white/10 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-amber-500/20 rounded-full flex items-center justify-center border border-yellow-500/30">
            <img src="/images/coin.png" alt="Coins" className="w-6 h-6 object-contain" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Coins</p>
            <p className="text-xl font-bold text-yellow-400">{coins}</p>
          </div>
        </div>
      </motion.div>

      {/* How to Earn - Expandable */}
      <div className="mb-6">
        <button
          onClick={() => setShowHowToEarn(!showHowToEarn)}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <Info className="w-4 h-4" />
          <span>How to Earn</span>
          <motion.div
            animate={{ rotate: showHowToEarn ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronUp className="w-4 h-4" />
          </motion.div>
        </button>
        
        <motion.div
          initial={false}
          animate={{ 
            height: showHowToEarn ? 'auto' : 0,
            opacity: showHowToEarn ? 1 : 0
          }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-4 mt-2">
            <ul className="text-sm text-gray-300 space-y-1">
              <li>• Complete a lesson: +10 coins</li>
              <li>• Complete a module: +1 cat food & +50 coins</li>
              <li>• Daily streak: +5 coins per day</li>
              <li>• Perfect score: +20 bonus coins</li>
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Avatar Shop */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-amber-400" /> Profile Pictures
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {AVATAR_SHOP_ITEMS.map((avatar, index) => {
            const owned = purchasedAvatars.includes(avatar.image);
            const isNew = index >= 6; // Last 3 avatars are new
            return (
              <motion.div
                key={avatar.id}
                whileTap={owned ? {} : { scale: 0.95 }}
                className={`bg-[#1A1A1A] border rounded-2xl p-3 text-center transition-all relative ${
                  owned 
                    ? 'border-green-500/30 bg-green-500/10' 
                    : 'border-white/10 hover:border-amber-500/50'
                }`}
              >
                {/* NEW Badge */}
                {isNew && !owned && (
                  <div className="absolute -top-2 -right-1 bg-red-500 text-white text-[8px] font-bold px-2 py-0.5 rounded-full z-10">
                    NEW
                  </div>
                )}
                <div className="w-12 h-12 mx-auto mb-2 rounded-xl overflow-hidden bg-[#0A0A0A] border border-white/10">
                  <img src={avatar.image} alt={avatar.name} className="w-full h-full object-cover" />
                </div>
                <p className="text-xs font-medium text-gray-300 mb-2">{avatar.name}</p>
                <button
                  onClick={() => {
                    if (owned) return;
                    const success = purchaseAvatar(avatar.image, avatar.cost);
                    if (success) {
                      setPurchasedId(avatar.id);
                      setTimeout(() => setPurchasedId(null), 2000);
                    } else {
                      alert('Not enough coins! Complete lessons to earn more.');
                    }
                  }}
                  disabled={owned}
                  className={`w-full py-1.5 rounded-xl text-xs font-medium transition-colors ${
                    owned
                      ? 'bg-green-500/20 text-green-400 cursor-default'
                      : purchasedId === avatar.id
                      ? 'bg-green-500 text-white'
                      : 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {owned ? (
                    <span className="flex items-center justify-center gap-1">
                      <Check className="w-3 h-3" /> Owned
                    </span>
                  ) : purchasedId === avatar.id ? (
                    'Purchased!'
                  ) : (
                    <span className="flex items-center justify-center gap-1">
                      <img src="/images/coin.png" alt="" className="w-3 h-3 object-contain" /> {avatar.cost}
                    </span>
                  )}
                </button>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Shop Items */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-lg font-bold text-white mb-4">Items</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              whileTap={{ scale: 0.98 }}
              className={`bg-[#1A1A1A] border rounded-2xl p-4 transition-all relative ${
                item.owned 
                  ? 'border-green-500/30 bg-green-500/10' 
                  : 'border-white/10 hover:border-amber-500/50'
              }`}
            >
              {/* NEW Badge */}
              {index === 0 && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
                  NEW
                </div>
              )}
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${item.color}`}>
                  {item.owned ? <Check className="w-6 h-6 text-green-400" /> : item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white truncate">{item.name}</h3>
                  <p className="text-sm text-gray-400">{item.description}</p>
                </div>
              </div>
              
              <button
                onClick={() => handlePurchase(item)}
                disabled={item.owned}
                className={`w-full mt-4 py-2.5 rounded-xl font-medium transition-colors ${
                  item.owned
                    ? 'bg-green-500/20 text-green-400 cursor-default'
                    : purchasedId === item.id
                    ? 'bg-green-500 text-white'
                    : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:opacity-90 text-white shadow-lg'
                }`}
              >
                {item.owned ? (
                  <span className="flex items-center justify-center gap-2">
                    <Check className="w-4 h-4" /> Owned
                  </span>
                ) : purchasedId === item.id ? (
                  'Purchased!'
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <img src="/images/coin.png" alt="" className="w-4 h-4 object-contain" /> {item.price}
                  </span>
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
