'use strict'

/**
 * Detects indentation of the source string
 * @param {string} source
 * @returns {string}
 */
function detectIndentation (source) {
	const result = (/\n([ \t]*)\S/m).exec(source)
	const indentation = (result && result[1]) || ''
	return indentation
}

module.exports = detectIndentation
