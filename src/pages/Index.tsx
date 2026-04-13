import { useState } from "react";
import Icon from "@/components/ui/icon";

type AuthScreen = "welcome" | "login" | "register" | "verify";
type Tab = "chats" | "groups" | "contacts" | "media" | "notifications" | "search" | "profile" | "settings";

const CHATS = [
  { id: 1, name: "Алекс Громов", msg: "Окей, встретимся в 7 вечера 🔥", time: "14:32", unread: 3, online: true, encrypted: true, avatar: "АГ", color: "from-purple-500 to-pink-500" },
  { id: 2, name: "Маша Звёздная", msg: "Стикер отправлен 🎭", time: "13:15", unread: 0, online: true, encrypted: true, avatar: "МЗ", color: "from-cyan-500 to-blue-500" },
  { id: 3, name: "Дима Ракета 🚀", msg: "Пересылаю файл через 5 мин", time: "12:00", unread: 1, online: false, encrypted: false, avatar: "ДР", color: "from-green-500 to-teal-500" },
  { id: 4, name: "Катя Нова", msg: "Видела твой статус — огонь!", time: "11:30", unread: 7, online: true, encrypted: true, avatar: "КН", color: "from-orange-500 to-red-500" },
  { id: 5, name: "Игорь Степанов", msg: "Когда удалятся сообщения? ⏳", time: "10:00", unread: 0, online: false, encrypted: true, avatar: "ИС", color: "from-violet-500 to-purple-500" },
];

const GROUPS = [
  { id: 1, name: "🚀 Команда Orbital", members: 12, msg: "Лена: деплой готов!", time: "14:50", unread: 5, avatar: "ОГ", color: "from-purple-600 to-cyan-500" },
  { id: 2, name: "🎮 Geek Squad", members: 8, msg: "Вова: кто в онлайне?", time: "13:00", unread: 0, avatar: "ГС", color: "from-pink-500 to-purple-500" },
  { id: 3, name: "🏋️ Фитнес-клуб", members: 25, msg: "Тренировка в 18:00", time: "09:00", unread: 2, avatar: "ФК", color: "from-green-500 to-cyan-500" },
];

const CONTACTS = [
  { id: 1, name: "Алекс Громов", status: "В пути 🚗", online: true, avatar: "АГ", color: "from-purple-500 to-pink-500" },
  { id: 2, name: "Маша Звёздная", status: "Слушаю музыку 🎵", online: true, avatar: "МЗ", color: "from-cyan-500 to-blue-500" },
  { id: 3, name: "Катя Нова", status: "Занята 🔴", online: true, avatar: "КН", color: "from-orange-500 to-red-500" },
  { id: 4, name: "Дима Ракета", status: "Был в сети час назад", online: false, avatar: "ДР", color: "from-green-500 to-teal-500" },
  { id: 5, name: "Игорь Степанов", status: "Смотрю сериал 📺", online: false, avatar: "ИС", color: "from-violet-500 to-purple-500" },
  { id: 6, name: "Соня Пилот", status: "На конференции ✈️", online: true, avatar: "СП", color: "from-yellow-500 to-orange-500" },
];

const NOTIFICATIONS = [
  { id: 1, icon: "MessageCircle", color: "text-purple-400", bg: "bg-purple-500/15", title: "Новое сообщение", desc: "Алекс: «Окей, встретимся в 7!»", time: "2 мин" },
  { id: 2, icon: "Users", color: "text-cyan-400", bg: "bg-cyan-500/15", title: "Группа Orbital", desc: "Лена добавила 3 участника", time: "10 мин" },
  { id: 3, icon: "Shield", color: "text-green-400", bg: "bg-green-500/15", title: "Шифрование активно", desc: "Чат с Машей защищён E2E", time: "1 ч" },
  { id: 4, icon: "Clock", color: "text-orange-400", bg: "bg-orange-500/15", title: "Сообщение удалено", desc: "Авто-удаление: чат с Димой", time: "2 ч" },
  { id: 5, icon: "Star", color: "text-pink-400", bg: "bg-pink-500/15", title: "Новый статус", desc: "Катя обновила статус", time: "3 ч" },
];

const MEDIA_ITEMS = [
  { id: 1, type: "photo", from: "Маша З.", emoji: "🌅", color: "from-pink-500 to-purple-600" },
  { id: 2, type: "video", from: "Алекс Г.", emoji: "🎬", color: "from-blue-500 to-cyan-500" },
  { id: 3, type: "photo", from: "Катя Н.", emoji: "🌿", color: "from-green-500 to-teal-500" },
  { id: 4, type: "photo", from: "Дима Р.", emoji: "🚀", color: "from-violet-500 to-pink-500" },
  { id: 5, type: "video", from: "Игорь С.", emoji: "⚡", color: "from-yellow-500 to-orange-500" },
  { id: 6, type: "photo", from: "Соня П.", emoji: "✈️", color: "from-cyan-500 to-blue-600" },
];

const STICKERS = ["🔥", "🚀", "💜", "⚡", "🌊", "🎭", "💫", "🦋", "🌙", "❄️", "🎯", "💎"];

const STATUSES = [
  { name: "Ты", avatar: "ТЫ", color: "from-purple-500 to-pink-500", isMe: true },
  { name: "Алекс", avatar: "АГ", color: "from-purple-500 to-pink-500", emoji: "🚗" },
  { name: "Маша", avatar: "МЗ", color: "from-cyan-500 to-blue-500", emoji: "🎵" },
  { name: "Катя", avatar: "КН", color: "from-orange-500 to-red-500", emoji: "🌅" },
  { name: "Соня", avatar: "СП", color: "from-yellow-500 to-orange-500", emoji: "✈️" },
];

const MESSAGES = [
  { id: 1, out: false, text: "Привет! Как дела? 👋", time: "14:20", encrypted: true },
  { id: 2, out: true, text: "Отлично! Работаю над новым проектом 🚀", time: "14:21", encrypted: true },
  { id: 3, out: false, text: "Классно! Покажешь потом?", time: "14:22", encrypted: true },
  { id: 4, out: true, text: "Конечно! Встретимся в 7 вечера?", time: "14:25", encrypted: true },
  { id: 5, out: false, sticker: "🔥", time: "14:26", encrypted: true },
  { id: 6, out: false, text: "Окей, встретимся в 7 вечера 🔥", time: "14:32", encrypted: true },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("chats");
  const [openChat, setOpenChat] = useState<typeof CHATS[0] | null>(null);
  const [msgText, setMsgText] = useState("");
  const [showStickers, setShowStickers] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [autoDelete, setAutoDelete] = useState(false);
  const [encryptEnabled, setEncryptEnabled] = useState(true);
  const [notifEnabled, setNotifEnabled] = useState(true);

  // Auth state
  const [authScreen, setAuthScreen] = useState<AuthScreen>("welcome");
  const [isAuthed, setIsAuthed] = useState(false);
  const [authForm, setAuthForm] = useState({ name: "", username: "", phone: "", password: "", code: "" });
  const [authError, setAuthError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const navItems: { id: Tab; icon: string; label: string; badge?: number }[] = [
    { id: "chats", icon: "MessageCircle", label: "Чаты", badge: CHATS.reduce((a, c) => a + c.unread, 0) },
    { id: "groups", icon: "Users", label: "Группы", badge: GROUPS.reduce((a, g) => a + g.unread, 0) },
    { id: "contacts", icon: "Contact", label: "Контакты" },
    { id: "media", icon: "Image", label: "Медиа" },
    { id: "notifications", icon: "Bell", label: "Звонки", badge: NOTIFICATIONS.length },
    { id: "search", icon: "Search", label: "Поиск" },
    { id: "profile", icon: "User", label: "Профиль" },
    { id: "settings", icon: "Settings", label: "Настройки" },
  ];

  const allItems = [
    ...CHATS.map(c => ({ ...c, type: "chat" })),
    ...GROUPS.map(g => ({ ...g, type: "group" })),
    ...CONTACTS.map(c => ({ ...c, type: "contact" })),
  ].filter(i => searchQuery && i.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleLogin = () => {
    if (!authForm.phone || !authForm.password) { setAuthError("Заполни все поля"); return; }
    setAuthError("");
    setIsAuthed(true);
  };

  const handleRegister = () => {
    if (!authForm.name || !authForm.phone || !authForm.password) { setAuthError("Заполни все поля"); return; }
    setAuthError("");
    setAuthScreen("verify");
  };

  const handleVerify = () => {
    if (authForm.code.length < 4) { setAuthError("Введи код из SMS"); return; }
    setAuthError("");
    setIsAuthed(true);
  };

  if (!isAuthed) return (
    <div className="h-screen w-screen flex bg-mesh overflow-hidden font-golos">
      {/* Floating orbs */}
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm animate-fade-in">

          {/* Welcome */}
          {authScreen === "welcome" && (
            <div className="flex flex-col items-center text-center gap-6">
              <div className="relative animate-float">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center glow-purple">
                  <span className="text-white font-montserrat font-black text-4xl">S</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
                  <Icon name="Lock" size={14} className="text-white" />
                </div>
              </div>

              <div>
                <h1 className="text-4xl font-black font-montserrat gradient-text mb-2">Surivitna</h1>
                <p className="text-white/50 text-sm leading-relaxed">Защищённый мессенджер с шифрованием<br/>E2E для всех твоих переписок</p>
              </div>

              <div className="flex flex-col gap-3 w-full mt-2">
                {[
                  { icon: "Lock", color: "text-green-400", bg: "bg-green-500/10", text: "Сквозное шифрование E2E" },
                  { icon: "Clock", color: "text-orange-400", bg: "bg-orange-500/10", text: "Авто-удаление сообщений" },
                  { icon: "Smile", color: "text-yellow-400", bg: "bg-yellow-500/10", text: "Стикеры и статусы" },
                ].map(f => (
                  <div key={f.text} className={`flex items-center gap-3 px-4 py-3 rounded-2xl ${f.bg} border border-white/5`}>
                    <Icon name={f.icon} size={16} className={f.color} />
                    <span className="text-sm text-white/70">{f.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3 w-full mt-2">
                <button
                  onClick={() => setAuthScreen("register")}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold text-base glow-purple hover:scale-[1.02] transition-transform"
                >
                  Создать аккаунт
                </button>
                <button
                  onClick={() => setAuthScreen("login")}
                  className="w-full py-4 rounded-2xl glass border border-white/10 text-white/70 font-medium text-base hover:bg-white/5 transition-all"
                >
                  Уже есть аккаунт
                </button>
              </div>
            </div>
          )}

          {/* Login */}
          {authScreen === "login" && (
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3 mb-2">
                <button onClick={() => setAuthScreen("welcome")} className="w-9 h-9 rounded-xl glass flex items-center justify-center text-white/50 hover:text-white/80 transition-colors">
                  <Icon name="ArrowLeft" size={18} />
                </button>
                <div>
                  <h2 className="text-2xl font-black font-montserrat text-white">Вход</h2>
                  <p className="text-xs text-white/40">Введи данные аккаунта</p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="glass rounded-2xl px-4 py-3.5 flex items-center gap-3 border border-white/8 focus-within:border-purple-500/50 transition-colors">
                  <Icon name="Phone" size={16} className="text-white/30 shrink-0" />
                  <input
                    type="tel"
                    placeholder="+7 (999) 000-00-00"
                    value={authForm.phone}
                    onChange={e => setAuthForm(p => ({ ...p, phone: e.target.value }))}
                    className="bg-transparent text-sm text-white placeholder-white/25 outline-none flex-1"
                  />
                </div>
                <div className="glass rounded-2xl px-4 py-3.5 flex items-center gap-3 border border-white/8 focus-within:border-purple-500/50 transition-colors">
                  <Icon name="KeyRound" size={16} className="text-white/30 shrink-0" />
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Пароль"
                    value={authForm.password}
                    onChange={e => setAuthForm(p => ({ ...p, password: e.target.value }))}
                    className="bg-transparent text-sm text-white placeholder-white/25 outline-none flex-1"
                  />
                  <button onClick={() => setShowPass(!showPass)} className="text-white/30 hover:text-white/60 transition-colors">
                    <Icon name={showPass ? "EyeOff" : "Eye"} size={15} />
                  </button>
                </div>
              </div>

              {authError && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 animate-scale-in">
                  <Icon name="AlertCircle" size={14} className="text-red-400" />
                  <span className="text-xs text-red-300">{authError}</span>
                </div>
              )}

              <button
                onClick={handleLogin}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-base glow-purple hover:scale-[1.02] transition-transform"
              >
                Войти
              </button>

              <button onClick={() => setAuthScreen("register")} className="text-center text-xs text-white/30 hover:text-purple-400 transition-colors">
                Нет аккаунта? <span className="text-purple-400">Зарегистрироваться</span>
              </button>
            </div>
          )}

          {/* Register */}
          {authScreen === "register" && (
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3 mb-2">
                <button onClick={() => setAuthScreen("welcome")} className="w-9 h-9 rounded-xl glass flex items-center justify-center text-white/50 hover:text-white/80 transition-colors">
                  <Icon name="ArrowLeft" size={18} />
                </button>
                <div>
                  <h2 className="text-2xl font-black font-montserrat text-white">Регистрация</h2>
                  <p className="text-xs text-white/40">Создай новый аккаунт</p>
                </div>
              </div>

              {/* Progress */}
              <div className="flex gap-1.5">
                {[0,1,2].map(i => (
                  <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i === 0 ? "bg-gradient-to-r from-purple-500 to-cyan-500" : "bg-white/10"}`} />
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <div className="glass rounded-2xl px-4 py-3.5 flex items-center gap-3 border border-white/8 focus-within:border-purple-500/50 transition-colors">
                  <Icon name="User" size={16} className="text-white/30 shrink-0" />
                  <input
                    placeholder="Имя и фамилия"
                    value={authForm.name}
                    onChange={e => setAuthForm(p => ({ ...p, name: e.target.value }))}
                    className="bg-transparent text-sm text-white placeholder-white/25 outline-none flex-1"
                  />
                </div>
                <div className="glass rounded-2xl px-4 py-3.5 flex items-center gap-3 border border-white/8 focus-within:border-purple-500/50 transition-colors">
                  <span className="text-white/30 text-sm shrink-0">@</span>
                  <input
                    placeholder="Имя пользователя"
                    value={authForm.username}
                    onChange={e => setAuthForm(p => ({ ...p, username: e.target.value.replace(/\s/g,"") }))}
                    className="bg-transparent text-sm text-white placeholder-white/25 outline-none flex-1"
                  />
                </div>
                <div className="glass rounded-2xl px-4 py-3.5 flex items-center gap-3 border border-white/8 focus-within:border-purple-500/50 transition-colors">
                  <Icon name="Phone" size={16} className="text-white/30 shrink-0" />
                  <input
                    type="tel"
                    placeholder="+7 (999) 000-00-00"
                    value={authForm.phone}
                    onChange={e => setAuthForm(p => ({ ...p, phone: e.target.value }))}
                    className="bg-transparent text-sm text-white placeholder-white/25 outline-none flex-1"
                  />
                </div>
                <div className="glass rounded-2xl px-4 py-3.5 flex items-center gap-3 border border-white/8 focus-within:border-purple-500/50 transition-colors">
                  <Icon name="KeyRound" size={16} className="text-white/30 shrink-0" />
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Придумай пароль"
                    value={authForm.password}
                    onChange={e => setAuthForm(p => ({ ...p, password: e.target.value }))}
                    className="bg-transparent text-sm text-white placeholder-white/25 outline-none flex-1"
                  />
                  <button onClick={() => setShowPass(!showPass)} className="text-white/30 hover:text-white/60 transition-colors">
                    <Icon name={showPass ? "EyeOff" : "Eye"} size={15} />
                  </button>
                </div>
              </div>

              {authError && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 animate-scale-in">
                  <Icon name="AlertCircle" size={14} className="text-red-400" />
                  <span className="text-xs text-red-300">{authError}</span>
                </div>
              )}

              <div className="flex items-start gap-2 px-1">
                <Icon name="Shield" size={13} className="text-green-400 mt-0.5 shrink-0" />
                <p className="text-[11px] text-white/30 leading-relaxed">Регистрируясь, ты соглашаешься с условиями использования. Твои данные защищены E2E-шифрованием.</p>
              </div>

              <button
                onClick={handleRegister}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold text-base glow-purple hover:scale-[1.02] transition-transform"
              >
                Продолжить →
              </button>

              <button onClick={() => setAuthScreen("login")} className="text-center text-xs text-white/30 hover:text-purple-400 transition-colors">
                Уже есть аккаунт? <span className="text-purple-400">Войти</span>
              </button>
            </div>
          )}

          {/* Verify phone */}
          {authScreen === "verify" && (
            <div className="flex flex-col gap-5 items-center text-center">
              <button onClick={() => setAuthScreen("register")} className="self-start w-9 h-9 rounded-xl glass flex items-center justify-center text-white/50 hover:text-white/80 transition-colors">
                <Icon name="ArrowLeft" size={18} />
              </button>

              {/* Progress */}
              <div className="flex gap-1.5 w-full">
                {[0,1,2].map(i => (
                  <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= 1 ? "bg-gradient-to-r from-purple-500 to-cyan-500" : "bg-white/10"}`} />
                ))}
              </div>

              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-cyan-500/20 animate-float">
                <Icon name="MessageSquare" size={32} className="text-cyan-400" />
              </div>
              <div>
                <h2 className="text-2xl font-black font-montserrat text-white mb-1">Подтверди номер</h2>
                <p className="text-sm text-white/40">Отправили SMS на<br/><span className="text-purple-300">{authForm.phone || "+7 (999) ..."}</span></p>
              </div>

              {/* Code input */}
              <div className="glass rounded-2xl px-6 py-4 flex items-center gap-3 border border-purple-500/20 w-full focus-within:border-purple-500/50 transition-colors">
                <Icon name="Hash" size={16} className="text-purple-400 shrink-0" />
                <input
                  placeholder="Код из SMS"
                  value={authForm.code}
                  onChange={e => setAuthForm(p => ({ ...p, code: e.target.value.replace(/\D/g,"").slice(0,6) }))}
                  className="bg-transparent text-lg text-white placeholder-white/25 outline-none flex-1 tracking-widest font-bold text-center"
                  maxLength={6}
                />
              </div>

              {authError && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 animate-scale-in w-full">
                  <Icon name="AlertCircle" size={14} className="text-red-400" />
                  <span className="text-xs text-red-300">{authError}</span>
                </div>
              )}

              <button
                onClick={handleVerify}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold text-base glow-cyan hover:scale-[1.02] transition-transform"
              >
                Подтвердить и войти 🚀
              </button>

              <button className="text-xs text-white/25 hover:text-purple-400 transition-colors">
                Отправить код повторно через 60с
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen w-screen flex bg-mesh overflow-hidden font-golos">
      {/* Sidebar Nav */}
      <aside className="w-20 h-full flex flex-col items-center py-6 gap-1 glass border-r border-white/5 z-10 shrink-0">
        <div className="mb-4 flex flex-col items-center">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center glow-purple mb-1">
            <span className="text-white font-montserrat font-black text-sm">S</span>
          </div>
          <span className="text-[8px] text-white/30 font-semibold tracking-widest">SURIV</span>
        </div>

        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => { setActiveTab(item.id); setOpenChat(null); }}
            className={`relative w-14 h-14 rounded-2xl flex flex-col items-center justify-center gap-0.5 transition-all duration-200 group
              ${activeTab === item.id ? "nav-item-active glow-purple" : "hover:bg-white/5"}`}
          >
            <Icon
              name={item.icon}
              size={20}
              className={activeTab === item.id ? "text-purple-400" : "text-white/40 group-hover:text-white/70"}
            />
            <span className={`text-[9px] font-medium ${activeTab === item.id ? "text-purple-300" : "text-white/30 group-hover:text-white/50"}`}>
              {item.label}
            </span>
            {item.badge ? (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white text-[9px] font-bold flex items-center justify-center">
                {item.badge > 9 ? "9+" : item.badge}
              </span>
            ) : null}
          </button>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">

        {/* ===== CHATS LIST ===== */}
        {activeTab === "chats" && !openChat && (
          <div className="flex flex-col w-full max-w-sm border-r border-white/5 animate-fade-in">
            <div className="p-4 border-b border-white/5">
              <h1 className="text-xl font-bold gradient-text mb-3">Чаты</h1>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {STATUSES.map((s, i) => (
                  <button key={i} className="flex flex-col items-center gap-1 shrink-0">
                    <div className="story-ring">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${s.color} flex items-center justify-center text-white font-bold text-xs border-2 border-background`}>
                        {s.isMe ? <Icon name="Plus" size={16} /> : <span>{s.emoji}</span>}
                      </div>
                    </div>
                    <span className="text-[10px] text-white/50">{s.name}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {CHATS.map((chat, i) => (
                <button
                  key={chat.id}
                  onClick={() => setOpenChat(chat)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/4 transition-all border-b border-white/3 text-left"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className="relative shrink-0">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${chat.color} flex items-center justify-center text-white font-bold text-sm`}>
                      {chat.avatar}
                    </div>
                    {chat.online && <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full status-online border-2 border-background" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-sm text-white/90 flex items-center gap-1">
                        {chat.name}
                        {chat.encrypted && <Icon name="Lock" size={10} className="text-green-400" />}
                      </span>
                      <span className="text-[10px] text-white/30">{chat.time}</span>
                    </div>
                    <p className="text-xs text-white/40 truncate">{chat.msg}</p>
                  </div>
                  {chat.unread > 0 && (
                    <span className="shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white text-[10px] font-bold flex items-center justify-center">
                      {chat.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Empty chat placeholder */}
        {activeTab === "chats" && !openChat && (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-500/20 to-cyan-500/10 flex items-center justify-center animate-float border border-purple-500/20">
              <Icon name="MessageCircle" size={40} className="text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold gradient-text font-montserrat">Surivitna</h2>
            <p className="text-white/30 text-sm max-w-xs">Выбери чат слева, чтобы начать общение. Все сообщения защищены шифрованием E2E</p>
            <div className="flex gap-2 flex-wrap justify-center mt-2">
              {["🔐 E2E шифрование", "⏳ Авто-удаление", "🎭 Стикеры", "✨ Статусы"].map(f => (
                <span key={f} className="text-xs px-3 py-1.5 rounded-xl encrypted-badge text-green-300">{f}</span>
              ))}
            </div>
          </div>
        )}

        {/* ===== OPEN CHAT ===== */}
        {activeTab === "chats" && openChat && (
          <div className="flex flex-col w-full animate-fade-in">
            <div className="flex items-center gap-3 px-4 py-3 glass border-b border-white/5">
              <button onClick={() => setOpenChat(null)} className="text-white/40 hover:text-white/80 transition-colors">
                <Icon name="ArrowLeft" size={20} />
              </button>
              <div className="relative">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${openChat.color} flex items-center justify-center text-white font-bold text-xs`}>
                  {openChat.avatar}
                </div>
                {openChat.online && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full status-online border-2 border-background" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-white">{openChat.name}</span>
                  {openChat.encrypted && (
                    <span className="encrypted-badge text-[10px] px-2 py-0.5 rounded-full text-green-400 flex items-center gap-1">
                      <Icon name="Lock" size={9} /> E2E
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-neon" />
                  <span className="text-[10px] text-white/40">в сети · печатает...</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-xl glass flex items-center justify-center text-white/50 hover:text-purple-400 transition-colors">
                  <Icon name="Phone" size={15} />
                </button>
                <button className="w-8 h-8 rounded-xl glass flex items-center justify-center text-white/50 hover:text-cyan-400 transition-colors">
                  <Icon name="Video" size={15} />
                </button>
              </div>
            </div>

            {autoDelete && (
              <div className="mx-4 mt-3 px-3 py-2 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center gap-2">
                <Icon name="Clock" size={13} className="text-orange-400" />
                <span className="text-[11px] text-orange-300">Авто-удаление через 24ч активно</span>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
              {MESSAGES.map((msg) => (
                <div key={msg.id} className={`flex ${msg.out ? "justify-end" : "justify-start"} animate-fade-in`}>
                  {"sticker" in msg && msg.sticker ? (
                    <div className="text-5xl select-none">{msg.sticker}</div>
                  ) : (
                    <div className={`max-w-[70%] px-4 py-2.5 ${msg.out ? "msg-out text-white" : "msg-in text-white/85"}`}>
                      <p className="text-sm leading-relaxed">{"text" in msg ? msg.text : ""}</p>
                      <div className="flex items-center gap-1 mt-1 justify-end">
                        <span className="text-[10px] text-white/40">{msg.time}</span>
                        {msg.out && <Icon name="CheckCheck" size={11} className="text-cyan-400" />}
                        {msg.encrypted && <Icon name="Lock" size={9} className="text-green-400/60" />}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div className="flex justify-start">
                <div className="msg-in px-4 py-3 flex gap-1 items-center">
                  <span className="typing-dot w-1.5 h-1.5 rounded-full bg-white/60 block" />
                  <span className="typing-dot w-1.5 h-1.5 rounded-full bg-white/60 block" />
                  <span className="typing-dot w-1.5 h-1.5 rounded-full bg-white/60 block" />
                </div>
              </div>
            </div>

            {showStickers && (
              <div className="mx-4 mb-2 p-3 glass rounded-2xl grid grid-cols-6 gap-2 animate-scale-in">
                {STICKERS.map((s, i) => (
                  <button key={i} onClick={() => { setMsgText(msgText + s); setShowStickers(false); }}
                    className="text-2xl hover:scale-125 transition-transform text-center">
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2 px-4 py-3 glass border-t border-white/5">
              <button
                onClick={() => setShowStickers(!showStickers)}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${showStickers ? "bg-purple-500/30 text-purple-300" : "glass text-white/40 hover:text-white/70"}`}
              >
                <Icon name="Smile" size={18} />
              </button>
              <input
                value={msgText}
                onChange={e => setMsgText(e.target.value)}
                onKeyDown={e => e.key === "Enter" && setMsgText("")}
                placeholder="Написать сообщение..."
                className="flex-1 bg-transparent text-sm text-white placeholder-white/25 outline-none"
              />
              <button className="w-9 h-9 rounded-xl glass flex items-center justify-center text-white/40 hover:text-white/70 transition-colors">
                <Icon name="Paperclip" size={16} />
              </button>
              <button
                onClick={() => setMsgText("")}
                className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white glow-purple hover:scale-105 transition-transform"
              >
                <Icon name="Send" size={16} />
              </button>
            </div>
          </div>
        )}

        {/* ===== GROUPS ===== */}
        {activeTab === "groups" && (
          <div className="flex flex-col w-full animate-fade-in">
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
              <h1 className="text-xl font-bold gradient-text">Группы</h1>
              <button className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white hover:scale-105 transition-transform">
                <Icon name="Plus" size={16} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
              {GROUPS.map((g, i) => (
                <div key={g.id} className="glass rounded-2xl p-4 hover-glow cursor-pointer transition-all animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                  <div className="flex items-center gap-3">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${g.color} flex items-center justify-center text-white font-bold text-base`}>
                      {g.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-semibold text-white">{g.name}</span>
                        <span className="text-[11px] text-white/30">{g.time}</span>
                      </div>
                      <span className="text-xs text-white/40">{g.members} участников</span>
                      <p className="text-xs text-white/50 mt-1">{g.msg}</p>
                    </div>
                    {g.unread > 0 && (
                      <span className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white text-[10px] font-bold flex items-center justify-center">
                        {g.unread}
                      </span>
                    )}
                  </div>
                </div>
              ))}
              <button className="glass rounded-2xl p-4 flex items-center justify-center gap-2 text-purple-400 hover:bg-purple-500/10 transition-all border-2 border-dashed border-purple-500/20">
                <Icon name="Plus" size={18} />
                <span className="text-sm font-medium">Создать группу</span>
              </button>
            </div>
          </div>
        )}

        {/* ===== CONTACTS ===== */}
        {activeTab === "contacts" && (
          <div className="flex flex-col w-full animate-fade-in">
            <div className="p-4 border-b border-white/5">
              <h1 className="text-xl font-bold gradient-text mb-3">Контакты</h1>
              <div className="flex gap-2 glass rounded-xl px-3 py-2 items-center">
                <Icon name="Search" size={15} className="text-white/30" />
                <input placeholder="Найти контакт..." className="bg-transparent text-sm text-white placeholder-white/25 outline-none flex-1" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="px-4 py-2">
                <p className="text-[11px] text-white/30 font-medium uppercase tracking-wider mb-2">Онлайн · {CONTACTS.filter(c => c.online).length}</p>
                {CONTACTS.filter(c => c.online).map((c, i) => (
                  <div key={c.id} className="flex items-center gap-3 py-3 border-b border-white/4 animate-fade-in hover:bg-white/3 rounded-xl px-2 transition-all cursor-pointer" style={{ animationDelay: `${i * 60}ms` }}>
                    <div className="relative">
                      <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${c.color} flex items-center justify-center text-white font-bold text-xs`}>{c.avatar}</div>
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full status-online border-2 border-background" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white/90">{c.name}</p>
                      <p className="text-xs text-white/40">{c.status}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2">
                <p className="text-[11px] text-white/30 font-medium uppercase tracking-wider mb-2">Недавно</p>
                {CONTACTS.filter(c => !c.online).map((c, i) => (
                  <div key={c.id} className="flex items-center gap-3 py-3 border-b border-white/4 animate-fade-in hover:bg-white/3 rounded-xl px-2 transition-all cursor-pointer" style={{ animationDelay: `${i * 60}ms` }}>
                    <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${c.color} opacity-60 flex items-center justify-center text-white font-bold text-xs`}>{c.avatar}</div>
                    <div>
                      <p className="text-sm font-semibold text-white/60">{c.name}</p>
                      <p className="text-xs text-white/30">{c.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== MEDIA ===== */}
        {activeTab === "media" && (
          <div className="flex flex-col w-full animate-fade-in">
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
              <h1 className="text-xl font-bold gradient-text">Медиа</h1>
              <div className="flex gap-2">
                <button className="text-xs px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30">Фото</button>
                <button className="text-xs px-3 py-1.5 rounded-lg glass text-white/40">Видео</button>
                <button className="text-xs px-3 py-1.5 rounded-lg glass text-white/40">Файлы</button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-3 gap-2">
                {MEDIA_ITEMS.map((item, i) => (
                  <div
                    key={item.id}
                    className={`aspect-square rounded-2xl bg-gradient-to-br ${item.color} flex flex-col items-center justify-center cursor-pointer hover:scale-95 transition-transform animate-fade-in relative overflow-hidden`}
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <span className="text-4xl">{item.emoji}</span>
                    {item.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                          <Icon name="Play" size={16} className="text-white ml-0.5" />
                        </div>
                      </div>
                    )}
                    <span className="absolute bottom-1 right-2 text-[9px] text-white/60">{item.from}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== NOTIFICATIONS ===== */}
        {activeTab === "notifications" && (
          <div className="flex flex-col w-full animate-fade-in">
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
              <h1 className="text-xl font-bold gradient-text">Уведомления</h1>
              <button className="text-xs text-white/30 hover:text-white/60 transition-colors">Все прочитаны</button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
              {NOTIFICATIONS.map((n, i) => (
                <div key={n.id} className="glass rounded-2xl p-4 flex items-start gap-3 hover-glow cursor-pointer transition-all animate-fade-in" style={{ animationDelay: `${i * 70}ms` }}>
                  <div className={`w-10 h-10 rounded-xl ${n.bg} flex items-center justify-center shrink-0`}>
                    <Icon name={n.icon} size={18} className={n.color} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-semibold text-white/90">{n.title}</p>
                      <span className="text-[10px] text-white/30">{n.time} назад</span>
                    </div>
                    <p className="text-xs text-white/50 mt-0.5">{n.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== SEARCH ===== */}
        {activeTab === "search" && (
          <div className="flex flex-col w-full animate-fade-in">
            <div className="p-4 border-b border-white/5">
              <h1 className="text-xl font-bold gradient-text mb-3">Поиск</h1>
              <div className="flex gap-2 glass-strong rounded-2xl px-4 py-3 items-center border border-purple-500/20">
                <Icon name="Search" size={18} className="text-purple-400" />
                <input
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Поиск по чатам, людям, медиа..."
                  className="bg-transparent text-sm text-white placeholder-white/30 outline-none flex-1"
                  autoFocus
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="text-white/30 hover:text-white/60">
                    <Icon name="X" size={14} />
                  </button>
                )}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-3">
              {!searchQuery ? (
                <div className="flex flex-col items-center justify-center h-64 gap-4 text-center">
                  <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center animate-float">
                    <Icon name="Search" size={32} className="text-purple-400" />
                  </div>
                  <p className="text-white/30 text-sm">Введи имя, сообщение или ключевое слово</p>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  {allItems.length === 0 ? (
                    <p className="text-center text-white/30 text-sm mt-10">Ничего не найдено</p>
                  ) : (
                    allItems.map((item, i) => (
                      <div key={`${item.type}-${item.id}`} className="glass rounded-2xl p-3 flex items-center gap-3 hover-glow cursor-pointer animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center text-white font-bold text-xs`}>
                          {item.avatar}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white/90">{item.name}</p>
                          <p className="text-[11px] text-white/40">{item.type === "chat" ? "Чат" : item.type === "group" ? "Группа" : "Контакт"}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== PROFILE ===== */}
        {activeTab === "profile" && (
          <div className="flex flex-col w-full animate-fade-in overflow-y-auto">
            <div className="relative h-40 bg-gradient-to-br from-purple-600 via-pink-500 to-cyan-500 overflow-hidden shrink-0">
              <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, white 1px, transparent 1px), radial-gradient(circle at 70% 20%, white 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
              <button className="absolute top-3 right-3 glass px-3 py-1.5 rounded-xl text-xs text-white flex items-center gap-1">
                <Icon name="Edit3" size={12} /> Изменить
              </button>
            </div>
            <div className="px-6 pb-6">
              <div className="-mt-10 mb-4 flex items-end justify-between">
                <div className="story-ring">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl border-4 border-background">
                    АН
                  </div>
                </div>
                <button className="glass px-4 py-2 rounded-xl text-sm text-purple-300 border border-purple-500/30 hover:bg-purple-500/20 transition-colors">
                  Редактировать
                </button>
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">Алиса Нова</h2>
              <p className="text-sm text-white/50 mb-1">@alisnova · #4921</p>
              <p className="text-sm text-white/60 mb-4">Исследую вселенную и создаю будущее 🚀✨</p>
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[{ label: "Контакты", val: "248" }, { label: "Группы", val: "12" }, { label: "Медиа", val: "1.2К" }].map((s) => (
                  <div key={s.label} className="glass rounded-2xl p-3 text-center">
                    <p className="text-lg font-bold gradient-text">{s.val}</p>
                    <p className="text-[11px] text-white/40">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="glass rounded-2xl p-4 mb-4">
                <p className="text-xs text-white/40 mb-2 flex items-center gap-1"><Icon name="Star" size={12} className="text-yellow-400" /> Мой статус</p>
                <div className="flex gap-2 flex-wrap">
                  {["Свободна 🟢", "Занята 🔴", "В пути 🚗", "Исследую 🚀"].map((s) => (
                    <button key={s} className="text-xs px-3 py-1.5 rounded-xl glass hover:bg-purple-500/20 text-white/60 hover:text-purple-300 transition-all border border-white/5 hover:border-purple-500/30">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div className="glass rounded-2xl p-4">
                <p className="text-xs text-white/40 mb-3 flex items-center gap-1"><Icon name="Award" size={12} className="text-purple-400" /> Достижения</p>
                <div className="flex gap-2 flex-wrap">
                  {["🔐 Мастер шифрования", "🚀 Первопроходец", "💬 Чат-мания", "🎭 Стикер-арт"].map((b) => (
                    <span key={b} className="text-xs px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-500/20 to-cyan-500/10 border border-purple-500/20 text-white/70">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== SETTINGS ===== */}
        {activeTab === "settings" && (
          <div className="flex flex-col w-full animate-fade-in">
            <div className="p-4 border-b border-white/5">
              <h1 className="text-xl font-bold gradient-text">Настройки</h1>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
              <div className="glass rounded-2xl p-4">
                <p className="text-xs text-white/30 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Icon name="Shield" size={12} className="text-green-400" /> Безопасность
                </p>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white/80">Сквозное шифрование</p>
                      <p className="text-[11px] text-white/40">E2E для всех чатов</p>
                    </div>
                    <button
                      onClick={() => setEncryptEnabled(!encryptEnabled)}
                      className={`w-12 h-6 rounded-full relative transition-all ${encryptEnabled ? "bg-gradient-to-r from-purple-500 to-cyan-500" : "bg-white/10"}`}
                    >
                      <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow ${encryptEnabled ? "left-7" : "left-1"}`} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-white/80">Авто-удаление</p>
                      <p className="text-[11px] text-white/40">Удалять сообщения через 24ч</p>
                    </div>
                    <button
                      onClick={() => setAutoDelete(!autoDelete)}
                      className={`w-12 h-6 rounded-full relative transition-all ${autoDelete ? "bg-gradient-to-r from-orange-500 to-red-500" : "bg-white/10"}`}
                    >
                      <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow ${autoDelete ? "left-7" : "left-1"}`} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="glass rounded-2xl p-4">
                <p className="text-xs text-white/30 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Icon name="Bell" size={12} className="text-purple-400" /> Уведомления
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/80">Push-уведомления</p>
                    <p className="text-[11px] text-white/40">Новые сообщения и звонки</p>
                  </div>
                  <button
                    onClick={() => setNotifEnabled(!notifEnabled)}
                    className={`w-12 h-6 rounded-full relative transition-all ${notifEnabled ? "bg-gradient-to-r from-purple-500 to-pink-500" : "bg-white/10"}`}
                  >
                    <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow ${notifEnabled ? "left-7" : "left-1"}`} />
                  </button>
                </div>
              </div>

              <div className="glass rounded-2xl p-4">
                <p className="text-xs text-white/30 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Icon name="Palette" size={12} className="text-pink-400" /> Тема оформления
                </p>
                <div className="flex flex-col gap-2">
                  {[
                    { label: "Неон Пурпур", colors: "from-purple-500 to-pink-500", active: true },
                    { label: "Киберсинь", colors: "from-cyan-500 to-blue-500", active: false },
                    { label: "Закат", colors: "from-orange-500 to-red-500", active: false },
                  ].map((theme) => (
                    <button key={theme.label} className={`flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-all ${theme.active ? "bg-white/5 border border-purple-500/30" : ""}`}>
                      <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${theme.colors}`} />
                      <span className="text-sm text-white/70">{theme.label}</span>
                      {theme.active && <Icon name="Check" size={14} className="text-purple-400 ml-auto" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass rounded-2xl p-4">
                <p className="text-xs text-white/30 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Icon name="Smile" size={12} className="text-yellow-400" /> Стикеры
                </p>
                <div className="grid grid-cols-6 gap-2">
                  {STICKERS.map((s, i) => (
                    <span key={i} className="text-2xl text-center cursor-pointer hover:scale-125 transition-transform">{s}</span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => { setIsAuthed(false); setAuthScreen("welcome"); setAuthForm({ name: "", username: "", phone: "", password: "", code: "" }); }}
                className="glass rounded-2xl p-4 flex items-center gap-3 text-red-400 hover:bg-red-500/10 transition-all"
              >
                <Icon name="LogOut" size={18} />
                <span className="text-sm font-medium">Выйти из аккаунта</span>
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}