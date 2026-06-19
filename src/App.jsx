import { stickers } from './data/stickers.js'
import StickerCard from './components/StickerCard.jsx'

const stickerStatus = ['tengo', 'repetida', 'falta', 'tengo', 'repetida']

const stickersToShow = stickers.slice(0, 5).map((sticker, index) => ({
	...sticker,
	status: stickerStatus[index],
}))

function App() {
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
						status={sticker.status}
					/>
				))}
			</section>
		</main>
	)
}

export default App
