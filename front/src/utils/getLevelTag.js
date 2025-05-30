export default function getLevelTag(level) {
    if (level < 15) return "초보";
    if (level < 30) return "중수";
    return "고수";
}