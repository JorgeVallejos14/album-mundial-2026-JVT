const statusStyles = {
	tengo: {
		backgroundColor: '#d1fae5',
	},
	repetida: {
		backgroundColor: '#fef3c7',
	},
	falta: {
		backgroundColor: '#e5e7eb',
	},
}

function StickerCard({ number, name, group, status }) {
	return (
		<article
			style={{
				...statusStyles[status],
				border: '1px solid #cbd5e1',
				borderRadius: '12px',
				padding: '16px',
				minWidth: '180px',
				boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
			}}
		>
			<p style={{ margin: '0 0 8px', fontSize: '0.9rem', fontWeight: 700 }}>
				#{number}
			</p>
			<h3 style={{ margin: '0 0 8px', fontSize: '1.05rem' }}>{name}</h3>
			<p style={{ margin: 0, color: '#475569' }}>{group ?? 'Sin grupo'}</p>
		</article>
	)
}

export default StickerCard
