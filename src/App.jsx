import { useState } from 'react'
import { stickers } from './data/stickers.js'
import StickerCard from './components/StickerCard.jsx'

const statusOrder = ['falta', 'tengo', 'repetida']

const stickersToShow = stickers.slice(0, 5)

function App() {
	const [stickerStatuses, setStickerStatuses] = useState(() =>
		Object.fromEntries(stickersToShow.map((sticker) => [sticker.id, 'falta'])),
	)

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

	return (
		<main style={{ padding: '24px', fontFamily: 'sans-serif' }}>
			<h1>Album Mundial 2026</h1>
			<section style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}>
				{stickersToShow.map((sticker) => (
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
