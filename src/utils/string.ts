const stringUtils = {
    wrap: (input: string, tag: { start: string, end: string } = { start: "<p>", end: "</p>" }) => {
        return `${tag.start}${input}${tag.end}`
    },
    wrapLongestWord: (input: string, wrapChar = "*", wrapCharReplacement="⁎") => {
        input = input.split(wrapChar).join(wrapCharReplacement);

        const parts = input.split(" ");
        const longest: { index: number, length: number } = {
            index: 0,
            length: 0
        }
        const partInfo = parts.map((part, i) => {
            const ret = {
                length: 0,
                endOffset: 0,
                startOffset: 0
            };
            //@todo improve regex
            const end = part.match(/[,.?!:;]+?$/);
            if (end) {
                ret.endOffset = end[0].length;
            }
            const start = part.match(/^[,.?!:;]+/);
            if (start) {
                ret.startOffset = start[0].length;
            }
            ret.length = part.length - ret.endOffset - ret.startOffset;
            if (longest.length < ret.length) {
                longest.length = ret.length;
                longest.index = i;
            }
            return ret;
        })

        const part = parts[longest.index];
        const info = partInfo[longest.index];
        if (!part || !info) throw new Error("should never throw");
        const start = part.slice(0, info.startOffset);
        const middle = part.slice(info.startOffset, info.length + info.startOffset);
        const end = part.slice(part.length - info.endOffset, part.length)
        const wrapped = `${start}*${middle}*${end}`;
        parts[longest.index] = wrapped;
        return parts.join(" ");
    }
}
export default stringUtils;