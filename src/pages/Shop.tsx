import { motion, AnimatePresence } from 'framer-motion';
import { Cat, Sparkles, Palette, Zap, Crown, Check, User, Info, ChevronUp, PartyPopper } from 'lucide-react';
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
  const [purchaseAnimation, setPurchaseAnimation] = useState<{ id: string; name: string } | null>(null);
  const [showHowToEarn, setShowHowToEarn] = useState(false);

  // Demo items that users can buy with coins
  const [items, setItems] = useState<ShopItem[]>([
    {
      id: 'theme-dark',
      name: 'Dark Theme',
      description: 'Unlock dark mode for your app',
      price: 50,
      icon: <Palette className="w-6 h-6" />,
      color: 'bg-purple-100 text-purple-600 border-purple-200',
      owned: false,
    },
    {
      id: 'streak-freeze',
      name: 'Streak Freeze',
      description: 'Protect your streak for 1 day',
      price: 30,
      icon: <Zap className="w-6 h-6" />,
      color: 'bg-blue-100 text-blue-600 border-blue-200',
      owned: false,
    },
    {
      id: 'xp-boost',
      name: '2x XP Boost',
      description: 'Double XP for 24 hours',
      price: 100,
      icon: <Sparkles className="w-6 h-6" />,
      color: 'bg-yellow-100 text-yellow-600 border-yellow-200',
      owned: false,
    },
    {
      id: 'premium-badge',
      name: 'Premium Badge',
      description: 'Show off your premium status',
      price: 200,
      icon: <Crown className="w-6 h-6" />,
      color: 'bg-amber-100 text-amber-600 border-amber-200',
      owned: false,
    },
  ]);

  const handlePurchase = (item: ShopItem) => {
    if (item.owned) return false;
    
    const success = spendCoins(item.price);
    if (success) {
      setItems(items.map(i => i.id === item.id ? { ...i, owned: true } : i));
      setPurchasedId(item.id);
      setTimeout(() => {
        setPurchasedId(null);
        setPurchaseAnimation(null);
      }, 2000);
      return true;
    } else {
      alert('Not enough coins! Complete lessons to earn more.');
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 py-6 pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Shop</h1>
        <p className="text-gray-500">Spend your coins on exclusive items!</p>
      </motion.div>

      {/* Balances */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-4 mb-8"
      >
        {/* Cat Food Balance */}
        <div className="flex-1 bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-3 shadow-sm">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center border border-amber-200">
            <Cat className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Cat Food</p>
            <p className="text-xl font-bold text-amber-600">{catFood}</p>
          </div>
        </div>

        {/* Coins Balance */}
        <div className="flex-1 bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-3 shadow-sm">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-full flex items-center justify-center border border-yellow-200">
            <img src="/images/coin.png" alt="Coins" className="w-6 h-6 object-contain" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Coins</p>
            <p className="text-xl font-bold text-yellow-600">{coins}</p>
          </div>
        </div>
      </motion.div>

      {/* How to Earn - Expandable */}
      <div className="mb-6">
        <button
          onClick={() => setShowHowToEarn(!showHowToEarn)}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
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
          <div className="bg-white border border-gray-200 rounded-2xl p-4 mt-2 shadow-sm">
            <ul className="text-sm text-gray-600 space-y-1">
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
        <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-amber-600" /> Profile Pictures
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {AVATAR_SHOP_ITEMS.map((avatar) => {
            const owned = purchasedAvatars.includes(avatar.image);
            return (
              <motion.div
                key={avatar.id}
                whileTap={owned ? {} : { scale: 0.95 }}
                className={`bg-white border rounded-xl p-2 text-center transition-all flex flex-col items-center gap-1 ${
                  owned 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-black/20 hover:border-amber-300'
                }`}
                style={{ width: '132px' }}
              >
                <div className="w-[116px] h-[116px] rounded-xl overflow-hidden bg-gray-100">
                  <img src={avatar.image} alt={avatar.name} className="w-full h-full object-cover" />
                </div>
                <p className="text-xs font-bold text-black w-[116px] text-center leading-4 h-4">{avatar.name}</p>
                <motion.button
                  onClick={() => {
                    if (owned) return;
                    const success = purchaseAvatar(avatar.image, avatar.cost);
                    if (success) {
                      setPurchaseAnimation({ id: avatar.id, name: avatar.name });
                      setPurchasedId(avatar.id);
                      setTimeout(() => {
                        setPurchasedId(null);
                        setPurchaseAnimation(null);
                      }, 2000);
                    } else {
                      alert('Not enough coins! Complete lessons to earn more.');
                    }
                  }}
                  disabled={owned}
                  whileTap={owned ? {} : { scale: 0.95 }}
                  className={`w-[116px] h-[35px] rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2 px-4 py-1 ${
                    owned
                      ? 'bg-green-100 text-green-700 cursor-default border border-green-200'
                      : purchasedId === avatar.id
                      ? 'bg-green-500 text-white border border-green-500'
                      : 'bg-white border border-[rgba(250,169,64,0.32)] text-black hover:border-amber-400'
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {owned ? (
                      <motion.span 
                        key="owned"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center justify-center gap-1"
                      >
                        <Check className="w-4 h-4" /> Owned
                      </motion.span>
                    ) : purchasedId === avatar.id ? (
                      <motion.span
                        key="purchased"
                        initial={{ opacity: 0, scale: 0.5, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                        className="flex items-center justify-center gap-1"
                      >
                        <PartyPopper className="w-4 h-4" /> Purchased!
                      </motion.span>
                    ) : (
                      <motion.span
                        key="buy"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center gap-2"
                      >
                        <img src="/images/coin.png" alt="" className="w-[27px] h-[27px] object-contain" /> 
                        <span className="text-xs font-bold text-black">{avatar.cost}</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Global Purchase Success Animation */}
      <AnimatePresence>
        {purchaseAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center"
          >
            {/* Background blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            />
            
            {/* Success Card */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -50 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="relative bg-white rounded-3xl p-8 shadow-2xl border border-gray-200 mx-4"
            >
              {/* Sparkles */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="absolute -top-4 -right-4 w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center"
              >
                <Sparkles className="w-6 h-6 text-white" />
              </motion.div>
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 500 }}
                className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
              >
                <Check className="w-10 h-10 text-white" strokeWidth={3} />
              </motion.div>
              
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl font-bold text-gray-900 text-center mb-2"
              >
                Purchase Successful!
              </motion.h3>
              
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-500 text-center"
              >
                You got {purchaseAnimation.name}
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shop Items */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-lg font-bold text-gray-900 mb-4">Items</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item) => (
            <motion.div
              key={item.id}
              whileTap={{ scale: 0.98 }}
              className={`bg-white border rounded-2xl p-4 transition-all shadow-sm ${
                item.owned 
                  ? 'border-green-200 bg-green-50' 
                  : 'border-gray-200 hover:border-amber-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${item.color}`}>
                  {item.owned ? <Check className="w-6 h-6 text-green-600" /> : item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 truncate">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              </div>
              
              <motion.button
                onClick={() => {
                  const success = handlePurchase(item);
                  if (success) {
                    setPurchaseAnimation({ id: item.id, name: item.name });
                  }
                }}
                disabled={item.owned}
                whileTap={item.owned ? {} : { scale: 0.95 }}
                className={`w-full mt-4 py-2.5 rounded-xl font-medium transition-colors ${
                  item.owned
                    ? 'bg-green-100 text-green-700 cursor-default'
                    : purchasedId === item.id
                    ? 'bg-green-500 text-white'
                    : 'bg-gradient-to-r from-amber-400 to-orange-500 hover:opacity-90 text-white shadow-lg'
                }`}
              >
                <AnimatePresence mode="wait">
                  {item.owned ? (
                    <motion.span 
                      key="owned"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <Check className="w-4 h-4" /> Owned
                    </motion.span>
                  ) : purchasedId === item.id ? (
                    <motion.span
                      key="purchased"
                      initial={{ opacity: 0, scale: 0.5, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <PartyPopper className="w-4 h-4" /> Purchased!
                    </motion.span>
                  ) : (
                    <motion.span
                      key="buy"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <img src="/images/coin.png" alt="" className="w-4 h-4 object-contain" /> {item.price}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
