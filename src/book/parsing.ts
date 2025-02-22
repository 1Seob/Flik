import * as fs from 'fs';

export function parsing(fileName: string): string[] {
  //--------------------------
  // 0) 파라미터 설정
  //--------------------------
  const FILE_PATH: string = fileName; // 실제 파일 경로
  const MIN_LEN: number = 1000; // 최소 문자수
  const MAX_LEN: number = 1200; // 최대 문자수
  const START_RATIO: number = 0.1;
  const END_RATIO: number = 0.9;

  //--------------------------
  // 1) 파일 읽기
  //--------------------------
  // fs.readFileSync의 결과를 string으로 처리할 것이므로 'utf-8' 옵션 지정
  let rawText: string = fs.readFileSync(FILE_PATH, 'utf-8');
  //--------------------------
  // 2) 줄 단위로 읽어, 빈 줄이 나오면 문단 구분
  //--------------------------
  const lines: string[] = rawText.replace(/\r\n/g, '\n').split('\n');

  // 문단을 담을 배열
  let paragraphs: string[] = [];
  // 현재 문단을 임시 저장할 배열
  let bufferArr: string[] = [];

  for (const line of lines) {
    const trimmed: string = line.trim();
    if (trimmed === '') {
      // 빈 줄 => 문단 구분
      if (bufferArr.length > 0) {
        // bufferArr에 모은 줄들을 합쳐 하나의 문단
        paragraphs.push(bufferArr.join(' '));
        bufferArr = [];
      }
    } else {
      // 빈 줄이 아니면 계속 같은 문단에 합침
      bufferArr.push(trimmed);
    }
  }
  // 파일 끝까지 돌고 나서 남은 줄이 있으면 마지막 문단으로 추가
  if (bufferArr.length > 0) {
    paragraphs.push(bufferArr.join(' '));
  }

  //--------------------------
  // 3) 중간 구간만 사용
  //--------------------------
  const startIdx: number = Math.floor(paragraphs.length * START_RATIO);
  const endIdx: number = Math.floor(paragraphs.length * END_RATIO);
  paragraphs = paragraphs.slice(startIdx, endIdx);

  //--------------------------
  // 4) 짧은 문단 합치기 / 긴 문단 제외
  //--------------------------
  const mergedParagraphs: string[] = [];
  let buffer: string = '';

  for (let i = 0; i < paragraphs.length; i++) {
    const current: string = paragraphs[i];
    const curLen: number = current.length;

    // (A) 너무 긴 문단(> MAX_LEN) => 제외
    if (curLen > MAX_LEN) {
      // 버퍼가 적당한 길이면 push
      if (buffer.length >= MIN_LEN && buffer.length <= MAX_LEN) {
        mergedParagraphs.push(buffer);
      }
      buffer = '';
      continue;
    }

    // (B) 적당한 길이 범위(MIN_LEN ~ MAX_LEN)에 있는 문단
    if (curLen >= MIN_LEN && curLen <= MAX_LEN) {
      if (!buffer) {
        // 버퍼가 비어있으면 바로 추가
        mergedParagraphs.push(current);
      } else {
        // 버퍼와 합치면 길이 확인
        const combined: string = buffer + ' ' + current;
        if (combined.length <= MAX_LEN) {
          mergedParagraphs.push(combined);
        } else {
          // 합치면 초과된다면, 먼저 버퍼만 저장
          if (buffer.length >= MIN_LEN) {
            mergedParagraphs.push(buffer);
          }
          // 현재 문단은 따로 추가
          mergedParagraphs.push(current);
        }
        // 버퍼 비움
        buffer = '';
      }
    }
    // (C) 너무 짧은 문단(< MIN_LEN) => 버퍼에 합치기
    else {
      if (!buffer) {
        buffer = current;
      } else {
        const temp: string = buffer + ' ' + current;
        if (temp.length <= MAX_LEN) {
          buffer = temp;
        } else {
          // 합치면 초과 => 버퍼가 적정 길이면 push
          if (buffer.length >= MIN_LEN && buffer.length <= MAX_LEN) {
            mergedParagraphs.push(buffer);
          }
          // 그리고 새 버퍼 설정
          buffer = current.length <= MAX_LEN ? current : '';
        }
      }

      // 합친 결과가 적정 길이면 push 후 버퍼 비움
      if (buffer.length >= MIN_LEN && buffer.length <= MAX_LEN) {
        mergedParagraphs.push(buffer);
        buffer = '';
      }
    }
  }

  // 루프 끝나고 남은 버퍼 처리
  if (buffer.length >= MIN_LEN && buffer.length <= MAX_LEN) {
    mergedParagraphs.push(buffer);
  }

  return mergedParagraphs;
}
