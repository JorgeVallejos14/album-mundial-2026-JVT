function AlbumSummary({ stickers, stickerStatuses }) {
	const totalStickers = stickers.length
	const ownedStickers = Object.values(stickerStatuses).filter((status) => status === 'tengo').length
	const repeatedStickers = Object.values(stickerStatuses).filter((status) => status === 'repetida').length
	const missingStickers = Object.values(stickerStatuses).filter((status) => status === 'falta').length
	const completionPercentage = totalStickers === 0 ? 0 : Math.round(((ownedStickers + repeatedStickers) / totalStickers) * 100)

	return (
		<section
			style={{
				display: 'grid',
				gap: '12px',
				margin: '20px 0',
				padding: '16px',
				border: '1px solid #cbd5e1',
				borderRadius: '12px',
				backgroundColor: '#f8fafc',
			}}
		>
			<h2 style={{ margin: 0 }}>Resumen del álbum</h2>
			<p style={{ margin: 0 }}>Total de figuritas en el álbum: {totalStickers}</p>
			<p style={{ margin: 0 }}>Cuántas tiene el usuario: {ownedStickers}</p>
			<p style={{ margin: 0 }}>Cuántas están repetidas: {repeatedStickers}</p>
			<p style={{ margin: 0 }}>Cuántas faltan: {missingStickers}</p>
			<p style={{ margin: 0, fontWeight: 700 }}>Porcentaje de completitud: {completionPercentage}%</p>
		</section>
	)
}

export default AlbumSummary