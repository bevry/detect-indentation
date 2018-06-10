'use strict'

const joe = require('joe')
const { equal, errorEqual } = require('assert-helpers')
const detectIndentation = require('./')

joe.suite('detect-indentation', function (suite, test) {
	const tests = [
		{
			name: 'none',
			input: 'a\nb',
			output: null
		},
		{
			name: 'spaces: 0, 4',
			input: 'a\n    b',
			output: '    '
		},
		{
			name: 'spaces: 0, 4, 8',
			input: 'a\n    b\n        c',
			output: '    '
		},
		{
			name: 'spaces: 4, 4',
			input: '    a\n    b',
			output: '    '
		},
		{
			name: 'spaces: 4, 8',
			input: '    a\n        b',
			output: '    '
		},
		{
			name: 'spaces: 4, 0, 4',
			input: '    a\nb\n    c',
			output: '    '
		},
		{
			name: 'spaces: 8, 4, 8',
			input: '        a\n    b\n        c',
			output: '    '
		},
		{
			name: 'spaces: 4, 8, 4',
			input: '    a\n        b\n    c',
			output: '    '
		},
		{
			name: 'tabs: 0, 1',
			input: 'a\n\tb',
			output: '\t'
		},
		{
			name: 'tabs: 0, 1, 2',
			input: 'a\n\tb\n\t\tc',
			output: '\t'
		},
		{
			name: 'tabs: 1, 1',
			input: '\ta\n\tb',
			output: '\t'
		},
		{
			name: 'tabs: 1, 2',
			input: '\ta\n\t\tb',
			output: '\t'
		},
		{
			name: 'tabs: 1, 2, 1',
			input: '\ta\n\t\tb\n\tc',
			output: '\t'
		},
		{
			name: 'tabs: 1, 0, 1',
			input: '\ta\nb\n\tc',
			output: '\t'
		},
		{
			name: 'tabs: 2, 1, 2',
			input: '\t\ta\n\tb\n\t\tc',
			output: '\t'
		}
	]
	const errors = [
		{
			name: 'uneven: 2s, 3s',
			input: '  a\n   b',
			output: 'indentation is uneven: [  ] of size [2] vs [   ] of size [3]'
		},
		{
			name: 'uneven: 2t, 3t',
			input: '\t\ta\n\t\t\tb',
			output: 'indentation is uneven: [\t\t] of size [2] vs [\t\t\t] of size [3]'
		},
		{
			name: 'mixed: 4s, 2t',
			input: '    a\n\t\tb',
			output: 'mixed spaces and tabs'
		},
		{
			name: 'mixed: 2t, 4s',
			input: '    a\n\t\tb',
			output: 'mixed spaces and tabs'
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

	errors.forEach(function ({ name, input, output }) {
		test(name, function () {
			try {
				detectIndentation(input)
				throw new Error('test should have failed but it did not')
			}
			catch (error) {
				errorEqual(
					error,
					output,
					name
				)
			}
		})
	})
})
