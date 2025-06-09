import beginnerIcon from "../assets/beginnerIcon-badge.svg";
import intermediateIcon from "../assets/intermediateIcon-badge.svg";
import advancedIcon from "../assets/advancedIcon-badge.svg";

export default function getAbvIcon(abv) {
    if (abv < 15) return { label: "초보", icon: beginnerIcon };
    if (abv < 30) return { label: "중수", icon: intermediateIcon };
    return { label: "고수", icon: advancedIcon };
}
