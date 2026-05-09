export function calculateElapsed(segments: any[]) {
  let total = 0;

  for (const segment of segments) {
    // 종료된 세그먼트
    if (segment.end_time) {
      total += segment.end_time - segment.start_time;
    }

    // 현재 진행중 세그먼트
    else {
      total += Date.now() - segment.start_time;
    }
  }

  return total;
}
