const testData = [
    {
        id: 1,
        name: "모히또",
        image: "https://i.namu.wiki/i/RzY4xdzZESiW9K94XCTcketMLw-86cjr0KVgqEQPQ8vWzUZgsCiCmgfkk7FqY4-AR8QNjdS7K4Rdae-QIy-nLgPjtRD_fymBuYQRkXhY4bCWQiM-4A7giBGgLhHWb56NRsgI0FRS0uDnmU6BPBoGrw.webp",
        abv: 18,
        baseLiquors: "럼",
        ingredients: ["라임", "민트", "설탕", "탄산수"],
        likes: 30,
        shaking: false,
        description: "모히또 가서 몰디브 한잔",
        recipe: ["럼 45ml", "라임 15ml", "민트 3장", "설탕 15ml", "탄산수 45ml"]
    },
    {
        id: 2,
        name: "피치크러시",
        image: "https://i.namu.wiki/i/b2a5Euq9WusON_fZMJRA1iO2mkPi6n83CtYdk_VjKOV3MWODQNBMXi_ODDrSLf699qgJQttf-a73mEuhl4BeBTDle7iiv6G9-MMYCRspNy0FY5rTmZPpqOL1b8q0_mb68xjGjpHvBp_V5qAOCEcBSA.webp",
        abv: 9,
        baseLiquors: "리큐르",
        ingredients: ["피치트리", "스윗앤 사워믹스", "크랜베리 주스"],
        likes: 31,
        shaking: true,
        description: "복숭아 향과 새콤한 맛이 나는 칵테일",
        recipe: ["럼 45ml", "라임 15ml", "민트 3장", "설탕 15ml", "탄산수 45ml"]
    },
    {
        id: 3,
        name: "쿠바리브레",
        image: "https://i.namu.wiki/i/amiMOIBZahrrQ4nIs2wagQoKp_HkHP9rqOHJZOjGRH4ShJdTKiHQ4IKxApGtI8ktHc45FfwtDBIPJ-QwY_r1DhB_fk-9ZUCStY2Ss9SLj_Py_UWxulkXWmemh-A5NlfIRxpe-2hqkvo-ZsyvHOg1tA.webp",
        abv: 6,
        baseLiquors: "럼",
        ingredients: ["콜라"],
        likes: 29,
        shaking: false,
        description: "럼과 콜라의 맛이 합쳐진 칵테일",
        recipe: ["럼 45ml", "라임 15ml", "민트 3장", "설탕 15ml", "탄산수 45ml"]
    },
    {
        id: 4,
        name: "데킬라선라이즈",
        image: "https://i.namu.wiki/i/ZiJDi6FDaoKZ-wLDbSd56FlL9p1ulLra-SzBcxTaTV8A8wHHfXrroNneRppSoIHho0SIa_hz_vah2AcQzbNmShpgm-8vE1Y1v4Qcr3HGoyKBIfcR-Xavo1lybMlXjojhcBZF-jnjxChh9sorjE1XIA.webp",
        abv: 19,
        baseLiquors: "데킬라",
        ingredients: ["오렌지 주스", "그레나딘 시럽"],
        likes: 27,
        shaking: false,
        description: "해가 떠오르는 모습같다고 하여 선라이즈라는 이름이 붙음",
        recipe: ["럼 45ml", "라임 15ml", "민트 3장", "설탕 15ml", "탄산수 45ml"]
    },
    {
        id: 5,
        name: "라선라이즈",
        image: "https://i.namu.wiki/i/ZiJDi6FDaoKZ-wLDbSd56FlL9p1ulLra-SzBcxTaTV8A8wHHfXrroNneRppSoIHho0SIa_hz_vah2AcQzbNmShpgm-8vE1Y1v4Qcr3HGoyKBIfcR-Xavo1lybMlXjojhcBZF-jnjxChh9sorjE1XIA.webp",
        abv: 40,
        baseLiquors: "데킬라",
        ingredients: ["오렌지 주스", "그레나딘 시럽"],
        likes: 21,
        shaking: false,
        description: "해가 떠오르는 모습같다고 하여 선라이즈라는 이름이 붙음",
        recipe: ["럼 45ml", "라임 15ml", "민트 3장", "설탕 15ml", "탄산수 45ml"]
    },
    {
        id: 6,
        name: "데킬라선",
        image: "https://i.namu.wiki/i/ZiJDi6FDaoKZ-wLDbSd56FlL9p1ulLra-SzBcxTaTV8A8wHHfXrroNneRppSoIHho0SIa_hz_vah2AcQzbNmShpgm-8vE1Y1v4Qcr3HGoyKBIfcR-Xavo1lybMlXjojhcBZF-jnjxChh9sorjE1XIA.webp",
        abv: 19,
        baseLiquors: "데킬라",
        ingredients: ["오렌지 주스", "그레나딘 시럽"],
        likes: 23,
        shaking: false,
        description: "해가 떠오르는 모습같다고 하여 선라이즈라는 이름이 붙음",
        recipe: ["럼 45ml", "라임 15ml", "민트 3장", "설탕 15ml", "탄산수 45ml"]
    },
    {
        id: 7,
        name: "데즈",
        image: "https://i.namu.wiki/i/ZiJDi6FDaoKZ-wLDbSd56FlL9p1ulLra-SzBcxTaTV8A8wHHfXrroNneRppSoIHho0SIa_hz_vah2AcQzbNmShpgm-8vE1Y1v4Qcr3HGoyKBIfcR-Xavo1lybMlXjojhcBZF-jnjxChh9sorjE1XIA.webp",
        abv: 19,
        baseLiquors: "데킬라",
        ingredients: ["오렌지 주스", "그레나딘 시럽"],
        likes: 26,
        shaking: false,
        description: "해가 떠오르는 모습같다고 하여 선라이즈라는 이름이 붙음",
        recipe: ["럼 45ml", "라임 15ml", "민트 3장", "설탕 15ml", "탄산수 45ml"]
    },
    {
        id: 8,
        name: "라선라이즈",
        image: "https://i.namu.wiki/i/ZiJDi6FDaoKZ-wLDbSd56FlL9p1ulLra-SzBcxTaTV8A8wHHfXrroNneRppSoIHho0SIa_hz_vah2AcQzbNmShpgm-8vE1Y1v4Qcr3HGoyKBIfcR-Xavo1lybMlXjojhcBZF-jnjxChh9sorjE1XIA.webp",
        abv: 19,
        baseLiquors: "데킬라",
        ingredients: ["오렌지 주스", "그레나딘 시럽"],
        likes: 22,
        shaking: false,
        description: "해가 떠오르는 모습같다고 하여 선라이즈라는 이름이 붙음",
        recipe: ["럼 45ml", "라임 15ml", "민트 3장", "설탕 15ml", "탄산수 45ml"]
    },
    {
        id: 9,
        name: "피치크시",
        image: "https://i.namu.wiki/i/b2a5Euq9WusON_fZMJRA1iO2mkPi6n83CtYdk_VjKOV3MWODQNBMXi_ODDrSLf699qgJQttf-a73mEuhl4BeBTDle7iiv6G9-MMYCRspNy0FY5rTmZPpqOL1b8q0_mb68xjGjpHvBp_V5qAOCEcBSA.webp",
        abv: 9,
        baseLiquors: "리큐르",
        ingredients: ["피치트리", "스윗앤 사워믹스", "크랜베리 주스"],
        likes: 15,
        shaking: true,
        description: "복숭아 향과 새콤한 맛이 나는 칵테일",
        recipe: ["럼 45ml", "라임 15ml", "민트 3장", "설탕 15ml", "탄산수 45ml"]
    },
    {
        id: 10,
        name: "크러시",
        image: "https://i.namu.wiki/i/b2a5Euq9WusON_fZMJRA1iO2mkPi6n83CtYdk_VjKOV3MWODQNBMXi_ODDrSLf699qgJQttf-a73mEuhl4BeBTDle7iiv6G9-MMYCRspNy0FY5rTmZPpqOL1b8q0_mb68xjGjpHvBp_V5qAOCEcBSA.webp",
        abv: 9,
        baseLiquors: "리큐르",
        ingredients: ["피치트리", "스윗앤 사워믹스", "크랜베리 주스"],
        likes: 17,
        shaking: true,
        description: "복숭아 향과 새콤한 맛이 나는 칵테일",
        recipe: ["럼 45ml", "라임 15ml", "민트 3장", "설탕 15ml", "탄산수 45ml"]
    },
];

export default testData;