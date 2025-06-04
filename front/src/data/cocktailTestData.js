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
        description: "안녕하세요! 오늘은 제가 정말 애정하는 칵테일 레시피를 공유드리려고 합니다. 이 칵테일은 집에서도 간단하게 만들 수 있으면서도 맛과 비주얼 모두를 만족시키는 최고의 레시피예요. 시원한 라임과 상큼한 민트의 조합, 그리고 탄산수의 청량감이 어우러져 하루의 피로를 한 번에 날려줄 수 있는 음료랍니다.\n" +
            "\n" +
            "1. 민트 잎과 설탕, 그리고 라임 주스를 섞는다.\n" +
            "\n" +
            "2. 탄산수를 소량 따르고 바 스푼으로 저어주며 설탕을 녹인다.\n" +
            "\n" +
            "3. 얼음으로 잔을 채운 후 럼을 따른다.\n" +
            "\n" +
            "4. 남은 공간은 탄산수로 채우고 재료를 가볍게 다시 섞어준다.\n" +
            "\n" +
            "5. 민트 잎과 라임 슬라이스로 장식해준다. \n" +
            "\n도수도 부담스럽지 않아서 술이 약한 분들도 충분히 즐길 수 있습니다. 간단하면서도 감성 가득한 이 레시피, 꼭 한번 따라해보시고 여러분만의 방식으로 응용해보세요! 그럼 즐거운 칵테일 타임 되시길 바랄게요 😊",
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