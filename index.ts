const normalizeToTime = (time?: Date | number) => {
  const timeOrNow = time ?? new Date().getTime();
  return typeof timeOrNow === "number" ? timeOrNow : timeOrNow.getTime();
};

function makePredictor(startTime?: Date | number) {
  const normalizedStartTime = normalizeToTime(startTime);

  return function computeProjectedFinishTime(
    currentProgress: number,
    currentTime?: Date | number,
  ) {
    const normalizedCurrentTime = normalizeToTime(currentTime);

    if (currentProgress < 0 || currentProgress > 1)
      throw new RangeError(
        `The given progress is not a valid number or is not in the accepted range [0, 1]: ${currentProgress}`,
      );

    const currentDuration = normalizedCurrentTime - normalizedStartTime;
    return normalizedStartTime + currentDuration / currentProgress;
  };
}
export default makePredictor;
