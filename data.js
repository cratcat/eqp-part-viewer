/* 초기 후보 데이터: 실제 Purion XE 공식 BOM이 아니며 모델별 검증이 필요합니다. */
window.PURION_DATA = {
  "source": {
    "number": "01",
    "name": "SOURCE",
    "ko": "소스",
    "eyebrow": "ION GENERATION",
    "description": "도펀트 이온을 생성하고 빔라인으로 추출하는 영역",
    "categories": [
      {
        "name": "Ion Source Assembly",
        "ko": "이온 소스 어셈블리",
        "icon": "IS",
        "parts": [
          [
            "Ion source body / chamber",
            "소스 본체·챔버",
            "이온 생성 영역의 본체 및 내부 구성품",
            "일반 구조 후보"
          ],
          [
            "Arc chamber / discharge chamber",
            "아크 챔버·방전 챔버",
            "플라즈마 방전이 형성되는 챔버",
            "모델별 확인"
          ],
          [
            "Filament / cathode",
            "필라멘트·캐소드",
            "전자 방출 및 방전 유지 관련 부품",
            "모델별 확인"
          ],
          [
            "Cathode insulator",
            "캐소드 절연체",
            "전기적 절연 및 지지",
            "모델별 확인"
          ],
          [
            "Repeller / anti-cathode",
            "리펠러·반대전극",
            "방전 영역 내 전자 거동에 관여할 수 있는 전극",
            "모델별 확인"
          ],
          [
            "Source aperture / extraction electrode",
            "소스 개구·추출 전극",
            "이온 추출부의 개구 및 전극",
            "모델별 확인"
          ]
        ]
      },
      {
        "name": "Gas & Feed System",
        "ko": "가스·공급 계통",
        "icon": "GF",
        "parts": [
          [
            "Gas inlet / feed line",
            "가스 인렛·공급 라인",
            "도펀트 가스 또는 공급 물질의 유입 경로",
            "일반 구조 후보"
          ],
          [
            "Gas valve / isolation valve",
            "가스 밸브·차단 밸브",
            "가스 공급 및 격리",
            "모델별 확인"
          ],
          [
            "MFC / flow controller",
            "질량 유량 제어기",
            "가스 유량 설정·제어",
            "옵션 확인"
          ],
          [
            "Gas fitting / seal",
            "가스 피팅·씰",
            "배관 연결 및 기밀 유지",
            "일반 구조 후보"
          ]
        ]
      },
      {
        "name": "Source Power & Cooling",
        "ko": "소스 전원·냉각",
        "icon": "PC",
        "parts": [
          [
            "Source power supply",
            "소스 전원 공급기",
            "소스 방전 및 전극 구동 전원",
            "모델별 확인"
          ],
          [
            "Arc power cable / connector",
            "아크 전원 케이블·커넥터",
            "전력 공급 연결부",
            "일반 구조 후보"
          ],
          [
            "Cooling water line / fitting",
            "냉각수 라인·피팅",
            "소스 열 제거용 냉각 경로",
            "모델별 확인"
          ],
          [
            "Temperature sensor / interlock",
            "온도 센서·인터록",
            "과열 감시 및 보호",
            "옵션 확인"
          ]
        ]
      },
      {
        "name": "Source Service Parts",
        "ko": "소스 소모·정비품",
        "icon": "SP",
        "parts": [
          [
            "Source liner / shield",
            "소스 라이너·실드",
            "내부 표면 보호 및 오염 관리",
            "모델별 확인"
          ],
          [
            "Seal / O-ring",
            "씰·오링",
            "진공 또는 가스 계통의 기밀 유지",
            "일반 구조 후보"
          ],
          [
            "Insulator set",
            "절연체 세트",
            "전극 및 고전압 부품 절연",
            "모델별 확인"
          ],
          [
            "Source maintenance kit",
            "소스 정비 키트",
            "PM 시 교체 부품 묶음",
            "키트 구성 확인"
          ]
        ]
      }
    ]
  },
  "le": {
    "number": "02",
    "name": "LE",
    "ko": "LE 구간",
    "eyebrow": "LOW-ENERGY / FRONT-END BEAMLINE",
    "description": "사용자 지정 LE 모듈. 정확한 약어 정의와 모듈 경계는 현장 구성도 기준으로 확인 필요",
    "categories": [
      {
        "name": "Extraction & Acceleration",
        "ko": "추출·초기 가속",
        "icon": "EX",
        "parts": [
          [
            "Extraction electrode",
            "추출 전극",
            "소스에서 이온빔을 추출하는 전극",
            "모델별 확인"
          ],
          [
            "Suppressor electrode",
            "서프레서 전극",
            "전자 역류 억제 등에 사용될 수 있는 전극",
            "모델별 확인"
          ],
          [
            "Extraction power supply",
            "추출 전원 공급기",
            "추출 전극 전압 공급",
            "옵션 확인"
          ],
          [
            "Insulator / ceramic spacer",
            "절연체·세라믹 스페이서",
            "전극 간 절연 및 간격 유지",
            "일반 구조 후보"
          ]
        ]
      },
      {
        "name": "Beam Optics",
        "ko": "빔 광학",
        "icon": "BO",
        "parts": [
          [
            "Einzel lens / focusing electrode",
            "아인젤 렌즈·집속 전극",
            "빔 포커싱 또는 발산 제어용 구성품",
            "모델별 확인"
          ],
          [
            "Steering electrode",
            "스티어링 전극",
            "빔 궤적 미세 조정",
            "옵션 확인"
          ],
          [
            "Aperture / slit",
            "어퍼처·슬릿",
            "빔 형상 또는 수용 각도 제한",
            "모델별 확인"
          ],
          [
            "Beamline bracket / alignment mount",
            "빔라인 브래킷·정렬 마운트",
            "광학 요소의 위치 정렬 및 지지",
            "일반 구조 후보"
          ]
        ]
      },
      {
        "name": "Vacuum & Diagnostics",
        "ko": "진공·진단",
        "icon": "VD",
        "parts": [
          [
            "Vacuum gauge",
            "진공 게이지",
            "압력 상태 감시",
            "모델별 확인"
          ],
          [
            "Vacuum valve",
            "진공 밸브",
            "구간 격리 및 진공 제어",
            "모델별 확인"
          ],
          [
            "Beam current pickup / cup",
            "빔 전류 픽업·컵",
            "빔 전류 측정에 사용될 수 있는 진단 부품",
            "옵션 확인"
          ],
          [
            "Feedthrough / electrical connector",
            "피드스루·전기 커넥터",
            "진공 경계를 통과하는 전기 연결",
            "일반 구조 후보"
          ]
        ]
      }
    ]
  },
  "linac": {
    "number": "03",
    "name": "LINAC",
    "ko": "선형 가속기",
    "eyebrow": "RF LINEAR ACCELERATOR",
    "description": "RF 전기장을 이용해 이온을 고에너지로 가속하는 구간",
    "categories": [
      {
        "name": "RF Power System",
        "ko": "RF 전력 계통",
        "icon": "RF",
        "parts": [
          [
            "RF generator / amplifier",
            "RF 발생기·증폭기",
            "LINAC 가속 구조에 RF 전력 공급",
            "모델별 확인"
          ],
          [
            "RF matching network",
            "RF 매칭 네트워크",
            "전력 전달 조건 조정",
            "모델별 확인"
          ],
          [
            "RF cable / coaxial assembly",
            "RF 케이블·동축 어셈블리",
            "RF 전력 전달",
            "일반 구조 후보"
          ],
          [
            "RF coupler / feed assembly",
            "RF 커플러·피드 어셈블리",
            "가속 구조로 RF 전력을 결합",
            "모델별 확인"
          ]
        ]
      },
      {
        "name": "LINAC Accelerator Structure",
        "ko": "LINAC 가속 구조",
        "icon": "LA",
        "parts": [
          [
            "LINAC cavity / accelerating structure",
            "LINAC 캐비티·가속 구조",
            "RF 전기장 형성 및 이온 가속",
            "모델별 확인"
          ],
          [
            "Drift tube / accelerating electrode",
            "드리프트 튜브·가속 전극",
            "가속 구조 내부의 이온 통과·위상 동기 관련 요소",
            "구조별 확인"
          ],
          [
            "Resonator / cavity assembly",
            "공진기·캐비티 어셈블리",
            "RF 공진 조건 유지",
            "모델별 확인"
          ],
          [
            "Vacuum housing / beam tube",
            "진공 하우징·빔 튜브",
            "가속 구간 진공 경계 및 빔 통로",
            "모델별 확인"
          ]
        ]
      },
      {
        "name": "RF Tuning & Control",
        "ko": "RF 튜닝·제어",
        "icon": "TC",
        "parts": [
          [
            "RF tuner / tuning actuator",
            "RF 튜너·튜닝 액추에이터",
            "공진 조건 조정에 사용될 수 있는 구성품",
            "모델별 확인"
          ],
          [
            "Phase / amplitude monitor",
            "위상·진폭 모니터",
            "RF 상태 계측",
            "옵션 확인"
          ],
          [
            "Cooling circuit / flow sensor",
            "냉각 회로·유량 센서",
            "RF 구조 열관리",
            "모델별 확인"
          ],
          [
            "Interlock / arc detector",
            "인터록·아크 검출기",
            "보호 및 이상 상태 검출",
            "모델별 확인"
          ]
        ]
      },
      {
        "name": "LINAC Vacuum & Mechanical",
        "ko": "LINAC 진공·기구",
        "icon": "VM",
        "parts": [
          [
            "Vacuum pump interface",
            "진공 펌프 인터페이스",
            "가속 구간 진공 유지 계통 연결",
            "모델별 확인"
          ],
          [
            "Vacuum seal / flange",
            "진공 씰·플랜지",
            "진공 경계 결합",
            "일반 구조 후보"
          ],
          [
            "Support frame / alignment hardware",
            "지지 프레임·정렬 하드웨어",
            "가속 구조 지지 및 정렬",
            "모델별 확인"
          ]
        ]
      }
    ]
  },
  "heb": {
    "number": "04",
    "name": "HEB",
    "ko": "고에너지 빔 구간",
    "eyebrow": "HIGH-ENERGY BEAMLINE",
    "description": "사용자 지정 HEB 모듈. 약어의 공식 정의 및 LINAC·Corrector와의 경계는 장비 도면으로 확인 필요",
    "categories": [
      {
        "name": "High-Energy Beam Transport",
        "ko": "고에너지 빔 수송",
        "icon": "BT",
        "parts": [
          [
            "High-energy beam tube / duct",
            "고에너지 빔 튜브·덕트",
            "가속된 이온빔의 수송 경로",
            "모델별 확인"
          ],
          [
            "Beamline flange / vacuum joint",
            "빔라인 플랜지·진공 조인트",
            "진공 구간 연결",
            "일반 구조 후보"
          ],
          [
            "Beamline support / alignment mount",
            "빔라인 지지대·정렬 마운트",
            "수송 경로 기계적 정렬",
            "모델별 확인"
          ],
          [
            "Insulating break / feedthrough",
            "절연 브레이크·피드스루",
            "전기적 분리 또는 신호 통과",
            "옵션 확인"
          ]
        ]
      },
      {
        "name": "High-Energy Diagnostics",
        "ko": "고에너지 진단",
        "icon": "HD",
        "parts": [
          [
            "Beam profile monitor",
            "빔 프로파일 모니터",
            "빔 단면 또는 위치 확인용 진단 장치",
            "옵션 확인"
          ],
          [
            "Beam current monitor",
            "빔 전류 모니터",
            "빔 전류 감시",
            "옵션 확인"
          ],
          [
            "Faraday cup / diagnostic cup",
            "패러데이 컵·진단 컵",
            "전하 수집 기반 빔 계측",
            "옵션 확인"
          ],
          [
            "Beam stop / dump",
            "빔 스톱·덤프",
            "진단 또는 보호 목적의 빔 흡수 구성품",
            "모델별 확인"
          ]
        ]
      },
      {
        "name": "Vacuum & Thermal Management",
        "ko": "진공·열관리",
        "icon": "VT",
        "parts": [
          [
            "Vacuum gauge / sensor",
            "진공 게이지·센서",
            "고에너지 구간 압력 감시",
            "모델별 확인"
          ],
          [
            "Vacuum pump / pump port",
            "진공 펌프·펌프 포트",
            "구간 진공 유지",
            "모델별 확인"
          ],
          [
            "Cooling line / heat exchanger interface",
            "냉각 라인·열교환 인터페이스",
            "열부하 관리",
            "옵션 확인"
          ],
          [
            "Vacuum valve / isolation hardware",
            "진공 밸브·격리 하드웨어",
            "진공 구간 격리",
            "모델별 확인"
          ]
        ]
      }
    ]
  },
  "corrector": {
    "number": "05",
    "name": "CORRECTOR",
    "ko": "빔 보정기",
    "eyebrow": "BEAM CORRECTION & OPTICS",
    "description": "빔 궤적·집속·형상 등을 보정하는 광학 요소를 분류하는 영역",
    "categories": [
      {
        "name": "Magnet Assembly",
        "ko": "자석 어셈블리",
        "icon": "MA",
        "parts": [
          [
            "Corrector magnet / steering magnet",
            "보정 자석·스티어링 자석",
            "자기장을 이용한 빔 궤적 보정",
            "모델별 확인"
          ],
          [
            "Magnet yoke / pole piece",
            "자석 요크·폴 피스",
            "자기 회로 및 극 형성",
            "구조별 확인"
          ],
          [
            "Coil / winding assembly",
            "코일·권선 어셈블리",
            "보정 자기장 생성",
            "모델별 확인"
          ],
          [
            "Magnet cooling assembly",
            "자석 냉각 어셈블리",
            "코일 및 자석 열관리",
            "옵션 확인"
          ]
        ]
      },
      {
        "name": "Power & Position Control",
        "ko": "전원·위치 제어",
        "icon": "PC",
        "parts": [
          [
            "Magnet power supply",
            "자석 전원 공급기",
            "자석 전류 제어",
            "모델별 확인"
          ],
          [
            "Current transducer / shunt",
            "전류 트랜스듀서·션트",
            "자석 전류 피드백 계측",
            "옵션 확인"
          ],
          [
            "Position sensor / actuator",
            "위치 센서·액추에이터",
            "보정 요소 위치 조정에 사용될 수 있음",
            "옵션 확인"
          ],
          [
            "Cable / power connector",
            "케이블·전원 커넥터",
            "전력 및 제어 연결",
            "일반 구조 후보"
          ]
        ]
      },
      {
        "name": "Beam Optics & Diagnostics",
        "ko": "빔 광학·진단",
        "icon": "BD",
        "parts": [
          [
            "Quadrupole / focusing element",
            "쿼드러폴·집속 요소",
            "빔 집속·발산 제어에 사용될 수 있는 요소",
            "옵션 확인"
          ],
          [
            "Corrector aperture / slit",
            "보정 어퍼처·슬릿",
            "빔 수용 범위 및 형상 제한",
            "모델별 확인"
          ],
          [
            "Beam position monitor",
            "빔 위치 모니터",
            "빔 중심 위치 측정",
            "옵션 확인"
          ],
          [
            "Alignment target / reference",
            "정렬 타깃·기준물",
            "정렬 검증용 기준",
            "현장 확인"
          ]
        ]
      }
    ]
  },
  "chamber": {
    "number": "06",
    "name": "CHAMBER",
    "ko": "챔버",
    "eyebrow": "PROCESS VACUUM CHAMBER",
    "description": "공정 진공 경계, 빔 통과 구간, 내부 차폐 및 진공 계통",
    "categories": [
      {
        "name": "Vacuum Chamber Body",
        "ko": "진공 챔버 본체",
        "icon": "VC",
        "parts": [
          [
            "Chamber body / vessel",
            "챔버 본체·용기",
            "공정 진공 경계를 구성하는 본체",
            "모델별 확인"
          ],
          [
            "Access door / service cover",
            "접근 도어·서비스 커버",
            "정비 접근 및 밀폐",
            "모델별 확인"
          ],
          [
            "Flange / vacuum port",
            "플랜지·진공 포트",
            "배관·펌프·계측기 연결부",
            "일반 구조 후보"
          ],
          [
            "Viewport / inspection window",
            "뷰포트·점검창",
            "내부 상태 관찰용 창이 있는 경우",
            "옵션 확인"
          ]
        ]
      },
      {
        "name": "Vacuum Pumping & Pressure",
        "ko": "진공 펌핑·압력",
        "icon": "VP",
        "parts": [
          [
            "Turbo / cryo pump interface",
            "터보·크라이오 펌프 인터페이스",
            "고진공 유지 계통",
            "모델별 확인"
          ],
          [
            "Roughing pump line / valve",
            "러핑 펌프 라인·밸브",
            "초기 배기 및 배기 경로",
            "모델별 확인"
          ],
          [
            "Vacuum gauge / pressure sensor",
            "진공 게이지·압력 센서",
            "압력 측정 및 감시",
            "모델별 확인"
          ],
          [
            "Vent / purge valve",
            "벤트·퍼지 밸브",
            "대기 복귀 또는 퍼지 제어",
            "모델별 확인"
          ]
        ]
      },
      {
        "name": "Internal Shield & Beam Aperture",
        "ko": "내부 실드·빔 개구",
        "icon": "SA",
        "parts": [
          [
            "Beam aperture / insert",
            "빔 어퍼처·인서트",
            "빔 통과 개구 및 교체형 부품",
            "모델별 확인"
          ],
          [
            "Internal shield / liner",
            "내부 실드·라이너",
            "내벽 보호 및 오염·증착 관리",
            "모델별 확인"
          ],
          [
            "Beam dump / catcher",
            "빔 덤프·캐처",
            "빔 흡수 또는 진단 구성품이 있을 경우",
            "옵션 확인"
          ],
          [
            "Fastener / retaining hardware",
            "체결부·고정부품",
            "내부 부품 고정",
            "일반 구조 후보"
          ]
        ]
      },
      {
        "name": "Cooling & Interlocks",
        "ko": "냉각·인터록",
        "icon": "CI",
        "parts": [
          [
            "Cooling water manifold / line",
            "냉각수 매니폴드·라인",
            "열관리 계통",
            "모델별 확인"
          ],
          [
            "Flow / temperature sensor",
            "유량·온도 센서",
            "냉각 상태 감시",
            "옵션 확인"
          ],
          [
            "Door interlock / limit switch",
            "도어 인터록·리미트 스위치",
            "접근문 상태 및 안전 인터록",
            "모델별 확인"
          ],
          [
            "Ground strap / bonding hardware",
            "접지 스트랩·본딩 부품",
            "전기적 접지·본딩",
            "현장 확인"
          ]
        ]
      }
    ]
  },
  "endstation": {
    "number": "07",
    "name": "ENDSTATION",
    "ko": "엔드스테이션",
    "eyebrow": "WAFER PROCESSING",
    "description": "웨이퍼를 고정·이송하고 빔 주입 조건과 도즈를 관리하는 영역",
    "categories": [
      {
        "name": "Wafer Handling & Chuck",
        "ko": "웨이퍼 핸들링·척",
        "icon": "WC",
        "parts": [
          [
            "Wafer chuck / platen",
            "웨이퍼 척·플래튼",
            "웨이퍼 지지 및 위치 고정",
            "모델별 확인"
          ],
          [
            "Electrostatic chuck (ESC)",
            "정전척",
            "정전기력 기반 웨이퍼 고정 방식이 적용된 경우",
            "옵션 확인"
          ],
          [
            "Mechanical clamp / edge grip",
            "기계식 클램프·엣지 그립",
            "웨이퍼 고정 방식에 따라 적용",
            "모델별 확인"
          ],
          [
            "Chuck lift / Z-stage",
            "척 리프트·Z 스테이지",
            "수직 위치 및 이송",
            "모델별 확인"
          ],
          [
            "Wafer presence / edge sensor",
            "웨이퍼 감지·엣지 센서",
            "웨이퍼 유무·위치 감지",
            "옵션 확인"
          ]
        ]
      },
      {
        "name": "Scan & Motion System",
        "ko": "스캔·모션 시스템",
        "icon": "SM",
        "parts": [
          [
            "Scan motor / drive",
            "스캔 모터·드라이브",
            "빔 또는 웨이퍼 스캔 구동",
            "모델별 확인"
          ],
          [
            "Linear stage / bearing",
            "리니어 스테이지·베어링",
            "정밀 이동 지지",
            "모델별 확인"
          ],
          [
            "Encoder / position feedback",
            "엔코더·위치 피드백",
            "이동 위치 측정",
            "모델별 확인"
          ],
          [
            "Motion controller / cable",
            "모션 컨트롤러·케이블",
            "스캔 모션 제어 및 연결",
            "모델별 확인"
          ]
        ]
      },
      {
        "name": "Dose & Beam Monitoring",
        "ko": "도즈·빔 모니터링",
        "icon": "DB",
        "parts": [
          [
            "Dose monitor / integrator",
            "도즈 모니터·적분기",
            "주입량 관리 신호 처리",
            "모델별 확인"
          ],
          [
            "Beam current sensor",
            "빔 전류 센서",
            "빔 전류 계측",
            "옵션 확인"
          ],
          [
            "Faraday / dose cup",
            "패러데이 컵·도즈 컵",
            "도즈 검증 또는 빔 계측",
            "모델별 확인"
          ],
          [
            "Beam scan controller",
            "빔 스캔 컨트롤러",
            "스캔 조건 제어",
            "모델별 확인"
          ]
        ]
      },
      {
        "name": "Thermal Management & Safety",
        "ko": "열관리·안전",
        "icon": "TS",
        "parts": [
          [
            "Chuck cooling line",
            "척 냉각 라인",
            "웨이퍼 및 척 열관리",
            "모델별 확인"
          ],
          [
            "Temperature sensor",
            "온도 센서",
            "온도 감시",
            "옵션 확인"
          ],
          [
            "Endstation interlock",
            "엔드스테이션 인터록",
            "도어·동작·안전 상태 확인",
            "모델별 확인"
          ],
          [
            "Arc / discharge detection",
            "아크·방전 검출",
            "이상 방전 감시가 적용된 경우",
            "옵션 확인"
          ]
        ]
      }
    ]
  },
  "loadport": {
    "number": "08",
    "name": "LOADPORT",
    "ko": "로드포트",
    "eyebrow": "FOUP / WAFER INTERFACE",
    "description": "FOUP 또는 웨이퍼 캐리어를 장착하고 웨이퍼 반송 시스템과 연결하는 영역",
    "categories": [
      {
        "name": "FOUP / Load Port Assembly",
        "ko": "FOUP·로드포트 어셈블리",
        "icon": "LP",
        "parts": [
          [
            "Load port platform / base",
            "로드포트 플랫폼·베이스",
            "캐리어 장착 및 지지",
            "모델별 확인"
          ],
          [
            "FOUP docking plate",
            "FOUP 도킹 플레이트",
            "FOUP 위치 정렬 및 결합",
            "모델별 확인"
          ],
          [
            "FOUP clamp / latch",
            "FOUP 클램프·래치",
            "캐리어 고정",
            "모델별 확인"
          ],
          [
            "Load port door / opener",
            "로드포트 도어·오프너",
            "캐리어 도어 개폐",
            "모델별 확인"
          ],
          [
            "Carrier presence sensor",
            "캐리어 감지 센서",
            "FOUP 장착 여부 확인",
            "모델별 확인"
          ]
        ]
      },
      {
        "name": "Wafer Mapping & Sensors",
        "ko": "웨이퍼 맵핑·센서",
        "icon": "WS",
        "parts": [
          [
            "Wafer mapping sensor",
            "웨이퍼 맵핑 센서",
            "슬롯 내 웨이퍼 위치·유무 확인",
            "모델별 확인"
          ],
          [
            "Slot / door position sensor",
            "슬롯·도어 위치 센서",
            "위치 확인 및 인터록",
            "옵션 확인"
          ],
          [
            "Barcode / ID reader",
            "바코드·ID 리더",
            "캐리어 또는 로트 식별",
            "옵션 확인"
          ],
          [
            "Presence / alignment sensor",
            "유무·정렬 센서",
            "캐리어 위치 및 상태 감지",
            "모델별 확인"
          ]
        ]
      },
      {
        "name": "Transfer Interface",
        "ko": "반송 인터페이스",
        "icon": "TI",
        "parts": [
          [
            "Atmospheric robot interface",
            "대기 로봇 인터페이스",
            "웨이퍼 반송 로봇과의 기계·제어 인터페이스",
            "모델별 확인"
          ],
          [
            "Wafer handoff positioner",
            "웨이퍼 핸드오프 포지셔너",
            "반송 위치 정렬",
            "옵션 확인"
          ],
          [
            "EFEM interface / frame",
            "EFEM 인터페이스·프레임",
            "전면 웨이퍼 이송 모듈과의 결합",
            "구성 확인"
          ],
          [
            "Interlock / I/O harness",
            "인터록·I/O 하네스",
            "장비 제어 신호 연결",
            "모델별 확인"
          ]
        ]
      },
      {
        "name": "Pneumatic & Utility",
        "ko": "공압·유틸리티",
        "icon": "PU",
        "parts": [
          [
            "Pneumatic cylinder / actuator",
            "공압 실린더·액추에이터",
            "도어·클램프 구동",
            "모델별 확인"
          ],
          [
            "Solenoid valve / manifold",
            "솔레노이드 밸브·매니폴드",
            "공압 구동 제어",
            "모델별 확인"
          ],
          [
            "Air line / fitting",
            "에어 라인·피팅",
            "압축공기 공급",
            "일반 구조 후보"
          ],
          [
            "Filter / regulator",
            "필터·레귤레이터",
            "공압 품질 및 압력 조절",
            "옵션 확인"
          ]
        ]
      }
    ]
  }
};
