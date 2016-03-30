'use strict'

var assert = require('assert')
var finale = require('./index')

describe('finale', function () {
	it('should project the finishing time correctly', function (done) {
		var projector = finale()
		setTimeout(function () {
			var projectedFinish = projector(0.5)
			var correctProjection = new Date().getTime() + 100

			try {
				assert.ok(Math.abs(projectedFinish - correctProjection) < 50)
				done()
			} catch (e) {
				done(e)
			}
		}, 100)
	})

	it('should take a time as a parameter', function (done) {
		var start = new Date().getTime() - 100
		var projector = finale(start)
		setTimeout(function () {
			var projectedFinish = projector(0.5)
			var correctProjection = start + 400

			try {
				assert.ok(Math.abs(projectedFinish - correctProjection) < 50)
				done()
			} catch (e) {
				done(e)
			}
		}, 100)
	})

	it('should give an error if the start time is not a number', function () {
		assert.throws(function () {
			finale('I am not a number')
		}, /start time/)
	})

	it('should give an error if progress is not a number', function () {
		assert.throws(function () {
			finale()('I am not a number')
		}, /progress/)
	})

	it('should give an error if progress is not in the accepted range', function () {
		assert.throws(function () {
			finale()(-1)
		}, /progress/)

		assert.throws(function () {
			finale()(2)
		}, /progress/)
	})

	it('should give an error if current time is not a number', function () {
		assert.throws(function () {
			finale()(0, 'I am not a number')
		}, /current time/)
	})
})
