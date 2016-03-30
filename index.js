'use strict'

module.exports = function start(startTime) {
	if (typeof startTime == 'undefined')
		startTime = new Date().getTime()
	if (typeof startTime != 'number')
		throw new RangeError('The given start time is not a valid timestamp')

	return function projectedFinishTime(currentProgress, currentTime) {
		if (typeof currentTime == 'undefined')
			currentTime = new Date().getTime()

		if (typeof currentProgress != 'number' || currentProgress < 0 || currentProgress > 1)
			throw new RangeError('The given progress is not a valid number or is not in the accepted range [0, 1]: ' + currentProgress)
		if (typeof currentTime != 'number')
			throw new RangeError('The given current time is not a valid timestamp: ' + currentTime)

		var currentDuration = currentTime - startTime
		return startTime + (currentDuration / currentProgress)
	}
}
