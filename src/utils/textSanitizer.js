
function sanitizeText(text) {
    return text
        .replace(/\s*<script[\s\S]*?>[\s\S]*?<\/script>\s*/gi, "")
        .replace(/\s*<(iframe|svg|object|embed)[\s\S]*?>[\s\S]*?<\/\1>\s*/gi, "")
        .replace(/<\/?[^>]+(>|$)/g, "")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")


        //fix whitespace
        .replace(/\s+/g, " ")
        .trim();
}

export default sanitizeText;
