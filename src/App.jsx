import { useEffect, useState } from 'react'
import { stickers } from './data/stickers.js'
import StickerCard from './components/StickerCard.jsx'
import AlbumSummary from './components/AlbumSummary.jsx'

const statusOrder = ['falta', 'tengo', 'repetida']
const STORAGE_KEY = 'album-mundial-2026-sticker-statuses'
const statusFilterLabels = {
	todas: 'Todas',
	tengo: 'Tengo',
	repetidas: 'Repetidas',
	faltan: 'Faltan',
}

const statusFilterToValue = {
	todas: null,
	tengo: 'tengo',
	repetidas: 'repetida',
	faltan: 'falta',
}

function App() {
	const [stickerStatuses, setStickerStatuses] = useState(() =>
		Object.fromEntries(stickers.map((sticker) => [sticker.id, 'falta'])),
	)
	const [isHydrated, setIsHydrated] = useState(false)
	const [searchText, setSearchText] = useState('')
	const [statusFilter, setStatusFilter] = useState('todas')

	useEffect(() => {
		const savedStatuses = localStorage.getItem(STORAGE_KEY)

		if (savedStatuses) {
			try {
				const parsedStatuses = JSON.parse(savedStatuses)
				setStickerStatuses((currentStatuses) => ({
					...currentStatuses,
					...parsedStatuses,
				}))
			} catch {
				localStorage.removeItem(STORAGE_KEY)
			}
		}

		setIsHydrated(true)
	}, [])

	useEffect(() => {
		if (!isHydrated) {
			return
		}

		localStorage.setItem(STORAGE_KEY, JSON.stringify(stickerStatuses))
	}, [isHydrated, stickerStatuses])

	const handleStatusChange = (id) => {
		setStickerStatuses((currentStatuses) => {
			const currentStatus = currentStatuses[id]
			const nextIndex = (statusOrder.indexOf(currentStatus) + 1) % statusOrder.length

			return {
				...currentStatuses,
				[id]: statusOrder[nextIndex],
			}
		})
	}

	const filteredStickers = stickers.filter((sticker) => {
		const search = searchText.trim().toLowerCase()
		const matchesSearch =
			search === '' ||
			sticker.name.toLowerCase().includes(search) ||
			String(sticker.id).includes(search)
		const activeStatus = statusFilterToValue[statusFilter]
		const stickerStatus = stickerStatuses[sticker.id]
		const matchesStatus = activeStatus === null || stickerStatus === activeStatus

		return matchesSearch && matchesStatus
	})

	return (
		<main style={{ padding: '24px', fontFamily: 'sans-serif' }}>
			<h1>Album Mundial 2026</h1>
			<AlbumSummary stickers={stickers} stickerStatuses={stickerStatuses} />

			<section style={{ display: 'grid', gap: '12px', marginBottom: '20px' }}>
				<label style={{ display: 'grid', gap: '6px', maxWidth: '360px' }}>
					<span>Buscar por nombre o número</span>
					<input
						type="text"
						value={searchText}
						onChange={(event) => setSearchText(event.target.value)}
						placeholder="Ej: Messi o 23"
						style={{ padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
					/>
				</label>

				<div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
					{Object.entries(statusFilterLabels).map(([key, label]) => (
						<button
							key={key}
							type="button"
							onClick={() => setStatusFilter(key)}
							style={{
								padding: '8px 12px',
								borderRadius: '999px',
								border: '1px solid #cbd5e1',
								backgroundColor: statusFilter === key ? '#0f172a' : '#ffffff',
								color: statusFilter === key ? '#ffffff' : '#0f172a',
								cursor: 'pointer',
							}}
						>
							{label}
						</button>
					))}
				</div>

				<p style={{ margin: 0, fontWeight: 700 }}>
					Mostrando {filteredStickers.length} figuritas
				</p>
			</section>

			<section style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
				{filteredStickers.map((sticker) => (
					<StickerCard
						key={sticker.id}
						number={sticker.id}
						name={sticker.name}
						group={sticker.group}
						status={stickerStatuses[sticker.id]}
						onStatusChange={handleStatusChange}
					/>
				))}
			</section>
			</main>
	)
}

export default App
