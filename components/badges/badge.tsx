/** Badge */
export default function Badge(props: { title: string }) {
	const { title } = props
	return (
		<span class='inline-flex items-center bg-gray-100 dark:bg-gray-600 ring-gray-200 dark:ring-gray-600 text-gray-600 dark:text-gray-50 text-xs font-medium py-1 px-2 m-0 rounded-md ring-2 ring-inset'>
			{title}
		</span>
	)
}
