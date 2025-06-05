import beginnerIcon from "../assets/beginnerIcon.svg";
import intermediateIcon from "../assets/intermediateIcon.svg";
import advancedIcon from "../assets/advancedIcon.svg";

export default function getAbvTag(abv) {
    if (abv < 15) return { label: "초보", icon: beginnerIcon };
    if (abv < 30) return { label: "중수", icon: intermediateIcon };
    return { label: "고수", icon: advancedIcon };
}
