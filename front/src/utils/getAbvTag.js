export default function getAbvTag(abv) {
    if (abv < 15) return "초보";
    if (abv < 30) return "중수";
    return "고수";
}