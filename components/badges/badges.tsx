import Badge from './badge.tsx'

/** Badges */
export default function Badges(props: { badges: string[] }) {
	const { badges } = props
	return (
		<div class='flex gap-2'>
			{badges.map((badge) => <Badge title={badge}></Badge>)}
		</div>
	)
}
