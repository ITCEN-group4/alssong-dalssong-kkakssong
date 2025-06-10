import testData from "./cocktailTestData.js";

const cocktailData= [
    {
        "id": 1,
        "name": "모히또",
        "userId": "305",
        "image": "https://example.com/image1.jpg",
        "abv": 23,
        "baseLiquors": "보드카",
        "ingredients": [
            "토닉 워터",
            "그레나딘",
            "트리플 섹"
        ],
        "likes": 0,
        "createdAt": "2025-03-02",
        "shaking": true,
        "description": "상큼한 맛과 달콤함이 어우러진 칵테일",
        "recipe": "토닉 워터 45ml\n그레나딘 60ml\n트리플 섹 90ml"
    },
    {
        "id": 2,
        "name": "마가리타",
        "userId": "552",
        "image": "https://example.com/image2.jpg",
        "abv": 28,
        "baseLiquors": "진",
        "ingredients": [
            "크랜베리 주스",
            "오렌지 주스",
            "토닉 워터"
        ],
        "likes": 0,
        "createdAt": "2025-03-03",
        "shaking": true,
        "description": "진한 맛과 깊은 향을 느낄 수 있는 클래식 칵테일",
        "recipe": "크랜베리 주스 90ml\n오렌지 주스 60ml\n토닉 워터 60ml"
    },
    {
        "id": 3,
        "name": "마티니",
        "userId": "143",
        "image": "https://example.com/image3.jpg",
        "abv": 17,
        "baseLiquors": "진",
        "ingredients": [
            "오렌지 주스",
            "토닉 워터",
            "크랜베리 주스"
        ],
        "likes": 0,
        "createdAt": "2025-03-04",
        "shaking": true,
        "description": "톡 쏘는 청량감과 과일 향이 특징인 칵테일",
        "recipe": "오렌지 주스 30ml\n토닉 워터 45ml\n크랜베리 주스 45ml"
    },
    {
        "id": 4,
        "name": "블러디 메리",
        "userId": "439",
        "image": "https://example.com/image4.jpg",
        "abv": 26,
        "baseLiquors": "럼",
        "ingredients": [
            "애플 리큐르",
            "코코넛 밀크",
            "크랜베리 주스"
        ],
        "likes": 0,
        "createdAt": "2025-03-05",
        "shaking": false,
        "description": "이국적인 느낌의 트로피컬 칵테일",
        "recipe": "애플 리큐르 45ml\n코코넛 밀크 45ml\n크랜베리 주스 60ml"
    },
    {
        "id": 5,
        "name": "피나 콜라다",
        "userId": "350",
        "image": "https://example.com/image5.jpg",
        "abv": 15,
        "baseLiquors": "럼",
        "ingredients": [
            "그레나딘",
            "우유",
            "트리플 섹"
        ],
        "likes": 0,
        "createdAt": "2025-03-06",
        "shaking": false,
        "description": "상큼한 맛과 달콤함이 어우러진 칵테일",
        "recipe": "그레나딘 90ml\n우유 45ml\n트리플 섹 60ml"
    },
    {
        "id": 6,
        "name": "롱 아일랜드 아이스티",
        "userId": "443",
        "image": "https://example.com/image6.jpg",
        "abv": 16,
        "baseLiquors": "보드카",
        "ingredients": [
            "우유",
            "애플 리큐르",
            "토닉 워터"
        ],
        "likes": 0,
        "createdAt": "2025-03-07",
        "shaking": true,
        "description": "은은한 과일 향과 부드러운 맛이 조화를 이루는 칵테일",
        "recipe": "우유 30ml\n애플 리큐르 60ml\n토닉 워터 30ml"
    },
    {
        "id": 7,
        "name": "네그로니",
        "userId": "104",
        "image": "https://example.com/image7.jpg",
        "abv": 14,
        "baseLiquors": "보드카",
        "ingredients": [
            "피치트리",
            "애플 리큐르",
            "코코넛 밀크"
        ],
        "likes": 0,
        "createdAt": "2025-03-08",
        "shaking": false,
        "description": "톡 쏘는 청량감과 과일 향이 특징인 칵테일",
        "recipe": "피치트리 60ml\n애플 리큐르 45ml\n코코넛 밀크 60ml"
    },
    {
        "id": 8,
        "name": "다이키리",
        "userId": "336",
        "image": "https://example.com/image8.jpg",
        "abv": 26,
        "baseLiquors": "보드카",
        "ingredients": [
            "애플 리큐르",
            "오렌지 주스",
            "콜라"
        ],
        "likes": 0,
        "createdAt": "2025-03-09",
        "shaking": false,
        "description": "톡 쏘는 청량감과 과일 향이 특징인 칵테일",
        "recipe": "애플 리큐르 60ml\n오렌지 주스 90ml\n콜라 45ml"
    },
    {
        "id": 9,
        "name": "코스모폴리탄",
        "userId": "805",
        "image": "https://example.com/image9.jpg",
        "abv": 29,
        "baseLiquors": "럼",
        "ingredients": [
            "블루 큐라소",
            "콜라",
            "애플 리큐르"
        ],
        "likes": 0,
        "createdAt": "2025-03-10",
        "shaking": false,
        "description": "이국적인 느낌의 트로피컬 칵테일",
        "recipe": "블루 큐라소 30ml\n콜라 90ml\n애플 리큐르 90ml"
    },
    {
        "id": 10,
        "name": "화이트 러시안",
        "userId": "875",
        "image": "https://example.com/image10.jpg",
        "abv": 30,
        "baseLiquors": "데킬라",
        "ingredients": [
            "트리플 섹",
            "레몬 주스",
            "피치트리"
        ],
        "likes": 0,
        "createdAt": "2025-03-11",
        "shaking": false,
        "description": "상큼한 맛과 달콤함이 어우러진 칵테일",
        "recipe": "트리플 섹 45ml\n레몬 주스 45ml\n피치트리 30ml"
    },
    {
        "id": 11,
        "name": "맨해튼",
        "userId": "737",
        "image": "https://example.com/image11.jpg",
        "abv": 7,
        "baseLiquors": "데킬라",
        "ingredients": [
            "블루 큐라소",
            "토닉 워터",
            "오렌지 주스"
        ],
        "likes": 0,
        "createdAt": "2025-03-12",
        "shaking": false,
        "description": "이국적인 느낌의 트로피컬 칵테일",
        "recipe": "블루 큐라소 60ml\n토닉 워터 30ml\n오렌지 주스 30ml"
    },
    {
        "id": 12,
        "name": "올드 패션드",
        "userId": "537",
        "image": "https://example.com/image12.jpg",
        "abv": 24,
        "baseLiquors": "럼",
        "ingredients": [
            "블루 큐라소",
            "피치트리",
            "레몬 주스"
        ],
        "likes": 0,
        "createdAt": "2025-03-13",
        "shaking": true,
        "description": "진한 맛과 깊은 향을 느낄 수 있는 클래식 칵테일",
        "recipe": "블루 큐라소 30ml\n피치트리 45ml\n레몬 주스 30ml"
    },
    {
        "id": 13,
        "name": "싱가포르 슬링",
        "userId": "849",
        "image": "https://example.com/image13.jpg",
        "abv": 11,
        "baseLiquors": "럼",
        "ingredients": [
            "콜라",
            "라임 주스",
            "마라스키노 체리"
        ],
        "likes": 0,
        "createdAt": "2025-03-14",
        "shaking": true,
        "description": "진한 맛과 깊은 향을 느낄 수 있는 클래식 칵테일",
        "recipe": "콜라 60ml\n라임 주스 30ml\n마라스키노 체리 90ml"
    },
    {
        "id": 14,
        "name": "쿠바 리브레",
        "userId": "368",
        "image": "https://example.com/image14.jpg",
        "abv": 11,
        "baseLiquors": "리큐르",
        "ingredients": [
            "크랜베리 주스",
            "레몬 주스",
            "우유"
        ],
        "likes": 0,
        "createdAt": "2025-03-15",
        "shaking": true,
        "description": "상큼한 맛과 달콤함이 어우러진 칵테일",
        "recipe": "크랜베리 주스 45ml\n레몬 주스 45ml\n우유 45ml"
    },
    {
        "id": 15,
        "name": "프렌치 75",
        "userId": "458",
        "image": "https://example.com/image15.jpg",
        "abv": 6,
        "baseLiquors": "데킬라",
        "ingredients": [
            "우유",
            "콜라",
            "피치트리"
        ],
        "likes": 0,
        "createdAt": "2025-03-16",
        "shaking": false,
        "description": "상큼한 맛과 달콤함이 어우러진 칵테일",
        "recipe": "우유 60ml\n콜라 45ml\n피치트리 30ml"
    },
    {
        "id": 16,
        "name": "애플 마티니",
        "userId": "632",
        "image": "https://example.com/image16.jpg",
        "abv": 11,
        "baseLiquors": "보드카",
        "ingredients": [
            "마라스키노 체리",
            "토닉 워터",
            "우유"
        ],
        "likes": 0,
        "createdAt": "2025-03-17",
        "shaking": false,
        "description": "진한 맛과 깊은 향을 느낄 수 있는 클래식 칵테일",
        "recipe": "마라스키노 체리 90ml\n토닉 워터 90ml\n우유 30ml"
    },
    {
        "id": 17,
        "name": "블루 하와이",
        "userId": "330",
        "image": "https://example.com/image17.jpg",
        "abv": 26,
        "baseLiquors": "럼",
        "ingredients": [
            "애플 리큐르",
            "블루 큐라소",
            "트리플 섹"
        ],
        "likes": 0,
        "createdAt": "2025-03-18",
        "shaking": true,
        "description": "이국적인 느낌의 트로피컬 칵테일",
        "recipe": "애플 리큐르 45ml\n블루 큐라소 60ml\n트리플 섹 30ml"
    },
    {
        "id": 18,
        "name": "슬로 진 피즈",
        "userId": "615",
        "image": "https://example.com/image18.jpg",
        "abv": 10,
        "baseLiquors": "데킬라",
        "ingredients": [
            "크랜베리 주스",
            "트리플 섹",
            "우유"
        ],
        "likes": 0,
        "createdAt": "2025-03-19",
        "shaking": true,
        "description": "진한 맛과 깊은 향을 느낄 수 있는 클래식 칵테일",
        "recipe": "크랜베리 주스 60ml\n트리플 섹 30ml\n우유 90ml"
    },
    {
        "id": 19,
        "name": "씨 브리즈",
        "userId": "697",
        "image": "https://example.com/image19.jpg",
        "abv": 5,
        "baseLiquors": "럼",
        "ingredients": [
            "콜라",
            "토닉 워터",
            "마라스키노 체리"
        ],
        "likes": 0,
        "createdAt": "2025-03-20",
        "shaking": false,
        "description": "은은한 과일 향과 부드러운 맛이 조화를 이루는 칵테일",
        "recipe": "콜라 30ml\n토닉 워터 90ml\n마라스키노 체리 30ml"
    },
    {
        "id": 20,
        "name": "라스베리 모히또",
        "userId": "149",
        "image": "https://example.com/image20.jpg",
        "abv": 22,
        "baseLiquors": "진",
        "ingredients": [
            "토닉 워터",
            "콜라",
            "피치트리"
        ],
        "likes": 0,
        "createdAt": "2025-03-21",
        "shaking": true,
        "description": "진한 맛과 깊은 향을 느낄 수 있는 클래식 칵테일",
        "recipe": "토닉 워터 60ml\n콜라 90ml\n피치트리 30ml"
    },
    {
        "id": 21,
        "name": "준 벅",
        "userId": "319",
        "image": "https://example.com/image21.jpg",
        "abv": 25,
        "baseLiquors": "진",
        "ingredients": [
            "그레나딘",
            "트리플 섹",
            "피치트리"
        ],
        "likes": 0,
        "createdAt": "2025-03-22",
        "shaking": true,
        "description": "진한 맛과 깊은 향을 느낄 수 있는 클래식 칵테일",
        "recipe": "그레나딘 45ml\n트리플 섹 90ml\n피치트리 60ml"
    },
    {
        "id": 22,
        "name": "테킬라 선라이즈",
        "userId": "977",
        "image": "https://example.com/image22.jpg",
        "abv": 9,
        "baseLiquors": "진",
        "ingredients": [
            "토닉 워터",
            "레몬 주스",
            "블루 큐라소"
        ],
        "likes": 0,
        "createdAt": "2025-03-23",
        "shaking": false,
        "description": "상큼한 맛과 달콤함이 어우러진 칵테일",
        "recipe": "토닉 워터 60ml\n레몬 주스 60ml\n블루 큐라소 30ml"
    },
    {
        "id": 23,
        "name": "섹스 온 더 비치",
        "userId": "480",
        "image": "https://example.com/image23.jpg",
        "abv": 5,
        "baseLiquors": "보드카",
        "ingredients": [
            "그레나딘",
            "애플 리큐르",
            "레몬 주스"
        ],
        "likes": 0,
        "createdAt": "2025-03-24",
        "shaking": true,
        "description": "이국적인 느낌의 트로피컬 칵테일",
        "recipe": "그레나딘 30ml\n애플 리큐르 60ml\n레몬 주스 60ml"
    },
    {
        "id": 24,
        "name": "베일리스 밀크",
        "userId": "266",
        "image": "https://example.com/image24.jpg",
        "abv": 14,
        "baseLiquors": "리큐르",
        "ingredients": [
            "피치트리",
            "코코넛 밀크",
            "트리플 섹"
        ],
        "likes": 0,
        "createdAt": "2025-03-25",
        "shaking": false,
        "description": "진한 맛과 깊은 향을 느낄 수 있는 클래식 칵테일",
        "recipe": "피치트리 45ml\n코코넛 밀크 60ml\n트리플 섹 90ml"
    },
    {
        "id": 25,
        "name": "캄파리 오렌지",
        "userId": "768",
        "image": "https://example.com/image25.jpg",
        "abv": 10,
        "baseLiquors": "럼",
        "ingredients": [
            "피치트리",
            "코코넛 밀크",
            "레몬 주스"
        ],
        "likes": 0,
        "createdAt": "2025-03-26",
        "shaking": false,
        "description": "이국적인 느낌의 트로피컬 칵테일",
        "recipe": "피치트리 30ml\n코코넛 밀크 30ml\n레몬 주스 45ml"
    },
    {
        "id": 26,
        "name": "코코넛 크러시",
        "userId": "678",
        "image": "https://example.com/image26.jpg",
        "abv": 11,
        "baseLiquors": "럼",
        "ingredients": [
            "레몬 주스",
            "마라스키노 체리",
            "트리플 섹"
        ],
        "likes": 0,
        "createdAt": "2025-03-27",
        "shaking": false,
        "description": "톡 쏘는 청량감과 과일 향이 특징인 칵테일",
        "recipe": "레몬 주스 30ml\n마라스키노 체리 60ml\n트리플 섹 90ml"
    },
    {
        "id": 27,
        "name": "카이피리냐",
        "userId": "264",
        "image": "https://example.com/image27.jpg",
        "abv": 13,
        "baseLiquors": "리큐르",
        "ingredients": [
            "크랜베리 주스",
            "라임 주스",
            "토닉 워터"
        ],
        "likes": 0,
        "createdAt": "2025-03-28",
        "shaking": false,
        "description": "이국적인 느낌의 트로피컬 칵테일",
        "recipe": "크랜베리 주스 60ml\n라임 주스 30ml\n토닉 워터 45ml"
    },
    {
        "id": 28,
        "name": "블랙 러시안",
        "userId": "274",
        "image": "https://example.com/image28.jpg",
        "abv": 14,
        "baseLiquors": "럼",
        "ingredients": [
            "레몬 주스",
            "토닉 워터",
            "코코넛 밀크"
        ],
        "likes": 0,
        "createdAt": "2025-03-29",
        "shaking": true,
        "description": "진한 맛과 깊은 향을 느낄 수 있는 클래식 칵테일",
        "recipe": "레몬 주스 60ml\n토닉 워터 90ml\n코코넛 밀크 90ml"
    },
    {
        "id": 29,
        "name": "레몬 드롭",
        "userId": "820",
        "image": "https://example.com/image29.jpg",
        "abv": 22,
        "baseLiquors": "위스키",
        "ingredients": [
            "애플 리큐르",
            "마라스키노 체리",
            "트리플 섹"
        ],
        "likes": 0,
        "createdAt": "2025-03-30",
        "shaking": false,
        "description": "진한 맛과 깊은 향을 느낄 수 있는 클래식 칵테일",
        "recipe": "애플 리큐르 90ml\n마라스키노 체리 45ml\n트리플 섹 30ml"
    },
    {
        "id": 30,
        "name": "러시안 스프링 펀치",
        "userId": "811",
        "image": "https://example.com/image30.jpg",
        "abv": 28,
        "baseLiquors": "위스키",
        "ingredients": [
            "라임 주스",
            "크랜베리 주스",
            "애플 리큐르"
        ],
        "likes": 0,
        "createdAt": "2025-03-31",
        "shaking": false,
        "description": "은은한 과일 향과 부드러운 맛이 조화를 이루는 칵테일",
        "recipe": "라임 주스 60ml\n크랜베리 주스 30ml\n애플 리큐르 30ml"
    },
    {
        "id": 31,
        "name": "미도리 사워",
        "userId": "506",
        "image": "https://example.com/image31.jpg",
        "abv": 14,
        "baseLiquors": "보드카",
        "ingredients": [
            "콜라",
            "우유",
            "라임 주스"
        ],
        "likes": 0,
        "createdAt": "2025-04-01",
        "shaking": false,
        "description": "은은한 과일 향과 부드러운 맛이 조화를 이루는 칵테일",
        "recipe": "콜라 45ml\n우유 30ml\n라임 주스 90ml"
    },
    {
        "id": 32,
        "name": "베리니",
        "userId": "520",
        "image": "https://example.com/image32.jpg",
        "abv": 28,
        "baseLiquors": "보드카",
        "ingredients": [
            "크랜베리 주스",
            "트리플 섹",
            "레몬 주스"
        ],
        "likes": 0,
        "createdAt": "2025-04-02",
        "shaking": false,
        "description": "톡 쏘는 청량감과 과일 향이 특징인 칵테일",
        "recipe": "크랜베리 주스 45ml\n트리플 섹 60ml\n레몬 주스 30ml"
    }
];
export default cocktailData;