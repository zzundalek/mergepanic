import { assertEquals } from 'std/assert/mod.ts'
import { getCurrentVersionNumber, getNextVersionNumber } from './release.ts'

Deno.test('Test propose version number for 1.0.0', () => {
	assertEquals(getNextVersionNumber('1.0.0'), '1.1.0')
})

Deno.test('Test propose version number for 0.0.21', () => {
	assertEquals(getNextVersionNumber('0.0.21'), '0.1.0')
})

Deno.test('Test propose version number for 1.0.0.beta1', () => {
	assertEquals(getNextVersionNumber('1.0.0.beta1'), '1.0.0.beta1')
})

Deno.test('Test propose version number for 2.0.0-rc.2', () => {
	assertEquals(getNextVersionNumber('2.0.0-rc.2'), '2.0.0-rc.2')
})

Deno.test('Test get current version from changelog 1.1.0', () => {
	const changelog = `
		## [Unreleased]
		
		| Description | Type | Commit |
		| -- | -- | -- |
		| Add cookies consent ([#43](https://github.com/zzundalek/mergepanic/pull/43)) | feature | [5071e89a78dc231e45a9544869d0eefbe332f599](https://github.com/zzundalek/mergepanic/commit/5071e89a78dc231e45a9544869d0eefbe332f599) |
		| Fresh 1.5.4 and launch scripts upgrade ([#42](https://github.com/zzundalek/mergepanic/pull/42)) | feature | [984c0706897072fa10befc1a7d1ca730aba8e110](https://github.com/zzundalek/mergepanic/commit/984c0706897072fa10befc1a7d1ca730aba8e110) |

		## [1.1.0] - 2023-10-21
		
		| Description | Type | Commit |
		| -- | -- | -- |
		| Upgrade Fresh and add client side navigation ([#39](https://github.com/zzundalek/mergepanic/pull/39)) | feature | [49f33a78d27fdf6f6e2cfa514fc84cfda90df0e1](https://github.com/zzundalek/mergepanic/commit/49f33a78d27fdf6f6e2cfa514fc84cfda90df0e1) |

		## [1.0.0] - 2023-01-21

		| Description | Type | Commit |
		| -- | -- | -- |
		| Upgrade Fresh and add client side navigation ([#39](https://github.com/zzundalek/mergepanic/pull/39)) | feature | [49f33a78d27fdf6f6e2cfa514fc84cfda90df0e1](https://github.com/zzundalek/mergepanic/commit/49f33a78d27fdf6f6e2cfa514fc84cfda90df0e1) |
		| Add validation and readonly ([#37](https://github.com/zzundalek/mergepanic/pull/37)) | features | [9115826f1110775b8210a359a07d4185c0bf98d1](https://github.com/zzundalek/mergepanic/commit/9115826f1110775b8210a359a07d4185c0bf98d1) |
	`
	assertEquals(getCurrentVersionNumber(changelog), '1.1.0')
})

Deno.test('Test get current version from changelog 2.0.0-rc.2', () => {
	const changelog = `
		## [Unreleased]
		
		| Description | Type | Commit |
		| -- | -- | -- |
		| Add cookies consent ([#43](https://github.com/zzundalek/mergepanic/pull/43)) | feature | [5071e89a78dc231e45a9544869d0eefbe332f599](https://github.com/zzundalek/mergepanic/commit/5071e89a78dc231e45a9544869d0eefbe332f599) |
		| Fresh 1.5.4 and launch scripts upgrade ([#42](https://github.com/zzundalek/mergepanic/pull/42)) | feature | [984c0706897072fa10befc1a7d1ca730aba8e110](https://github.com/zzundalek/mergepanic/commit/984c0706897072fa10befc1a7d1ca730aba8e110) |

		## [2.0.0-rc.2] - 2023-10-21
		
		| Description | Type | Commit |
		| -- | -- | -- |
		| Upgrade Fresh and add client side navigation ([#39](https://github.com/zzundalek/mergepanic/pull/39)) | feature | [49f33a78d27fdf6f6e2cfa514fc84cfda90df0e1](https://github.com/zzundalek/mergepanic/commit/49f33a78d27fdf6f6e2cfa514fc84cfda90df0e1) |

		## [1.0.0] - 2023-01-21

		| Description | Type | Commit |
		| -- | -- | -- |
		| Upgrade Fresh and add client side navigation ([#39](https://github.com/zzundalek/mergepanic/pull/39)) | feature | [49f33a78d27fdf6f6e2cfa514fc84cfda90df0e1](https://github.com/zzundalek/mergepanic/commit/49f33a78d27fdf6f6e2cfa514fc84cfda90df0e1) |
		| Add validation and readonly ([#37](https://github.com/zzundalek/mergepanic/pull/37)) | features | [9115826f1110775b8210a359a07d4185c0bf98d1](https://github.com/zzundalek/mergepanic/commit/9115826f1110775b8210a359a07d4185c0bf98d1) |
	`
	assertEquals(getCurrentVersionNumber(changelog), '2.0.0-rc.2')
})

Deno.test('Test get current version from changelog 2.0.1-beta.0', () => {
	const changelog = `
		## [Unreleased]
		
		| Description | Type | Commit |
		| -- | -- | -- |
		| Add cookies consent ([#43](https://github.com/zzundalek/mergepanic/pull/43)) | feature | [5071e89a78dc231e45a9544869d0eefbe332f599](https://github.com/zzundalek/mergepanic/commit/5071e89a78dc231e45a9544869d0eefbe332f599) |
		| Fresh 1.5.4 and launch scripts upgrade ([#42](https://github.com/zzundalek/mergepanic/pull/42)) | feature | [984c0706897072fa10befc1a7d1ca730aba8e110](https://github.com/zzundalek/mergepanic/commit/984c0706897072fa10befc1a7d1ca730aba8e110) |

		## [2.0.1-beta.0] - 2023-10-21
		
		| Description | Type | Commit |
		| -- | -- | -- |
		| Upgrade Fresh and add client side navigation ([#39](https://github.com/zzundalek/mergepanic/pull/39)) | feature | [49f33a78d27fdf6f6e2cfa514fc84cfda90df0e1](https://github.com/zzundalek/mergepanic/commit/49f33a78d27fdf6f6e2cfa514fc84cfda90df0e1) |

		## [1.0.0] - 2023-01-21

		| Description | Type | Commit |
		| -- | -- | -- |
		| Upgrade Fresh and add client side navigation ([#39](https://github.com/zzundalek/mergepanic/pull/39)) | feature | [49f33a78d27fdf6f6e2cfa514fc84cfda90df0e1](https://github.com/zzundalek/mergepanic/commit/49f33a78d27fdf6f6e2cfa514fc84cfda90df0e1) |
		| Add validation and readonly ([#37](https://github.com/zzundalek/mergepanic/pull/37)) | features | [9115826f1110775b8210a359a07d4185c0bf98d1](https://github.com/zzundalek/mergepanic/commit/9115826f1110775b8210a359a07d4185c0bf98d1) |
	`
	assertEquals(getCurrentVersionNumber(changelog), '2.0.1-beta.0')
})

Deno.test('Test get current version from invalid changelog', () => {
	const changelog = `
		## [Unreleased]
		
		| Description | Type | Commit |
		| -- | -- | -- |
		| Add cookies consent ([#43](https://github.com/zzundalek/mergepanic/pull/43)) | feature | [5071e89a78dc231e45a9544869d0eefbe332f599](https://github.com/zzundalek/mergepanic/commit/5071e89a78dc231e45a9544869d0eefbe332f599) |
		| Fresh 1.5.4 and launch scripts upgrade ([#42](https://github.com/zzundalek/mergepanic/pull/42)) | feature | [984c0706897072fa10befc1a7d1ca730aba8e110](https://github.com/zzundalek/mergepanic/commit/984c0706897072fa10befc1a7d1ca730aba8e110) |
	`
	assertEquals(getCurrentVersionNumber(changelog), null)
})
