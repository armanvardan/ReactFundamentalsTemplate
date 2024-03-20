export const getCourseDuration = (duration) => {
  duration = parseInt(duration);
  if (duration >= 60) {
    let hour = Math.floor(duration / 60);
    const hourText = hour === 1 ? "hour" : "hours";
    let min = duration - hour * 60;
    if (min < 10) {
      min = "0" + min;
    }
    if (hour < 10) {
      hour = "0" + hour;
    }
    duration = hour + ":" + min + " " + hourText;
  } else {
    if (duration < 10) {
      duration = "00:0" + duration + " hours";
    } else {
      duration = "00:" + duration + " hours";
    }
  }
  return duration;
};
