export default function formatStastCount(count) {
  const strNum = count.toLocaleString("en-US").split(",");

  let countFormated = "";

  /* MIllion */
  if (count >= 1000000) {
    const [million, k] = strNum;
    countFormated = `${million},${k.slice(0, 2)}M`;
    return countFormated;
  }
  /* K */
  if (count >= 100000) {
    const [k] = strNum;
    countFormated = `${k}K`;
    return countFormated;
  }

  return count;
}
