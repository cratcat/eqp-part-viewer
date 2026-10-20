# Purion XE Module Parts Catalog

GitHub Pages에서 바로 배포할 수 있는 정적 웹사이트입니다. 빌드 도구나 서버가 필요하지 않습니다.

## 포함 기능
- SOURCE / LE / LINAC / HEB / CORRECTOR / CHAMBER / ENDSTATION / LOADPORT 8개 모듈 탐색
- 장비 사진(`assets/equipment.png`) 위 모듈에 마우스를 올리면 중분류 목록이 부드럽게 나타나고, 중분류를 클릭하면 소분류(파트) 팝업이 열림 (파트 행 클릭 시 상세 펼침, Esc/바깥 클릭으로 닫기, 터치·키보드 지원)
- 파트 리스트 열: 파트명 / 큐코드(코드·국산화·Maker사) / 재고 / 입고 예정 일자 / 담당자 연락처 / 보장재고(수량·보장재고 담당자)
- 모듈별 중카테고리 및 파트 후보 목록
- 파트명·한국어 명칭·설명 검색
- 중카테고리 필터, 전체 펼치기/접기, 설명 표시 전환
- 현재 모듈의 JSON 내보내기
- 모바일 반응형 레이아웃

## GitHub Pages 배포
1. ZIP을 풀고 `index.html`, `styles.css`, `data.js`, `app.js`, `README.md` 파일을 확인합니다.
2. GitHub에서 새 저장소(repository)를 생성합니다.
3. 위 파일을 저장소의 최상위(root)에 업로드합니다. `index.html`이 최상위에 있어야 합니다.
4. 저장소의 **Settings → Pages**로 이동합니다.
5. **Build and deployment → Deploy from a branch**를 선택합니다.
6. Branch를 `main`, 폴더를 `/(root)`로 설정하고 **Save**를 누릅니다.
7. 배포 완료 후 Pages 화면에 표시되는 URL로 접속합니다.

## 데이터 수정
`data.js`의 `window.PURION_DATA`에서 모듈별 `categories`와 `parts`를 수정합니다.
각 파트 항목은 다음 형식입니다.

```js
["English part name", "한국어 명칭", "기능·분류 메모", "일반 구조 후보 또는 검증 상태"]
```

## 기술적 주의사항
장비 그림은 모듈 간 탐색을 위한 **개념도**이며 실제 Purion XE 외관·내부 배치·모듈 경계를 재현한 제조사 도면이 아닙니다. 이 사이트의 파트명은 **공식 Axcelis Purion XE BOM/서비스 파트 리스트가 아닙니다.** 공개적으로 일반화 가능한 이온주입기 구성과 사용자가 지정한 모듈명을 바탕으로 만든 후보 분류입니다. 일부 부품은 실제 Purion XE에 없거나 모듈 경계가 다를 수 있습니다. LE/HEB의 공식 약어 의미와 정확한 구성도 모델·옵션·현장 표준으로 확인하세요. 정비·구매·안전 작업에 사용하기 전에 장비 Serial/Configuration에 해당하는 관리본 문서와 대조해야 합니다.


## 사진 위 hover 영역 조정
`index.html`의 `<svg class="hotspots">` 안 `<polygon points="x,y x,y ...">` 좌표(사진 원본 517×496 기준)를 수정합니다.
주소 뒤에 `?debug`를 붙이면 영역이 빨갛게 표시되어 위치 맞추기 쉽습니다. (LE / LOADPORT는 사진에 없어 hover 영역이 없고, 왼쪽 모듈 목록에서 선택합니다.)

## 재고 서버 연동 (`inventory.js`)
1. `INVENTORY_CONFIG.endpoint`에 재고 API 주소를 입력합니다. 요청: `GET {endpoint}?module=linac`
2. 응답 예시:
```json
{ "items": [ { "qcode": "Q1234567", "partName": "Arc chamber / discharge chamber", "localized": true, "maker": "Maker A",
  "stock": 3, "eta": "2026-11-03", "contact": "내선 3001", "guaranteedStock": 2, "guaranteedOwner": "홍길동" } ] }
```
서버 필드명이 다르면 `fieldMap`의 오른쪽 값만 바꾸면 됩니다.
3. 매칭: `window.PART_QCODES`에 (영문 파트명 → 큐코드)를 채우면 큐코드로, 없으면 `partName`으로 매칭합니다.
4. 주소 뒤에 `?demo`를 붙이면 화면 확인용 샘플 값이 표시됩니다.

**보안 주의:** GitHub Pages는 공개 사이트입니다. 재고·담당자 연락처가 노출되지 않도록, 실제 연동 시에는 사내 서버/비공개 호스팅에서 서비스하고 API에 인증과 CORS 제한을 적용하세요.
