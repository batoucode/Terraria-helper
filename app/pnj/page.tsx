'use client'
import { useState, useMemo, useEffect } from 'react'
import {
  NPC_DATA,
  VILLAGE_GROUPS,
  CONSTRUCTION_TIPS,
  PHASE_ORDER,
  CHECKLIST_ITEMS,
  BIOME_COLORS,
  type NpcPhase,
  type NpcData,
} from '@/lib/npcData'
import Link from 'next/link'

type TabKey = 'villages' | 'pnj' | 'checklist' | 'conseils' | 'ordre'
type ViewMode = 'simple' | 'detail'

export default function PNJPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('villages')
  const [search, setSearch] = useState('')
  const [phaseFilter, setPhaseFilter] = useState<NpcPhase | 'all'>('all')
  const [biomeFilter, setBiomeFilter] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('simple')
  const [checklist, setChecklist] = useState<Record<string, boolean>>({})
  const [darkMode, setDarkMode] = useState(false)
  const [selectedNpc, setSelectedNpc] = useState<NpcData | null>(null)
  const [showTipIndex, setShowTipIndex] = useState<number | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('terraria-pnj-checklist')
    if (saved) setChecklist(JSON.parse(saved))
    const savedTheme = localStorage.getItem('terraria-pnj-darkmode')
    if (savedTheme === 'true') setDarkMode(true)
  }, [])

  useEffect(() => {
    localStorage.setItem('terraria-pnj-checklist', JSON.stringify(checklist))
  }, [checklist])

  useEffect(() => {
    localStorage.setItem('terraria-pnj-darkmode', String(darkMode))
  }, [darkMode])

  const toggleChecklist = (id: string) => {
    setChecklist((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const filteredNpcs = useMemo(() => {
    return NPC_DATA.filter((npc) => {
      const matchSearch = npc.name.toLowerCase().includes(search.toLowerCase())
      const matchPhase = phaseFilter === 'all' ? true : npc.phase === phaseFilter
      const matchBiome = biomeFilter ? npc.biome === biomeFilter : true
      return matchSearch && matchPhase && matchBiome
    })
  }, [search, phaseFilter, biomeFilter])

  const biomes = useMemo(() => Array.from(new Set(NPC_DATA.map((n) => n.biome))), [])

  const bg = darkMode ? 'bg-gray-900 text-gray-100' : 'bg-amber-50 text-gray-800'
  const cardBg = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-amber-200'
  const headerBg = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-amber-100 border-amber-300'
  const inputBg = darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-amber-300'
  const tabActive = darkMode ? 'bg-amber-600 text-white' : 'bg-amber-700 text-white'
  const tabInactive = darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-amber-100 text-amber-800 hover:bg-amber-200'

  const tabs: { key: TabKey; label: string; emoji: string }[] = [
    { key: 'villages', label: 'Villages', emoji: '🏘️' },
    { key: 'pnj', label: 'PNJ', emoji: '👥' },
    { key: 'checklist', label: 'Checklist', emoji: '✅' },
    { key: 'conseils', label: 'Conseils', emoji: '💡' },
    { key: 'ordre', label: 'Ordre', emoji: '📋' },
  ]

  return (
    <div className={`min-h-screen transition-colors ${bg}`}>
      {/* Header */}
      <div className={`sticky top-0 z-20 border-b-2 shadow-md ${headerBg}`}>
        <div className="max-w-5xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <p className="text-xs uppercase tracking-widest opacity-70 font-caveat">planificateur</p>
              <h1 className="font-kalam font-bold text-2xl leading-tight">🗺️ Terraria PNJ</h1>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Link href="/" className="text-sm px-3 py-1.5 rounded-lg border-2 border-green-700 text-green-700 hover:bg-green-700 hover:text-white transition font-caveat">
                ⚒ Accueil
              </Link>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="text-sm px-3 py-1.5 rounded-lg border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white transition"
              >
                {darkMode ? '☀️ Clair' : '🌙 Sombre'}
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1.5 mt-3 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-caveat font-bold transition ${
                  activeTab === tab.key ? tabActive : tabInactive
                }`}
              >
                {tab.emoji} {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* ======================== TAB: VILLAGES ======================== */}
        {activeTab === 'villages' && (
          <div>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h2 className={`font-kalam font-bold text-xl ${darkMode ? 'text-amber-300' : 'text-amber-800'}`}>
                🏘️ Villages recommandés par biome
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('simple')}
                  className={`px-3 py-1 rounded-lg text-sm border-2 transition font-caveat ${
                    viewMode === 'simple'
                      ? 'bg-amber-600 text-white border-amber-600'
                      : `${darkMode ? 'border-gray-600 text-gray-300' : 'border-amber-300 text-amber-700'}`
                  }`}
                >
                  Simple
                </button>
                <button
                  onClick={() => setViewMode('detail')}
                  className={`px-3 py-1 rounded-lg text-sm border-2 transition font-caveat ${
                    viewMode === 'detail'
                      ? 'bg-amber-600 text-white border-amber-600'
                      : `${darkMode ? 'border-gray-600 text-gray-300' : 'border-amber-300 text-amber-700'}`
                  }`}
                >
                  Détaillé
                </button>
              </div>
            </div>

            {viewMode === 'simple' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {VILLAGE_GROUPS.map((v) => {
                  const colors = BIOME_COLORS[v.biome] || BIOME_COLORS['Flexible']
                  return (
                    <div
                      key={v.biome}
                      className={`rounded-xl border-2 p-4 shadow-sm transition hover:shadow-md ${
                        darkMode
                          ? `bg-gray-800 border-gray-700`
                          : 'bg-white'
                      }`}
                      style={{ borderLeftColor: colors.border, borderLeftWidth: '4px' }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">{v.emoji}</span>
                        <h3 className={`font-kalam font-bold text-lg ${darkMode ? 'text-gray-100' : ''}`}>{v.biome}</h3>
                      </div>
                      <div className="flex items-center gap-1.5 mb-2">
                        {v.npcs.map((npc, idx) => (
                          <span key={idx} className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${
                            darkMode ? 'bg-gray-700 text-amber-300' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {npc}
                          </span>
                        ))}
                      </div>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} font-caveat`}>
                        📡 {v.pylon}
                      </p>
                      <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'} font-caveat`}>
                        {v.phase === 'pre-hardmode' ? '🟢 Avant Hardmode' : '🔴 Hardmode'}
                      </p>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="space-y-4">
                {VILLAGE_GROUPS.map((v) => {
                  const colors = BIOME_COLORS[v.biome] || BIOME_COLORS['Flexible']
                  return (
                    <div
                      key={v.biome}
                      className={`rounded-xl border-2 p-5 shadow-sm ${cardBg}`}
                      style={{ borderLeftColor: colors.border, borderLeftWidth: '5px' }}
                    >
                      <div className="flex items-start justify-between flex-wrap gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{v.emoji}</span>
                            <h3 className={`font-kalam font-bold text-xl ${darkMode ? 'text-gray-100' : ''}`}
                              style={{ color: colors.text }}>
                              {v.biome}
                            </h3>
                          </div>
                          <p className="mt-1 text-sm">{v.description}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          v.phase === 'pre-hardmode' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {v.phase === 'pre-hardmode' ? '🟢 Pre-Hardmode' : '🔴 Hardmode'}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mt-3">
                        {v.npcs.map((npc, idx) => (
                          <span key={idx} className={`px-3 py-1 rounded-full text-sm font-bold ${
                            darkMode ? 'bg-gray-700 text-amber-300' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {npc}
                          </span>
                        ))}
                        <span className={`text-xs px-2 py-0.5 rounded-full ml-1 ${
                          darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-700'
                        }`}>
                          📡 {v.pylon}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* ======================== TAB: PNJ ======================== */}
        {activeTab === 'pnj' && (
          <div>
            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-4">
              <input
                type="text"
                placeholder="🔍 Chercher un PNJ..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`flex-1 min-w-[200px] px-4 py-2 rounded-xl border-2 text-sm ${inputBg}`}
              />
              <select
                value={phaseFilter}
                onChange={(e) => setPhaseFilter(e.target.value as NpcPhase | 'all')}
                className={`px-3 py-2 rounded-xl border-2 text-sm ${inputBg}`}
              >
                <option value="all">📋 Toutes phases</option>
                <option value="pre-hardmode">🟢 Pre-Hardmode</option>
                <option value="hardmode">🔴 Hardmode</option>
                <option value="flexible">🟡 Flexible</option>
              </select>
              <select
                value={biomeFilter || ''}
                onChange={(e) => setBiomeFilter(e.target.value || null)}
                className={`px-3 py-2 rounded-xl border-2 text-sm ${inputBg}`}
              >
                <option value="">🌍 Tous biomes</option>
                {biomes.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* NPC Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredNpcs.length === 0 ? (
                <p className={`col-span-full text-center py-10 font-caveat text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Aucun PNJ trouvé.
                </p>
              ) : (
                filteredNpcs.map((npc) => {
                  const colors = BIOME_COLORS[npc.biome] || BIOME_COLORS['Flexible']
                  const statusColors = npc.status === 'excellent'
                    ? { bg: 'bg-green-100', text: 'text-green-700' }
                    : npc.status === 'correct'
                    ? { bg: 'bg-yellow-100', text: 'text-yellow-700' }
                    : { bg: 'bg-red-100', text: 'text-red-700' }

                  return (
                    <div
                      key={npc.id}
                      onClick={() => setSelectedNpc(npc)}
                      className={`rounded-xl border-2 p-4 shadow-sm cursor-pointer transition hover:shadow-md ${
                        darkMode ? 'bg-gray-800 border-gray-700 hover:border-amber-500' : 'bg-white border-amber-200 hover:border-amber-400'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{npc.emoji}</span>
                          <div>
                            <h3 className={`font-kalam font-bold text-lg ${darkMode ? 'text-gray-100' : ''}`}>{npc.name}</h3>
                            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{npc.role}</p>
                          </div>
                        </div>
                        <div className={`px-2 py-0.5 rounded-full text-xs font-bold ${statusColors.bg} ${statusColors.text}`}>
                          {npc.status === 'excellent' ? '⭐' : npc.status === 'correct' ? '✓' : '⚠️'}
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5 mt-3">
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold"
                          style={{ backgroundColor: colors.bg, color: colors.text }}>
                          {npc.biome}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-700">
                          + {npc.partner}
                        </span>
                        {npc.phase === 'hardmode' && (
                          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700">
                            Hardmode
                          </span>
                        )}
                      </div>
                      {npc.mustHave && (
                        <p className={`text-xs mt-2 font-bold ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
                          ⭐ Indispensable
                        </p>
                      )}
                    </div>
                  )
                })
              )}
            </div>

            {/* NPC Detail Modal */}
            {selectedNpc && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelectedNpc(null)}>
                <div className={`max-w-md w-full rounded-2xl border-2 p-6 shadow-xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-amber-300'}`}
                  onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{selectedNpc.emoji}</span>
                      <div>
                        <h3 className={`font-kalam font-bold text-xl ${darkMode ? 'text-gray-100' : ''}`}>{selectedNpc.name}</h3>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{selectedNpc.role}</p>
                      </div>
                    </div>
                    <button onClick={() => setSelectedNpc(null)} className="text-2xl leading-none hover:opacity-70">&times;</button>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full text-sm font-bold"
                      style={{ backgroundColor: BIOME_COLORS[selectedNpc.biome]?.bg || '#eee', color: BIOME_COLORS[selectedNpc.biome]?.text || '#555' }}>
                      🌍 {selectedNpc.biome}
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm font-bold bg-purple-100 text-purple-700">
                      👥 {selectedNpc.partner}
                    </span>
                  </div>

                  <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{selectedNpc.notes}</p>

                  <div className="text-sm">
                    <p><strong>Utilité :</strong> {selectedNpc.utility.join(', ')}</p>
                    <p><strong>Phase :</strong> {selectedNpc.phase === 'pre-hardmode' ? '🟢 Pre-Hardmode' : selectedNpc.phase === 'hardmode' ? '🔴 Hardmode' : '🟡 Flexible'}</p>
                    {selectedNpc.pylonTarget !== '—' && <p><strong>📡 Pylône :</strong> {selectedNpc.pylonTarget}</p>}
                    {selectedNpc.mustHave && <p className="text-amber-600 font-bold mt-1">⭐ Indispensable — prioritaire</p>}
                  </div>

                  <button
                    onClick={() => setSelectedNpc(null)}
                    className="mt-4 w-full py-2 rounded-xl bg-amber-600 text-white font-bold hover:bg-amber-700 transition"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ======================== TAB: CHECKLIST ======================== */}
        {activeTab === 'checklist' && (
          <div>
            <h2 className={`font-kalam font-bold text-xl mb-4 ${darkMode ? 'text-amber-300' : 'text-amber-800'}`}>
              ✅ Checklist — Suivi de construction
            </h2>

            {/* Village checklist */}
            <div className={`rounded-xl border-2 p-5 mb-6 ${cardBg}`}>
              <h3 className={`font-kalam font-bold text-lg mb-3 ${darkMode ? 'text-gray-200' : ''}`}>
                🏘️ Villages par biome
              </h3>
              <div className="space-y-3">
                {VILLAGE_GROUPS.map((v) => (
                  <div key={v.biome} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={!!checklist[`village-${v.biome}`]}
                      onChange={() => toggleChecklist(`village-${v.biome}`)}
                      className="w-5 h-5 accent-amber-600"
                    />
                    <span className="text-lg">{v.emoji}</span>
                    <span className="flex-1 text-sm">
                      <strong>{v.biome}</strong> — {v.npcs.join(' + ')}
                    </span>
                    {checklist[`village-${v.biome}`] && <span className="text-green-600 text-sm font-bold">✔️ Fait</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* General checklist */}
            <div className={`rounded-xl border-2 p-5 ${cardBg}`}>
              <h3 className={`font-kalam font-bold text-lg mb-3 ${darkMode ? 'text-gray-200' : ''}`}>
                📋 Tâches générales
              </h3>
              <div className="space-y-3">
                {CHECKLIST_ITEMS.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={!!checklist[item.id]}
                      onChange={() => toggleChecklist(item.id)}
                      className="w-5 h-5 accent-amber-600"
                    />
                    <span className="text-sm flex-1">{item.label}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {item.category}
                    </span>
                    {checklist[item.id] && <span className="text-green-600 text-sm font-bold">✔️</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Progress */}
            <div className={`mt-4 rounded-xl border-2 p-4 ${cardBg}`}>
              <h3 className={`font-kalam font-bold mb-2 ${darkMode ? 'text-gray-200' : ''}`}>📊 Progression</h3>
              {(() => {
                const allItems = [...VILLAGE_GROUPS.map((v) => `village-${v.biome}`), ...CHECKLIST_ITEMS.map((i) => i.id)]
                const done = allItems.filter((id) => checklist[id]).length
                const total = allItems.length
                const pct = Math.round((done / total) * 100)
                return (
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>{done}/{total} tâches</span>
                      <span className="font-bold" style={{ color: pct === 100 ? '#16a34a' : '#d97706' }}>{pct}%</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${pct}%`, backgroundColor: pct === 100 ? '#16a34a' : '#d97706' }}
                      />
                    </div>
                    {pct === 100 && <p className="text-green-600 font-bold mt-2 text-center">🎉 Tout est fait ! Tous les pylônes t'attendent !</p>}
                  </div>
                )
              })()}
            </div>

            <button
              onClick={() => {
                if (confirm('Réinitialiser toute la checklist ?')) setChecklist({})
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-red-100 text-red-700 text-sm hover:bg-red-200 transition"
            >
              🗑️ Réinitialiser
            </button>
          </div>
        )}

        {/* ======================== TAB: CONSEILS ======================== */}
        {activeTab === 'conseils' && (
          <div>
            <h2 className={`font-kalam font-bold text-xl mb-4 ${darkMode ? 'text-amber-300' : 'text-amber-800'}`}>
              💡 Conseils de construction
            </h2>

            <div className={`rounded-xl border-2 p-5 mb-6 ${cardBg}`}>
              <h3 className={`font-kalam font-bold text-lg mb-4 ${darkMode ? 'text-gray-200' : ''}`}>
                📏 Règles rapides
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {CONSTRUCTION_TIPS.map((tip, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border ${
                      darkMode ? 'border-gray-700 bg-gray-700/50' : 'border-amber-100 bg-amber-50'
                    } cursor-pointer hover:shadow-sm transition`}
                    onClick={() => setShowTipIndex(showTipIndex === idx ? null : idx)}
                  >
                    <p className="text-sm">{tip}</p>
                    {showTipIndex === idx && (
                      <p className={`text-xs mt-2 italic ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        💡 Conseil clé pour optimiser le bonheur de tes PNJ et débloquer les pylônes plus vite.
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className={`rounded-xl border-2 p-5 ${cardBg}`}>
              <h3 className={`font-kalam font-bold text-lg mb-3 ${darkMode ? 'text-gray-200' : ''}`}>
                🎯 Logique de bonheur
              </h3>
              <div className={`space-y-3 text-sm ${darkMode ? 'text-gray-300' : ''}`}>
                <p>💚 Le bonheur d'un PNJ dépend de <strong>3 facteurs</strong> :</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Biome</strong> — chaque PNJ a un biome préféré et un biome détesté</li>
                  <li><strong>Voisins</strong> — chaque PNJ aime ou déteste ses voisins proches (&le;25 blocs)</li>
                  <li><strong>Surpeuplement</strong> — trop de PNJ dans une zone &rarr; malus de bonheur</li>
                </ul>
                <div className={`p-3 rounded-xl border mt-3 ${darkMode ? 'border-yellow-700 bg-yellow-900/20' : 'border-yellow-300 bg-yellow-50'}`}>
                  <p className="text-sm">
                    <strong>💛 Règle d&apos;or :</strong> 2 PNJ par biome, 120+ blocs entre villages, 
                    vérifie toujours que le biome est correct avant de construire.
                  </p>
                </div>
                <div className={`p-3 rounded-xl border mt-2 ${darkMode ? 'border-green-800 bg-green-900/20' : 'border-green-300 bg-green-50'}`}>
                  <p className="text-sm">
                    <strong>🟢 Astuce biomes hybrides :</strong> Un biome aimé peut prendre le dessus 
                    sur un biome détesté dans certaines zones de transition. Exemple : une maison à la 
                    frontière Forêt/Jungle peut compter comme Forêt si la majorité des blocs est forestière.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================== TAB: ORDRE ======================== */}
        {activeTab === 'ordre' && (
          <div>
            <h2 className={`font-kalam font-bold text-xl mb-4 ${darkMode ? 'text-amber-300' : 'text-amber-800'}`}>
              📋 Ordre conseillé de placement
            </h2>

            <div className={`rounded-xl border-2 p-5 ${cardBg}`}>
              <div className="space-y-4">
                {PHASE_ORDER.map((step) => (
                  <div key={step.phase} className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shrink-0 ${
                      darkMode ? 'bg-amber-600 text-white' : 'bg-amber-200 text-amber-800'
                    }`}>
                      {step.phase}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-kalam font-bold text-lg ${darkMode ? 'text-gray-200' : ''}`}>{step.label}</h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{step.desc}</p>
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full font-bold shrink-0 ${
                      step.phase <= 4 ? 'bg-green-100 text-green-700' : step.phase <= 6 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {step.phase <= 4 ? 'Débutant' : step.phase <= 6 ? 'Intermédiaire' : 'Avancé'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`mt-6 rounded-xl border-2 p-5 ${cardBg}`}>
              <h3 className={`font-kalam font-bold text-lg mb-2 ${darkMode ? 'text-gray-200' : ''}`}>
                🎯 Résumé des priorités
              </h3>
              <div className={`text-sm space-y-2 ${darkMode ? 'text-gray-300' : ''}`}>
                <p>🔥 <strong>Priorité absolue :</strong> Désert puis Neige (reforge + soins)</p>
                <p>⭐ <strong>Indispensables :</strong> Guide, Infirmière, Marchand d'armes, Dryade, Mécano, Gobelin bricoleur</p>
                <p>📡 <strong>Pylônes clés :</strong> Désert, Neige, Jungle, Forêt (ceux du début de partie)</p>
                <p>💡 <strong>Conseil :</strong> Construis les maisons au fur et à mesure que tu rencontres les PNJ. 
                Pas besoin d'attendre de tous les avoir.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}