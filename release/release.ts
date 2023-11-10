async function readChangelog(): Promise<string> {
	const changelog = await Deno.readTextFile('../CHANGELOG.md')
	return changelog
}

async function readChangelogHeader(): Promise<string> {
	const changelog = await Deno.readTextFile('./unreleasedHeader.md')
	return changelog
}

/** Returns lates version from @changelogText . Returns null on parsing error.  */
function getCurrentVersionNumber(changelogText: string): string | null {
	const result = changelogText.match(
		/##\s\[(?<currentVersionNumber>[a-z\d\.\-]+)\] - [\d\-]+/,
	)
	return result?.groups?.currentVersionNumber ?? null
}

function updateChangelogText(changelogText: string, newVersion: string, header: string) {
	const releaseDate = new Date()
	const releaseDateInIsoFormat = releaseDate.toISOString().split('T')[0]
	const updatedText = changelogText.replace(
		/(##\s\[)(Unreleased)(\])/,
		`${header}\n$1${newVersion}$3 - ${releaseDateInIsoFormat}`,
	)

	return updatedText
}

/** Propose new version number for @versionNumber */
function getNextVersionNumber(versionNumber: string): string {
	const separateNumbers = versionNumber.split('.')
	const numberCount = separateNumbers.length

	switch (numberCount) {
		case 3:
			separateNumbers[1] = (Number(separateNumbers[1]) + 1).toString()
			break
		default:
			console.warn(`Unable to propose new version number for ${versionNumber}`)
			break
	}

	return separateNumbers.join('.')
}

async function updateChangelogForNewRelease() {
	const [changelog, newChangelogHeader] = await Promise.all([
		readChangelog(),
		readChangelogHeader(),
	])

	const currentVersionNumber = getCurrentVersionNumber(changelog)

	if (currentVersionNumber == null) {
		console.error('Invalid current version number')
		return
	}

	const proposedNextVersionNumber = getNextVersionNumber(currentVersionNumber)

	const nextVersionNumber = prompt(
		`Insert new release version (current is ${currentVersionNumber})`,
		proposedNextVersionNumber,
	)

	if (nextVersionNumber == null) {
		console.error('Invalid version number')
		return
	}

	const shouldProceed = confirm(
		`Do you want to release new version '${nextVersionNumber}'?`,
	)

	if (!shouldProceed) return

	const updatedChangelogText = updateChangelogText(
		changelog,
		nextVersionNumber,
		newChangelogHeader,
	)

	await Deno.writeTextFile('../CHANGELOG.md', updatedChangelogText)

	console.log(`Successfuly updated to '${nextVersionNumber}'`)
}

export {
	getCurrentVersionNumber,
	getNextVersionNumber,
	readChangelog,
	readChangelogHeader,
	updateChangelogForNewRelease,
	updateChangelogText,
}
