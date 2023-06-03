import Decomposer from "./decomposer.mjs";

const ENCODED_OPEN_TAG = "&lt;";
const ENCODED_CLOSE_TAG = "&gt;";
const OPEN_TAG = "<";
const CLOSE_TAG = ">";
const TERMINATOR = "/";
const LF = "\n";

export default class CodeWriter {
    #parent = null;

    constructor(parent) {
        this.#parent = parent;
    }

    async writeLikeAHuman(target, source) {
        const isCodeWriter = source !== undefined;
        const sourceComponent = this.#parent.shadowRoot.querySelector(
            `pre#${source} code`
        );
        const targetComponent = this.#parent.shadowRoot.querySelector(
            isCodeWriter ? `pre#${target} code` : `div#${target}`
        );
        let speed = this.#parent.speed;
        let reg = [];
        let html = "";
        let lastIndent = "";
        let lastLineFeed = "";
        let node = null;
        let nodes = [];
        const stack = [];
        let text = "";
        let workingText = "";
        let depth = -1;
        const toUnshift = [];
        const toUnshiftHasLF = [];
        let indentCount = 0;
        let the = this;

        function delay(milliseconds) {
            return new Promise((resolve) => {
                setTimeout(resolve, milliseconds);
            });
        }

        function randomSpeed(speed) {
            return Math.floor(speed * 0.75 + Math.random() * speed);
        }

        async function addChar(c, removeLF = false) {
            let tail = reg.join("");
            if (removeLF) {
                tail = tail.trim();
            }

            speed = randomSpeed(the.#parent.speed);

            html += c;
            targetComponent.innerHTML = html + tail;
            if (isCodeWriter && window.hljs !== undefined) {
                window.hljs.highlightElement(targetComponent);
            }

            await delay(speed);
        }

        async function delChar() {
            const tail = reg.join("");

            html = html.substring(0, html.length - 1);
            targetComponent.innerHTML = html + tail;

            await delay(speed);
        }

        function unshift(char) {
            reg.unshift(char);
        }

        function shift() {
            delete reg[0];
            reg = Object.values(reg);
        }

        function parseIndents(indentedHtml) {
            const result = [];
            const regex = /^([^\S][ \s]+)*/gm;

            let matches;

            while ((matches = regex.exec(indentedHtml)) !== null) {
                if (matches.index === regex.lastIndex) {
                    regex.lastIndex++;
                }

                result.push(matches[0] ?? "");
            }

            return result;
        }

        function deleteIndents(indentedHtml) {
            const regex = /^([^\S][ \s]+)*/gm;
            return indentedHtml.replace(regex, "");
        }

        function makeEmptyText(text) {
            const lines = text.split("\n");
            return "<br />".repeat(lines.length);
        }

        async function loadText(url) {
            let loadedText = "";
            await fetch(url)
                .then((response) => response.text())
                .then((htmlText) => {
                    loadedText = htmlText;
                });

            return loadedText;
        }

        function translate(encodedText) {
            const decodedText = encodedText.replaceAll(
                ENCODED_OPEN_TAG,
                OPEN_TAG
            );
            return decodedText.replaceAll(ENCODED_CLOSE_TAG, CLOSE_TAG);
        }

        function nextNode() {
            let result = null;
            if (!nodes.length) {
                return result;
            }

            result = nodes.shift();
            if (result.hasCloser) {
                stack.push(result);
            }

            return result;
        }

        function lastNode() {
            if (!stack.length) {
                return null;
            }

            return stack[stack.length - 1];
        }

        // eslint-disable-next-line consistent-return
        function nextUnshift() {
            if (!toUnshift.length) {
                return null;
            }

            const closer = toUnshift.pop();
            const contentHasLF = toUnshiftHasLF.pop();
            if (contentHasLF) {
                unshift(LF + lastIndent + closer);
            } else {
                unshift(closer);
            }
        }

        function findLastNodeOfDepth(nodeDepth) {
            let result = null;
            if (!stack.length) {
                return result;
            }

            result = lastNode();
            if (nodeDepth === result.depth) {
                return result;
            }

            let isFound = false;
            for (let i = stack.length - 1; i > -1; i--) {
                result = stack[i];
                if (nodeDepth === result.depth) {
                    isFound = true;
                    break;
                }
            }
            if (!isFound) {
                return null;
            }

            return result;
        }

        const codeSource = this.#parent.getAttribute("source") ?? "";

        if (isCodeWriter && window.hljs !== undefined) {
            window.hljs.highlightElement(sourceComponent);
        }
        text = await loadText(codeSource);

        // Seek and destroy indents
        const indents = parseIndents(text);
        text = deleteIndents(text);

        const decomposer = new Decomposer(text, isCodeWriter);
        decomposer.doComponents();
        nodes = [...decomposer.list];

        workingText = decomposer.workingText.replace(
            `${LF + ENCODED_OPEN_TAG}Eof ${TERMINATOR}${ENCODED_CLOSE_TAG}`,
            ""
        );

        if (isCodeWriter) {
            sourceComponent.innerHTML = makeEmptyText(text + "\n");
        }

        const firstIndent = indents[indentCount] ?? "";
        await addChar(firstIndent);
        indentCount++;

        for (let i = 0; i < workingText.length; i++) {
            let c = workingText[i];

            if (isCodeWriter && c === OPEN_TAG) {
                c = ENCODED_OPEN_TAG;
                await addChar(c);
                continue;
            }

            if (
                this.#parent.makeMistakes &&
                decomposer.mistakes.length &&
                decomposer.phraseStarts.length &&
                decomposer.phraseStarts[0] === i
            ) {
                const phraseLen = decomposer.phraseLengths[0];
                for (let j = 0; j < phraseLen; j++) {
                    const pos = i + j;
                    const mistakeIndex = decomposer.mistakeCursors[0];
                    c = workingText[pos];
                    if (mistakeIndex === pos) {
                        await addChar(decomposer.mistakes[0]);
                    } else {
                        await addChar(c);
                    }

                    if (
                        decomposer.wordEnds.includes(pos) &&
                        decomposer.mistakeCursors.length
                    ) {
                        const cursor = decomposer.mistakeCursors[0];
                        if (cursor <= pos) {
                            const subLen = pos - cursor + 1;
                            for (let k = 0; k < subLen; k++) {
                                await delChar();
                                j--;
                            }

                            decomposer.mistakes.shift();
                            decomposer.mistakeCursors.shift();
                        }
                    }
                }

                decomposer.phraseStarts.shift();
                decomposer.phraseLengths.shift();

                i += phraseLen - 1;
                continue;
            }

            const next4chars = workingText.substring(i, i + 4);
            const next5chars = workingText.substring(i, i + 5);

            // In the case of a closing quote
            if (c === "&" && next5chars === "&oq;/") {
                const name = workingText.substring(i + 5, i + 6);
                const { word } = decomposer.translateBracket(c, name);
                shift();
                await addChar(word);
                i += 9;
                continue;
            }
            // In the case of an opening quote
            if (c === "&" && next4chars === "&oq;") {
                const name = workingText.substring(i + 4, i + 5);
                const { word } = decomposer.translateBracket(c, name);
                unshift(word);
                await addChar(word);
                i += 8;
                continue;
            }

            if (c === "&" && next4chars === "&pp;") {
                i += 3;
                await addChar(ENCODED_OPEN_TAG);
                continue;
            }

            if (c === "&" && next4chars === "&pg;") {
                i += 3;
                await addChar(ENCODED_CLOSE_TAG);
                continue;
            }

            if (isCodeWriter) {
                if (
                    c === "/" &&
                    next5chars === TERMINATOR + ENCODED_CLOSE_TAG
                ) {
                    if (
                        node !== null &&
                        !node.hasCloser &&
                        node.endsAt === i + 4
                    ) {
                        c = TERMINATOR + ENCODED_CLOSE_TAG;
                        shift();
                        await addChar(c);
                        i += 4;
                        continue;
                    }
                }

                // In case of a "greater than" character
                // potentially closing a single parsed tag
                if (c === "&" && next4chars === ENCODED_CLOSE_TAG) {
                    if (node !== null && node.endsAt === i + 3) {
                        shift();

                        await addChar(ENCODED_CLOSE_TAG);
                        if (node.hasCloser) {
                            nextUnshift();
                        }
                        i += 3;

                        continue;
                    }
                }
            }

            // In case of a "lower than" character
            // potentially closing an open parsed tag
            if (c === "&" && next5chars === ENCODED_OPEN_TAG + TERMINATOR) {
                node = findLastNodeOfDepth(depth);

                if (node === null && depth - 1 > -1) {
                    node = findLastNodeOfDepth(depth - 1);
                }

                c = node.closer.text;
                if (!isCodeWriter) {
                    c = OPEN_TAG + TERMINATOR + node.closer.name + CLOSE_TAG;
                }
                const { word, translated } = decomposer.translateBracket(
                    c,
                    node.name,
                    true
                );

                c = word;

                if (c !== "") {
                    shift();
                    i = node.closer.endsAt;
                    await addChar(c);
                    depth--;
                    node = null;
                    continue;
                }
            }
            // In case of an ampersand character
            // potentially starting an HTML entity
            if (c === "&" && next4chars !== ENCODED_OPEN_TAG) {
                const scpos = workingText.substring(i).indexOf(";");
                if (scpos > 8) {
                    await addChar(c);
                    continue;
                }
                const entity = workingText.substring(i, i + scpos + 1);
                await addChar(entity);
                i += entity.length - 1;
                continue;
            }
            // In case of a "lower than" character
            // potentially starting a parsed tag
            if (c === "&" && next4chars === ENCODED_OPEN_TAG) {
                // We don't take the next node if the last
                // "lower than" character was not a parsed tag
                if (node === null || (node !== null && node.dirty)) {
                    node = nextNode();
                }

                // The "lower than" character is actually not
                // the start of a parsed tag
                if (node.startsAt !== i) {
                    // Write it and prevent taking the next node
                    if (isCodeWriter) {
                        c = ENCODED_OPEN_TAG;
                        i += 3;
                    } else {
                        c = node.text.replace(ENCODED_OPEN_TAG, OPEN_TAG);
                        c = c.replace(ENCODED_CLOSE_TAG, CLOSE_TAG);
                    }
                    await addChar(c);
                    node.dirty = false;
                    continue;
                }

                // The "lower than" character is
                // the start of an open parsed tag
                node.dirty = true;
                let hasLF = false;
                let unshifted = "";

                c = node.text;
                if (!isCodeWriter) {
                    c = node.text.replace(ENCODED_OPEN_TAG, OPEN_TAG);
                    c = c.replace(ENCODED_CLOSE_TAG, CLOSE_TAG);
                }
                // Is the tag name a bracket?
                const { word, translated } = decomposer.translateBracket(
                    c,
                    node.name
                );
                c = word;

                // Is it an open tag?
                if (node.hasCloser) {
                    depth++;

                    unshifted = node.closer.text;
                    if (!isCodeWriter) {
                        unshifted =
                            OPEN_TAG +
                            TERMINATOR +
                            node.closer.name +
                            CLOSE_TAG;
                    }

                    // Is the tag name a bracket?
                    const { word, translated } = decomposer.translateBracket(
                        unshifted,
                        node.name,
                        true
                    );
                    unshifted = word;

                    // Does the tag body contain an LF character?
                    hasLF = node.closer.contents.text.indexOf(LF) > -1;

                    // Is the tag name a bracket?
                    if (translated) {
                        // Store the closing bracket
                        // to write it after each new character
                        i = node.endsAt;
                        if (hasLF) {
                            unshift(LF + lastIndent + unshifted);
                        } else {
                            unshift(unshifted);
                        }
                    } else {
                        // Store the tag closser after the opener is written
                        toUnshift.push(unshifted);
                        toUnshiftHasLF.push(hasLF);
                    }
                }

                // The tag name is not a bracket
                if (!translated) {
                    // We write the tag name and its attributes
                    // with a trailing "greater than" chaaracter

                    // Does the tag string contain an LF character?
                    hasLF = node.text.indexOf(LF) > -1;

                    if (isCodeWriter) {
                        c = ENCODED_OPEN_TAG;
                        i += 3;
                        unshifted = ENCODED_CLOSE_TAG;
                    } else {
                        c = node.text.replace(ENCODED_OPEN_TAG, OPEN_TAG);
                        c = c.replace(ENCODED_CLOSE_TAG, CLOSE_TAG);

                        i += node.text.length - 1;
                        unshifted =
                            OPEN_TAG +
                            TERMINATOR +
                            node.closer.name +
                            CLOSE_TAG;
                    }

                    if (hasLF) {
                        unshift(LF + lastIndent + unshifted);
                    } else {
                        unshift(unshifted);
                    }
                }

                // Write the actual string
                // and continue to the next character
                await addChar(c);
                continue;
            }

            // In case of the line feed character
            if (c === LF) {
                // Add the line feed
                // followed by the indent
                // of the next line

                lastIndent = indents[indentCount] ?? "";
                lastLineFeed = LF + lastIndent;

                const reg0 = reg.length ? reg[0].trim() : "";
                const nextString = workingText.substring(
                    i + 1,
                    i + reg0.length + 1
                );

                indentCount++;

                await addChar(lastLineFeed, reg0 === nextString);
                continue;
            }

            // Write any character not matching the cases above
            await addChar(c);
        }

        // Set back the code text in pure HTML
        html = translate(html);

        // Raise an event outside the shadow DOM
        // when all is done and ready
        const finishedEvent = new CustomEvent("finishedWriting", {
            bubbles: true,
            composed: true,
            detail: {
                content: html
            }
        });
        this.#parent.dispatchEvent(finishedEvent);
        this.#parent.setAttribute("finished", "true");
    }
}
