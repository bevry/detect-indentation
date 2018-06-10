'use strict'

const joe = require('joe')
const { equal } = require('assert-helpers')
const detectIndentation = require('./')

joe.suite('detect-indentation', function (suite, test) {
	const tests = [
		{
			name: '4 spaces from start',
			input: '    a\n    b',
			output: '    '
		},
		{
			name: '4 spaces from later',
			input: 'a\n    b',
			output: '    '
		},
		{
			name: '1 tab from start',
			input: '\ta\n\tb',
			output: '\t'
		},
		{
			name: '1 tab from later',
			input: 'a\n\tb',
			output: '\t'
		},
		{
			name: 'mixed 1 and 2 tabs - double first',
			input: 'a\n\t\tb\n\tc',
			output: '\t\t'
		},
		{
			name: 'mixed 1 and 2 tabs - single first',
			input: 'a\n\tb\n\t\tc',
			output: '\t'
		},
		{
			name: 'mixed tabs and 4 spaces - tab first',
			input: 'a\n\tb\n    c',
			output: '\t'
		},
		{
			name: 'mixed tabs and 4 spaces - 4 spaces first',
			input: 'a\n    b\n\tc',
			output: '    '
		},
		{
			name: 'no indentation',
			input: 'a',
			output: ''
		}
	]
	tests.forEach(function ({ name, input, output }) {
		test(name, function () {
			equal(
				detectIndentation(input),
				output,
				name
			)
		})
	})
})
