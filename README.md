# Purion XE Module Parts Catalog

GitHub Pages에서 바로 배포할 수 있는 정적 웹사이트입니다. 빌드 도구나 서버가 필요하지 않습니다.

## 포함 기능
- SOURCE / LE / LINAC / HEB / CORRECTOR / CHAMBER / ENDSTATION / LOADPORT 8개 모듈 탐색
- 장비 개념도 위 모듈 영역에 마우스를 올리면 해당 모듈과 파트 목록이 강조/전환됨; 클릭 및 키보드 선택 지원
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
