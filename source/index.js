'use strict'

const indentationSpacesRegex = /^(\x20+)/gm
const indentationTabsRegex = /^(\t+)/gm

/**
 * Detects indentation of the source string
 * @param {string} source
 * @returns {string|null}
 * @throws {error} mixed spaces and tabs
 * @throws {error} indentation is uneven: [W] of size [X] vs [Y] of size [Z]
 */
function detectIndentation (source) {
	const spaces = source.match(indentationSpacesRegex)
	const tabs = source.match(indentationTabsRegex)

	// validate is indented
	if (!spaces && !tabs) return null

	// validate pure
	if (spaces && tabs) throw new Error('mixed spaces and tabs')

	// validate sizes
	const indentations = (spaces || tabs).sort((a, b) => a.length - b.length)
	for (let i = 1; i < indentations.length; i++) {
		const lastIndentation = indentations[i - 1]
		const indentation = indentations[i]
		const lastSize = lastIndentation.length
		const size = indentation.length
		if ((size % lastSize) !== 0) {
			throw new Error(`indentation is uneven: [${lastIndentation}] of size [${lastSize}] vs [${indentation}] of size [${size}]`)
		}
	}

	// return the smallest size, that the others are divisble by
	return indentations[0]
}

module.exports = detectIndentation
