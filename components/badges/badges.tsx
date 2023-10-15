import Badge from './badge.tsx'

export interface BadgeProps {
	badges: readonly string[]
}

/** Badges */
export default function Badges(props: BadgeProps) {
	const { badges } = props
	return (
		<div class='flex gap-2'>
			{badges.map((badge) => <Badge title={badge}></Badge>)}
		</div>
	)
}
