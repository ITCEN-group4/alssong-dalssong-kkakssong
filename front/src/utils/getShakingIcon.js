import shakingOnIcon from "../assets/shakingOnIcon.svg";
import shakingOffIcon from "../assets/shakingOffIcon.svg";

export default function getShakingIcon(flag) {
    return flag
        ? { label: "ON", icon: shakingOnIcon }
        : { label: "OFF", icon: shakingOffIcon };
}
