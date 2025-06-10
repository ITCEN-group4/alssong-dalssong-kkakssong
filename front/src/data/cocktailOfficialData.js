const cocktailData= [
    {
        "id": 1,
        "name": "모히또",
        "userId": "305",
        "image": "https://img.freepik.com/premium-photo/fresh-mojito-cocktail_522560-1141.jpg",
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
        "image": "https://i.namu.wiki/i/yJaFpjscI2TdeOeVQGoTXG5_IAm_lBZ9iEPgF_kTbSQyajvQRx9Gd1hkG0IWK9YW-YVr42JabFv7j_TuYDoR7Q.webp",
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
        "image": "https://i.namu.wiki/i/R4bgfGvsWx8B-f9sku6c8Cu6myRSNopILEtvEAsKtLdRjy4weB6Oe7XgmSZ1Y3jLTFV1BWEZDZkLV1tHqj7wxw.webp",
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
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtFmECZSrzorFzfJr35zVzDfC9wC6WFpOtiw&s",
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
        "image": "https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F243B90475759FB5401",
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
        "image": "https://lh4.googleusercontent.com/proxy/UY9NQ6Kz1x5LETrUqm1DUbV0H2tu7JN6uFr_Zg9Q1A6RskF9zVr5C6mNpmg4K5ihyIsnk8IxQFxmSeokWa3ZS_0eLtkVUh4v19zPq9M9",
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
        "image": "https://blog.kakaocdn.net/dn/BKrVQ/btqzkkY3Y4D/3sR5kfjqtuzauLMUCzqCt0/img.jpg",
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
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKgENc0TJoEhNWZTRjxGDPZD8iGL1jAUZoVw&s",
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
        "image": "https://blog.kakaocdn.net/dn/dq2jqp/btssHgt4TNy/m57kJb0VLpVKh6XDq4GZt1/img.jpg",
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
        "image": "https://i.namu.wiki/i/6TgK7AkvV8e9A0z2PMbnMnmf5R3OA4-ISlAk2zoMi-vb7l4DWBg-yrMjndWJnX1Jy6_6X7i747xECI7VQ8ABzg.webp",
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
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqWexf9xwbJBdYqU2V3v8I_NU5b-PEqfy8pw&s",
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
        "image": "https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F7cd2s%2FbtqPDIbbAkM%2FSafFdDvFpsmg003vIFMprk%2Fimg.jpg",
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
        "image": "https://mblogthumb-phinf.pstatic.net/20150807_87/newnnew7985_1438937769540eFGTX_JPEG/%BD%CC%B0%A1%C6%FA%BD%BD%B8%B51.jpg?type=w420",
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
        "image": "https://img.freepik.com/premium-photo/fresh-made-cuba-libre-isolated-white_846485-7892.jpg",
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
        "image": "https://blog.kakaocdn.net/dn/SLY5Y/btqyqT22ml9/yaItosMCKbzw5McKRcaGCK/img.jpg",
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
        "image": "https://i.namu.wiki/i/9BwYstdd9s74N-KLuMmF-VMh1gzrErnOLlJSn0QO3QkZqFjnStqYOVAbahiLJ6mD4zdANZHJNhhPeiqeXbRF_w.webp",
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
        "image": "https://blog.kakaocdn.net/dn/rMkKb/btqzkmiChJU/7OpYk5BI8MmgBVSo9pSxc1/img.jpg",
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
        "image": "https://blog.kakaocdn.net/dn/d57Ngu/btqGUNk8neK/l26w3UEPvKzMy6kozDr9D0/img.png",
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
        "image": "https://masileng-bucket.s3.ap-northeast-2.amazonaws.com/TB_COCK_MASTER/62d2a292-f27c-4e19-a76b-ad79f2dab644ea053c866a14f685269d74505.jpg",
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
        "name": "라즈베리 모히또",
        "userId": "149",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlcg9l_2LS_p5EkLOnHtp9eOSwmK0HO5omUQ&s",
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
        "image": "https://masileng-bucket.s3.ap-northeast-2.amazonaws.com/TB_COCK_MASTER/20735dd2-3db9-4be5-a4cc-090867b36b41scaled_img.jpg",
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
        "image": "https://i.namu.wiki/i/KmjVOe0akFdNjBe65_RtAYsGAyajRHSCobn3bb96eygbQXfUsh4Neobp5MStOjXnT12NxarEUZ9GCK2n6-9y2w.webp",
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
        "image": "https://i.namu.wiki/i/MLLs93lXZ-t9fkemk-sRyU9-viUNQjYNxGV8yd34rdrnujPLtILESfX6DjtAz9TDE7XgMTAOarqKLz-7l4ec_g.webp",
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
        "image": "https://blog.kakaocdn.net/dn/mBwEs/btrMxTutYx8/PhGCuVMj6Pa8EjUyggUsLk/img.jpg",
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
        "image": "https://us.123rf.com/450wm/geribody/geribody1407/geribody140700012/29602598-campari-orange-cocktail-isolated-on-white.jpg",
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
        "image": "https://reciup.com/assets/recipe/202412/a1b9b48c-7f9d-4f17-b45f-133286de8057.jpg",
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
        "image": "https://i.namu.wiki/i/Tg42qeZTPKUzhDrHntPSWoXH6nM_BYO295fQMiU6apnD7qhd1jTLOrZamjfYDRWN-mfkvA_9Y9YgldGZ0hPJVA.webp",
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
        "image": "https://blog.kakaocdn.net/dn/cp8JV0/btqzkb2uSkL/K9A5JSxd9MGoEH2d0QBbZ1/img.jpg",
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
        "image": "https://i.namu.wiki/i/j0TPLOW5zKjz67zmHDsujTha5NRoGkeDop0SRM3Dwwm1eeeFCX8IlRI29RAYfTn-PoOGNEsWtjePf5YX7DzOEA.webp",
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
        "image": "https://cdn.diffordsguide.com/cocktail/GRoYNr/default/0/512x.webp",
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
        "image": "https://i.namu.wiki/i/UHRyyWTmRE211VndEwp_1l8OfNQLcoCOP5YHDjll5V1llan7sspZvlJxG-nBYz_UxAXiGqKo-mfQKpcLFVtJ9g.webp",
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
        "name": "벨리니",
        "userId": "520",
        "image": "https://blog.kakaocdn.net/dn/cwo0LT/btqOxsnIdqq/x1VF5EKVwH47rbJOAgRykK/img.png",
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